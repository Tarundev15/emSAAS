import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    
    // Check if the pressed key is in the allowedKeys array or is a number
    if (allowedKeys.includes(event.key) || /^\d$/.test(event.key)) {
      return; // Allow the key
    } else {
      event.preventDefault(); // Prevent input of non-numeric and non-backspace keys
    }
  }
}





