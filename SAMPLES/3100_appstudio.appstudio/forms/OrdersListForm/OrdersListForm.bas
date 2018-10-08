Function mainload()
    MyLogger("In main load",2)
    orders= {}
   '  URL=URL + "?file=montague.receipts.get.by.date.json"
    THISURL=URL
    MyLogger(THISURL,2)
    NSB.ShowProgress("Retrieving from server")
    MvAjax(THISURL,"GET","",mainloadresponse)
   
 End Function
  
 Function mainloadresponse(realreq)
   
    MyLogger("In mainloadresponse",1)
    MyLogger(realreq,3)

    req = realreq.responseJSON
     
    numrecords = req.records.length
    Orders = req.records
    console.log("Clearing data table")
    MainListSelectList.clear()
    columns = [{"title":"Order #"} ,{"title":"Order Date"},{"title":"Customer #"}]
    console.log(columns)
    
    data = []
    console.log("Getting ready to loop thru " & numrecords)
    For i = 1 To numrecords
         record = Orders[i-1]
         row = [record.orderid, record.orderdate,record.customerid ]
         data[i-1] = row
    Next i
    MyLogger("Setting data",2)
    MainListSelectList.settings.aaData = data
    MyLogger("Setting aoColumns",2)
    MainListSelectList.settings.aoColumns = columns
    MyLogger("doing build",2)
    MainListSelectList.build()
    NSB.ShowProgress("")
    
End Function

Function MainListSelectList_onclick(choice)
  event = choice
  console.log(event)
  If typeof(event.target._DT_CellIndex) <> "object" Then return
  Dim row, col
  row = event.target._DT_CellIndex.row
  col = event.target._DT_CellIndex.column
 
    console.log(order)
    order = Orders[row]
    MyLogger(order,2)
    UpdateOrderForm()
End Function

Function OrdersListForm_onshow()
  NavBack.hide()
  NavMenu.show()
  CurrentForm="OrdersListForm"
End Function

