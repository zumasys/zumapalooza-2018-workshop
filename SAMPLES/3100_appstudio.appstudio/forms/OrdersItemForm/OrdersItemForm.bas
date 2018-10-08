
Function LoadOrderItem(pos)
   item=order.items[pos]
   SummarySubPartNo.value               = item.productid
   SummarySubDescription.value          = item.productdesc
   SummarySubPerUnit.value              = item.unitprice
   SummarySubQuantity.value             = item.quantity
   
End Function

Function SaveOrderItem()
   MyLogger("In Save Order Item",2)
   
   MyLogger("Pos = " & ItemPos, 2)
   item=order.items[ItemPos]
   item.quantity                        = SummarySubQuantity.value
   
   MyLogger(item,3)
   order.items[ItemPos] = item
   MyLogger(item,3)

End Function
 
Function OrderItemsSaveButton_onclick()
  SaveOrderItem()
  UpdateOrderForm()
  ChangeForm(OrdersEditForm)
  
  CurrentForm = "OrderItemForm"
End Function

Function OrdersItemForm_onshow()
  CurrentForm = "OrdersItemForm"
End Function
