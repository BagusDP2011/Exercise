import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
        state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    input: (state, action) => {
      state.value = action.payload
    }
  },
});

// Actions adalah function ayang akan return sebuah "Action Object"
// "Action Object"
// - type
// - payload

// Reducer adalah kumpulan conditions yang akan mengubah isi global sstate
// Setiap condition dari reducer akan ngecek type dari Action Object
// Yang artinya perubahan isi global state akan di tentukan
// berdasarkan type action object yang di kirim ke reducer
// untuk mengganti isi store

// Contoh: Ada function namanya increment dalam sebuah slice bernama "Counter"
// Maka type akan menjadi "counter/increment"

export const { increment, decrement, reset, input } = counterSlice.actions

export default counterSlice.reducer