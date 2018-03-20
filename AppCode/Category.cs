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
/// Summary description for Category
/// </summary>
public class Category
{
    public string categoryName;
    public string image;
	public Category()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public void setCategoryName(string categoryName)
    {
        this.categoryName = categoryName;
    }

    public void setImage(string image)
    {
        this.image = image;
    }
    public List<Dictionary<string, object>> getAllCategoriesFromDB()
    {

        DbService db = new DbService();
        string cmd = @"select Category from CATALOG_TYPE";

        return db.GetDirectoryList(cmd);

    }

   
}