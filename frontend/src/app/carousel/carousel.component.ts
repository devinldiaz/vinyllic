import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() images: string[] = [];
}
