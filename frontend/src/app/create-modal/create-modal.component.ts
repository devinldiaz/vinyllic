import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  genresList = [
    'Alternative',
    'Bedroom pop',
    'Chillwave',
    'Dream pop',
    'Electronic',
    'Experimental',
    'Garage rock',
    'Indie',
    'Indie pop',
    'Indie rock',
    'Lo-fi',
    'Neo-psychedelic',
    'New wave',
    'Noise rock',
    'Pop',
    'Post-punk',
    'Post-rock',
    'Psychedelic rock',
    'Shoegaze',
    'Sovietwave',
    'Surf rock',
    'Synth-pop',
    'Synthwave',
    'Vaporwave',
    'Witch house'
  ];

  toggleGenre(genre: string) {
  const i = this.vinyl.genres.indexOf(genre);
  if (i > -1) {
    this.vinyl.genres.splice(i, 1);
  } else {
    this.vinyl.genres.push(genre);
  }
}

  createVinyl() {
    this.create.emit(this.vinyl);
  }

  closeModal(){
    this.close.emit();
  }
}
