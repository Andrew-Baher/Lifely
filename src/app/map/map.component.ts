import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  origin = { lat: 24.799448, lng: 120.979021 };
  destination = { lat: 0, lng: 0 };

  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        this.origin = loc;
        this.destination = { lat: this.data.lat, lng: this.data.lng };
        console.log(this.origin);
      },
      _ => {},
      { enableHighAccuracy: true }
    );
  }
}
