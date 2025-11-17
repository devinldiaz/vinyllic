import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { VinylCardComponent } from '../vinyl-card/vinyl-card.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-collection-page',
  imports: [CommonModule, VinylCardComponent],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.css'
})
export class CollectionPageComponent {
  vinyls: any[] = [];
  constructor(private apiService: ApiService){}


  ngOnInit(){
    this.apiService.getVinyls().subscribe({
      next: (data) => {
        console.log("Vinyls received:", data);
        this.vinyls = data
      }});
      console.log("its working");
  }
}
