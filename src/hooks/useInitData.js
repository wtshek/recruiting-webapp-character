import { useEffect, useState } from "react";
import { ATTRIBUTE_LIST, SKILL_LIST } from "../consts.js";

const SAVED_DATA_URL =
  "https://recruiting.verylongdomaintotestwith.ca/api/{shek_119}/character ";

export const INITIAL_ATTRIBUTE_VALUE = 10;

export const INITIAL_MODIFIER_VALUE = 0;
export const INITIAL_SKILL_POINTS = 10;
export const INITIAL_SKILL_VALUE = 0;

export const useInitData = () => {
  const [attributes, setAttributes] = useState(
    ATTRIBUTE_LIST.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: {
          value: INITIAL_ATTRIBUTE_VALUE,
          modifier: INITIAL_MODIFIER_VALUE,
          key: curr,
        },
      }),
      {}
    )
  );

  const [skills, setSkills] = useState(
    SKILL_LIST.reduce((prev, curr) => {
      const key = curr.name;
      return { ...prev, [key]: { ...curr, value: INITIAL_SKILL_VALUE, key } };
    }, {})
  );

  const [skillPoints, setSkillPoints] = useState(INITIAL_SKILL_POINTS);

  useEffect(() => {
    const getSavedData = async () => {
      const res = await fetch(SAVED_DATA_URL);

      const { body, statusCode } = await res.json();
      if (statusCode !== 200) return;

      const { attributes, skills, skillPoints } = body || {};

      setSkillPoints(skillPoints);
      setAttributes(attributes);
      setSkills(skills);
    };

    getSavedData();
  }, []);

  useEffect(() => {
    return () => {
      fetch(SAVED_DATA_URL, {
        method: "POST",
        body: JSON.stringify({
          attributes,
          skills,
          skillPoints,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    };
  }, [attributes, skillPoints, skills]);

  return {
    attributes,
    setAttributes,
    skills,
    setSkills,
    skillPoints,
    setSkillPoints,
  };
};
