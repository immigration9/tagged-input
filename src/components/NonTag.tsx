import {
  BaseSyntheticEvent,
  useRef,
  useContext,
  useLayoutEffect,
  useEffect,
} from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { InputElementType, NonTagItem } from "../types/input";
import { InputFieldContext } from "./InputFieldContainer";

const NonTagStyled = styled.div`
  display: inline-block;
  min-width: 1px;
  outline: none;
`;

const matcher = /[a-zA-z0-9]*#{[a-zA-z0-9]+}[a-zA-z0-9]*/;

function splitItem(text: string): InputElementType {
  const pre = text.slice(0, text.indexOf("#"));
  const post = text.slice(text.indexOf("}") + 1);
  const tag = text.slice(text.indexOf("#"), text.indexOf("}") + 1);

  return [
    { type: "text", id: uuidv4(), text: pre },
    {
      type: "tag",
      id: uuidv4(),
      text: tag,
      removed: false,
      valid: true,
    },
    { type: "text", id: uuidv4(), text: post },
  ];
}

const selection = document.getSelection();

const NonTag = ({ element }: { element: NonTagItem }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { setValue, setElementValue, cursorPos, setCursorPos } = useContext(
    InputFieldContext
  );

  useEffect(() => {
    if (element.text.match(matcher)) {
      setValue((_value) =>
        _value.reduce<InputElementType>((acc, cur) => {
          if (element.id === cur.id) {
            const splitted = splitItem(cur.text);
            setCursorPos({
              id: splitted[2].id,
              node: selection?.focusNode ?? null,
              position: 0,
            });
            return [...acc, ...splitted];
          }
          return [...acc, cur];
        }, [])
      );
    }
  }, [element, setValue, setCursorPos]);

  useLayoutEffect(() => {
    if (divRef.current && cursorPos && cursorPos.id === element.id) {
      selection?.collapse(cursorPos.node, cursorPos.position);
      divRef.current.focus();
    }
  }, [element, cursorPos]);

  return (
    <NonTagStyled
      ref={divRef}
      onInput={(e) => {
        if (selection) {
          setCursorPos({
            id: element.id,
            position: selection.focusOffset,
            node: selection.focusNode,
          });
        }
        setElementValue(element.id, {
          text: (e as BaseSyntheticEvent).target.innerText,
        });
      }}
      contentEditable="true"
      suppressContentEditableWarning
    >
      {element.text}
    </NonTagStyled>
  );
};

export default NonTag;
