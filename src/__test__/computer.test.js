import Computer from "../scripts/computer";
import Ship from "../scripts/Ship";
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
        expect(computer.board.ships.length).toBe(1); 
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

    test('should allow placing ships at the edges of the board', () => {
        const result = computer.board.placeShip(2, 8, 0, false); // Place a ship at the right edge
        expect(result).toBe(true); // Expect placement to succeed
        expect(computer.board.map[8]).toBeInstanceOf(Ship); // Check that the ship is placed on the board
        expect(computer.board.map[9]).toBeInstanceOf(Ship); // Check the next cell
    });
})