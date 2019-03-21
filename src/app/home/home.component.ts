import { Component, OnInit, OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { MapComponent } from '../map/map.component';
import { AngularFireAuth } from '@angular/fire/auth';
export interface Type {
  value: string;
  viewValue: string;
}

export interface RequestPost {
  createdAt: Date;
  description: string;
  email: string;
  mobile: string;
  userName: string;
  requestType: string;
  saved: boolean;
  userLocation: undefined;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  entryComponents: [MapComponent]
})
export class HomeComponent implements OnInit, OnChanges {
  types: Type[] = [
    { value: 'Car Crash', viewValue: 'Car Crash' },
    { value: 'Medical Emergency', viewValue: 'Medical Emergency' },
    { value: 'Blood Donation', viewValue: 'Blood Donation' },
    { value: 'Lost and Found', viewValue: 'Lost and Found' },
    { value: 'Other...', viewValue: 'Other...' }
  ];

  isHandset$: Observable<boolean> = this.breaker
    .observe(Breakpoints.Handset)
    .pipe(map(results => results.matches));

  private newsCollection: AngularFirestoreCollection<RequestPost>;
  newsposts: Observable<RequestPost[]>;
  allposts: Array<RequestPost>;
  news: Observable<firebase.firestore.QueryDocumentSnapshot[]>;

  constructor(
    private breaker: BreakpointObserver,
    private afFirestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog
  ) {
    this.newsCollection = afFirestore.collection<RequestPost>('Feed');
    this.newsposts = this.newsCollection.valueChanges();
    this.news = this.newsCollection.get().pipe(
      map(q => {
        // let x = q.docs.map(doc => {
        //     doc.createdAt = ( new Intl.RelativeTimeFormat('ar') ).format( (new Date(Date.now() - 912555555)), 'hours' );
        //     return doc;
        // })
        // return x;
        console.log(q.docs);

        return q.docs.sort((a, b) => {
          if (a.data().createdAt < b.data().createdAt) {
            return 1;
          }

          if (a.data().createdAt > b.data().createdAt) {
            return -1;
          }
        });
        // return q.docs;
      })
    );
  }

  ngOnInit() {}

  openMaps(loc) {
    console.log('invoked direction.....' + loc);
    console.log('running...');
    console.log(this.dialog);
    const dialogRef = this.dialog.open(MapComponent, {
      width: this.isHandset$ ? '90%' : '50%',
      height: this.isHandset$ ? '90%' : '70%',
      data: {
        lat: 30.1734391,
        lng: 31.118304299999997
      }
    });
  }

  ngOnChanges() {
    this.newsCollection = this.afFirestore.collection<RequestPost>('Feed');
    this.newsposts = this.newsCollection.valueChanges();
    this.news = this.newsCollection.get().pipe(
      map(q => {
        // let x = q.docs.map(doc => {
        //     doc.createdAt = ( new Intl.RelativeTimeFormat('ar') ).format( (new Date(Date.now() - 912555555)), 'hours' );
        //     return doc;
        // })
        // return x;
        console.log(q.docs);

        return q.docs.sort((a, b) => {
          if (a.data().createdAt < b.data().createdAt) {
            return 1;
          }

          if (a.data().createdAt > b.data().createdAt) {
            return -1;
          }
        });
        // return q.docs;
      })
    );
  }
}
