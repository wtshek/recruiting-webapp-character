import React, { useEffect, useState } from "react";

export const ClassList = ({ classes, attributes }) => {
  const [selectClass, setSelectedClass] = useState(Object.keys(classes)[0]);
  const [expandClass, setExpandClass] = useState(false);
  const [requirementFilledClass, setRequirementFilledClass] = useState("");

  useEffect(() => {
    // TODO: optimised
    Object.entries(classes).forEach(([key, classAttributes]) => {
      let requirementFilled = true;
      for (let attribute of Object.keys(classAttributes)) {
        if (classAttributes[attribute] > attributes[attribute].value) {
          requirementFilled = false;
        }
      }
      if (requirementFilled) return setRequirementFilledClass(key);
    });
  }, [attributes, classes]);

  const onClassClick = (key) => () => {
    setExpandClass(true);
    setSelectedClass(key);
  };

  const onCloseButtonClick = () => {
    setExpandClass(false);
  };

  return (
    <div className="classes-container">
      <div className="class-overview">
        <h2>Class List</h2>
        <div>
          {Object.keys(classes).map((key) => (
            <div
              key={key}
              onClick={onClassClick(key)}
              className={`class ${
                requirementFilledClass === key ? "active" : "inactive"
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`class-detail-container ${
          expandClass ? "active" : "inactive"
        } `}
      >
        <h2>{selectClass} Minimum Requirements</h2>
        {Object.entries(classes[selectClass]).map(([key, value]) => {
          return (
            <div key={`${key}}`} className="class-attribute-container">
              <div>{key}: </div>
              <div>{value}</div>
            </div>
          );
        })}
        <button onClick={onCloseButtonClick}>Close Details</button>
      </div>
    </div>
  );
};
