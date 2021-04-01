import { useContext } from "react";
import styled from "styled-components";

import { TagItem } from "../types/input";
import { tagVisualize } from "../utils/tag";
import { InputFieldContext } from "./InputFieldContainer";

const TagStyle = styled.div<{ isValid: boolean }>`
  padding: 0 8px;
  margin: 0 4px;
  background-color: ${({ isValid }) => (isValid ? "orange" : "red")};
  color: white;
  font-weight: bold;
  cursor: move;
  border-radius: 50px;

  display: inline-block;
`;

const Tag = ({ element }: { element: TagItem }) => {
  const { setElementValue } = useContext(InputFieldContext);

  return (
    <TagStyle isValid={element.valid}>
      <div onClick={() => setElementValue(element.id, { removed: true })}>
        {tagVisualize(element.text)} X
      </div>
    </TagStyle>
  );
};

export default Tag;
