import Rope from "./rope";
import { requestAnimationFrame } from "./utils";

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.fillRect(0, 0, canvas.width, canvas.height);

    const mouse = { x: false, y: false };

    const ropes = [];

    const rl = 50;
    const rand = [];
    const target = { x: canvas.width / 2, y: canvas.height / 2 };
    const q = 10;
    const d = [];

    let t = 0;

    for (let i = 0; i < 100; i++) {
        const type = Math.random() > 0.25 ? "l" : "o";

        ropes.push(
            new Rope(
                context,
                canvas.width / 2,
                canvas.height / 2,
                (Math.random() * 1 + 0.5) * 520,
                Math.random() * 0.4 + 0.1,
                Math.random() * 15 + 5,
                type
            )
        );

        rand.push(Math.random() * 2 - 1);

        d.push(0);
    }

    const draw = () => {
        const { width, height } = canvas;
        let targetX, targetY;

        if (mouse.x) {
            targetX = mouse.x - target.x;
            targetY = mouse.y - target.y;
        } else {
            targetX = width / 2 + ((height / 2 - q) * Math.sqrt(2) * Math.cos(t)) / (Math.pow(Math.sin(t), 2) + 1) - target.x;
            targetY =
                height / 2 +
                ((height / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.pow(Math.sin(t), 2) + 1) -
                target.y;
        }

        target.x += targetX / 10;
        target.y += targetY / 10;

        t += 0.01;

        for (let i = 0; i < ropes.length; i++) {
            if (rand[i] > 0) {
                d[i] += (1 - rand[i]) / 10;
            } else {
                d[i] += (-1 - rand[i]) / 10;
            }

            ropes[i].update({
                x: target.x + rand[i] * rl * Math.cos((i * 2 * Math.PI) / ropes.length + d[i]),
                y: target.y + rand[i] * rl * Math.sin((i * 2 * Math.PI) / ropes.length + d[i]),
            });

            ropes[i].show();
        }
    };

    const animate = () => {
        requestAnimationFrame(animate);

        context.clearRect(0, 0, canvas.width, canvas.height);

        draw();
    };

    canvas.addEventListener(
        "mousemove",
        (e) => {
            mouse.x = e.pageX - canvas.offsetLeft;
            mouse.y = e.pageY - canvas.offsetTop;
        },
        false
    );

    canvas.addEventListener("mouseleave", () => {
        mouse.x = false;
        mouse.y = false;
    });

    window.addEventListener("resize", () => {
        canvas.width - window.innerWidth;
        canvas.height - window.innerHeight;
    });

    animate();
};
