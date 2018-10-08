Dim WebToken
Dim userrecord
Dim LoginUser

Function VerifyLogin()
  If Not(Authenticated) Then
    DoLogin()
  End If
End Function

Function DoLogin()
  Authenticated = False
  console.log("Authenticated = " + Authenticated)
  payload={}
  NavMenu.disabled = True
  NavServerContainer.hide()
  CurrentForm = "Login"
  NavBack.hide()
  NavMenu.hide()
  
 
  JavaScript
    
  $("#id_menu_user_name").text("Login");
  $("#id_menu_user_account").text("");
  
  End JavaScript
  console.log("After setting top")
  LoginFormUserName.value = ""
  LoginFormPassword.value = ""
  LoginUser = ""
  ChangeForm(LoginForm, "slide", "slide", 1000)
  console.log("set MainLoginFormContainer to show")
End Function

Function LoginFormLoginButton_onclick()
  Dim LoginPayload = {}
  
  URL = DebugServerPort.value
  console.log("Set URL = " & URL)

  LoginPayload.userid = LoginFormUserName.value
  LoginPayload.password = LoginFormPassword.value
  
  If LoginPayload.userid = "" Then
    LoginPayload.userid = "patrickp@zumasys.com"
    LoginPayload.password = "Password!"
  End If
  
  ' dummy call for now
  req = {}
  req.responseJSON = {}
  req.responseJSON.webtoken="webtoken"
  req.responseJSON.status = "ok"
  console.log(req)
  LoginResponse(req)
  Exit Function
  
  ' make call 
  query=""
  query=query+"?action=authenticate"
  console.log(query)
  Dim Settings = {}
  Settings.type = "POST"
  Settings.success = "LoginResponse()"
  Settings.data = JSON.stringify(LoginPayload)
  Settings.async = False
  Settings.headers = { "Authentication": "value" }
  'Settings.xhrFields = { "withCredentials": True }
  'Settings.beforeSend = "SetWebToken()"
  ' why is success not working above, for right now we will do sync
  Settings.contentType = "text/plain"
  console.log(Settings)
  req=Ajax(URL+"/users" + query, Settings)
  LoginResponse(req)
  
  
End Function

Function LoginUserLoad(req)
  
End Function

Function SetWebToken()
  console.log("in setwebtoken")
End Function

Function LoginResponse(wholereq)
  console.log("in LoginResponse")
  req=wholereq.responseJSON
  console.log(req)
  If req.status <> "ok" Then
    NSB.MsgBox(req.statusmsg)
    JavaScript
    
    $("#id_menu_user_name").text("Login");
  End JavaScript
  Exit Function
End If

console.log("Ok login, checking permissions")
LoginUser = req.result


token=Split(req.webtoken,".")
WebToken = req.webtoken
console.log(token)
'body = token(1)
'console.log(body)
'JavaScript
'      realbody = atob(body);
'  End JavaScript
'realbody=body
'  console.log(realbody)
'  userrecord = JSON.parse(realbody)
  userrecord = {}
  userrecord.name = "Patrick Payne"
  
  console.log(userrecord)
  
  console.log($("#id_menu_user_name").text)
  JavaScript
    
  $("#id_menu_user_name").text(userrecord.name);
  
  End JavaScript
  
  ChangeForm(OrdersListForm, "fade")
  
  mainload()
  Authenticated = True
  NavMenu.disabled = False
  NavServerContainer.show()
  
  
  
End Function


