import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrgnigationService } from './service/orgnigation.service';
import { HttpClientModule } from '@angular/common/http';
import { MasterModule } from './master/master.module';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './credential/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MasterModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [OrgnigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
