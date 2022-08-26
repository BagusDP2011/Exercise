import { useState } from "react";
const Text = () => {
  const [inputText, setInputText] = useState("");

  const showTweet = () => {
    alert(inputText);
    setInputText("");
  };

  return (
    <div>
      <h1> Text Page </h1>
      <textarea
        // value={inputText}
        // maxLength={50}
        onChange = {(event) => {
          if (inputText.length > 50) {
            // if (inputText.length >= 50) {
            setInputText(event.target.value.slice(0, 50));
            alert("Max reaced.");
          } else {
            setInputText(event.target.value);
          }
        }}
        cols="30"
        rows="10"
      ></textarea>
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
      <br />
      <button
        disabled={inputText.length > 49 ? true : false}
        onClick={showTweet}
      >
        Tweet
      </button>
    </div>
  );
};

export default Text;
