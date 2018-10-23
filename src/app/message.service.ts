import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { 
    this.subject = new Subject();
  }

  messages: Message[] = [];
  subject : Subject<Message>;
 
  add(title: string, details: string) {
    let message = {title: title, details: details}
    this.messages.push(message);
    this.subject.next(message);
  }
 
  clear() {
    this.messages = [];
  }
}

export interface Message {
  title: string;
  details?: string;
}