import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    name: 'client'
};

export const reducer = createReducer(initialState, (builder) =>
    builder
)
