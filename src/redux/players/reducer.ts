import { Card } from 'models/card';
import * as playerActions from 'store/players/actions';
import { PlayerState } from '.';

export const initialPlayerState: PlayerState = {
    name: null,
    playerNumber: null,
    roundScore: 0,
    totalScore: 0,
    startTime: null,
    hand: {
        activeCard: null,
        blitzPile: null,
        postPile: null,
        woodPile: null
    }
};

export const playerReducer = (state = initialPlayerState, action: playerActions.PlayerActionTypes): PlayerState => {
    switch (action.type) {
        case playerActions.SET_SCORE:
            return {
                ...state,
                roundScore: action.payload.score
            }
        case playerActions.INITIALIZE_HAND:
            return {
                ...state,
                hand: {
                    ...state.hand,
                    ...action.payload.hand
                }
            }
        case playerActions.NEW_BLITZ_TOP_CARD:
            return {
                ...state,
                hand: {
                    ...state.hand,
                    blitzPile: state.hand.blitzPile.slice(1)
                }
            }

        case playerActions.ADD_TOP_BLITZ_TO_POST_PILE: {
            const { activeCard, postPile, blitzPile } = state.hand;
            const newPostPile = postPile.filter((postCard: Card) => {
                return (postCard.cardValue !== activeCard.card.cardValue) || (postCard.color !== activeCard.card.color)
            });

            return {
                ...state,
                hand: {
                    ...state.hand,
                    postPile: [...newPostPile, ...blitzPile.slice(0, 1)]
                }
            }
        }
        case playerActions.SET_ACTIVE_BLITZ_CARD:
        case playerActions.SET_ACTIVE_POST_CARD:
        case playerActions.SET_ACTIVE_WOOD_CARD:
            return {
                ...state,
                hand: {
                    ...state.hand,
                    activeCard: { ...action.payload }
                }
            };
        case playerActions.REDRAW_WOOD_PILE: {
            const topThree = state.hand.woodPile.slice(0, 3);
            const rest = state.hand.woodPile.slice(3);
            const topThreeToBack = rest.concat(topThree);

            return {
                ...state,
                hand: {
                    ...state.hand,
                    woodPile: topThreeToBack
                }
            }
        }
        case playerActions.SHUFFLE_WOOD_PILE:
            return {
                ...state,
                hand: {
                    ...state.hand,
                    woodPile: [...state.hand.woodPile.slice(1).concat(state.hand.woodPile.slice(0, 1))]
                }
            };
        case playerActions.REMOVE_TOP_CARD_FROM_WOOD_PILE: {
            const {card} = action.payload;
            
            return {
                ...state,
                hand: {
                    ...state.hand,
                    woodPile: state.hand.woodPile.filter((woodCard: Card) =>
                        (woodCard.color !== card.color) || (woodCard.cardValue !== card.cardValue))
                }
            }
        }
        case playerActions.UPDATE_PLAYERS:
            return {
                ...state,
                ...action.payload
            }
        case playerActions.CLEAR_ACTIVE_CARD:
            return {
                ...state,
                hand: {
                    ...state.hand,
                    activeCard: null
                }
            };
        default:
            return state;
    }
}
