import { Box, Button, Table, Text, Thead, Tbody, Th, Td, Tr, Container, Toast, useToast, Grid, GridItem, FormControl, Input, FormLabel, FormErrorMessage, } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axios from 'axios'
import { jsonServerAPI } from "../api"
import { useFormik } from "formik"


const ProductList = () => {
    const [products, setProducts] = useState([])
    const Toast = useToast()
    const fetchProducts = async () => {
        try {
            const response = await jsonServerAPI.get("/products")
            setProducts(response.data)
            console.log(response.data)
        } catch (err){
            console.log(err)
            Toast({
                title: "Network error",
                status: "error",
            })
        }
    }

    const renderProducts = () =>{
        return products.map((val) => {
            return (
                <Tr key={val.id}>
                    <Td>{val.product_name}</Td>
                    <Td>{new Intl.NumberFormat("id-ID", { style: 'currency', currency: 'IDR' }).format(val.price)}</Td>
                    <Td>{val.stock}</Td>
                </Tr>
            )
        })
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    
    const formik = useFormik({
        initialValues: {
            product_name: "",
            price: 0,
            stock: 0,
        }
    })

    const formChangeHandler = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    const addProductBtnHandler = async () => {
        try {
            const { product_name, price, stock } = formik.values
            let newProduct = {
                product_name,
                price, 
                stock
            }

            await jsonServerAPI.post("/products", newProduct)
            fetchProducts()
            Toast({ title: "Product Added", status:"success"})
        } catch (err) {
            Toast({ title: "Failed", status:"error"})
            console.log(err)
            
        }
    }


    return (
        <Container maxW="container.lg">
            <Text fontWeight="bold" fontSize="4xl" marginBottom="16">
                Product List
            </Text>

            <Grid templateColumns="repeat(3, 1fr)" columnGap={"4"}>
                <GridItem>
                    <FormControl isInvalid isRequired>
                        <FormLabel>Product Name</FormLabel>
                        {/* <Input type="text" onChange={(event) => formik.setFieldValue("product_name", event.target.value)}></Input> */}
                        <Input type="text" name="product_name" onChange={(formChangeHandler)}></Input>
                        <FormErrorMessage>Text is invalid</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl>
                        <FormLabel>Product Price</FormLabel>
                        <Input type="number" name="price" onChange={(formChangeHandler)}></Input>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl>
                        <FormLabel>Product Stock</FormLabel>
                        <Input type="number" name="stock" onChange={(formChangeHandler)}></Input>
                    </FormControl>
                </GridItem>
            </Grid>
            <Button onClick={addProductBtnHandler}>Tambah</Button>

            <Table>
                <Thead>
                    <Tr>
                        <Th>Product Name</Th>
                        <Th>Price</Th>
                        <Th>Stock</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderProducts()}
                </Tbody>
            </Table>

        </Container>
    )
}

export default ProductList