import { Component, Inject, OnInit, inject } from '@angular/core';
import { PersonalityService } from '../common/personality.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


  personalityService = inject(PersonalityService); 
  lastPersonality: String = "";
  
  constructor() {

  }
  
  ngOnInit(): void {
    this.personalityService.getLastPersonality().subscribe(value => this.lastPersonality = value.simpleResponse);
  }

  
}
