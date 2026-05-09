"use client";
import {useState} from "react";

export function Chat() {
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({message: "dame un explicaion sobre que es la calentamiento global"}),
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let result = "";
        while (true) {
            const {done, value} = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value);
            result += chunk;

            setResponse(result);
        }
    };

    return (
        <div>
            <button onClick={sendMessage}>Enviar</button>
            <p>{response}</p>
        </div>
    );
}
