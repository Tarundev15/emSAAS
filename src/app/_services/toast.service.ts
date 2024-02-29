import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<string[]>([]);

  addToast(message: string) {
    console.log('Adding toast:', message);
    const currentToasts = this.toasts.getValue();
    currentToasts.push(message);
    this.toasts.next(currentToasts);
    window.scrollTo(0, 0);
  }

  removeToast(index: number) {
    const currentToasts = this.toasts.getValue();
    currentToasts.splice(index, 1);
    this.toasts.next(currentToasts);
  }

  clearToasts() {
    this.toasts.next([]);
  }

  getToasts() {
    return this.toasts.asObservable();
  }
}
