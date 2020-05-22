import React from "./node_modules/react";
import "./Map.scss";
import * as am4core from "./node_modules/@amcharts/amcharts4/core";
import * as am4maps from "./node_modules/@amcharts/amcharts4/maps";
import am4geodata_worldLow from "./node_modules/@amcharts/amcharts4-geodata/worldLow";


export default function Map() {



  am4core.ready(function () {


    let map = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    map.geodata = am4geodata_worldLow;

    // Set projection
    map.projection = new am4maps.projections.Miller();


    // Create map polygon series
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");
    polygonTemplate.events.on("hit", function(ev) {
        ev.target.series.chart.zoomToMapObject(ev.target);
        
      })

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");


     map.zoomControl = new am4maps.ZoomControl();
     let homeButton = new am4core.Button();
    homeButton.events.on("hit", function () {
      map.goHome();
    });

    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path =
      "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    homeButton.parent = map.zoomControl;
    homeButton.insertBefore(map.zoomControl.plusButton);

    // Center on the groups by default
    map.homeZoomLevel = 3.5;
    map.homeGeoPoint = { longitude: 12, latitude: 54 };
  });

  return <div id="chartdiv"></div>;
}
