// store/date.actions.ts
import { createAction, props } from '@ngrx/store';

export const updateCurrentDate = createAction(
    '[Date] Update Current Date',
    props<{ payload: { year: number; month: number; day: number } }>(),
);
