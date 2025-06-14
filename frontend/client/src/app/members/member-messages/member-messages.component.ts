import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message } from '../../_models/message';
import { MembersService } from '../../_services/members.service';
import { MessageService } from '../../_services/message.service';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-member-messages',
  standalone: false,
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
})
export class MemberMessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageForm') messageForm: NgForm;
  @ViewChild('scrollMe') scrollMe: ElementRef; // للوصول إلى عنصر الـ div

  @Input() messages: Message[];
  @Input() username: string;
  messageContent: string;
  private needsScroll = false;
  private messageThreadSubscription: any;

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messageThreadSubscription = this.messageService.messageThread$
      .pipe(filter((messages) => !!messages && messages.length > 0))
      .subscribe((messages) => {
        this.needsScroll = true;
      });
  }
  ngAfterViewChecked(): void {
    if (this.needsScroll) {
      this.scrollToBottom();
      this.needsScroll = false;
    }
  }

  sendMessage() {
    this.messageService
      .sendMessage(this.username, this.messageContent)
      .then(() => {
        this.messageForm.reset();
      });
  }

  scrollToBottom(): void {
    try {
      this.scrollMe.nativeElement.scrollTop =
        this.scrollMe.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
  onScroll() {}
}
