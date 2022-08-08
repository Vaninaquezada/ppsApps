import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { ChatService } from '../servicios/chat.service';

@Component({
  selector: 'app-chatb',
  templateUrl: './chatb.page.html',
  styleUrls: ['./chatb.page.scss'],
})
export class ChatbPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;


  //state: boolean;
  icons;
  args;
  chatBoxContent;
  chatboxStatus;
  messages: Observable<any[]>;
  newMsg = '';
  constructor(private chatSer: ChatService, private router: Router, private authSvc: AuthService) {
    // this.state = false;
    // this.content.scrollToBottom();
  }

  ngOnInit() {
    this.messages = this.chatSer.getChatMessages();
    console.log(this.messages);

  }
  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToBottom() {
    this.getContent().scrollToBottom(500);
  }



  async signOut() {
    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }

  sendMessage() {
    this.chatSer.addChatMessage(this.newMsg, 'B').then(() => {
      this.newMsg = '';
      this.content.scrollToBottom(500);
      // this.scrollToBottom();
    });
    //this.content.scrollToBottom();
  }

}
