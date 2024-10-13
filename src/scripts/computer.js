import gameBoard from "./gameBoard";
class Computer{
    constructor(){
        this.board = new gameBoard();
        this.missedArray = [];
        this.placeShip();
    }

    hitShip(x,y){
        return this.board.hitShip(x,y);
    }

    placeShip(){
        const ships = this.board.ships;
        let length = 1;

        while (length <= 4) {
            let shipCount = ships.filter(boat => boat.length === length).length;

            while (shipCount < this.getMaxBoats(length)) {
                const x = this.getRandomCoords(10);
                const y = this.getRandomCoords(10);
                const vertical = this.getRandomBoolean();
                if (this.board.placeShip(length, x, y, vertical)) {
                    shipCount++;                 
                }
            }

            length++; 
        }
    }

    getMaxBoats(length) {
        switch (length) {
            case 1: return 4;
            case 2: return 3;
            case 3: return 2;
            case 4: return 1;
            default: return 0;
        }
    }

    getRandomCoords(value){
        return Math.floor(Math.random() * value);
    }

    getRandomBoolean(){
        return Math.random() >= 0.5;
    }
}

export default Computer