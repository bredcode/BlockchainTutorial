$(document).ready(function(){
    var $commandline_modal = $("#command_line_confirm_modal");
    $(".function_btn").click(function(event){
        var $target = $(event.target);
        var command = $target.find(".function_data").val();
        console.log(command);
        $commandline_modal.modal();
        $commandline_modal.find(".modal-title").text($target.text());
        var cmd_info = CMD_FACTORY[command];
        var cmd_option_string = ""
        if(cmd_info.options!=null){
            cmd_option_string = "["+cmd_info.options.join("]  [")+"]";
        }
        
        $commandline_modal.find(".command_line").text("$ bitcoin-cli -regtest "+command+" "+cmd_option_string);
        $commandline_modal.find(".command_comment").text(cmd_info.comment);
        
    })
});