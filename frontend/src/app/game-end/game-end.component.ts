import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-end',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-end.component.html',
  styleUrl: './game-end.component.scss'
})
export class GameEndComponent implements OnInit {
  @Input() isWin: boolean = false;
  @Input() isVisible: boolean = false;

  ngOnInit(): void {
    // Simple component, no complex logic needed
  }
}