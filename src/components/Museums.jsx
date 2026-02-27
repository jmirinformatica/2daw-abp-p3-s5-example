import { useState } from "react";

export const Museums = () => {

    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
    const position = [41.23138682560395, 1.7281181829816834];
    const distance = 1500; // Distance in meters to search for museums

    //https://apidocs.geoapify.com/docs/places/#categories
    const museumCategory = "entertainment.museum"; // Museums category ID in Foursquare

    const [jsonMuseums, setJsonMuseums] = useState(null);

    const fetchMuseums = async () => {
        try {
            var requestOptions = {
                method: 'GET',
            };

            const url = `https://api.geoapify.com/v2/places?categories=${museumCategory}&filter=circle:${position[1]},${position[0]},${distance}&limit=20&lang=ca&apiKey=${apiKey}`;

            const response = await fetch(url, requestOptions);

            const data = await response.json();
            setJsonMuseums(data);
        } catch (error) {
            console.error("Error fetching museums:", error);
        }
    }

    return (
        <main>
            <section>
                <h2>Museums</h2>
                <button onClick={fetchMuseums}>Fetch Museums</button>
                {jsonMuseums && (
                    <div>
                        <pre>{JSON.stringify(jsonMuseums, null, 2)}</pre>
                    </div>
                )}
            </section>
        </main>
    );
};
