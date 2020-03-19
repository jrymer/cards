import { IWoodPileState } from './woodPile';

export const initialWoodPileState: IWoodPileState  = {
  void: ''
};

export const woodPileReducer = (): IWoodPileState => {
  return {void: ''};
};
