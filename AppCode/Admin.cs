using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Admin
/// </summary>
public class Admin : User
{
	public Admin()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public void insertNewCategory(string category) { }
    public void insertNewProduct(Product prod) { }
    public void viewOrders() { }
    public void editCategories() { }
    public void editProduct() { }
    public void deleteReview() { }
    public void editNextSeasonProd() { }
    public int getNumOfVotes(string NS_ProdName) { return 1; }
    public void editDesigners() { }

}