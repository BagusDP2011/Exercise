import { useState } from "react";
import Buah from "./Fruits";

const Filter = () => {
  const [fruits, setFruits] = useState([
    "Jeruk",
    "Leci",
    "Apel",
    "Mangga",
    "Salak",
    "Pisang",
    "Naga",
  ]);

  const[inputFilter, setInputFilter] = useState("")
  const[currentFilter, setCurrentFilter] = useState("")

  const renderFruits = () => {
    return fruits.map ((val) => {
        if (val.toLowerCase().includes(currentFilter.toLowerCase())) {
            return <li> {val} </li>
        }
    })
  }
  const filterBtn =() =>{
    setCurrentFilter(inputFilter)
  }

  const addFruitBtn =() => {
    if (inputAdd) {
    // 1. Copy arrray
    // 2. Tambahin item
    // 3. Simpan array baru
    setFruits([...fruits, inputAdd])
    setAdd
    } else {
        alert ("Kosong")
    }

  }
  const [inputAdd, setInputAdd] = useState ("")
  return (
    <div>
      <h1>Filter Page</h1>
      <input
        type="text"
        onChange={(event) => {
          setInputFilter(event.target.value);
        }}
      />
      <button onClick={filterBtn}> Filter </button>
      <br />
        <input type="text" onChange={(event) => setInputAdd (event.target.value)}
        value={inputAdd}
        />
        <button onClick={addFruitBtn}> Add new fruit</button>
        <ul>{renderFruits()}</ul>
    </div>

  );
};

export default Filter;
