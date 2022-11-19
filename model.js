import {Ship} from './ship.js'

var controller = {
    guesses: 0,
    processGuess : function(guess){
        var alphabet = ["A","B","C","D","E","F","G"]
        var alphabetLower = alphabet.map(x => x.toLowerCase())

        //validate guess type
        if(guess == null || guess.length !==2){
            view.displayMessage("Oops that was an invalid guess input, please enter a letter then number")
            return false
        }


        var parsedGuessFirstString=""
        var parsedGuessSecondString = guess[1]


        //validate if guess is on the board
        if (parsedGuessSecondString < model.boardSize && alphabetLower.includes(guess[0].toLowerCase())){
            parsedGuessFirstString = alphabetLower.indexOf(guess[0].toLowerCase()) //board starts at 0 so no need for + 1 
            var processedGuess = "" + parsedGuessFirstString + parsedGuessSecondString
            var hit = model.fire(processedGuess)

            //check if that was the game winning hit
            if (hit && model.shipsSunk == model.numberOfShips){
                this.guesses ++
                view.displayMessage(`Congrats you sank all of the ships and it took you ${this.guesses} guesses \n Resetting the game now`)
                this.resetGame()
                return true
            }
            //normal hit
            else if (hit){
                this.guesses++
                return true
            }
            
        }
        //guess is not on the board
         else {
            view.displayMessage("Oops either the letter or number of your guess is too high")
            return false
        }
    },
    resetGame : function (){
        model.shipsSunk = 0
        model.ships = []
    }
    
}


var model = {
    shipLength: 3,
    numberOfShips : 0,
    ships : [],
    generateShips : function (){
        var i = 0;
        while ( i < this.numberOfShips){
            var newShip = new Ship()
            this.ships.push(newShip)
            i++
        }
        for (var ship of this.ships){
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
        console.log("all the ships", this.ships)
    },
    boardSize : 7,
    fire : function(guess){
        for (var ship of this.ships){

            if(this.isSunk(ship)){
                view.displayMessage("Ship is already been sunk try another guess")
                return false
            }   
            
            else if (ship.locations.includes(guess)){
                ship.hits.push(location)
                view.displayMessage("HIT!")
                view.displayHit(guess)
                return true
            }
            
            else {
                view.displayMessage("MISS!")
                view.displayMiss(guess)
                return false
            }
        }
    },
    shipsSunk : 0,
    isSunk : function(ship){

        if (ship.hits === undefined || ship.hits.length == 0){
            return false
        }
       
        else if (ship.hits.lenth < this.shipLenght) {
            return false
        }

        else{
            return true
        }
    }
}





$("#numberOfShipsButton").click(function(){
      var noOfShips = $("#numberofShipsInput").val();
      model.numberOfShips = noOfShips
      model.generateShips()
    });




$("#fireButton").click(function(){
      var fireGuess = $("#guessInput").val();
      controller.processGuess(fireGuess)
      fireGuess = ''
    });

var view = {
    displayMessage : function(msg){
        let messageArea;
        messageArea = document.getElementById("messageArea")
        messageArea.innerHTML = msg
    },

    displayHit : function (fireLocation){
        var cell = document.getElementById(fireLocation)
        cell.setAttribute("class", "hit")
    },

    displayMiss : function(fireLocation){
        var cell = document.getElementById(fireLocation)
        console.log("displayMiss cell: ", cell)

        cell.setAttribute("class", "miss")
    },
}
