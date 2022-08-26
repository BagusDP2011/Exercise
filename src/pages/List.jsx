import { useEffect, useState } from "react"

const List = () => {
    // ComponentDidMount
    // Trigger setelah mount 1x
    useEffect(()=> {
        alert("Hello")
    }, [])
    
    //ComponentDidUpdate
    //Trigger setelah update
    const [counter, setCounter] = useState(0);
    useEffect (() => {
        document.title = " Counter : "+ counter
        alert("Counter berubah jadi" + counter)
    }, [counter])
    
    //ComponentDidUpdate
    //Trigger setelah update
    useEffect (() => {
        return () => {
        alert("Counter berubah jadi" + counter)
        }
    }, [])
 
 
    return (
    <div>
        <h1>List Page</h1>
        <button onClick={()=> setCounter(counter +1)}>Tambah Ciek</button>

    </div>
    )
}

export default List