import { useState, useEffect } from "react";
import { Text, Box, Button, Stack, HStack, Flex } from "@chakra-ui/react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [showCounter, setShowCounter] = useState(true)
  const incrementCounter = () => {
    setCounter(counter + 1); // ga bisa di redefine. bisa sih pake let
    console.log(counter);
    // alert("Sukses tambah ciek")
  };
  const decrementCounter = () => {
    if (counter <= 0) {
      return alert("Tidak boleh kurang dari 0");
    }
    // alert("Sukses tambah ciek")
    setCounter(counter - 1);
    console.log(counter);
  };
  const resetCounter = () => {
    console.log(counter);
    // alert("Sukses tambah ciek")
    setCounter(counter - counter);
  };
  const toggleCounter = () => {
    setShowCounter(!showCounter);
  };

  // useEffect(() => {
  //   alert("Hello");
  // }, []);

  useEffect(() => {
    document.title = " Counter : " + counter;
    if (counter == 0) {
      return;
    } else if (counter % 3 == 0) {
      alert(" FIZZZZZZZZZZZ 3");
    } else if (counter % 5 == 0) {
      alert(" BUzZZzZzzzZZZZZ 5");
    } else {
      alert(" Counter berubah jadi :  " + counter);
    }
  }, [counter]);

  return (
      <Box marginTop={"4"}>
        <Text fontWeight={"bold"} fontSize="2xl">Counter Page</Text>

      {showCounter ? <h2>{counter}</h2> : null}

      <Flex direction="column" alignItems="left">

        <Stack width="400px">
            <Button colorScheme={"linkedin"} onClick={toggleCounter}>Toggle Counter Visibility</Button>
        <Box>
          <HStack spacing={"8"}>
            {/* HStack pada dasaranya flex box */}
            <Button flex={1} colorScheme={"red"} onClick={incrementCounter}>Tambah Ciek</Button>
            <Button flex={1} colorScheme={"twitter"} onClick={decrementCounter}>Kurang Ciek</Button>
            <Button flex={1} colorScheme={"whatsapp"} onClick={resetCounter}>Reset</Button>
          </HStack>
        </Box>
        </Stack>

      </Flex>
    </Box>
  );
};

export default Counter;
