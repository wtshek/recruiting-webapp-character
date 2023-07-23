import "./App.css";
import { CLASS_LIST } from "./consts.js";
import { Attribute } from "./components/Attribute";
import { ClassList } from "./components/ClassList";
import { Skill } from "./components/Skill";
import { INITIAL_ATTRIBUTE_VALUE, useInitData } from "./hooks/useInitData";

const ATTRIBUTE_INCREMENT_STEP = 2;
const ATTRIBUTE_DEDUCT_STEP = 1;
const MAX_ATTRIBUTES_POINTS = 70;

const SKILL_POINTS_STEP = 4;

function App() {
  const {
    attributes,
    setAttributes,
    skills,
    setSkills,
    skillPoints,
    setSkillPoints,
  } = useInitData();
  const shouldAddSkillPoint = (key) => key === "Intelligence";

  const onAttributeValueIncrease = (key) => {
    if (shouldAddSkillPoint(key)) {
      setSkillPoints((prev) => prev + SKILL_POINTS_STEP);
    }

    const totalValue = Object.values(attributes).reduce(
      (prev, curr) => prev + curr.value,
      0
    );

    if (totalValue >= MAX_ATTRIBUTES_POINTS) {
      return alert(
        `Total points of attributes can not be greater than ${MAX_ATTRIBUTES_POINTS}`
      );
    }

    setAttributes((prev) => {
      const value = prev[key].value;

      return {
        ...prev,
        [key]: {
          value:
            value >= INITIAL_ATTRIBUTE_VALUE
              ? value + ATTRIBUTE_INCREMENT_STEP
              : value + ATTRIBUTE_DEDUCT_STEP,
          modifier: prev[key].modifier + 1,
        },
      };
    });
  };

  const onAttributeValueDecrease = (key) => {
    if (key === "Intelligence") {
      setSkillPoints((prev) => prev - SKILL_POINTS_STEP);
    }

    setAttributes((prev) => {
      const value = prev[key].value;

      return {
        ...prev,
        [key]: {
          value:
            value > INITIAL_ATTRIBUTE_VALUE
              ? value - ATTRIBUTE_INCREMENT_STEP
              : value - ATTRIBUTE_DEDUCT_STEP,
          modifier: prev[key].modifier - 1,
        },
      };
    });
  };

  const onSkillAdded = (key) => {
    if (skillPoints <= 0) return;
    setSkills((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: prev[key].value + 1,
      },
    }));
    setSkillPoints((prev) => prev - 1);
  };

  const onSkillDeducted = (key) => {
    if (skills[key].value <= 0) return;

    setSkills((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: prev[key].value - 1,
      },
    }));
    setSkillPoints((prev) => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <Attribute
          attributes={attributes}
          onAdd={onAttributeValueIncrease}
          onDeduct={onAttributeValueDecrease}
        />
        <ClassList classes={CLASS_LIST} attributes={attributes} />
        <Skill
          skills={skills}
          skillPoints={skillPoints}
          onSkillAdded={onSkillAdded}
          onSkillDeducted={onSkillDeducted}
          attributes={attributes}
        />
      </section>
    </div>
  );
}

export default App;
