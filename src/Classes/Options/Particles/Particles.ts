import type { IParticles } from "../../../Interfaces/Options/Particles/IParticles";
import { OptionsColor } from "./OptionsColor";
import { LineLinked } from "./LineLinked/LineLinked";
import { Move } from "./Move";
import { ParticlesNumber } from "./ParticlesNumber";
import { Opacity } from "./Opacity/Opacity";
import { Shape } from "./Shape/Shape";
import { Size } from "./Size/Size";
import type { IOptionsColor } from "../../../Interfaces/Options/Particles/IOptionsColor";
import type { ILineLinked } from "../../../Interfaces/Options/Particles/LineLinked/ILineLinked";
import type { IMove } from "../../../Interfaces/Options/Particles/IMove";
import type { IParticlesNumber } from "../../../Interfaces/Options/Particles/IParticlesNumber";
import type { IOpacity } from "../../../Interfaces/Options/Particles/Opacity/IOpacity";
import type { ISize } from "../../../Interfaces/Options/Particles/Size/ISize";
import type { IRotate } from "../../../Interfaces/Options/Particles/Rotate/IRotate";
import { Rotate } from "./Rotate/Rotate";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IShadow } from "../../../Interfaces/Options/Particles/IShadow";
import { Shadow } from "./Shadow";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple";
import type { IStroke } from "../../../Interfaces/Options/Particles/IStroke";
import { Stroke } from "./Stroke";
import type { IShape } from "../../../Interfaces/Options/Particles/Shape/IShape";
import { ICollisions } from "../../../Interfaces/Options/Particles/ICollisions";
import { Collisions } from "./Collisions";
import { ITwinkle } from "../../../Interfaces/Options/Particles/Twinkle/ITwinkle";
import { Twinkle } from "./Twinkle/Twinkle";

export class Particles implements IParticles {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    public get line_linked(): ILineLinked {
        return this.lineLinked;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    public set line_linked(value: ILineLinked) {
        this.lineLinked = value;
    }

    public collisions: ICollisions;
    public color: SingleOrMultiple<IOptionsColor>;
    public lineLinked: ILineLinked;
    public move: IMove;
    public number: IParticlesNumber;
    public opacity: IOpacity;
    public rotate: IRotate;
    public shape: IShape;
    public size: ISize;
    public shadow: IShadow;
    public stroke: SingleOrMultiple<IStroke>;
    public twinkle: ITwinkle;

    constructor() {
        this.collisions = new Collisions();
        this.color = new OptionsColor();
        this.lineLinked = new LineLinked();
        this.move = new Move();
        this.number = new ParticlesNumber();
        this.opacity = new Opacity();
        this.rotate = new Rotate();
        this.shadow = new Shadow();
        this.shape = new Shape();
        this.size = new Size();
        this.stroke = new Stroke();
        this.twinkle = new Twinkle();
    }

    public load(data?: RecursivePartial<IParticles>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (data.color instanceof Array) {
                    this.color = data.color.map((s) => {
                        const tmp = new OptionsColor();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    if (this.color instanceof Array) {
                        this.color = new OptionsColor();
                    }

                    this.color.load(data.color);
                }
            }

            const lineLinked = data.lineLinked ?? data.line_linked;

            if (lineLinked !== undefined) {
                this.lineLinked.load(lineLinked);
            }

            this.move.load(data.move);
            this.number.load(data.number);
            this.opacity.load(data.opacity);
            this.rotate.load(data.rotate);
            this.shape.load(data.shape);
            this.size.load(data.size);
            this.shadow.load(data.shadow);
            this.twinkle.load(data.twinkle);

            const collisions = data.move?.collisions ?? data.move?.bounce;

            if (collisions !== undefined) {
                this.collisions.enable = collisions;
            }

            this.collisions.load(data.collisions);

            const strokeToLoad = data.stroke ?? data.shape?.stroke;

            if (strokeToLoad !== undefined) {
                if (strokeToLoad instanceof Array) {
                    this.stroke = strokeToLoad.map((s) => {
                        const tmp = new Stroke();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    if (this.stroke instanceof Array) {
                        this.stroke = new Stroke();
                    }

                    this.stroke.load(strokeToLoad);
                }
            }
        }
    }
}
