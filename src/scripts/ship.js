class Ship {
    constructor(length){
        this.length = length;
        this.health = length;
        this.isSunked = false;
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

    info(){
        return{
            'length': this.length, 
            'health': this.health, 
            'isSunked': this.isSunked,
        }
    }
}

export default Ship