import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { MasterModule } from '../master/master.module';
import { NewProductComponent } from './product/new-product/new-product.component';
import { ProductsComponent } from './product/products/products.component';
import { CategoryComponent } from './product/category/category.component';
import { RouterModule } from '@angular/router';
import { MemberComponent } from './user/member/member.component';
import { VendorComponent } from './user/vendor/vendor.component';
import { BookingComponent } from './order/booking/booking.component';
import { BookingDetailsComponent } from './order/booking-details/booking-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionComponent } from './revenu/transaction/transaction.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogHomeComponent } from './blog/blog-home/blog-home.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { CategoryListComponent } from './product/category-list/category-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { VideosComponent } from './blog/videos/videos.component';
import { VideoAddComponent } from './blog/video-add/video-add.component';
import { BuildersListComponent } from './real-estate/builders/builders-list/builders-list.component';
import { ManageBuildersComponent } from './real-estate/builders/manage-builders/manage-builders.component';
import { LeadsListComponent } from './real-estate/leads/leads-list.component';
import { PropertiesListComponent } from './real-estate/properties/properties-list/properties-list.component';
import { ManagePropertiesComponent } from './real-estate/properties/manage-properties/manage-properties.component';

@NgModule({
  declarations: [
    HomeComponent,
    NewProductComponent,
    ProductsComponent,
    CategoryComponent,
    MemberComponent,
    VendorComponent,
    BookingComponent,
    BookingDetailsComponent,
    TransactionComponent,
    BlogHomeComponent,
    BlogDetailsComponent,
    AddBlogComponent,
    CategoryListComponent,
    UserDetailsComponent,
    VideosComponent,
    VideoAddComponent,
    BuildersListComponent,
    ManageBuildersComponent,
    LeadsListComponent,
    PropertiesListComponent,
    ManagePropertiesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MasterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AdminModule { }
