import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  foods: Food[] = [
    { value: 'National Id', viewValue: 'National ID' },
    { value: 'University Id', viewValue: 'University Id' },
    { value: 'Driving License Number', viewValue: 'Driving License Number' },
    { value: 'Car Pallete Number', viewValue: 'Car Pallete Number' },
    { value: 'Credit Card Number', viewValue: 'Credit Card Number' },
    { value: 'Other', viewValue: 'Other' }
  ];

  isHandset$: Observable<boolean> = this.breaker
    .observe(Breakpoints.Handset)
    .pipe(map(results => results.matches));

  constructor(private breaker: BreakpointObserver, private router: Router) {}

  ngOnInit() {}

  editProfileSave(event) {
    const userName: HTMLInputElement = document.getElementById(
      'user-name'
    ) as HTMLInputElement;
    const userEmail: HTMLInputElement = document.getElementById(
      'user-email'
    ) as HTMLInputElement;
    const userNumber: HTMLInputElement = document.getElementById(
      'user-number'
    ) as HTMLInputElement;
    const belongValue: HTMLInputElement = document.getElementById(
      'belong-value'
    ) as HTMLInputElement;
    const type: HTMLInputElement = document.getElementById(
      'type'
    ) as HTMLInputElement;
    console.log(
      userName.value +
        ' ' +
        userEmail.value +
        ' ' +
        userNumber.value +
        ' ' +
        belongValue.value +
        ' ' +
        type.innerText.trim()
    );
    // Return with updated values
    this.router.navigate(['/viewprofile']);
  }

  editProfileDiscard() {
    // Return to view Profile page without updates
    this.router.navigate(['/viewprofile']);
  }

  EditProfileAddBelonging(event) {}
}
