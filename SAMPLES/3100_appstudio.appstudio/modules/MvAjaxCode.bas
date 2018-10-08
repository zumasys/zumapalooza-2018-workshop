Function MvAjax(THISURL, PostType, PayLoad, ReturnFunction)
  console.log(ReturnFunction)
  console.log(THISURL)
  PayLoadJson = JSON.stringify(PayLoad)
  THISURL = RTrim(THISURL)

  
If UCase(PostType) = "GET" Then
    JavaScript
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
  End JavaScript
    
Else

  JavaScript
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
  End JavaScript
End If


End Function

Function MyLogger(logmessage,loglevel)
    console.log(logmessage)
    
  End Function
  
  Function MyConvertDateToInputDate(datetoconvert)
  ' right now we will convert 11/11/2001 to 2001-11-2001
   d=Split(datetoconvert,"/")
   If Len(d(0)) = 1 Then 
   End If
  
   
   NewDate = d(2) + "-" + d(0) + "-" + d(1)
  return NewDate
End Function
