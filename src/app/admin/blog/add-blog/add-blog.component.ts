import { formatDate } from '@angular/common';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CompressImageService } from 'src/app/service/compress-image.service';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  sucs:any;
  message:String="This blog is succesfully saved!";
  tags:any=[];user:any;type:any;
  prod:any=[{name:1,image:[],imagename:[],color:""}]
  uprod:any={categories:"",description:""};btn:any="Create Blog";
  bloger:any={};
  project:any = localStorage.getItem("project");
  imgurl = localStorage.getItem("imgurl");


  constructor(public orgnigation:OrgnigationService,private activatedroute: ActivatedRoute,private compressImage: CompressImageService) { 
    var ublog = localStorage.getItem("ublog");
    this.activatedroute.params.subscribe((data:any) => {
      this.type=data.url;
      if(this.type!=null){
        this.btn="Update Blog";
        if(ublog!=null){
          this.bloger = JSON.parse(ublog);
          this.imgess = this.bloger.images;
          if(this.bloger.categories!=null){
            var cat = this.bloger.categories.split(",");
            for(var i=0;i<cat.length;i++){
              var row = { "id": cat[i], "title": cat[i] }
              this.selectedItems.push(row);
            }
          }
        }
      }
    });

    this.fetchData();
  }

  ngOnInit(): void {

  }

  blog:any=new FormGroup({
    blogTitle:new FormControl("",[Validators.required]),
    shortDescription:new FormControl("",[Validators.required]),
    images:new FormControl("",[Validators.required]),
    description:new FormControl("",[Validators.required]),
    categories:new FormControl("",[Validators.required]),
    title:new FormControl(""),
    keyword:new FormControl(""),
    discription:new FormControl(""),
    status:new FormControl("Active"),
    url:new FormControl(""),
    userid:new FormControl("1"),
    views:new FormControl("0"),
    click:new FormControl("0"),
    date:new FormControl(formatDate(new Date(), 'yyyy-MM-dd HH:mm', 'en')),
    project:new FormControl(this.project),
  });
  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '250px',
      maxHeight: '480px',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: 'p',
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
        name:'Button',
        class:'btn btn-primary font-weight-bold px-3'
      },
      {
        name: 'Grren',
        class: 'or-green',
      },
      {
        name: 'Bold Grren',
        class: 'or-bold-green'
      },
      {
        name: 'Red',
        class: 'or-red',
      },
      {
        name: 'Bold Red',
        class: 'or-bold-red'
      },
      {
        name: 'blue',
        class: 'or-blue'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h2',
      },
    ],
    uploadUrl: 'https://www.dubaitalkies.com/api.ashx',
    uploadWithCredentials: false,
    sanitize: true,
    outline:false,
    toolbarPosition: 'top'
  };


  selectedItems:any = [];
  dropdownSettings:IDropdownSettings={
    singleSelection: false,
    idField: 'id',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 15,
    allowSearchFilter: true
  };
  dropDownSelect=false;

  /* onDropDownClose(){
    if(this.dropDownSelect){
      this.dropDownSelect=false;
      this.getselectedid(this.selectedItems);
    }
  } */
  benifitsselected:any="";
  getselectedid(item: any){
    this.benifitsselected = "";
    if(item.length>0){
      var ndta = "";
      for (var val of item) {ndta+=val.title+",";}
      this.benifitsselected = ndta.slice(0, -1);
    }
  }
  category:any=[];
  fetchData(){
    this.category=[];
    let resp = this.orgnigation.getCategory(this.project);
    resp.subscribe(
      (Response:any)=>{this.category=Response;})
  }
  

  imgess:any;
  loading:any=false;

  saveBlog() {
  if (this.imgess != null) { if (this.imgess.includes(".")) { this.blog.removeControl("images"); } }
  if (this.blog.invalid) {
    var invalidFields: any = [].slice.call(document.getElementsByClassName('ng-invalid'));
    invalidFields[1].focus();
    this.blog.get('blogTitle').markAsTouched();
    this.blog.get('shortDescription').markAsTouched();
    this.blog.get('images').markAsTouched();
    this.blog.get('description').markAsTouched();
    this.blog.get('categories').markAsTouched();
  }
  else {
    this.loading = true;
    this.getselectedid(this.selectedItems);

    // Prepare the data for API
    let blogData: any;
    if (this.btn == "Update Blog") {
      // Update case
      this.bloger.categories = this.benifitsselected;
      this.bloger.blogTitle = this.blog.value.blogTitle;
      this.bloger.shortDescription = this.blog.value.shortDescription;
      this.bloger.description = this.blog.value.description;
      blogData = {
        ...this.bloger,
        id: this.bloger.id
      };
    } else {
      // Create case
      this.blog.value.categories = this.benifitsselected;
      blogData = this.blog.value;
    }

    blogData.url = this.orgnigation.replaceUrl(blogData.blogTitle.trim());


    if (this.myFiles != null) {
      var filename = this.orgnigation.getRandNum(10000000, 99999999) + formatDate(new Date(), 'yyyy-MM-dd-HH-mm-ss', 'en') + ".jpg";
      blogData.images ="https://docqura.goorito.com/dubaiblog/" + filename;
      this.orgnigation.postFile("dubaiblog", this.myFiles, filename).subscribe();
    }

    // Call appropriate API based on create/update
    let apiCall: Observable<any>;
    if (this.btn == "Update Blog") {
      apiCall = this.orgnigation.updateBlog(blogData);
    } else {
      apiCall = this.orgnigation.saveBlog(blogData);
    }

    apiCall.subscribe(
      (Response: any) => {
        localStorage.setItem("ublog", JSON.stringify(Response));
        this.loading = false;
        this.sucs = true;
        this.message = this.btn == "Update Blog" ? "Blog Successfully updated!" : "Blog Successfully created!";
        window.scroll(0, 0);
        
        // If it was a create operation, reset the form
        if (this.btn != "Update Blog") {
          this.blog.reset();
          this.selectedItems = [];
          this.imgess = null;
        }
      },
      error => {
        this.loading = false;
        alert(JSON.stringify(error));
      }
    );
  }
}


  
  myFiles: any;
  onselectfile(event:any){
    var myFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(myFile);
    reader.onload=(fevent:any)=>{
      this.imgess = reader.result;
    }

    this.compressImage.compress(myFile)
      .pipe(take(1))
      .subscribe(compressedImage => {
        this.myFiles = compressedImage;
      })
  }
  /* onselectfile(e: any) {
    const reader = new FileReader();
    if(e.target.files && e.target.files.length) {
      const imgfile = e.target.files[0];
      reader.readAsDataURL(imgfile);
      reader.onload = async () => {
        await this.resizeImage(reader.result as string).then((resolve: any) => {
          this.myFiles = resolve;
          this.imgess = reader.result;
          this.uploadForm.patchValue({
            imgSrc: resolve
          });
        });
      };
    }
  } */
  
  /* resizeImage(imageURL: any): Promise<any> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        if (ctx != null) {
          ctx.drawImage(image, 0, 0, 200, 200);
        }
        var data = canvas.toDataURL('image/jpeg', 1);
        resolve(data);
      };
      image.src = imageURL;
    });
  } */
}
