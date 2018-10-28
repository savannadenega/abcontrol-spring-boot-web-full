import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material';
import { MessageService, Message } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.messageService.subject.subscribe(
      message => this.showMessage(message)
    );
  }

  showMessage(message : Message) {
    this.snackBar.openFromComponent(MessageToast, {
      duration: 5000,
      data: {
        message : message
      }
    });
  }

}


@Component({ 
  selector: 'message-toast',
  template: '<h3>{{message.title}}</h3><p>{{message.details}}</p>'
})
export class MessageToast {
  message: Message;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
   }
}

