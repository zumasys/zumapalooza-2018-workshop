Dim MainAction
Dim MainIndex
Dim ItemPos=0

Function UpdateOrderObject()

End Function


Function UpdateOrderForm()
  ' This will set us up for a new receipt
  MyLogger("In update Order Form",2)
  
  OrderId.value                                 = order.orderid
  OrderDate.value                               = order.orderdate
  CustomerNumber.value                          = order.customerid

  SummaryTable.clear()
  'SummaryColumns = [{"title":"LI#", "width":"15px"} ,{"title":"P#","width":"15px"},{"title":"PART#","width":"120px", "className":"nowrap"},{"title":"Description"},{"title":"ORD","width":"70px", "className":"text-right"},{"title":"BO","width":"70px", "type":"num", "className":"text-right"},{"title":"Recvd","width":"70px", "type":"num", "className":"text-right"}]
  SummaryColumns = [{"title":"PART#","width":"150px", "className":"nowrap"},{"title":"Description","width":"350px"},{"title":"Per","width":"50", "className":"text-right"},{"title":"Qnty","width":"50px", "type":"num", "className":"text-right"}]
  SummaryTable.settings.aoColumns = SummaryColumns
  NumItems=order.items.length
  data = []
  
  For x=1 To NumItems
    item=order.items[x-1]
    row = [ item.productid, item.productdesc, item.unitprice, item.quantity]
    MyLogger(row,3)
    data[x-1]=row
    MyLogger(row,3)
  Next x

  SummaryTable.settings.aaData = data
  SummaryTable.settings.data = ""
  SummaryTable.build()

  NavBack.show()
  CurrentForm="OrdersEditForm"
  ChangeForm(OrdersEditForm)  
  
End Function

Function SaveOrder()
   THISURL= URL + "/" & encodeURI(item.orderid)
   payload=order
   
   MvAjax(THISURL,"POST",payload,SaveOrderResponse)
 End Function
 
Function SaveOrderResponse(thisreq)
   MyLogger("In SaveOrderResponse",2)
   MyLogger(thisreq,2)
End Function

Function OrdersEditForm_onshow()
  NavBack.show()
  console.log("Showing OrdersEditForm")
  CurrentForm = "OrdersEditForm"
End Function

Function SummaryTable_onclick(choice)
  event = choice
  console.log(event)
  If typeof(event.target._DT_CellIndex) <> "object" Then return
  Dim row, col
  row = event.target._DT_CellIndex.row
  col = event.target._DT_CellIndex.column
  console.log(row)
  d = SummaryTable.settings.aaData[row]

  UpdateOrderObject()
  ItemPos=row; ' lets save away the row position
  LoadOrderItem(row)
  CurrentForm="OrdersItemForm"
  ChangeForm(OrdersItemForm)
    
End Function

Function OrderEditSaveButton_onclick()
  MyLogger("Saving Order",2)
  SaveOrder()
End Function

