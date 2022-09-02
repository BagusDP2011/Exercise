import { Box, Button, Table, Text, Thead, Tbody, Th, Td, Tr, Container, Toast, useToast, Grid, GridItem, FormControl, Input, FormLabel, FormErrorMessage,  } from "@chakra-ui/react"
import { useState, useEffect  } from "react"
import { useDispatch, useSelector } from "react-redux"
import { jsonServerDataAPI } from "../api"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link } from "react-router-dom"
import ExerciseEmployeeRegist from "./ExerciseEmployeeRegist"


const ExerciseEmployee = () => {
    // const [Employee, setEmployee] = useState([])
    const EmployeeSelector = useSelector((state) => state.employee)
    const dispatch = useDispatch()

    const Toast = useToast()
    

    const renderEmployee = () =>{
        return EmployeeSelector.data.map((val) => {
            return (
                <Tr key={val.id}>
                    <Td>{val.employee_name}</Td>
                    <Td>{val.email}</Td>
                    <Td>{val.password}</Td>

                </Tr>
            )
        })
    }
    
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
    
                await jsonServerDataAPI.post("/Employee", newemployee)
                fetchEmployees()
                Toast({ title: "Employee Added", status:"success"})

            } catch (err) {
                Toast({ title: "Failed", status:"error"})
                console.log(err)
                
            }
        },
        validationSchema: Yup.object({
            employee_name: Yup.string().required("Nama Produk: Tidak boleh kosong"),
            email: Yup.number().required("Harga Produk: Tidak boleh kosong").min(1000, "Minimum 1k").max(100000, "Max 100k"),
            password: Yup.number().required("password Produk: Tidak boleh kosong").min(1)
        }),
        validateOnChange: false,

    })


    return (
        <Container maxW="container.lg">
            <Text fontWeight="bold" fontSize="4xl" marginBottom="16">
                Employee List
            </Text>

            
            <Table variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Employee Name</Th>
                        <Th>Email</Th>
                        <Th>Password</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderEmployee()}
                </Tbody>
            </Table>
            <Link to={`/ExerciseEmployeeRegist/`}><Button mx="1" colorScheme="green">Register</Button></Link>

        </Container>
    )
}

export default ExerciseEmployee