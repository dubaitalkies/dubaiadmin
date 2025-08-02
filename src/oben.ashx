<%@ WebHandler Language="C#" Class="meerachasma" %>

using System;
using System.Web;
using System.Linq;
using System.IO;

public class meerachasma : IHttpHandler {
    string apiid;

    public void ProcessRequest (HttpContext context) {

        string imageNmae = null;
        var httpRequest = HttpContext.Current.Request;

        var postedFile = httpRequest.Files["Image"];
        apiid = httpRequest.Params["apiid"];
        if (postedFile != null)
        {
            if (apiid == "product")
            {
                imageNmae = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).ToArray());
                imageNmae = imageNmae + Path.GetExtension(postedFile.FileName);
                var filepath = HttpContext.Current.Server.MapPath("~/assets/images/products/" + imageNmae);
                postedFile.SaveAs(filepath);
            }
            if (apiid == "blog")
            {
                imageNmae = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).ToArray());
                imageNmae = imageNmae + Path.GetExtension(postedFile.FileName);
                var filepath = HttpContext.Current.Server.MapPath("~/assets/images/blog/" + imageNmae);
                postedFile.SaveAs(filepath);
            }
        }
        else
        {
            string sPath = "";
            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/assets/images/products/");
            var request = System.Web.HttpContext.Current.Request;
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            if (request["remark"] != null)
            {
                var remark = request["remark"].ToString();

                for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
                {
                    System.Web.HttpPostedFile hpf = hfc[iCnt];
                    if (hpf.ContentLength > 0)
                    {
                        string FileName = (Path.GetFileName(hpf.FileName));
                        if (!File.Exists(sPath + FileName))
                        {
                            hpf.SaveAs(sPath + FileName);
                        }
                    }
                }
            }
        }

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}