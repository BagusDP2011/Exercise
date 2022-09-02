import { Box, Button, Table, Text, Thead, Tbody, Th, Td, Tr, Container, useToast, Grid, GridItem, FormControl, Input, FormLabel, FormErrorMessage, InputRightElement, InputGroup, Toast} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { jsonServerDataAPI } from "../api/"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link } from "react-router-dom"
import ExerciseEmployee from "./ExerciseEmployee"
import { fillEmployeeList } from "../features/employee/employeeSlice"
import { useDispatch } from "react-redux"

const ExerciseEmployeeRegist = () => {
    const Toast = useToast()

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const dispatch = useDispatch()

    const fetchEmployees = async () => {
        try {
            const response = await jsonServerDataAPI.get("/employees")
            dispatch(fillEmployeeList(response.data))
            console.log(response.data)
        } catch (err){
            console.log(err)
            Toast({
                title: "Network error",
                status: "error",
            })
        }
    }
    useEffect(() => {
        fetchEmployees()
    }, [])
    
    const formik = useFormik({
        initialValues: {
            employee_name: "",
            email: 0,
            password: 0,
        },
        onSubmit: async (values) => {
            try {
                const { employee_name, email, password } = values
                let newemployee = {
                    employee_name,
                    email, 
                    password
                }
    
                await jsonServerDataAPI.post("/employees", newemployee)
                fetchEmployees()
                Toast({ title: "Employee Added", status:"success"})
                formik.setFieldValue("employee_name","")
                formik.setFieldValue("email","")
                formik.setFieldValue("password","")

            } catch (err) {
                Toast({ title: "Failed", status:"error"})
                console.log(err)
                
            }
        },
        validationSchema: Yup.object({
            employee_name: Yup.string().required("Nama Produk: Tidak boleh kosong"),
            email: Yup.string().email().required("Harga Produk: Tidak boleh kosong"),
            password: Yup.string().required("password Produk: Tidak boleh kosong").matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                )
            }),
        validateOnChange: false,

    })

    const formChangeHandler = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }



    return (
        <Container maxW="container.lg">
            <Text fontWeight="bold" fontSize="4xl" marginBottom="16">
                Employee Page Register
            </Text>

            <Grid templateRows="repeat(3, 1fr)" columnGap={"4"}>
                <GridItem>
                    <FormControl isInvalid={formik.errors.employee_name}>
                        <FormLabel>Employee Name</FormLabel>
                        <Input type="text" name="employee_name" onChange={(formChangeHandler)}></Input>
                        <FormErrorMessage>{formik.errors.employee_name}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isInvalid={formik.errors.email}>
                        <FormLabel>Employee email</FormLabel>
                        <Input type="email" name="email" onChange={(formChangeHandler)}></Input>
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isInvalid={formik.errors.password}>
                        <FormLabel>Employee password</FormLabel>
                    <InputGroup size='md'>
                        <Input type={show ? 'text' : 'password'} name="password" onChange={(formChangeHandler)}></Input>
                            <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                            </InputRightElement>
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                        </InputGroup>
                    </FormControl>
                </GridItem>
            </Grid>
            <Button onClick={formik.handleSubmit} disabled={formik.isSubmitting} my="4" colorScheme="teal">Register</Button>


            <Link to={`/ExerciseEmployee/`}><Button mx="1" colorScheme="green">Back</Button></Link>

        </Container>
    )
}

export default ExerciseEmployeeRegist