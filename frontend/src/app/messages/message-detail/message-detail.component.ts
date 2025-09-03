import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.scss'
})
export class MessageDetailComponent {

  @Input()
  message: String = "";

  @Input()
  messageType: String = "";

}
