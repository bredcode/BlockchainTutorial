$(document).ready(function(){
    // $.ajax({
    //     url:"test",
    //     type:"get",
    //     success:function(data){
    //         alert("test:"+data);
    //     }
    // })
    var $nodelist = $("#node_list");
    $("#test_btn").click(function(){
        $.ajax({
            url:"/BitcoinTestnet/regtest/getnewaddress",
            data:{
                id:"jaewook"
            },
            success:function(data){
                console.log(data);
                $("#result").text(data);
            }
        })
    });

    $("#init_session").click(function(){
        $.ajax({
            url:"/BitcoinTestnet/regtest/initsession",
            success:function(){
                $("#block_num").val(101);
                $nodelist.html('<li class="list-group-item">no items</li>');
                
                alert("초기화 완료!");
                
            }
        })
    });
    $("#create_session").click(function(){
        if($("#client_num").val()!=null&&$("#client_num").val()!=""){
            var num = $("#client_num").val();
            $.ajax({
                url:"/BitcoinTestnet/regtest/createsession",
                data:{
                    num:num
                },
                success:function(data){
                    session_arr = JSON.parse(data);
                    console.log(session_arr);
                    $("#node_list").html('');
                    for(var i = 0 ; i < session_arr.length; i++){
                        var obj = JSON.parse(session_arr[i]);
                        session_arr[i] = obj;
                        var id = obj.id;
                        var rpcport = parseInt(obj.rpcport);

                        var jsonObj = {
                            id:id,
                            rpcport:rpcport
                        }

                        var html = "<div class=\"list-group-item list-group-item-action\">"
                        	+"nodeid:"+id+"/rpcport="+rpcport
                        	+"<button type=\"button\" class=\"btn btn-default send_btc\">1BTC"
                        	+"<input class='data' type='hidden' value='"+JSON.stringify(jsonObj)+"'>"
                        	+"</button>"+"</div>";
                        $nodelist.append(html);
                    }
                    $(".send_btc").click(function(event){
                        var $hiddendata = $(event.target).find(".data")
                        var data_str = $hiddendata.val();
                        var data_obj = JSON.parse(data_str);
                        console.log(data_obj);
                        if(data_obj.address == null){
                            $.ajax({
                                url:"/BitcoinTestnet/regtest/getnewaddress",
                                data:{
                                    id:data_obj.id,
                                    rpcport:data_obj.rpcport,
                                    name: data_obj.id
                                },
                                success:function(data){
                                    console.log("[LOG]new address : "+data);
                                    if(data == null || data == ""){
                                        alert("다시 시도해주세요");
                                    }else{
                                        data_obj.address = data;
                                        $hiddendata.val(JSON.stringify(data_obj));
                                        $.ajax({
                                            url:"/BitcoinTestnet/regtest/networktoaddress",
                                            data:{
                                                to_address:data,
                                                btc: 1.0
                                            },
                                            success:function(data){
                                                if(data == null || data == ""){
                                                    alert("다시 시도해주세요");
                                                }else{
                                                    alert("data:"+data);
                                                }
                                            }
                                        })
                                    }
                                    
                                }
                            })
                        }else{
                            $.ajax({
                                url:"/BitcoinTestnet/regtest/networktoaddress",
                                data:{
                                    to_address:data_obj.address,
                                    btc: 1.0
                                },
                                success:function(data){
                                    if(data == null || data == ""){
                                        alert("다시 시도해주세요");
                                    }else{
                                        alert("data:"+data);
                                    }
                                }
                            })
                        }
                        

                    })
                }
            })
        }else{
            alert("Client Number를 채워주세요!");
        }
    });

    $("#generate_block").click(function(){
        var num = $("#block_num").val();
        if(num == "" || num == null){
            alert("Generate Block Number를 채워주세요!");
            return;
        }
        $.ajax({
            url:"/BitcoinTestnet/regtest/generateblock",
            data:{
                block_num: num
            },
            success:function(data){
                console.log(data);
                if(data == null ||data.trim() == ""){
                    alert("다시 초기화해주세요!");
                }else{
                    alert("[Callback]"+data);
                }
            }
        })
    })
});
var session_arr = [];