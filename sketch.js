var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedButton;
var timeFed;

var feed;
var lastFed;

var day;

////////////////////////////////////////////////
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

////////////////////////////////////////////////
function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedButton = createButton("Feed");
  feedButton.position(750,95);
  feedButton.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  timeFed=createButton("Time: "); //+day
  timeFed.position(700,95);

}

////////////////////////////////////////////////
function draw() {
  background(46,139,87);
  foodObj.display();

  if(lastFed>=12){
    //show time in PM format when lastFed is greater than 12
  } 
  else if(lastFed==0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    //show time in PM format when lastFed is less than 12
  }
  
  //write code to display text lastFed time here
 
  drawSprites();
}

////////////////////////////////////////////////
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

////////////////////////////////////////////////
function feedDog(){
  dog.addImage(happyDog);
  //update
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }
  else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  //hour()
}

////////////////////////////////////////////////
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
