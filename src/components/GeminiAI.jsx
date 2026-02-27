import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";

export const GeminiAI = () => {

    const [geminiResponse, setGeminiResponse] = useState(null);

    const fetchGeminiDescription = async () => {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Dona'm en català un descripció bonica, evocadora i detallada de Barcelona. Sigues breu i fes servir HTML per a formatar el text. No incloguis cap etiqueta d'encapçalament (h1, h2, etc.) ni cap etiqueta de paràgraf (p). Només el contingut formatat amb HTML. No incloguis cap altre text a part del contingut formatat amb HTML.",
        });
        console.log("Response from Gemini:", response);
        setGeminiResponse(response);
    }

    useEffect(() => {
        fetchGeminiDescription();
    }, []);


    return (
        <main>
            <section>
                <h2>Gemini IA</h2>
                <p dangerouslySetInnerHTML={{ __html: geminiResponse ? geminiResponse.text : "Loading Gemini AI description..." }}></p>
            </section>
        </main>
    );
}
