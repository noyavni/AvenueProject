using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Windows.Forms;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using System.ServiceModel;
using System.Runtime.Remoting.Contexts;
/// <summary>
/// Summary description for Order
/// </summary>
public class Order
{
    
    private int orderNum;
    private DateTime orderDate;
    private int totalPrice;
    //private Product[] prods;
    private List<Product> prods;
	public Order()
	{
        //Product[] prods = new Product[100];
       List<Product> prods = new List<Product>();

	}

    public List<Dictionary<string, object>> getOrdersByUserName(string userName)
    {
        DbService db = new DbService();

        string cmd = @"select OrderNum, convert(varchar,orderDate,103) as 'OrderDate', TotalPrice 
                       from ORDERS
                       where UserName = @userName";

        return db.GetDirectoryList(cmd, new SqlParameter("@userName", userName));

    }

    public List<Dictionary<string, object>> getAllOrders()
    {
        DbService db = new DbService();

        string cmd = @"select OrderNum, convert(varchar,orderDate,103) as 'OrderDate', TotalPrice, UserName
                        from ORDERS";

        return db.GetDirectoryList(cmd);
    }

    public int insertNewOrder(string userName, int totalPrice)
    {
        DbService db = new DbService();
        string cmd = @"insert into ORDERS (OrderDate, UserName,TotalPrice)
                     values (convert(date,GETDATE()),@userName, @totalPrice)";



        return db.ExecuteQuery(cmd, new SqlParameter("@userName", userName),
                                    new SqlParameter("@totalPrice", totalPrice));

    }

    public int insertProductsToOrder(string prodName)
    {
        DbService db = new DbService();

        string cmd = @"insert into PRODUCT_IN_ORDER
                      values ((select MAX(OrderNum) from ORDERS), @prodName)";

        return db.ExecuteQuery(cmd, new SqlParameter("@prodName", prodName));


    }


    public List<Dictionary<string, object>> getOrderDetails(int orderNum)
    {
        DbService db = new DbService();

        string cmd = @"select uo.OrderNum, pio.ProdName, p.Price, p.DesignName 
                       from ORDERS uo
                       inner join PRODUCT_IN_ORDER pio on (uo.OrderNum = pio.OrderNum)
                       inner join PRODUCT p on (p.ProdName = pio.ProdName)
                       where uo.OrderNum = @orderNum";

        return db.GetDirectoryList(cmd, new SqlParameter("@orderNum", orderNum));
    }
}