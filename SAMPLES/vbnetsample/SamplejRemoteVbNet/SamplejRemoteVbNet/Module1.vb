Imports com.jbase.jremote

Imports System
Imports System.Diagnostics

Module Module1

    Sub Main()

        Console.WriteLine("Starting")

        Dim myfactory = New DefaultJConnectionFactory()
        myfactory.Host = "localhost"
        myfactory.Port = "20002"
        Console.Write("Connecting to database:")
        Dim connection = myfactory.getConnection("test", "password")
        com.jbase.jremote.Overides.RawJDynArrayToString = True
        Console.Write("[ok]" & Environment.NewLine)

        Dim MyFile As JFile

        Console.WriteLine("Opening nw orders")

        MyFile = connection.open("NW.ORDERS")

        Dim MyRecord As JDynArray

        Console.WriteLine("Reading Record ")

        MyRecord = MyFile.read("10250")

        Console.WriteLine(MyRecord.get(1).ToString)

        Dim numorders = MyRecord.getNumberOfValues(10)

        Console.WriteLine("Number of Orders = " & numorders.ToString)
        Dim ProductId As String
        Dim Units As Integer
        Dim Price As Integer
        Dim x As Integer

        For x = 1 To numorders
            ProductId = MyRecord.get(10, x)
            Units = MyRecord.get(11, x)
            Price = MyRecord.get(12, x)

            Console.WriteLine(ProductId + Chr(9) + Units.ToString + Chr(9) + Price.ToString)

        Next x

    End Sub

End Module

