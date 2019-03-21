import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from 'firebase';

import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  token: string;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snack: MatSnackBar
  ) {}

  updateToken(token) {
    this.afAuth.authState.pipe(take(1)).subscribe(async user => {
      if (!user) {
        return;
      }

      const potUser = await this.db
        .collection('Users')
        .ref.where('email', '==', user.email)
        .get();

      console.log(potUser);
      potUser.docs[0].ref.update({ fcmToken: token });
    });
  }

  monitorRefresh() {
    this.messaging.onTokenRefresh(() => {
      this.messaging
        .getToken()
        .then(refreshedToken => {
          console.log('Token refreshed.');
          this.updateToken(refreshedToken);
        })
        .catch(err => console.log(err, 'Unable to retrieve new token'));
    });
  }

  getPermission() {
    /* console.log('getting permission');
    return this.afMsg.requestToken
      .pipe(take(1))
      .subscribe(token => this.updateToken(token)); */
    this.messaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token, 'granted fcm token');
        this.updateToken(token);
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.makeSnack(payload.notification.body);
      this.currentMessage.next(payload);
    });
  }

  makeSnack(text) {
    this.snack.open(text, null, { duration: 5 * 1000 });
  }
}
