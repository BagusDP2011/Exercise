import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Counter from "./pages/Counter";
import TextPage from "./pages/Text";
import List from "./pages/List";
import Filter from "./pages/Filter";
import { Routes, Route, Link } from "react-router-dom";
import { Text, UnorderedList, ListItem, Box } from "@chakra-ui/react";
import RegisterPage from "./pages/RegisterPage";
import RegisterT from "./pages/RegisterT";

function App() {
  return (
    <Box>
      <h1> List Sementara Untuk Pelajaran</h1>
      <Text fontSize="3xl" fontWeight={"bold"} color={"blue.600"}>

        Percobaan chakra ui
      </Text>
      <UnorderedList>
          <ListItem><Link to ="/home"> Home </Link></ListItem>
          <ListItem><Link to ="/about"> About </Link></ListItem>
          <ListItem><Link to ="/counter"> Counter </Link></ListItem>
          <ListItem><Link to ="/text"> Text </Link></ListItem>
          <ListItem><Link to ="/list"> list </Link></ListItem>
          <ListItem><Link to ="/filter"> Filter </Link></ListItem>
          <ListItem><Link to ="/registerpage"> Register Page </Link></ListItem>
          <ListItem><Link to ="/registerT"> Register dari Kak Theo </Link></ListItem>
      </UnorderedList>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Counter" element={<Counter />} />
        <Route path="/Text" element={<TextPage />} />
        <Route path="/List" element={<List />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/registerT" element={<RegisterT />} />
      </Routes>
    </Box>
  );
}

export default App;
