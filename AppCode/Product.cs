using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Windows.Media;
using System.Drawing;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Windows.Forms;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using System.ServiceModel;
using System.Runtime.Remoting.Contexts;

/// <summary>
/// Summary description for Product
/// </summary>
public class Product
{
    private int serial;
    private string prodName;
    private int price;
    private string prodShape;
    private string categoryName;
	public Product()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public List<Dictionary<string, object>> getProdByOrderNum(int orderNum)
    {
        DbService db = new DbService();

        string cmd = @"select p.ProdName, count(pio.Serial) as 'Quantity', p.Price  from
                     PRODUCT p inner join PRODUCT_IN_ORDER pio on p.Serial = pio.Serial
                     inner join USER_ORDERS uo on pio.OrderNum = uo.orderNum
                     where pio.orderNum = @orderNum
                     group by p.ProdName, pio.Serial, p.Price";

        return db.GetDirectoryList(cmd, new SqlParameter("@orderNum", orderNum));

    }

}