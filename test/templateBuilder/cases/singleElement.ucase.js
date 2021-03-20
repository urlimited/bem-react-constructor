const description = "Single element"

const useCase = [
  {
    "type": "section",
    "classes": ["classOne", "class_two"]
  }
]

const check = "<p class=\"classOne class_two\">Section</p>";

module.exports = {
  useCase,
  check,
  description
};