const activate = event => {
    const { x, y } = event.target.dataset;
    event.target.dataset.color = 100;

    divs.filter(div => div !== event.target).forEach(div => {
        const distance = Math.hypot(
            Math.abs(div.dataset.x - x),
            Math.abs(div.dataset.y - y)
        );

        if (distance >= 10) return;

        div.dataset.color = Math.max(
            (10 - distance) * (Math.random() * 0.25 + 0.75) * 5,
            div.dataset.color
        );

        if (div.dataset.color > 100) div.dataset.color = 100;
    });
};

let lastTime;
const step = time => {
    lastTime ??= time;

    if (time !== lastTime) {
        divs.filter(div => div.dataset.color > 0).forEach(div => {
            div.dataset.color -= (time - lastTime) / 20;
            if (div.dataset.color < 0) div.dataset.color = 0;

            div.style.backgroundColor = `hsl(0, 0%, ${div.dataset.color}%)`;
            div.style.borderWidth = `${-(div.dataset.color - 100) / 200}rem`;
        });
    }

    lastTime = time;

    requestAnimationFrame(step);
};

for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
        const div = document.createElement('div');

        div.dataset.color = 0;
        div.dataset.x = x;
        div.dataset.y = y;

        div.addEventListener('mouseover', activate);
        div.addEventListener('click', activate);

        document.body.appendChild(div);
    }
}

addEventListener('touchmove', event => {
    const { clientX, clientY } = event.touches[0];
    document.elementFromPoint(clientX, clientY).click();
});

const divs = Array.from(document.getElementsByTagName('div'));

requestAnimationFrame(step);
