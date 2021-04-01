import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useEffect,
} from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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
  validationList: [],
});

const { Provider } = InputFieldContext;

interface InputFieldContainerProps {
  value: InputElementType;
  setValue: Dispatch<SetStateAction<InputElementType>>;
  validationList: string[];
}

const InputFieldContainer = ({
  value,
  setValue,
  validationList,
}: InputFieldContainerProps) => {
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

  useEffect(() => {
    if (value[value.length - 1].type === "tag") {
      setValue((_value) =>
        _value.concat({
          type: "text",
          id: uuidv4(),
          text: "",
        })
      );
    }
  }, [value, setValue]);

  return (
    <Provider
      value={{
        value,
        setValue,
        setElementValue,
        cursorPos,
        setCursorPos,
        validationList,
      }}
    >
      <InputBackground>
        <InputField />
      </InputBackground>
    </Provider>
  );
};

export default InputFieldContainer;
