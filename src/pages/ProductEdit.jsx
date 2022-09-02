import { Box, Text, Container, Grid, GridItem, FormControl, FormLabel, Input, Button, Toast, useToast } from "@chakra-ui/react"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { jsonServerAPI } from "../api" 
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from 'yup'

const ProductEdit = () => {
    const [product, setProduct] = useState ({})

    const params = useParams()
    const Toast = useToast()
    const formChangeHandler = ({target}) => {
        const { name, value } = target
        formik.setFieldValue(name, value)
    }

    useEffect(() => {
        fetchProduk()
    }, [])
    
    const fetchProduk = async () => {
        try {
            const response = await jsonServerAPI.get(`/products/${params.id}`)
            setProduct(response.data)
            formik.setFieldValue("product_name", response.data.product_name)
            formik.setFieldValue("price", response.data.price)
            formik.setFieldValue("stock", response.data.stock)
        } catch (err) {
            console.log(err)
            
        }
    }


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
                    price: Number(price), 
                    stock: Number(stock)
                }
    
                await jsonServerAPI.patch(`/products/${params.id}`, newProduct)
                // Di fetch produk diambil datanya menjadi product. Jadi ga harus pake params.id
                fetchProduk()
                Toast({ title: "Product edited successfully!", status:"info"})

            } catch (err) {
                Toast({ title: "Failed to edit product", status:"error"})
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

    



    return (
    <Box>
        <Text>Product Edit</Text>
        <Text>{product.product_name}</Text>
        <Text>{product.price}</Text>
        <Text>{product.stock}</Text>

        <Container maxW="container.lg">
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
`            <Link to={`/productlist/`}><Button mx="1" colorScheme="green">Back</Button></Link>
`
        </Container>
    </Box>


    )
}

export default ProductEdit