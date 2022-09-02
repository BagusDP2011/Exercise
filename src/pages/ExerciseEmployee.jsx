import {
  Box,
  Button,
  Table,
  Text,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  Container,
  Toast,
  useToast,
  Grid,
  GridItem,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { jsonServerDataAPI } from "../api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ExerciseEmployeeRegist from "./ExerciseEmployeeRegist";
import { takeEmployee } from "../features/employee/employeeSlice";
import fetchEmployees from "../App";
import { useDispatch } from "react-redux";
import { fillEmployeeList } from "../features/employee/employeeSlice";

const ExerciseEmployee = () => {
  const employeeSelector = useSelector((state) => state.employee);
  const Toast = useToast();
  const params = useParams();
  const dispatch = useDispatch();

  const fetchEmployees = async () => {
    try {
      const response = await jsonServerDataAPI.get("/employees");
      dispatch(fillEmployeeList(response.data));
      console.log(response.data);
    } catch (err) {
      console.log(err);
      Toast({
        title: "Network error",
        status: "error",
      });
    }
  };

  const deleteBtnHandler = async (id) => {
    try {
      await jsonServerDataAPI.delete(`/employees/${id}`);
      fetchEmployees();
      Toast({ title: "Product Deleted", status: "info" });
    } catch (err) {
      console.log(err);
    }
  };

  const loginBtnHandler = async (data) => {
    try {
      dispatch(takeEmployee(data));
      fetchEmployees();
      Toast({ title: "Login successfully", status: "info" });
    } catch (err) {
      console.log(err);
      alert("err");
    }
  };

  const renderEmployee = () => {
    return employeeSelector.data.map((val) => {
      return (
        <Tr key={val.id}>
          <Td>{val.employee_name}</Td>
          <Td>{val.email}</Td>
          <Td>{val.password}</Td>
          <Td>
            <Link to={`/ExerciseEmployeeEdit/${val.id}`}>
              <Button mx="1" colorScheme="green">
                Edit
              </Button>
            </Link>
            <Button
              mx="1"
              colorScheme="red"
              onClick={() => deleteBtnHandler(val.id)}
            >
              Delete
            </Button>
          </Td>
          <Td>
            <Button
              mx="1"
              isDisabled={val.id === employeeSelector.takeEmployee.id}
              colorScheme="blue"
              onClick={() => loginBtnHandler(val)}
            >
              Login
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  const formik = useFormik({
    initialValues: {
      employee_name: "",
      email: 0,
      password: 0,
    },
    onSubmit: async (values) => {
      try {
        const { employee_name, email, password } = values;
        let newemployee = {
          employee_name,
          email,
          password,
        };

        await jsonServerDataAPI.post("/Employees", newemployee);
        fetchEmployees();
        Toast({ title: "Employee Added", status: "success" });
      } catch (err) {
        Toast({ title: "Failed", status: "error" });
        console.log(err);
      }
    },
    validationSchema: Yup.object({
      employee_name: Yup.string().required("Nama Produk: Tidak boleh kosong"),
      email: Yup.number()
        .required("Harga Produk: Tidak boleh kosong")
        .min(1000, "Minimum 1k")
        .max(100000, "Max 100k"),
      password: Yup.number()
        .required("password Produk: Tidak boleh kosong")
        .min(1),
    }),
    validateOnChange: false,
  });

  return (
    <Container maxW="container.lg">
      <Text fontWeight="bold" fontSize="4xl" marginBottom="16">
        Employee List
      </Text>

      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Employee Name</Th>
            <Th>Email</Th>
            <Th>Password</Th>
            <Th>Action</Th>
            <Th>Working</Th>
          </Tr>
        </Thead>
        <Tbody>{renderEmployee()}</Tbody>
      </Table>
      <Link to={`/ExerciseEmployeeRegist/`}>
        <Button mx="1" colorScheme="green">
          Register
        </Button>
      </Link>
    </Container>
  );
};

export default ExerciseEmployee;
