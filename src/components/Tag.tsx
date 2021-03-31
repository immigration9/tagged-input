import { useContext } from "react";
import styled from "styled-components";

import { TagItem } from "../types/input";
import { InputFieldContext } from "./InputFieldContainer";

const TagStyle = styled.div<{ isDragging?: boolean }>`
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  padding: 0 8px;
  margin: 0 4px;
  background-color: orange;
  color: white;
  font-weight: bold;
  cursor: move;
  border-radius: 50px;

  display: inline-block;
`;

function tagVisualize(tagText: string) {
  return tagText.replace("#", "").replace("{", "").replace("}", "");
}

const Tag = ({ element }: { element: TagItem }) => {
  const { setElementValue } = useContext(InputFieldContext);

  return (
    <TagStyle>
      <div
        contentEditable="false"
        onClick={() => setElementValue(element.id, { removed: true })}
      >
        {tagVisualize(element.text)} X
      </div>
    </TagStyle>
  );
};

export default Tag;
