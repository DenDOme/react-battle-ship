import gameBoard from "./gameBoard";

class Computer{
    constructor(){
        this.board = new gameBoard();
        this.missedArray = [];
    }

    hitShip(x,y){
        return this.board.hitShip(x,y);
    }

    placeShip(){
        
    }
}

export default Computer