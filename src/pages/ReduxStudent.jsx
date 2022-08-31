import {
  Box,
  Button,
  Text,
  Input,
  Stack,
  RadioGroup,
  Radio,
  Select,
  HStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  inputData,

} from "../features/student/studentSlice";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

// Setup slice
// Import store
// Initial state dummy data
// render data
// Setup form
// Feature add data

const ReduxStudent = () => {
  const studentSelector = useSelector((state) => state.student);

  const dispatch = useDispatch();

  const clickBtn = () => {    
    let newStudent = {
      nama: inputNamas,
      gender: inputGenders,
      course: inputCourses,
    }

    dispatch(inputData(newStudent))
  }

  const [inputNamas, setInputNama] = useState("");
  const [inputGenders, setInputGender] = useState("Male");
  const [inputCourses, setInputCourse] = useState("");

  const renderData = () => {
    return studentSelector.data.map((val, idx) => {
      return (
        <Tr key={idx.toString()} > 
          <Td>{val.nama}</Td> 
          <Td>{val.gender}</Td>
          <Td>{val.course}</Td>
        </Tr>
      )
    })
  }


  return (
    <Box spacing="20px">
      {/* <Stack backgroundColor={"green"} h={"50px"} justifyItems={"center"}>
        <Box>
          <Text
            backgroundColor={"white"}
            width={"400px"}
            marginLeft={"30px"}
            border={"1px solid black"}
            borderRadius={"20%"}
          >
            State Management Practice
          </Text>
        </Box>
        <Box> <Text>Total User: {data.length}</Text> </Box>
      </Stack> */}

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>
            <HStack spacing="24px">
              <Box width="30%" h="40px" bg="yellow.200">
                <Input
                  type="text"
                  width="200px"
                  placeholder="Input Name"
                  onChange={(event) => setInputNama(event.target.value)}
                  value={inputNamas}
                ></Input>
              </Box>
              <Box h="40px" bg="tomato">
              <RadioGroup onChange={(event) => setInputGender(event.target.value)} value={inputGenders}>
                <Stack direction="row">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>={" "}
                </Stack>
              </RadioGroup>
                    </Box>
              <Box h="40px" bg="pink.100">
                <Select placeholder="Select Course" onChange={(event) => setInputCourse(event.target.value)} value={inputCourses}>
                  <option>Full Stack</option>
                  <option>Digital Marketing</option>
                  <option>Data Scientist</option>
                  <option>UI/UX</option>
                </Select>
              </Box>
              <Box h="40px" bg="pink.100">
                <Button onClick={clickBtn}>Add New User</Button>
              </Box>
            </HStack>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>Gender</Th>
              <Th>Course</Th>
            </Tr>
          </Thead>
          <Tbody>
            {renderData()}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReduxStudent;
