const SKILL_LEVEL_MAPPING = {
  1: "Fundamental",
  2: "Limited",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

const SKILL_LEVEL_COLOR_MAPPING = {
  1: "default",
  2: "primary",
  3: "success",
  4: "secondary",
  5: "warning",
};

const AUTHENTICATED = "authenticated";

const NEXT_AUTH_STATE = {
  AUTHENTICATED,
};

const SKILLS = [];

for (let [key, value] of Object.entries(SKILL_LEVEL_MAPPING)) {
  console.log(key, value);
  SKILLS.push({
    id: key,
    name: value,
  });
}

const CONSTANTS = {
  SKILL_LEVEL_MAPPING,
  SKILL_LEVEL_COLOR_MAPPING,
  NEXT_AUTH_STATE,
  SKILLS
};

export default CONSTANTS;
