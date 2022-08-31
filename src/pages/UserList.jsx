import { Box, Button, Table, Text, Thead, Tbody, Th, Td, Tr, Container, Toast, useToast } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axios from 'axios'
import axiosInstance from "../api"

// API / Sumber data
// https://jsonplaceholder.typicode.com/users

const UserList = () => {
    // State yg akan simpan data user API

    const [users, setUsers] = useState([])
    const Toast = useToast()
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("/users")
            // console.log(response.data)
            setUsers(response.data)

        } catch (err){
            console.log(err)
            Toast({
                title: "Network error",
                status: "error",
            })
            // alert("Server error")
        }
    }

    const renderUsers = () =>{
        return users.map((val) => {
            return (
                <Tr key={val.id}>
                    <Td>{val.id}</Td>
                    <Td>{val.username}</Td>
                    <Td>{val.email}</Td>
                </Tr>
            )
        })
    }
    useEffect(() => {
        fetchUsers()
    }, [])


    return (
        <Container maxW="1080px">
            <Text>User List</Text>
            <Button onClick={fetchUsers}>Fetch Data</Button>
            <Table>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Username</Th>
                        <Th>Email</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderUsers()}
                </Tbody>
            </Table>
        </Container>
    )
}

export default UserList