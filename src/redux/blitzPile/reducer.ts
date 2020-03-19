import { IBlitzPileState } from './blitzPile';

export const initialBlitzPileState: IBlitzPileState  = {
  void: ''
};

export const blitzPileReducer = (): IBlitzPileState => {
  return {void: ''};
};
