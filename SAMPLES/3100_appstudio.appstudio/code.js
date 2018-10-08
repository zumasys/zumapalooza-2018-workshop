//Dim URL="http://127.0.0.1:8180/api/ws-phantom"
 //Dim URL="http://localhost:20002/api/ws-phantom"
 //Dim URL="https://www.multivaluedb.com/powerbiapi/ws-phantom"
 //Dim URL="http://localhost:20002/api/request"
var URL="https://www.multivaluedb.com/customers/montague/api/request";
var CurrentForm="";

var receipt = {};
var po = {};
var inventory = {};

var receipts = {};
var pos = {};
var inventories={};


var Authenticated;
console.log("Hello Patrick");


function Main() {
  Authenticated = false;
  console.log("ver 1.1");
  DebugServerPort.value = URL;
  console.log(URL);

  HideAllContainers();
  MainListSelectList.clear();
  NavServerContainer.hide();

  DoLogin();
 }

function HideAllContainers() {
  LoginForm.hide();
  ReceiptsListForm.hide();
  ReceiptsEditForm.hide();

}




NavMenu.onclick = function(choice) {
  if(TypeName(choice) == "object") {
    return;
  }
    console.log(choice);
    if(choice == "Receipts") {
        ChangeForm(ReceiptsListForm);
    }
    if(choice == "Logout") {
       MainListSelectList.clear();
 //NavServer.hide()

      NavMenu.disabled = true;
      NavServerContainer.hide();
      console.log(NavServerContainer.hidden);

      ChangeForm(LoginForm);
    }

};

NavBack.onclick = function() {
  NavBack.hide();
 MyLogger("nav back, currentform = "  +  CurrentForm,2);
 if(CurrentForm == "ReceiptsEditForm") {
   ChangeForm(ReceiptsListForm);
   CurrentForm="ReceiptsListForm";
 }
 if(CurrentForm == "ReceiptsItemForm") {
   ChangeForm(ReceiptsEditForm);
   CurrentForm="ReceiptsEditForm";
 }
 if(CurrentForm == "InventoryTransferForm") {
   ChangeForm(ReceiptsItemForm);
   CurrentForm="ReceiptsItemForm";
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
  
ChangeForm(ReceiptsListForm, "fade");

  mainload();
  Authenticated = true;
  NavMenu.disabled = false;
  NavServerContainer.show();



}
var Records;
var MainRecord = {};

function mainmenu() {
  console.log("In phantoms");
 //HideAllContainers()
 //MainListContainer.show()

}

function mainload() {
   MyLogger("In main load" ,2);
   receipts= {};
   var searchtype = ReceiptsListSearchBy.value;
    MyLogger("ReceiptsListSearchByUpdate = " + searchtype);
    MyLogger(MainListSearchDateFrom);
 //MainListSearchDateFrom.value=""
 //MainListSearchDateTo.value=""
 //MainListSearchReceipt.value = ""

    switch (true) {

    case ((searchtype) == "0"):
 //THISURL = URL + "?receipt=" + MainListSearchReceipt.value + "&file=montague.receipts.get.by.receipt.json"
        THISURL = URL + "/receipt/?receipt="  +  MainListSearchReceipt.value;

        MyLogger("Setting to 0");
        MainListSearchDateFrom.hide();
        MainListSearchDateTo.hide();
        MainListSearchReceipt.show();
	break;
    case ((searchtype) == "1"):
        THISURL = URL + "/receipts/?startdate="  +  FormatDateTime(MainListSearchDateFrom.value,2)  +  "&enddate="+FormatDateTime(MainListSearchDateTo.value,2);

        MyLogger("Setting to 1");
        MainListSearchDateFrom.show();
        MainListSearchDateTo.show();
        MainListSearchReceipt.hide();

    }
 //  URL=URL + "?file=montague.receipts.get.by.date.json"
   MyLogger(THISURL);
   MvAjax(THISURL,"GET" ,"" ,mainloadresponse);

}

 function mainloadresponse(realreq) {

    console.log("In mainloadresponse");
    console.log(realreq);

    req = realreq.responseJSON;
    if(ReceiptsListSearchBy.value == "0") {
       origrec=req;
       req.receipts = [];
       req.receipts[0]=origrec;
     }

    numrecords = req.receipts.length;
    Records = req.receipts;
    console.log(Records);
    console.log("Clearing data table");
    MainListSelectList.clear();
    columns = [{"title":"Receipt #" , "width":"25px"} ,{"title":"Date Created" ,"width":"100px"}];
    console.log(columns);

    data = [];
    console.log("Getting ready to loop thru "  +  numrecords);
    for     (i = (1); i  <= numrecords; i ++) {
         record = req.receipts[i-1];
         row = [record.receiptId, record.recDate ];
         data[i-1] = row;
 //        console.log(record.program)
 //html = "<table width=100%>"
 //html = html & "<tr><td width=60%>" & record.program & "</td>"
 //html = html & "<td align=right>" & record.datetime & "</td>"
 //html = html & "</tr>"
 //html = html & "<tr>"
 //html = html & "<td width=10%>C: " & record.command & "</td>"
 //html = html & "<td>" & record.logon & "</td>"
 //html = html & "</tr></table>"
 //MainListSelectList.addItem(html)
       }
    console.log("Setting data");
    MainListSelectList.settings.aaData = data;
    console.log("Setting aoColumns");
    MainListSelectList.settings.aoColumns = columns;
    console.log("doing build");
    MainListSelectList.build();

 //MainListSelectLastRefresh.value = FormatDateTime(Now)
 //Catch err
 //   NSB.MsgBox("Error contacting server")
 //End Try
}

MainListSelectList.onclick = function(choice) {
  event = choice;
  console.log(event);
  if(typeof(event.target._DT_CellIndex) != "object" ) { return; }
 var row,col;
  row = event.target._DT_CellIndex.row;
  col = event.target._DT_CellIndex.column;


 //NSB.MsgBox("You picked " & Phantoms[choice].program)
 //PhantomsListContainer.hide()

    console.log(receipt);
    receipt = {};
    receipt = Records[row];

    UpdateReceiptForm();
};



ReceiptsListForm.onshow = function() {
  NavBack.hide();
  NavMenu.show();
  CurrentForm="ReceiptsListForm";
};

ReceiptsAddButton.onclick = function() {
    MyLogger("Clicked add receipt" ,1);
    AddReceipt();
};

ReceiptsSearchButton.onclick = function() {
   mainload();
};

ReceiptsListSearchBy.onchange = function() {
   MyLogger("In ReceiptsListSearchBy" ,2);
   ReceiptsListSearchByUpdate();
};

function ReceiptsListSearchByUpdate() {
  MyLogger("In ReceiptsListSearchByupdate" ,2);

 var searchtype = ReceiptsListSearchBy.value;
  MyLogger("ReceiptsListSearchByUpdate = " + searchtype);
  MyLogger(MainListSearchDateFrom);
  MainListSearchDateFrom.value="";
  MainListSearchDateTo.value="";
  MainListSearchReceipt.value = "";
  switch (true) {

case ((searchtype) == 0):
      MyLogger("Setting to 0");
      MainListSearchDateFrom.hide();
      MainListSearchDateTo.hide();
      MainListSearchReceipt.show();
      MainListSearchReceipt.disabled = false;
	break;
case ((searchtype) == 1):
      MyLogger("Setting to 1");
      MainListSearchDateFrom.show();
      MainListSearchDateTo.show();
      MainListSearchReceipt.hide();

   }


}
var MainAction;
var MainIndex;
var PartNos = [];


function AddReceipt() {
    MyLogger("In addreceipt" ,2);
    console.log(receipt);
    receipt = {};
    receipt.receiptId = "";
    receipt.lastreceipt = "";
    receipt.pONo = "";
    receipt.type = "N";
    receipt.packingSlip = "";
    receipt.notes="";
    receipt.postDate = "";
    receipt.recDate = CDate(new Date());
    receipt.recFlag = "Y";
    receipt.stamp="web*web*";
    receipt.entryPort = "web";


    receipt.currentStatus = "";
    receipt.linePostTime="";
    receipt.entryPoint="";
    receipt.items = new Array();
    console.log(receipt);

 //UpdateReceiptForm()
    THISURL = URL + "/nextid/?type=receipts";
    MvAjax(THISURL,"GET" ,"" ,AddReceiptResponse);

}

function AddReceiptResponse(realreq) {
    MyLogger("In AddReceiptResponse" ,2);
    req = realreq.responseJSON;
    receipt.receiptId = req.nextId;
    receipt.lastreceipt = req.nextId -1;

    UpdateReceiptForm();

    NavBack.show();
    CurrentForm="ReceiptsEditForm";
    ChangeForm(ReceiptsEditForm);
    ReceiptFormPo.disabled = false;
    ReceiptFormPo.focus();

}




function UpdateReceiptObject() {
 receipt.lastreceipt            = ReceiptFormLastId.value;
 receipt.receiptId              =  ReceiptFormReceiptNo.value;
 receipt.pONo                   =  ReceiptFormPo.value;
 // ReceiptFormReceiptDate.value          = FormatDateTime(receipt.postDate,vbYYYYhyphenMMhyphenDD)
 receipt.recDate                = FormatDateTime(ReceiptFormReceiptDate.value,2);
 //receipt.type                   = ReceiptFormType.value
 switch (true) {
  case ((receipt.type) == "A"):
     ReceiptFormType.value = "1";
	break;
  default:
      ReceiptFormType.value = "0";
 }

 receipt.packingSlip            =  ReceiptFormPackingSlipNo.value;

}


function UpdateReceiptForm() {
 // This will set us up for a new receipt
  MyLogger("In update Receipt Form" ,2);
  ReceiptFormLastId.value               = receipt.lastreceipt;
  ReceiptFormReceiptNo.value            =  receipt.receiptId;
  ReceiptFormPo.value                   = receipt.pONo;
  ReceiptFormReceiptDate.value          = FormatDateTime(receipt.recDate,10);
 //ReceiptFormType.value                 = receipt.type
  switch (true) {
    case ((receipt.type) == "1"):
      ReceiptFormType.value = "A";
	break;
    default:
      ReceiptFormType.value = "N";
   }
   ReceiptFormPackingSlipNo.value        = receipt.packingSlip;


  SummaryTable.clear();
 //SummaryColumns = [{"title":"LI#", "width":"15px"} ,{"title":"P#","width":"15px"},{"title":"PART#","width":"120px", "className":"nowrap"},{"title":"Description"},{"title":"ORD","width":"70px", "className":"text-right"},{"title":"BO","width":"70px", "type":"num", "className":"text-right"},{"title":"Recvd","width":"70px", "type":"num", "className":"text-right"}]
  SummaryColumns = [{"title":"PART#" ,"width":"150px" , "className":"nowrap"},{"title":"Description" ,"width":"350px"},{"title":"ORD" ,"width":"50" , "className":"text-right"},{"title":"BO" ,"width":"50px" , "type":"num" , "className":"text-right"},{"title":"Recvd" ,"width":"50px" , "type":"num" , "className":"text-right"}];
  SummaryTable.settings.aoColumns = SummaryColumns;
  NumItems=receipt.items.length;
  data = [];
  PartNos = [];

  for     (x=(1); x <= NumItems; x++) {
    item=receipt.items[x-1];
    fulldesc = item.desc  +  " "  +  item.desc2;
 //    row = [ x, item.pOLineNo, item.partNo, fulldesc, item.qtyOrd, item.qtyBO, item.qtyRec ]
    row = [ item.partNo, fulldesc, item.qtyOrd, item.qtyBO, item.qtyRec ];
console.log(row);
    PartNos[x-1] = item.partNo;

    data[x-1]=row;
    console.log(row);
  }


  SummaryTable.settings.aaData = data;
  SummaryTable.settings.data = "";
  SummaryTable.settings.columnDefs = [ { "targets": -1, "className":"dt-body-right" } ];
  SummaryTable.build();


 //PhantomsDetailSleep.disabled = True

 //PhantomsDetailMainContainer.show()
  NavBack.show();
  CurrentForm="ReceiptsEditForm";
  ChangeForm(ReceiptsEditForm);

}

function SaveReceipt() {
   THISURL= URL + "/receipt/?receipt="  +  receipt.receiptId;
   payload=receipt;

   MvAjax(THISURL,"POST" ,payload,SaveReceiptResponse);
}

function SaveReceiptResponse(thisreq) {
   MyLogger("In SaveReceiptResponse" ,2);
   MyLogger(thisreq,2);
}



ReceiptsEditForm.onshow = function() {
  NavBack.show();
  console.log("Showing ReceiptsEditForm");
  CurrentForm = "ReceiptsEditForm";
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
  SummarySubPartNo_contents.disabled = true;
  SummarySubDescription_contents.disabled = true;
  UpdateReceiptObject();
  loadreceiptitem(row);
  CurrentForm="ReceiptsItemForm";
  ChangeForm(ReceiptsItemForm);



};

SummaryButton1.onclick = function() {
  UpdateReceiptObject();
  scanreceiptitem();

};

ReceiptEditSaveRiButton.onclick = function() {
  console.log(receipt);
  NSB.MsgBox("Planning to save receipt");
  SaveReceipt();
};

function LookupPO() {
   MyLogger("In lookupPO" ,2);
   ponumber=ReceiptFormPo.value;
   UpdateReceiptObject();
   if(ponumber == "" )  { return; }
   THISURL = URL + "/po/?po="  +  ponumber;
   MyLogger(THISURL);
   MvAjax(THISURL,"GET" ,"" ,LookupPoResponse);
}

 function LookupPoResponse(realreq) {
    console.log("In LookupPoResponse");
    console.log(realreq);

    req = realreq.responseJSON;

    if(req.status == "error") {
 //MsgBox(req.statusmsg)
       ReceiptFormPo.value="";
       ReceiptFormPo.placeholder = req.statusmsg;
 //ReceiptFormPo.focus()
       $("#ReceiptFormPo_contents").select();
       return;
    }
    console.log(req);

 // Lets clear out items
    receipt.items=[];
    numitems=req.items.length;
    for     (x=(1); x <= numitems; x++) {
      record=req.items[x-1];
      newrecord=record;
      newrecord.lineNo = x;
 //newrecord.qtyBO=""
      newrecord.qtyRec="";
      newrecord.serialNo="";
      newrecord.stockId="";
      newrecord.surcharge="";
      newrecord.unitCost="";
      newrecord.frtCost="";
      MyLogger(newrecord,3);
      receipt.items[x-1]=newrecord;
    }

    UpdateReceiptForm();
    ReceiptFormPo.disabled = true;
    $("#ReceiptFormReceiptDate_contents").select();

}


ReceiptFormPo.onchange = function() {
  MyLogger("In PO change" ,2);
  UpdateReceiptObject();
  LookupPO();
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
    "X-ZUMASYS-GATEWAY-KEY": "MontagueKey12345"
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
    "Content-Type": "application/json",
    "X-ZUMASYS-GATEWAY-KEY": "MontagueKey12345"
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
function CalcBo() {
 //SummarySubBO.value = SummarySubOrdered.value - SummarySubReceived.value
}

SummarySubReceived.onchange = function() {
  CalcBo();
};

SummarySubBtnReceiveAll.onclick = function() {
  SummarySubReceived.value = SummarySubOrdered.value - SummarySubBO.value;
  CalcBo();
};

Inventory.onclick = function() {
  CurrentForm="InventoryTransferForm";
  ChangeForm(InventoryTransferForm);

};

SummarySubPartNo.onchange = function() {
  MyLogger("Scanned product" ,2);
  console.log(SummarySubPartNo.value);
  ProductCode=SummarySubPartNo.value;

  found = IndexOf(PartNos,ProductCode);
  foundpos= found + 1;
  if(found >= 0) {
 //MsgBox("Found at position " & foundpos)
    SummarySubPartNo_contents.disabled = true;
    SummarySubDescription_contents.disabled = true;
    loadreceiptitem(found);
    SummarySubReceived.focus();
    $("#SummarySubReceived_contents").select();

 } else {

    SummarySubPartNo.value = "";
    SummarySubPartNo.focus();
    SummarySubPartNo.placeholder = "Invalid Product";
    $("#SummarySubPartNo_contents").select();

  }

};

function loadreceiptitem(pos) {
   item=receipt.items[pos];
   SummarySubPoPos.value                = item.pOLineNo;
   SummarySubReceiptPos.value           = item.lineNo;
   SummarySubPartNo.value               = item.partNo;
   SummarySubDescription.value          = item.desc  +  " "  +  item.desc2;
   SummarySubOrdered.value              = item.qtyOrd;
   SummarySubReceived.value             = item.qtyRec;
   SummarySubBO.value                   = item.qtyBO;
}

function savereceiptitem() {
   MyLogger("In savereceiptitem" ,2);

   pos=SummarySubReceiptPos.value-1;
   MyLogger("Pos = "  +  pos, 2);
   item=receipt.items[pos];
   MyLogger(item,3);

   item.pOLineNo        = SummarySubPoPos.value;
   item.lineNo          = SummarySubReceiptPos.value;
   item.partNo          = SummarySubPartNo.value;
 //item.desc            = SummarySubDescription.value
   item.qtyOrd          = SummarySubOrdered.value;
   item.qtyRec          = SummarySubReceived.value;
   item.qtyBO           = SummarySubBO.value;

   receipt.items[pos] = item;
   MyLogger(item,3);

}


function scanreceiptitem() {
 // Sets ups receipts item page for a "search/scan" function

 // Set all the values to blank
  SummarySubPartNo.value               = "";
  SummarySubDescription.value           = "";
  SummarySubOrdered.value               = "";
  SummarySubReceived.value              = "";
  SummarySubBO.value                    = "";
  SummarySubPoPos.value                 = "";
  SummarySubReceiptPos.value            = "";

 // Enable the Product id and descriptions, probably not needed but doing it anyways

  SummarySubPartNo_contents.disabled = false;
  SummarySubDescription_contents.disabled = false;

 // Set to this form
  CurrentForm="ReceiptsItemForm";
  ChangeForm(ReceiptsItemForm);

 // Set the focus to part no
  SummarySubPartNo.focus();
 // Make it select all the values, probably not needed
  $("#SummarySubPartNo_contents").select();
}



ScanAnotherButton.onclick = function() {
  savereceiptitem();
  UpdateReceiptForm();
  scanreceiptitem();
};

ReceiptItemsSaveToRiButton.onclick = function() {
  savereceiptitem();
  UpdateReceiptForm();
  ChangeForm(ReceiptsEditForm);

  CurrentForm = "ReceiptsItemForm";
};

ReceiptsItemForm.onshow = function() {
  CurrentForm = "ReceiptsItemForm";
};