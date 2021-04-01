import {
  BaseSyntheticEvent,
  useRef,
  useContext,
  useLayoutEffect,
  useEffect,
} from "react";
import styled from "styled-components";

import { InputElementType, NonTagItem } from "../types/input";
import { splitCreateTag } from "../utils/tag";
import { InputFieldContext } from "./InputFieldContainer";

const NonTagStyled = styled.div`
  display: inline-block;
  min-width: 1px;
  outline: none;
  /** 
   * Without this option,
   * 
   */
  white-space: pre;
`;

const matcher = /[a-zA-z0-9]*#{[a-zA-z0-9]+}[a-zA-z0-9]*/;

const selection = document.getSelection();

const NonTag = ({ element }: { element: NonTagItem }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const {
    setValue,
    setElementValue,
    cursorPos,
    setCursorPos,
    validationList,
  } = useContext(InputFieldContext);

  useEffect(() => {
    if (element.text.match(matcher)) {
      setValue((_value) =>
        _value.reduce<InputElementType>((acc, cur) => {
          if (element.id === cur.id) {
            const splitted = splitCreateTag(cur.text, validationList);
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
  }, [element, setValue, setCursorPos, validationList]);

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
