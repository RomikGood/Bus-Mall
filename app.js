'use strict';


var item1Button = document.getElementById('item1-button');
var item2Button = document.getElementById('item2-button');
var item3Button = document.getElementById('item3-button');

var item1Img = document.getElementById('item1-img');
var item2Img = document.getElementById('item2-img');
var item3Img = document.getElementById('item3-img');

var totalClickCounter = 0;


//item constructon
function Item(url, name) {
  this.url = url;
  this.name = name;
  this.votes = 0;
  this.shows = 0;
}

var allItemsForSale = [];

//if nothing in local storage
if (!localStorage.items) {  

  allItemsForSale = [
    new Item('img/bag.jpg', 'bag'),
    new Item('img/banana.jpg', 'banana'),
    new Item('img/bathroom.jpg','bathroom'),
    new Item('img/boots.jpg', 'boots'),
    new Item('img/breakfast.jpg', 'breakfast'),
    new Item('img/bubblegum.jpg', 'bubblegum'),
    new Item('img/chair.jpg', 'chair'),
    new Item('img/cthulhu.jpg', 'cthulhu'),
    new Item('img/dog-duck.jpg','dog-duck'),
    new Item('img/dragon.jpg','dragon'),
    new Item('img/pen.jpg','pen'),
    new Item('img/pet-sweep.jpg','pet-sweep'),
    new Item('img/scissors.jpg','scissors'),
    new Item('img/shark.jpg','shark'),
    new Item('img/sweep.png','sweep'),
    new Item('img/tauntaun.jpg','tauntaun'),
    new Item('img/unicorn.jpg','unicorn'),
    new Item('img/usb.gif','usb'),
    new Item('img/water-can.jpg','water-can'),
    new Item('img/wine-glass.jpg','wine-glass'),

  ];

} else {
  allItemsForSale = JSON.parse(localStorage.getItem('items'));
}


var item1 = allItemsForSale[0];
var item2 = allItemsForSale[1];
var item3 = allItemsForSale[2];


item1Button.addEventListener('click', function(){
  item1.votes ++;
  item1.shows ++;
  item2.shows ++;
  item3.shows ++;
  totalClickCounter++;
  pickNewItem();
  removeEvent();
});

item2Button.addEventListener('click', function(){
  item2.votes ++;
  item1.shows ++;
  item2.shows ++;
  item3.shows ++;
  totalClickCounter++;
  pickNewItem();
  removeEvent();

});
// button  updates # of votes and  # of shows
item3Button.addEventListener('click', function(){
  item3.votes ++;
  item1.shows ++;
  item2.shows ++;
  item3.shows ++;
  totalClickCounter++;
  pickNewItem();
  removeEvent();

});

//picking new random items from array
var oldItem1 = item1;
var oldItem2 = item2;
var oldItem3 = item3;

function pickNewItem() {
  if (totalClickCounter < 25) {
    do {item1 = allItemsForSale[Math.floor(Math.random() * allItemsForSale.length)];
    } while (item1 === oldItem1 || item1 === oldItem2 || item1 === oldItem3);
    item1Img.src = item1.url;
    oldItem1 = item1;

    do {item2 = allItemsForSale[Math.floor(Math.random() * allItemsForSale.length)];
    } while (item2 === item1 || item2 === oldItem1 || item2 === oldItem2 || item2 === oldItem3);
    item2Img.src = item2.url;
    oldItem2 = item2;

    do {item3 = allItemsForSale[Math.floor(Math.random() * allItemsForSale.length)];
    } while (item3 === item2 || item3 === item1 || item3 === oldItem1 || item3 === oldItem2 || item3 === oldItem3);
    item3Img.src = item3.url;
    oldItem3 = item3;
  }
}
pickNewItem();

//create list to be display
var arrayOfNames = [];
var arrayOfVotes = [];


function renderList(){
  //var position = document.getElementById('list-of-results');
  for (var i = 0; i < allItemsForSale.length; i++ ) {
    //pussed into arrays to be displayed on the char
    arrayOfNames.push(allItemsForSale[i].name);
    arrayOfVotes.push(allItemsForSale[i].votes);
    //set local storage
    localStorage.setItem('items', JSON.stringify(allItemsForSale));

    // var newEl = document.createElement('li');
    // newEl.textContent = allItemsForSale[i].name + ' ----  votes: ' + allItemsForSale[i].votes + ' , displayed: ' + allItemsForSale[i].shows;
    // position.appendChild(newEl);
  }
}

// remove event listener with coutner at 25 and render the list
function removeEvent(){
  if (totalClickCounter === 25) {
    item1Button.removeEventListener('click', item1Button.addEventListener);
    item2Button.removeEventListener('click', item2Button.addEventListener);
    item3Button.removeEventListener('click', item3Button.addEventListener);
    //render list
    renderList();

    //render chart
    Item.renderChart();
  }
}

/// display chart
Item.renderChart = function(){
  var ctx = document.getElementById('item-chart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayOfNames,
      datasets: [{
        label: 'Votes per Item',
        data: arrayOfVotes,
        backgroundColor:'orange',
        hoverBackgroundColor: 'gray'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Results'
      }
    }
  });
};

