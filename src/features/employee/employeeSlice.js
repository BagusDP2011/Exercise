import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      employee_name: "",
      email: "",
      password: "",
    },
  ],
  currentEmployee: {
    employee_name: "",
    email: "",
    password: "",
    id: 0,
  },
  editEmployee: {},

  takeEmployee: {
    employee_name: "",
    email: "",
    password: "",
    id: 0,
  },
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    fillEmployeeList: (state, action) => {
      state.data = action.payload;
    },
    editEmployee: (state, action) => {
      state.editEmployee = action.payload;
    },
    takeEmployee: (state, action) => {
      state.takeEmployee = {
        employee_name: action.payload,
        email: action.payload.email,
        password: action.payload.password,
        id: action.payload.id,
      }
    },
  },
});

export const { fillEmployeeList, editEmployee, takeEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
