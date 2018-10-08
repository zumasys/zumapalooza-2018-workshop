
Function Button1_onclick()
   Dim payload={}
   payload.name=Input1.value
   
  JavaScript
  var settings = {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "complete": ajaxresponse,
  "data": JSON.stringify(payload)
  }
  End JavaScript
  
  console.log(settings)
   
   'Ajax("http://localhost:20002/api/helloworld","POST", JSON.stringify(payload) ,ajaxresponse)
    Ajax("http://localhost:20002/api/helloworld",settings)
    
End Function

Function ajaxresponse(response)
   console.log("In ajax response")
   console.log(response)
   Input2.value = response.responseJSON.message
 End Function
 
Function Button2_onclick()
  ChangeForm(Form2)
  
End Function
