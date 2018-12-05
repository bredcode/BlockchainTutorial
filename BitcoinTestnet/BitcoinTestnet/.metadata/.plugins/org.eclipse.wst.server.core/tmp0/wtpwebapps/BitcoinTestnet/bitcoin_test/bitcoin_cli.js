var TEST_NODE_ID = null;
var TEST_CLIENT_ID = null;
var TEST_RPCPORT = null;
$(document).ready(function(){
    var $commandline_modal = $("#command_line_confirm_modal");
    var $node_info_modal = $("#node_info_modal");
    var function_box_height = $(".function_box").height() + 50;
    $(".command_line_wrapper").css("max-height","calc(100% - "+function_box_height+"px");

    $(".function_btn").click(function(event){
        var $target = $(event.target);
        var command = $target.find(".function_data").val();
        console.log(command);
        $("#modal_command_data").val(command);
        $commandline_modal.modal();
        $commandline_modal.find(".modal-title").text($target.text());
        var cmd_info = CMD_FACTORY[command];
        var cmd_option_string = ""
        if(cmd_info.options!=null){
            cmd_option_string = "["+cmd_info.options.join("]  [")+"]";
        }
        var command_inputs_html = "";
        for(var i = 0 ; i < cmd_info.params.length; i++){
            var param = cmd_info.params[i];
            command_inputs_html += "<input type=\"text\" id=\"cmd_input_"+param+"\" class=\"command_input form-control\" placeholder=\""+cmd_info.options[i]+"\">";
        }
        $(".command_input_wrapper").html(command_inputs_html);
        $commandline_modal.find(".command_line").text("$ bitcoin-cli -regtest "+command+" "+cmd_option_string);
        $commandline_modal.find(".command_comment").html(cmd_info.comment);

    });
    $("#modal_command_execute_btn").click(function(){
        var command = $("#modal_command_data").val();
        if(TEST_NODE_ID == null){
            alert("[ERROR]노드정보를 먼저 로드해주세요!");
            return;
        }
        var req_data = {
            id: TEST_NODE_ID,
            rpcport: TEST_RPCPORT
        };
        var cmd_params = CMD_FACTORY[command].params;

        var cmd_params_string = "";
        for(var i = 0 ; i<cmd_params.length; i++){
            var param_name = cmd_params[i]
            var param_value = $("#cmd_input_"+param_name).val();
            req_data[param_name] = param_value;

            cmd_params_string+= param_value+" ";
        }
        $.ajax({
            url:"/BitcoinTestnet/regtest/"+command,
            data:req_data,
            success:function(data){
                if(data==null||data==""){
                    var additional_info = "";
                    if(command == "sendtoaddress")
                        additional_info = "[주의] 잔고를 먼저 확인해주세요.";
                    else if(command == "gettransaction")
                        additional_info = "[참고] raw transaction 조회하기로 다시 시도해보세요";
                    alert("오류가 발생하였습니다. 다시 시도해주세요!\n"+additional_info);
                    return;
                }
                try{
                    var data_obj = JSON.parse(data);
                    data = JSON.stringify(data_obj, null, 4);
                }catch(err){
                    console.log("This is not json");
                }
                
                $commandline_modal.modal('hide');
                console.log(data);
                $(".main_command_lines").append("<div class='command_line'>"
                +"$ bitcoin-cli -regtest "+command+" "+cmd_params_string+""
                +"<pre class='command_result'>"+data+"</pre> "
                +"</div>");
                $(".command_line_wrapper").scrollTop($(".command_line_wrapper").height());
                $(document).scrollTop($(document).height());
            }
        })
    });
    $("#load_node_btn").click(function(){
        var $clientid = $("#client_id");
        var client_id = $clientid.val();

        if(client_id.length){
            $.ajax({
                url: "/BitcoinTestnet/regtest/autoloadnode",
                data:{
                    client_id: client_id
                },
                success:function(data){
                    console.log(data);
                    if(data == null || data == ""){
                        alert("노드 로드 실패!(로그인 할 노드가 없습니다.)");
                    }else{
                        var session_obj = JSON.parse(data);
                        TEST_NODE_ID = session_obj.id;
                        TEST_CLIENT_ID = session_obj.client_id;
                        TEST_RPCPORT = session_obj.rpcport;
                        $("#load_node_btn").prop("disabled",true);
                        $clientid.prop("disabled",true);
                    }
                }
            })
        }else{
            alert("client_id를 입력하세요");
        }
    });
    $("#load_all_node_btn").click(function(){
        $.ajax({
            url:"/BitcoinTestnet/regtest/getallnodeinfo",
            success:function(data){
                var data_array = JSON.parse(data);
                var info_arr = [];

                for(var i = 0; i < data_array.length; i++){
                    var tmp = data_array[i];
                    if(tmp.client_id != null && tmp.address != null){
                        var info = {
                            client_id : tmp.client_id,
                            address : tmp.address,
                            id : tmp.id
                        };
                        info_arr.push(info);
                    }
                }
                if(info_arr.length > 0){
                    var $nodeInfoBox = $node_info_modal.find(".node_info_wrapper");
                    var nodeinfoHTML = "";
                    for(var i = 0; i < info_arr.length; i++){
                        var info_obj = info_arr[i];
                        var info_str = 
                            '<div class="panel panel-success">'+
                            '<div class="panel-heading">[node:'+info_obj.id+"]   "+info_obj.client_id+'</div>'+
                            '<div class="panel-body">'+info_obj.address+'</div>'+
                            '</div>';
                        nodeinfoHTML+=info_str;
                        
                    }
                    $(".available_node").html("사용가능 노드 ("+0+"~"+(data_array.length-1)+")");
                    $nodeInfoBox.html(nodeinfoHTML);
                    $node_info_modal.modal();
                }else{
                    if(data_array.length>0)
                        alert("로그인된 노드가 존재하지 않습니다!(사용가능 노드 ("+0+"~"+(data_array.length-1)+")");
                    else
                        alert("사용가능한 노드가 존재하지 않습니다.");
                }
            }
        })
    });
});