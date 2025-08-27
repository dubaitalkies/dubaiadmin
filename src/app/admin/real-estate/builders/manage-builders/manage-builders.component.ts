import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable, take } from 'rxjs';
import { CompressImageService } from 'src/app/service/compress-image.service';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-manage-builders',
  templateUrl: './manage-builders.component.html',
  styleUrls: ['./manage-builders.component.css']
})
export class ManageBuildersComponent {
  builderId: string | null = null;
  sucs: any;
  message: string = 'Builder details saved successfully!';
  btn: string = 'Save Builder';
  type: any;
  project: any = localStorage.getItem('project');
  builder: any = {};
  imgess:any;
  myFiles: any;
  loading:any=false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '0',
    placeholder: 'Enter text here...',
    translate: 'no',
  };

  constructor(
    public orgnigation: OrgnigationService,
    private activatedroute: ActivatedRoute,
    private compressImage: CompressImageService
  ) {
    window.scroll(0, 0);
    this.activatedroute.params.subscribe((data: any) => {
      this.builderId = data['id'] || null;

      if (this.builderId) {
        const savedBuilder = localStorage.getItem('STORED_BUILDER');
        if (savedBuilder != null) {
          this.builder = JSON.parse(savedBuilder);
          this.builderForm.patchValue({
            builder_name: this.builder.builder_name,
            company_name: this.builder.company_name,
            company_logo: this.builder.company_logo || ''
          });
          this.imgess = this.builder.company_logo; // preview
        }
        this.btn = 'Update Builder';
      }
    });
  }

  ngOnInit() {
    if (this.type) {
      this.builderForm.get('company_logo')?.clearValidators();
      this.builderForm.get('company_logo')?.updateValueAndValidity();
    }
  }

  builderForm: any = new FormGroup({
    builder_name: new FormControl('', [Validators.required]),
    company_name: new FormControl('', [Validators.required]),
    company_logo:new FormControl("",[Validators.required]),
    status:new FormControl("Active"),
  });


  saveBuilder() {
  if (this.builderForm.invalid) {
    const invalidFields: any = [].slice.call(document.getElementsByClassName('ng-invalid'));
    if (invalidFields[1]) invalidFields[1].focus();
    this.builderForm.markAllAsTouched();
    return;
  }

  this.builder = { ...this.builder, ...this.builderForm.value };

  if (this.myFiles) {
    const filename = this.orgnigation.getRandNum(10000000, 99999999) + formatDate(new Date(), 'yyyy-MM-dd-HH-mm-ss', 'en') + ".jpg";
    this.builder.company_logo = "https://docqura.goorito.com/dubaiblog/" + filename;
    this.orgnigation.postFile("dubaiblog", this.myFiles, filename).subscribe();
  }

  let apiCall: Observable<any>;
  if (this.btn === "Update Builder") {
    apiCall = this.orgnigation.updateBuilder(this.builder.id, this.builder);
  } else {
    apiCall = this.orgnigation.saveBuilder(this.builder);
  }

  apiCall.subscribe(
    () => {
      this.sucs = true;
      this.loading = false;
      this.message = this.btn.includes('Update') ? 'Builder Successfully updated!' : 'Builder details saved successfully!';
      window.scroll(0, 0);

      if (!this.btn.includes("Update")) {
        this.builderForm.reset();
        this.imgess = null;
        this.myFiles = null;
      }
    },
    error => {
      this.loading = false;
      alert(JSON.stringify(error));
    }
  );
}


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
}
