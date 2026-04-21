import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { EventsService, CalendarEvent } from '../../../service/events.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule,
    MatInputModule, MatSelectModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  selectedDate: Date | null = new Date();
  events: CalendarEvent[] = [];
  eventsForSelectedDate: CalendarEvent[] = [];

  // Form parameters
  newEventTitle = '';
  newNotificationMins = 15;
  newEventTime = '12:00';

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(res => {
      this.events = res;
      this.updateSelectedDateEvents();
    });
  }

  onSelectChange(date: Date | null) {
    this.selectedDate = date;
    this.updateSelectedDateEvents();
  }

  updateSelectedDateEvents() {
    if (!this.selectedDate) return;
    this.eventsForSelectedDate = this.events.filter(e =>
      e.date.toDateString() === this.selectedDate!.toDateString()
    );
  }

  // Função passada pro mat-calendar pintar o dia que tem evento
  dateClass = (d: Date) => {
    const hasEvent = this.events.some(e => e.date.toDateString() === d.toDateString());
    return hasEvent ? 'has-event-marker' : '';
  }

  addEvent() {
    if (!this.newEventTitle.trim() || !this.newEventTime || !this.selectedDate) return;

    const [hours, minutes] = this.newEventTime.split(':');
    const evtDate = new Date(this.selectedDate);
    evtDate.setHours(+hours, +minutes, 0, 0);

    const novo: CalendarEvent = {
      id: Date.now().toString(),
      title: this.newEventTitle,
      date: evtDate,
      notifyBeforeMinutes: this.newNotificationMins,
      notified: false
    };

    this.eventsService.addEvent(novo);
    this.newEventTitle = '';
    this.newEventTime = '12:00';
  }

  deleteEvent(id: string) {
    this.eventsService.deleteEvent(id);
  }
}
