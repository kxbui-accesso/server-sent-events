import { NgFor } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { EventSourceService } from './event-source.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NgFor],
  standalone: true,
})
export class AppComponent implements OnDestroy {
  eventSourceService = inject(EventSourceService);
  messages: any[] = [];
  eventSourceSubscription!: SubscriptionLike;

  start() {
    this.messages.length = 0;
    this.end();

    const url = '/api/getAll';
    const options = {};
    const eventNames = ['message'];

    this.eventSourceSubscription = this.eventSourceService
      .connectToServerSentEvents(url, options, eventNames)
      .subscribe({
        next: (result) => {
          const data = JSON.parse(result.data);
          const type = data.type;
          if (type === 'close') {
            this.end();
            return;
          }
          this.messages = [...this.messages, data.message];
        },
        error: (error) => {},
      });
  }

  end() {
    this.eventSourceSubscription?.unsubscribe();
    this.eventSourceService.close();
  }

  ngOnDestroy() {
    this.end();
  }
}
