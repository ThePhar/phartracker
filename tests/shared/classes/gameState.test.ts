import GameState from '../../../shared/classes/gameState';
import DefaultGameState from '../../../shared/constants/defaultGameState';

test('should have default values on instantiation', () => {
  const gameState = new GameState();
  expect(gameState).toEqual(expect.objectContaining(DefaultGameState));
});
