"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { Map, Marker, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Token de Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiamF5Z2h6IiwiYSI6ImNtY3l1anYwODBteTYybHB3MDM1OTJhc20ifQ.4PkzRVH_H2HM4g5LyxPF6w";

// Tipado de los puntos
interface GeoPoint {
  state: string;
  views: number;
  likes: number;
  dislikes: number;
  lat: number;
  lon: number;
}

const GeoMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  let userInteracting = false;
  const spinEnabled = true;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v9",
      projection: "globe",
      zoom: 0,
      center: [30, 15],
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on("style.load", () => {
      map.setFog({});
    });

    // Cargar puntos desde JSON y dibujar
    fetch("/geo_data.json")
      .then((res) => res.json())
      .then((data: GeoPoint[]) => {
        data.forEach((point) => {
          const popupText = `
            <strong>${point.state}</strong><br/>
            Views: ${point.views.toLocaleString()}<br/>
            Likes: ${point.likes.toLocaleString()}<br/>
            Dislikes: ${point.dislikes.toLocaleString()}
          `;

          new Marker({ color: "#3b82f6" })
            .setLngLat([point.lon, point.lat])
            .setPopup(new Popup().setHTML(popupText))
            .addTo(map);
        });
      });

    // Animación de rotación
    const secondsPerRevolution = 240;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    function spinGlobe() {
      if (!map || !spinEnabled || userInteracting) return;

      const zoom = map.getZoom();
      if (zoom >= maxSpinZoom) return;

      let distancePerSecond = 360 / secondsPerRevolution;
      if (zoom > slowSpinZoom) {
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        distancePerSecond *= zoomDif;
      }

      const center = map.getCenter();
      center.lng -= distancePerSecond;

      map.easeTo({ center, duration: 1000, easing: (n) => n });
    }

    map.on("mousedown", () => (userInteracting = true));
    map.on("dragstart", () => (userInteracting = true));
    map.on("moveend", () => spinGlobe());

    spinGlobe();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="w-full h-[320px] mt-4 rounded-xl  shadow-md overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default GeoMap;
