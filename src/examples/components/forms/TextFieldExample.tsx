// Example usage of the TextField component

import React, { useState } from "react";
import { TextField } from "@/index";

const TextFieldExample: React.FC = () => {
  const [objectsList, setObjectsList] = useState([
    { school_name: "Harvard University" },
    { school_name: "Stanford University" },
  ]);

  // Handle change for array props
  const handleChange = (propsArray: [number, string], value: string) => {
    // Updated record object key based on passed index and name.
    const [recordIndex, name] = propsArray;
    const updatedList = objectsList.map((item, i) =>
      i === recordIndex ? { ...item, [name]: value } : item
    );
    setObjectsList(updatedList);
  };

  return (
    <div>
      <h2>Text Fields</h2>

      {objectsList.map((option, index) => (
        <div key={index}>
          <h3>School {index + 1}</h3>
          <TextField
            names={`school_name_${index}`}
            types="text"
            labels="High School Name *"
            requireds={true}
            defaultValues={option.school_name}
            arrayProps={[index, "school_name"]}
            setArrayProps={handleChange}
          />
        </div>
      ))}

      <pre>{JSON.stringify(objectsList, null, 2)}</pre>
    </div>
  );
};

export default TextFieldExample;
