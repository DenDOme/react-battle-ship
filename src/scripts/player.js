import gameBoard from "./gameBoard";

class Player{
    constructor(){
        this.board = new gameBoard
    }

    hitShip(x,y){
        return this.board.hitShip(x,y);
    }

    placeShip(lenght,x,y,vertical){
        return this.board.placeShip(lenght,x,y,vertical);
    }

    deleteShip(x,y){
        return this.board.deleteShip(x,y);
    }
}

export default Player