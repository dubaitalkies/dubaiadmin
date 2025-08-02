import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  sucs:any;
  message:String="This product is succesfully saved!";
  tags:any=[];user:any;type:any;
  prod:any=[{name:1,image:[],imagename:[],color:""}]
  uprod:any={categories:"",description:""};btn:any="Save Product";
  project:any = localStorage.getItem("project");
  imgurl = localStorage.getItem("imgurl");
  url = localStorage.getItem("url");


  constructor(public orgnigation:OrgnigationService,private activatedroute: ActivatedRoute) { 
    window.scroll(0,0);
    var admin=localStorage.getItem('admin');
    if(admin!=null){
      this.user = JSON.parse(admin);
    }

    this.activatedroute.params.subscribe((data:any) => {
      this.type=data.type;
      if(this.type!=null){
        var product=localStorage.getItem('product');
        if(product!=null)
        this.uprod = JSON.parse(product);
        this.prod[0].image = this.uprod.images.split(",");
        this.btn = "Update Project";
      }
    });
  }

  job:any=new FormGroup({
    name:new FormControl("",[Validators.required]),
    shortDescription:new FormControl("",[Validators.required]),
    salePrice:new FormControl("",[Validators.required]),
    regularPrice:new FormControl("0",[Validators.required]),
    inStock:new FormControl("10",[Validators.required]),
    categories:new FormControl("",[Validators.required]),
    description:new FormControl(""),
    images:new FormControl(""),
    status:new FormControl("1"),
    groupid:new FormControl(""),
    prodcolor:new FormControl(""),
    tags:new FormControl(""),
    visibilityCatalog:new FormControl("visible"),
    pills:new FormControl("",[Validators.required]),
    published:new FormControl("1"),
    isFeatured:new FormControl("0"),
    allowCustomerReviews:new FormControl("1"),
    title:new FormControl(""),
    keyword:new FormControl(""),
    discription:new FormControl(""),
    axClass:new FormControl(""),
    project:new FormControl(this.project)
  });

  ngOnInit(): void {

  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '120px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  checkcng(pos:any){
    if(this.tags[pos].status)
    {this.tags[pos].status=false}
    else{this.tags[pos].status=true;}
  }
  selectcat(event:any){
    if(event.target.value!=""){
      this.fetchTags(event.target.value);
    }
    else{
      this.tags=[];
    }
  }
  fetchTags(categ:any){
    let resp = this.orgnigation.getTag(categ);
    resp.subscribe(
      Response=>{
        this.tags=Response;
        for (let data of this.tags) {data.status = false;}
      },
      error=>{this.tags=[];})
  }


  myFiles: any = []; 
  remark = ''; 
  onselectfile(event:any,post:any){
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        this.myFiles.push(file);

        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.prod[post].image.push(e.target.result);
          this.prod[post].imagename.push(file.name);
        }
        reader.readAsDataURL(file);
      }
    }
  }
  cosephoto(index:number,post:number){
    this.prod[post].image.splice(index, 1);
  }

  saveproduct(){
    if (this.job.invalid) {
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus(); 
      this.job.get('name').markAsTouched();
      this.job.get('shortDescription').markAsTouched();
      this.job.get('salePrice').markAsTouched();
      this.job.get('regularPrice').markAsTouched();
      this.job.get('pills').markAsTouched();
      this.job.get('categories').markAsTouched();
    }
    else{
      
      if(this.btn!="Save Product"){
        if(this.myFiles.length>0){
          const frmData = new FormData();
          for (var i = 0; i < this.myFiles.length; i++) { 
            frmData.append("fileUpload", this.myFiles[i]);  
            if (i == 0) {  
              frmData.append("remark", this.remark);  
            }
          } 
          var image = "img";
          if(this.project==3 || this.project==4){image = "images";}
          this.uprod.images = this.imgurl+"assets/"+image+"/product/" + this.myFiles[0].name;

          //this.orgnigation.postMultiFile(frmData).subscribe();
          //this.orgnigation.postFile("medlyfe",this.myFiles[0],'ore',this.imgurl).subscribe();
          //this.orgnigation.postMultiFile(this.myFiles[0],this.imgurl).pipe().subscribe();
          this.orgnigation.postFile("medlyfe",this.myFiles[0],"ore").subscribe();

        }
        
        this.orgnigation.saveProduct(this.uprod).subscribe();
          
        this.sucs = true;
        this.message = "Project Successfully updated!";
        window.scroll(0,0);
      }
      else{
        var q=0;
        var prodata= [];
        var gid = this.orgnigation.getRandNum(10000000,99999999);
        
        var cag="";
        for(var b in this.tags){
          if(this.tags[b].status){cag+=this.tags[b].name+",";}
        }
        if(cag.length>0){this.job.value.tags=cag.slice(0, -1);}
        
        var image = "img";
        if(this.project==3 || this.project==4){image = "images";}
        for (let data of this.prod) {
          if(data.imagename.length>0){
            var imurl="";
            //for (let imgurl of data.imagename) {imurl+= imgurl+",";}
            for (let imgurl of data.imagename) {imurl+= this.imgurl+"assets/"+image+"/product/" + this.myFiles[0].name;break;}

            //imurl = imurl.slice(0, -1);
            this.job.value.images = imurl;
            this.job.value.groupid = gid;
            this.job.value.prodcolor = data.color;
            this.job.value.userid = this.user.id;
            this.job.value.axClass = this.orgnigation.replaceUrl(this.job.value.name.trim());

            prodata.push(Object.assign({},this.job.value));
            q++;
          }
        }
        
        if(q>0){
          const frmData = new FormData();
          for (var i = 0; i < this.myFiles.length; i++) { 
            frmData.append("fileUpload", this.myFiles[i]);  
            if (i == 0) {  
              frmData.append("remark", this.remark);  
            } 
          } 
          //this.orgnigation.postMultiFile(frmData).subscribe();
          

          //alert(JSON.stringify(prodata));
          this.orgnigation.postFile("medlyfe",this.myFiles[0],"ore").subscribe();
        
          this.orgnigation.saveAllProduct(prodata).subscribe();
          
          this.sucs = true;
          this.job.reset();
          this.job.value.categories = "";
          this.prod=[{name:1,image:[],imagename:[],color:""}]
          window.scroll(0,0);
        }
        else{
          alert("Please select product image");
        }
      }
    }
  } 
}
