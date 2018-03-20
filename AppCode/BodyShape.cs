using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for BodyShape
/// </summary>
public class BodyShape
{

    private double hip;
    private double waist;
    private double bust;
    private double shoulders;
	public BodyShape()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string getBodyShape(BodyShape bShape)
    {
        string bodyShape = "";

        bodyShape = calcBodyShapeAlgorithem(bShape.shoulders, bShape.bust,bShape.waist, bShape.hip);

        return bodyShape;
    }
    public string calcBodyShapeAlgorithem(double shoulders, double bust, double waist, double hips)
    {
        string bodyShape = "";
        double inchToCm = 2.54;

        /*convert mesures to inch*/
        shoulders = shoulders / inchToCm;
        bust = bust / inchToCm;
        waist = waist / inchToCm;
        hips = hips / inchToCm;


        /* Inverted Triangle */
        if (shoulders / hips >= 1.05 || bust / hips >= 1.05)
            bodyShape = "Inverted Triangle";
        /* Rectangle */
        else if ((waist / shoulders >= 0.75 || waist / bust >= 0.75) && shoulders / bust <= 1.05 && shoulders / hips <= 1.05 && (hips / bust <= 1.05 || bust / hips <= 1.05))
            bodyShape = "Rectangle";
        /* Triangle */
        else if (hips / shoulders >= 1.05 || hips / bust >= 1.05)
            bodyShape = "Triangle";
        /* Hourglass */
        else if (waist / shoulders <= 0.75 && waist / bust <= 0.75 && waist / hips <= 0.75 && (shoulders / hips <= 1.05 || hips / shoulders <= 1.05))
            bodyShape = "Hourglass";
        else
            bodyShape = "Unknown";


        return bodyShape;

    }

    public List<Dictionary<string, object>> getFits(string bShape)
    {
        DbService db = new DbService();
        string cmd = @"select* from FITS
                        where BShape=@bShape";

        return db.GetDirectoryList(cmd, new SqlParameter("@bShape", bShape));
        
    }
        
}