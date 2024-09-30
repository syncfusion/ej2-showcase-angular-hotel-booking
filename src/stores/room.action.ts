// store/room.actions.ts
import { createAction, props } from '@ngrx/store';

export const addRoomData = createAction('[Room] Add Room Data', props<{ payload: any }>());
export const addRoomAllData = createAction('[Room] Add All Room Data');
export const removeRoomData = createAction('[Room] Remove Room Data', props<{ payload: number }>());
export const removeRoomAllData = createAction('[Room] Remove All Room Data');
export const addFeaturesData = createAction('[Room] Add Features Data', props<{ payload: number[] }>());
export const priceFilter = createAction('[Room] Price Filter', props<{ payload: number[] }>());
export const searchFilter = createAction('[Room] Search Filter', props<{ payload: string }>());
export const resetRoomData = createAction('[Room] Reset Room Data');
export const updatePriceSlider = createAction('[Room] Update Price Slider', props<{ payload: number[] }>());
