// store/date.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { updateCurrentDate } from './data.action';

const currentDate = new Date();
const initialState = {
    value: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        day: currentDate.getDate(),
    },
};

export const dateReducer = createReducer(
    initialState,
    on(updateCurrentDate, (state, { payload }) => ({
        ...state,
        value: {
            year: payload.year,
            month: payload.month,
            day: payload.day,
        },
    })),
);
