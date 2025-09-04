import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take, interval, Subscription } from 'rxjs';
import { LocalStorageService } from '../common/local-storage.service';
import { QuestionResponse, GameSession } from './question.model';
import { ChatService } from './question.service';
import { ResponseService } from '../response/response.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit, OnDestroy {

  chatForm = new FormGroup({
    chatQuestion: new FormControl<String>('', [
      Validators.required,
      Validators.maxLength(200)
    ])
  });

  isLoading = false;
  errorMessage: string | null = null;
  gameSession: GameSession = {
    questionsRemaining: 20,
    lastQuestionTime: null,
    positiveAnswers: [],
    negativeAnswers: [],
    gameWon: false,
    gameOver: false
  };
  cooldownRemaining = 0;
  private cooldownSubscription?: Subscription;

  private chatService: ChatService = inject(ChatService);
  private responseService: ResponseService = inject(ResponseService);
  protected localStorageService: LocalStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.gameSession = this.localStorageService.getGameSession();
    this.updateCooldown();
  }

  ngOnDestroy(): void {
    this.cooldownSubscription?.unsubscribe();
  }

  private updateCooldown(): void {
    this.cooldownRemaining = this.localStorageService.getRemainingCooldownSeconds();

    if (this.cooldownRemaining > 0) {
      this.cooldownSubscription?.unsubscribe();
      this.cooldownSubscription = interval(1000).subscribe(() => {
        this.cooldownRemaining = this.localStorageService.getRemainingCooldownSeconds();
        if (this.cooldownRemaining <= 0) {
          this.cooldownSubscription?.unsubscribe();
        }
      });
    }
  }

  sendMessage(): void {
    const question = this.chatForm.get('chatQuestion')?.value;

    if (!question || this.chatForm.invalid || this.isLoading) {
      if (this.chatForm.get('chatQuestion')?.hasError('maxlength')) {
        this.errorMessage = 'Message trop long (maximum 200 caractères)';
      }
      return;
    }

    // Check game session constraints
    if (!this.localStorageService.canAskQuestion()) {
      if (this.gameSession.gameOver) {
        this.errorMessage = 'Partie terminée ! Vous avez utilisé toutes vos questions.';
      } else if (this.gameSession.gameWon) {
        this.errorMessage = 'Partie gagnée ! Félicitations !';
      } else if (this.cooldownRemaining > 0) {
        this.errorMessage = `Attendez ${this.cooldownRemaining} seconde(s) avant la prochaine question.`;
      } else if (this.gameSession.questionsRemaining <= 0) {
        this.errorMessage = 'Plus de questions disponibles !';
      }
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.chatService.sendMessage(question).pipe(take(1)).subscribe({
      next: (v: QuestionResponse) => {
        // console.log("retour : " + v);

        // Record the question and response
        this.localStorageService.recordQuestion(<string>question, <string>v.simpleResponse);
        this.localStorageService.saveData(<string>v.simpleResponse);

        // Update local game session
        this.gameSession = this.localStorageService.getGameSession();

        if (v.simpleResponse.includes("Gagné") || v.simpleResponse === "WIN") {
          this.responseService.triggerWin();
          this.errorMessage = 'Félicitations ! Vous avez trouvé la bonne réponse !';
        } else if (this.gameSession.gameOver) {
          this.errorMessage = 'Partie terminée ! Vous avez utilisé toutes vos 20 questions.';
        }

        this.isLoading = false;
        this.updateCooldown();
      },
      error: (e) => {
        console.error('Erreur lors de l\'envoi du message:', e);
        this.errorMessage = 'Erreur: Le serveur ne répond pas. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
    this.chatForm.get('chatQuestion')?.setValue('');
  }

  get remainingChars(): number {
    const currentLength = this.chatForm.get('chatQuestion')?.value?.length || 0;
    return 200 - currentLength;
  }

  get currentLength(): number {
    return this.chatForm.get('chatQuestion')?.value?.length || 0;
  }

  get isMessageTooLong(): boolean {
    return this.chatForm.get('chatQuestion')?.hasError('maxlength') || false;
  }

  get cooldownMessage(): string {
    const messages = [
      "🤔 Take your time to think...",
      "🕵️ Let me process that clue...",
      "🤖 Analyzing your strategy...",
      "💭 Give me a moment to reflect...",
      "🎯 Preparing my next hint...",
      "⚡ Recharging detective skills...",
      "🔍 Examining the evidence..."
    ];
    
    // Use cooldownRemaining to get a consistent message during the same cooldown
    const index = this.cooldownRemaining % messages.length;
    return messages[index];
  }

  get lifeBarColor(): string {
    const remaining = this.gameSession.questionsRemaining;
    if (remaining <= 5) {
      return 'linear-gradient(90deg, #dc3545, #e74c3c)'; // Rouge
    } else if (remaining <= 10) {
      return 'linear-gradient(90deg, #ffc107, #fd7e14)'; // Orange/Jaune
    } else {
      return 'linear-gradient(90deg, #28a745, #20c997)'; // Vert
    }
  }
}
