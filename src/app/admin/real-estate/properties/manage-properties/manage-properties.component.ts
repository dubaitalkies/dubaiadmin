import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-manage-properties',
  templateUrl: './manage-properties.component.html',
  styleUrls: ['./manage-properties.component.css'],
})
export class ManagePropertiesComponent implements OnInit {
  propertyId: string | null = null; 
  sucs: any;
  message: string = 'This property has been successfully saved!';
  selectedItems: any[] = [];
  btn: string = 'Add Property';
  imgess: any;
  loading: boolean = false;
  myFiles: any;
  propertyData: any = {};
  propertiesList: any[] = [];
  buildersList: any[] = [];

  // Image handling
  mainImageFile: File | null = null;
  multipleImageFiles: File[] = [];
  mainImagePreview: string | null = null;
  multipleImagesPreview: string[] = [];

  imgurl = localStorage.getItem('imgurl');

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 15,
    allowSearchFilter: true,
  };

  propertyForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    short_description: new FormControl('', [Validators.required]),
    builder_id: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    images: new FormControl<string[]>([]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    url: new FormControl(''),
    created_at: new FormControl(
      formatDate(new Date(), 'yyyy-MM-dd HH:mm', 'en')
    ),
  });

  constructor(
    public orgnigation: OrgnigationService,
    private activatedroute: ActivatedRoute,
  ) {
    const storedProp = localStorage.getItem('STORED_PROPERTY');
    this.activatedroute.params.subscribe((params: any) => {
      this.propertyId = params['id'];

      if (this.propertyId) {
        this.btn = 'Update Property';
        if (storedProp) {
          this.propertyData = JSON.parse(storedProp);
          this.initializeFormWithExistingData();
        }
      }
    });
  }

  private initializeFormWithExistingData(): void {
    this.propertyForm.patchValue({
      title: this.propertyData.title,
      builder_id: this.propertyData.builder_id,
      short_description: this.propertyData.short_description,
      description: this.propertyData.description,
      location: this.propertyData.location,
      price: this.propertyData.price,
      image: this.propertyData.image,
    });

    // Set previews for existing images
    if (this.propertyData.image) {
      this.mainImagePreview = this.propertyData.image;
    }

    // Parse existing multiple images
    if (this.propertyData.images) {
      try {
        const imgs = JSON.parse(this.propertyData.images);
        this.multipleImagesPreview = imgs;
        this.propertyForm.patchValue({ images: imgs });
      } catch (err) {
        console.warn('Invalid images format');
      }
    }
  }

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
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'Button',
        class: 'btn btn-primary font-weight-bold px-3',
      },
      {
        name: 'Grren',
        class: 'or-green',
      },
      {
        name: 'Bold Grren',
        class: 'or-bold-green',
      },
      {
        name: 'Red',
        class: 'or-red',
      },
      {
        name: 'Bold Red',
        class: 'or-bold-red',
      },
      {
        name: 'blue',
        class: 'or-blue',
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
    outline: false,
    toolbarPosition: 'top',
  };

  ngOnInit() {
    this.loadBuilders();
  }

  loadBuilders() {
    this.buildersList = [];
    this.orgnigation.getBuilders().subscribe((resp: any) => {
      this.buildersList = resp?.data || [];
    });
  }

  // Image handling methods
  onMainImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.mainImageFile = input.files[0];

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mainImagePreview = e.target.result;
      };
      reader.readAsDataURL(this.mainImageFile);
    }
  }

  onMultipleImagesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.multipleImageFiles = Array.from(input.files);

      // Create previews
      this.multipleImagesPreview = [];
      this.multipleImageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.multipleImagesPreview.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  async saveProperty() {
    if (this.propertyForm.invalid) {
      this.markFormGroupTouched(this.propertyForm);
      return;
    }

    this.loading = true;

    try {
      // Upload main image if new one was selected
      if (this.mainImageFile) {
        const mainImageUrl = await this.uploadImage(this.mainImageFile);
        this.propertyForm.patchValue({ image: mainImageUrl });
      }

      // Upload multiple images if any
      if (this.multipleImageFiles.length > 0) {
        const imageUrls = await this.uploadMultipleImages();
        this.propertyForm.patchValue({ images: imageUrls });
      }

      // Prepare final payload
      const payload = {
        ...this.propertyForm.value,
        images: JSON.stringify(this.propertyForm.value.images || []),
        url: this.orgnigation.replaceUrl(
          this.propertyForm.value.title?.trim() || ''
        ),
      };

      // Make API call
      const response = await (this.btn === 'Update Property'
        ? this.orgnigation.updateProperty(this.propertyData.id, payload)
        : this.orgnigation.saveProperty(payload)
      ).toPromise();

      this.handleSuccessResponse(response);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  private async uploadImage(file: File): Promise<string> {
    const filename = this.generateFilename();

    try {
      // Get the raw response without JSON parsing
      const response = await this.orgnigation
        .postFile('dubaiblog', file, filename)
        .toPromise();

      // Handle different response types
      if (typeof response === 'object' && response.url) {
        return response.url; // If server returns { url: "..." }
      } else if (typeof response === 'string') {
        // If response is direct URL string
        if (response.startsWith('http')) {
          return response;
        }
        // If response contains URL in the string
        const urlMatch = response.match(/https?:\/\/[^\s]+/);
        if (urlMatch) {
          return urlMatch[0];
        }
      }

      // Fallback to constructed URL if we can't parse response
      return `https://docqura.goorito.com/dubaiblog/${filename}`;
    } catch (error) {
      console.error('Image upload failed, using fallback URL', error);
      return `https://docqura.goorito.com/dubaiblog/${filename}`;
    }
  }

  private async uploadMultipleImages(): Promise<string[]> {
    const uploadedUrls: string[] = [];

    for (const file of this.multipleImageFiles) {
      try {
        const url = await this.uploadImage(file);
        uploadedUrls.push(url);
      } catch (error) {
        console.error('Error uploading image:', error);
        // Continue with next image even if one fails
      }
    }

    return [...(this.propertyForm.value.images || []), ...uploadedUrls];
  }

  private generateFilename(): string {
    return `${this.orgnigation.getRandNum(10000000, 99999999)}-${formatDate(
      new Date(),
      'yyyy-MM-dd-HH-mm-ss',
      'en'
    )}.jpg`;
  }

  // Modified saveProperty method

  private handleSuccessResponse(res: any): void {
    localStorage.setItem('STORED_PROPERTY', JSON.stringify(res?.data))
    this.loading = false;
    this.sucs = true;
    this.message = this.btn === 'Update Property'
        ? 'Property successfully updated!'
        : 'Property successfully created!';

    window.scrollTo(0, 0);

    if (this.btn !== 'Update Property') {
      this.resetForm();
    }
  }

  private handleError(error: any): void {
    this.loading = false;
    console.error('Error saving property:', error);
    alert('An error occurred while saving the property. Please try again.');
  }

  private resetForm(): void {
    this.propertyForm.reset();
    this.mainImageFile = null;
    this.multipleImageFiles = [];
    this.mainImagePreview = null;
    this.multipleImagesPreview = [];
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
