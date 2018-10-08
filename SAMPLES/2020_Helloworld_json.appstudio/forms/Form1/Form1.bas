
Function Button1_onclick()
   Dim payload={}
   payload.name=Input1.value
   
  Dim settings = {}
  settings.async=True
  settings.crossDomain=True
  settings.crossDomain=True
  settings.method="POST"
  settings.complete=ajaxresponse
   
   'Ajax("http://localhost:20002/api/helloworld","POST", JSON.stringify(payload) ,ajaxresponse)
    Ajax("http://localhost:20002/api/helloworld",settings)
    
End Function

Function ajaxresponse(response)
   console.log("In ajax response")
   console.log(response)
   Input2.value = response.message
 End Function
 