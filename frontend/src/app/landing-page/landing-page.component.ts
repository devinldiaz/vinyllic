import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-landing-page',
  imports: [CarouselComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  vinyls: any[] = []
  vinylImages: string[] = [];
  
  constructor(private router: Router,
              private apiService: ApiService
  ) {}

  ngOnInit(){
    this.apiService.getVinyls().subscribe((data: any) => {
      this.vinyls = data;
      this.setVinylImages();
    });
  }

  setVinylImages() {
    this.vinylImages = this.vinyls.map(vinyl => vinyl.photo_file_path);
  }

  goToCollection() {
    this.router.navigate(['/collection']);
  }
}
