import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-vinyl-card',
  imports: [CommonModule],
  templateUrl: './vinyl-card.component.html',
  styleUrls: ['./vinyl-card.component.css']
})


export class VinylCardComponent {
  @Input() vinyl: any;
  @Output() edit = new EventEmitter<any>();

  openEdit() {
    this.edit.emit(this.vinyl);
  }
  
}
