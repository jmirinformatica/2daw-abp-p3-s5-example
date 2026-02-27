import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

export const OpenRoutes = () => {

    const apiKey = import.meta.env.VITE_OPENROUTE_API_KEY;
    const [route, setRoute] = useState([]); // Ruta en coordenades
    const origen = [41.381097225589855, 2.1228305253163593];
    const destinacio = [41.3483439269215, 2.0744756657870878];

    const get_Routes = async () => {

        //const tipus_ruta = "driving-car";
        //const tipus_ruta = "cycling-regular";
        const tipus_ruta = "driving-car";

        // ORS usa [lng, lat]
        // Crida a l'API d'OpenRouteService per obtenir la ruta
        const url = `https://api.openrouteservice.org/v2/directions/${tipus_ruta}?api_key=${apiKey}&start=${origen[1]},${origen[0]}&end=${destinacio[1]},${destinacio[0]}&geometry_format=geojson`;


        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log("Resposta de l'API:", data); // Veiem l'estructura de la resposta

            if (!data.features || data.features.length === 0) {
                console.error("No s'ha trobat cap ruta. Comprova les coordenades.");
                //return;
            }

            // Conversió de coordenades de l'API a LeaftLet maps
            const coordinates = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setRoute(coordinates);
        } catch (error) {
            console.error("Error carregant la ruta:", error);
        }
    }

    useEffect(() => {
        get_Routes()
    }, []);

    return (
        <main>
            <section>
                <h2>Routes</h2>
                <MapContainer center={origen || destinacio} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Marcador de la ubicació de l'usuari */}
                    {origen && (
                        <Marker position={origen}>
                            <Popup>📍 Origen</Popup>
                        </Marker>
                    )}

                    {/* Marcador de la destinació fixa */}
                    <Marker position={destinacio}>
                        <Popup>📍 Destinació</Popup>
                    </Marker>

                    {/* Dibuixar la ruta real seguint carreteres */}
                    {route.length > 0 && <Polyline positions={route} color="blue" />}
                </MapContainer>
            </section>
        </main>
    );
};

