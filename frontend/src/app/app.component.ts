import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PortraitComponent } from './portrait/portrait.component';
import { ChatComponent } from './chat/chat.component';
import { ResponseComponent } from './response/response.component';
import { GameEndComponent } from './game-end/game-end.component';
import { LocalStorageService } from './common/local-storage.service';
import { ResponseService } from './response/response.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortraitComponent, ChatComponent, ResponseComponent, HeaderComponent, GameEndComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'guessidentity';

  gameEndState = {
    isWin: false,
    isVisible: false
  };

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private responseService: ResponseService = inject(ResponseService);

  ngOnInit(): void {
    // Listen for win state changes
    this.responseService.newData.subscribe((isWin) => {
      if (isWin) {
        this.showGameEndAnimation(true);
      }
    });

    // Listen for localStorage changes to detect game over AND daily resets
    this.localStorageService.newData.subscribe((messages) => {
      const session = this.localStorageService.getGameSession();

      // Hide game end screen if messages were cleared (daily reset)
      if (messages.length === 0) {
        this.gameEndState.isVisible = false;
      }

      // Show game over if session ended
      if (session.gameOver && !session.gameWon) {
        this.showGameEndAnimation(false);
      }
    });
  }

  private showGameEndAnimation(isWin: boolean): void {
    this.gameEndState = {
      isWin: isWin,
      isVisible: true
    };
    // Plus de setTimeout - on garde l'affichage permanent
  }

  // Debug methods removed for production
}
