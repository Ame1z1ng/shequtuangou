"use strict";$(function(){$("#backindex").click(function(){location.href="./sqtg.html"});var s={};function t(){1==s.usnText&&1==s.pswText&&1==s.ckbText?($("#btn").prop("disabled",""),$("#btn").css("backgroundColor","#4caf50")):($("#btn").prop("disabled",!0),$("#btn").css("backgroundColor","#b2eeb4"))}$("#username").blur(function(){if(""==$("#username").val())return $("#falseUsn").css("display","block"),void $("#password").css("marginTop","9.2px");$("#falseUsn").css("display","none"),$("#password").css("marginTop","30px");/^[a-z\u4e00-\u9fa5][0-9A-Za-z\u4e00-\u9fa5]{1,11}$/.test($("#username").val())?s.usnText=!0:(s.usnText=!1,alert("用户名格式错误(只能以字母或者汉字开头的2到11个字符)")),t()}),$("#password").blur(function(){if(""==$("#password").val())return $("#falsePsw").css("display","block"),void $("#agreement").css("marginTop","9.2px");$("#falsePsw").css("display","none"),$("#agreement").css("marginTop","30px");/^[a-zA-Z0-9_-]{6,18}$/.test($("#password").val())?s.pswText=!0:(s.pswText=!1,alert("密码格式错误(6到18位数字或者字母)")),t()}),$("#ckb").click(function(){1==$(this).prop("checked")?s.ckbText=!0:s.ckbText=!1,t()}),$("#btn").click(function(){$.ajax({url:"../api/login.php",method:"post",data:{username:$("#username").val(),password:$("#password").val()},success:function(){getCookie("login")?(alert("登录成功"),location.href="./sqtg.html"):alert("用户名或者密码错误")},error:function(s){console.log(s)}})}),$("#zhuce").click(function(){$("#signin").fadeIn("fast")}),$("#signin").click(function(s){"signin"==s.target.id&&$("#signin").fadeOut("fast")});var e={};function n(){1==e.usnText&&1==e.pswText&&1==e.agrpswText&&1==e.ckbText?$("#signinAreaFooter_register").prop("disabled","").css("backgroundColor","#4caf50"):$("#signinAreaFooter_register").prop("disabled","true").css("backgroundColor","#b2eeb4")}$("#usnipt").on("input propertychange",function(){if(""==$("#usnipt").val())return $("#usntip").css("display","block").html("用户名不能为空"),void(e.usnText=!1);/^[a-z\u4e00-\u9fa5][0-9A-Za-z\u4e00-\u9fa5]{1,11}$/.test($("#usnipt").val())?($("#usntip").css("display","none"),e.usnText=!0):(e.usnText=!1,$("#usntip").css("display","block").html("用户名格式错误")),n()}),$("#pswipt").on("input propertychange",function(){if(""==$("#pswipt").val())return $("#pswtip").css("display","block").html("密码不能为空"),void(e.pswText=!1);/^[a-zA-Z0-9_-]{6,18}$/.test($("#pswipt").val())?($("#pswtip").css("display","none"),e.pswText=!0):(e.pswText=!1,$("#pswtip").css("display","block").html("密码格式错误")),n()}),$("#agrpswipt").on("input propertychange",function(){return""==$("#pswipt").val()?($("#agrpswtip").css("display","block").html("请先输入密码"),void(e.agrpswText=!1)):($("#pswipt").val()!=$("#agrpswipt").val()?($("#agrpswtip").css("display","block").html("与上一次输入密码不一致，请确认"),e.agrpswText=!1):($("#agrpswtip").css("display","none"),e.agrpswText=!0),void n())}),$("#ckbipt").click(function(){$("#ckbipt").prop("checked")?e.ckbText=!0:e.ckbText=!1,n()}),$("#signinAreaFooter_login").click(function(){$("#signin").fadeOut("fast")}),$("#signinAreaFooter_register").click(function(){$.ajax({url:"../api/register.php",method:"post",data:{username:$("#usnipt").val(),password:$("#pswipt").val()},success:function(s){alert(s),getCookie("success")&&($("#signin").fadeOut("fast"),$("#usnipt").val(""),$("#pswipt").val(""),$("#agrpswipt").val(""),$("#ckbipt").prop("checked",""),$("#signinAreaFooter_register").css("backgroundColor","#b2eeb4").prop("disabled","true"),e.usnText=!1,e.pswText=!1,e.agrpswText=!1,e.ckbText=!1)}})})});