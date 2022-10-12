import Segment from "./segment";

class Rope {
    constructor(context, tx, ty, l, b, slq, type) {
        this.context = context;
        this.res = type == "l" ? l / 2 : l / slq;
        this.type = type;
        this.l = l;
        this.segment = [];
        this.b = b;
        this.rand = Math.random();

        this.segment.push(new Segment(tx, ty, this.l / this.res));

        for (let i = 1; i < this.res; i++) {
            this.segment.push(new Segment(this.segment[i - 1].x1, this.segment[i - 1].y1, this.l / this.res));
        }
    }

    update(t) {
        this.segment[0].update(t.x, t.y);

        for (let i = 1; i < this.res; i++) {
            this.segment[i].update(this.segment[i - 1].x1, this.segment[i - 1].y1);
        }
    }

    show() {
        const color = "hsl(" + (this.rand * 60 + 180) + ",100%," + (this.rand * 60 + 30) + "%)";

        if (this.type == "l") {
            this.context.beginPath();

            for (let i = 0; i < this.segment.length; i++) {
                this.context.lineTo(this.segment[i].x0, this.segment[i].y0);
            }

            this.context.lineTo(this.segment[this.segment.length - 1].x1, this.segment[this.segment.length - 1].y1);
            this.context.strokeStyle = color;
            this.context.lineWidth = this.b;
            this.context.stroke();

            this.context.beginPath();
            this.context.arc(this.segment[0].x0, this.segment[0].y0, 1, 0, 2 * Math.PI);
            this.context.fillStyle = color;
            this.context.fill();

            this.context.beginPath();
            this.context.arc(this.segment[this.segment.length - 1].x1, this.segment[this.segment.length - 1].y1, 2, 0, 2 * Math.PI);
            this.context.fillStyle = color;
            this.context.fill();
        } else {
            for (let i = 0; i < this.segment.length; i++) {
                this.context.beginPath();
                this.context.arc(this.segment[i].x0, this.segment[i].y0, this.segment[i].b, 0, 2 * Math.PI);
                this.context.fillStyle = color;
                this.context.fill();
            }

            this.context.beginPath();
            this.context.arc(this.segment[this.segment.length - 1].x1, this.segment[this.segment.length - 1].y1, 2, 0, 2 * Math.PI);
            this.context.fillStyle = color;
            this.context.fill();
        }
    }
}

export default Rope;
