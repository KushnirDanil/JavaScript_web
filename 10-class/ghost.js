console.log('start!')
const canvas = document.getElementById('ghost')
const ctx = canvas.getContext('2d')
const cWidth = canvas.width;
const cHeight = canvas.height;
//console.log(canvas)
const imgFolder = 'images/'

const bgImg = new Image()
bgImg.src = imgFolder + 'map-01.png';

let gameFrame = 0;
let isRunning = true;
let requstId = null;
let score = 0;

let mouse = {
    x: cWidth / 2,
    y: cHeight / 2    
}

canvas.addEventListener('mousemove', function(event){
    //console.log(event)
    let c = canvas.getBoundingClientRect();
    mouse.x = event.clientX - c.left
    mouse.y = event.clientY - c.top
});

// Клас гравця
class Player {
    static heroImg = new Image()
    static runLeftImg = new Image()
    static runRightImg = new Image()

    static loadImages(){
        Player.heroImg.src = imgFolder + 'idle_hero.png'
        Player.runLeftImg.src = imgFolder + 'run_left.png'
        Player.runRightImg.src = imgFolder + 'run_right.png'
    }
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.heroMaxFrame = 17 
        this.runMaxFrame = 8
        this.xFrame = 0 // поточний кадр анімації
        this.sWidth = 43 // ширина кадру
        this.sHeight = 50 
        this.takt = 7
        this.speed = 5
    }

    drawImg(img, maxFrame){
        ctx.drawImage(
            img,
            this.sWidth * this.xFrame,
            0,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.sWidth,
            this.sHeight,
        )
        if (gameFrame % this.takt === 0){
            this.xFrame = (this.xFrame + 1) % maxFrame
        }
    }
    stay() {
        this.drawImg(Player.heroImg, this.heroMaxFrame)
    }
    runLeft(){
        this.drawImg(Player.runLeftImg, this.runMaxFrame)
    }
    runRight() {
        this.drawImg(Player.runRightImg, this.runMaxFrame)
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy)

        if(distance > this.speed){
            this.x += (dx/distance) * this.speed
            this.y += (dy/distance) * this.speed
        }else{
            this.x = mouse.x;
            this.y = mouse.y;
        }
    }
    move() {
        if (this.x < mouse.x) {
            this.runRight()
        } else if (this.x > mouse.x) {
            this.runLeft()
        } else {
            this.stay()
        }
    }
}

class Ghost {
    static idleGhost = new Image();

    constructor() {
        this.x = x;
        this.y = y;
        this.runMaxFrame = 8;
        this.xFrame = 0 ;
        this.sWidth = 43;
        this.sHeight = 50 ;
        this.takt = 7;
        this.speed = 5;
    }
}

let player = new Player(cWidth / 2, cHeight / 2)
Player.loadImages()

function start() {
    if (!isRunning) return;

    ctx.clearRect(0,0, cWidth, cHeight);
    ctx.drawImage(bgImg, 0, 0, cWidth, cHeight) // поправити зображення
        
    player.update()
    player.move()

    gameFrame++;
    requstId = requestAnimationFrame(start)
}

document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
        isRunning = !isRunning;
        if(isRunning){
            start()
        }else{
            cancelAnimationFrame(requstId)
        }
    }
})

const images = [
    bgImg,
    Player.heroImg,
    Player.runLeftImg,
    Player.runRightImg
]
let loadImages = 0
images.forEach( img => {
    img.onload = () => {
        loadImages ++
        if(loadImages === images.length)
            start()
    }
});