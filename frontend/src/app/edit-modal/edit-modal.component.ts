import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  imports: [FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {
  @Input() vinyl: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  
  saveChanges() {
    this.save.emit(this.vinyl);
  }
  
  closeModal() {
    this.close.emit();
  }
}
