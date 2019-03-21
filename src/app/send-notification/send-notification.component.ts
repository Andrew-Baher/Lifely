import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export class User {
  name: string;
  uid: string;
}

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {
  url: string;

  isHandset$: Observable<boolean> = this.breaker
    .observe(Breakpoints.Handset)
    .pipe(map(results => results.matches));

  constructor(
    public dialogRef: MatDialogRef<SendNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data2: User,
    private breaker: BreakpointObserver,
    private afFunctions: AngularFireFunctions,
    private afAuth: AngularFireAuth,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  notify(uid) {
    const val = (document.getElementById('theMsg') as HTMLInputElement).value;
    const remoteFn = this.afFunctions.httpsCallable('sendMsgToUser');
    remoteFn({ uid, msg: val }).subscribe(result => {
      console.log({ result }, 'remote fn');
    });

    this.snack.open('Message Sent', null, {
      duration: 3 * 1000,
      horizontalPosition: 'center'
    });

    // this.router.navigate(['./home']);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
