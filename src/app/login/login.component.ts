import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessagingService } from '../messaging.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private snack: MatSnackBar,
    private afAuth: AngularFireAuth,
    private router: Router,
    private msg: MessagingService
  ) {}

  ngOnInit() {
    this.afAuth.user.pipe(take(1)).subscribe(async user => {
      if (user) {
        this.snack.open(`Already logged in, welcome.`, null, {
          duration: 5 * 1000,
          horizontalPosition: 'center'
        });
        await this.router.navigateByUrl('/home');
      }
    });
  }

  async success(auth: FirebaseUISignInSuccessWithAuthResult) {
    this.snack.open(`Welcome ${auth.authResult.user.displayName}`, null, {
      duration: 5 * 1000,
      horizontalPosition: 'center'
    });
    // get fcm token
    this.msg.getPermission();
    this.msg.monitorRefresh();
    this.msg.receiveMessage();
    await this.router.navigateByUrl('/home');
  }

  errorCallback(ev) {
    console.log(ev, 'error firebaseui');
  }
}
