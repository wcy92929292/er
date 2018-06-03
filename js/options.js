"use strict";

$("#add").click(function(){
    $("#add1").show();
	$("#shadows").hide();
	$("#con").hide();
})
bindAvatar2();
 function bindAvatar2() {
    console.log(2);
	
       $("#avatarSlect").change(function () {
		$("#avatarPreview").show();
           var obj=$("#avatarSlect")[0].files[0];
           var fr=new FileReader();
           fr.onload=function () {
               $("#avatarPreview").attr('src',this.result);
               console.log(this.result);
               $("#avatar").val(this.result);
      };
      fr.readAsDataURL(obj);
    })
 }

var NebPay = require("nebpay");     
var nebPay = new NebPay();



var dappAddress = "n1mHsiW6yqGsEPqRy7MEzNLuk9c2EcUADfo";
$("#query23").click(function(){
	$("#add1").hide();
	$("#con").show();
	$("#shadows").hide();
	$("#con").html("");
    q("getNewBook");
})
$("#query22").click(function(){
	$("#add1").hide();
	$("#con").show();
	$("#shadows").hide();
	$("#con").html("");
    q("getRansomBook");
})
$("#query24").click(function(){
	$("#add1").hide();
	$("#con").show();
	$("#shadows").hide();
	$("#con").html("");
    q("getAllBook");
})
function q(fun){
    
        var to = dappAddress;
        var value = "0";
        var callFunction = fun;
        var callArgs = "[]"; 
        nebPay.simulateCall(to, value, callFunction, callArgs, {    
            listener: cbSearch     
        });

}


function cbSearch(resp) {
    var result = resp.result    ////resp is an object, resp.result is a JSON string
    if(result!=null &&result!="null" &&result!="[]"){
        $("#con").html("");
        console.log("return of rpc call: " + JSON.stringify(result))
        if(result.indexOf("[{")!=-1){
            result = JSON.parse(result);
            //console.log("return of rpc call: " + JSON.stringify(result))
            for(var i=0;i<result.length;i++){
                $("#con").append('<div style="overflow:auto;"><img id="avatarPreview" title="点击更换图片" src="'+result[i].pic+'" style="float: left;width: 15%;margin-right: 15px;"><div class="search-again form-item-wrap" id="append" style="float: left;width: 80%;">'+
                '标题：'+
                '<span name="bookName3">'+result[i].bookName+'</span>'+
                '<br> 类型：'+
                '<span name="type3">'+result[i].type+'</span>'+
                '<br> 链接：'+
                '<a name="url3" href="'+result[i].url+'">'+result[i].url+'</a>'+
                '<br> 介绍：'+
                '<span name="content3">'+result[i].content+'</span>'+
            '</div>'+'</div><br><hr />')
            }
            
        }else{
			result = JSON.parse(result);
            $("#con").append('<div style="overflow:auto;"><img id="avatarPreview" title="点击更换图片" src="'+result.pic+'" style="float: left;width: 15%;margin-right: 15px;"><div class="search-again form-item-wrap" id="append" style="float: left;width: 80%;">'+
                '标题：'+
                '<span name="bookName3">'+result.bookName+'</span>'+
                '<br> 类型：'+
                '<span name="type3">'+result.type+'</span>'+
                '<br> 链接：'+
                '<a name="url3" href="'+result.url+'">'+result.url+'</a>'+
                '<br> 介绍：'+
                '<span name="content3">'+result.content+'</span>'+
            '</div>'+'</div><br><hr />')
        }
        
    }else{
        $("#con").html("<br>还没有好物发布，你可以现在就去发布啦！")
    }
    
}

        var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;  
        
        $("#add2").click(function() {
            //alert($("#bookInput").val().length+"!!!!!!!!!"+$("#typeInput").val().length+"***********"+$("#urlInput").val().length);
            if($("#bookInput").val().length===0 || $("#typeInput").val().length===0 || $("#urlInput").val().length===0){
                alert("请输入内容");
            }else if(!reg.test($("#urlInput").val())){  
                alert("这网址不是以http://https://开头，或者不是网址！");  
            }else{
                var to = dappAddress;
                var value = "0";
                var callFunction = "submit"
                
                var callArgs = "[\"" + $("#bookInput").val() + "\",\"" + $("#typeInput").val() + "\",\"" + $("#urlInput").val() +"\",\"" + $("#contentInput").val() +"\",\"" + $("#avatarPreview").attr("src") +"\"]"
                nebPay.call(to, value, callFunction, callArgs, {    
                    listener: cbPush
                });
            }
            $("#bookInput").val("")
            $("#typeInput").val("")
            $("#urlInput").val("")
            $("#contentInput").val("")
        })

        function cbPush(resp) {
            console.log("response of push: " + resp);
            alert("感谢推荐！我们的进步来自您不懈的推荐,ps:大概15秒之后，即可看到自己推荐的好物");
            // q("getNewBook");
            
        }
