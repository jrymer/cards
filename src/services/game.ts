import { database } from 'firebase';
import { GameStatus } from 'models/games';
import { PlayerNumber } from 'models/playerNumbers';
import db from 'services/firebase';
import { HandState, Player, PlayerState } from 'store/players';
import playerCardRandomizer from 'utils/playerCardRandomizer';
import { updateRoundScore } from './player';

const getBaseRef = (gameId: string): string => `games/${gameId}`;
const getGameRef = (gameId: string): string => `${getBaseRef(gameId)}/game`;
const getDutchPilesRef = (gameId: string): string => `${getBaseRef(gameId)}/dutchPiles`;

const createGame = async (): Promise<database.Reference> => {
    const gamesRef = db.realtime.ref(`games`);
    const gameId = gamesRef.push().key;
    const game = db.realtime.ref(getBaseRef(gameId));
    const playerImages = playerCardRandomizer();

    await game.update({
        game: {
            gameMetadata: {
                createdAt: Date.now(),
                gameId
            },
            gameStatus: GameStatus.PRE_GAME_LOBBY,
            round: 0,
            playerImages
        }
    });

    gamesRef.onDisconnect().remove();

    return game;
}

const createMockGame = async (players: { [PlayerNumber.PLAYER_ONE]: PlayerState, [PlayerNumber.PLAYER_TWO]: PlayerState }): Promise<database.Reference> => {
    const gamesRef = db.realtime.ref(`games`);
    const gameId = gamesRef.push().key;
    const game = db.realtime.ref(getBaseRef(gameId));
    const playerImages = playerCardRandomizer();

    await game.update({
        game: {
            gameMetadata: {
                createdAt: Date.now(),
                gameId
            },
            currentPlayer: PlayerNumber.PLAYER_ONE,
            gameStatus: GameStatus.ACTIVE,
            round: 1,
            playerImages
        },
        players
    });

    gamesRef.onDisconnect().remove();

    return game;
}

const connectToGame = async (gameId: string): Promise<database.Reference> => {
    const baseGame = db.realtime.ref(getBaseRef(gameId));
    baseGame.onDisconnect().remove();
    return baseGame;
}

const startGame = async (gameId: string): Promise<void> => {
    await db.realtime.ref(getGameRef(gameId)).update({
        gameStatus: GameStatus.ACTIVE,
        round: 1
    });
};

const startNewRound = async (gameId: string, round: number): Promise<void> => {
    const gameRef = db.realtime.ref(getGameRef(gameId));
    await gameRef.update({
        gameStatus: GameStatus.ACTIVE,
        round: round + 1
    });
}

const endGame = async (gameId: string): Promise<void> => {
    const gameRef = db.realtime.ref(getBaseRef(gameId));

    await gameRef.update({
        gameStatus: GameStatus.FINISHED
    });
}

const endRound = async (gameId: string): Promise<void> => {
    await db.realtime.ref(getGameRef(gameId)).update({
        gameStatus: GameStatus.NEW_ROUND_LOBBY
    });
}

const resetDutchPiles = async (gameId: string): Promise<void> => {
    const dutchPileRef = db.realtime.ref(getDutchPilesRef(gameId));
    await dutchPileRef.set(
        null
    );
};

const addCardToDutchPile = async (gameId: string, playerId: PlayerNumber, roundScore: number, pointsFromDutchPile: number, dutchPileId: string, hand: HandState): Promise<void> => {
    const dutchPileRef = db.realtime.ref(`${getDutchPilesRef(gameId)}/${dutchPileId}`);
    await dutchPileRef.push({
        ...hand.activeCard.card,
        playerId
    });
    await updateRoundScore(gameId, playerId, roundScore, pointsFromDutchPile, hand);
};

const createDutchPile = async (gameId: string, playerId: PlayerNumber, roundScore: number, pointsFromDutchPile: number, hand: HandState): Promise<void> => {
    const dutchPilesRef = db.realtime.ref(getDutchPilesRef(gameId));
    const dutchPileId = dutchPilesRef.push().key;
    const newDutchPileRef = db.realtime.ref(`${getDutchPilesRef(gameId)}/${dutchPileId}`);
    await newDutchPileRef.push({
        ...hand.activeCard.card,
        playerId
    });
    await updateRoundScore(gameId, playerId, roundScore, pointsFromDutchPile, hand);
}

export default {
    addCardToDutchPile,
    createDutchPile,
    connectToGame,
    createGame,
    createMockGame,
    endGame,
    endRound,
    resetDutchPiles,
    startGame,
    startNewRound
};
