import { Box, Button, Table, Text, Thead, Tbody, Th, Td, Tr, Container, Toast, useToast, Grid, GridItem, FormControl, Input, FormLabel, FormErrorMessage, } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axios from 'axios'
import { jsonServerAPI } from "../api"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link } from "react-router-dom"

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
                    <Td> 
                        <Link to={`/productlist/${val.id}`}><Button mx="1" colorScheme="green">Edit</Button></Link>
                        <Button mx="1" colorScheme="red" onClick={() => deleteBtnHandler(val.id)}>Delete</Button>
                    </Td>
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
        },
        onSubmit: async (values) => {
            try {
                const { product_name, price, stock } = values
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
        },
        validationSchema: Yup.object({
            product_name: Yup.string().required("Nama Produk: Tidak boleh kosong"),
            price: Yup.number().required("Harga Produk: Tidak boleh kosong").min(1000, "Minimum 1k").max(100000, "Max 100k"),
            stock: Yup.number().required("Stock Produk: Tidak boleh kosong").min(1)
        }),
        validateOnChange: false,

    })

    const formChangeHandler = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    const deleteBtnHandler = async (id) => {
        try {
            await jsonServerAPI.delete(`/products/${id}`)
            fetchProducts()
            Toast({ title : "Product Deleted", status: "info" })
        } catch (err) {
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
                    <FormControl isInvalid={formik.errors.product_name}>
                        <FormLabel>Product Name</FormLabel>
                        {/* <Input type="text" onChange={(event) => formik.setFieldValue("product_name", event.target.value)}></Input> */}
                        <Input type="text" name="product_name" onChange={(formChangeHandler)}></Input>
                        <FormErrorMessage>{formik.errors.product_name}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isInvalid={formik.errors.price}>
                        <FormLabel>Product Price</FormLabel>
                        <Input type="number" name="price" onChange={(formChangeHandler)}></Input>
                        <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isInvalid={formik.errors.stock}>
                        <FormLabel>Product Stock</FormLabel>
                        <Input type="number" name="stock" onChange={(formChangeHandler)}></Input>
                        <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
                    </FormControl>
                </GridItem>
            </Grid>
            <Button onClick={formik.handleSubmit} disabled={formik.isSubmitting} my="4" colorScheme="teal">Tambah</Button>

            <Table>
                <Thead>
                    <Tr>
                        <Th>Product Name</Th>
                        <Th>Price</Th>
                        <Th>Stock</Th>
                        <Th>Action</Th>
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