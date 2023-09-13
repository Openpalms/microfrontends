import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    name: 'transport'
};

export const reducer = createReducer(initialState, (builder) =>
    builder
)
