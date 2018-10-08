
Dim URL="http://localhost:20002/api/nworders"
Dim CurrentForm=""
Dim version="1.0"

Dim order = {}
Dim orders = {}

Dim Authenticated=False

MyLogger("Application Starting",1)

Sub Main()
  Authenticated = False
  MyLogger("Version " & version,1)
  DebugServerPort.value = URL
  console.log(URL)
 
  HideAllContainers()
  MainListSelectList.clear()
  NavServerContainer.hide()
  
  DoLogin()
 End Sub

Function HideAllContainers()
  LoginForm.hide()
  OrdersListForm.hide()
  OrdersEditForm.hide()
  
End Function

Function NavMenu_onclick(choice)
  If TypeName(choice) = "object" Then
    Exit Function
  End If
    console.log(choice)
    If choice = "Orders" Then
        ChangeForm(OrdersListForm)
    End If
    If choice = "Logout" Then
       MainListSelectList.clear()
      
      NavMenu.disabled = True
      NavServerContainer.hide()
      console.log(NavServerContainer.hidden)
      
      ChangeForm(LoginForm)
    End If
    
End Function

Function NavBack_onclick()
  NavBack.hide()
 MyLogger("nav back, currentform = " & CurrentForm,2)
 If CurrentForm = "OrdersEditForm" Then
   ChangeForm(OrdersListForm)
   CurrentForm="OrdersListForm"
 End If
 If CurrentForm = "OrdersItemForm" Then
   ChangeForm(OrdersEditForm)
   CurrentForm="OrdersEditForm"
 End If
 
 MyLogger("nav back end, currentform=" & CurrentForm,2)

End Function
