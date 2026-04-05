"use client";

import React, { useMemo } from "react";
import s from "./yandex.module.scss";

const OSM_WAY_URL =
  "https://www.openstreetmap.org/way/205722244#map=19/42.939802/74.626594";

const DEFAULT_LAT = 42.939802;
const DEFAULT_LON = 74.626594;
const DEFAULT_ZOOM = 19;

function bboxFromCenter(lat, lon, zoom) {
  const scale =
    zoom >= 19 ? 0.0012 : zoom >= 17 ? 0.003 : zoom >= 15 ? 0.008 : 0.02;
  return {
    minLon: lon - scale,
    minLat: lat - scale,
    maxLon: lon + scale,
    maxLat: lat + scale,
  };
}

function buildEmbedSrc(lat, lon, zoom) {
  const { minLon, minLat, maxLon, maxLat } = bboxFromCenter(lat, lon, zoom);
  const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`;
}

function buildMapLink(lat, lon, zoom) {
  return `https://www.openstreetmap.org/#map=${zoom}/${lat}/${lon}`;
}

export const YandexMap = ({ el, className, variant = "inline" }) => {
  const lat = Number(el?.latitude);
  const lon = Number(el?.longitude);
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lon);

  const latitude = hasCoords ? lat : DEFAULT_LAT;
  const longitude = hasCoords ? lon : DEFAULT_LON;
  const zoom = hasCoords ? 17 : DEFAULT_ZOOM;

  const src = useMemo(
    () => buildEmbedSrc(latitude, longitude, zoom),
    [latitude, longitude, zoom]
  );

  const mapHref = useMemo(
    () => (hasCoords ? buildMapLink(latitude, longitude, zoom) : OSM_WAY_URL),
    [hasCoords, latitude, longitude, zoom]
  );

  const isKart = variant === "kart";

  return (
    <div
      className={`${s.wrap} ${isKart ? s.wrap_kart : ""} ${className || ""}`}
    >
      <iframe
        className={isKart ? s.map_kart : s.map}
        title="Карта OpenStreetMap"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        className={s.map_link}
        href={mapHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        Открыть карту на OpenStreetMap
      </a>
    </div>
  );
};
