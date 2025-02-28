import Ship from "./ship.js";

const EMPTY = 0;
const BLAST_SHOT = 1;
const MISSED_SHOT = 2;
const HIT = 3;

class gameBoard {
    constructor(){
        this.mapx = 10;
        this.mapy = 10;
        this.map = Array(100).fill(0);
        this.missedShots = 0;
        this.ships = [];
        this.allSunked = false;
    }

    placeShip(length,x,y,vertical){
        if(!this.validateShipPlacement(length,x,y,vertical)){
            return false
        }

        const newShip = new Ship(length);
        this.ships.push(newShip);
        if(!vertical){
            for(let i = 0 ; i < length ; i++){
                this.map[x + i + (y * this.mapy)] = newShip;
                newShip.addCoords([x + i, y]);
            }
        }else{
            for(let i = 0 ; i < length ; i++){
                this.map[x + ((y + i) * this.mapy)] = newShip
                newShip.addCoords([x, y + i]);
            }
        }
        return true
    }

    deleteShip(x,y){
        const ship = this.map[x + y * this.mapy];
        
        if(!ship){
            return false
        }

        const findedShip = this.ships.findIndex((element) => {
            return element === ship;
        })
        this.ships.splice(findedShip, 1);

        for(let i = 0 ; i < ship.coords.length ; i++){
            const [shipX,shipY] = ship.coords[i];
            this.map[shipX + (shipY * this.mapx)] = 0;
        }

        return true;
    }

    hitShip(x,y){
        if(this.map[x+(y*this.mapy)] == EMPTY){
            this.missedShots++;
            this.map[x+(y*this.mapy)] = MISSED_SHOT;
            return false
        }
        else{
            const ship = this.map[x+(y*this.mapy)];
            const res = ship.hitShip();
            if(res) this.map[x+(y*this.mapy)] = HIT;
            if(ship.isSunked) this.markBlastShots(ship);
            this.checkShipSunks();
            return true;
        }
    }

    markBlastShots(ship){
        ship.coords.forEach(([x,y]) => {
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

            for (const [adjX, adjY] of surroundingCoords) {
                if (adjX >= 0 && adjX < this.mapx && adjY >= 0 && adjY < this.mapy) {
                    if (this.map[adjX + adjY * this.mapy] !== HIT) {
                        this.map[adjX + adjY * this.mapy] = BLAST_SHOT; 
                    }
                }
            }
        })
    }

    checkShipSunks(){
        this.allSunked = this.ships.every(ship => ship.isSunked);
    }

    validateShipPlacement(length,x,y,vertical){
        if (length < 1 || length > 4) {
            return false;
        }

        const shipCount = this.ships.filter(boat => boat.length === length).length;

        if (shipCount >= this.getMaxBoats(length)) {
            return false;
        }

        if (x < 0 || x >= this.mapx || y < 0 || y >= this.mapy) {
            return false;
        }
    
        const cellsToCheck = [];
        if (vertical) {
            for (let i = 0; i < length; i++) {
                cellsToCheck.push([x, y + i]);
            }
        } else {
            for (let i = 0; i < length; i++) {
                cellsToCheck.push([x + i, y]);            
            }
        }

        for (const [shipX, shipY] of cellsToCheck) {
            const adjacentCells = [
                [shipX, shipY - 1], // Up
                [shipX, shipY + 1], // Down
                [shipX - 1, shipY], // Left
                [shipX + 1, shipY], // Right
                [shipX - 1, shipY - 1], // Up - left
                [shipX + 1, shipY - 1], // Up - right
                [shipX - 1, shipY + 1], // Down - left
                [shipX + 1, shipY + 1], // Down - right
            ];

            if (this.map[shipX + shipY * this.mapy] !== EMPTY) {
                return false; 
            }

            for (const [adjX, adjY] of adjacentCells) {
                if (adjX >= 0 && adjX < this.mapx && adjY >= 0 && adjY < this.mapy) {
                    if (this.map[adjX + adjY * this.mapy] !== EMPTY) {
                        return false; 
                    }
                }
            }
        }

        if (!vertical) {
            for (let i = 0; i < length; i++) {
                if (x + i >= this.mapx || this.map[x + i + (y * this.mapy)] !== EMPTY) {
                    return false;
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
                if (y + i >= this.mapy || this.map[x + ((y + i) * this.mapy)] !== EMPTY) {
                    return false;
                }
            }
        }

        return true;
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

    info(){
        return {
            'mapx': this.mapx,
            'mapy': this.mapy,
            'map': this.map,
            'missedShots': this.missedShots,
            'ships': this.ships,
            'allSunked': this.allSunked
        }
    }
}

export default gameBoard