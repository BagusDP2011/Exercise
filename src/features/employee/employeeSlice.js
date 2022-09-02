import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
        employee_name: "",
        email: "",
        password: "",
    }
  ],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    fillEmployeeList: (state, action) => {
      state.data = action.payload
    
    }
  },
});


export const { fillEmployeeList } = employeeSlice.actions

export default employeeSlice.reducer