import { Component, ViewChild, ElementRef, OnInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageListComponent } from '../messages/message-list/message-list.component';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageListComponent, ReactiveFormsModule, QuestionComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements AfterViewChecked {

  @ViewChild('scrollBar', { static: true }) private scrollBar!: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (!this.scrollBar) {
      return;
    }
    try {
      this.scrollBar.nativeElement.scrollTop = this.scrollBar.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error in scrollToBottom:', err);
    }
  }
}

