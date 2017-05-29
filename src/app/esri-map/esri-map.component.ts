import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {EsriLoaderService} from 'angular2-esri-loader';


@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  point:any;

  markerSymbol:any;


  map:any;

  view: any;

  constructor(private esriLoader: EsriLoaderService) { }

  ngOnInit() {
        // only load the ArcGIS API for JavaScript when this component is loaded
    return this.esriLoader.load({
      // use a specific version of the API instead of the latest
      url: '//js.arcgis.com/4.3/'
    }).then(() => {
      // load the map class needed to create a new map
      this.esriLoader.loadModules(['esri/Map','esri/views/MapView', 'esri/Graphic', 
      'esri/geometry/Point', 'esri/symbols/SimpleMarkerSymbol']).then(([Map, MapView, Graphic, Point, SimpleMarkerSymbol]) => {
        // create the map at the DOM element in this component
        this.map = new Map({
          basemap: 'dark-gray'
        }); 
         this.view = new MapView({
          container: 'viewDiv',
          map:this.map,
          zoom: 4,  // Sets the zoom level based on level of detail (LOD)
          center: [-100, 37]  // Sets the center point of view in lon/lat
        });
          /**********************
       * Create a point graphic
       **********************/

      // First create a point geometry (this is the location of the Titanic)
      this.point = new Point({
        longitude: -80.035,
        latitude: 40.40
      });

      // Create a symbol for drawing the point
      this.markerSymbol = new SimpleMarkerSymbol({
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      });

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new Graphic({
        geometry: this.point,
        symbol: this.markerSymbol
      });


      this.view.graphics.addMany([pointGraphic]);
      });
    });

    
  }
/*
 createGpsPoint(lat:number, long:number){

          // First create a point geometry (this is the location of the Titanic)
      this.point.latitude = 43.4;
      this.point.longitude = -81.4;
      this.view.graphics.addMany([pointGraphic]);

 }*/

}
