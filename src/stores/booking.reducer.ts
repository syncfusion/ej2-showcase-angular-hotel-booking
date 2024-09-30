// store/booking.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addData, deleteData, updateData } from './booking.action';

const initialState = {
    value: {
        bookingData: [
            {
                Id: 1,
                guestName: 'John Doe',
                roomType: 'Deluxe Suite',
                checkInDate: '2024-09-01',
                checkOutDate: '2024-09-05',
                nights: 4,
            },
            {
                Id: 2,
                guestName: 'Jane Smith',
                roomType: 'Standard Room',
                checkInDate: '2024-09-10',
                checkOutDate: '2024-09-12',
                nights: 2,
            },
            // Add more sample booking objects as needed
        ], // Data generation function
        nights: 0,
        startDate: null,
        endDate: null,
    },
};

export const bookingReducer = createReducer(
    initialState,
    on(addData, (state, { payload }) => ({
        ...state,
        value: {
            ...state.value,
            bookingData: [...state.value.bookingData, payload],
        },
    })),
    on(deleteData, (state, { payload }) => ({
        ...state,
        value: {
            ...state.value,
            bookingData: state.value.bookingData.filter((item: any) => item.Id !== payload.Id),
        },
    })),
    on(updateData, (state, { payload }) => ({
        ...state,
        value: {
            ...state.value,
            bookingData: state.value.bookingData.map((item: any) =>
                item.Id === payload.Id ? payload : item,
            ),
        },
    })),
);
