import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";

import {
  InputContextProps,
  InputElementType,
  ItemCursorPosition,
  NonTagItem,
  TagItem,
} from "../types/input";
import InputField from "./InputField";

const InputBackground = styled.div`
  padding: 5px 10px;
  background-color: white;
  border: 1px solid #777;
  border-radius: 10px;
  width: 600px;
  word-wrap: break-word;

  display: flex;
  flex-wrap: wrap;
  line-height: 1.5rem;
`;

export const InputFieldContext = createContext<InputContextProps>({
  value: [],
  setValue: (_value: SetStateAction<InputElementType>) => {},
  setElementValue: (id: string, payload: Partial<TagItem>) => {},
  cursorPos: null,
  setCursorPos: (_value: SetStateAction<ItemCursorPosition | null>) => {},
});

const { Provider } = InputFieldContext;

interface InputFieldContainerProps {
  value: InputElementType;
  setValue: Dispatch<SetStateAction<InputElementType>>;
}

const InputFieldContainer = ({ value, setValue }: InputFieldContainerProps) => {
  const [cursorPos, setCursorPos] = useState<ItemCursorPosition | null>(null);

  const setElementValue = useCallback(
    (
      id: string,
      payload:
        | Partial<Omit<TagItem, "type">>
        | Partial<Omit<NonTagItem, "type">>
    ) => {
      setValue((_value) =>
        _value.map((item) => {
          if (item.id === id) {
            return { ...item, ...payload };
          }
          return item;
        })
      );
    },
    [setValue]
  );

  return (
    <Provider
      value={{
        value,
        setValue,
        setElementValue,
        cursorPos,
        setCursorPos,
      }}
    >
      <InputBackground>
        <InputField />
      </InputBackground>
    </Provider>
  );
};

export default InputFieldContainer;
