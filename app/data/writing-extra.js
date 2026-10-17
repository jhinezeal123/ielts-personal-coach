/* Additional original Writing prompts. All Task 1 figures are illustrative. */
(function () {
  "use strict";
  var bank = window.IELTS.data.writing;
  var task1 = [
  {
    "id": "t1-line-extra-internet",
    "type": "line",
    "title": "Internet access by household type",
    "topic": "technology",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The line graph below shows the percentage of households with home internet access in three areas of a fictional country between 2005 and 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "line",
      "title": "Households with home internet access",
      "unit": "%",
      "xLabels": [
        "2005",
        "2010",
        "2015",
        "2020",
        "2025"
      ],
      "series": [
        {
          "name": "City centre",
          "values": [
            45,
            63,
            78,
            91,
            97
          ]
        },
        {
          "name": "Suburbs",
          "values": [
            32,
            51,
            72,
            88,
            95
          ]
        },
        {
          "name": "Rural areas",
          "values": [
            12,
            24,
            46,
            69,
            86
          ]
        }
      ]
    }
  },
  {
    "id": "t1-line-extra-rail",
    "type": "line",
    "title": "Weekday passengers on three rail lines",
    "topic": "travel",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The graph below shows average weekday passenger numbers on three rail lines in the fictional city of Bellford from 2010 to 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "line",
      "title": "Average weekday rail passengers",
      "unit": "thousand passengers",
      "xLabels": [
        "2010",
        "2013",
        "2016",
        "2019",
        "2022",
        "2025"
      ],
      "series": [
        {
          "name": "North line",
          "values": [
            48,
            53,
            65,
            72,
            70,
            81
          ]
        },
        {
          "name": "Coast line",
          "values": [
            38,
            40,
            39,
            47,
            54,
            63
          ]
        },
        {
          "name": "Valley line",
          "values": [
            62,
            58,
            51,
            49,
            48,
            46
          ]
        }
      ]
    }
  },
  {
    "id": "t1-bar-extra-courses",
    "type": "bar",
    "title": "Enrolment in adult evening courses",
    "topic": "education",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The bar chart compares enrolment in five evening-course subjects at a fictional adult education centre in 2015 and 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "bar",
      "title": "Evening-course enrolment",
      "unit": "students",
      "categories": [
        "Languages",
        "Computing",
        "Art",
        "Cooking",
        "Business"
      ],
      "series": [
        {
          "name": "2015",
          "values": [
            160,
            210,
            85,
            70,
            125
          ]
        },
        {
          "name": "2025",
          "values": [
            240,
            175,
            145,
            155,
            120
          ]
        }
      ]
    }
  },
  {
    "id": "t1-bar-extra-waste",
    "type": "bar",
    "title": "Recycling rates in four districts",
    "topic": "environment",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The chart shows the percentage of household waste recycled in four districts of a fictional city in 2012, 2018 and 2024.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "bar",
      "title": "Household waste recycled",
      "unit": "%",
      "categories": [
        "North",
        "South",
        "East",
        "West"
      ],
      "series": [
        {
          "name": "2012",
          "values": [
            22,
            28,
            18,
            34
          ]
        },
        {
          "name": "2018",
          "values": [
            39,
            42,
            31,
            45
          ]
        },
        {
          "name": "2024",
          "values": [
            61,
            57,
            48,
            59
          ]
        }
      ]
    }
  },
  {
    "id": "t1-pie-extra-water",
    "type": "pie",
    "title": "Household water use before and after an efficiency programme",
    "topic": "environment",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The pie charts show the distribution of water use in an average household in a fictional town before and after a water-efficiency programme.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "pie",
      "title": "Distribution of household water use",
      "unit": "%",
      "pies": [
        {
          "label": "Before",
          "slices": [
            {
              "name": "Bathing",
              "value": 35
            },
            {
              "name": "Toilets",
              "value": 27
            },
            {
              "name": "Laundry",
              "value": 20
            },
            {
              "name": "Kitchen",
              "value": 12
            },
            {
              "name": "Garden",
              "value": 6
            }
          ]
        },
        {
          "label": "After",
          "slices": [
            {
              "name": "Bathing",
              "value": 30
            },
            {
              "name": "Toilets",
              "value": 22
            },
            {
              "name": "Laundry",
              "value": 18
            },
            {
              "name": "Kitchen",
              "value": 16
            },
            {
              "name": "Garden",
              "value": 14
            }
          ]
        }
      ]
    }
  },
  {
    "id": "t1-pie-extra-funding",
    "type": "pie",
    "title": "University income sources",
    "topic": "education",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The charts show the proportions of income from five sources at a fictional university in 2000 and 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "pie",
      "title": "University income by source",
      "unit": "%",
      "pies": [
        {
          "label": "2000",
          "slices": [
            {
              "name": "Government",
              "value": 55
            },
            {
              "name": "Tuition",
              "value": 25
            },
            {
              "name": "Research contracts",
              "value": 10
            },
            {
              "name": "Donations",
              "value": 5
            },
            {
              "name": "Other",
              "value": 5
            }
          ]
        },
        {
          "label": "2025",
          "slices": [
            {
              "name": "Government",
              "value": 35
            },
            {
              "name": "Tuition",
              "value": 32
            },
            {
              "name": "Research contracts",
              "value": 20
            },
            {
              "name": "Donations",
              "value": 9
            },
            {
              "name": "Other",
              "value": 4
            }
          ]
        }
      ]
    }
  },
  {
    "id": "t1-table-extra-library",
    "type": "table",
    "title": "Public library use across age groups",
    "topic": "culture",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The table compares library membership and annual borrowing in four age groups in a fictional town in 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "table",
      "title": "Library use by age group, 2025",
      "headers": [
        "Age group",
        "Members (% of age group)",
        "Books borrowed per member/year",
        "Digital items per member/year"
      ],
      "rows": [
        [
          "Under 18",
          "72",
          "28",
          "9"
        ],
        [
          "18–34",
          "48",
          "12",
          "24"
        ],
        [
          "35–59",
          "56",
          "19",
          "17"
        ],
        [
          "60 and over",
          "65",
          "31",
          "8"
        ]
      ]
    }
  },
  {
    "id": "t1-table-extra-fitness",
    "type": "table",
    "title": "Attendance at three fitness centres",
    "topic": "sport",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The table shows the number of members and average monthly visits per member at three fictional fitness centres in 2018 and 2024.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "table",
      "title": "Fitness centre membership and attendance",
      "headers": [
        "Centre",
        "Members 2018",
        "Members 2024",
        "Visits/member 2018",
        "Visits/member 2024"
      ],
      "rows": [
        [
          "Central",
          "850",
          "1,120",
          "5.2",
          "6.8"
        ],
        [
          "Lakeside",
          "620",
          "940",
          "6.1",
          "5.7"
        ],
        [
          "West End",
          "1,050",
          "980",
          "4.8",
          "7.3"
        ]
      ]
    }
  },
  {
    "id": "t1-mixed-extra-commuting",
    "type": "mixed",
    "title": "Cycling infrastructure and commuting choices",
    "topic": "urban",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The bar chart shows spending on cycling infrastructure, and the pie charts show commuting modes, in a fictional city in 2010 and 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "mixed",
      "charts": [
        {
          "kind": "bar",
          "title": "Annual spending on cycling",
          "unit": "million dollars",
          "categories": [
            "2010",
            "2025"
          ],
          "series": [
            {
              "name": "Infrastructure",
              "values": [
                3,
                12
              ]
            }
          ]
        },
        {
          "kind": "pie",
          "title": "Main commuting mode",
          "unit": "%",
          "pies": [
            {
              "label": "2010",
              "slices": [
                {
                  "name": "Car",
                  "value": 62
                },
                {
                  "name": "Public transport",
                  "value": 25
                },
                {
                  "name": "Bicycle",
                  "value": 8
                },
                {
                  "name": "Walking",
                  "value": 5
                }
              ]
            },
            {
              "label": "2025",
              "slices": [
                {
                  "name": "Car",
                  "value": 45
                },
                {
                  "name": "Public transport",
                  "value": 29
                },
                {
                  "name": "Bicycle",
                  "value": 20
                },
                {
                  "name": "Walking",
                  "value": 6
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "id": "t1-mixed-extra-museum",
    "type": "mixed",
    "title": "Museum visitors and satisfaction",
    "topic": "culture",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The charts show annual visitor numbers at a fictional museum from 2020 to 2025 and the results of visitor satisfaction surveys in 2020 and 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "mixed",
      "charts": [
        {
          "kind": "line",
          "title": "Annual museum visitors",
          "unit": "thousand visitors",
          "xLabels": [
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025"
          ],
          "series": [
            {
              "name": "Visitors",
              "values": [
                45,
                38,
                64,
                82,
                96,
                110
              ]
            }
          ]
        },
        {
          "kind": "bar",
          "title": "Visitor satisfaction",
          "unit": "% of respondents",
          "categories": [
            "Very satisfied",
            "Satisfied",
            "Dissatisfied"
          ],
          "series": [
            {
              "name": "2020",
              "values": [
                28,
                44,
                28
              ]
            },
            {
              "name": "2025",
              "values": [
                54,
                36,
                10
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "id": "t1-map-extra-river",
    "type": "map",
    "title": "A riverside site before and after redevelopment",
    "topic": "urban",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The maps show a fictional riverside site in 2000 and after redevelopment in 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "map",
      "maps": [
        {
          "label": "2000",
          "features": [
            {
              "type": "water",
              "x": 85,
              "y": 0,
              "w": 15,
              "h": 70,
              "label": "River"
            },
            {
              "type": "road",
              "x": 0,
              "y": 32,
              "w": 100,
              "h": 6,
              "label": "Main road"
            },
            {
              "type": "building",
              "x": 7,
              "y": 7,
              "w": 27,
              "h": 18,
              "label": "Warehouse"
            },
            {
              "type": "building",
              "x": 47,
              "y": 7,
              "w": 27,
              "h": 18,
              "label": "Factory"
            },
            {
              "type": "carpark",
              "x": 7,
              "y": 45,
              "w": 27,
              "h": 18,
              "label": "Parking"
            },
            {
              "type": "building",
              "x": 47,
              "y": 45,
              "w": 27,
              "h": 18,
              "label": "Offices"
            }
          ]
        },
        {
          "label": "2025",
          "features": [
            {
              "type": "water",
              "x": 85,
              "y": 0,
              "w": 15,
              "h": 70,
              "label": "River"
            },
            {
              "type": "road",
              "x": 0,
              "y": 32,
              "w": 100,
              "h": 6,
              "label": "Main road"
            },
            {
              "type": "building",
              "x": 7,
              "y": 7,
              "w": 27,
              "h": 18,
              "label": "Arts centre"
            },
            {
              "type": "park",
              "x": 47,
              "y": 7,
              "w": 27,
              "h": 18,
              "label": "Garden"
            },
            {
              "type": "carpark",
              "x": 7,
              "y": 45,
              "w": 27,
              "h": 18,
              "label": "Parking"
            },
            {
              "type": "building",
              "x": 47,
              "y": 45,
              "w": 27,
              "h": 18,
              "label": "Apartments"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "t1-map-extra-campus",
    "type": "map",
    "title": "Changes to a small college campus",
    "topic": "education",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The plans show the layout of a fictional college campus in 2010 and 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "map",
      "maps": [
        {
          "label": "2010",
          "features": [
            {
              "type": "road",
              "x": 0,
              "y": 31,
              "w": 100,
              "h": 7,
              "label": "Campus road"
            },
            {
              "type": "building",
              "x": 7,
              "y": 6,
              "w": 25,
              "h": 18,
              "label": "Library"
            },
            {
              "type": "building",
              "x": 43,
              "y": 6,
              "w": 25,
              "h": 18,
              "label": "Teaching"
            },
            {
              "type": "carpark",
              "x": 7,
              "y": 46,
              "w": 25,
              "h": 18,
              "label": "Parking"
            },
            {
              "type": "park",
              "x": 43,
              "y": 46,
              "w": 25,
              "h": 18,
              "label": "Lawn"
            }
          ]
        },
        {
          "label": "2025",
          "features": [
            {
              "type": "road",
              "x": 0,
              "y": 31,
              "w": 100,
              "h": 7,
              "label": "Campus road"
            },
            {
              "type": "building",
              "x": 7,
              "y": 6,
              "w": 25,
              "h": 18,
              "label": "Library"
            },
            {
              "type": "building",
              "x": 43,
              "y": 6,
              "w": 25,
              "h": 18,
              "label": "Teaching"
            },
            {
              "type": "building",
              "x": 75,
              "y": 6,
              "w": 22,
              "h": 18,
              "label": "New lab"
            },
            {
              "type": "park",
              "x": 7,
              "y": 46,
              "w": 25,
              "h": 18,
              "label": "Garden"
            },
            {
              "type": "building",
              "x": 43,
              "y": 46,
              "w": 25,
              "h": 18,
              "label": "Sports hall"
            },
            {
              "type": "carpark",
              "x": 75,
              "y": 46,
              "w": 22,
              "h": 18,
              "label": "Parking"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "t1-process-extra-rainwater",
    "type": "process",
    "title": "Collecting rainwater for garden irrigation",
    "topic": "environment",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The diagram illustrates a simplified system for collecting and using rainwater to irrigate a garden.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "process",
      "title": "Rainwater collection for a garden",
      "cyclic": false,
      "steps": [
        {
          "label": "Collection",
          "note": "Rain falls on the roof"
        },
        {
          "label": "Gutters",
          "note": "Water flows along gutters"
        },
        {
          "label": "Screening",
          "note": "Leaves and large debris removed"
        },
        {
          "label": "Storage",
          "note": "Water enters a covered tank"
        },
        {
          "label": "Pumping",
          "note": "A pump moves stored water"
        },
        {
          "label": "Irrigation",
          "note": "Water reaches garden beds"
        }
      ]
    }
  },
  {
    "id": "t1-process-extra-glass",
    "type": "process",
    "title": "Recycling glass bottles",
    "topic": "environment",
    "addedOn": "2026-10",
    "source": "Biên soạn cho luyện tập; số liệu và địa điểm minh họa, không phải đề thi thật.",
    "prompt": "The diagram shows a simplified process for turning used glass bottles into new bottles.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.",
    "chart": {
      "kind": "process",
      "title": "Glass-bottle recycling",
      "cyclic": true,
      "steps": [
        {
          "label": "Collection",
          "note": "Used bottles deposited"
        },
        {
          "label": "Sorting",
          "note": "Separated by colour"
        },
        {
          "label": "Cleaning",
          "note": "Contaminants removed"
        },
        {
          "label": "Crushing",
          "note": "Glass broken into small pieces"
        },
        {
          "label": "Melting",
          "note": "Crushed glass heated"
        },
        {
          "label": "Moulding",
          "note": "Molten glass shaped"
        },
        {
          "label": "Distribution",
          "note": "New bottles sent for filling"
        }
      ]
    }
  }
];
  var task2 = [
  {
    "id": "t2-opinion-extra-repair",
    "type": "opinion",
    "title": "Repairable consumer electronics",
    "topic": "technology",
    "prompt": "Manufacturers should be required to design electronic products that can be repaired easily. To what extent do you agree or disagree?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Longer product life can reduce electronic waste",
        "Replaceable components can lower lifetime costs",
        "Published repair information can support independent businesses"
      ],
      "against": [
        "Some compact designs are difficult to make modular",
        "Regulation should allow justified safety restrictions",
        "Requirements need to be practical for small manufacturers"
      ]
    },
    "collocations": [
      {
        "word": "product lifespan",
        "vi": "tuổi thọ sản phẩm"
      },
      {
        "word": "planned obsolescence",
        "vi": "sự lỗi thời có chủ đích"
      },
      {
        "word": "replacement parts",
        "vi": "linh kiện thay thế"
      },
      {
        "word": "independent repairers",
        "vi": "thợ sửa độc lập"
      },
      {
        "word": "lifetime costs",
        "vi": "chi phí trong toàn bộ vòng đời"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-opinion-extra-libraries",
    "type": "opinion",
    "title": "Funding public lending libraries",
    "topic": "culture",
    "prompt": "Local governments should give greater priority to public libraries when allocating money for community services. To what extent do you agree or disagree?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Libraries provide access to information regardless of income",
        "Study space helps people without quiet rooms at home",
        "Digital assistance can improve access to public services"
      ],
      "against": [
        "Urgent housing and transport needs also require funding",
        "Libraries should show that services meet local demand",
        "Partnerships can share the cost of specialist activities"
      ]
    },
    "collocations": [
      {
        "word": "public funding",
        "vi": "nguồn tài trợ công"
      },
      {
        "word": "equal access",
        "vi": "khả năng tiếp cận bình đẳng"
      },
      {
        "word": "community facilities",
        "vi": "cơ sở phục vụ cộng đồng"
      },
      {
        "word": "digital literacy",
        "vi": "năng lực sử dụng công nghệ số"
      },
      {
        "word": "budget allocation",
        "vi": "việc phân bổ ngân sách"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-opinion-extra-shorter-week",
    "type": "opinion",
    "title": "A shorter standard working week",
    "topic": "work",
    "prompt": "A shorter standard working week would benefit both employees and employers. To what extent do you agree or disagree?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "More recovery time can reduce fatigue",
        "Focused schedules can remove unnecessary meetings",
        "Flexibility may improve recruitment and staff retention"
      ],
      "against": [
        "Continuous services still require enough staffing",
        "Some jobs cannot compress the same output into fewer hours",
        "Pay arrangements should not increase insecurity"
      ]
    },
    "collocations": [
      {
        "word": "working arrangements",
        "vi": "cách tổ chức làm việc"
      },
      {
        "word": "staff retention",
        "vi": "khả năng giữ nhân viên"
      },
      {
        "word": "workload distribution",
        "vi": "sự phân chia khối lượng công việc"
      },
      {
        "word": "employee well-being",
        "vi": "sức khỏe và đời sống nhân viên"
      },
      {
        "word": "service coverage",
        "vi": "khả năng duy trì dịch vụ"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-opinion-extra-children-adverts",
    "type": "opinion",
    "title": "Advertising aimed at young children",
    "topic": "media",
    "prompt": "Advertisements aimed directly at young children should be banned. To what extent do you agree or disagree?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Young children may struggle to recognise persuasive intent",
        "Advertising can create pressure on family spending",
        "Schools should remain focused on learning"
      ],
      "against": [
        "A total ban may be hard to apply across online platforms",
        "Parents also need tools and information",
        "Clear limits may be more workable than banning all messages"
      ]
    },
    "collocations": [
      {
        "word": "persuasive intent",
        "vi": "ý định thuyết phục"
      },
      {
        "word": "commercial pressure",
        "vi": "áp lực thương mại"
      },
      {
        "word": "parental guidance",
        "vi": "sự hướng dẫn của cha mẹ"
      },
      {
        "word": "consumer awareness",
        "vi": "nhận thức của người tiêu dùng"
      },
      {
        "word": "age-appropriate content",
        "vi": "nội dung phù hợp lứa tuổi"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-opinion-extra-school-gardens",
    "type": "opinion",
    "title": "Practical gardening at school",
    "topic": "education",
    "prompt": "All secondary schools should include practical gardening in their curriculum. To what extent do you agree or disagree?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Hands-on tasks can connect science with daily life",
        "Shared responsibilities can encourage cooperation",
        "Students can learn about food and resource use"
      ],
      "against": [
        "Some schools lack safe outdoor space",
        "A compulsory subject can crowd an already full curriculum",
        "Flexible projects may achieve similar goals"
      ]
    },
    "collocations": [
      {
        "word": "hands-on learning",
        "vi": "học qua thực hành"
      },
      {
        "word": "curriculum pressure",
        "vi": "áp lực chương trình học"
      },
      {
        "word": "shared responsibility",
        "vi": "trách nhiệm chung"
      },
      {
        "word": "practical skills",
        "vi": "kỹ năng thực tế"
      },
      {
        "word": "resource constraints",
        "vi": "hạn chế về nguồn lực"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-discussion-extra-specialisation",
    "type": "discussion",
    "title": "Broad education or early specialisation",
    "topic": "education",
    "prompt": "Some people think students should study a wide range of subjects until they leave school. Others believe students should specialise earlier in subjects related to their future careers. Discuss both views and give your own opinion.\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Broad study keeps options open as interests change",
        "Different subjects can strengthen transferable skills",
        "Students may discover talents they had not expected"
      ],
      "against": [
        "Specialisation allows deeper preparation for demanding courses",
        "Motivated learners may benefit from more relevant work",
        "Flexible pathways can combine a core curriculum with electives"
      ]
    },
    "collocations": [
      {
        "word": "early specialisation",
        "vi": "chuyên môn hóa sớm"
      },
      {
        "word": "transferable skills",
        "vi": "kỹ năng có thể vận dụng ở nhiều lĩnh vực"
      },
      {
        "word": "academic breadth",
        "vi": "bề rộng kiến thức học thuật"
      },
      {
        "word": "career aspirations",
        "vi": "nguyện vọng nghề nghiệp"
      },
      {
        "word": "elective subjects",
        "vi": "môn học tự chọn"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-discussion-extra-historic-centres",
    "type": "discussion",
    "title": "Cars in historic city centres",
    "topic": "urban",
    "prompt": "Some people believe cars should be banned from historic city centres. Others argue that this would make daily life too difficult for residents and businesses. Discuss both views and give your opinion.\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Less traffic can protect the visitor experience",
        "Walking routes can make public space more usable",
        "Restrictions can reduce local noise"
      ],
      "against": [
        "Residents and deliveries still need practical access",
        "People with limited mobility may need alternatives",
        "Timed access permits can balance conflicting needs"
      ]
    },
    "collocations": [
      {
        "word": "pedestrian access",
        "vi": "lối tiếp cận dành cho người đi bộ"
      },
      {
        "word": "delivery restrictions",
        "vi": "hạn chế giao hàng"
      },
      {
        "word": "historic districts",
        "vi": "khu phố lịch sử"
      },
      {
        "word": "mobility needs",
        "vi": "nhu cầu đi lại"
      },
      {
        "word": "timed permits",
        "vi": "giấy phép theo khung giờ"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-discussion-extra-zoos",
    "type": "discussion",
    "title": "The role of modern zoos",
    "topic": "animals",
    "prompt": "Some people think modern zoos play an important role in conservation. Others believe wildlife protection should focus entirely on natural habitats. Discuss both views and give your opinion.\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Some programmes can support endangered species",
        "Education can connect visitors with conservation issues",
        "Specialist care and research can have a supporting role"
      ],
      "against": [
        "Habitat protection benefits whole ecosystems",
        "Captivity raises welfare concerns",
        "Funding priorities should reflect conservation outcomes"
      ]
    },
    "collocations": [
      {
        "word": "captive breeding",
        "vi": "nhân giống trong điều kiện nuôi nhốt"
      },
      {
        "word": "animal welfare",
        "vi": "phúc lợi động vật"
      },
      {
        "word": "habitat protection",
        "vi": "bảo vệ sinh cảnh"
      },
      {
        "word": "conservation outcomes",
        "vi": "kết quả bảo tồn"
      },
      {
        "word": "endangered species",
        "vi": "loài có nguy cơ tuyệt chủng"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-discussion-extra-borrow-devices",
    "type": "discussion",
    "title": "Libraries lending tools and devices",
    "topic": "society",
    "prompt": "Some people think public libraries should lend tools and electronic devices as well as books. Others believe libraries should focus on reading and information. Discuss both views and give your opinion.\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Shared devices can expand access for low-income users",
        "Occasionally used tools need not be purchased by every family",
        "Practical workshops can bring communities together"
      ],
      "against": [
        "Inspection and maintenance create additional work",
        "Funding should not weaken core reading services",
        "A small collection based on local demand can test feasibility"
      ]
    },
    "collocations": [
      {
        "word": "shared resources",
        "vi": "nguồn lực dùng chung"
      },
      {
        "word": "maintenance costs",
        "vi": "chi phí bảo trì"
      },
      {
        "word": "core services",
        "vi": "dịch vụ cốt lõi"
      },
      {
        "word": "local demand",
        "vi": "nhu cầu tại địa phương"
      },
      {
        "word": "lending scheme",
        "vi": "chương trình cho mượn"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-discussion-extra-exploration",
    "type": "discussion",
    "title": "Space exploration and ocean research",
    "topic": "science",
    "prompt": "Some people believe governments should spend more on space exploration, while others think exploring the oceans is more important. Discuss both views and give your own opinion.\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "for": [
        "Space missions can develop observation and engineering capabilities",
        "International projects can share knowledge",
        "Long-term scientific questions may justify public support"
      ],
      "against": [
        "Ocean research can address problems close to human communities",
        "Marine ecosystems remain important to food and livelihoods",
        "Budgets can support complementary questions in both areas"
      ]
    },
    "collocations": [
      {
        "word": "scientific priorities",
        "vi": "ưu tiên khoa học"
      },
      {
        "word": "research funding",
        "vi": "tài trợ nghiên cứu"
      },
      {
        "word": "marine ecosystems",
        "vi": "hệ sinh thái biển"
      },
      {
        "word": "international collaboration",
        "vi": "hợp tác quốc tế"
      },
      {
        "word": "long-term benefits",
        "vi": "lợi ích dài hạn"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-advdis-extra-subscriptions",
    "type": "advdis",
    "title": "Accessing products through subscriptions",
    "topic": "economy",
    "prompt": "Many people now pay subscriptions to use products or services rather than buying them outright. Do the advantages of this development outweigh the disadvantages?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "advantages": [
        "Lower initial costs can make occasional access affordable",
        "Updates and maintenance may be included",
        "Users can change services when their needs change"
      ],
      "disadvantages": [
        "Small recurring fees can accumulate",
        "Access may disappear when payments stop",
        "Cancellation and data portability can be difficult"
      ]
    },
    "collocations": [
      {
        "word": "recurring fees",
        "vi": "phí định kỳ"
      },
      {
        "word": "upfront costs",
        "vi": "chi phí trả trước"
      },
      {
        "word": "long-term commitment",
        "vi": "cam kết dài hạn"
      },
      {
        "word": "subscription model",
        "vi": "mô hình đăng ký thuê bao"
      },
      {
        "word": "financial flexibility",
        "vi": "sự linh hoạt tài chính"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-advdis-extra-remote-places",
    "type": "advdis",
    "title": "Working remotely from smaller towns",
    "topic": "work",
    "prompt": "More employees are choosing to work remotely from smaller towns instead of living near large city offices. Do the advantages outweigh the disadvantages?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "advantages": [
        "Housing may be more affordable",
        "Workers can avoid long daily commutes",
        "Spending can support smaller local economies"
      ],
      "disadvantages": [
        "Reliable connectivity is not available everywhere",
        "New arrivals can increase pressure on housing",
        "Career development may be harder without informal contact"
      ]
    },
    "collocations": [
      {
        "word": "remote employment",
        "vi": "việc làm từ xa"
      },
      {
        "word": "housing affordability",
        "vi": "khả năng chi trả nhà ở"
      },
      {
        "word": "reliable connectivity",
        "vi": "kết nối mạng ổn định"
      },
      {
        "word": "local services",
        "vi": "dịch vụ địa phương"
      },
      {
        "word": "informal interaction",
        "vi": "tương tác không chính thức"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-advdis-extra-short-breaks",
    "type": "advdis",
    "title": "Frequent short tourist trips",
    "topic": "travel",
    "prompt": "Instead of taking one long holiday each year, some people take several short trips. Do the advantages outweigh the disadvantages?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "advantages": [
        "Short breaks can fit varied work schedules",
        "Travellers can experience a range of destinations",
        "More regular rest can be easier to organise"
      ],
      "disadvantages": [
        "Repeated travel can add cost and emissions",
        "Brief visits may encourage superficial tourism",
        "Frequent planning can reduce the time spent resting"
      ]
    },
    "collocations": [
      {
        "word": "short breaks",
        "vi": "kỳ nghỉ ngắn"
      },
      {
        "word": "travel expenses",
        "vi": "chi phí đi lại"
      },
      {
        "word": "superficial experience",
        "vi": "trải nghiệm hời hợt"
      },
      {
        "word": "flexible schedules",
        "vi": "lịch trình linh hoạt"
      },
      {
        "word": "environmental impact",
        "vi": "tác động đến môi trường"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-advdis-extra-cashless",
    "type": "advdis",
    "title": "Cashless payment at school cafeterias",
    "topic": "economy",
    "prompt": "Some schools have introduced cashless payment systems in their cafeterias. Do the advantages outweigh the disadvantages?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "advantages": [
        "Queues may be easier to manage",
        "Families can monitor spending",
        "Children need not carry cash"
      ],
      "disadvantages": [
        "System failures can interrupt access to food",
        "Families without suitable accounts may be excluded",
        "Payment records require careful handling"
      ]
    },
    "collocations": [
      {
        "word": "cashless transactions",
        "vi": "giao dịch không dùng tiền mặt"
      },
      {
        "word": "spending limits",
        "vi": "giới hạn chi tiêu"
      },
      {
        "word": "technical failure",
        "vi": "sự cố kỹ thuật"
      },
      {
        "word": "financial inclusion",
        "vi": "sự tiếp cận dịch vụ tài chính"
      },
      {
        "word": "personal data",
        "vi": "dữ liệu cá nhân"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-advdis-extra-recordings",
    "type": "advdis",
    "title": "Recorded university lectures",
    "topic": "education",
    "prompt": "Universities increasingly make recordings of lectures available to students. Do the advantages outweigh the disadvantages?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "advantages": [
        "Students can revisit difficult material",
        "Recordings can support learners with competing commitments",
        "A transcript can make material easier to search"
      ],
      "disadvantages": [
        "Some students may postpone all study",
        "Recording does not replace interactive teaching",
        "Privacy and permissions require clear arrangements"
      ]
    },
    "collocations": [
      {
        "word": "recorded lectures",
        "vi": "bài giảng ghi hình"
      },
      {
        "word": "self-paced study",
        "vi": "việc học theo tốc độ cá nhân"
      },
      {
        "word": "active participation",
        "vi": "sự tham gia tích cực"
      },
      {
        "word": "accessibility needs",
        "vi": "nhu cầu tiếp cận"
      },
      {
        "word": "study discipline",
        "vi": "kỷ luật học tập"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-problem-extra-night",
    "type": "problem",
    "title": "Increasing light pollution",
    "topic": "urban",
    "prompt": "In many places, artificial light makes the night sky difficult to see. What problems can this cause, and what measures could reduce these problems?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "q1": [
        "Glare can reduce visual comfort",
        "Unwanted light can disturb homes and natural environments",
        "Communities may lose access to a dark night sky"
      ],
      "q2": [
        "Direct light towards the intended task",
        "Use appropriate operating hours and controls",
        "Review installations with local residents"
      ]
    },
    "collocations": [
      {
        "word": "light pollution",
        "vi": "ô nhiễm ánh sáng"
      },
      {
        "word": "unwanted glare",
        "vi": "ánh chói không mong muốn"
      },
      {
        "word": "outdoor lighting",
        "vi": "chiếu sáng ngoài trời"
      },
      {
        "word": "operating hours",
        "vi": "giờ hoạt động"
      },
      {
        "word": "targeted measures",
        "vi": "biện pháp có mục tiêu"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-problem-extra-repair-skills",
    "type": "problem",
    "title": "Declining repair skills",
    "topic": "work",
    "prompt": "Many people replace household products instead of repairing them. Why is this happening, and what could be done to encourage repair?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "causes": [
        "Replacement can appear cheaper than specialist labour",
        "Products may be difficult to open or lack parts",
        "Users may lack confidence and guidance"
      ],
      "solutions": [
        "Provide accessible repair information and parts",
        "Offer practical training and supervised workshops",
        "Consider repairability in purchasing decisions"
      ]
    },
    "collocations": [
      {
        "word": "repair skills",
        "vi": "kỹ năng sửa chữa"
      },
      {
        "word": "spare parts",
        "vi": "phụ tùng thay thế"
      },
      {
        "word": "labour costs",
        "vi": "chi phí nhân công"
      },
      {
        "word": "consumer confidence",
        "vi": "sự tự tin của người tiêu dùng"
      },
      {
        "word": "product design",
        "vi": "thiết kế sản phẩm"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-problem-extra-water-loss",
    "type": "problem",
    "title": "Water wasted through leaks",
    "topic": "environment",
    "prompt": "Some towns lose substantial amounts of treated water through leaking pipes. What difficulties can this create, and how could towns address them?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "q1": [
        "Lost water reduces the reliability of supply",
        "Emergency repairs can disrupt roads and services",
        "Treating water that is never delivered wastes resources"
      ],
      "q2": [
        "Use monitoring to prioritise maintenance",
        "Replace vulnerable sections in planned stages",
        "Coordinate roadwork with other infrastructure teams"
      ]
    },
    "collocations": [
      {
        "word": "water losses",
        "vi": "thất thoát nước"
      },
      {
        "word": "preventive maintenance",
        "vi": "bảo trì phòng ngừa"
      },
      {
        "word": "supply reliability",
        "vi": "độ ổn định nguồn cung"
      },
      {
        "word": "ageing infrastructure",
        "vi": "hạ tầng xuống cấp theo thời gian"
      },
      {
        "word": "phased investment",
        "vi": "đầu tư theo giai đoạn"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-problem-extra-recycling",
    "type": "problem",
    "title": "Confusion about recycling rules",
    "topic": "environment",
    "prompt": "People are often unsure which household items can be recycled locally. What causes this confusion, and how can it be reduced?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "causes": [
        "Packaging labels and local collection rules may differ",
        "Instructions can change without clear communication",
        "Complex material combinations are difficult to classify"
      ],
      "solutions": [
        "Give examples of common local items",
        "Use consistent labels at collection points",
        "Explain changes through multiple accessible channels"
      ]
    },
    "collocations": [
      {
        "word": "recycling guidelines",
        "vi": "hướng dẫn tái chế"
      },
      {
        "word": "clear labelling",
        "vi": "ghi nhãn rõ ràng"
      },
      {
        "word": "household waste",
        "vi": "rác sinh hoạt"
      },
      {
        "word": "collection points",
        "vi": "điểm thu gom"
      },
      {
        "word": "public awareness",
        "vi": "nhận thức của công chúng"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-problem-extra-consultations",
    "type": "problem",
    "title": "Low participation in local consultations",
    "topic": "government",
    "prompt": "Local governments sometimes receive little public participation when seeking opinions about new projects. Why might this happen, and what can they do to improve participation?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "causes": [
        "Meetings may conflict with work or care responsibilities",
        "Technical language can discourage residents",
        "People may feel that decisions are already final"
      ],
      "solutions": [
        "Offer varied times and online and offline responses",
        "Explain concrete choices in plain language",
        "Show how public feedback changes proposals"
      ]
    },
    "collocations": [
      {
        "word": "public consultation",
        "vi": "tham vấn cộng đồng"
      },
      {
        "word": "meaningful participation",
        "vi": "sự tham gia thực chất"
      },
      {
        "word": "plain language",
        "vi": "ngôn ngữ dễ hiểu"
      },
      {
        "word": "feedback channels",
        "vi": "kênh phản hồi"
      },
      {
        "word": "decision-making process",
        "vi": "quy trình ra quyết định"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-twopart-extra-citizen-science",
    "type": "twopart",
    "title": "Volunteers collecting scientific observations",
    "topic": "science",
    "prompt": "More members of the public are helping scientists collect observations about their surroundings. Why are people interested in these projects? What makes such projects useful?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "q1": [
        "Participants can learn about local environments",
        "A shared task can build social connections",
        "People may want to contribute to decisions affecting their area"
      ],
      "q2": [
        "Clear methods make records comparable",
        "Training and feedback help maintain quality",
        "Volunteers can cover places researchers cannot visit frequently"
      ]
    },
    "collocations": [
      {
        "word": "citizen science",
        "vi": "khoa học có sự tham gia của công dân"
      },
      {
        "word": "consistent methods",
        "vi": "phương pháp nhất quán"
      },
      {
        "word": "data quality",
        "vi": "chất lượng dữ liệu"
      },
      {
        "word": "local observations",
        "vi": "quan sát tại địa phương"
      },
      {
        "word": "volunteer participation",
        "vi": "sự tham gia tình nguyện"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-twopart-extra-rental",
    "type": "twopart",
    "title": "Renting items for special occasions",
    "topic": "economy",
    "prompt": "Some people prefer to rent clothes and equipment for special occasions rather than buy them. Why is this becoming attractive? Is it a positive development?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "q1": [
        "Users may need the item only once",
        "Online services make selection easier",
        "Renting can reduce the need for storage"
      ],
      "q2": [
        "Positive: sharing can avoid some unnecessary purchases",
        "Negative: cleaning and transport also consume resources",
        "Good terms and durable products matter more than the label alone"
      ]
    },
    "collocations": [
      {
        "word": "occasional use",
        "vi": "việc sử dụng không thường xuyên"
      },
      {
        "word": "rental services",
        "vi": "dịch vụ cho thuê"
      },
      {
        "word": "storage space",
        "vi": "không gian lưu trữ"
      },
      {
        "word": "wear and tear",
        "vi": "hao mòn do sử dụng"
      },
      {
        "word": "responsible consumption",
        "vi": "tiêu dùng có trách nhiệm"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-twopart-extra-secondhand",
    "type": "twopart",
    "title": "Buying and selling second-hand goods",
    "topic": "society",
    "prompt": "Buying and selling second-hand goods online has become more common. What explains this change? How might it affect people's attitudes towards possessions?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "q1": [
        "Online search connects buyers with specific needs",
        "People may seek lower prices or additional income",
        "Collection and delivery services can make exchanges convenient"
      ],
      "q2": [
        "People may think more about resale value",
        "Goods can be viewed as reusable resources",
        "Easy resale may also encourage frequent replacement"
      ]
    },
    "collocations": [
      {
        "word": "second-hand market",
        "vi": "thị trường đồ đã qua sử dụng"
      },
      {
        "word": "resale value",
        "vi": "giá trị bán lại"
      },
      {
        "word": "material possessions",
        "vi": "tài sản vật chất"
      },
      {
        "word": "convenient exchanges",
        "vi": "giao dịch thuận tiện"
      },
      {
        "word": "consumption habits",
        "vi": "thói quen tiêu dùng"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-twopart-extra-audio",
    "type": "twopart",
    "title": "Listening to books and long-form audio",
    "topic": "media",
    "prompt": "Some people now listen to books and educational programmes more often than they read printed material. Why might they choose audio? Does this change how people learn?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "q1": [
        "Audio can fit travel and household routines",
        "Some listeners find spoken explanations engaging",
        "Digital access makes a large catalogue convenient"
      ],
      "q2": [
        "Benefits depend on attention and the type of material",
        "Difficult ideas may need replay or written notes",
        "Audio can complement rather than replace reading"
      ]
    },
    "collocations": [
      {
        "word": "spoken explanations",
        "vi": "lời giải thích bằng lời nói"
      },
      {
        "word": "divided attention",
        "vi": "sự chú ý bị phân tán"
      },
      {
        "word": "active listening",
        "vi": "lắng nghe chủ động"
      },
      {
        "word": "learning preferences",
        "vi": "sở thích học tập"
      },
      {
        "word": "complementary formats",
        "vi": "các hình thức bổ sung cho nhau"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  },
  {
    "id": "t2-twopart-extra-roofs",
    "type": "twopart",
    "title": "Gardens on urban rooftops",
    "topic": "urban",
    "prompt": "Some cities encourage owners to turn suitable rooftops into gardens. Why might cities support this idea? What practical issues should be considered?\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
    "ideas": {
      "q1": [
        "Additional vegetation can improve use of limited space",
        "Shared gardens can offer local recreation",
        "Projects can create opportunities for environmental education"
      ],
      "q2": [
        "Buildings need suitable structural assessment",
        "Access and continuing maintenance require planning",
        "Responsibility and funding should be agreed before construction"
      ]
    },
    "collocations": [
      {
        "word": "rooftop gardens",
        "vi": "vườn trên mái"
      },
      {
        "word": "structural suitability",
        "vi": "sự phù hợp về kết cấu"
      },
      {
        "word": "ongoing maintenance",
        "vi": "bảo trì liên tục"
      },
      {
        "word": "limited urban space",
        "vi": "không gian đô thị hạn chế"
      },
      {
        "word": "shared responsibility",
        "vi": "trách nhiệm chung"
      }
    ],
    "source": "Biên soạn cho luyện tập; không phải câu hỏi thi thật được xác nhận.",
    "addedOn": "2026-10"
  }
];
  Array.prototype.push.apply(bank.task1Prompts, task1);
  Array.prototype.push.apply(bank.task2Prompts, task2);
})();
