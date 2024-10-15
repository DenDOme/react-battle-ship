class Ship {
    constructor(length){
        this.length = length;
        this.health = length;
        this.isSunked = false;
        this.coords = [];
    }

    hitShip(){
        this.health--;
        this.checkSunked();
        return true;
    }

    checkSunked(){
        if(this.health <= 0){
            this.isSunked = true;
        }
    }

    addCoords(coords){
        this.coords.push(coords);
    }

    info(){
        return{
            'length': this.length, 
            'health': this.health, 
            'isSunked': this.isSunked,
            'coords': this.coords,
        }
    }
}

export default Ship