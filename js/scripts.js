// this is my mapboxGL token
// the base style includes data provided by mapbox, this links the requests to my account

mapboxgl.accessToken = 'pk.eyJ1IjoiY25laWRzb24iLCJhIjoiY2s3Ynp3NTFhMDBhaTNncXVwNHpkcG4weiJ9.45E5i4zpVqnIUbJm0isEfA';

// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [-73.977361, 40.764295]
var initialZoom = 11

// create an object to hold the initialization options for a mapboxGL map
var initOptions = {
  container: 'map', // put the map in this container
  style: 'mapbox://styles/mapbox/light-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}

// create the new map
var map = new mapboxgl.Map(initOptions);

// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wait for the initial style to Load
map.on('style.load', function() {


// hurricane zone 1
map.addSource('hurricane1', {
  type: 'geojson',
  data: './data/hurricane1.geojson',
});

map.addLayer({
'id': 'hurricane1',
'source': 'hurricane1',
'type': 'fill',
'paint': {
  'fill-color': '#d73027',
  'fill-opacity': 0.2,
  }
});

// hurricane zone 2
map.addSource('hurricane2', {
  type: 'geojson',
  data: './data/hurricane2.geojson',
});

map.addLayer({
'id': 'hurricane2',
'source': 'hurricane2',
'type': 'fill',
'paint': {
  'fill-color': '#f46d43',
  'fill-opacity': 0.5,
  }
});

// hurricane zone 3
map.addSource('hurricane3', {
  type: 'geojson',
  data: './data/hurricane3.geojson',
});

map.addLayer({
'id': 'hurricane3',
'source': 'hurricane3',
'type': 'fill',
'paint': {
  'fill-color': '#e0d653',
  'fill-opacity': 0.4,
  }
});

// hurricane zone 4
map.addSource('hurricane4', {
  type: 'geojson',
  data: './data/hurricane4.geojson',
});

map.addLayer({
'id': 'hurricane4',
'source': 'hurricane4',
'type': 'fill',
'paint': {
  'fill-color': '#a9b352',
  'fill-opacity': 0.4,
  }
});

// hurricane zone 5
map.addSource('hurricane5', {
  type: 'geojson',
  data: './data/hurricane5.geojson',
});

map.addLayer({
'id': 'hurricane5',
'source': 'hurricane5',
'type': 'fill',
'paint': {
  'fill-color': '#abdda4',
  'fill-opacity': 0.5,
  }
});

// hurricane zone 6
map.addSource('hurricane6', {
  type: 'geojson',
  data: './data/hurricane6.geojson',
});

map.addLayer({
'id': 'hurricane6',
'source': 'hurricane6',
'type': 'fill',
'paint': {
  'fill-color': '#66c2a5',
  'fill-opacity': 0.4,
  }
});

// SMIA
map.addSource('smia', {
  type: 'geojson',
  data: './data/smia.geojson',
});

map.addLayer({
'id': 'smia',
'source': 'smia',
'type': 'fill',
'paint': {
  'fill-color': '#4d004b',
  'fill-opacity': 0.9,
  }
});

});

var chapters = {
'baker': {
bearing: 27,
center: [-0.15591514, 51.51830379],
zoom: 15.5,
pitch: 20
},
'aldgate': {
duration: 6000,
center: [-0.07571203, 51.51424049],
bearing: 150,
zoom: 15,
pitch: 0
},
'london-bridge': {
bearing: 90,
center: [-0.08533793, 51.50438536],
zoom: 13,
speed: 0.6,
pitch: 40
},
'woolwich': {
bearing: 90,
center: [0.05991101, 51.48752939],
zoom: 12.3
},
'gloucester': {
bearing: 45,
center: [-0.18335806, 51.49439521],
zoom: 15.3,
pitch: 20,
speed: 0.5
},
'caulfield-gardens': {
bearing: 180,
center: [-0.19684993, 51.5033856],
zoom: 12.3
},
'telegraph': {
bearing: 90,
center: [-0.10669358, 51.51433123],
zoom: 17.3,
pitch: 40
},
'charing-cross': {
bearing: 90,
center: [-0.12416858, 51.50779757],
zoom: 14.3,
pitch: 20
}
};

// On every scroll event, check which element is on screen
window.onscroll = function() {
var chapterNames = Object.keys(chapters);
for (var i = 0; i < chapterNames.length; i++) {
var chapterName = chapterNames[i];
if (isElementOnScreen(chapterName)) {
setActiveChapter(chapterName);
break;
}
}
};

var activeChapterName = 'baker';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;

map.flyTo(chapters[chapterName]);

document.getElementById(chapterName).setAttribute('class', 'active');
document.getElementById(activeChapterName).setAttribute('class', '');

activeChapterName = chapterName;
}

function isElementOnScreen(id) {
var element = document.getElementById(id);
var bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}
