import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  sucs:any;
  message:String="This product is succesfully saved!";
  project:any = localStorage.getItem("project");
  type:any;
  uprod:any={};
  btn:any="Save Category";


  constructor(public orgnigation:OrgnigationService,private activatedroute: ActivatedRoute) { 
    window.scroll(0,0);
    this.activatedroute.params.subscribe((data:any) => {
      this.type=data.type;
      if(this.type!=null){
        var product=localStorage.getItem('category');
        if(product!=null)
        this.uprod = JSON.parse(product);
        this.btn = "Update Category";
      }
    });
  }

  ngOnInit(): void {

  }

  job:any=new FormGroup({
    title:new FormControl("",[Validators.required]),
    slug:new FormControl("",[Validators.required]),
    description:new FormControl(""),
    img:new FormControl(""),
    status:new FormControl(1),
    minamount:new FormControl(""),
    project:new FormControl(this.project),
    pagetitle:new FormControl(""),
    keyword:new FormControl(""),
    discription:new FormControl("")
  });

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

  onKey(event:any){
    var values = event.target.value;
    this.uprod.slug = this.orgnigation.replaceUrl(values);
  }

  saveproduct(){
    if (this.job.invalid) {
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus(); 
      this.job.get('title').markAsTouched();
      this.job.get('slug').markAsTouched();
    }
    else{
      if(this.btn=="Save Category"){
        this.uprod = this.job.value;
      }
      this.orgnigation.saveCategory(this.uprod).subscribe();
      //this.job.reset(this.job);
      this.sucs = true;
      this.message = "Category Successfully updated!";
      window.scroll(0,0);
    }
  }
}
