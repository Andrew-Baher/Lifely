import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';
import { SwPush } from '@angular/service-worker';
import { RequestComponent } from './request/request.component';
import { Router } from '@angular/router';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [RequestComponent]
})
export class AppComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  private readonly pKey =
    '`BI4sv2mf3fhcij-_mO_B2gBSzuH8vmzheA1SUfBVhM3Uj5YOMRM7fmgwZZxD9KvCH_7nOnFcJnbgLIoRkEjhv7`A';

  value: string;

  constructor(
    public afAuth: AngularFireAuth,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private router: Router
  ) {}

  openDialog(): void {
    console.log('running...');
    console.log(this.dialog);
    const dialogRef = this.dialog.open(RequestComponent, {
      width: '80%',
      height: 'auto',
      data: {}
    });
  }

  openSearch() {
    const nId: HTMLInputElement = document.getElementById(
      'search-barr'
    ) as HTMLInputElement;

    console.log('papapap');
    console.log(this.value);

    localStorage.setItem('searchval', this.value);
    if (document.location.href.includes('search')) {
      document.location.reload();
    }
    this.router.navigate(['/', 'search']); // ,this.value]);

    //   this.route.queryParams.subscribe(params => {
    //     this.param1 = params['param1'];
    //     this.param2 = params['param2'];
    // });
  }

  onKey(event: any) {
    if (event.keyCode === 13) {
      this.openSearch();
    }
  }

  ngOnInit() {}
}
