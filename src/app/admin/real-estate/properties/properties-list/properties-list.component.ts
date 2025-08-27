import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css'],
})
export class PropertiesListComponent {
  properties: any = [];
  filteredProperties: any = null;
  buildersList: any[] = [];
  loader: any = true;
  nodata: string = 'No properties posted at this time.';

  constructor(public orgnigation: OrgnigationService, private router: Router) {
    this.loadProperties();
  }

  ngOnInit() {
    this.loadBuilders();
  }

  loadBuilders() {
    this.buildersList = [];
    this.orgnigation.getBuilders().subscribe((resp: any) => {
      this.buildersList = resp?.data || [];
    });
  }

  onToggleStatus(index: number, event: Event) {
      const inputEl = event.target as HTMLInputElement;
      const isChecked = inputEl.checked;
      const builder = this.properties[index]

      // Toggle value
      builder.status = isChecked ? 'Active' : 'Inactive';

      this.orgnigation.updateProperty(
        builder.id,
        builder
      ).subscribe({
        next: () => {
          this.loadProperties();
        },
        error: (err) => {
          console.error("Error updating status", err);
        }
      });
    }

  loadProperties() {
    this.loader = true;
    this.properties = [];

    this.orgnigation.getProperties().subscribe(
      (Response: any) => {
        this.loader = false;
        this.properties = Response?.data;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  deleteProperty(id:any){
    if (confirm('Are you sure you want to delete')){
      this.orgnigation.deleteProperty(id).subscribe(()=> {
        this.loadProperties();
      });
    }
  }

  updateProperty(pos: any) {
    const selectedProperty = this.properties[pos];
    localStorage.setItem('STORED_PROPERTY', JSON.stringify(selectedProperty));
    this.router.navigate([`/manage-properties/${selectedProperty?.id}`]);
  }

  handleFilter(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const builderId = selectElement.value;
    if (!builderId) {
      this.filteredProperties = null;
      return;
    }
    this.filteredProperties = this.properties.filter(
      (p: any) => p.builder_id === builderId
    );
  }
}
