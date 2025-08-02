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
  {path:"update-video/:url",component:VideoAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
