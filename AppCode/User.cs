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
/// Summary description for User
/// </summary>
public class User
{
    private string userName;
    private string password;
    private string firstName;
    private string lastName;
    private DateTime dateOfBirth;
    private string streetName;
    private int streetNum;
    private string city;
    private long postCode;
    private string phoneNumber;
    private BodyShape bShape;

	public User()
	{

	}

    public List<Dictionary<string, object>> loginVerification(string userName, string password)
    {
        DbService db = new DbService();

        string cmd = @"select * from USER_DETAILS where @userName = UserName and @password = Pass";

        return db.GetDirectoryList(cmd, new SqlParameter("@userName", userName), new SqlParameter("@password", password));

    }

    public int register(string userName, string password, string firstName, string lastName, string phoneNumber, 
        string city, string street, string postcode, string userBodyShape)
    {
        DbService db = new DbService();
        string cmd = @"insert into USER_DETAILS (UserName, pass, Fname, Lname, Phone, 
                        City, Street, PostCode, UserBodyShape)
                    values (@userName , @password, @firstName, @lastName, @phoneNumber, 
                            @city, @street, @postcode, @userBodyShape)";

        return db.ExecuteQuery(cmd, new SqlParameter("@userName", userName),
                                    new SqlParameter("@password", password),
                                    new SqlParameter("@firstName", firstName),
                                    new SqlParameter("@lastName", lastName),
                                    new SqlParameter("@phoneNumber", phoneNumber),
                                    new SqlParameter("@city", city),
                                    new SqlParameter("@street", street),
                                    new SqlParameter("@postcode", postcode),
                                    new SqlParameter("@userBodyShape", userBodyShape));

    }

    public int updateUserDetails(string userName, string phone, string city, string street, string postcode)
    {
        DbService db = new DbService();

        string cmd = @"UPDATE USER_DETAILS
                       SET Phone = @phone, City = @city, Street = @street, PostCode = @postcode
                       WHERE UserName = @userName";
        
        return db.ExecuteQuery(cmd, new SqlParameter("@phone", phone),
                                    new SqlParameter("@city", city),
                                    new SqlParameter("@street", street),
                                    new SqlParameter("@postcode", postcode),
                                    new SqlParameter("@userName", userName)
                               );  
    }

    public int updateUserBShape(string userName, string bShape)
    {
        DbService db = new DbService();

        string cmd = @"UPDATE USER_DETAILS
                        SET UserBodyShape = @bShape
                        WHERE UserName = @userName;";

        return db.ExecuteQuery(cmd, new SqlParameter("@bShape", bShape),
                                    new SqlParameter("@userName", userName));

    }

    public int addLike(string userName, string prodName)
    {
        DbService db = new DbService();

        string cmd = @"insert into LIKES
                    values (@userName, @prodName)";

        return db.ExecuteQuery(cmd, new SqlParameter("@userName", userName), new SqlParameter("@prodName", prodName));
    }

    public int deleteLikes(string userName, string prodName)
    {
        DbService db = new DbService();

        string cmd = @"DELETE FROM LIKES
                       WHERE UserName = @userName AND ProdName = @prodName";

        return db.ExecuteQuery(cmd, new SqlParameter("@userName", userName), new SqlParameter("@prodName", prodName));
    }
    

    public List<Dictionary<string, object>> getUserLikes(string userName)
    {
        DbService db = new DbService();

        //string cmd = @"select p.ProdName, p.Price, p.DesignName 
        //             from LIKES l inner join PRODUCT p on l.ProdName = p.ProdName
        //             where l.UserName = @userName";

        string cmd = @"select p.ProdName, p.Price, i.content, i.ext, l.UserName
                       from LIKES l inner join PRODUCT p on (l.ProdName = p.ProdName)
                       inner join Images i on (i.ProductName = p.ProdName)
                        where l.UserName = @userName";

        return db.GetDirectoryList(cmd, new SqlParameter("@userName", userName));
    }
}