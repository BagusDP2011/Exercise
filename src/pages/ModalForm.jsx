import { useState } from "react"
import {
  Text,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputRightElement,
  InputGroup,
  Radio,
  RadioGroup,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  isOpen,
  onOpen,
  onClose,
  useDisclosure,
} from "@chakra-ui/react"

const ModalForm = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [emailUser, setEmailUser] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")

  const [gender, setGender] = useState()

  const submitBtnHandler = () => {
    setCurrentEmail(emailUser)
    setCurrentUser(user)
    setCurrentPassword(password)
    onOpen()
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <FormControl>
      <Text fontSize={"28px"} fontWeight="bold">
        {" "}
        Register
      </Text>

      <FormLabel>Username</FormLabel>
      <Input
        type="text"
        placeholder="Username"
        value={user}
        onChange={(event) => setUser(event.target.value)}
      />

      <FormLabel>Email address</FormLabel>
      <Input
        input="email"
        placeholder="Email"
        value={emailUser}
        onChange={(event) => setEmailUser(event.target.value)}
      />
      <FormHelperText>We'll never share your email.</FormHelperText>

      <FormLabel>Password</FormLabel>
      <InputGroup
        input="password"
        placeholder="Sandi"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      >
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {" "}
            {show ? "Hide" : "Show"}{" "}
          </Button>
        </InputRightElement>
      </InputGroup>

      <FormLabel as="gender">Select Gender</FormLabel>
      <RadioGroup onChange={setGender} value={gender}>
        <HStack spacing="24px">
          <Radio value="Straight">Straight</Radio>
          <Radio value="Gay">Gay</Radio>
        </HStack>
      </RadioGroup>

      <Button type="submit" onClick={submitBtnHandler}>
        Submit
      </Button>

      {/* ======================================================================================= */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Username: {user}</Text>
            <Text>Email: {emailUser}</Text>
            <Text>Password: {password}</Text>
            <Text>Gender: {gender}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  )
}

export default ModalForm
