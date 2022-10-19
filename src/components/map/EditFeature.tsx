import React from "react";
import L from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

interface Coordinates {
  southWest: [any, any];
  northEast: [any, any];
}

const EditFeature: React.FC<Coordinates> = (props: Coordinates) => {
  const _onCreated = (e: any) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }

    console.log("Geojson", layer.toGeoJSON());

    let test = layer.getLatLngs();

    console.log("coords rectangle", layer.getLatLngs());
    console.log("coords lat", test[0][0].lat);
    console.log("coords long", test[0][0].lng);
    // Do whatever else you need to. (save to db; etc)
    props.southWest[0](test[0][0].lat);
    props.southWest[1](test[0][0].lng);

    props.northEast[0](test[0][2].lat);
    props.northEast[1](test[0][2].lng);

    // this._onChange();
  };

  const _onDrawStart = (e: any) => {
    console.log("_onDrawStart", e);
  };

  const _onDeleted = (e: any) => {
    let numDeleted = 0;
    e.layers.eachLayer(() => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    // this._onChange();
  };

  const _onEdited = (e: any) => {
    let numEdited = 0;
    e.layers.eachLayer(() => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    // this._onChange();
  };

  return (
    <FeatureGroup>
      <EditControl
        onDrawStart={_onDrawStart}
        position="topleft"
        onEdited={_onEdited}
        onCreated={_onCreated}
        onDeleted={_onDeleted}
        draw={{
          polyline: false,
          rectangle: true,
          circlemarker: false,
          circle: false,
          polygon: false,
        }}
      />
    </FeatureGroup>
  );
};

export default EditFeature;
