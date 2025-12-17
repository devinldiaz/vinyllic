import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { VinylCardComponent } from '../vinyl-card/vinyl-card.component'
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { CreateModalComponent } from '../create-modal/create-modal.component';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [CommonModule, VinylCardComponent, EditModalComponent, CreateModalComponent],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.css'
})
export class CollectionPageComponent {
  vinyls: any[] = [];
  selectedVinyl: any = null;
  showEditModal = false;
  showCreateModal = false;
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadVinyls();
  }

  private loadVinyls() {
    this.apiService.getVinyls().subscribe({
      next: (data) => {
        console.log("Vinyls received:", data);
        this.vinyls = data;
      }
    });
  }

  openCreateModal(){
    this.showCreateModal = true;
  }

  closeCreateModal(){
    this.showCreateModal = false;
  }

  onCreate(newVinyl: any){
    this.apiService.createVinyl(newVinyl).subscribe({
      next: () => {
        this.loadVinyls();
        this.closeCreateModal();
      },
      error: (err: any) => {
        console.error('Creation failed', err);
      }
    })
  }

  openEditModal(vinyl: any) {
    this.selectedVinyl = { ...vinyl };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedVinyl = null;
  }

  onSave(updatedVinyl: any) {
    console.log("Sending to API:", updatedVinyl); 
    this.apiService.editVinyl(updatedVinyl.vinyl_id, updatedVinyl).subscribe({
      next: () => {
        this.loadVinyls();
        this.closeEditModal();
      },
      error: (err: any) => {
        console.error('Update failed', err);
      }
    });
  }

}
