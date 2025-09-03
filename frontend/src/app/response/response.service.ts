import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private dataSubject: BehaviorSubject<boolean>;

  public newData: Observable<boolean>;


  constructor() {
    this.dataSubject = new BehaviorSubject<boolean>(false);
    this.newData = this.dataSubject.asObservable();
  }

  triggerWin() {
    this.dataSubject.next(true);
  }

}
