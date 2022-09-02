import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Counter from "./pages/Counter";
import TextPage from "./pages/Text";
import List from "./pages/List";
import Filter from "./pages/Filter";
import { Routes, Route, Link } from "react-router-dom";
import { Text, UnorderedList, ListItem, Box, Divider, Stack, HStack, Container, Image, GridItem, Grid, InputRightElement, Toast } from "@chakra-ui/react";
import RegisterPage from "./pages/RegisterPage";
import RegisterT from "./pages/RegisterT";
import ReduxCounter from "./pages/ReduxCounter";
import ReduxStudent from "./pages/ReduxStudent";
import { useSelector, useDispatch } from "react-redux";
import Student from "./pages/Student";
import UserList from "./pages/UserList";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import ExerciseEmployee from "./pages/ExerciseEmployee";
import ExerciseEmployeeRegist from "./pages/ExerciseEmployeeRegist";
import logo from './assets/GBBlack.png'
import { fillEmployeeList } from "../src/features/employee/employeeSlice"
import { useEffect } from "react";
import { jsonServerDataAPI } from "../src/api/index"
import ExerciseEmployeeEdit from "./pages/ExerciseEmployeeEdit";



function App() {
  const counterSelector = useSelector((state) => state.counter)
  const studentSelector = useSelector((state) => state.student)
  const employeeSelector = useSelector((state) => state.employee)

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

  // Data.map ====================================================
  // const renderProfiles = () => {
  //   let result = data.map((val) => {
  //     return (
  //       <Profile
  //         fullName={val.fullName}
  //         position={val.position}
  //         age={val.age}
  //       />
  //     )
  //   })

  //   return result
  // }
  // Data.map ====================================================


  return (
    <Box backgroundColor={"lightgrey"}>
      <Text fontSize="3xl" fontWeight={"bold"} color={"blue.600"} textAlign="center" paddingBottom={"25px"}>
      List Sementara Untuk Pelajaran
      </Text>
        <Container maxW="1280px">
          
          <UnorderedList>
          <HStack spacing='24px' maxW="1280px">
            <Box width={"10%"}></Box>
            <Box width={"25%"}>
              <ListItem>
                <Link to="/home"> Home </Link>
              </ListItem>
              <ListItem>
                <Link to="/about"> About </Link>
              </ListItem>
              <ListItem>
                <Link to="/counter"> Counter </Link>
              </ListItem>
              <ListItem>
                <Link to="/text"> Text </Link>
              </ListItem>
              <ListItem>
                <Link to="/list"> List </Link>
              </ListItem>
            </Box>

            <Box width={"25%"}>
                <ListItem>
                  <Link to="/filter"> Filter </Link>
                </ListItem>
                <ListItem>
                  <Link to="/registerpage"> Register Page </Link>
                </ListItem>
                <ListItem>
                  <Link to="/registerT"> Register dari Kak Theo </Link>
                </ListItem>
                <ListItem>
                  <Link to="/reduxcounter"> Redux Counter </Link>
                </ListItem>
                <ListItem>
                  <Link to="/reduxstudent"> Redux Student Exercise </Link>
                </ListItem>

            </Box>

            <Box width={"25%"}>
              <ListItem>
                <Link to="/student"> Redux Student Hasil Kak Theo </Link>
              </ListItem>
              <ListItem>
                <Link to="/userlist"> User List </Link>
              </ListItem>
              <ListItem>
                <Link to="/productlist"> Product List </Link>
              </ListItem>
              <ListItem>
                <Link to="/exerciseemployee"> Exercise Employee 20220901 </Link>
              </ListItem>
              <ListItem>
                <Link to="/exerciseemployeeregist"> Exercise Employee Registration </Link>
              </ListItem>
            </Box>
            <Box width={"10%"} />
            </HStack>
            </UnorderedList>
          </Container>


        <Divider orientation="horizontal" colorScheme="grey" variant="dashed" bgColor={"red"}/> <br />

        <Box minHeight="56px" backgroundColor="teal" padding="4">
        <Grid templateRows="2fr, 1fr)" columnGap={"100"}>

              <HStack justifyContent={"space-between"}>
              <Text fontSize="5xl" fontWeight="bold" color="white">
                BagusDP
              </Text>

                <Image borderRadius='full' boxSize='150px'
                src={logo}
                alt='GusbaXD Logo'>
                </Image>
              </HStack>

            <GridItem>
            <HStack justifyContent={"space-between"}>
            <Text fontSize="xl" color="white">
            Counter: {counterSelector.value}
            </Text>
            <Text fontSize="xl" color="white">
            | 
            </Text>
            <Text fontSize="xl" color="white">
            Total Students: {studentSelector.data.length}
            </Text>
            <Text fontSize="xl" color="white">
            | 
            </Text >
            <Text fontSize="xl" color="white">
            Total Employee: {employeeSelector.data.length}
            </Text>
            <Text fontSize="xl" color="white">
            | 
            </Text >
            <Text fontSize="xl" color="white">
              Current Employee <br />
              ID: {employeeSelector.takeEmployee.id} <br />
              Name: {employeeSelector.takeEmployee.employee_name} <br />
              Email: {employeeSelector.takeEmployee.email}
            </Text>
            </HStack>
            </GridItem>
          
          </Grid>
          </Box>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Counter" element={<Counter />} />
        <Route path="/Text" element={<TextPage />} />
        <Route path="/List" element={<List />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/registerT" element={<RegisterT />} />
        <Route path="/reduxcounter" element={<ReduxCounter />} />
        <Route path="/reduxstudent" element={<ReduxStudent />} />
        <Route path="/student" element={<Student />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/productlist/" element={<ProductList />} />
        <Route path="/productlist/:id" element={<ProductEdit />} />
        <Route path="/exerciseemployee" element={<ExerciseEmployee />} />
        <Route path="/exerciseemployeeregist" element={<ExerciseEmployeeRegist />} />
        <Route path="/exerciseemployeeedit/:id" element={<ExerciseEmployeeEdit />} />

      </Routes>
    </Box>
  );
}

export default App ;
