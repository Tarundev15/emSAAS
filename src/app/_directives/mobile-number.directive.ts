import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMobileNumber]'
})
export class MobileNumberDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const maxLength = 10; // Change this to your desired maximum length

    // Remove non-numeric characters
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');

    // Truncate input to the maximum length
    if (inputElement.value.length > maxLength) {
      inputElement.value = inputElement.value.slice(0, maxLength);
    }
  }
}