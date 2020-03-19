import { IPostPileState } from 'store/postPile';

export const initialPostPileState: IPostPileState = {
  availableCards: [
    {
      color: null,
      state: 0
    }
  ]
};

export const postPileReducer = (): IPostPileState => {
  return initialPostPileState;
};
