import {
  Box,
  Text,
  Container,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jsonServerDataAPI } from "../api";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  editEmployee,
  fillEmployeeList,
} from "../features/employee/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

const ExerciseEmployeeEdit = () => {
  // const [product, setProduct] = useState ({})
  const employeeSelector = useSelector((state) => state.employee);

  const dispatch = useDispatch();
//   const formik = useFormik();
  const params = useParams();
  const Toast = useToast();
  
  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const formik = useFormik({
    initialValues: {
        employee_name: "",
        email: 0,
        password: 0,
    }})

  const fetchProduct = async () => {
    try {
      const response = await jsonServerDataAPI.get(`/employees/${params.id}`);
      dispatch(editEmployee(response.data));
      formik.setFieldValue("employee_name", response.data.employee_name);
      formik.setFieldValue("email", response.data.email);
      formik.setFieldValue("password", response.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Text>Product Edit</Text>
      <Text>{employeeSelector.editEmployee.employee_name}</Text>
      {/* <Text>{response.data.email}</Text>
        <Text>{response.data.password}</Text> */}
      {/* <Container maxW="container.lg">
            <Text fontWeight="bold" fontSize="4xl" marginBottom="16">
                Product List
            </Text>

            <Grid templateColumns="repeat(3, 1fr)" columnGap={"4"}>
                <GridItem>
                    <FormControl>
                        <FormLabel>Product Name</FormLabel>
                        <Input type="text" name="product_name" 
                        onChange={(formChangeHandler)}
                         defaultValue={product.product_name}></Input>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl>
                        <FormLabel>Product Price</FormLabel>
                        <Input type="number" name="price" 
                        onChange={(formChangeHandler)}
                         defaultValue={product.price}></Input>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl>
                        <FormLabel>Product Stock</FormLabel>
                        <Input type="number" name="stock" 
                        onChange={(formChangeHandler)}
                         defaultValue={product.stock}></Input>
                    </FormControl>
                </GridItem>
            </Grid>
            <Link to={`/productlist/`}><Button mx="1" colorScheme="green" onClick={formik.handleSubmit}>Edit Product</Button></Link>
`            <Link to={`/productlist/`}><Button mx="1" colorScheme="green">Back</Button></Link> */}
      `{/* </Container> */}
    </Box>
  );
};

export default ExerciseEmployeeEdit;
