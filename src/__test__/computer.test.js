import Computer from "../scripts/computer";
import Ship from "../scripts/Ship";
import Player from "../scripts/player";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe('check computer', () => {
    let computer

    beforeEach(() => {
        computer = new Computer();
    })

    test('should place ships successfully within limits', () => {
        computer.placeShip();
        
        expect(computer.board.ships.length).toBe(10);         

        expect(computer.board.ships.filter(ship => ship.length === 1).length).toBe(4);
        expect(computer.board.ships.filter(ship => ship.length === 2).length).toBe(3);
        expect(computer.board.ships.filter(ship => ship.length === 3).length).toBe(2);
        expect(computer.board.ships.filter(ship => ship.length === 4).length).toBe(1);
    });

    test('should not allow overlapping ship placements', () => {
        computer.board.placeShip(3, 0, 0, false); 
        
        const result = computer.board.placeShip(3, 0, 0, false); 
        
        expect(result).toBe(false);
        expect(computer.board.ships.length).toBe(10); 
    });

    test('should not exceed maximum ship limits', () => {
        for (let length = 1; length <= 4; length++) {
            for (let j = 0; j < computer.getMaxBoats(length); j++) {
                computer.board.placeShip(length, 0, j, false); 
            }
            const result = computer.board.placeShip(length, 0, 0, false); 
            expect(result).toBe(false); 
        }
    });
})

describe('check computer opponent hit', () => {
    let computer
    let player

    beforeEach(() => {
        computer = new Computer;
        player = new Player

        player.placeShip(3, 0, 0, false); 
        computer.placeShip(); 
    })

    test('computer should successfully hit opponent ship', () => {
        const spyRandom = vi.spyOn(computer, 'getRandomCoords').mockReturnValueOnce(0); 

        const result = computer.hitOpponentShip(player);

        expect(result).toBe(true);

        expect(player.board.map[0]).toBe(3); 

        spyRandom.mockRestore();
    });

    test('check foundCoords to be more than 0', () => {
        const spyRandom = vi.spyOn(computer, 'getRandomCoords').mockReturnValueOnce(0); 

        const result = computer.hitOpponentShip(player);

        expect(result).toBe(true);

        expect(computer.foundCoords.length).toBe(1); 

        spyRandom.mockRestore();
    });
})