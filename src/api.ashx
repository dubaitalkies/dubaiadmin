<%@ WebHandler Language="C#" Class="api" %>

using System;
using System.Web;
using System.Linq;
using System.IO;

public class api : IHttpHandler {
    string apiid;
    public void ProcessRequest (HttpContext context) {
        var httpRequest = HttpContext.Current.Request;

        var postedFile = httpRequest.Files["Image"];
        apiid = httpRequest.Params["apiid"];
        string imageNmae = httpRequest.Params["imgname"];

        if (postedFile != null)
        {
            if (apiid == "thamb")
            {
                var filepath = HttpContext.Current.Server.MapPath("~/assets/img/thamb/" + imageNmae);
                postedFile.SaveAs(filepath);
            }

        }
        else{
            HttpFileCollection hfc = HttpContext.Current.Request.Files;
            if(hfc.Count>0){
                System.Web.HttpPostedFile hpf = hfc[0];
                if (hpf.ContentLength > 0)
                {
                    Random generator = new Random();
                    String r = generator.Next(0, 100000000).ToString("D8")+DateTime.Now.ToString("dd-MM-yyyy-HH-mm-ss")+".jpg";
                    hpf.SaveAs(HttpContext.Current.Server.MapPath("~/assets/img/blog/"+r));
                    context.Response.Write("{\"imageUrl\":\"https://www.dubaitalkies.com/assets/img/blog/"+r+"\"}");
                }
                else{
                    context.Response.Write("{\"imageUrl\":\"No image found\"}");
                }
            }
            else{
                    context.Response.Write("{\"imageUrl\":\"No any file present\"}");
            }
        }


    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}