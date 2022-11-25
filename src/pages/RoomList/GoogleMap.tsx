import React from 'react'
import GoogleMapReact from 'google-map-react';
type Props = {}

export default function GoogleMap({}: Props) {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBsqTrHYoQ1Z_1ofyFLR7134IDXOaw_p24" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
    </div>
  )
}