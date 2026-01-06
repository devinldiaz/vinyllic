import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { VinylCardComponent } from '../vinyl-card/vinyl-card.component'
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { CreateModalComponent } from '../create-modal/create-modal.component';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-vinyl-list-page',
  standalone: true,
  imports: [CommonModule, VinylCardComponent, EditModalComponent, CreateModalComponent],
  templateUrl: './vinyl-list-page.component.html',
  styleUrl: './vinyl-list-page.component.css'
})
export class VinylListPageComponent {
  vinyls: any[] = [];
  selectedVinyl: any = null;
  showEditModal = false;
  showCreateModal = false;
  type: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.type = this.route.snapshot.data['type'];
    this.loadVinyls();
  }

  private loadVinyls() {
    this.apiService.getVinyls().subscribe({
      next: (data) => {
        console.log("Vinyls received:", data);

        data.forEach((v: any) => {
          v.owned = v.owned === 1 || v.owned === true;
        });

        if (this.type === 'owned'){
          this.vinyls = data.filter((v: any) => v.owned);
        }
        else if (this.type === 'wishlist'){
          this.vinyls = data.filter((v: any) => !v.owned);
        }
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

  onDelete(vinyl: any) {
    this.apiService.deleteVinyl(vinyl.vinyl_id).subscribe({
      next: () => {
        this.loadVinyls();
      },
      error: (err: any) => {
        console.error('Deletion failed', err);
      }
    });
  }
}
