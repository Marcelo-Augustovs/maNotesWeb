import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  notifyBeforeMinutes: number;
  notified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventsSubject = new BehaviorSubject<CalendarEvent[]>([]);
  public events$ = this.eventsSubject.asObservable();
  private notificationInterval: any;

  constructor() {
    this.requestNotificationPermission();
    this.startNotificationMonitor();
    this.loadInitialMock();
  }

  private requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }

  private startNotificationMonitor() {
    this.notificationInterval = setInterval(() => {
      const allEvents = this.eventsSubject.getValue();
      const now = new Date();
      let updated = false;

      allEvents.forEach(evt => {
        if (!evt.notified) {
          const timeDiffMs = evt.date.getTime() - now.getTime();
          const targetNotifyMs = evt.notifyBeforeMinutes * 60000;

          // Se a hora do evento menos a hora atual for IGUAL OU MENOR que o tempo de notificação
          if (timeDiffMs <= targetNotifyMs && timeDiffMs > -3600000) {
            this.sendNotification(`MaNotes Lembrete: ${evt.title}`, `Seu evento começa em breve! (${evt.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
            evt.notified = true;
            updated = true;
          }
        }
      });

      if (updated) {
        this.eventsSubject.next([...allEvents]);
      }
    }, 5000); // Check every 5 seconds for precision
  }

  sendNotification(title: string, body: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    } else {
      console.warn("NOTIFICAÇÃO:", title, body);
    }
  }

  loadInitialMock() {
    // Cria um Evento Mock para daqui a 2 minutos pra teste automatico assim que renderizar
    const futureDate = new Date();
    futureDate.setMinutes(futureDate.getMinutes() + 2);

    const initialEvents: CalendarEvent[] = [
      { id: '1', title: 'Reunião de Alinhamento', date: new Date(new Date().setHours(14, 0, 0, 0)), notifyBeforeMinutes: 15, notified: false },
      { id: '2', title: 'Teste de Notificação', date: futureDate, notifyBeforeMinutes: 1, notified: false },
    ];
    this.eventsSubject.next(initialEvents);
  }

  getEvents(): Observable<CalendarEvent[]> {
    return this.events$;
  }

  addEvent(event: CalendarEvent) {
    const current = this.eventsSubject.getValue();
    current.push(event);
    this.eventsSubject.next([...current]);
  }

  deleteEvent(id: string) {
    const current = this.eventsSubject.getValue();
    this.eventsSubject.next(current.filter(e => e.id !== id));
  }
}
