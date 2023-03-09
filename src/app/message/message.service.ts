import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string[] = [];
  constructor() { }

  pushMessage = (message: string) => {
    this.message.push(message);
  }
  clearAllMessages = () => {
    this.message = [];
  }
}
