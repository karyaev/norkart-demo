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

        // liste over alle byer
        const cities = [
            { name: "Oslo", coords: [10.75, 59.91], info: "Hovedstaden i Norge" },
            { name: "Bergen", coords: [5.33, 60.39], info: "Byen mellom de 7 fjell" },
            { name: "Trondheim", coords: [10.39, 63.43], info: "Kjent for Nidarosdomen" },
            { name: "Tromsø", coords: [18.95, 69.65], info: "Nordlysens hovedstad" },
            { name: "Stavanger", coords: [5.73, 58.97], info: "Oljehovedstaden" },
        ];

        //legg til markør for alle byene
        cities.forEach((city) => {
            const marker = new maplibregl.Marker({ color: "#3b82f6" })
                .setLngLat(city.coords)
                .addTo(map);

            //legg til popup som vises når du klikker på markøren
            const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
                `<strong>${city.name}</strong><br>${city.info}`
            );

            marker.setPopup(popup);
        });

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