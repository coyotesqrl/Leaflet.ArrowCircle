# Leaflet.ArrowCircle

Circle with a directional arrow for use with the [Leaflet](https://leafletjs.com/) mapping library.

## Requirements

- Leaflet 1.6.0+ (it may well work with earlier versions; they have not been tested)
- Browser support for SVG

## Demo

https://coyotesqrl.github.io/Leaflet.ArrowCircle

## Usage

Include `L.ArrowCircle.js` as appropriate to your environment (HTML or Node).

```html
<script src="L.ArrowCircle.js"></script>
```

### Simple initialization

```javascript
L.marker
  .arrowCircle([40.2, -74.8], {
    iconOptions: { color: "rgb(200, 30, 240)", rotation: 42 },
  })
  .addTo(mymap);
```

## Properties

| Option   | Type   | Default   | Description                                                                                                                 |
| -------- | ------ | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| color    | String | `#0080ff` | Color of the ArrowCircle                                                                                                    |
| size     | Number | 36        | Total size of viewport square; the circle's center is coincident with the viewport's and the tip of the arrow abuts the end |
| opacity  | Number | 1         | Opacity of the ArrowCircle                                                                                                  |
| rotation | Number | 0         | Angle at which the arrow points                                                                                             |
