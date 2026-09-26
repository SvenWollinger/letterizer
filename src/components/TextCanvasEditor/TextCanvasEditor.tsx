import styles from "./TextCanvasEditor.module.css";
import { useEffect, useRef } from "react";
import { requireRef } from "../../utils/require";
import { TextCanvasEditorRenderer } from "./TextCanvasEditorRenderer";
import type { TextCanvasState } from "./TextCanvasState";
import { NumberInput } from "../NumberInput";

type Props = {
    state: TextCanvasState;
    setState: (state: TextCanvasState) => void; 
}

function TextCanvasEditor({ state, setState }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasOverlayRef = useRef<HTMLCanvasElement | null>(null);

    const setDrawPixelOutline = (value: boolean) => setState({ ...state, drawPixelOutline: value });
    const setCanvasSize = (w: number, h: number) => setState({ ...state, width: w, height: h });

    useEffect(() => {
        const canvas = requireRef(canvasRef);
        const overlay = requireRef(canvasOverlayRef);

        TextCanvasEditorRenderer.render(state, canvas, overlay);

        const onResize = () => {
            TextCanvasEditorRenderer.render(state, canvas, overlay);
        }

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [ state ]);

    return (
        <div className={styles.editor}>
            <div><label className={styles.label}>Pixel Outline</label><input type="checkbox" checked={state.drawPixelOutline} onChange={(e) => setDrawPixelOutline(e.target.checked)}/></div>
            <div style={{display: "flex"}}>
                <NumberInput label="Width" value={state.width} onChange={(v) => setCanvasSize(v, state.height)}/>
            </div>
            <div style={{display: "flex"}}>
                <NumberInput label="Height" value={state.height} onChange={(v) => setCanvasSize(state.width, v)}/>
            </div>
            

            <div className={styles.canvasContainer} style={{ aspectRatio: state.width / state.height }}>
                <canvas ref={canvasRef} className={styles.canvas} width={state.width} height={state.height}/>
                <canvas ref={canvasOverlayRef} className={styles.overlay}/>
            </div>
        </div>
    );
}

export { TextCanvasEditor };