import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../common/local-storage.service';
import { GameSession } from '../question/question.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  gameSession: GameSession = {
    questionsRemaining: 20,
    lastQuestionTime: null,
    positiveAnswers: [],
    negativeAnswers: [],
    gameWon: false,
    gameOver: false
  };

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.gameSession = this.localStorageService.getGameSession();
    
    // Subscribe to localStorage changes to update in real-time
    this.localStorageService.newData.subscribe(() => {
      this.gameSession = this.localStorageService.getGameSession();
    });
  }
}