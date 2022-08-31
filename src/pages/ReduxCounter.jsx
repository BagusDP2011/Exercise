import {Box, Button, Text, Input} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { increment, decrement, reset, input } from "../features/counter/counterSlice"

const ReduxCounter = () => {
    const counterSelector = useSelector((state) => state.counter)

    const dispatch = useDispatch()
    
    const incrementBtn = () => {
        dispatch(increment())
    }
    const decrementBtn = () => {
        dispatch(decrement())
    }
    const resetBtn = () => {
        dispatch(reset())
    }
    const [numInput, setNumInput] = useState(0)
    const inputBtn = () => {
        dispatch(input(Number(numInput)))
    }
    return (
        <Box spacing="20px">
            <Text>Redux Counter</Text>
            <Text fontSize={"3xl"} fontWeight="bold">{counterSelector.value}</Text>
            <Button colorScheme={"green"} color="white" onClick={incrementBtn}>Increment</Button>
            <Button colorScheme={"green"} color="white" onClick={decrementBtn}>Decrement</Button>
            <Button colorScheme={"green"} color="white" onClick={resetBtn}>Reset</Button> <br />
            <Input type="number" value={numInput} onChange={(event) => setNumInput(event.target.value)}/>
            {/* <Input type="number" value={counterSelector.value} onChange={(event) => dispatch(input(event.target.value))}/> */}
            <Button colorScheme={"green"} color="white" onClick={inputBtn} > Confirm </Button>
        </Box>
    )
}

export default ReduxCounter