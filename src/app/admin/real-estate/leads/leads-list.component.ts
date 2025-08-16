import { Component, OnInit } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// declare var $: any; // for jQuer

@Component({
  selector: 'app-lead-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent implements OnInit {
  leads: any[] = [];

  loging:any=true;
  nodata:String="No builders present at this time.";
  // dtOptions: DataTables.Settings = {};

  constructor(private orgnigation:OrgnigationService, private router: Router) { 
    this.fetchData();
  }

  ngOnInit(): void {
    // DataTable config
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   responsive: true
    // };
  }

  exportToExcel() {
    if (confirm('Are you sure you want to export leads')){
      if (!this.leads || this.leads.length === 0) {
        alert("No leads available to export.");
        return;
      }

      // Format data for Excel (exclude unwanted keys like id, url)
      const exportData = this.leads.map(lead => ({
          "Name": lead.name,
          "Company Name": lead.company_name,
          "Property Title": lead.property_title,
          "Email": lead.email,
          "Mobile": lead.mobile,
          "Interest Type": lead.interest_type,
          "Message": lead.message,
          "Date": new Date(lead.created_at).toLocaleString()
      }));

      // Convert JSON to worksheet
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

      // Create a new workbook and append worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Leads");

      // Generate Excel file buffer
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

      // Save the file
      const blob = new Blob([wbout], { type: "application/octet-stream" });
        saveAs(blob, "leads-list.xlsx");
      }
  }

  fetchData(){
      this.leads=[];
      this.loging=true;

      let resp = this.orgnigation.getRealEstateLeads();
      resp.subscribe(
        (Response:any)=>{
          this.leads=Response?.data;         
          this.loging=false;
        },
        error=>{
          this.leads=[];
          this.loging=false
        })
  }

  deleteLead(id:any){
    if (confirm('Are you sure you want to delete')){
      this.orgnigation.deleteBuilder(id).subscribe(()=> {
        this.fetchData();
      });
    }
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     $('#datatable').DataTable();
  //   }, 0);
  // }
}
