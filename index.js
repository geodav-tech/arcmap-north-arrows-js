require(['esri/Map', 'esri/views/MapView'], function (Map, MapView) {
	var map = new Map({
		basemap: 'streets-night-vector'
	})

	var view = new MapView({
		container: 'view-div',
		map: map,
		center: [-81.912, 29.082],
		zoom: 5,
		constraints: {snapToZoom: false}
	})

	var btnHtml = `
        <div class="esri-component esri-widget">
            <div id="north-arrow" class="esri-widget--button esri-widget" title="You know you missed me.">
                <img id="arron-icon" src="arrows/EsriNorth9.png" style="transform: rotate(0deg);"/>
                <span class="esri-icon-font-fallback-text">You know you missed me.</span>
            </div>
        </div>
    `
	// Place the button into the top-left widget section, after the zoom controls
	document.getElementsByClassName('esri-ui-top-right')[0].innerHTML = btnHtml

	// rotate with the map
	view.watch('rotation', function (degrees) {
		document.getElementById('arron-icon').style.transform = `rotate(${degrees}deg)`
	})

	// ease to north on click
	document.getElementById('north-arrow').onclick = function () {
		view.goTo({rotation: 0})
	}

	// change arrow icon on click
	document.querySelectorAll('.arrow>img').forEach((el) =>
		el.addEventListener('click', (event) => {
			document.getElementById('arron-icon').src = event.target.src
		})
	)
})
