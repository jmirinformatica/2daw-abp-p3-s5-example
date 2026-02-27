import { useEffect, useState } from "react";


const haversineDistance = (lat1, lon1, lat2, lon2) => {
  console.log("Calculant distància entre:", lat1, lon1, "i", lat2, lon2);

  const lat1Num = Number(lat1);
  const lon1Num = Number(lon1);
  const lat2Num = Number(lat2);
  const lon2Num = Number(lon2);

  console.log(lat1, lat2, lon1, lon2)

  if (isNaN(lat1Num) || isNaN(lon1Num) || isNaN(lat2Num) || isNaN(lon2Num)) {
    console.error("Error: Un dels valors no és un número!", { lat1, lon1, lat2, lon2 });
    return NaN;
  }

  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radi de la Terra en km
  const dLat = toRad(lat2Num - lat1Num);
  const dLon = toRad(lon2Num - lon1Num);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1Num)) * Math.cos(toRad(lat2Num)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  console.log("Distància: " + R * c)
  return R * c; // Retorna la distància en km
};

const getCityCoordinates = async (cityName) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1`
    );
    const data = await response.json();

    if (data.length === 0) {
      throw new Error("No s'han trobat coordenades per aquesta ciutat");
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Error obtenint coordenades:", error);
    return null;
  }
};

export const Distance = () => {

  const origen = "Barcelona";
  const desti = "Madrid";

  const [distance, setDistance] = useState(null);
  const [origenCoords, setOrigenCoords] = useState(null);
  const [destiCoords, setDestiCoords] = useState(null);

  useEffect(() => {
    handleCalculateDistance();
  }, []);

  const handleCalculateDistance = async () => {
    const origenCoordsValue = await getCityCoordinates(origen);
    setOrigenCoords(origenCoordsValue);

    const destiCoordsValue = await getCityCoordinates(desti);
    setDestiCoords(destiCoordsValue);

    if (origenCoordsValue && destiCoordsValue) {
      const value = haversineDistance(
        origenCoordsValue.lat,
        origenCoordsValue.lng,
        destiCoordsValue.lat,
        destiCoordsValue.lng
      );
      setDistance(value);
    } else {
      console.error("No s'han pogut obtenir les coordenades per calcular la distància.");
    }
  }

  return (
    <main>
      <section>
        <h2>Distance</h2>
        <div>
          <p>Origen: {origen} ({origenCoords ? `${origenCoords.lat}, ${origenCoords.lng}` : "No coordenades"})</p>
          <p>Destí: {desti} ({destiCoords ? `${destiCoords.lat}, ${destiCoords.lng}` : "No coordenades"})</p>
          <p>Distance between {origen} and {desti}: {distance ? `${distance.toFixed(2)} km` : "Calculating..."}</p>
        </div>
      </section>
    </main>
  );
};