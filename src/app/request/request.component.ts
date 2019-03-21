import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatDialog
} from '@angular/material';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  entryComponents: [LoadingComponent]
})
export class RequestComponent implements OnInit {
  foods: Food[] = [
    { value: 'Car Crash', viewValue: 'Car Crash' },
    { value: 'Medical Emergency', viewValue: 'Medical Emergency' },
    { value: 'Blood Donation', viewValue: 'Blood Donation' },
    { value: 'Lost and Found', viewValue: 'Lost and Found' },
    { value: 'Other...', viewValue: 'Other...' }
  ];

  photo: File;
  url: string;

  isHandset$: Observable<boolean> = this.breaker
    .observe(Breakpoints.Handset)
    .pipe(map(results => results.matches));

  constructor(
    public dialogRef: MatDialogRef<RequestComponent>,
    public loadingDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Food,
    private breaker: BreakpointObserver,
    private afFunctions: AngularFireFunctions,
    public afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  async submitRequest(event) {
    const userName: HTMLInputElement = document.getElementById(
      'user-name'
    ) as HTMLInputElement;
    const type: HTMLInputElement = document.getElementById(
      'type'
    ) as HTMLInputElement;
    const desc: HTMLInputElement = document.getElementById(
      'desc'
    ) as HTMLInputElement;
    const tele: HTMLInputElement = document.getElementById(
      'tele'
    ) as HTMLInputElement;

    const task = this.afStorage.upload(
      `${Math.round(Math.random() * 99999 + 10000)}_${this.photo.name}`,
      this.photo
    );

    const percent = task.percentageChanges();

    this.loadingDialog.open(LoadingComponent, {
      width: '400px',
      height: 'auto',
      data: percent
    });

    const res = await task;

    const data = {
      userName: userName.textContent.trim(),
      requestType: type.textContent.trim(),
      description: desc.value.trim(),
      photo: await res.ref.getDownloadURL(),
      mobile: tele.value.trim(),
      createdAt: Date.now()
    };

    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        data['userLocation'] = loc;

        const remoteFn = this.afFunctions.httpsCallable('respondToRequest');
        remoteFn(data).subscribe(result => {
          console.log({ result }, 'remote fn');
          this.success();
        });
      },
      _ => {},
      { enableHighAccuracy: true }
    );

    console.log({ data });
  }

  onSelectFile(event) {
    // called each time file input changes
    console.log(event, 'newfile');
    if (event.target.files && event.target.files[0]) {
      this.photo = event.target.files[0];

      const fr = new FileReader();

      fr.readAsDataURL(event.target.files[0]);

      fr.addEventListener('load', e => {
        this.url = (e.target as FileReader).result as string;
      });
    }
  }

  success() {
    this.snack.open('Request Sent Successfully...', null, {
      duration: 3 * 1000,
      horizontalPosition: 'center'
    });
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
