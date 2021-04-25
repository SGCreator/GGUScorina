const burger = document.querySelector('.header__inner-burger'),
      menu = document.querySelector('.header__inner-nav')

burger.addEventListener('click', function(){
    this.classList.toggle('active')
    menu.classList.toggle('active')
    document.body.classList.toggle('hidden')
});
const slider = (sliderSel, images) => {
    const slide = document.querySelector(sliderSel)
    let i = 1
    if (slide) {
        function toggleSlide(n, img) {
            setInterval(function () {
                slide.style.background = `url('${img[n]}') no-repeat 0 60px / cover`
                n++
                if (n >= img.length) n = 0
            }, 8000)
        }
        toggleSlide(i, images)
    } else {
        return false
    }
}
slider('.full-block-slider', ['images/main-slider/slider1.jpg', 'images/main-slider/slider2.jpg']);
const anchor = (wh,bc) => {
    let wrap = document.querySelector('.wrap')
    wrap.insertAdjacentElement('beforeend', getAnchor())
    let anchor = document.querySelector('.anchor')

    function getAnchor () {
        let anchor = document.createElement('div')
        anchor.classList.add('anchor')
        anchor.style.width = anchor.style.height =  wh + 'px'
        anchor.style.backgroundColor = bc

        return anchor
    }
    window.addEventListener('scroll', function () {
        let pos = window.pageYOffset
        pos > window.innerHeight ? anchor.classList.add('show') : anchor.classList.remove('show') 
    })
    anchor.addEventListener('click', () => {
        window.scrollTo({top:0, behavior:'smooth'})
    })
}
anchor(50,'#333333')
;

function map(n) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055, 27.8813694)],
		[new google.maps.LatLng(53.700055, 27.5513694)],
		[new google.maps.LatLng(53.809055, 27.5813694)],
		[new google.maps.LatLng(53.859055, 27.5013694)],
	]
	var options = {
		zoom: 10,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: 'img/icons/map.svg',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon: icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
				var cnt = i + 1;
				//infowindow.setContent($('.contacts-map-item_' + cnt).html());
				infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(), 0, 0);
				setTimeout(function () {

				}, 10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if (n) {
		var nc = n - 1;
		setTimeout(function () {
			google.maps.event.trigger(markers[nc], 'click');
		}, 500);
	}
}

map(1);;
