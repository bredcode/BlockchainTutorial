/**
 * Developer Jaewook Lim (Korea Aerospace Univ.)
 * 
 * 
 */
$(document).ready(function(){
    getNodeInfo();

    var $nodelist = $("#node_list");

    $("#init_session").click(function(){
        $("#init_session").prop("disabled",true);
        $.ajax({
            url:"/BitcoinTestnet/regtest/initsession",
            success:function(){
                $("#block_num").val(101);
                $nodelist.html('<li class="list-group-item">no items</li>');
                session_arr = [];
                alert("초기화 완료!");
                $("#init_session").prop("disabled",false);
            }
        })
    });
    $("#add_session").hide();
    $("#add_session").click(function(){
        $("#add_session").prop("disabled",true);
        var $clientNum = $("#client_num");
        if($clientNum.val()!=null&&$clientNum.val()!=""){
            var num = $clientNum.val();
            $.ajax({
                url:"/BitcoinTestnet/regtest/addsession",
                data:{
                    num:num
                },
                success:function(data){
                    var new_session_array = JSON.parse(data);
                    console.log(new_session_array);
                    for(var i = 0 ; i < new_session_array.length; i++){
                        session_arr.push(JSON.parse(new_session_array[i]));
                    }
                    $nodelist.html('');
                    for(var i = 0 ; i < session_arr.length; i++){
                        var obj = session_arr[i];
                        var id = obj.id;
                        var rpcport = parseInt(obj.rpcport);
                        $nodelist.append(createNodeHTML(id, rpcport));
                    }
                    bindSendBTCEvent();
                    $("#add_session").prop("disabled",false);
                }
            })
        }
    });
    $("#create_session").click(function(){
        $("#create_session").prop("disabled",true);
        var $clientNum = $("#client_num");
        if($clientNum.val()!=null&&$clientNum.val()!=""){
            var num = $clientNum.val();
            createsession(num, function(data){
                session_arr = JSON.parse(data);
                console.log(session_arr);
                $nodelist.html('');
                for(var i = 0 ; i < session_arr.length; i++){
                    var obj = JSON.parse(session_arr[i]);
                    session_arr[i] = obj;
                    var id = obj.id;
                    var rpcport = parseInt(obj.rpcport);
                    $nodelist.append(createNodeHTML(id, rpcport));
                }
                bindSendBTCEvent();
                $("#create_session").hide();
                $("#add_session").show();
                $("#create_session").prop("disabled",false);
            });
        }else{
            alert("Client Number를 채워주세요!");
        }
    });

    $("#generate_block").click(function(){
        $("#generate_block").prop("disabled",true);
        var num = $("#block_num").val();
        if(num == "" || num == null){
            alert("Generate Block Number를 채워주세요!");
            return;
        }
        generateblock(num, function(data){
            if(data == null ||data.trim() == ""){
                alert("다시 초기화해주세요!");
            }else{
                alert("[Callback]"+data);
            }
            $("#generate_block").prop("disabled",false);
        });
    })

    $("#mining_btn").click(function(){
        if(MINING_TIMEINTERVAL_ID !=null){
            clearInterval(MINING_TIMEINTERVAL_ID);
            MINING_TIMEINTERVAL_ID = null;
            $("#mining_btn").removeClass("btn-success").addClass("btn-default").text("주기적 마이닝");
        }else{
            var time_data = $("#mining_interval_num").val();
            if(time_data == "" || time_data == null){
                time_data = 15000;
                $("#mining_interval_num").val(15);
            }else{
                time_data = parseInt(time_data)*1000;
            }
            
            MINING_TIMEINTERVAL_ID = setInterval(function(){
                /**15초 마다 블럭 생성 */
                generateblock(1, function(data){
                    if(data == null ||data.trim() == ""){
                        alert("다시 초기화해주세요!");
                    }else{
                        console.log("[LOG]Block created:"+data);
                    }
                });
            },time_data);
            $("#mining_btn").removeClass("btn-default").addClass("btn-success").text("마이닝 중...");
            
        }
        
    });
});
var session_arr = [];
var MINING_TIMEINTERVAL_ID = null;

function appendNodeList(){

}
function createNodeHTML(id, rpcport, address){
    var jsonObj = {
        id:id,
        rpcport:rpcport,
        address: address
    }
    var html = "<div class=\"list-group-item list-group-item-action\">"
                +"nodeid:"+id+"/rpcport="+rpcport
                +"<button type=\"button\" class=\"btn btn-default send_btc\">1BTC"
                +"<input class='data' type='hidden' value='"+JSON.stringify(jsonObj)+"'>"
                +"</button>"+"</div>";
    return html;
}
function getNodeInfo(){
    var $nodelist = $("#node_list");

    $.ajax({
        url:"/BitcoinTestnet/regtest/getallnodeinfo",
        success:function(data){
            var obj_array = JSON.parse(data);

            if(obj_array.length > 0){
                $nodelist.html("");
            }
            for(var i = 0 ; i < obj_array.length ; i++){
                var obj = obj_array[i];
                session_arr[i] = obj;
                $nodelist.append(createNodeHTML(obj.id, obj.rpcport, obj.address));
                bindSendBTCEvent();
                $("#create_session").hide();
                $("#add_session").show();
            }
        }
    })
}
function bindSendBTCEvent(){
    $(".send_btc").unbind("click");
    $(".send_btc").click(function(event){
        var $hiddendata = $(event.target).find(".data")
        var data_str = $hiddendata.val();
        var data_obj = JSON.parse(data_str);
        console.log(data_obj);
        if(data_obj.address == null){
            getnewaddress(data_obj.id, data_obj.rpcport, data_obj.id, function(data){
                console.log("[LOG]new address : "+data);
                if(data == null || data == ""){
                    alert("다시 시도해주세요");
                }else{
                    data_obj.address = data;
                    session_arr[data_obj.id] = data_obj;
                    $hiddendata.val(JSON.stringify(data_obj));
                    sendBTCToAddress(data, 1.0, function(data){
                        if(data == null || data == ""){
                            alert("다시 시도해주세요");
                        }else{
                            alert("data:"+data);
                        }
                    });
                }
            });
        }else{
            sendBTCToAddress(data_obj.address, 1.0, function(data){
                if(data == null || data == ""){
                    alert("다시 시도해주세요");
                }else{
                    alert("data:"+data);
                }
            });
        }
    })
}
function sendBTCToAddress(address, btc, _callback){
    $.ajax({
        url:"/BitcoinTestnet/regtest/networktoaddress",
        data:{
            to_address:address,
            btc: btc
        },
        success: _callback
    })
}
function getnewaddress(id, rpcport, name, _callback){
    $.ajax({
        url:"/BitcoinTestnet/regtest/getnewaddress",
        data:{
            id: id,
            rpcport: rpcport,
            name: name
        },
        success:_callback
    })
}
function createsession(num, _callback){
    $.ajax({
        url:"/BitcoinTestnet/regtest/createsession",
        data:{
            num:num
        },
        success:_callback
    });
}
function generateblock(num, _callback){
    $.ajax({
        url:"/BitcoinTestnet/regtest/generateblock",
        data:{
            block_num: num
        },
        success: _callback
    })
}
