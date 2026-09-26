import { require } from "../../utils/require";
import type { TextCanvasState } from "./TextCanvasState";

class TextCanvasEditorRenderer {
    static render(
        state: TextCanvasState,
        canvas: HTMLCanvasElement,
        overlay: HTMLCanvasElement
    ) {
        const startTime = performance.now();
        const ctx = require(canvas.getContext("2d"));
        const ctxOverlay = require(overlay.getContext("2d"));

        ctx.fillStyle = "lightgray";
        ctx.fillRect(0, 0, state.width, state.height);

        ctx.font = "12px Consolas"
        ctx.fillStyle = "black";
        ctx.fillText("Dan the Man", 1, 24);

        overlay.width = overlay.clientWidth * devicePixelRatio;
        overlay.height = overlay.clientHeight * devicePixelRatio;
        ctxOverlay.scale(devicePixelRatio, devicePixelRatio);



        if(state.drawPixelOutline) {
            const pixelSize = overlay.clientWidth / state.width;
            ctxOverlay.strokeStyle = "black";
            ctxOverlay.lineWidth = 1;

            for(let x = 0; x < state.width; x++) {
                for(let y = 0; y < state.height; y++) {
                    ctxOverlay.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                }
            }
        }

        console.log("[TextCanvasEditorRenderer]", "Rendering took", performance.now() - startTime, "ms");
    }
}

export { TextCanvasEditorRenderer };