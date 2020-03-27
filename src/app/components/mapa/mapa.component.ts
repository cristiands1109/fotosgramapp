import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coors: string;
  @ViewChild('mapa', {static: true}) mapa;

  constructor() { }

  ngOnInit() {
    console.log(this.coors);

    const latLng = this.coors.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);


    
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWFuZHMxMSIsImEiOiJjazV4NmgzY3cwMXM4M2x1bXcyamR6eWZpIn0.zkUEAa-NMlrIjpINyvs0-g';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

  }

}
