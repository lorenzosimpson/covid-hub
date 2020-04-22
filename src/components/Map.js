// Themes begin
import React from 'react';
import {isoCountries} from '../utils/isoCountries';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);
// Themes end


function Map(props) {

      am4core.ready(function() {
        var covid_world_timeline = window.covid_world_timeline;
        console.log('world timeline', covid_world_timeline)
      
        var worldLen = covid_world_timeline.length
        var mapData = covid_world_timeline[worldLen - 1].list // Data from the latest day
      
        let chart = am4core.create("chartdiv", am4maps.MapChart);
        console.log(mapData)
      
        // Set map definition
        chart.geodata = am4geodata_worldLow;
      
        // Set projection
        chart.projection = new am4maps.projections.Miller();
      
        // create a color object property for each country based on confirmed cases
        // add country name
      
        const formatDate = function(date) {
          const arr = date.split('-')
          const year = arr[0]
          const month = arr[1]
          const day = arr[2]
        
          return `${month}/${day}/${year}`
        }
        const dataDate = covid_world_timeline[worldLen-1].date
        console.log(dataDate)
        
  
        for (const c of mapData) {
          // c.color = chart.colors.getIndex(Math.ceil(Number(c.confirmed) / 100000));
          c.countryName = isoCountries[c.id]
          c.date = formatDate(dataDate)
          if (c.confirmed === 0) {
            delete c.confirmed
          }
        }
      
        console.log(covid_world_timeline)
      
        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ["AQ"];
        polygonSeries.useGeodata = true;
        polygonSeries.nonScalingStroke = true;
        polygonSeries.strokeWidth = 0.5;
        polygonSeries.calculateVisualCenter = true;
        polygonSeries.fill = am4core.color("#6d6d8c"); // ocean color
      
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.fill = am4core.color("#3f3f4f"); // color of terrain, normal state
      
      
        let imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.data = mapData
        imageSeries.dataFields.value = "confirmed";
      
        let imageTemplate = imageSeries.mapImages.template;
        imageTemplate.nonScaling = true
      
        let circle = imageTemplate.createChild(am4core.Circle);
        circle.fillOpacity = 0.7;
        circle.fill = am4core.color('#FA8072')
        //circle.propertyFields.fill = am4core.color('#d15656');
        circle.tooltipText = "[bold][font-size: 16px]{countryName}[/]\n[font-size:12px color:white]total cases: {confirmed}\ntotal deaths: {deaths}\ndate: {date}"
      
      
        imageSeries.heatRules.push({
        "target": circle,
        "property": "radius",
        "min": 6,
        "max": 40,
        "dataField": "value"
        })

        // chart.events.on("ready", function(ev) {
        //   chart.zoomToMapObject(polygonSeries.getPolygonById("US"));
        // });
        
        imageTemplate.adapter.add("latitude", function(latitude, target) {
        let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
        if(polygon){
        return polygon.visualLatitude;
        }
        return latitude;
        })
      
        imageTemplate.adapter.add("longitude", function(longitude, target) {
        let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
        if(polygon){
        return polygon.visualLongitude;
        }
        return longitude;
      })
      
      });


      const isMobile = window.screen.width < 500

    return (
            <div className='chart-container'>
              <div id='chartdiv'></div>
              <span id='captions-container'>
               <p id='instructions'>{isMobile ? 'Click' : 'Hover over'} a country for details</p>
               <p id='data-src'>Data: Johns Hopkins University via am4Charts</p>
               </span>
              <a href='#news' id='news-arrow-container'>
                <p id='news-indic'>News</p>
              <div id='arrow'>&#8659;</div>
              </a>
            </div>
    );
}

export default Map;



