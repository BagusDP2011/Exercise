import {
  Textarea,
  CircularProgress,
  CircularProgressLabel,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const Tweet = () => {
  const [inputText, setInputText] = useState("");

  const showTweet = () => {
    alert(inputText);
    setInputText("");
  };

  return (
    <div>
      <h1> Text Page </h1>
      <Textarea
        // maxLength={50}
        value={inputText}
        isInvalid={inputText.length >= 50}
        color={inputText.length >= 50 ? "red" : "black"}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
        cols="30"
        rows="10"
      ></Textarea>

      <span style={{ color: inputText.length > 30 ? "red" : "black" }}>
        <br />
        <input
          type="range"
          min={0}
          max={50}
          name="Max Character"
          id="Text Twitter"
          value={inputText.length}
        />
        {inputText.length} / 50{" "}
      </span>
      <CircularProgress
        value={(inputText.length / 50) * 100}
        color={inputText.length >= 35 ? "red" : "blue"}
      >
        {inputText.length >= 35 ? (
          <CircularProgressLabel color={"red"}>
            {50 - inputText.length}
          </CircularProgressLabel>
        ) : null}
      </CircularProgress>
      <br />
      <Button colorScheme={"twitter"} color={'black'} onClick={showTweet} disabled={inputText.length > 49 ? true : false}> Tweet </Button>
      <button
        disabled={inputText.length > 49 ? true : false}
        onClick={showTweet}
      >
        Tweet
      </button>
    </div>
  );
};

export default Tweet;
