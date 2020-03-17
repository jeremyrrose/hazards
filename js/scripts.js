function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

// this is my mapboxGL token
// the base style includes data provided by mapbox, this links the requests to my account

mapboxgl.accessToken = 'pk.eyJ1IjoiY25laWRzb24iLCJhIjoiY2s3Ynp3NTFhMDBhaTNncXVwNHpkcG4weiJ9.45E5i4zpVqnIUbJm0isEfA';

// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [-74.052005, 40.722214]
var initialZoom = 10

// create an object to hold the initialization options for a mapboxGL map
var initOptions = {
  container: 'map', // put the map in this container
  style: 'mapbox://styles/mapbox/dark-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}

// create the new map
var map = new mapboxgl.Map(initOptions);

// wait for the initial style to Load
map.on('style.load', function() {


  // hurricane zone 1
  map.addSource('hurricane1', {
    type: 'geojson',
    data: './data/hurricane1.geojson',
  });

  map.addLayer({
    'id': 'Zone 1',
    'source': 'hurricane1',
    'type': 'fill',
    'paint': {
      'fill-color': '#d73027',
      'fill-opacity': 0.3,

    }
  });

  // hurricane zone 2
  map.addSource('hurricane2', {
    type: 'geojson',
    data: './data/hurricane2.geojson',
  });

  map.addLayer({
    'id': 'Zone 2',
    'source': 'hurricane2',
    'type': 'fill',
    'paint': {
      'fill-color': '#f46d43',
      'fill-opacity': 0.3,
    }
  });

  // hurricane zone 3
  map.addSource('hurricane3', {
    type: 'geojson',
    data: './data/hurricane3.geojson',
  });

  map.addLayer({
    'id': 'Zone 3',
    'source': 'hurricane3',
    'type': 'fill',
    'paint': {
      'fill-color': '#e0d653',
      'fill-opacity': 0.3,
    }
  });

  // hurricane zone 4
  map.addSource('hurricane4', {
    type: 'geojson',
    data: './data/hurricane4.geojson',
  });

  map.addLayer({
    'id': 'Zone 4',
    'source': 'hurricane4',
    'type': 'fill',
    'paint': {
      'fill-color': '#a9b352',
      'fill-opacity': 0.3,
    }
  });

  // hurricane zone 5
  map.addSource('hurricane5', {
    type: 'geojson',
    data: './data/hurricane5.geojson',
  });

  map.addLayer({
    'id': 'Zone 5',
    'source': 'hurricane5',
    'type': 'fill',
    'paint': {
      'fill-color': '#abdda4',
      'fill-opacity': 0.3,
    }
  });

  // hurricane zone 6
  map.addSource('hurricane6', {
    type: 'geojson',
    data: './data/hurricane6.geojson',
  });

  map.addLayer({
    'id': 'Zone 6',
    'source': 'hurricane6',
    'type': 'fill',
    'paint': {
      'fill-color': '#66c2a5',
      'fill-opacity': 0.3,
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
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'fill-color': '#E066FF',
      'fill-opacity': 0.5,
      'fill-outline-color': 'black'
    }
  });
});


var chapters = {
  'intro': {
    center: [-74.052005, 40.722214],
    zoom: 10,
    essential: true
  },

  'hurricanez': {
    center: [-74.052005, 40.722214],
    zoom: 10,
    essential: true
  },

  'rockaways': {
    center: [-73.940220, 40.578368],
    zoom: 11,
    essential: true
  },

  'smias': {
    center: [-74.052005, 40.722214],
    zoom: 10,
    essential: true,
  }
};


// On every scroll event, check which element is on screen
window.onscroll = function() {
  console.log('scroll')
  var chapterNames = Object.keys(chapters);
  for (var i = 0; i < chapterNames.length; i++) {
    var chapterName = chapterNames[i];
    console.log(chapterName)
    if (isElementOnScreen(chapterName)) {
      setActiveChapter(chapterName);
      break;
    }
  }
};

var activeChapterName = 'intro';

function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;
  map.flyTo(chapters[chapterName]);

  document.getElementById(chapterName).setAttribute('class', 'active');
  document.getElementById(activeChapterName).setAttribute('class', '');

  activeChapterName = chapterName;

  if (activeChapterName === 'smias')
  map.setLayoutProperty('smia','visibility', 'visible');
  else map.setLayoutProperty('smia','visibility', 'none');

}

  function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }

  // Zone toggles
  var toggleableLayerIds = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6'];

  for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement('a');
  link.href = '#';
  link.className = 'active';
  link.textContent = id;


  link.onclick = function(e) {
  var clickedLayer = this.textContent;
  e.preventDefault();
  e.stopPropagation();

  var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

  if (visibility === 'visible') {
  map.setLayoutProperty(clickedLayer, 'visibility', 'none');
  this.className = '';
  } else {
  this.className = 'active';
  map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
  }
  };

  var layers = document.getElementById('menu');
  layers.appendChild(link);
  }
