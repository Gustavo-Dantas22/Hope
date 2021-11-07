import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger80ms } from '../../../../@vex/animations/stagger.animation';


@Component({
  selector: 'vex-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms,
    stagger80ms
  ]
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
