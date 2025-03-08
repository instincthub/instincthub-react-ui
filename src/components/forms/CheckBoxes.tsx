import React, { useEffect, useState } from "react";

// Define interface for the option object
interface Option {
  id: string | number;
  title: string;
  status?: boolean;
}

// Define props interface
interface CheckBoxesProps {
  objects: Record<string, Option>;
  labels: string;
  names: string;
  defaultValues?: boolean;
}

function CheckBoxes(props: CheckBoxesProps) {
  const [objects, setObjects] = useState<Option[]>([]);

  /*
   * Objects throws error when you loop with map or forEach.
   * Solution: convert to array.
   */
  useEffect(() => {
    // Objects to array
    let obj: Option[] = [];
    for (const i in props.objects) obj.push(props.objects[i]);
    setObjects(obj);
  }, [props.objects]);

  if (objects) {
    return (
      <section
        className="manipulateCheckboxes"
        style={{
          margin: "30px 0px",
        }}
      >
        <h3 style={{ fontSize: "1em", marginBottom: "0px" }}>{props.labels}</h3>
        <div
          className="checkbox_wrapper"
          style={{
            maxHeight: "200px",
            overflow: "scroll",
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {objects.map((option) => {
            return (
              <div className="cntr" key={option.id}>
                <label htmlFor={`id_${option.id}`} className="label-cbx">
                  <input
                    name={props.names}
                    id={`id_${option.id}`}
                    type="checkbox"
                    className="invisible"
                    data-id={option.id}
                    defaultValue={String(option.id)}
                    defaultChecked={props.defaultValues ? option.status : false}
                    hidden
                  />
                  <div className="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                      <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                      <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                  </div>
                  <span>{option.title}</span>
                </label>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return null;
}

export default CheckBoxes;
