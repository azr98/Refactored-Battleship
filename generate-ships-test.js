import {Ship} from './ship.js'

var i = 0;

var ships = []
while ( i < 7){
    var newShip = new Ship()
    ships.push(newShip)
    i++
}



for (var ship of ships){
    var j = 0;
    while (j < 3){
    var num1 = Math.floor(Math.random() * (6 - 0 + 1) + 0)
    var num2 = Math.floor(Math.random() * (6 - 0 + 1) + 0) 
    var position = "" + num1 + num2
    
    if (ship.locations.length == 0 || !ship.locations.includes(position)){
        ship.locations.push(position)
        j++
    }
}

}

console.log("The ships: ", ships)
console.log("The first ship ", ships[0])