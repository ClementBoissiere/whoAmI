import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from '../history/history.component';
import { LocalStorageService } from '../common/local-storage.service';

@Component({
  selector: 'app-slide-history',
  standalone: true,
  imports: [CommonModule, HistoryComponent],
  templateUrl: './slide-history.component.html',
  styleUrl: './slide-history.component.scss'
})
export class SlideHistoryComponent {
  @Input() isOpen = false;
  @Output() closePanel = new EventEmitter<void>();

  protected localStorageService: LocalStorageService = inject(LocalStorageService);

  onClose() {
    this.closePanel.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}