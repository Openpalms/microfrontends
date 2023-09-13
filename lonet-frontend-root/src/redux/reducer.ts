import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState = {
    name: 'root'
};

export const reducer = createReducer(initialState, (builder) =>
    builder
)
