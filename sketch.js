//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload() {
    //load images here
    dogImg = loadImage('images/Dog.png');
    happyDogImg = loadImage('images/happydog.png');
}

function setup() {
    createCanvas(500, 500);

    database = firebase.database();
    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    dog = createSprite(250, 320, 80, 80);
    dog.addImage(dogImg);
    dog.scale = 0.15;
}


function draw() {
    background(46, 139, 87);
    drawSprites();

    // console.log(foodS);

    //add styles here

    if (keyWentDown(UP_ARROW)) {
        writeStock(foodS);
        dog.addImage(happyDogImg);
    }

    textSize(20);
    fill('aqua');
    text('Press UP ARROW Key To Feed Drago Milk', 55, 40);
    fill('aliceblue');
    text('Food remaining: ' + foodS, 150, 150);
}

function readStock(data) {
    foodS = data.val();
}

function writeStock(x) {
    if (x <= 0) {
        x = 0;
    }
    else {
        x -= 1;
    }
    database.ref('/').update({
        Food: x
    })
}