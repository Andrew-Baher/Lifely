import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface LoadedStuff {
  title: string;
  percent: Observable<number>;
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  value = 0;
  loaderSub: Subscription;
  constructor(
    public dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoadedStuff
  ) {}

  ngOnInit() {
    this.loaderSub = this.data.percent.subscribe(num => {
      this.value = num;
    });
  }

  ngOnDestroy() {
    this.loaderSub.unsubscribe();
  }
}
