import { Mistral } from '@mistralai/mistralai';
import { useEffect, useState } from 'react';

export const MistralAI = () => {

    const [mistralResponse, setMistralResponse] = useState(null);

    const fetchMistralDescription = async () => {
        const client = new Mistral({ apiKey: import.meta.env.VITE_MISTRAL_API_KEY });

        const description = await client.chat.complete({
            model: 'mistral-medium-latest',
            messages: [{ role: 'user', content: 'Dona\'m en català un descripció bonica, evocadora i detallada de Vilanova i la Geltrú. Sigues breu i fes servir HTML per a formatar el text. No incloguis cap etiqueta d\'encapçalament (h1, h2, etc.) ni cap etiqueta de paràgraf (p). Només el contingut formatat amb HTML. No incloguis cap altre text a part del contingut formatat amb HTML.' }],
        });
        console.log("Response from Mistral:", description);
        setMistralResponse(description);
    }

    useEffect(() => {
        fetchMistralDescription();
    }, []);

    return (
        <div>
            <h2>Mistral AI</h2>
            <p dangerouslySetInnerHTML={{ __html: mistralResponse ? mistralResponse.choices[0].message.content : "Loading Mistral AI description..." }}></p>
        </div>
    );
}