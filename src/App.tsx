import { TextCanvasEditor } from "./components/TextCanvasEditor";
import styles from "./App.module.css";
import { useState } from "react";
import { type TextCanvasState } from "./components/TextCanvasEditor/TextCanvasState";

function App() {
    const [ state, setState ] = useState<TextCanvasState>({
        width: 20,
        height: 16,
        drawPixelOutline: true
    });

    return <div className={styles.app}>
        <h1>Letterizer</h1>
        <TextCanvasEditor state={state} setState={setState}/>
    </div>;
}

export { App };