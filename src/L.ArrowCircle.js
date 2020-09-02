"use strict";

(function (factory, window) {
  // define an AMD module that relies on 'leaflet'
  if (typeof define === "function" && define.amd) {
    define(["leaflet"], factory);

    // define a Common JS module that relies on 'leaflet'
  } else if (typeof exports === "object") {
    module.exports = factory(require("leaflet"));
  }

  // attach your plugin to the global 'L' variable
  if (typeof window !== "undefined" && window.L) {
    window.L.YourPlugin = factory(L);
  }
})(function (L) {
  L.DivIcon.ArrowCircle = L.DivIcon.extend({
    options: {
      color: "#0080ff",
      size: 36,
      opacity: 1,
      rotation: 0,
    },
    initialize: function (options) {
      options = L.Util.setOptions(this, options);
      options.iconSize = L.point([options.size, options.size]);
      options.className = "arrow-circle";

      this.iconAnchor = L.point(
        Number(options.size) / 2,
        Number(options.size) / 2
      );

      options.popupAnchor = L.point(0, -0.25 * options.size);

      options.html = this._createSVG();
    },
    _createArrow: function () {
      let dims = this._calculateArrowDimensions();

      let pathDescription =
        `M ${dims.startX} ${dims.startY} ` +
        `v -${dims.width} h -${dims.width / 2} ` +
        `L ${this.iconAnchor.x} 0` +
        `l ${dims.width} ${dims.pointerYLength} ` +
        `h -${dims.width / 2} v ${dims.width}`;

      return `<path d="${pathDescription}" style="stroke: black; fill: ${this.options.color}; opacity: ${this.options.opacity};"/>`;
    },
    _createCircle: function () {
      const getYIntercept = (x) => {
        return Math.round(
          Math.sqrt(
            Math.pow(radius, 2) -
              Math.pow(x, 2) -
              Math.pow(this.iconAnchor.x, 2) +
              2 * x * this.iconAnchor.x
          )
        );
      };

      let dims = this._calculateArrowDimensions();
      let radius = this.options.size / 4;
      let yIntercept = getYIntercept(dims.startX);

      let pathDescription =
        `M ${dims.startX} ${yIntercept}` +
        `A ${radius} ${radius} 0 1 0 ${dims.startX + dims.width} ${yIntercept}`;

      return `<path d="${pathDescription}" style="stroke: black; fill: ${this.options.color}; opacity: ${this.options.opacity};"/>`;
    },
    _calculateArrowDimensions: function () {
      let circleRadius = this.options.size / 4;
      let width = this.options.size / 10;

      let startX = this.iconAnchor.x - width / 2;
      let startY = this.iconAnchor.y - circleRadius + this.options.size / 40;
      let pointerYLength = startY - width;

      return {
        startX: startX,
        startY: startY,
        width: width,
        pointerYLength: pointerYLength,
      };
    },
    _createSVG: function () {
      let group =
        `<g transform="rotate(${this.options.rotation}, ${this.iconAnchor.x}, ${this.iconAnchor.y})">` +
        `${this._createArrow()}${this._createCircle()}</g>`;
      let className = this.options.className + "-svg";

      let style =
        "width:" +
        this.options.size +
        "px; height:" +
        this.options.size +
        "px;";

      return `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" style="${style}">${group}</svg>`;
    },
  });

  L.divIcon.arrowCircle = (options) => {
    return new L.DivIcon.ArrowCircle(options);
  };

  L.Marker.ArrowCircle = L.Marker.extend({
    options: {
      iconFactory: L.divIcon.arrowCircle,
      iconOptions: {},
    },
    initialize: function (latlng, options) {
      options = L.Util.setOptions(this, options);
      options.icon = options.iconFactory(options.iconOptions);
      this._latlng = latlng;
    },
    onAdd: function (map) {
      L.Marker.prototype.onAdd.call(this, map);
    },
  });

  L.marker.arrowCircle = (latlng, options) => {
    return new L.Marker.ArrowCircle(latlng, options);
  };

  return L.Marker.ArrowCircle;
}, window);
