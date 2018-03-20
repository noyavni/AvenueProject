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
/// Summary description for Review
/// </summary>
public class Review
{
    private DateTime revDate;
    private int numOfStars;
    private string revText;
    private string userName;

    public Review()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public List<Dictionary<string, object>> getReviews()
    {
        DbService db = new DbService();

        string cmd = @"select r.ReviewNum, r.NumOfStars, r.RevText, r.UserName, convert(varchar,r.RevDate,103) as 'RevDate' 
                     from REVIEW r
                     order by r.RevDate desc";

        return db.GetDirectoryList(cmd);

    }

    public int insertNewReviews(string numOfStars, string text, string user)
    {
        DbService db = new DbService();
        string cmd = @"insert into REVIEW 
                     values(convert(date,GETDATE()),@numOfStars,@text, @user)";


        return db.ExecuteQuery(cmd, new SqlParameter("@numOfStars", numOfStars),
                                    new SqlParameter("@text", text),
                                    new SqlParameter("@user", user));


    }

}