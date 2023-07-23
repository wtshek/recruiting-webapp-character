import React from "react";

export const Skill = ({
  skills,
  skillPoints,
  onSkillAdded,
  onSkillDeducted,
  attributes,
}) => {
  const onAddButtonClick = (key) => () => {
    onSkillAdded(key);
  };

  const onMinusButtonClick = (key) => () => {
    onSkillDeducted(key);
  };

  return (
    <div className="skill-container">
      <h2>Skills</h2>
      <div>Total skill points available: {skillPoints}</div>
      <div>
        {Object.values(skills).map((skill) => {
          const { key, name, attributeModifier, value } = skill;
          const attributeValue = attributes[attributeModifier].modifier;
          return (
            <div key={key} className="skill">
              <div>{name}</div>
              <div>Points: {value}</div>
              <div>
                (Modifier: {attributeModifier} - {attributeValue})
              </div>
              <button onClick={onAddButtonClick(key)}>+</button>
              <button onClick={onMinusButtonClick(key)}>-</button>
              <div>Total: {value + attributeValue}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
