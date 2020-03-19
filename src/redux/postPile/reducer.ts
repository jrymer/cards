import { IPostPileState } from './postPile';

export const initialPostPileState: IPostPileState  = {
  void: ''
};

export const postPileReducer = (): IPostPileState => {
  return {void: ''};
};
