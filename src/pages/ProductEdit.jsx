import { Box, Text, Container, Grid, GridItem, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { jsonServerAPI } from "../api" 
import { Link } from "react-router-dom"

const ProductEdit = () => {
    const [product, setProduct] = useState ({})

    const params = useParams()
    console.log(params.id)

    const fetchProduk = async () => {
        try {
            const response = await jsonServerAPI.get(`/products/${params.id}`)
            setProduct(response.data)
        } catch (err) {
            console.log(err)
            
        }
    }

    useEffect(() => {
        fetchProduk()
    }, [])
    
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
                        {/* <Input type="text" onChange={(event) => formik.setFieldValue("product_name", event.target.value)}></Input> */}
                        <Input type="text" name="product_name" 
                        // onChange={(formChangeHandler)}
                         defaultValue={product.product_name}></Input>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl>
                        <FormLabel>Product Price</FormLabel>
                        <Input type="number" name="price" 
                        // onChange={(formChangeHandler)}
                         defaultValue={product.price}></Input>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl>
                        <FormLabel>Product Stock</FormLabel>
                        <Input type="number" name="stock" 
                        // onChange={(formChangeHandler)}
                         defaultValue={product.stock}></Input>
                    </FormControl>
                </GridItem>
            </Grid>
            <Link to={`/productlist/`}><Button mx="1" colorScheme="green">Back</Button></Link>

        </Container>
    </Box>


    )
}

export default ProductEdit