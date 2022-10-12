class Segment {
    constructor(x, y, l) {
        this.b = Math.random() * 1.9 + 0.1;
        this.x0 = x;
        this.y0 = y;
        this.a = Math.random() * 2 * Math.PI;
        this.x1 = this.x0 + l * Math.cos(this.a);
        this.y1 = this.y0 + l * Math.sin(this.a);
        this.l = l;
    }

    update(x, y) {
        this.x0 = x;
        this.y0 = y;
        this.a = Math.atan2(this.y1 - this.y0, this.x1 - this.x0);
        this.x1 = this.x0 + this.l * Math.cos(this.a);
        this.y1 = this.y0 + this.l * Math.sin(this.a);
    }
}

export default Segment;