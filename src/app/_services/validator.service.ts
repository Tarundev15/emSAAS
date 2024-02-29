import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private http: HttpClient) { }
  MobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;
      const isValid = /^\d{10}$/.test(phoneNumber);

      return isValid ? null : { 'MobileNumber': true };
    };
  }
  EmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const isValid = emailRegex.test(control.value);
      return isValid ? null : { customEmail: true };
    };
  }
  // only for number like price etc
  noCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const hasCharacter = /[a-zA-Z]/.test(value); // Check if value has any alphabet characters
      return hasCharacter ? { hasCharacter: true } : null;
    };
  }

  fileTypeValidator(allowedTypes: string[]) {
    return (control: AbstractControl) => {
      const file = control.value;
      if (file) {
        const extension = (file || '').split('.').pop()?.toLowerCase();
        if (!allowedTypes.includes(extension)) {
          return { invalidFileType: true };
        }
      }
      return null;
    };

  }

  zipCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const zipCodePattern = /^\d{6}(?:[-\s]\d{4})?$/; // Zip code pattern (5 digits, optional 4-digit extension)

      const value = control.value;
      const isValid = zipCodePattern.test(value);

      return isValid ? null : { invalidZipCode: true };
    };
  }

  panCardValidator(): ValidatorFn {
    const panPattern = /^([A-Z]{5})(\d{4})([A-Z]{1})$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        // If the value is empty, consider it as valid (or use 'required' validator)
        return null;
      }
      if (!panPattern.test(value)) {
        // If the value does not match the PAN card pattern, return validation error
        return { panCard: true };
      }
      return null; // Value is valid
    };
  }

  aadhaarCardValidator(): ValidatorFn {
    const aadhaarPattern = /^\d{12}$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        // If the value is empty, consider it as valid (or use 'required' validator)
        return null;
      }
      if (!aadhaarPattern.test(value)) {
        // If the value does not match the Aadhaar card pattern, return validation error
        return { aadhaarCard: true };
      }
      return null; // Value is valid
    };
  }
}
