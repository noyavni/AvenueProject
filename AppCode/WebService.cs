using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Windows.Forms;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using System.ServiceModel;
using System.Text;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Avenue_DB"].ConnectionString);
    
    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]//Specify return format.
    public string HelloWorld()
    {
        string ret = "Hello World";
        return new JavaScriptSerializer().Serialize(ret);
    }


    //USER Methods:
    [WebMethod]
    public string register(string userName, string password, string firstName, string lastName, string phoneNumber, 
                         string city,string street, string postcode,
                         string shoulders, string bust, string waist, string hips)
    {
        User user = new User();
        BodyShape bs = new BodyShape();
        int affected;
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        string rows;
        string userBodyShape = "";

        if (shoulders != "" && bust != "" && waist != "" && hips != "")
        {
            userBodyShape = bs.calcBodyShapeAlgorithem(Convert.ToDouble(shoulders), Convert.ToDouble(bust), Convert.ToDouble(waist), Convert.ToDouble(hips));
        }

        affected = user.register(userName, password, firstName, lastName, phoneNumber, city, street, postcode, userBodyShape);

        if(affected == 1)
            rows = userBodyShape;
        else
            rows = "Unexpected Error";

        //Context.Response.Clear();
        //Context.Response.ContentType = "application/json";
        //Context.Response.Write(rows);
        //Context.Response.Flush();
        //Context.Response.End();
        return rows;
    }

    //[WebMethod]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]

    //public void getAllUsersFromDB()
    //{
    //    User user = new User();
    //    List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
    //    JavaScriptSerializer serializer = new JavaScriptSerializer();

    //    rows = user.getAllUsersFromDB();


    //    Context.Response.Clear();
    //    Context.Response.ContentType = "application/json";
    //    Context.Response.Write(serializer.Serialize(rows));
    //    Context.Response.Flush();
    //    Context.Response.End();

    //}

    [WebMethod]
    public void loginVerification(string userName, string password)
    {
        User user = new User();

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        rows = user.loginVerification(userName, password);

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }


    [WebMethod]
    public void getAllDesignersFromDB()
    {

        Designers des = new Designers();

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        rows = des.getAllDesignersFromDB();

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();

    }


    [WebMethod]
    public void getAllCategoriesFromDB()
    {
        Category cat = new Category();
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        rows = cat.getAllCategoriesFromDB();

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();

    }

    [WebMethod]
    public void getCategory()
    {
        DbService db = new DbService();
        DataSet ds = db.GetDataSetByQuery("select * from CATALOG_TYPE");
        //DataTable dt = new DataTable("products");
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, string[]>> rows = new List<Dictionary<string, string[]>>();
        Dictionary<string, string[]> row;

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string img;
            string ext = ds.Tables[0].Rows[i]["ext"].ToString();
            ext = ext.Substring(1, ext.Length - 1);
            string pname = ds.Tables[0].Rows[i]["Category"].ToString();
            byte[] b = (byte[])ds.Tables[0].Rows[i]["content"];
            img = "data:image/" + ext + ";base64," + Convert.ToBase64String(b);
            row = new Dictionary<string, string[]>();
            string[] col = { pname, img };
            row.Add("image", col);
            rows.Add(row);
        }


        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();

    }

    [WebMethod]
    public void getProducts(string categoryName)
    {
        DbService db = new DbService();
        DataSet ds = db.GetDataSetByQuery("select content, ext from CATALOG_TYPE where Category = @categoryName",
                                            new SqlParameter("@categoryName", categoryName));


        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;

        string img;
        string ext = ds.Tables[0].Rows[0]["ext"].ToString();
        ext = ext.Substring(1, ext.Length - 1);
        string pname = categoryName;
        byte[] b = (byte[])ds.Tables[0].Rows[0]["content"];
        img = "data:image/" + ext + ";base64," + Convert.ToBase64String(b);
        row = new Dictionary<string, object>();
        row.Add("image", img);
        rows.Add(row);


        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }
    [WebMethod]
    public void getReviews() 
    {
        Review rev = new Review();

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        rows = rev.getReviews();

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }


    [WebMethod]
    public int insertNewReviews(string numOfStars, string text, string user)
    {

        Review rev = new Review();

        return rev.insertNewReviews(numOfStars, text, user);

    }

//    [WebMethod]
//    public int setProductImages(string category)
//    {
//        for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
//        {
//            HttpPostedFile file = HttpContext.Current.Request.Files[i];
//            Stream s = file.InputStream;
//            BinaryReader br = new BinaryReader(s);
//            byte[] b = br.ReadBytes((int)s.Length);
//            string ext = Path.GetExtension(file.FileName);
//            string id = Path.GetFileName(file.FileName);

//            if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".bmp" || ext == ".BMP" || ext == ".JPG" || ext == ".PNG" || ext == ".JPEG") // בדיקה שזה סיומת חוקית של תמונה
//            {
//                DbService db = new DbService();
//                //db.ExecuteQuery(@"insert into Images values(@id, @content, @ext)",     //פונקציה שמזינה שורה בטבלה
//                //    new SqlParameter("@content", b), new SqlParameter("@ext", ext), new SqlParameter("@id", id));

//                db.ExecuteQuery(@"insert into CATALOG_TYPE values(@content, @ext) 
//                                  where Category = @Category",     //פונקציה שמזינה שורה בטבלה
//                    new SqlParameter("@content", b), new SqlParameter("@ext", ext), new SqlParameter("@Category", category));
//            }
//        }
//        return 1;
//    }

    [WebMethod]
    public string calcBodyShapeAlgorithem(double shoulders, double bust, double waist, double hips)
    {
        BodyShape bShape = new BodyShape();
        return bShape.calcBodyShapeAlgorithem(shoulders, bust, waist, hips);

    }

    [WebMethod]
    public void insertNewCategotry()
    {
        int success = 0;
        string pCategory = HttpContext.Current.Request.Params["pcategory"];
       
        HttpPostedFile file = HttpContext.Current.Request.Files[0];
        Stream s = file.InputStream;
        BinaryReader br = new BinaryReader(s);
        byte[] b = br.ReadBytes((int)s.Length);
        string ext = Path.GetExtension(file.FileName);
        string id = Path.GetFileName(file.FileName);

        if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".bmp" || ext == ".BMP" || ext == ".JPG" || ext == ".PNG" || ext == ".JPEG") // בדיקה שזה סיומת חוקית של תמונה
        {
        DbService db = new DbService();
        success = db.ExecuteQuery(@"insert into CATALOG_TYPE values (@Category, @content, @ext)",     //פונקציה שמזינה שורה בטבלה
        new SqlParameter("@content", b), new SqlParameter("@ext", ext),
        new SqlParameter("@Category", pCategory));
    }

    }

    [WebMethod]
    public void insertNewOrder(string userName, int totalPrice)
    {
        Order order = new Order();

        int res;
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        res = order.insertNewOrder(userName, totalPrice);

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(res));
        Context.Response.Flush();
        Context.Response.End();       
    }

    [WebMethod]
    public void insertProductsToOrder(string[] prods)
    {
        Order order = new Order();
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        int res = 0;

        for (int i = 0; i < prods.Length ; i++)
        {
            res = order.insertProductsToOrder(prods[i]);
        }

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(res));
        Context.Response.Flush();
        Context.Response.End();
    }



    [WebMethod]
    public void getOrdersByUserName(string userName)
    {
        Order order = new Order();
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        rows = order.getOrdersByUserName(userName);

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }


    [WebMethod]
    public void getProdsByOrderNum(int orderNum)
    {
        Order order = new Order();

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        rows = order.getOrderDetails(orderNum);

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }

    [WebMethod]
    public void getAllOrders()
    {
        Order order = new Order();
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        rows = order.getAllOrders();

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }

    [WebMethod]
    public int addLike(string userName, string prodName)
    {
        User user = new User();

        return user.addLike(userName, prodName);
    }

    [WebMethod]
    public int deleteLikes(string userName, string prodName)
    {
        User user = new User();

        return user.deleteLikes(userName, prodName);
    }
    

    [WebMethod]
    public void getUserLikes(string userName)
    {


        DbService db = new DbService();
        DataSet ds = db.GetDataSetByQuery(@"select p.ProdName, p.Price, i.content, i.ext, p.PShape
                                            from LIKES l inner join PRODUCT p on (l.ProdName = p.ProdName)
                                            inner join Images i on (i.ProductName = p.ProdName)
                                            where l.UserName = @userName"
                                , new SqlParameter("@userName", userName));

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, string[]>> rows = new List<Dictionary<string, string[]>>();
        Dictionary<string, string[]> row;

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string img;
            string ext = ds.Tables[0].Rows[i]["ext"].ToString();
            ext = ext.Substring(1, ext.Length - 1);
            string pname = ds.Tables[0].Rows[i]["ProdName"].ToString();
            string price = ds.Tables[0].Rows[i]["Price"].ToString();
            string PShape = ds.Tables[0].Rows[i]["PShape"].ToString();
            byte[] b = (byte[])ds.Tables[0].Rows[i]["content"];
            img = "data:image/" + ext + ";base64," + Convert.ToBase64String(b);
            row = new Dictionary<string, string[]>();
            string[] col = { pname, img, price, PShape };
            row.Add("prod", col);
            rows.Add(row);
        }


        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }

    [WebMethod]
    public void setProductImages()
    {
        int success = 0;
        int rows;
        JavaScriptSerializer serializer = new JavaScriptSerializer();

        string pName = HttpContext.Current.Request.Params["pname"];
        string pPrice = HttpContext.Current.Request.Params["pprice"];
        string pShape = HttpContext.Current.Request.Params["pshape"];
        string pCategory = HttpContext.Current.Request.Params["pcategory"];
        string pDesign = HttpContext.Current.Request.Params["pdesign"];
        for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
        {
            HttpPostedFile file = HttpContext.Current.Request.Files[i];
            Stream s = file.InputStream;
            BinaryReader br = new BinaryReader(s);
            byte[] b = br.ReadBytes((int)s.Length);
            string ext = Path.GetExtension(file.FileName);
            string id = Path.GetFileName(file.FileName);

            if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".bmp" || ext == ".BMP" || ext == ".JPG" || ext == ".PNG" || ext == ".JPEG") // בדיקה שזה סיומת חוקית של תמונה
            {
                DbService db = new DbService();
                success = db.ExecuteQuery(@"insert into Images values(@id, @content, @ext, @ProductName)",     //פונקציה שמזינה שורה בטבלה
                    new SqlParameter("@content", b), new SqlParameter("@ext", ext), new SqlParameter("@id", id),
                    new SqlParameter("@ProductName", pName));
            }
            else rows=0;
        }
        if (success == 1 && pName != null && pPrice != null && pShape != null && pCategory != null)
        {
            DbService db = new DbService();
            db.ExecuteQuery(@"insert into PRODUCT values(@ProdName, @Price, @ProdDesign, @PShape, @Category)",     //פונקציה שמזינה שורה בטבלה
                new SqlParameter("@ProdDesign", pDesign), new SqlParameter("@ProdName", pName), new SqlParameter("@Price", pPrice),
                new SqlParameter("@PShape", pShape), new SqlParameter("@Category", pCategory));
            rows = 1;
        }
        else rows = 0;
        


        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }

    [WebMethod]
    public void getAllProductShapesFromDB()
    {
        SqlCommand cmd = new SqlCommand(@"select * from PRODUCT_SHAPE", con);

        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable("PShape");

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;


        try
        {
            con.Open();

            da.Fill(dt);

            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
        }
        catch
        {

        }
        finally
        {
            con.Close();

        }

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();

    }

    [WebMethod]
    public void getProductsByCategory(string category)
    {
        DbService db = new DbService();
        DataSet ds = db.GetDataSetByQuery("select ProdName,Price,PShape,content,ext from PRODUCT inner join Images on PRODUCT.ProdName = Images.ProductName where PRODUCT.Category=@category order by ProdName desc"
                                           ,new SqlParameter("@category", category));
        //DataTable dt = new DataTable("products");
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, string[]>> rows = new List<Dictionary<string, string[]>>();
        Dictionary<string, string[]> row;

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            string img;
            string ext = ds.Tables[0].Rows[i]["ext"].ToString();
            ext = ext.Substring(1, ext.Length - 1);
            string pname = ds.Tables[0].Rows[i]["ProdName"].ToString();
            string price = ds.Tables[0].Rows[i]["Price"].ToString();
            string pshape = ds.Tables[0].Rows[i]["PShape"].ToString();
            byte[] b = (byte[])ds.Tables[0].Rows[i]["content"];
            img = "data:image/" + ext + ";base64," + Convert.ToBase64String(b);
            row = new Dictionary<string, string[]>();
            string[] col = { pname, img, price, pshape };
            row.Add("image", col);
            rows.Add(row);
        }


        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    
    }

    [WebMethod]
    public void getFits(string bShape)
    {
        BodyShape bshape = new BodyShape();

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        rows = bshape.getFits(bShape);

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(rows));
        Context.Response.Flush();
        Context.Response.End();
    }

    [WebMethod]
    public void updateUserBShape(string userName, string bShape)
    {
        User user = new User();
        int res;
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        res = user.updateUserBShape(userName, bShape);

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(res));
        Context.Response.Flush();
        Context.Response.End();
    }

    [WebMethod]
    public void updateUserDetails(string userName, string phone, string city, string street, string postcode)
    {
        User user = new User();
        int res;
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        res = user.updateUserDetails(userName, phone, city, street, postcode);

        Context.Response.Clear();
        Context.Response.ContentType = "application/json";
        Context.Response.Write(serializer.Serialize(res));
        Context.Response.Flush();
        Context.Response.End();
    }
}
 

