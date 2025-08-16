import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { BlogHomeComponent } from './blog/blog-home/blog-home.component';
import { CategoryListComponent } from './product/category-list/category-list.component';
import { CategoryComponent } from './product/category/category.component';
import { TransactionComponent } from './revenu/transaction/transaction.component';
import { MemberComponent } from './user/member/member.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { VendorComponent } from './user/vendor/vendor.component';
import { VideosComponent } from './blog/videos/videos.component';
import { VideoAddComponent } from './blog/video-add/video-add.component';
import { BuildersListComponent } from './real-estate/builders/builders-list/builders-list.component';
import { ManageBuildersComponent } from './real-estate/builders/manage-builders/manage-builders.component';
import { LeadsListComponent } from './real-estate/leads/leads-list.component';
import { PropertiesListComponent } from './real-estate/properties/properties-list/properties-list.component';
import { ManagePropertiesComponent } from './real-estate/properties/manage-properties/manage-properties.component';

const routes: Routes = [
  {path:"category",component:CategoryComponent},
  {path:"category/:type",component:CategoryComponent},
  {path:"category-list",component:CategoryListComponent},
  {path:"member",component:MemberComponent},
  {path:"member-details",component:UserDetailsComponent},
  {path:"vendor",component:VendorComponent},
  {path:"transaction",component:TransactionComponent},
  {path:"blog",component:BlogHomeComponent},
  {path:"add-blog",component:AddBlogComponent},
  {path:"update-blog/:url",component:AddBlogComponent},
  {path:"video",component:VideosComponent},
  {path:"add-video",component:VideoAddComponent},
  {path:"update-video/:url",component:VideoAddComponent},
  {path:"builders",component:BuildersListComponent},
  {path:"manage-builders",component:ManageBuildersComponent},
  {path:"manage-builders/:type",component:ManageBuildersComponent},
  {path:"real-estate/leads",component:LeadsListComponent},
  {path:"real-estate/properties",component:PropertiesListComponent},
  {path:"manage-properties",component:ManagePropertiesComponent},
  {path:"manage-properties/:type",component:ManagePropertiesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
