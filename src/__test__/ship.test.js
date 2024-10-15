import Ship from "../scripts/Ship";
import { describe, expect, test } from "vitest";

describe('Ship test', () => {
  test('create ship', () => {
    const newShip = new Ship(1);
    expect(newShip.info()).toEqual({
        'length' : 1,
        'health' : 1,
        'isSunked' : false,
        'coords': []
    })
  })
  
  test('hit ship', () => {
    const newShip = new Ship(4);
    newShip.hitShip();
    expect(newShip.info()).toEqual({
      'length' : 4,
      'health' : 3,
      'isSunked' : false,
      'coords': []
    })
  })

  test('sunk ship', () => {
    const newShip = new Ship(1);
    newShip.hitShip();
    expect(newShip.info()).toEqual({
      'length' : 1,
      'health' : 0,
      'isSunked' : true,
      'coords': []
    })
  })
})