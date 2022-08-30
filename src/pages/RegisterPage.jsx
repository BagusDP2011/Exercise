import {
  Box,
  Text,
  Button,
  Radio,
  Input,
  InputGroup,
  InputRightElement,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState, React } from "react";

const RegisterPage = () => {
  const [email2, setEmail2] = useState("");
  const [nama, setNama] = useState("");
  const [radioVal, setRadio] = useState("Male");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Box alignSelf={"start"}>
      <Box
        marginLeft={"25%"}
        marginTop={"5%"}
        marginBottom={"5%"}
        width={"50%"}
        border="2px"
        borderColor={"black"}
        overflow="hidden"
        alignItems={"left"}
        padding={"10"}
      >
        <Stack alignItems={"center"}>
          <Text color={"black"} fontSize="3xl" fontWeight={"bold"}>
            Register
          </Text>
          <Text> Username: </Text>
          <Input
            type="text"
            placeholder="Input username"
            width="400px"
            onChange={(event) => {
              setNama(event.target.value);
            }}
            value={nama}
          />
          <Text> Email: </Text>
          <Input
            type="text"
            placeholder="Enter email"
            width="400px"
            onChange={(event) => {
              setEmail2(event.target.value);
            }}
            value={email2}
          />
          <Text> Password: </Text>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              width="400px"
            />
            <InputRightElement > 
              <Button h="-1.75rem" size="md" onClick={handleClick} width="400px">
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Text> Gender: </Text>
          <RadioGroup onChange={setRadio} value={radioVal}>
            <Stack direction="row" width="400px">
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Stack>
          </RadioGroup>
          <Button colorScheme={"twitter"} color={"black"} onClick={onOpen}>
            Register
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Result</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize={"2xl"} fontWeight="bold">
                  {" "}
                  Result{" "}
                </Text>
                <Text> Username : {nama}</Text>
                <Text> Email : {email2}</Text>
                <Text> Password : {email2}</Text>
                <Text> Radio : {radioVal}</Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Box>
    </Box>
  );
};

export default RegisterPage;
