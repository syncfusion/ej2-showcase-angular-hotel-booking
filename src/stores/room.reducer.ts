import { createReducer, on, Action } from '@ngrx/store';
import { addRoomData, removeRoomData } from './room.action';

export interface RoomState {
    floorData: any[];
    roomData: any[];
    priceRange: number[];
    roomPrice: number;
    checkboxes: any[];
    floors: any[];
    features: any[];
    isMobile: any;
    borderColor: Record<string, string>;
}

export const initialState: RoomState = {
    floorData: [],
    roomData: [],
    priceRange: [0, 0],
    roomPrice: 0,
    checkboxes: [],
    floors: [],
    features: [],
    isMobile: null,
    borderColor: {}
};

const roomReducerInternal = createReducer(
    initialState,
    on(addRoomData, (state, { payload }) => ({
        ...state,
        floorData: [...state.floorData, payload]
    })),
    on(removeRoomData, (state, { payload }) => ({
        ...state,
        floorData: state.floorData.filter((floor) => floor.id !== payload)
    })),
    // Define other actions
);

export function roomReducer(state: RoomState | undefined, action: Action) {
    return roomReducerInternal(state, action);
}
