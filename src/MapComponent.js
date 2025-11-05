import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
    const mapContainer = useRef(null);

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://demotiles.maplibre.org/style.json",
            center: [10.75, 59.91], //oslo koordinater
            zoom: 10,
        });

        //legg til zoom- og rotasjonskontroller
        map.addControl(new maplibregl.NavigationControl(), "top-right");

        //legg til markør midt i oslo
        const marker = new maplibregl.Marker({ color: "#e63946" })
            .setLngLat([10.75, 59.91])
            .addTo(map);

        //legg til popup som vises når du klikker på markøren
        const popup = new maplibregl.Popup({ offset: 25 }).setText("Oslo");

        marker.setPopup(popup);

        return () => map.remove(); 
    }, []);

    return (
        <div
        ref={mapContainer}
        style={{
            height: "100vh",
            width: "100%",
            borderRadius: "8px",
        }}
        />
    );
};

export default MapComponent;