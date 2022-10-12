export const requestAnimationFrame = (callback) => {
    const fps = 60;
    const requestAnimationFrameFn =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (f) {
            return setTimeout(f, 1000 / fps);
        };

    return requestAnimationFrameFn(callback);
};