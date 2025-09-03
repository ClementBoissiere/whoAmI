import { Component, inject, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from '../../common/local-storage.service';
import { MessageDetailComponent } from '../message-detail/message-detail.component';
import { Subscription } from 'rxjs';
import { CommonModule, NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageDetailComponent, NgForOf, NgFor, CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent implements OnInit, OnDestroy {


  protected messages: Array<String> = [];
  private localStorageService = inject(LocalStorageService);
  private subscriptions: Array<Subscription> = [];

  ngOnInit(): void {
    this.localStorageService.checkDateAndRemoveDatas();
    this.subscriptions.push(this.localStorageService.newData.subscribe({
      next: (values) => {
        this.messages = values.reverse();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
