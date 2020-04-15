export const INITIALIZE_GAME = '[GAME] INITIALIZE_GAME';

interface InitializeGameAction {
    type: typeof INITIALIZE_GAME;
    payload: string;
}

export const initializeGame = (id: string): InitializeGameAction => ({
    type: INITIALIZE_GAME,
    payload: id
});

export type GameActionTypes = InitializeGameAction;
