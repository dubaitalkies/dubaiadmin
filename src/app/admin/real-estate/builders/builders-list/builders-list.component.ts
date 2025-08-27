import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-builders-list',
  templateUrl: './builders-list.component.html',
  styleUrls: ['./builders-list.component.css']
})
export class BuildersListComponent {
    loging:any=true;
    builders:any=[]
    nodata:String="No builders present at this time.";
    cid:any;
    uprod:any={};
    project:any = localStorage.getItem("project");
    preload:any=false;
  
    constructor(private orgnigation:OrgnigationService, private router: Router) { 
      this.fetchData();
    }
  
    ngOnInit(): void {
    }
    fetchData(){
      this.builders=[];
      this.loging=true;

      let resp = this.orgnigation.getBuilders();
      resp.subscribe(
        (Response:any)=>{
          this.builders=Response?.data;         
          this.loging=false;
        },
        error=>{
          this.builders=[];
          this.loging=false
        })
    }

    onToggleStatus(index: number, event: Event) {
      const inputEl = event.target as HTMLInputElement;
      const isChecked = inputEl.checked;
      const builder = this.builders[index]

      // Toggle value
      builder.status = isChecked ? 'Active' : 'Inactive';

      this.orgnigation.updateBuilder(
        builder.id,
        builder
      ).subscribe({
        next: () => {
          this.fetchData();
        },
        error: (err) => {
          console.error("Error updating status", err);
        }
      });
    }

    deleteBuilder(id:any){
      if (confirm('Are you sure you want to delete')){
        this.orgnigation.deleteBuilder(id).subscribe(()=> {
          this.fetchData();
        });
      }
    }
  
    updateBuilder(pos:any){
      const selectedBuilder = this.builders[pos];
      localStorage.setItem("STORED_BUILDER",JSON.stringify(selectedBuilder));
      this.router.navigate([`/manage-builders/${selectedBuilder?.id}`]);
    }

    onKey(event:any){
      var values = event.target.value;
      this.uprod.slug = this.orgnigation.replaceUrl(values);
    }
    view(pos:any){
      this.cid = this.builders[pos].id;
    }
}
