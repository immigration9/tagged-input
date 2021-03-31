import { useState } from "react";
import styled from "styled-components";
import InputFieldContainer from "./components/InputFieldContainer";
import { InputElementType } from "./types/input";

const Background = styled.div`
  padding: 30px;
`;

function App() {
  const [value, setValue] = useState<InputElementType>([]);
  return (
    <Background>
      <InputFieldContainer value={value} setValue={setValue} />
    </Background>
  );
}

export default App;
