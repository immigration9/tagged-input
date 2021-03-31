import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { InputFieldContext } from "./InputFieldContainer";
import NonTag from "./NonTag";
import Tag from "./Tag";

const InputField = () => {
  const { value, setValue } = useContext(InputFieldContext);

  useEffect(() => {
    if (value.length === 0) {
      setValue([
        {
          type: "text",
          id: uuidv4(),
          text: "",
        },
      ]);
    }
  }, [value, setValue]);

  return (
    <div>
      {value.map((element) => {
        if (element.type === "tag" && !element.removed) {
          return <Tag element={element} />;
        }
        if (element.type === "text") {
          return <NonTag element={element} />;
        }
        return null;
      })}
    </div>
  );
};

export default InputField;
