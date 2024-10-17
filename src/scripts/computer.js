import gameBoard from "./gameBoard";
class Computer{
    constructor(){
        this.board = new gameBoard();
        this.missedArray = [];
        this.placeShip();
        this.mapCoordsArray = this.generateCoords(this.board.mapx,this.board.mapy);
        this.foundCoords = [];
        this.vertical = null; 
        this.direction = null; 
    }

    hitShip(x,y){
        return this.board.hitShip(x,y);
    }

    placeShip(){
        const ships = this.board.ships || [];
        let length = 1;

        const verticalCoords = this.generateCoords(this.board.mapx,this.board.mapy);
        
        const horizontalCoords = this.generateCoords(this.board.mapx,this.board.mapy);

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
        if(this.foundCoords.length > 0){
            if(this.foundCoords.length === 1){
                const [x,y] = this.foundCoords[0];

                const surroundingCoords = [
                    [x, y - 1],
                    [x - 1, y],
                    [x + 1, y],       
                    [x, y + 1],
                ];

                let hitSuccess = false;

                while(surroundingCoords.length > 0 && !hitSuccess){
                    const randomCoords = this.getRandomCoords(surroundingCoords.length);
                    const [adjX, adjY] = surroundingCoords[randomCoords];
                    const mapSome = this.mapCoordsArray.some(([mapX,mapY]) => mapX === adjX && mapY === adjY)
                    const foundSome = this.foundCoords.some(([mapX, mapY]) => mapX === adjX && mapY === adjY)

                    if(!mapSome){
                        surroundingCoords.splice(randomCoords, 1);
                        continue;
                    }
    
                    if(mapSome && !foundSome && (adjX >= 0 && adjX < this.board.mapx && adjY >= 0 && adjY < this.board.mapy)){
                        const ship = Opponent.board.map[adjX + (adjY * Opponent.board.mapx)];
                        const result = Opponent.hitShip(adjX, adjY);

                        const coordIndex = this.mapCoordsArray.findIndex(([mapX,mapY]) => mapX === adjX && mapY === adjY);
                        this.mapCoordsArray.splice(coordIndex, 1);

                        if(result){
                            this.foundCoords.push([adjX,adjY]);
                            this.checkShipSunk(ship,x,y);
                            this.sortFoundCoords();

                            hitSuccess = true;  
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }

            }
            if(this.foundCoords.length >= 2){
                if(this.direction == null && this.vertical == null){
                    const [lastX, lastY] = this.foundCoords[this.foundCoords.length - 1];
                    const [secondLastX, secondLastY] = this.foundCoords[this.foundCoords.length - 2];
                    
                    if(lastX === secondLastX){
                        this.vertical = true;
                        if(secondLastY < lastY){
                            this.direction = true;
                        }
                        else{
                            this.direction = false;
                        }
                    } else if(lastY === secondLastY){
                        this.vertical = false;
                        if(secondLastX < lastX){
                            this.direction = true;
                        }
                        else{
                            this.direction = false;
                        }
                    }
                }

                let nextCoord;
                
                if(this.vertical){
                    nextCoord = this.direction ? [this.foundCoords[this.foundCoords.length - 1][0], this.foundCoords[this.foundCoords.length - 1][1] + 1] : [this.foundCoords[0][0], this.foundCoords[0][1] - 1];
                }
                else {
                    nextCoord = this.direction ? [this.foundCoords[this.foundCoords.length - 1][0] + 1, this.foundCoords[this.foundCoords.length - 1][1]] : [this.foundCoords[0][0] - 1, this.foundCoords[0][1]];
                }

                const [nextX, nextY] = nextCoord;
                const mapSome = this.mapCoordsArray.some(([mapX, mapY]) => mapX === nextX && mapY === nextY);
                const isWithinBounds = (nextX >= 0 && nextX < this.board.mapx && nextY >= 0 && nextY < this.board.mapy);
                const coordIndex = this.mapCoordsArray.findIndex(([mapX,mapY]) => mapX === nextX && mapY === nextY);

                if(!isWithinBounds || !mapSome){
                    this.direction = !this.direction
                }

                if (mapSome && isWithinBounds) {
                    const ship = Opponent.board.map[nextX + (nextY * Opponent.board.mapx)];
                    const result = Opponent.hitShip(nextX, nextY);
                    this.mapCoordsArray.splice(coordIndex, 1);

                    if (result) {
                        this.foundCoords.push(nextCoord);
                        this.checkShipSunk(ship, nextX, nextY);
                        this.sortFoundCoords();
                        return true; 
                    }
                    else {
                        this.direction = !this.direction;
                        return false
                    }
                }
            }
        }
        else{
            const randomCoords = this.getRandomCoords(this.mapCoordsArray.length);
            const [x, y] = this.mapCoordsArray[randomCoords];
            this.mapCoordsArray.splice(randomCoords, 1);
            const ship = Opponent.board.map[x + (y*Opponent.board.mapx)];
            const result = Opponent.hitShip(x,y);
            if(result){
                this.foundCoords.push([x,y]);
                this.checkShipSunk(ship, x, y);
                this.sortFoundCoords();
                return true;
            }
            return false
        }
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
            this.foundCoords = [];
            this.vertical = null;
            this.direction = null;
        }
    }

    sortFoundCoords() {
        this.foundCoords.sort((a, b) => {
            if (a[0] !== b[0]) {
                return a[0] - b[0];
            }
            return a[1] - b[1];
        });
    }

    generateCoords(width, height){
        const Array = []
        for(let i = 0 ; i < height ; i++){
            for(let j = 0 ; j < width ; j++){
                Array.push([j,i]);
            }
        }
        return Array;
    }
}

export default Computer