import { useEffect } from "react";

const TawkChat = () => {
    useEffect(() => {
        const Tawk_API = window.Tawk_API || {};
        const Tawk_LoadStart = new Date();

        const script = document.createElement("script");
        script.async = true;
        script.src = import.meta.env.VITE_TAWK_API_URL;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // Since it's just adding a script
};

export default TawkChat;
