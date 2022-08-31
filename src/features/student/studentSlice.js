import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
        nama: "Seto",
        gender: "Male",
        course: "UI/UX",
    },
    {
        nama: "Suparman",
        gender: "Male",
        course: "Full Stack",
    },
  ],
};

export const studentSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {
    inputData: (state, action) => {
        let newStudent = {
            nama: action.payload.nama,
            gender: action.payload.gender,
            course: action.payload.course,
        }
      state.data.push(newStudent)
    },
    addStudent: (state, action) => {
        let newStudent = {
            nama: action.payload.nama,
            gender: action.payload.gender,
            course: action.payload.course,
        }
      state.data.push(newStudent)
    },
    
  },
});


export const { inputData, addStudent } = studentSlice.actions

export default studentSlice.reducer