import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

function _window():any {
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class OrgnigationService {
  private baseUrl:string = environment.baseUrl;
  private imgUrl:string = environment.imgUrl;
  

  constructor(private http:HttpClient,private router: Router) { }

  get nativeWindow():any{
    return _window();
  }

  
  getAdmin(id:any,pid:any){
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
  saveProduct(data:any){
    return this.http.post(`${this.baseUrl}/products`,data);
  }
  saveAllProduct(data:any){
    return this.http.post(`${this.baseUrl}/allproducts`,data);
  }
  getProductByVendore(id:any,project:any){
    return this.http.get(`${this.baseUrl}/productslist/`+id+`/`+project);
  }
  getCourseById(id:any){
    return this.http.get(`${this.baseUrl}/product/`+id);
  }
  deleteProduct(id:any){
    return this.http.delete(`${this.baseUrl}/product/`+id);
  }

  getAllUser(type:any,project:any){
    return this.http.get(`${this.baseUrl}/user/`+type+`/`+project);
  }
  deleteUser(uid:any){
    return this.http.delete(`${this.baseUrl}/users/`+uid);
  }
  saveUser(data:any){
    return this.http.post(`${this.baseUrl}/users`,data);
  }


  saveBooking(data:any){
    return this.http.post(`${this.baseUrl}/booking`,data);
  }
  saveAllbooking(data:any){
    return this.http.post(`${this.baseUrl}/allbooking`,data);
  }
  getBookingByStatus(type:any,project:any){
    return this.http.get(`${this.baseUrl}/bookingstatus/`+type+`/`+project);
  }
  getBookingbyid(type:any){
    return this.http.get(`${this.baseUrl}/bookingsbyid/`+type);
  }
  
  
  saveBlog(data:any){
    return this.http.post(`${this.baseUrl}/saveblog`,data);
  }
  getBlogs(pid:any){
    return this.http.get(`${this.baseUrl}/allblog`);
  }
  getVideoBlogs(pid:any){
    return this.http.get(`${this.baseUrl}/videoblog`);
  }
  deleteBlog(id:any){
    return this.http.delete(`${this.baseUrl}/dblog/`+id);
  }

  saveCategory(data:any){
    return this.http.post(`${this.baseUrl}/category`,data);
  }
  getCategory(id:any){
    return this.http.get(`${this.baseUrl}/categorys`);
  }
  deleteCategory(id:any){
    return this.http.delete(`${this.baseUrl}/dcategory/`+id);
  }
  

  

  saveTag(data:any){
    return this.http.post(`${this.baseUrl}/tag`,data);
  }
  getTag(categ:any){
    return this.http.get(`${this.baseUrl}/tag/`+categ);
  }
  deleteTag(id:any){
    return this.http.delete(`${this.baseUrl}/tag/`+id);
  }
  replaceUrl(data:any){
    if(data!=null){
      return data.replaceAll("- ","").replaceAll("& ","").replaceAll("%","").replaceAll(",","").replaceAll(" (","").replaceAll("(","").replaceAll(")","").replaceAll("+ ","").replaceAll(".","").replaceAll("'","").replaceAll(" ","-").replaceAll("/","-").replaceAll("+","-").replaceAll("?","").replaceAll("'","").replaceAll(":","").replaceAll("’","").replaceAll("-–-","-").toLowerCase();
    }
    return data;
  }


  doLogin(user:any){
    return this.http.post(`${this.baseUrl}/login`,[user.username,user.password]);
  }

  loginUser(token:any){
    localStorage.setItem("token",token);
    var data = {"contact":token}
      this.http.post(`${this.baseUrl}/memberapp`,data).subscribe(
      (user:any)=>{
        if(user.usertype=="Student"){
          localStorage.setItem("instructore",JSON.stringify(user));
          var url = localStorage.getItem("url");
          if(url==null){ this.router.navigate(['/']);}
          else{
            localStorage.removeItem("url");
            this.router.navigate([url]);
          }
          this.router.navigate(['/']);
        }
        else if(user.usertype=="Instructor"){
          localStorage.setItem("instructore",JSON.stringify(user));
          this.router.navigate(['/']);
        }
        else{
          alert("Userid or Password Invailed!");
        }
    });
    return true;
  }
  
  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token==undefined || token==='' || token==null){return false;}
    else{return true;}
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("instructore");
    return true;
  }
  getToken(){
    return localStorage.getItem("token");
  }

  sendSms(header:any,templateid:any,number:any,message:any){
    var api ="https://www.hellotext.live/vb/apikey.php?apikey=nNhf8ki8budw5qUG&senderid="+header+"&templateid="+templateid+"&number="+number+"&message="+ encodeURIComponent(message);
    return this.http.get(api).subscribe();
  } 

  postFile(api:any,fileToUpload:File,name:any){
    const endpoint = `${this.imgUrl}api.ashx`;
    const formData:FormData = new FormData();
    formData.append('Image',fileToUpload,fileToUpload.name);
    formData.append('apiid',api);
    formData.append('imgname',name);
    return this.http.post(endpoint,formData);
  }
  postMultiFile(filedata:any,url:any){
    return this.http.post(`${url}api.ashx`,filedata);
  }

  /* postFile(api:any,fileToUpload:File){
    const endpoint = `https://www.starchemistshop.com/api.php`;
    const formData:FormData = new FormData();
    formData.append('imgname',fileToUpload,fileToUpload.name);
    formData.append('apiid',api);
    return this.http.post(endpoint,formData);
  } */


  
  /* postVideo(fileToUpload:File,name:any){
    const endpoint = `https://www.starchemistshop.com/api.php`;
    const formData:FormData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    formData.append('imgname',name);
    return this.http.post(endpoint,formData,{reportProgress:true,observe:"events"});
  } */


  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getRandNum(min:any, max:any){
    return Math.floor(Math.random() * (max - min) + min);
  }
  splited(data:any,pos:any){
    return data.split("!")[pos]
  }
  trim(data:any,length:any){
    if(data.length>length){
      return data.substring(0,length)+"...";
    }
    else{return data;}
  }

}
