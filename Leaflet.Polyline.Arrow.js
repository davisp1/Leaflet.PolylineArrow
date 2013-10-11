L.Triangle = L.Path.extend({
	initialize: function (latlng, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlng = L.latLng(latlng);
		this._height = (options && options.height) ? options.height : this.options.height;
		this._width = (options && options.width ) ? options.width : this.options.width;
		this.options.angle = this.options.constant;
	},

	options: {
		fill: true,
		height:300,
		width:200,
		weight:1,
		fillOpacity:1,
		opacity:1,
		constant:90,
		angle:0,
	},

	projectLatlngs: function () {
		
		var width = this._getLngRadius();
		var height = this._getScaled(this.options.height());
		
		this._centerPoint = this._map.latLngToLayerPoint(this._latlng);
		this._leftPoint = this._map.latLngToLayerPoint( [ this._latlng.lat, this._latlng.lng - width ] );
		this._rightPoint = this._map.latLngToLayerPoint( [ this._latlng.lat, this._latlng.lng + width ] ));
		this._topPoint = this._map.latLngToLayerPoint( [ this._latlng.lat + height, this._latlng.lng] ));

	},

	getLatLng: function () {
		return this._latlng;
	},

	getPathString: function () {
		p0 = this._centerPoint;
		p1 = this.rotate(this._rightPoint);
		p2 = this.rotate(this._topPoint);
		p3 = this.rotate(this._leftPoint);
		if (L.Browser.svg) {
			return "M" + p0.x+","+p0.y+" L"+(p1.x)+","+(p1.y)+" L"+(p2.x)+","+(p2.y)+" L"+(p3.x)+","+(p3.y)+"L" + p0.x+","+p0.y;
		} 
	},
	
	setRotation:function(angle){
		angle = angle | 0;
		this.options.angle = this.options.constant + angle;
		this.redraw();
	},
	
	rotate: function(p,angle){
		angle = angle | 0;
		var fullangle = (this.options.angle + angle) * L.LatLng.DEG_TO_RAD
		var px = Math.cos(fullangle) * (p.x-this._centerPoint.x ) - Math.sin(fullangle) * (p.y-this._centerPoint.y) + this._centerPoint.x; 
		var py = Math.sin(fullangle) * (p.x-this._centerPoint.x ) + Math.cos(fullangle) * (p.y-this._centerPoint.y) + this._centerPoint.y;
		return L.point(px,py);
	
	},
	
	// found in L.Circle
	_getScaled: function (ex) {
		return ((ex/2) / 40075017) * 360;
	},
	
	_getScaledHeight: function(){
		return this._getScaled(this.options.height);
	},
	
	_getScaledWidth: function () {
		return this._getScaled(this.options.width) / Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);
	},
});

L.triangle = function (latlng, options) {
	return new L.Triangle(latlng, options);
};

L.PolylineArrow = L.Polyline.extend({
	initialize: function (latlngs, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlngs = this._convertLatLngs(latlngs);
		if(this._latlngs.length>1)
		{
			var source = this._latlngs[this._latlngs.length-1];
			var destination = this._latlngs[this._latlngs.length]
			var radian = Math.atan2(souce.lng - destination.lng,  - coords[i+1][1]);
            var pi = Math.PI;
            var degree = radian * (180 / pi) * -1;
            var t = L.triangle(destination);
            t.addTo(this._map); 
		}
	},
});

L.polylinearrow = function (latlngs, options) {
return new L.PolylineArrow(latlngs, options);
};
