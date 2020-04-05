import GameState from '../../shared/classes/gameState';
import * as Actions from '../constants/saveRAMActions';

export type Action = {
  type: string,
  payload?: any,
}

export default function saveRAMReducer(state = new GameState(), action: Action) {
  if (action.type === Actions.UpdateState) {
    return action.payload;
  }

  return state;
}
