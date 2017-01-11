(function() {

	var lat = 27.8866;
	var lng = 85.1479;
	var zoomLevel = 9;
	var minZoom = 3;
	var maxZoom = 18;

	var osmTileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

	var osmAttributes = 'Map data &copy; OpenStreetMap contributors';

	function getRandomLatLng(map) {
		var bounds = map.getBounds(),
			southWest = bounds.getSouthWest(),
			northEast = bounds.getNorthEast(),
			lngSpan = northEast.lng - southWest.lng,
			latSpan = northEast.lat - southWest.lat;

		return new L.LatLng(
			southWest.lat + latSpan * Math.random(),
			southWest.lng + lngSpan * Math.random());
	}


	window.onload = function() {



		var map = new L.Map('map');
		var osm = new L.TileLayer(osmTileUrl, {
			minZoom: minZoom,
			maxZoom: maxZoom,
			attribution: osmAttributes
		});
		var latlng = new L.LatLng(lat, lng);

		map.addLayer(osm);
		map.setView(latlng, zoomLevel);
		var markers = L.markerClusterGroup();


		$.ajax({
			url : '/api/v1/getjson',
			data : {
				format : 'json'
			},
			success : function(data){
				if(data.success){
					var projects = data.projects;
					projects.forEach(function(project){
						project.mapTo.forEach(function(mapping){
							markers.addLayer(new L.marker([mapping.coordinate.split(',')[0],mapping.coordinate.split(',')[1]]).bindPopup(
								'<div>'+
									'<strong>'+
										'<span>'+
											mapping.district+
										'</span>'+
									'</strong>'+
									'<div>'+
										'<span>'+
											project['Organization Name']	 	+
										'</span>'+
									'</div>' +

									'<div>'+
										'<strong>'+
											project['Description']+
										'</strong>'+
									'</div>'+

									'<div class="margin-amount">'+
										'<span>'+
											'Amount : Rs.' + project['Amount']+
										'</span>'+
									'</div>'+

								'</div>'
							))
						})
					})
					map.addLayer(markers);
				}
			}
		})


	}
})();