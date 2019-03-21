import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breaker
    .observe(Breakpoints.Handset)
    .pipe(map(results => results.matches));

  url = 'https://www.eagles.org/wp-content/uploads/2015/01/post21.jpg';

  connectors: any;
  connectorsSub: Subscription;

  constructor(
    private breaker: BreakpointObserver,
    private router: Router,
    private afFunctions: AngularFireFunctions
  ) {}

  ngOnInit() {
    const remoteFn = this.afFunctions.httpsCallable('getConnectorsOfUser');

    this.connectorsSub = remoteFn({})
      .pipe(take(1))
      .subscribe(conn => {
        console.log({ conn });
        this.connectors = conn;
      });
  }

  ngOnDestroy() {
    this.connectorsSub.unsubscribe();
  }

  viewProfileEditProfile(ev) {
    this.router.navigate(['/profile/edit']);
  }
}
