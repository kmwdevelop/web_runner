let canvas = document.getElementById('screen') as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const SCREEN_HEIGHT = canvas.clientHeight;
const SCREEN_WIDTH = canvas.clientWidth;
const MY_WIDTH = 50;
const MY_HEIGHT = 50;
const OBS_WIDTH = 50;
const OBS_HEIGHT = 50;
const JUMP_VELOCITY = 15;

window.onload = () => {
    requestDrawUI();
}

let me = {
    x: 50,
    y: SCREEN_HEIGHT - MY_HEIGHT,
    width: MY_WIDTH,
    height: MY_HEIGHT,
    velocity: JUMP_VELOCITY,
    jump: false
}

let obstacle = {
    x: SCREEN_WIDTH,
    y: SCREEN_HEIGHT - OBS_HEIGHT,
    width: OBS_WIDTH,
    height: OBS_HEIGHT,
    velocity: 7.5
}

function drawMe() {
    // 객체를 그린다.
    ctx.fillStyle = "blue";
    ctx.fillRect(me.x, me.y, me.width, me.height);

    if (me.jump) {
        me.y -= me.velocity;
        me.velocity -= 1;

        console.log(me.y);

        if (me.y >= SCREEN_HEIGHT - MY_HEIGHT) {
            me.jump = false;
            me.velocity = JUMP_VELOCITY;
        }
    }
}

function drawObstacle() {
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    if (obstacle.x < 0 - OBS_WIDTH) {
        obstacle.x = SCREEN_WIDTH;
    }

    obstacle.x -= obstacle.velocity
}

function requestDrawUI() {

    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawMe();
    drawObstacle();
    
    if (isCollision()) {
        alert('GameOver!');
    }

    requestAnimationFrame(requestDrawUI);
}

function isCollision() {
    
    if (me.x > obstacle.x - (MY_WIDTH) && me.y >= obstacle.y) {
        return true;
    }
    return false;
}

document.getElementById("screen")?.addEventListener('click', () => {
    if (!me.jump) {
        me.jump = true;
    }
})