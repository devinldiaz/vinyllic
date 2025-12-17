import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.css'
})
export class CreateModalComponent {
  @Output() create= new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  vinyl: any = {
    name: '',
    artist_name: '',
    genres: [],
    release_year: null,
    photo_file_path: '',
    notes: ''
  }

  createVinyl() {
    this.create.emit(this.vinyl);
  }

  closeModal(){
    this.close.emit();
  }
}
