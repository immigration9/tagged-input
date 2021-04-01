import { v4 as uuidv4 } from "uuid";

import { InputElementType } from "../types/input";

export const tagVisualize = (tagText: string) => {
  return tagText.replace("#", "").replace("{", "").replace("}", "");
};

export const splitCreateTag = (
  text: string,
  validationList: string[]
): InputElementType => {
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
      valid: validationList.includes(tagVisualize(tag)),
    },
    { type: "text", id: uuidv4(), text: post },
  ];
};
