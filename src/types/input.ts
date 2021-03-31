import { Dispatch, SetStateAction } from "react";

export type TagItem = {
  type: "tag";
  id: string;
  text: string;
  valid: boolean;
  removed: boolean;
};

export type NonTagItem = {
  type: "text";
  id: string;
  text: string;
};

export type InputElementType = (TagItem | NonTagItem)[];

export type ItemCursorPosition = {
  id: string;
  node: Node | null;
  position: number;
};

export type InputContextProps = {
  value: InputElementType;
  setValue: Dispatch<SetStateAction<InputElementType>>;
  setElementValue: (id: string, payload: Partial<TagItem>) => void;
  cursorPos: ItemCursorPosition | null;
  setCursorPos: Dispatch<SetStateAction<ItemCursorPosition | null>>;
};
