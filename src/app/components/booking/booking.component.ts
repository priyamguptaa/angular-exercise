import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ListServiceService } from '../list/list-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  formArray: FormArray;
  obj: {} = {};
  eventName;
  availableSeats;
  ticketsBooked: boolean;
  notValidSeats: boolean;
  messages: any[] = [];
  subscription: Subscription;
  seats = [
    { "label": "1", "value": 1 },
    { "label": "2", "value": 2 },
    { "label": "3", "value": 3 },
    { "label": "4", "value": 4 },
    { "label": "5", "value": 5 },
    { "label": "6", "value": 6 }

  ];

  constructor(private _fb: FormBuilder, private router: Router, private listSerivce: ListServiceService) {
    console.log(localStorage.getItem('currentEvent'), "localStorage.getItem('currentEvent')")
    this.eventName = JSON.parse(localStorage.getItem('currentEvent')).name;
    this.availableSeats = JSON.parse(localStorage.getItem('currentEvent')).available_seats;
  }

  ngOnInit() {
    this.initBookingForm();
  }
  initBookingForm() {
    this.bookingForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      phone: ['', [Validators.pattern('^[1-9][0-9]{9}')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      no_of_seats: ['', Validators.required],
      no_of_attendees: new FormArray([]),
    })
  }
  resetForm() {
    this.bookingForm.reset();
    this.router.navigate(['list']);

  }

  onSubmit() {
    (this.bookingForm.controls.no_of_attendees as FormArray).controls.forEach((control) => {
      console.log(control, typeof (control), 'elem >>>>');
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }
    })
    if (this.bookingForm.valid) {
      this.obj = {
        name: this.bookingForm.controls.name.value,
        phone: this.bookingForm.controls.phone.value,
        email: this.bookingForm.controls.email.value,
        no_of_seats: this.bookingForm.controls.no_of_seats.value,
      }
      let attendesObj = {};
      if ((this.bookingForm.controls.no_of_attendees as FormArray).length >= 1) {
        (this.bookingForm.controls.no_of_attendees as FormArray).controls.forEach((elem, index) => {
          attendesObj['attendee' + (index + 1) + 'name'] = elem.value;
        })
        this.obj['attendees'] = attendesObj;
      }
      console.log(this.obj);
      this.ticketsBooked = true;
    }
    else {
      this.validateAllFormFields(this.bookingForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }

    });
  }

  checkValidity() {
    this.notValidSeats = false;
    if (this.bookingForm.controls['no_of_seats'].value > this.availableSeats) {
      const arr = <FormArray>this.bookingForm.controls.no_of_attendees;
        arr.controls = [];
      this.notValidSeats = true;
    } else {
      if (this.bookingForm.controls['no_of_seats'].value > 1) {
        const arr = <FormArray>this.bookingForm.controls.no_of_attendees;
        arr.controls = [];
        for (let i = 0; i < this.bookingForm.controls['no_of_seats'].value; i++) {
          const control = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
          (this.bookingForm.controls.no_of_attendees as FormArray).push(control)
        }
      }

    }
    console.log(this.bookingForm, 'this.bookingForm >>>>>>>>');

  }


}
