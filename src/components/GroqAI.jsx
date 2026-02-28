import { useEffect, useState } from "react";
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const GroqAI = () => {

    const [groqResponse, setGroqResponse] = useState(null);

    const fetchGroqDescription = async () => {
        try {
            const description = await groq.chat.completions.create({
                model: 'openai/gpt-oss-120b',
                messages: [
                    { role: 'system', content: 'Ets un assistent útil que proporciona descripcions detallades i evocadores de llocs.' },
                    { role: 'user', content: `Dona\'m en català un descripció bonica, evocadora i detallada de Vilanova i la Geltrú. Sigues breu i fes servir HTML per a formatar el text. No incloguis cap etiqueta d\'encapçalament (h1, h2, etc.) ni cap etiqueta de paràgraf (p). Només el contingut formatat amb HTML. No incloguis cap altre text a part del contingut formatat amb HTML.` },
                ],
            });
            console.log("Response from Groq:", description);
            setGroqResponse(description);
        } catch (error) {
            console.error('Error fetching Groq AI response:', error);
        }
    };

    useEffect(() => {
        fetchGroqDescription();
    }, []);


    return (
        <div>
            <h2>Groq AI</h2>
            <p dangerouslySetInnerHTML={{ __html: groqResponse ? groqResponse.choices[0].message.content : "Loading Groq AI description..." }}></p>
        </div>
    );
}
