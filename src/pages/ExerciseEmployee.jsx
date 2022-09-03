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
  Stack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { jsonServerDataAPI } from "../api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ExerciseEmployeeRegist from "./ExerciseEmployeeRegist";
import {
  takeEmployee,
  loginEmployee,
} from "../features/employee/employeeSlice";
import fetchEmployees from "../App";
import { useDispatch, getState } from "react-redux";
import { fillEmployeeList } from "../features/employee/employeeSlice";
import { wrapHandler } from "framer-motion";

const ExerciseEmployee = () => {
  var employeeSelector = useSelector((state) => state.employee);
  const Toast = useToast();
  const params = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const setshow = () => setShow(!show);

  const fetchEmployees = async () => {
    try {
      const response = await jsonServerDataAPI.get("/employees");
      dispatch(fillEmployeeList(response.data));
      // console.log(response.data);
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

  const loginBtnHandler = (val) => {
    dispatch(takeEmployee(val));
    fetchEmployees();
    // console.log(employeeSelector.takeEmployee)
    Toast({ title: "Login successfully", status: "info" });
  };

  const formChangeHandler = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const newLoginBtn = () => {
    dispatch(loginEmployee());
    formik.setFieldValue("email", "");
    formik.setFieldValue("password", "");
    console.log(employeeSelector.loginEmployee);
    // val.email === employeeSelector.takeEmployee.email ?
    //  dispatch(takeEmployee()) :
    //   Toast({ title: "Failed", status: "error" })
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
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      let loginStatus = false;
      employeeSelector.data.map((val) => {
        if (values.email === val.email && values.password === val.password) {
          console.log(val);
          loginStatus = true;
          dispatch(takeEmployee(val));
          Toast({ title: "Login Successfully", status: "success" });
          fetchEmployees();
        } else if (
          values.email === val.email &&
          values.password !== val.password
        ) {
          return Toast({
            title: "Login Failed: Wrong password",
            status: "error",
          });
        } else if (
          values.password === val.password &&
          values.email !== val.email
        ) {
          return Toast({
            title: "User with email does not exist",
            status: "error",
          });
        }
      });

    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email: Tidak boleh kosong"),
      password: Yup.string().required("password: Tidak boleh kosong"),
      // .matches(
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      //     )
    }),
    validateOnChange: false,
  });

  return (
    <Container maxW="container.lg">
      {/* 
        1. Fitur login. Email dan password harus sesuai. Gunakan global
           state untuk perbandingan data, tanpa network call tambahan.
        2. Kalau login berhasil, tampilkan data di navbar. Tampilkan toast
           (success)
        3. Kalau login gagal, tampilkan message dengan case ini:
          a. email tidak ditemukan, input email menjadi merah dengan message
             "User with email does not exist". Lalu tampilkan toast (error)
          b. password salah, input password menjadi merah dengan message
             "Wrong password". Lalu tampilkan toast (error).
        4. Buat button di navbar untuk LOGOUT
      */}
      <Box p="8" mb="8" borderRadius="6px" border="solid 1px lightgrey">
        <Text fontWeight="bold" fontSize="4xl" mb="8">
          Login Employee
        </Text>
        <Stack>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              autoComplete="off"
              value={formik.values.email}
              onChange={formChangeHandler}
              isInvalid={
                formik.values.email.match(employeeSelector.takeEmployee.email)
                  ? false
                  : true
              }
              name="email"
              type="email"
            />
            <FormErrorMessage>User with email does not exist</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                value={formik.values.password}
                onChange={formChangeHandler}
                name="password"
                isInvalid={
                  formik.values.password.match(
                  employeeSelector.takeEmployee.password)
                    ? false
                    : true
                }
                type={show ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setshow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>Wrong password</FormErrorMessage>
            <Button colorScheme="green" onClick={formik.handleSubmit}>
              Login
            </Button>
          </FormControl>
        </Stack>
      </Box>

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
