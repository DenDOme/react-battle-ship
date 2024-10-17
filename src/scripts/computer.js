import gameBoard from "./gameBoard";
class Computer{
    constructor(){
        this.board = new gameBoard();
        this.missedArray = [];
        this.placeShip();
        this.mapCoordsArray = [
            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0],
            [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1],
            [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2],
            [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3],
            [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
            [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
            [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
            [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
            [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
            [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]
        ];
        this.foundCoords = []
    }

    hitShip(x,y){
        return this.board.hitShip(x,y);
    }

    placeShip(){
        const ships = this.board.ships || [];
        let length = 1;

        const verticalCoords = [
            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0],
            [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1],
            [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2],
            [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3],
            [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
            [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
            [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
            [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
            [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
            [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]
        ];
        
        const horizontalCoords = [
            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0],
            [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1],
            [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2],
            [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3],
            [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
            [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
            [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
            [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
            [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
            [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]
        ];

        while (length <= 4) {
            let shipCount = ships.filter(boat => boat.length === length).length;
            
            while (shipCount < this.getMaxBoats(length)) {
                let orientationBoolean 

                if(horizontalCoords.length > 0 && verticalCoords.length > 0){
                    orientationBoolean = this.getRandomBoolean();
                } 
                else if(horizontalCoords.length <= 0){
                    orientationBoolean = true;
                } 
                else if(verticalCoords.length <= 0){
                    orientationBoolean = false;
                }
                
                if(orientationBoolean && verticalCoords.length > 0){
                    const randomCoords = this.getRandomCoords(verticalCoords.length);
                    const [x,y] = verticalCoords[randomCoords];
                    
                    if(this.board.placeShip(length, x, y, orientationBoolean)){
                        shipCount++;
                    }
                    verticalCoords.splice(randomCoords, 1);
                }
                else if(horizontalCoords.length > 0){
                    const randomCoords = this.getRandomCoords(horizontalCoords.length);
                    const [x,y] = horizontalCoords[randomCoords];
                    
                    if(this.board.placeShip(length, x, y, orientationBoolean)){
                        shipCount++;
                    }
                    horizontalCoords.splice(randomCoords, 1); 
                }
                
                if (verticalCoords.length === 0 && horizontalCoords.length === 0) {
                    break; 
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

    hitOpponentShip(Opponent){
        // if(this.foundCoords.length > 0){
        //     if(this.foundCoords.length === 1){
        //         const [x,y] = this.foundCoords[0];

        //         const surroundingCoords = [
        //             [x - 1, y - 1],
        //             [x, y - 1],
        //             [x + 1, y - 1], 
        //             [x - 1, y],
        //             [x + 1, y],       
        //             [x - 1, y + 1],
        //             [x, y + 1],
        //             [x + 1, y + 1]  
        //         ];

        //         const randomCoords = this.getRandomCoords(this.surroundingCoords.length);
        //         const [adjX, adjY] = surroundingCoords[randomCoords];

        //     }
        // }
        // else{
            const randomCoords = this.getRandomCoords(this.mapCoordsArray.length);
            console.log(this.mapCoordsArray)
            console.log(this.mapCoordsArray[randomCoords])
            const [x, y] = this.mapCoordsArray[randomCoords];
            this.mapCoordsArray.splice(randomCoords, 1);
            const ship = Opponent.board.map[x + (y*Opponent.board.mapx)];
            const result = Opponent.hitShip(x,y);
            if(result){
                this.foundCoords.push([x,y]);
                this.checkShipSunk(ship, x, y);
                
                return true;
            }
            return false
        // }
    }

    checkShipSunk(ship){
        if(ship.isSunked){
            const coords = ship.coords;
            for(const [x,y] of coords) {
                const surroundingCoords = [
                    [x - 1, y - 1],
                    [x, y - 1],
                    [x + 1, y - 1], 
                    [x - 1, y],
                    [x + 1, y],       
                    [x - 1, y + 1],
                    [x, y + 1],
                    [x + 1, y + 1]  
                ];

                const allCoordsToRemove = [...coords, ...surroundingCoords];
    
                for (const [remX, remY] of allCoordsToRemove) {
                    this.mapCoordsArray = this.mapCoordsArray.filter(([mapX, mapY]) => {
                        return !(mapX === remX && mapY === remY);
                    });
                }
            }
        }
    }
}

export default Computer