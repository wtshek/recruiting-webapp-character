import React from "react";

export const Attribute = ({ attributes, onAdd, onDeduct }) => {
  const onAddButtonClick = (key) => () => {
    onAdd(key);
  };
  const onMinusButtonClick = (key) => () => {
    onDeduct(key);
  };

  return (
    <div className="attributes-container">
      <h2>Attributes</h2>
      {Object.entries(attributes).map(([key, value]) => (
        <div className="attribute" key={key}>
          <span>{key}:</span>
          <span>{value.value}</span>
          <span>(Modifier: {value.modifier})</span>
          <div className="attribute-controller">
            <button onClick={onAddButtonClick(key)}>+</button>
            <button onClick={onMinusButtonClick(key)}>-</button>
          </div>
        </div>
      ))}
    </div>
  );
};
