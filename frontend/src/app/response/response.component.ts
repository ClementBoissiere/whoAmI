import { Component, OnInit, inject } from '@angular/core';
import { ResponseService } from './response.service';
import { WikipediaService } from '../common/wikipedia.service';
import { PersonalityService } from '../common/personality.service';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [HistoryComponent],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss'
})
export class ResponseComponent implements OnInit {

  private responseService = inject(ResponseService);
  private wikipediaService = inject(WikipediaService);
  private personalityService = inject(PersonalityService);
  isWin: boolean = true;
  introduction: string | null = null;
  personality: String | null = null;
  error: string | null = null;


  ngOnInit(): void {
    this.responseService.newData.subscribe({
      next: (isWin) => {
        this.isWin = isWin;
        if (this.isWin) {
          this.personalityService.getPersonnalityOfTheDay().subscribe((personality) => {
            this.personality = personality.simpleResponse;
            this.wikipediaService.getIntroduction(<string>personality.simpleResponse).subscribe((wikipediaResponse) => {
              this.introduction = wikipediaResponse;
            });
          });
        }
      }
    });
  }

  getIntroduction(personality: string) {
    this.wikipediaService.getIntroduction(personality).subscribe(
      (intro) => {
        this.introduction = intro;
        this.error = null;
        console.log("intro" + this.introduction);
      },
      (err) => {
        this.introduction = null;
        this.error = `Erreur lors de la récupération de l'introduction: ${err.message}`;
      }
    );
  }
}
