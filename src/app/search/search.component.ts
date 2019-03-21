import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, take } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { SendNotificationComponent } from '../send-notification/send-notification.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breaker
    .observe(Breakpoints.Handset)
    .pipe(map(results => results.matches));

  data: any[] = [];
  constructor(
    public dialog: MatDialog,
    private breaker: BreakpointObserver,
    private router: Router,
    private snack: MatSnackBar,
    private afFirestore: AngularFirestore
  ) {}

  ngOnInit() {
    // this.data=this.afFirestore.collection('Users').ref.where('National Id','==','123456').get();

    const refe = this.afFirestore.collection('Users');

    const searchkey = localStorage.getItem('searchval');

    console.log(searchkey);

    refe.ref
      .where('NationalId', '==', searchkey)
      .get()
      .then(querySnapshot => {
        const x = querySnapshot.docs;
        if (x.length === 0) {
          this.snack.open('Not Found...', null, {
            duration: 3 * 1000,
            horizontalPosition: 'center'
          });
        } else {
          x.forEach(element => {
            const obj = { uid: element.id, ...element.data() };
            this.data.push(obj);
          });
        }
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });

    console.log(this.data);
  }

  notify() {
    console.log('runn');
    this.isHandset$.pipe(take(1)).subscribe(val => {
      const dialogRef = this.dialog.open(SendNotificationComponent, {
        width: val ? '90%' : '50%',
        height: 'auto',
        data: {
          uid: this.data[0].uid,
          name: this.data[0].name
        }
      });
    });

    // this.router.navigate(['/notify']);
  }
}
