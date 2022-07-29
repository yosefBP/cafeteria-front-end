import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  constructor(public dialog:MessagesService) { }

  ngOnInit(): void {
    // empty constructor
  }

}
