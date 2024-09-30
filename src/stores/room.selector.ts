import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RoomState } from './room.reducer';

export const selectRoomState = createFeatureSelector<RoomState>('room');

export const selectAllRooms = createSelector(
    selectRoomState,
    (state: RoomState) => state.roomData
);

export const selectFloorData = createSelector(
    selectRoomState,
    (state: RoomState) => state.floorData
);
