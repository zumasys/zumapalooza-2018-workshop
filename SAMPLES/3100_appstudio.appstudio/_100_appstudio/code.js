var URL="http://localhost:20002/api/nwordersfinal";
var CurrentForm="";
var version="1.0";

var order = {};
var orders = {};

var Authenticated=false;

MyLogger("Application Starting" ,1);

function Main() {
  Authenticated = false;
  MyLogger("Version "  +  version,1);
  DebugServerPort.value = URL;
  console.log(URL);

  HideAllContainers();
  MainListSelectList.clear();
  NavServerContainer.hide();

  DoLogin();
 }

function HideAllContainers() {
  LoginForm.hide();
  OrdersListForm.hide();
  OrdersEditForm.hide();

}

NavMenu.onclick = function(choice) {
  if(TypeName(choice) == "object") {
    return;
  }
    console.log(choice);
    if(choice == "Orders") {
        ChangeForm(OrdersListForm);
    }
    if(choice == "Logout") {
       MainListSelectList.clear();

      NavMenu.disabled = true;
      NavServerContainer.hide();
      console.log(NavServerContainer.hidden);

      ChangeForm(LoginForm);
    }

};

NavBack.onclick = function() {
  NavBack.hide();
 MyLogger("nav back, currentform = "  +  CurrentForm,2);
 if(CurrentForm == "OrdersEditForm") {
   ChangeForm(OrdersListForm);
   CurrentForm="OrdersListForm";
 }
 if(CurrentForm == "OrdersItemForm") {
   ChangeForm(OrdersEditForm);
   CurrentForm="OrdersEditForm";
 }

 MyLogger("nav back end, currentform="  +  CurrentForm,2);

};
var WebToken;
var userrecord;
var LoginUser;

function VerifyLogin() {
  if(!(Authenticated)) {
    DoLogin();
  }
}

function DoLogin() {
  Authenticated = false;
  console.log("Authenticated = " + Authenticated);
  payload={};
  NavMenu.disabled = true;
  NavServerContainer.hide();
  CurrentForm = "Login";
  NavBack.hide();
  NavMenu.hide();

$("#id_menu_user_name").text("Login");
  $("#id_menu_user_account").text("");
  
console.log("After setting top");
  LoginFormUserName.value = "";
  LoginFormPassword.value = "";
  LoginUser = "";
  ChangeForm(LoginForm, "slide" , "slide" , 1000);
  console.log("set MainLoginFormContainer to show");
}

LoginFormLoginButton.onclick = function() {
 var LoginPayload = {};

  URL = DebugServerPort.value;
  console.log("Set URL = "  +  URL);

  LoginPayload.userid = LoginFormUserName.value;
  LoginPayload.password = LoginFormPassword.value;

  if(LoginPayload.userid == "") {
    LoginPayload.userid = "patrickp@zumasys.com";
    LoginPayload.password = "Password!";
  }

 // dummy call for now
  req = {};
  req.responseJSON = {};
  req.responseJSON.webtoken="webtoken";
  req.responseJSON.status = "ok";
  console.log(req);
  LoginResponse(req);
  return;

 // make call 
  query="";
  query=query+"?action=authenticate";
  console.log(query);
 var Settings = {};
  Settings.type = "POST";
  Settings.success = "LoginResponse()";
  Settings.data = JSON.stringify(LoginPayload);
  Settings.async = false;
  Settings.headers = { "Authentication": "value" };
 //Settings.xhrFields = { "withCredentials": True }
 //Settings.beforeSend = "SetWebToken()"
 // why is success not working above, for right now we will do sync
  Settings.contentType = "text/plain";
  console.log(Settings);
  req=Ajax(URL+"/users" + query, Settings);
  LoginResponse(req);


};

function LoginUserLoad(req) {

}

function SetWebToken() {
  console.log("in setwebtoken");
}

function LoginResponse(wholereq) {
  console.log("in LoginResponse");
  req=wholereq.responseJSON;
  console.log(req);
  if(req.status != "ok") {
    NSB.MsgBox(req.statusmsg);
$("#id_menu_user_name").text("Login");
return;
}

console.log("Ok login, checking permissions");
LoginUser = req.result;


token=Split(req.webtoken,".");
WebToken = req.webtoken;
console.log(token);
 //body = token(1)
 //console.log(body)
 //JavaScript
 //      realbody = atob(body);
 //  End JavaScript
 //realbody=body
 //  console.log(realbody)
 //  userrecord = JSON.parse(realbody)
  userrecord = {};
  userrecord.name = "Patrick Payne";

  console.log(userrecord);

  console.log($("#id_menu_user_name").text);
$("#id_menu_user_name").text(userrecord.name);
  
ChangeForm(OrdersListForm, "fade");

  mainload();
  Authenticated = true;
  NavMenu.disabled = false;
  NavServerContainer.show();



}
function mainload() {
    MyLogger("In main load" ,2);
    orders= {};
 //  URL=URL + "?file=montague.receipts.get.by.date.json"
    THISURL=URL;
    MyLogger(THISURL,2);
    NSB.ShowProgress("Retrieving from server");
    MvAjax(THISURL,"GET" ,"" ,mainloadresponse);

}

 function mainloadresponse(realreq) {

    MyLogger("In mainloadresponse" ,1);
    MyLogger(realreq,3);

    req = realreq.responseJSON;

    numrecords = req.records.length;
    Orders = req.records;
    console.log("Clearing data table");
    MainListSelectList.clear();
    columns = [{"title":"Order #"} ,{"title":"Order Date"},{"title":"Customer #"}];
    console.log(columns);

    data = [];
    console.log("Getting ready to loop thru "  +  numrecords);
    for     (i = (1); i  <= numrecords; i ++) {
         record = Orders[i-1];
         row = [record.orderid, record.orderdate,record.customerid ];
         data[i-1] = row;
    }
    MyLogger("Setting data" ,2);
    MainListSelectList.settings.aaData = data;
    MyLogger("Setting aoColumns" ,2);
    MainListSelectList.settings.aoColumns = columns;
    MyLogger("doing build" ,2);
    MainListSelectList.build();
    NSB.ShowProgress("");

}

MainListSelectList.onclick = function(choice) {
  event = choice;
  console.log(event);
  if(typeof(event.target._DT_CellIndex) != "object" ) { return; }
 var row,col;
  row = event.target._DT_CellIndex.row;
  col = event.target._DT_CellIndex.column;

    console.log(order);
    order = Orders[row];
    MyLogger(order,2);
    UpdateOrderForm();
};

OrdersListForm.onshow = function() {
  NavBack.hide();
  NavMenu.show();
  CurrentForm="OrdersListForm";
};
var MainAction;
var MainIndex;
var ItemPos=0;

function UpdateOrderObject() {

}


function UpdateOrderForm() {
 // This will set us up for a new receipt
  MyLogger("In update Order Form" ,2);

  OrderId.value                                 = order.orderid;
  OrderDate.value                               = order.orderdate;
  CustomerNumber.value                          = order.customerid;

  SummaryTable.clear();
 //SummaryColumns = [{"title":"LI#", "width":"15px"} ,{"title":"P#","width":"15px"},{"title":"PART#","width":"120px", "className":"nowrap"},{"title":"Description"},{"title":"ORD","width":"70px", "className":"text-right"},{"title":"BO","width":"70px", "type":"num", "className":"text-right"},{"title":"Recvd","width":"70px", "type":"num", "className":"text-right"}]
  SummaryColumns = [{"title":"PART#" ,"width":"150px" , "className":"nowrap"},{"title":"Description" ,"width":"350px"},{"title":"Per" ,"width":"50" , "className":"text-right"},{"title":"Qnty" ,"width":"50px" , "type":"num" , "className":"text-right"}];
  SummaryTable.settings.aoColumns = SummaryColumns;
  NumItems=order.items.length;
  data = [];

  for     (x=(1); x <= NumItems; x++) {
    item=order.items[x-1];
    row = [ item.productid, item.productdesc, item.unitprice, item.quantity];
    MyLogger(row,3);
    data[x-1]=row;
    MyLogger(row,3);
  }

  SummaryTable.settings.aaData = data;
  SummaryTable.settings.data = "";
  SummaryTable.build();

  NavBack.show();
  CurrentForm="OrdersEditForm";
  ChangeForm(OrdersEditForm);

}

function SaveOrder() {
   THISURL= URL + "/"  +  encodeURI(item.orderid);
   payload=order;

   MvAjax(THISURL,"POST" ,payload,SaveOrderResponse);
}

function SaveOrderResponse(thisreq) {
   MyLogger("In SaveOrderResponse" ,2);
   MyLogger(thisreq,2);
}

OrdersEditForm.onshow = function() {
  NavBack.show();
  console.log("Showing OrdersEditForm");
  CurrentForm = "OrdersEditForm";
};

SummaryTable.onclick = function(choice) {
  event = choice;
  console.log(event);
  if(typeof(event.target._DT_CellIndex) != "object" ) { return; }
 var row,col;
  row = event.target._DT_CellIndex.row;
  col = event.target._DT_CellIndex.column;
  console.log(row);
  d = SummaryTable.settings.aaData[row];

  UpdateOrderObject();
  ItemPos=row; // lets save away the row position
  LoadOrderItem(row);
  CurrentForm="OrdersItemForm";
  ChangeForm(OrdersItemForm);

};

OrderEditSaveButton.onclick = function() {
  MyLogger("Saving Order" ,2);
  SaveOrder();
};
function MvAjax(THISURL, PostType, PayLoad, ReturnFunction) {
  console.log(ReturnFunction);
  console.log(THISURL);
  PayLoadJson = JSON.stringify(PayLoad);
  THISURL = RTrim(THISURL);


if(UCase(PostType) == "GET") {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": THISURL,
  "method": PostType,
  "headers": {
  },
  "complete": ReturnFunction
  }
$.ajax(settings);
} else {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": THISURL,
  "method": PostType,
  "headers": {
    "Content-Type": "application/json"
  },
  "processData": false,
  "complete": ReturnFunction,
  "data": PayLoadJson
}
$.ajax(settings);
}


}

function MyLogger(logmessage,loglevel) {
    console.log(logmessage);

}

  function MyConvertDateToInputDate(datetoconvert) {
 // right now we will convert 11/11/2001 to 2001-11-2001
   d=Split(datetoconvert,"/");
   if(Len(d[0] ) == 1) {
   }


   NewDate = d[2] + "-" + d[0] + "-" + d[1];
  return NewDate;
}
function LoadOrderItem(pos) {
   item=order.items[pos];
   SummarySubPartNo.value               = item.productid;
   SummarySubDescription.value          = item.productdesc;
   SummarySubPerUnit.value              = item.unitprice;
   SummarySubQuantity.value             = item.quantity;

}

function SaveOrderItem() {
   MyLogger("In Save Order Item" ,2);

   MyLogger("Pos = "  +  ItemPos, 2);
   item=order.items[ItemPos];
   item.quantity                        = SummarySubQuantity.value;

   MyLogger(item,3);
   order.items[ItemPos] = item;
   MyLogger(item,3);

}

OrderItemsSaveButton.onclick = function() {
  SaveOrderItem();
  UpdateOrderForm();
  ChangeForm(OrdersEditForm);

  CurrentForm = "OrderItemForm";
};

OrdersItemForm.onshow = function() {
  CurrentForm = "OrdersItemForm";
};