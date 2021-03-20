const description = "Element with children"

const useCase = [
  {
    "type": "section",
    "classes": ["red", "yellow-green", "blUe"],
    "children": [
      {
        "type": "link",
        "children": [
          {
            "type": "link"
          }
        ]
      },
      {
        "type": "section"
      }
    ]
  },
  {
    "type": "link",
    "classes": ["awdwad", "qwerty"],
    "children": [
      {
        "type": "link"
      },
      {
        "type": "section"
      }
    ]
  }
]

const check = "<p class=\"red yellow-green blUe\">Section</p><div><p class=\"\">Link</p><div><p class=\"\">Link</p></div></div><div><p class=\"\">Section</p></div><p class=\"awdwad qwerty\">Link</p><div><p class=\"\">Link</p></div><div><p class=\"\">Section</p></div>";

module.exports = {
  useCase,
  check,
  description
};