using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Designers
/// </summary>
public class Designers
{
    private string designerName;
    private bool isActive;
	public Designers()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public List<Dictionary<string, object>> getAllDesignersFromDB()
    {

        DbService db = new DbService();

        string cmd = @"select* from DESIGNERS where isAvailable = 1";

        return db.GetDirectoryList(cmd);

    }

}