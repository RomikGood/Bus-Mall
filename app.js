'use strict';
console.log('js file is linked');

var item1Button = document.getElementById('item1-button');
var item2Button = document.getElementById('item2-button');
var item3Button = document.getElementById('item3-button');

var item1Img = document.getElementById('item1-img');
var item2Img = document.getElementById('item2-img');
var item3Img = document.getElementById('item3-img');

function Item(url) {
  this.url = url;
  this.votes = 0;
  this.shows = 0;
}

var allItemsForSale = [
  new Item('img/bag.jpg'),
  new Item('img/banana.jpg'),
  new Item('img/bathroom.jpg'),
  new Item('img/boots.jpg'),
  new Item('img/breakfast.jpg'),
  new Item('img/bubblegum.jpg'),
  new Item('img/chair.jpg'),
  new Item('img/cthulhu.jpg'),
  new Item('img/dog-duck.jpg'),
  new Item('img/dragon.jpg'),
  new Item('img/pen.jpg'),
  new Item('img/pet-sweep.jpg'),
  new Item('img/scissors.jpg'),
  new Item('img/shark.jpg'),
  new Item('img/sweep.png'),
  new Item('img/tauntaun.jpg'),
  new Item('img/unicorn.jpg'),
  new Item('img/usb.gif'),
  new Item('img/water-can.jpg'),
  new Item('img/wine-glass.jpg'),

];

var item1 = allItemsForSale[0];
var item2 = allItemsForSale[1];
var item3 = allItemsForSale[2];


item1Button.addEventListener('click', function(){
  item1.votes ++;
  item1.shows ++;
  item2.shows ++;
  item3.shows ++;
  pickNewItem();
});

item2Button.addEventListener('click', function(){
  item2.votes ++;
  item1.shows ++;
  item2.shows ++;
  item3.shows ++;
  pickNewItem();
});
// button  updates # of votes and  # of shows
item3Button.addEventListener('click', function(){
  item3.votes ++;
  item1.shows ++;
  item2.shows ++;
  item3.shows ++;
  pickNewItem();
});

function pickNewItem() {
  item1 = allItemsForSale[Math.floor(Math.random() * allItemsForSale.length)];
  item1Img.src = item1.url;
  item2 = allItemsForSale[Math.floor(Math.random() * allItemsForSale.length)];
  item2Img.src =item2.url;
  item3 = allItemsForSale[Math.floor(Math.random() * allItemsForSale.length)];
  item3Img.src =item3.url;
}
pickNewItem();

//total votes should be more then 25 for result to show
var totalVotes = function(){
  item1.votes + item2.votes + item3.votes;
};

// we access table in the DOM (html)
var ItemTable = document.getElementById('votingResultTable'); 

function renderItems(){
  var trElement = document.createElement('tbody'); // create tr
  var tdElement = document.createElement('td'); // create td / th

  tdElement.textContent = this.url; //give td content (name of each store)
  trElement.appendChild(tdElement); //append td to tr