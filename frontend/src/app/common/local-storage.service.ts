import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameSession } from '../question/question.model';

const key = "whoAmI";
const keyDate = "whoAmIDate";
const sessionKey = "whoAmISession";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private dataSubject: BehaviorSubject<Array<string>>;

  public newData: Observable<Array<string>>;

  constructor() {
    const initialData = this.getMessages();
    this.dataSubject = new BehaviorSubject<Array<string>>(initialData);

    this.newData = this.dataSubject.asObservable();
  }

  public saveData(value: string) {
    let messages = this.getMessages();
    messages.push(value);
    // console.log("stringify : " + JSON.stringify(messages));
    localStorage.setItem(key, JSON.stringify(messages));

    this.dataSubject.next(messages);
  }

  public getData(): Array<string> {
    let messages = this.getMessages();
    return messages;
  }

  public removeData() {
    localStorage.removeItem(key);
    localStorage.removeItem(sessionKey);
    this.dataSubject.next([]);
  }

  private getMessages(): Array<string> {
    const messages = localStorage.getItem(key) ?? '';
    // console.log("messages :" + messages);
    if (messages) {
      return <Array<string>>JSON.parse(messages);
    }
    return [];
  }

  private setDate(): void {
    const today = new Date();
    localStorage.setItem(keyDate, today.toDateString());
  }

  public checkDateAndRemoveDatas(): void {
    const memoryDateString = localStorage.getItem(keyDate);
    if (!memoryDateString) {
      this.setDate();
      return;
    }
    const memoryDate = new Date(memoryDateString);
    if (this.isNotSameDay(memoryDate)) {
      this.removeData();
      this.setDate();
    }
  }
  
  isNotSameDay(date: Date): boolean {
    return !this.isSameDay(date);
  }

  isSameDay(date: Date): boolean {
  
    const currentDate = new Date();

    return (
      currentDate.getFullYear() === date.getFullYear() &&
      currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() === date.getDate()
    );
  }

  // Game Session Management
  public getGameSession(): GameSession {
    const sessionData = localStorage.getItem(sessionKey);
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    
    // Default new game session
    return {
      questionsRemaining: 20,
      lastQuestionTime: null,
      positiveAnswers: [],
      negativeAnswers: [],
      gameWon: false,
      gameOver: false
    };
  }

  public saveGameSession(session: GameSession): void {
    localStorage.setItem(sessionKey, JSON.stringify(session));
  }

  public canAskQuestion(): boolean {
    const session = this.getGameSession();
    
    if (session.gameOver || session.gameWon) {
      return false;
    }
    
    if (session.questionsRemaining <= 0) {
      return false;
    }
    
    if (session.lastQuestionTime) {
      const now = Date.now();
      const timeSinceLastQuestion = (now - session.lastQuestionTime) / 1000;
      return timeSinceLastQuestion >= 2; // 2 seconds cooldown
    }
    
    return true;
  }

  public getRemainingCooldownSeconds(): number {
    const session = this.getGameSession();
    
    if (!session.lastQuestionTime) {
      return 0;
    }
    
    const now = Date.now();
    const timeSinceLastQuestion = (now - session.lastQuestionTime) / 1000;
    
    if (timeSinceLastQuestion >= 2) {
      return 0;
    }
    
    return Math.ceil(2 - timeSinceLastQuestion);
  }

  public recordQuestion(question: string, response: string): void {
    const session = this.getGameSession();
    
    session.questionsRemaining--;
    session.lastQuestionTime = Date.now();
    
    if (response === "WIN") {
      session.gameWon = true;
      this.saveGameSession(session);
      return;
    }
    
    // Déterminer si c'est une réponse positive ou négative
    const lowerResponse = response.toLowerCase();
    if (lowerResponse.includes("oui") || lowerResponse.includes("yes")) {
      session.positiveAnswers.push(question);
    } else if (lowerResponse.includes("non") || lowerResponse.includes("no")) {
      session.negativeAnswers.push(question);
    }
    
    if (session.questionsRemaining <= 0 && !session.gameWon) {
      session.gameOver = true;
    }
    
    this.saveGameSession(session);
  }
}