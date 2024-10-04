import gameBoard from "../scripts/gameBoard";
import Ship from "../scripts/Ship";
import { beforeEach, describe, expect, test } from "vitest";

describe('check gameBoard', () => {
    let board

    beforeEach(() => {
        board = new gameBoard();
    })

    test('create gameBoard', () => {
        const newBoard = new gameBoard();
        expect(newBoard.info()).toEqual({
            'mapx': 10,
            'mapy': 10,
            'missedShots': 0,
            'map': Array(100).fill(0),
            'ships': [],
            'allSunked': false
        })
    })

    test('should place a ship of length 1 at (5, 5)', () => {
        const result = board.placeShip(1, 5, 5, false);
        expect(result).toBe(true);
        expect(board.map[5 + 5 * board.mapy]).toBeInstanceOf(Ship);
    });

    test('should place a ship of length 2 at (4, 5) horizontally', () => {
        const result = board.placeShip(2, 4, 5, false);
        expect(result).toBe(true);
        expect(board.map[4 + 5 * board.mapy]).toBeInstanceOf(Ship);
        expect(board.map[5 + 5 * board.mapy]).toBeInstanceOf(Ship);
    });

    test('should not place a ship of length 1 at (4, 5) due to adjacency', () => {
        board.placeShip(2, 4, 5, false); 
        const result = board.placeShip(1, 4, 6, false);
        expect(result).toBe(false);
    });

    test('should not place a ship because ship with lenght 3 and coords (6,3) at (6,5) is next to other ship vertical', () => {
        board.placeShip(2,5,5,true);
        const result = board.placeShip(3,6,3,true);
        expect(result).toBe(false);
    })

    test('should not place a ship because ship with lenght 1 and coords (2,1) at (2,1) is diagonally next to other ship', () => {
        const resultOne = board.placeShip(2,0,0,false);
        expect(resultOne).toBe(true);
        const resultTwo = board.placeShip(1,2,1,false);
        expect(resultTwo).toBe(false);
    })

    test('should place a ship of length 3 at (5, 5) vertically', () => {
        const result = board.placeShip(3, 5, 5, true);
        expect(result).toBe(true);
        expect(board.map[5 + 5 * board.mapy]).toBeInstanceOf(Ship);
        expect(board.map[5 + 6 * board.mapy]).toBeInstanceOf(Ship);
        expect(board.map[5 + 7 * board.mapy]).toBeInstanceOf(Ship);
    });

    test('should not place a ship of length 4 at (5, 5) vertically due to adjacency', () => {
        board.placeShip(3, 5, 5, true); 
        const result = board.placeShip(4, 4, 5, false); 
        expect(result).toBe(false);
    });

    test('should not place a ship out of bounds', () => {
        const result = board.placeShip(1, 10, 10, false); 
        expect(result).toBe(false);
    });

    test('should not place a ship with invalid length', () => {
        const result = board.placeShip(5, 5, 5, false); 
        expect(result).toBe(false);
    });

    test('should not place ship because its more than u can place (length 4 = 1x)', () => {
        const result = board.placeShip(4,0,0,false);
        expect(result).toBe(true);
        const resultTwo = board.placeShip(4,0,5,false);
        expect(resultTwo).toBe(false);
    })

    test('fails to place ship when space is occupied', () => {
        const length = 3;
        const x = 1;
        const y = 1;
        const vertical = false;

        board.placeShip(length, x, y, vertical); 
        const result = board.placeShip(length, x, y, vertical); 

        expect(result).toBe(false); 
    });

    test('place ship and then hit it', () => {
        const length = 3;
        const x = 1;
        const y = 2;
        const vertical = true;

        const result = board.placeShip(length,x,y,vertical);
        expect(result).toBe(true);

        const ship = board.ships[0];
        expect(ship.length).toBe(length);
        expect(ship.health).toBe(length);

        board.hitShip(x,y);
        expect(ship.health).toBe(2);
        expect(ship.isSunked).toBe(false);
    })

    test('hit ship and miss it', () => {
        const length = 3;
        const x = 1;
        const y = 2;
        const vertical = true;

        const result = board.placeShip(length,x,y,vertical);
        expect(result).toBe(true);

        const ship = board.ships[0];
        expect(ship.length).toBe(length);
        expect(ship.health).toBe(length);

        board.hitShip(9,9);
        expect(ship.health).toBe(3);
        expect(board.missedShots).toBe(1);
        expect(board.map[9 + ((9 + 0) * 10)]).toBe(2);
    })

    test('place ship and sunk it, sunk all ships', () => {
        const length = 3;
        const x = 1;
        const y = 2;
        const vertical = true;

        const result = board.placeShip(length,x,y,vertical);
        expect(result).toBe(true);

        const ship = board.ships[0];
        expect(ship.length).toBe(length);
        expect(ship.health).toBe(length);

        board.hitShip(x,y);
        board.hitShip(x,3);
        board.hitShip(x,4);

        expect(ship.health).toBe(0);
        expect(ship.isSunked).toBe(true);
        expect(board.allSunked).toBe(true);
    })
})