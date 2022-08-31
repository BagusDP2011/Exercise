import {
    Button,
    Container,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Select,
    Table,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react"
  import { useState } from "react"
  import { useSelector, useDispatch } from "react-redux"
  import { addStudent } from "../features/student/studentSlice"
  
  const Student = () => {
    const studentSelector = useSelector((state) => state.student)
    const dispatch = useDispatch()
  
    const [inputName, setInputName] = useState("")
    const [inputGender, setInputGender] = useState("")
    const [inputCourse, setInputCourse] = useState("Web Development")
  
    const renderStudents = () => {
      return studentSelector.data.map((val, idx) => {
        return (
          <Tr key={val.nama}>
            <Td>{val.nama}</Td>
            <Td>{val.gender}</Td>
            <Td>{val.course}</Td>
            <Td></Td>
          </Tr>
        )
      })
    }
  
    const addDataBtnHandler = () => {
      let newStudent = {
        nama: inputName,
        gender: inputGender,
        course: inputCourse,
      }
  
      dispatch(addStudent(newStudent))
    }
  
    return (
      <Container maxW="container.lg">
        <Text m="6" fontSize="4xl" fontWeight="bold">
          Students Page
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>Course</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>{renderStudents()}</Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Input
                  value={inputName}
                  onChange={(event) => setInputName(event.target.value)}
                  placeholder="Input nama"
                />
              </Td>
              <Td>
                <RadioGroup
                  onChange={(value) => setInputGender(value)}
                  value={inputGender}
                >
                  <HStack>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </HStack>
                </RadioGroup>
              </Td>
              <Td>
                <Select
                  value={inputCourse}
                  onChange={(event) => setInputCourse(event.target.value)}
                >
                  <option>Web Development</option>
                  <option>Data Science</option>
                  <option>Digital Marketing</option>
                  <option>UI/UX</option>
                </Select>
              </Td>
              <Td>
                <Button onClick={addDataBtnHandler} colorScheme="green">
                  Add Data
                </Button>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </Container>
    )
  }
  
  export default Student