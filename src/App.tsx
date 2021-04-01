import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import InputFieldContainer from "./components/InputFieldContainer";
import { InputElementType } from "./types/input";

const Background = styled.div`
  padding: 30px;
`;

/**
 * App.tsx is a practical demo of this application.
 * When this is migrated to a library, this will be used as a form of example
 */
function App() {
  const [value, setValue] = useState<InputElementType>([]);
  const validationList = ["hello", "world"];
  return (
    <Background>
      <InputFieldContainer
        value={value}
        setValue={setValue}
        validationList={validationList}
      />
      <button
        type="button"
        onClick={() => {
          setValue((_value) =>
            _value.concat({
              type: "tag",
              id: uuidv4(),
              text: "#{hello}",
              valid: true,
              removed: false,
            })
          );
        }}
      >
        hello
      </button>
      <button
        type="button"
        onClick={() => {
          console.log(value);
        }}
      >
        Retrieve Value
      </button>
    </Background>
  );
}

export default App;
