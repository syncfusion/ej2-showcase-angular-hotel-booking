// store/booking.actions.ts
import { createAction, props } from '@ngrx/store';

export const addData = createAction('[Booking] Add Data', props<{ payload: any }>());
export const deleteData = createAction('[Booking] Delete Data', props<{ payload: any }>());
export const updateData = createAction('[Booking] Update Data', props<{ payload: any }>());
