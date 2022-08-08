import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { ChatService } from '../servicios/chat.service';

@Component({
  selector: 'app-chata',
  templateUrl: './chata.page.html',
  styleUrls: ['./chata.page.scss'],
})
export class ChataPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  state: boolean;
  icons;
  args;
  chatBoxContent;
  chatboxStatus;
  messages: Observable<any[]>;
  newMsg = '';
  constructor(private chatSer: ChatService, private router: Router, private authSvc: AuthService) {
    this.state = false;
  }

  ngOnInit() {
    this.messages = this.chatSer.getChatMessages();
    console.log(this.messages);
  }



  async signOut() {
    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }

  sendMessage() {
    this.chatSer.addChatMessage(this.newMsg, 'A').then(() => {
      this.newMsg = '';
      this.content.scrollToBottom(500);
    });
  }

}
