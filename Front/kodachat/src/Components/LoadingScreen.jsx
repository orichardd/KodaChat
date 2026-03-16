import "./LoadingScreen.css"
import { useState } from "react";

export function LoadingScreen({ fading }) {
    const [screen] = useState(() => Math.floor(Math.random() * 5) + 1);

    return (
        <div className={`loadingScreen ${fading ? "fading" : ""}`}>
            <img src={`/loadingScreens/${screen}.png`} alt="Loading..." />
        </div>
    );
}