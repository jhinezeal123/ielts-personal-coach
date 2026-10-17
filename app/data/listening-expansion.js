/* 8 additional full tests with original scripts. Rebuild: node scripts/build-listening-expansion.mjs */
(function(){"use strict";
var tests = [
  {
    "id": "L5",
    "title": "Practice Test 5 — Outdoor Visits & Seed Collections",
    "source": "Biên soạn cho luyện tập · audio TTS · không phải đề thi thật",
    "provenance": {
      "kind": "original",
      "addedOn": "2026-10-16"
    },
    "sections": [
      {
        "id": "L5-S1",
        "part": 1,
        "title": "Booking a beginner kayaking session",
        "context": "A visitor phones an outdoor centre to arrange a group activity.",
        "audio": null,
        "script": [
          {
            "speaker": "Adviser",
            "voice": "f",
            "text": "Good morning, West Lake Outdoor Centre. You're speaking to Anna. If you're asking about the sailing course, I'm afraid the weekend places have gone, but we have space in the beginner kayaking sessions. Those take place on the sheltered part of the lake, and you don't need to have used a kayak before. What sort of group would you be bringing?",
            "q": []
          },
          {
            "speaker": "Visitor",
            "voice": "m",
            "text": "There would be four of us, all adults. I looked at sailing first, but kayaking sounds more suitable. My surname is Collins, that's C-O-L-L-I-N-S. Could we come on Saturday? I know your leaflet mentions a Sunday session, but one of us works then. We would prefer the morning if there's a choice, as we're travelling home that evening.",
            "q": [
              1,
              2
            ]
          },
          {
            "speaker": "Adviser",
            "voice": "f",
            "text": "Saturday is fine. The session starts at nine forty-five, not nine fifteen as the old website page says. Please be here twenty minutes before that so we can fit your equipment. The price is sixty-eight pounds for the group. You may have seen eighty pounds advertised, but that includes lunch, and lunch isn't part of this particular booking.",
            "q": [
              3,
              4
            ]
          },
          {
            "speaker": "Visitor",
            "voice": "m",
            "text": "That's within our budget. I'm just writing it down. Do we need to bring anything special? I've got a waterproof jacket, but the others only have light raincoats. Also, a friend told me that some water activities require proof that you can swim a particular distance. None of us would describe ourselves as strong swimmers, although we're comfortable in the water.",
            "q": []
          },
          {
            "speaker": "Adviser",
            "voice": "f",
            "text": "We provide jackets and buoyancy aids, so don't buy anything specially. Bring a towel, because the changing rooms have showers but we don't supply towels. You'll be wearing a buoyancy aid throughout. The minimum age for this beginner session is sixteen. That's different from our family taster sessions, which accept younger children. As you're all adults, the age restriction won't affect you.",
            "q": [
              5,
              6
            ]
          },
          {
            "speaker": "Visitor",
            "voice": "m",
            "text": "Fine. I also need to mention that one person can't eat dairy products, in case we decide to buy something at the café afterwards. Is that going to be difficult? And where should we actually meet the instructor? On the map I can see an office near the entrance and a larger building down by the water.",
            "q": []
          },
          {
            "speaker": "Adviser",
            "voice": "f",
            "text": "The café can usually offer something without dairy, but tell them when ordering. Meet at the boathouse, the larger building by the water, rather than at reception. If you're driving, use the north car park. The south one is reserved for a running event that morning. From the north car park it's a short walk, with clear signs all the way to the lake.",
            "q": [
              7,
              8,
              9
            ]
          },
          {
            "speaker": "Visitor",
            "voice": "m",
            "text": "We'll drive together, so that's helpful. Could you send the booking details by email? I don't need a paper copy. I can show the others the message on my phone. I'll check the directions before we leave home, because mobile reception is sometimes poor near the lake. Let me give you my address now, and then I can arrange payment.",
            "q": [
              10
            ]
          }
        ],
        "groups": [
          {
            "type": "form",
            "kind": "gap",
            "range": [
              1,
              10
            ],
            "instruction": "Complete the form. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Booking and enquiry notes",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Surname of lead visitor: {{1}}</p><p>Day requested: {{2}}</p><p>Session begins at {{3}}</p><p>Group price: £{{4}}</p><p>Item participants should bring: {{5}}</p><p>Minimum age: {{6}}</p><p>Food restriction to mention at café: no {{7}}</p><p>Meeting building: {{8}}</p><p>Use the {{9}} car park.</p><p>Confirmation to be sent by {{10}}</p>",
            "answers": {
              "1": [
                "Collins"
              ],
              "2": [
                "Saturday"
              ],
              "3": [
                "nine forty-five",
                "9.45",
                "9:45"
              ],
              "4": [
                "sixty-eight",
                "68"
              ],
              "5": [
                "towel"
              ],
              "6": [
                "sixteen",
                "16"
              ],
              "7": [
                "dairy"
              ],
              "8": [
                "boathouse"
              ],
              "9": [
                "north"
              ],
              "10": [
                "email"
              ]
            },
            "explain": {
              "1": "Transcript dòng 2: “My surname is Collins”.",
              "2": "Transcript dòng 2: “Could we come on Saturday”.",
              "3": "Transcript dòng 3: “starts at nine forty-five”.",
              "4": "Transcript dòng 3: “sixty-eight pounds”.",
              "5": "Transcript dòng 5: “Bring a towel”.",
              "6": "Transcript dòng 5: “minimum age for this beginner session is sixteen”.",
              "7": "Transcript dòng 7: “something without dairy”.",
              "8": "Transcript dòng 7: “Meet at the boathouse”.",
              "9": "Transcript dòng 7: “use the north car park”.",
              "10": "Transcript dòng 8: “details by email”."
            }
          }
        ]
      },
      {
        "id": "L5-S2",
        "part": 2,
        "title": "A visit to Stonebridge Heritage Farm",
        "context": "A guide introduces a heritage farm and explains the site plan.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Welcome to Stonebridge Heritage Farm. Before you explore, let me explain the plan in your leaflet. The main entrance is at the bottom of the plan, with north at the top. A straight lane runs north through the site. We have moved some activities since last summer, so please use this year's plan rather than the large photograph you may have seen on our old website. The photograph is attractive, but it isn't a reliable guide to where everything happens now.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Just inside the entrance, the first building on your left is reception. If you need to change a booking or ask about lost property, go there. Directly opposite, on the right of the lane, is the café. It used to be in the northern part of the farm, but the new position is easier for people making a short visit. The café serves simple lunches, and you can also use the tables outside if you've brought your own food.",
            "q": [
              11,
              12
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Continue north along the lane until you reach the crossroads. Turn left there for the workshop. That's where staff demonstrate traditional woodworking. The building on the opposite side of the crossroads, to the right, contains the flower display, rather than the workshop. Please don't enter while a demonstration is being set up. The tools are real, and visitors need to wait behind the marked line until the demonstrator invites them closer. You can ask questions once the machinery has stopped.",
            "q": [
              13
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "If you go straight on at the crossroads, you'll pass the pond in the centre. Beyond the pond, the upper path divides left and right. Take the left branch to reach the orchard, in the northwest corner. The upper right branch leads to the animal field in the northeast corner. Children often want to begin there, but please remember that feeding is supervised. The orchard is open for walking, although fruit picking isn't included in an ordinary entrance ticket.",
            "q": [
              14,
              15
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The main change this year is the demonstration system. You must reserve a place for a woodworking demonstration, even though there is no extra charge. Ordinary entry to the farm doesn't guarantee a demonstration seat. You can reserve at reception. We considered online-only booking, but that would exclude some visitors, so it remains possible to book after you arrive, subject to space. The afternoon session is usually less crowded than the morning one.",
            "q": [
              16
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "For children, the most suitable activity today is the bread workshop, because it lets them make something themselves. The animal talk is interesting, but it is mainly a talk rather than a hands-on activity. If the weather becomes wet, the outdoor storytelling will move into the barn; it won't be cancelled. Staff will put a notice at the crossroads so you won't have to return to reception just to find out where it has gone.",
            "q": [
              17,
              18
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Bags that you don't want to carry can be left in lockers beside reception. Please keep valuables with you and retain the locker key. Our coach group should meet again at the entrance at four, not four thirty. The driver needs to leave promptly because of roadworks on the return route. You have plenty of time to explore, so there is no need to hurry through the first area. I'll remain near reception for a few minutes if anyone needs individual directions.",
            "q": [
              19,
              20
            ]
          }
        ],
        "groups": [
          {
            "type": "map",
            "kind": "match",
            "range": [
              11,
              15
            ],
            "instruction": "Label the plan. Choose the correct letter, A–G.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "Position A"
              },
              {
                "key": "B",
                "text": "Position B"
              },
              {
                "key": "C",
                "text": "Position C"
              },
              {
                "key": "D",
                "text": "Position D"
              },
              {
                "key": "E",
                "text": "Position E"
              },
              {
                "key": "F",
                "text": "Position F"
              },
              {
                "key": "G",
                "text": "Position G"
              }
            ],
            "questions": [
              {
                "n": 11,
                "text": "Reception",
                "answer": "A",
                "explain": "Transcript dòng 2: “first building on your left is reception”."
              },
              {
                "n": 12,
                "text": "Café",
                "answer": "B",
                "explain": "Transcript dòng 2: “Directly opposite, on the right”."
              },
              {
                "n": 13,
                "text": "Woodworking workshop",
                "answer": "C",
                "explain": "Transcript dòng 3: “Turn left there for the workshop”."
              },
              {
                "n": 14,
                "text": "Orchard",
                "answer": "F",
                "explain": "Transcript dòng 4: “northwest corner”."
              },
              {
                "n": 15,
                "text": "Animal field",
                "answer": "G",
                "explain": "Transcript dòng 4: “northeast corner”."
              }
            ],
            "image": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 620 480\" role=\"img\" aria-label=\"Site plan: entrance at the south, seven lettered positions linked by paths\"><rect x=\"10\" y=\"10\" width=\"600\" height=\"460\" rx=\"16\" fill=\"#f3f6ed\" stroke=\"#69785d\"/><path d=\"M310 430V95M140 350H480M140 245H480M140 95H480\" stroke=\"#d5c5a3\" stroke-width=\"22\" fill=\"none\"/><text x=\"310\" y=\"458\" text-anchor=\"middle\" font-size=\"20\" fill=\"#263429\">ENTRANCE</text><path d=\"M565 85V35l-9 14m9-14 9 14\" fill=\"none\" stroke=\"#263429\" stroke-width=\"3\"/><text x=\"565\" y=\"108\" text-anchor=\"middle\" font-size=\"19\" fill=\"#263429\">N</text><rect x=\"104\" y=\"323\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"140\" y=\"358\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">A</text><rect x=\"444\" y=\"323\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"480\" y=\"358\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">B</text><rect x=\"104\" y=\"218\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"140\" y=\"253\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">C</text><rect x=\"444\" y=\"218\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"480\" y=\"253\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">D</text><rect x=\"274\" y=\"143\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"310\" y=\"178\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">E</text><rect x=\"104\" y=\"68\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"140\" y=\"103\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">F</text><rect x=\"444\" y=\"68\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"480\" y=\"103\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">G</text></svg>"
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              16,
              18
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 16,
                "text": "What must visitors do to attend a woodworking demonstration?",
                "options": [
                  "A Pay an additional fee",
                  "B Reserve a place",
                  "C Book exclusively online"
                ],
                "answer": "B",
                "explain": "Transcript dòng 5: “You must reserve a place”."
              },
              {
                "n": 17,
                "text": "Why is the bread workshop recommended for children?",
                "options": [
                  "A They can take part in making something",
                  "B It is the quietest place on site",
                  "C It lasts less time than every other activity"
                ],
                "answer": "A",
                "explain": "Transcript dòng 6: “lets them make something themselves”."
              },
              {
                "n": 18,
                "text": "What will happen to storytelling if it rains?",
                "options": [
                  "A It will end early",
                  "B It will be replaced by an animal talk",
                  "C It will move into the barn"
                ],
                "answer": "C",
                "explain": "Transcript dòng 6: “move into the barn”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              19,
              20
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Unwanted bags can be stored in {{19}}.</p><p>The coach group meets at {{20}} p.m.</p>",
            "answers": {
              "19": [
                "lockers"
              ],
              "20": [
                "four",
                "4",
                "4.00",
                "4:00"
              ]
            },
            "explain": {
              "19": "Transcript dòng 7: “left in lockers”.",
              "20": "Transcript dòng 7: “at four, not four thirty”."
            }
          }
        ]
      },
      {
        "id": "L5-S3",
        "part": 3,
        "title": "Planning a study of food waste",
        "context": "Two students discuss a college food-waste project with their tutor.",
        "audio": null,
        "script": [
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "Let's hear how your food-waste project has developed. Last week you wanted to measure everything thrown away across the campus. That sounded ambitious for a short assignment. Have you narrowed the question? Remember that a small study with a clear method will be easier to defend than a large set of figures whose meaning you can't explain.",
            "q": []
          },
          {
            "speaker": "Maya",
            "voice": "m",
            "text": "Yes. We're concentrating on the lunch service in one café. We first planned to compare all four cafés, but their menus and opening times differ too much. We want to find out how much edible food is left on plates, rather than include preparation waste from the kitchen. That distinction should make the question more manageable and stop us mixing two different processes.",
            "q": [
              21,
              22
            ]
          },
          {
            "speaker": "Leo",
            "voice": "f2",
            "text": "Our main problem is deciding how to record it without slowing the staff down. At first I thought customers could estimate what they'd left, but people might describe similar leftovers differently. We'll weigh the leftovers instead. We can use the same scale each day and record the number of meals served, so a busy day isn't automatically interpreted as a worse result.",
            "q": [
              23
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "That is clearer. What will you need from other people? Don't assume the café can change its routine immediately. Ask for permission, explain exactly when you'll be there, and make sure your equipment doesn't obstruct the return point. You'll also need a practical way to distinguish food from packaging, otherwise the weight of a container could change your conclusion.",
            "q": []
          },
          {
            "speaker": "Maya",
            "voice": "m",
            "text": "We've divided the tasks. Café staff will separate the packaging before we weigh the food. Participating diners will answer one short question about why they left something. Our research team will operate the scale and record the measurements. The college administrator will give formal permission for us to work in that space. We won't ask the staff to conduct the survey while serving lunch.",
            "q": [
              25,
              26,
              27,
              28
            ]
          },
          {
            "speaker": "Leo",
            "voice": "f2",
            "text": "We'll use five ordinary weekdays. We considered the festival week because the café would be busy, but that wouldn't represent normal service. We also decided not to photograph individual plates with people beside them. We don't need faces or names to answer the research question, and collecting that information would create work without helping the analysis.",
            "q": [
              24
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "What will you acknowledge as limitations? Five days won't tell you everything about the year. The menu may influence the amount left, and people may behave differently when they know they are being observed. Those are reasons to describe the sample accurately, not reasons to abandon the project. Keep the menu record and explain how you introduced yourselves to customers.",
            "q": []
          },
          {
            "speaker": "Maya",
            "voice": "m",
            "text": "For the final report, we want to recommend two things for any later study: repeat the measurements in another season, and test whether smaller optional portions change the amount left. We aren't recommending compulsory smaller meals or a new payment system. Our figures won't justify those claims. We'll present a simple table first, then discuss what the numbers can and can't tell the café about its choices.",
            "q": [
              29,
              30
            ]
          }
        ],
        "groups": [
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              21,
              24
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 21,
                "text": "Why did the students select only one café?",
                "options": [
                  "A The cafés differed too much for a simple comparison",
                  "B The others refused permission",
                  "C Only one café served lunch"
                ],
                "answer": "A",
                "explain": "Transcript dòng 2: “their menus and opening times differ too much”."
              },
              {
                "n": 22,
                "text": "What will the main measurements cover?",
                "options": [
                  "A All kitchen preparation waste",
                  "B Edible food remaining on plates",
                  "C The cost of packaging"
                ],
                "answer": "B",
                "explain": "Transcript dòng 2: “edible food is left on plates”."
              },
              {
                "n": 23,
                "text": "Why record the number of meals?",
                "options": [
                  "A To identify individual customers",
                  "B To calculate staff salaries",
                  "C To interpret waste in relation to the level of business"
                ],
                "answer": "C",
                "explain": "Transcript dòng 3: “a busy day isn't automatically interpreted as a worse result”."
              },
              {
                "n": 24,
                "text": "Why avoid festival week?",
                "options": [
                  "A It would not represent ordinary service",
                  "B The scales would be unavailable",
                  "C The café would be closed"
                ],
                "answer": "A",
                "explain": "Transcript dòng 6: “wouldn't represent normal service”."
              }
            ]
          },
          {
            "type": "matching",
            "kind": "match",
            "range": [
              25,
              28
            ],
            "instruction": "Match each item with the correct option. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Café staff"
              },
              {
                "key": "B",
                "text": "Participating diners"
              },
              {
                "key": "C",
                "text": "Research team"
              },
              {
                "key": "D",
                "text": "College administrator"
              }
            ],
            "questions": [
              {
                "n": 25,
                "text": "Separate packaging from the food",
                "answer": "A",
                "explain": "Transcript dòng 5: “Café staff will separate”."
              },
              {
                "n": 26,
                "text": "Explain why food was left",
                "answer": "B",
                "explain": "Transcript dòng 5: “diners will answer one short question”."
              },
              {
                "n": 27,
                "text": "Operate the measuring equipment",
                "answer": "C",
                "explain": "Transcript dòng 5: “research team will operate the scale”."
              },
              {
                "n": 28,
                "text": "Provide formal authorisation",
                "answer": "D",
                "explain": "Transcript dòng 5: “administrator will give formal permission”."
              }
            ]
          },
          {
            "type": "mcq-multi",
            "kind": "multi",
            "range": [
              29,
              30
            ],
            "instruction": "Choose <b>TWO</b> letters.",
            "questions": [
              {
                "ns": [
                  29,
                  30
                ],
                "text": "Which TWO steps do the students suggest for later research?",
                "options": [
                  "A Require everyone to buy smaller meals",
                  "B Repeat measurement in a different season",
                  "C Introduce a new payment system",
                  "D Photograph every diner",
                  "E Test smaller optional portions"
                ],
                "answer": [
                  "B",
                  "E"
                ],
                "explain": "Transcript dòng 8: “repeat the measurements in another season”. Hai hướng được nêu là đo lại ở mùa khác và thử khẩu phần nhỏ tự chọn; không đề xuất ép giảm khẩu phần hay đổi thanh toán."
              }
            ]
          }
        ]
      },
      {
        "id": "L5-S4",
        "part": 4,
        "title": "Keeping a useful seed collection",
        "context": "A lecturer explains the organisation of a seed collection.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Today we'll examine how a seed collection becomes a useful scientific resource. A room full of packets is not enough. The seeds need records that explain what they are, where they came from and what has happened to them since collection. Storage is important, but it is part of a longer chain. The aim is to preserve material that can be identified and used responsibly, rather than simply to accumulate the largest possible number of containers.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Fieldwork begins with permission. Collectors need to know they are allowed to take material and what conditions apply to its later use. They record the location and the date, as well as information needed to identify the species. Taking a handful from the nearest plant may be convenient, but it may not represent the variation present in the wider population. A collecting plan should explain what was sampled and what was deliberately left untouched.",
            "q": [
              31,
              32,
              33
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "When material arrives, it receives an accession number. That number links the physical collection to its records. A handwritten description on an unlabelled envelope isn't a safe substitute, because packets can be separated from accompanying letters. The first processing stage is cleaning, which removes debris such as pieces of leaves. Staff also check that the material matches the information sent by the collector. If identification is uncertain, the uncertainty must remain visible in the record.",
            "q": [
              34,
              35,
              36
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Next comes preparation for storage. For seeds suitable for conventional banking, moisture is reduced under controlled conditions. That doesn't mean removing every trace of water or putting fresh material straight into a freezer. Some seeds cannot tolerate the normal drying or freezing process and require a different approach. A collection therefore needs a decision about the appropriate method before storage begins, rather than treating one temperature as a universal solution for all plant material.",
            "q": [
              37
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Suitable dried seeds are placed in sealed containers, which help maintain the intended conditions. A sample is used for a germination test to investigate whether seeds can develop under the selected test conditions. Failure in one test does not automatically show that every seed is dead; the procedure itself may need investigation. The result, the method and the amount of material used are all recorded, so that later staff can interpret the evidence instead of receiving only a final percentage.",
            "q": [
              38,
              39
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "A duplicate collection at another site provides protection against a problem affecting the main store. The records must identify which original collection the duplicate represents. Otherwise two similar packets can be mistaken for independent samples and create a misleading impression of diversity. Collections also need periodic checking. A good result when the seeds first arrived is useful, but it doesn't remove the need to monitor their condition and consider what should happen when the remaining quantity becomes small.",
            "q": [
              40
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Finally, requests for use should be linked to the permissions and the purpose of the collection. Material may support research or restoration, but sending it out is not merely a parcel-delivery task. Staff need to retain enough for future work and keep a record of distribution. A useful seed bank therefore combines biological care with careful information management. The packets and the database protect different parts of the same resource, and neither can reliably replace the other.",
            "q": []
          }
        ],
        "references": [
          "https://www.kew.org/read-and-watch/seed-collecting-msb"
        ],
        "groups": [
          {
            "type": "note",
            "kind": "gap",
            "range": [
              31,
              35
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Lecture notes",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Field collection begins by obtaining {{31}}.</p><p>Record the collection {{32}} as well as the date.</p><p>Identify the plant {{33}}.</p><p>Link records with an {{34}} number.</p><p>Uncertain identification must stay {{35}} in the record.</p>",
            "answers": {
              "31": [
                "permission"
              ],
              "32": [
                "location"
              ],
              "33": [
                "species"
              ],
              "34": [
                "accession"
              ],
              "35": [
                "visible"
              ]
            },
            "explain": {
              "31": "Transcript dòng 2: “begins with permission”.",
              "32": "Transcript dòng 2: “record the location”.",
              "33": "Transcript dòng 2: “identify the species”.",
              "34": "Transcript dòng 3: “an accession number”.",
              "35": "Transcript dòng 3: “remain visible in the record”."
            }
          },
          {
            "type": "flow",
            "kind": "gap",
            "range": [
              36,
              40
            ],
            "instruction": "Complete the flow-chart. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Process overview",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<ol><li>Clean the collection to remove {{36}}.</li><li>Reduce {{37}} under controlled conditions if the seeds tolerate this.</li><li>Place suitable dried seeds in {{38}} containers.</li><li>Carry out a {{39}} test on a sample.</li><li>Keep a duplicate at another {{40}}.</li></ol>",
            "answers": {
              "36": [
                "debris"
              ],
              "37": [
                "moisture"
              ],
              "38": [
                "sealed"
              ],
              "39": [
                "germination"
              ],
              "40": [
                "site"
              ]
            },
            "explain": {
              "36": "Transcript dòng 3: “removes debris”.",
              "37": "Transcript dòng 4: “moisture is reduced”.",
              "38": "Transcript dòng 5: “in sealed containers”.",
              "39": "Transcript dòng 5: “a germination test”.",
              "40": "Transcript dòng 6: “another site”."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "L6",
    "title": "Practice Test 6 — Housing, Libraries & Design",
    "source": "Biên soạn cho luyện tập · audio TTS · không phải đề thi thật",
    "provenance": {
      "kind": "original",
      "addedOn": "2026-10-16"
    },
    "sections": [
      {
        "id": "L6-S1",
        "part": 1,
        "title": "Reporting problems in a rented flat",
        "context": "A tenant calls a property office to arrange repairs.",
        "audio": null,
        "script": [
          {
            "speaker": "Agent",
            "voice": "f",
            "text": "Hello, Green Street Property Office. Is this about a new tenancy or a maintenance request? If there's water coming through the ceiling right now, we have an emergency number, but for other problems I can book a visit while we're speaking. I'll need to find the correct property first, as we manage several buildings on the same road.",
            "q": []
          },
          {
            "speaker": "Tenant",
            "voice": "m",
            "text": "It's a maintenance request, and nothing is flooding. My surname is Palmer, P-A-L-M-E-R. I'm in flat fourteen at Beech Court. I used to live in flat forty in another building, so I sometimes say the wrong number. I've moved into this one quite recently, and there are two things I didn't notice during the viewing.",
            "q": [
              1,
              2
            ]
          },
          {
            "speaker": "Agent",
            "voice": "f",
            "text": "I've found it. I was about to open the record for Beach Court, beside the coast, but yours is Beech, like the tree. What's the main problem? We don't expect tenants to diagnose anything, so just describe what happens. If you can tell me which room it's in, I can make sure the contractor brings the right equipment.",
            "q": [
              3
            ]
          },
          {
            "speaker": "Tenant",
            "voice": "m",
            "text": "The kitchen window won't close properly. The bathroom one is stiff too, but it does close, so that can wait. The second problem is a light in the hallway. It flashes even after I put a new bulb in. I haven't touched anything else, because I don't know whether the fitting itself is faulty.",
            "q": [
              4,
              5
            ]
          },
          {
            "speaker": "Agent",
            "voice": "f",
            "text": "That's sensible. Please leave it switched off until the electrician checks it. We can arrange both jobs for Tuesday. Thursday was the first date I saw, but there's been a cancellation. The visit window is between ten and twelve. We can't promise an exact minute because the length of the earlier job may vary. Will someone be at home throughout that period?",
            "q": [
              6,
              7
            ]
          },
          {
            "speaker": "Tenant",
            "voice": "m",
            "text": "I can be there. I have a meeting after lunch, but I'll keep the morning free. Could the contractor phone when they're on the way? The doorbell has a quiet sound and I might not hear it from the bedroom. My mobile number is on the tenancy form, and it's still the same one.",
            "q": []
          },
          {
            "speaker": "Agent",
            "voice": "f",
            "text": "I'll add a request to phone. You don't need to leave a key with the neighbour, then. The reference for this booking is maple, all letters, like the tree. If you call us again, quote that word. There should be no charge for these repairs under the tenancy, provided the problem isn't accidental damage. The contractor will discuss anything unexpected before doing extra work.",
            "q": [
              8,
              9
            ]
          },
          {
            "speaker": "Tenant",
            "voice": "m",
            "text": "Thank you. I can send a photograph of the window if that would help, although a picture won't show why it sticks. I'll use the office email address on my agreement. Please send the appointment confirmation by text rather than email, because I'll see it immediately on my phone. I'll move the small table away from the window before Tuesday so there's space to work.",
            "q": [
              10
            ]
          }
        ],
        "groups": [
          {
            "type": "form",
            "kind": "gap",
            "range": [
              1,
              10
            ],
            "instruction": "Complete the form. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Booking and enquiry notes",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Tenant surname: {{1}}</p><p>Flat number: {{2}}</p><p>Building name: {{3}} Court</p><p>Window needing immediate attention: {{4}}</p><p>Faulty light is in the {{5}}.</p><p>Appointment day: {{6}}</p><p>Visit window ends at {{7}}</p><p>Contractor should {{8}} before arrival.</p><p>Booking reference word: {{9}}</p><p>Preferred confirmation method: {{10}}</p>",
            "answers": {
              "1": [
                "Palmer"
              ],
              "2": [
                "fourteen",
                "14"
              ],
              "3": [
                "Beech"
              ],
              "4": [
                "kitchen"
              ],
              "5": [
                "hallway"
              ],
              "6": [
                "Tuesday"
              ],
              "7": [
                "twelve",
                "12",
                "12.00",
                "12:00"
              ],
              "8": [
                "phone"
              ],
              "9": [
                "maple"
              ],
              "10": [
                "text"
              ]
            },
            "explain": {
              "1": "Transcript dòng 2: “My surname is Palmer”.",
              "2": "Transcript dòng 2: “flat fourteen”.",
              "3": "Transcript dòng 3: “yours is Beech”.",
              "4": "Transcript dòng 4: “The kitchen window”.",
              "5": "Transcript dòng 4: “light in the hallway”.",
              "6": "Transcript dòng 5: “both jobs for Tuesday”.",
              "7": "Transcript dòng 5: “between ten and twelve”.",
              "8": "Transcript dòng 7: “request to phone”.",
              "9": "Transcript dòng 7: “booking is maple”.",
              "10": "Transcript dòng 8: “confirmation by text”."
            }
          }
        ]
      },
      {
        "id": "L6-S2",
        "part": 2,
        "title": "New services at Eastbank Library",
        "context": "A librarian welcomes new members and describes services.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Welcome to Eastbank Library. You can register today even if you only moved into the area recently. We don't charge a membership fee. I'll explain a few services that new members sometimes overlook, because a library card provides more than permission to borrow a book. Some rooms can be used without booking, while others need a reservation when demand is high. The printed guide lists the conditions, and staff are happy to explain them rather than expecting you to remember everything from this talk.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Quiet Room is for reading without conversation or phone calls. It isn't the place for group work, even when a group promises to whisper. If you need help using online forms or setting up a basic email account, visit the Digital Desk. Staff there can explain the steps, but they won't type private passwords for you. We originally offered this help upstairs, but it is now on the ground floor so that visitors don't have to use the stairs.",
            "q": [
              11,
              13
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Local Collection contains photographs, maps and newspapers about the town. Most items must remain in the building, although you can make notes and request copies within the collection's rules. Please ask before photographing fragile material. The Family Corner has picture books and a small area for children to sit with an adult. It isn't a supervised childcare service. Adults remain responsible for their children, including during the informal storytelling session on Wednesday mornings.",
            "q": [
              12,
              15
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "For small meetings, use the Garden Room. You can rearrange its tables, provided you restore them afterwards. The larger Study Hall has individual desks, but it can't be booked as a private room. We considered charging community groups for every use of the Garden Room, then decided to keep the first hour free. Longer bookings have a modest charge to cover cleaning and staff time, and the full price is shown before you confirm.",
            "q": [
              14
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The biggest change to borrowing is that most books now renew automatically if nobody else has requested them. That doesn't apply to every item, so please read any message we send. A reminder is useful, but it isn't a promise that you can keep an item indefinitely. We still ask you to return books promptly when another reader is waiting. DVDs have separate borrowing periods, and the electronic catalogue shows the due date for each item.",
            "q": [
              16
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "You can borrow a tablet for use inside the library, but you can't take it home. Several people have asked about home loans; we may consider them later, but they haven't started. Our weekly introductory tour is designed mainly for people who want to understand the building and services, rather than for experts researching local history. Bring a question if you have one. Seeing the equipment in place is often more useful than reading another page of instructions.",
            "q": [
              17,
              18
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "To collect reserved items, bring your library card to the counter. If you've lost it, speak to a member of staff rather than borrowing someone else's. The book-return box outside remains available when the building is closed, but please don't leave donations there. Donations go to reception during opening hours so we can check them. That completes the introduction. You can now look around independently, and I'll be near the entrance to help anyone who wants to join today.",
            "q": [
              19,
              20
            ]
          }
        ],
        "groups": [
          {
            "type": "matching",
            "kind": "match",
            "range": [
              11,
              15
            ],
            "instruction": "Match each description with the correct place. There are more options than questions.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "Quiet Room"
              },
              {
                "key": "B",
                "text": "Digital Desk"
              },
              {
                "key": "C",
                "text": "Local Collection"
              },
              {
                "key": "D",
                "text": "Family Corner"
              },
              {
                "key": "E",
                "text": "Garden Room"
              },
              {
                "key": "F",
                "text": "Study Hall"
              }
            ],
            "questions": [
              {
                "n": 11,
                "text": "Help with a basic online form",
                "answer": "B",
                "explain": "Transcript dòng 2: “visit the Digital Desk”."
              },
              {
                "n": 12,
                "text": "Historical newspapers about the town",
                "answer": "C",
                "explain": "Transcript dòng 3: “photographs, maps and newspapers”."
              },
              {
                "n": 13,
                "text": "A conversation-free reading space",
                "answer": "A",
                "explain": "Transcript dòng 2: “reading without conversation”."
              },
              {
                "n": 14,
                "text": "A room for a small group meeting",
                "answer": "E",
                "explain": "Transcript dòng 4: “For small meetings, use the Garden Room”."
              },
              {
                "n": 15,
                "text": "Picture books for children with an adult",
                "answer": "D",
                "explain": "Transcript dòng 3: “Family Corner has picture books”."
              }
            ]
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              16,
              18
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 16,
                "text": "What has changed for most borrowed books?",
                "options": [
                  "A They renew automatically unless requested",
                  "B They must be returned every week",
                  "C They can never be renewed"
                ],
                "answer": "A",
                "explain": "Transcript dòng 5: “renew automatically if nobody else has requested them”."
              },
              {
                "n": 17,
                "text": "Where may a borrowed tablet be used?",
                "options": [
                  "A At home only",
                  "B Anywhere in the town",
                  "C Inside the library only"
                ],
                "answer": "C",
                "explain": "Transcript dòng 6: “for use inside the library”."
              },
              {
                "n": 18,
                "text": "Who is the weekly introductory tour mainly for?",
                "options": [
                  "A Specialist historians",
                  "B People learning about the building and services",
                  "C Children attending a supervised club"
                ],
                "answer": "B",
                "explain": "Transcript dòng 6: “understand the building and services”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              19,
              20
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Bring your {{19}} to collect reserved items.</p><p>Donations should be taken to {{20}} during opening hours.</p>",
            "answers": {
              "19": [
                "library card"
              ],
              "20": [
                "reception"
              ]
            },
            "explain": {
              "19": "Transcript dòng 7: “bring your library card”.",
              "20": "Transcript dòng 7: “Donations go to reception”."
            }
          }
        ]
      },
      {
        "id": "L6-S3",
        "part": 3,
        "title": "Evaluating a small wind-turbine design",
        "context": "Two engineering students review their design project.",
        "audio": null,
        "script": [
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "Tell me about the small wind-turbine project. I'm interested in how you chose your tests, rather than whether you produced the most impressive-looking model. Your report needs to connect each method to a particular question. If two tests answer essentially the same question, you may be able to use the time elsewhere instead of collecting more measurements merely because the equipment is available.",
            "q": []
          },
          {
            "speaker": "Rina",
            "voice": "m",
            "text": "Our first design had very wide blades. We thought a larger area would automatically perform better, but the model became difficult to start in the low-speed airflow we could produce. We changed the blade angle instead of simply increasing the size again. We're comparing three angles now, keeping the other dimensions unchanged so that we can interpret the difference.",
            "q": [
              21
            ]
          },
          {
            "speaker": "Owen",
            "voice": "f2",
            "text": "The most useful advice was to repeat the low-speed tests. Our first result looked excellent, but we discovered that the fan wasn't at the same distance. We now mark its position on the bench. The project isn't a claim about performance at a real coastal site. It is a controlled comparison of designs under the limited conditions we can reproduce in the laboratory.",
            "q": [
              22,
              23
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "Good. What other evidence will you include? A working device is only one part of a design decision. You might consider how it would be installed or maintained, provided you make clear which ideas you've actually tested and which are proposals. Don't attach a precise financial saving to a design when you don't have evidence about its working life.",
            "q": []
          },
          {
            "speaker": "Rina",
            "voice": "m",
            "text": "We've matched methods to questions. The scale model lets us compare the blade angles in the same airflow. A computer simulation shows how stress might be distributed, although it depends on the assumptions we enter. Interviews with maintenance staff reveal which components would be difficult to reach. The cost sheet compares the prices of the materials we'd need, rather than predicting electricity income.",
            "q": [
              25,
              26,
              27,
              28
            ]
          },
          {
            "speaker": "Owen",
            "voice": "f2",
            "text": "We considered a field trial, but we don't have permission for an outdoor installation and couldn't monitor it for long enough. So we've removed it from the actual test plan. We can explain why it would be useful later. That is more honest than presenting a photograph outside as if we'd carried out a proper long-term performance test.",
            "q": [
              24
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "Exactly. Make the distinction visible in the report. Also, what have you learned from the maintenance interviews? Sometimes a small change that helps a technician may matter more than a minor improvement in a laboratory figure. But don't imply that three interviews represent every technician. Describe who contributed and the experience they were drawing on.",
            "q": []
          },
          {
            "speaker": "Rina",
            "voice": "m",
            "text": "For the next version we'll prioritise two changes: make the casing easier to open, and use replaceable connectors. The staff repeatedly mentioned access and replacement. We won't add a decorative display or a larger battery just to make the design look more advanced. Owen will check the drawings, and I'll write the methods section so readers can see exactly which comparison each result supports.",
            "q": [
              29,
              30
            ]
          }
        ],
        "groups": [
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              21,
              24
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 21,
                "text": "Why did the students change the first blade design?",
                "options": [
                  "A It was too expensive to paint",
                  "B It was difficult to start in their low-speed airflow",
                  "C It was too small to photograph"
                ],
                "answer": "B",
                "explain": "Transcript dòng 2: “difficult to start”."
              },
              {
                "n": 22,
                "text": "What caused the unusually good first result?",
                "options": [
                  "A A different fan distance",
                  "B A new material",
                  "C A calculation of financial savings"
                ],
                "answer": "A",
                "explain": "Transcript dòng 3: “fan wasn't at the same distance”."
              },
              {
                "n": 23,
                "text": "What is the project intended to establish?",
                "options": [
                  "A Long-term coastal energy output",
                  "B A guaranteed commercial saving",
                  "C A controlled comparison under laboratory conditions"
                ],
                "answer": "C",
                "explain": "Transcript dòng 3: “controlled comparison of designs”."
              },
              {
                "n": 24,
                "text": "Why was a field trial removed?",
                "options": [
                  "A The model could not be transported",
                  "B Permission and monitoring time were insufficient",
                  "C Outdoor photographs were prohibited"
                ],
                "answer": "B",
                "explain": "Transcript dòng 6: “don't have permission”."
              }
            ]
          },
          {
            "type": "matching",
            "kind": "match",
            "range": [
              25,
              28
            ],
            "instruction": "Match each item with the correct option. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Scale model"
              },
              {
                "key": "B",
                "text": "Computer simulation"
              },
              {
                "key": "C",
                "text": "Maintenance interviews"
              },
              {
                "key": "D",
                "text": "Cost sheet"
              },
              {
                "key": "E",
                "text": "Field trial"
              }
            ],
            "questions": [
              {
                "n": 25,
                "text": "Compare blade angles under the same airflow",
                "answer": "A",
                "explain": "Transcript dòng 5: “scale model lets us compare”."
              },
              {
                "n": 26,
                "text": "Explore how stress may be distributed",
                "answer": "B",
                "explain": "Transcript dòng 5: “computer simulation shows how stress”."
              },
              {
                "n": 27,
                "text": "Identify difficult-to-reach components",
                "answer": "C",
                "explain": "Transcript dòng 5: “Interviews with maintenance staff”."
              },
              {
                "n": 28,
                "text": "Compare required material prices",
                "answer": "D",
                "explain": "Transcript dòng 5: “cost sheet compares the prices”."
              }
            ]
          },
          {
            "type": "mcq-multi",
            "kind": "multi",
            "range": [
              29,
              30
            ],
            "instruction": "Choose <b>TWO</b> letters.",
            "questions": [
              {
                "ns": [
                  29,
                  30
                ],
                "text": "Which TWO changes are priorities for the next design?",
                "options": [
                  "A An easier-to-open casing",
                  "B A decorative display",
                  "C Replaceable connectors",
                  "D A larger battery",
                  "E A taller laboratory bench"
                ],
                "answer": [
                  "A",
                  "C"
                ],
                "explain": "Transcript dòng 8: “make the casing easier to open”. Nhóm chọn vỏ dễ mở và đầu nối thay được; màn hình trang trí và pin lớn không phải ưu tiên."
              }
            ]
          }
        ]
      },
      {
        "id": "L6-S4",
        "part": 4,
        "title": "Planning the reuse of building components",
        "context": "A lecturer discusses decisions involved in reusing construction materials.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "This lecture considers the reuse of building components. I'll use a hypothetical school refurbishment to explain the decisions, rather than claim that the same method fits every project. Reuse means keeping a component in service for a further purpose, while recycling may turn its material into something else. Both can be useful, but they are not interchangeable descriptions. If a project reports a high recovery rate, we still need to ask what was recovered and what happened to it.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The first task is an audit of the existing building. Staff record components in an inventory, including dimensions, condition and available information about their original use. Photographs help, but a photograph alone may not reveal how an item is fixed in place. In our example, some panels appeared easy to remove until the team discovered concealed fasteners. The time and damage associated with removal changed which parts were realistic candidates for reuse.",
            "q": [
              31,
              32,
              33
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The team then considered demand. Storing everything in the hope that somebody might want it later would require space, handling and continuing responsibility. They contacted potential users before dismantling began. This didn't guarantee a buyer for every item, but it helped distinguish a plausible future use from an optimistic label. Materials without an immediate destination needed a storage plan, including protection from damage and a date for reviewing whether keeping them still made sense.",
            "q": [
              34,
              35
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Documentation travelled with the components. A label linked each item to its inventory entry, so that dimensions and inspection notes would not be lost when it left the school. The team avoided marking an untested item as suitable for a demanding structural use. Reuse is not permission to ignore performance requirements. Where specialist assessment was needed, the decision remained pending until the appropriate check had been completed and its limitations were understood.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Consider five categories in the inventory. Steel beams required information about their dimensions and condition before further assessment. Bricks needed an estimate of how many could be cleaned without unacceptable damage. Glass panels required careful measurement because a small difference could prevent them fitting a new opening. Timber boards were checked for nails before handling. Insulation needed information about its type rather than an assumption that every soft-looking material performed in the same way.",
            "q": [
              36,
              37,
              38,
              39
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "There were financial choices too. A reused item with no purchase price could still be expensive to remove, transport and prepare. The comparison therefore included labour, not just the amount paid for the component. The project also considered timing: a material available after the new room was due to open could not solve an immediate need. A catalogue of promising objects was useful only when its information matched the practical sequence of construction.",
            "q": [
              40
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The final report separated what was reused, what was recycled and what was not recovered. It explained the difficult decisions instead of hiding them inside one impressive total. That made the lessons useful for the next project, particularly where early coordination could improve the result. The broader point is that circular construction depends on relationships between information, demand and timing. A pile of retained materials represents a possibility; a documented and workable second use turns that possibility into an outcome.",
            "q": []
          }
        ],
        "groups": [
          {
            "type": "note",
            "kind": "gap",
            "range": [
              31,
              35
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Lecture notes",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Begin with an {{31}} of the existing building.</p><p>Record components in an {{32}}.</p><p>Concealed {{33}} may make removal difficult.</p><p>Investigate {{34}} before retaining every object.</p><p>Unallocated materials need a {{35}} plan.</p>",
            "answers": {
              "31": [
                "audit"
              ],
              "32": [
                "inventory"
              ],
              "33": [
                "fasteners"
              ],
              "34": [
                "demand"
              ],
              "35": [
                "storage"
              ]
            },
            "explain": {
              "31": "Transcript dòng 2: “an audit”.",
              "32": "Transcript dòng 2: “an inventory”.",
              "33": "Transcript dòng 2: “concealed fasteners”.",
              "34": "Transcript dòng 3: “considered demand”.",
              "35": "Transcript dòng 3: “a storage plan”."
            }
          },
          {
            "type": "table",
            "kind": "gap",
            "range": [
              36,
              40
            ],
            "instruction": "Complete the table. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Examples and requirements",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<table><thead><tr><th>Item</th><th>Notes</th></tr></thead><tbody><tr><th>36</th><td>Beams: made of {{36}}</td></tr><tr><th>37</th><td>Bricks: check how many can be {{37}}.</td></tr><tr><th>38</th><td>Glass panels: accurate {{38}} is essential.</td></tr><tr><th>39</th><td>Timber boards: check for {{39}} before handling.</td></tr><tr><th>40</th><td>Costs: include {{40}} as well as the component price.</td></tr></tbody></table>",
            "answers": {
              "36": [
                "Steel",
                "steel"
              ],
              "37": [
                "cleaned"
              ],
              "38": [
                "measurement"
              ],
              "39": [
                "nails"
              ],
              "40": [
                "labour"
              ]
            },
            "explain": {
              "36": "Transcript dòng 5: “Steel beams”.",
              "37": "Transcript dòng 5: “could be cleaned”.",
              "38": "Transcript dòng 5: “careful measurement”.",
              "39": "Transcript dòng 5: “checked for nails”.",
              "40": "Transcript dòng 6: “included labour”."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "L7",
    "title": "Practice Test 7 — Courses, Science & Oral History",
    "source": "Biên soạn cho luyện tập · audio TTS · không phải đề thi thật",
    "provenance": {
      "kind": "original",
      "addedOn": "2026-10-16"
    },
    "sections": [
      {
        "id": "L7-S1",
        "part": 1,
        "title": "Enrolling in an evening language course",
        "context": "A prospective student asks a college administrator about a course.",
        "audio": null,
        "script": [
          {
            "speaker": "Administrator",
            "voice": "f",
            "text": "Riverside Adult College, good afternoon. The main registration event has finished, but we can still enrol people by telephone if a class has places. Most of the language classes begin next month. Were you looking for a qualification course, or something more informal for travel and conversation? The two programmes have different teaching times and different fees.",
            "q": []
          },
          {
            "speaker": "Student",
            "voice": "m",
            "text": "Something informal, please. My surname is Reeves, R-E-E-V-E-S. I'm interested in Spanish. I considered Italian because my sister lives in Italy, but I'm planning a trip to Spain first. I know a few phrases, although I've never taken lessons. I wouldn't want a class that assumes everyone already understands spoken conversation.",
            "q": [
              1,
              2
            ]
          },
          {
            "speaker": "Administrator",
            "voice": "f",
            "text": "Then the beginners' group would suit you better than the improvers' course. It meets on Wednesday evenings. There used to be a Monday option, but the tutor couldn't continue that evening. Classes start at six thirty and finish an hour and a half later. If you come directly from work, there's a café open in the building before the lesson.",
            "q": [
              3,
              4
            ]
          },
          {
            "speaker": "Student",
            "voice": "m",
            "text": "Wednesday is actually easier for me. How many weeks does the course last? I saw a twelve-week course in an old prospectus, but I wasn't sure whether that information was still current. I can attend regularly through the autumn, except for one evening when I'll be away at a family event.",
            "q": []
          },
          {
            "speaker": "Administrator",
            "voice": "f",
            "text": "This course runs for ten weeks. The full fee is ninety-five pounds, and that includes access to the practice recordings. The textbook costs extra, but don't buy it before the first lesson. The tutor wants to check the level of the group before confirming which edition to use. Missing one class shouldn't be a serious problem if you catch up with the material.",
            "q": [
              5,
              6,
              7
            ]
          },
          {
            "speaker": "Student",
            "voice": "m",
            "text": "That's good. I'd like to practise listening as well as speaking. I can use recordings on my phone, but I don't have a computer at home. Are the activities suitable for a small screen? Also, do I need to take any kind of test before joining, or can I simply register as a beginner?",
            "q": []
          },
          {
            "speaker": "Administrator",
            "voice": "f",
            "text": "You can simply register. The recordings work on a phone, and you can borrow headphones here if you need them, although most learners bring their own. Your room is twenty-three, upstairs in the east wing. Please enter through the courtyard after six; the street entrance is locked in the evenings. There are signs from the courtyard to the stairs, so you won't have to find your way through the whole building.",
            "q": [
              8,
              9,
              10
            ]
          },
          {
            "speaker": "Student",
            "voice": "m",
            "text": "I'll note that down. I'd like to pay by card now if possible. Could you send the receipt by email? I can show it when I arrive, and I'd rather not depend on receiving a letter in time. I'll come a little early on the first Wednesday to find the room and ask about the textbook. Thank you for explaining the options so clearly.",
            "q": []
          }
        ],
        "groups": [
          {
            "type": "form",
            "kind": "gap",
            "range": [
              1,
              10
            ],
            "instruction": "Complete the form. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Booking and enquiry notes",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Student surname: {{1}}</p><p>Language chosen: {{2}}</p><p>Class day: {{3}}</p><p>Start time: {{4}}</p><p>Course length: {{5}} weeks</p><p>Course fee: £{{6}}</p><p>Buy the {{7}} after the first class.</p><p>Equipment available to borrow: {{8}}</p><p>Room number: {{9}}</p><p>Evening entrance is through the {{10}}.</p>",
            "answers": {
              "1": [
                "Reeves"
              ],
              "2": [
                "Spanish"
              ],
              "3": [
                "Wednesday"
              ],
              "4": [
                "six thirty",
                "6.30",
                "6:30",
                "18.30",
                "18:30"
              ],
              "5": [
                "ten",
                "10"
              ],
              "6": [
                "ninety-five",
                "95"
              ],
              "7": [
                "textbook"
              ],
              "8": [
                "headphones"
              ],
              "9": [
                "twenty-three",
                "23"
              ],
              "10": [
                "courtyard"
              ]
            },
            "explain": {
              "1": "Transcript dòng 2: “My surname is Reeves”.",
              "2": "Transcript dòng 2: “interested in Spanish”.",
              "3": "Transcript dòng 3: “Wednesday evenings”.",
              "4": "Transcript dòng 3: “start at six thirty”.",
              "5": "Transcript dòng 5: “runs for ten weeks”.",
              "6": "Transcript dòng 5: “ninety-five pounds”.",
              "7": "Transcript dòng 5: “The textbook costs extra”.",
              "8": "Transcript dòng 7: “borrow headphones”.",
              "9": "Transcript dòng 7: “room is twenty-three”.",
              "10": "Transcript dòng 7: “enter through the courtyard”."
            }
          }
        ]
      },
      {
        "id": "L7-S2",
        "part": 2,
        "title": "Exploring a community science fair",
        "context": "An organiser explains the plan and activities at a science fair.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Good morning, and welcome to the community science fair. Your plan shows the entrance at the bottom and north at the top. Follow the central path away from the entrance to explore the displays. This is an outdoor event with several covered structures, so a little rain won't bring the whole day to an end. Please use the marked paths rather than crossing behind the tents, where staff have cables and boxes that aren't always easy to see.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The first tent on the left as you enter contains the help desk. Staff can explain the schedule and replace a lost programme. The tent directly opposite, on the right, is the first-aid point. We had planned to put first aid at the far end of the site, but moved it closer to the entrance so emergency vehicles could reach it easily. Please keep the space between that tent and the entrance clear, even if you're only stopping for a moment.",
            "q": [
              11,
              12
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Walk north to the crossroads. The tent on the left contains the sound experiments, where you can compare different materials and listen to the effects. The tent opposite, to the right, has the robotics display. That one attracts a crowd, so please wait for staff to invite the next group inside. There are working models on low tables, and visitors who push forward may block the view for children standing behind them.",
            "q": [
              13
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Straight ahead beyond the crossroads is a central seating area. Go past it to the upper path, where you can turn left or right. The upper left branch leads to the astronomy tent in the northwest corner. It isn't just a display of photographs: volunteers can explain how to use a simple telescope. The upper right branch ends at the food stall in the northeast corner. You can also eat your own lunch in the central seating area.",
            "q": [
              14,
              15
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The workshop with limited places today is the bridge-building challenge. Collect a free token at the help desk before joining it. You don't need a token for ordinary displays. We considered selling workshop tickets to manage numbers, but a free token system seemed fairer for this community event. Each participant gets the same basic materials, and the activity is about testing a design, not about bringing an impressive finished model from home.",
            "q": [
              16
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Parents have asked which event is best for very young children. We recommend the colour-mixing session because it uses large containers and a clear demonstration. The robotics activity is more suitable for older children who can follow several instructions independently. The outdoor rocket demonstration will happen only if the wind is suitable. It may be delayed; please don't assume that an empty demonstration area means you've missed it. Check the notice at the help desk for the current decision.",
            "q": [
              17,
              18
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Lost items should be handed to the help desk, where we keep a written record. If you lose a reusable bottle, describe its colour and any label rather than simply asking for the newest one in the box. Finally, our volunteer photographers wear orange badges. Tell them if you don't want to appear in a photograph. Visitors are welcome to take pictures of displays, but should ask permission before photographing other people's children. I hope you enjoy trying the activities and asking questions throughout the day.",
            "q": [
              19,
              20
            ]
          }
        ],
        "groups": [
          {
            "type": "map",
            "kind": "match",
            "range": [
              11,
              15
            ],
            "instruction": "Label the plan. Choose the correct letter, A–G.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "Position A"
              },
              {
                "key": "B",
                "text": "Position B"
              },
              {
                "key": "C",
                "text": "Position C"
              },
              {
                "key": "D",
                "text": "Position D"
              },
              {
                "key": "E",
                "text": "Position E"
              },
              {
                "key": "F",
                "text": "Position F"
              },
              {
                "key": "G",
                "text": "Position G"
              }
            ],
            "questions": [
              {
                "n": 11,
                "text": "Help desk",
                "answer": "A",
                "explain": "Transcript dòng 2: “first tent on the left”."
              },
              {
                "n": 12,
                "text": "First-aid point",
                "answer": "B",
                "explain": "Transcript dòng 2: “directly opposite, on the right”."
              },
              {
                "n": 13,
                "text": "Sound experiments",
                "answer": "C",
                "explain": "Transcript dòng 3: “tent on the left contains the sound”."
              },
              {
                "n": 14,
                "text": "Astronomy tent",
                "answer": "F",
                "explain": "Transcript dòng 4: “northwest corner”."
              },
              {
                "n": 15,
                "text": "Food stall",
                "answer": "G",
                "explain": "Transcript dòng 4: “northeast corner”."
              }
            ],
            "image": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 620 480\" role=\"img\" aria-label=\"Site plan: entrance at the south, seven lettered positions linked by paths\"><rect x=\"10\" y=\"10\" width=\"600\" height=\"460\" rx=\"16\" fill=\"#f3f6ed\" stroke=\"#69785d\"/><path d=\"M310 430V95M140 350H480M140 245H480M140 95H480\" stroke=\"#d5c5a3\" stroke-width=\"22\" fill=\"none\"/><text x=\"310\" y=\"458\" text-anchor=\"middle\" font-size=\"20\" fill=\"#263429\">ENTRANCE</text><path d=\"M565 85V35l-9 14m9-14 9 14\" fill=\"none\" stroke=\"#263429\" stroke-width=\"3\"/><text x=\"565\" y=\"108\" text-anchor=\"middle\" font-size=\"19\" fill=\"#263429\">N</text><rect x=\"104\" y=\"323\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"140\" y=\"358\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">A</text><rect x=\"444\" y=\"323\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"480\" y=\"358\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">B</text><rect x=\"104\" y=\"218\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"140\" y=\"253\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">C</text><rect x=\"444\" y=\"218\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"480\" y=\"253\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">D</text><rect x=\"274\" y=\"143\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"310\" y=\"178\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">E</text><rect x=\"104\" y=\"68\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"140\" y=\"103\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">F</text><rect x=\"444\" y=\"68\" width=\"72\" height=\"54\" rx=\"8\" fill=\"#fff\" stroke=\"#526849\" stroke-width=\"2\"/><text x=\"480\" y=\"103\" text-anchor=\"middle\" font-size=\"27\" fill=\"#263429\">G</text></svg>"
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              16,
              18
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 16,
                "text": "What is needed for bridge building?",
                "options": [
                  "A A model brought from home",
                  "B A paid ticket",
                  "C A free token"
                ],
                "answer": "C",
                "explain": "Transcript dòng 5: “Collect a free token”."
              },
              {
                "n": 17,
                "text": "Which activity is recommended for very young children?",
                "options": [
                  "A Robotics",
                  "B Colour mixing",
                  "C Bridge building"
                ],
                "answer": "B",
                "explain": "Transcript dòng 6: “recommend the colour-mixing session”."
              },
              {
                "n": 18,
                "text": "What may delay the rocket demonstration?",
                "options": [
                  "A Unsuitable wind",
                  "B A shortage of photographs",
                  "C The closing of the food stall"
                ],
                "answer": "A",
                "explain": "Transcript dòng 6: “only if the wind is suitable”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              19,
              20
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Lost items are recorded at the {{19}}.</p><p>Volunteer photographers have {{20}} badges.</p>",
            "answers": {
              "19": [
                "help desk"
              ],
              "20": [
                "orange"
              ]
            },
            "explain": {
              "19": "Transcript dòng 7: “help desk, where we keep a written record”.",
              "20": "Transcript dòng 7: “wear orange badges”."
            }
          }
        ]
      },
      {
        "id": "L7-S3",
        "part": 3,
        "title": "Preparing oral-history interviews",
        "context": "Two history students discuss an interview project with a supervisor.",
        "audio": null,
        "script": [
          {
            "speaker": "Supervisor",
            "voice": "f",
            "text": "You've chosen to interview former market traders. What do you want the interviews to contribute that the written sources don't already provide? A broad request for memories can produce interesting stories, but the assignment will be stronger if you identify a question. It will also help you decide which people to approach and which parts of a long recording are relevant to analyse.",
            "q": []
          },
          {
            "speaker": "Nora",
            "voice": "m",
            "text": "We're focusing on how traders adapted when the market moved indoors. The council minutes describe the building decision, but say much less about changes to everyday routines. We don't want simply to prove that the move was good or bad. We'd like to compare how different traders handled storage, opening hours and relationships with regular customers.",
            "q": [
              21
            ]
          },
          {
            "speaker": "Ethan",
            "voice": "f2",
            "text": "We first thought we'd interview only people who still trade there. Then we realised that would leave out anyone who stopped after the move. We'll try to include former traders as well. The sample will still be small, but at least we can explain how our selection might affect the picture rather than pretending that the easiest people to contact represent everyone.",
            "q": [
              22
            ]
          },
          {
            "speaker": "Supervisor",
            "voice": "f",
            "text": "That's a useful adjustment. Be careful with the interview questions. If you ask whether the new building ruined the atmosphere, you've suggested an answer before the person begins. Ask them to describe a typical day before and after the move. Follow up on a detail, but allow them to disagree with the assumptions you brought to the conversation.",
            "q": [
              23
            ]
          },
          {
            "speaker": "Nora",
            "voice": "m",
            "text": "We've allocated the preparation. I'll contact potential participants, because I already have an introduction from the traders' association. Ethan will test the recording equipment and check that the files can be copied safely. We'll both write the question guide. Could you review the consent information before we send it? We want people to understand how their recordings would be used.",
            "q": [
              25,
              26,
              27
            ]
          },
          {
            "speaker": "Supervisor",
            "voice": "f",
            "text": "Yes, I'll review that information. Make sure participants know they can decline a question. Don't promise that a recording is anonymous if a voice or a distinctive story could identify someone. You can offer different permissions for quotation and for keeping a full recording, but describe them clearly. A signed page isn't useful consent if the choices on it are confusing.",
            "q": [
              28
            ]
          },
          {
            "speaker": "Ethan",
            "voice": "f2",
            "text": "We tested an interview with my uncle, who wasn't a trader. That helped with timing, but it doesn't count as evidence for the project. He found the first question too abstract, so we've replaced it with a request to describe arriving at work. We also decided to keep a short note immediately after each interview about interruptions or anything that might affect interpretation.",
            "q": [
              24
            ]
          },
          {
            "speaker": "Nora",
            "voice": "m",
            "text": "Before the first real interview, we'll do two final checks: confirm the participant's permission choices, and make a backup recording test. We won't send them a list of answers we expect, and we aren't going to correct their memories during the conversation. Afterwards, we'll compare the account with other sources and distinguish a remembered experience from a fact we can independently establish.",
            "q": [
              29,
              30
            ]
          }
        ],
        "groups": [
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              21,
              24
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 21,
                "text": "What is the main research focus?",
                "options": [
                  "A Whether the council spent too much",
                  "B How traders adapted to an indoor market",
                  "C The architectural style of the building"
                ],
                "answer": "B",
                "explain": "Transcript dòng 2: “how traders adapted”."
              },
              {
                "n": 22,
                "text": "Why include people who stopped trading?",
                "options": [
                  "A To avoid hearing only from those who remained",
                  "B To increase the recording length",
                  "C To replace all current traders"
                ],
                "answer": "A",
                "explain": "Transcript dòng 3: “leave out anyone who stopped”."
              },
              {
                "n": 23,
                "text": "What problem does the supervisor identify in one proposed question?",
                "options": [
                  "A It uses too much technical language",
                  "B It is too short",
                  "C It suggests a negative answer"
                ],
                "answer": "C",
                "explain": "Transcript dòng 4: “you've suggested an answer”."
              },
              {
                "n": 24,
                "text": "What was the value of the interview with Ethan’s uncle?",
                "options": [
                  "A It established the market’s opening date",
                  "B It tested the procedure without supplying project evidence",
                  "C It replaced the need for other interviews"
                ],
                "answer": "B",
                "explain": "Transcript dòng 7: “helped with timing”."
              }
            ]
          },
          {
            "type": "matching",
            "kind": "match",
            "range": [
              25,
              28
            ],
            "instruction": "Match each item with the correct option. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Nora"
              },
              {
                "key": "B",
                "text": "Ethan"
              },
              {
                "key": "C",
                "text": "Both students"
              },
              {
                "key": "D",
                "text": "Supervisor"
              }
            ],
            "questions": [
              {
                "n": 25,
                "text": "Contact potential interviewees",
                "answer": "A",
                "explain": "Transcript dòng 5: “I'll contact potential participants”."
              },
              {
                "n": 26,
                "text": "Test the recording equipment",
                "answer": "B",
                "explain": "Transcript dòng 5: “Ethan will test”."
              },
              {
                "n": 27,
                "text": "Write the question guide",
                "answer": "C",
                "explain": "Transcript dòng 5: “both write the question guide”."
              },
              {
                "n": 28,
                "text": "Review the consent information",
                "answer": "D",
                "explain": "Transcript dòng 6: “I'll review that information”."
              }
            ]
          },
          {
            "type": "mcq-multi",
            "kind": "multi",
            "range": [
              29,
              30
            ],
            "instruction": "Choose <b>TWO</b> letters.",
            "questions": [
              {
                "ns": [
                  29,
                  30
                ],
                "text": "Which TWO checks will happen before the first real interview?",
                "options": [
                  "A Correct the participant’s memories",
                  "B Confirm permission choices",
                  "C Send expected answers",
                  "D Write the final conclusion",
                  "E Test backup recording"
                ],
                "answer": [
                  "B",
                  "E"
                ],
                "explain": "Transcript dòng 8: “confirm the participant's permission choices”. Hai việc cuối là xác nhận lựa chọn cho phép sử dụng và kiểm tra ghi âm dự phòng."
              }
            ]
          }
        ]
      },
      {
        "id": "L7-S4",
        "part": 4,
        "title": "How a postal network organises a journey",
        "context": "A lecturer uses a simplified postal network to explain service design.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Today we'll analyse a simplified postal network. This is a model for thinking about organisation, rather than a history of one country's postal service. A letter appears to travel from one person to another, but its journey usually depends on a sequence of shared operations. Collection, sorting, transport and delivery need to fit together. Improving one stage can fail to improve the whole journey if the next connection is missed. The network is therefore more than a collection of individually efficient offices.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Begin with the address. It is information that guides a physical object. A clear destination reduces the need for staff to resolve ambiguity, while an incomplete description can send the item into a separate checking process. In our model, every collection point has a published collection time. Posting a letter just after that time may add a day before movement even begins. A faster vehicle later in the journey would not recover a day already spent waiting at the start.",
            "q": [
              31,
              32
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Collected letters go to a sorting centre. There they are grouped by destination, so that transport can carry many items heading in the same direction. A machine may assist, but exceptions still require a process. An unclear address is not improved merely by passing it through the same machine again. The network needs a way to identify difficult cases, seek further information where possible and record an item that cannot be delivered.",
            "q": [
              33,
              36,
              37
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The next stage depends on a connection between sorting and departure. A completed batch that arrives after the vehicle leaves waits for the following service. This is why the timetable of the whole chain matters. In our example, managers first proposed increasing vehicle speed. They then found that most avoidable delay occurred while batches waited for a connection. Adjusting the schedule was more relevant than buying a faster vehicle, although neither choice would solve every possible disruption.",
            "q": [
              38
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "At the destination area, letters are sorted into delivery rounds. A round is not simply a straight line between two distant points. It includes repeated stops, access to buildings and the time needed to identify the right delivery point. A dense neighbourhood may have many addresses close together, while a rural round may require long travel between a few stops. Comparing only the number of letters can therefore misrepresent the work involved in each area.",
            "q": [
              39
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "To evaluate the model, we record arrival times at successive stages. We also record exceptions, including incomplete addresses and missed connections. An average journey time is informative, but it can hide a small group of items that consistently take much longer. The service target should specify which part of the distribution it describes. We shouldn't treat a good average as evidence that every destination receives the same reliability.",
            "q": [
              34,
              40
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Finally, resilience requires a plan for disruption. If one sorting centre is unavailable, an alternative route needs capacity and clear instructions. A line drawn on a map doesn't guarantee either. Staff must know when to use the alternative and how to communicate a delay. This returns us to the main lesson: a network works through coordinated decisions as well as movement. The letter's journey is shaped by information and waiting at each stage, not only by the distance between sender and recipient.",
            "q": [
              35
            ]
          }
        ],
        "groups": [
          {
            "type": "note",
            "kind": "gap",
            "range": [
              31,
              35
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Lecture notes",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>The destination is given in the {{31}}.</p><p>Each collection point publishes a collection {{32}}.</p><p>Difficult addresses require an {{33}} process.</p><p>A good average does not guarantee equal {{34}}.</p><p>An alternative route must have sufficient {{35}}.</p>",
            "answers": {
              "31": [
                "address"
              ],
              "32": [
                "time"
              ],
              "33": [
                "exceptions"
              ],
              "34": [
                "reliability"
              ],
              "35": [
                "capacity"
              ]
            },
            "explain": {
              "31": "Transcript dòng 2: “Begin with the address”.",
              "32": "Transcript dòng 2: “a published collection time”.",
              "33": "Transcript dòng 3: “exceptions still require a process”.",
              "34": "Transcript dòng 6: “the same reliability”.",
              "35": "Transcript dòng 7: “needs capacity”."
            }
          },
          {
            "type": "flow",
            "kind": "gap",
            "range": [
              36,
              40
            ],
            "instruction": "Complete the flow-chart. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Process overview",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<ol><li>After collection, letters go to a {{36}} centre.</li><li>Letters are grouped by {{37}}.</li><li>A completed batch arriving late {{38}} for the next service.</li><li>At the destination, items are allocated to delivery {{39}}.</li><li>Evaluation records arrival times and {{40}}.</li></ol>",
            "answers": {
              "36": [
                "sorting"
              ],
              "37": [
                "destination"
              ],
              "38": [
                "waits"
              ],
              "39": [
                "rounds"
              ],
              "40": [
                "exceptions"
              ]
            },
            "explain": {
              "36": "Transcript dòng 3: “a sorting centre”.",
              "37": "Transcript dòng 3: “grouped by destination”.",
              "38": "Transcript dòng 4: “waits for the following service”.",
              "39": "Transcript dòng 5: “delivery rounds”.",
              "40": "Transcript dòng 6: “record exceptions”."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "L8",
    "title": "Practice Test 8 — Travel, Nature & Urban Climate",
    "source": "Biên soạn cho luyện tập · audio TTS · không phải đề thi thật",
    "provenance": {
      "kind": "original",
      "addedOn": "2026-10-16"
    },
    "sections": [
      {
        "id": "L8-S1",
        "part": 1,
        "title": "Asking about lost property on a train",
        "context": "A passenger contacts a railway lost-property office.",
        "audio": null,
        "script": [
          {
            "speaker": "Officer",
            "voice": "f",
            "text": "Railway lost property, how can I help? We receive items from several stations, so please don't travel here until we've checked whether your belongings are actually at this office. If you lost something today, it may not have reached us yet. I can make a report now and compare it with the items recorded by the station teams.",
            "q": []
          },
          {
            "speaker": "Passenger",
            "voice": "m",
            "text": "Thank you. My surname is Lawson, L-A-W-S-O-N. I left a bag on a train yesterday afternoon. I boarded at Ashford and got off at Milltown. I first thought I'd left it in the station café, but a friend remembers seeing it beside me after we'd boarded, so it must have stayed on the train when I left.",
            "q": [
              1,
              2
            ]
          },
          {
            "speaker": "Officer",
            "voice": "f",
            "text": "I'll record Milltown as the station where you got off. Can you remember the time of the train? The time you boarded is more useful than the arrival time, because some services were delayed yesterday. Also, were you sitting in a standard carriage or in the small first-class area near the front? That helps staff narrow down where to look.",
            "q": []
          },
          {
            "speaker": "Passenger",
            "voice": "m",
            "text": "It was the two twenty departure, and I was in standard class, carriage C. I said B when I spoke to the station yesterday, but I've checked my seat reservation and C is correct. The bag is green, quite dark green, with a long shoulder strap. It's not the blue suitcase that I also had with me; I still have that.",
            "q": [
              3,
              4,
              5
            ]
          },
          {
            "speaker": "Officer",
            "voice": "f",
            "text": "What was inside the green bag? Please mention something that wouldn't be obvious from looking at it. We need a way to identify the owner without asking people to open every bag we have. Don't give me bank details or anything confidential. A distinctive ordinary item is usually enough for the report.",
            "q": []
          },
          {
            "speaker": "Passenger",
            "voice": "m",
            "text": "There's a silver thermos, with a small dent near the lid, and a paperback novel. No laptop, thankfully. The front pocket has a yellow notebook with my first name written inside. I don't mind describing the book if you need more details. I'd really like the notebook back, because it contains notes for a course I'm taking.",
            "q": [
              6,
              7
            ]
          },
          {
            "speaker": "Officer",
            "voice": "f",
            "text": "Those details should help. If the bag is located, collection is from the central office beside the station, not from the ticket counter. Bring photo ID. You can also request delivery for eight pounds, although that takes a few working days. We keep ordinary items for six weeks before following our disposal procedure. We'll contact you if anything matches, rather than asking you to call every morning.",
            "q": [
              8,
              9,
              10
            ]
          },
          {
            "speaker": "Passenger",
            "voice": "m",
            "text": "I'll collect it if it turns up, as I pass the station on my way to work. Please contact me by email rather than telephone during the day; I'm often in meetings and can't answer. I'll check my messages this evening. I understand that the report doesn't mean you've found it yet. At least you now have the corrected carriage and the description of the notebook.",
            "q": []
          }
        ],
        "groups": [
          {
            "type": "form",
            "kind": "gap",
            "range": [
              1,
              10
            ],
            "instruction": "Complete the form. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Booking and enquiry notes",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Passenger surname: {{1}}</p><p>Station where passenger left the train: {{2}}</p><p>Departure time: {{3}}</p><p>Correct carriage letter: {{4}}</p><p>Colour of missing bag: {{5}}</p><p>Metal item inside: {{6}}</p><p>Colour of notebook: {{7}}</p><p>Document required for collection: {{8}}</p><p>Delivery charge: £{{9}}</p><p>Retention period: {{10}} weeks</p>",
            "answers": {
              "1": [
                "Lawson"
              ],
              "2": [
                "Milltown"
              ],
              "3": [
                "two twenty",
                "2.20",
                "2:20",
                "14.20",
                "14:20"
              ],
              "4": [
                "C"
              ],
              "5": [
                "green",
                "dark green"
              ],
              "6": [
                "thermos",
                "silver thermos"
              ],
              "7": [
                "yellow"
              ],
              "8": [
                "photo ID"
              ],
              "9": [
                "eight",
                "8"
              ],
              "10": [
                "six",
                "6"
              ]
            },
            "explain": {
              "1": "Transcript dòng 2: “My surname is Lawson”.",
              "2": "Transcript dòng 2: “got off at Milltown”.",
              "3": "Transcript dòng 4: “the two twenty departure”.",
              "4": "Transcript dòng 4: “C is correct”.",
              "5": "Transcript dòng 4: “bag is green”.",
              "6": "Transcript dòng 6: “a silver thermos”.",
              "7": "Transcript dòng 6: “a yellow notebook”.",
              "8": "Transcript dòng 7: “Bring photo ID”.",
              "9": "Transcript dòng 7: “eight pounds”.",
              "10": "Transcript dòng 7: “for six weeks”."
            }
          }
        ]
      },
      {
        "id": "L8-S2",
        "part": 2,
        "title": "Choosing a trail at Greywood Reserve",
        "context": "A ranger advises visitors about walking routes.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Welcome to Greywood Reserve. We have several routes, and the longest isn't necessarily the best choice for your visit. Please consider the weather, your footwear and the time you have before deciding. Distances on the leaflet are for complete routes back to the visitor centre, not just the outward section. Some older signs show one-way distances, so the leaflet is the better reference if the two appear to disagree. Staff can also suggest a shorter alternative if someone in your group becomes tired.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The River Trail follows the water and is the best route for people interested in spotting birds from a sheltered viewing screen. Please approach quietly. The Orchard Loop is short and has information about the varieties of fruit once grown here. It includes several stopping places, making it a useful option for a leisurely visit. You won't see much of the river from it, so don't choose it simply because the entrance is near the bridge.",
            "q": [
              13,
              15
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Ridge Path provides the widest view, but it includes a steep climb and can be exposed to wind. It isn't our recommendation for visitors with pushchairs. The Meadow Walk has a firm, level surface and is the easiest option for wheels, including pushchairs and mobility aids. After heavy rain there may still be puddles, so level doesn't mean you can expect completely dry shoes in every season.",
            "q": [
              11,
              12
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Old Railway route uses the former railway bed and includes signs explaining how goods were once moved through this valley. It's the main choice for transport history. The Woodland Circuit takes you through dense trees and is cooler on a sunny afternoon. There are exposed roots, so keep watching the path even when you stop to look at the trees. We had considered removing every root across the route, but that would damage the woodland, and instead we have marked the most difficult sections.",
            "q": [
              14
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The important change today concerns the bridge on the River Trail. It is closed for inspection, so use the signed diversion. The bird screen remains accessible, and the whole reserve isn't closed. The diversion adds about ten minutes to a normal walk. Please don't move the barrier or follow someone who has climbed around it. Our staff need the bridge clear while they inspect the supports underneath it.",
            "q": [
              16
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "For a family visit, we suggest collecting a discovery sheet from the centre. It encourages children to notice shapes, sounds and tracks, rather than collect plants. All plants should remain where they are, even if you see plenty of the same kind. Dogs are welcome on a lead, but they aren't allowed in the small wildlife enclosure beside the centre. The café accepts cards as well as cash, despite what an older review online may have said.",
            "q": [
              17
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Our guided walk leaves at two from the courtyard. You don't need to reserve, although please arrive a few minutes early so the ranger knows how many people are coming. The last part of the visitor centre to close is the exhibition room, at five. The toilets close earlier for cleaning. If you borrow binoculars, return them to reception before leaving. We record the number on each pair, so please check that you're returning the same pair your group borrowed.",
            "q": [
              18,
              19,
              20
            ]
          }
        ],
        "groups": [
          {
            "type": "matching",
            "kind": "match",
            "range": [
              11,
              15
            ],
            "instruction": "Match each description with the correct place. There are more options than questions.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "River Trail"
              },
              {
                "key": "B",
                "text": "Orchard Loop"
              },
              {
                "key": "C",
                "text": "Ridge Path"
              },
              {
                "key": "D",
                "text": "Meadow Walk"
              },
              {
                "key": "E",
                "text": "Old Railway"
              },
              {
                "key": "F",
                "text": "Woodland Circuit"
              }
            ],
            "questions": [
              {
                "n": 11,
                "text": "A route for views over the widest area",
                "answer": "C",
                "explain": "Transcript dòng 3: “provides the widest view”."
              },
              {
                "n": 12,
                "text": "The easiest route for pushchairs",
                "answer": "D",
                "explain": "Transcript dòng 3: “easiest option for wheels”."
              },
              {
                "n": 13,
                "text": "A route with fruit-growing information",
                "answer": "B",
                "explain": "Transcript dòng 2: “varieties of fruit”."
              },
              {
                "n": 14,
                "text": "The main route for transport history",
                "answer": "E",
                "explain": "Transcript dòng 4: “main choice for transport history”."
              },
              {
                "n": 15,
                "text": "A route with a bird-viewing screen",
                "answer": "A",
                "explain": "Transcript dòng 2: “spotting birds from a sheltered viewing screen”."
              }
            ]
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              16,
              18
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 16,
                "text": "What should visitors do because of the bridge inspection?",
                "options": [
                  "A Avoid the entire reserve",
                  "B Use a signed diversion",
                  "C Return another day for the bird screen"
                ],
                "answer": "B",
                "explain": "Transcript dòng 5: “use the signed diversion”."
              },
              {
                "n": 17,
                "text": "What does the discovery sheet encourage children to do?",
                "options": [
                  "A Collect wild plants",
                  "B Bring objects from home",
                  "C Notice features without collecting plants"
                ],
                "answer": "C",
                "explain": "Transcript dòng 6: “notice shapes, sounds and tracks”."
              },
              {
                "n": 18,
                "text": "What is required for the guided walk?",
                "options": [
                  "A Arriving shortly before departure",
                  "B Paying in cash in advance",
                  "C Booking by telephone"
                ],
                "answer": "A",
                "explain": "Transcript dòng 7: “arrive a few minutes early”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              19,
              20
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>The guided walk starts from the {{19}}.</p><p>Borrowed binoculars must be returned to {{20}}.</p>",
            "answers": {
              "19": [
                "courtyard"
              ],
              "20": [
                "reception"
              ]
            },
            "explain": {
              "19": "Transcript dòng 7: “from the courtyard”.",
              "20": "Transcript dòng 7: “return them to reception”."
            }
          }
        ]
      },
      {
        "id": "L8-S3",
        "part": 3,
        "title": "Comparing temperatures in urban spaces",
        "context": "Two geography students review an observation exercise.",
        "audio": null,
        "script": [
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "How did the urban-temperature exercise go? Remember that the aim was to compare the places systematically, not to find the single hottest number and build the whole report around it. Tell me first about the method, particularly the height of the sensors and the timing of your visits. Those details matter when you interpret differences between locations.",
            "q": []
          },
          {
            "speaker": "Lena",
            "voice": "m",
            "text": "We used the same sensor at every site and kept it shaded at the same height. Our first plan was to put it directly on different surfaces, but then we'd be comparing surface temperatures with air temperatures without being clear about the distinction. We also visited the sites in a rotating order, so one place wasn't always measured later in the afternoon than the others.",
            "q": [
              21,
              22
            ]
          },
          {
            "speaker": "Amir",
            "voice": "f2",
            "text": "The biggest practical difficulty was access to the rooftop. We had permission initially, but the building manager couldn't accompany us on the second visit. We left that measurement missing rather than taking a reading through a closed window and calling it comparable. We can discuss the gap and explain why a neat complete table would be misleading in that case.",
            "q": [
              23
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "Good decision. What did you notice at the other places? Be cautious about moving from an observation to a general explanation. You can suggest that shade or building form influenced a reading, but a short exercise doesn't isolate every cause. Include notes about wind and cloud because a change in the weather can affect all the locations while you're moving between them.",
            "q": []
          },
          {
            "speaker": "Lena",
            "voice": "m",
            "text": "We've organised the site descriptions. The car park had the least shade, with a large exposed paved area. The courtyard was shaded by buildings but had little air movement during our visit. The park had the most tree cover. The shopping street was the noisiest site, which made our spoken notes difficult to hear. The rooftop is the site with incomplete measurements, as Amir explained.",
            "q": [
              25,
              26,
              27,
              28
            ]
          },
          {
            "speaker": "Amir",
            "voice": "f2",
            "text": "I wanted to use a colour map in the report, but our locations are too few to show a reliable continuous pattern across the district. We'll use a table and a simple site plan instead. The plan will show where we measured, not colour every unmeasured street as if we knew its temperature. That should make the limits easier to understand.",
            "q": [
              24
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "What would you change if you repeated it? More equipment isn't always the first answer. Think about whether your schedule captured the same conditions and whether the notes allow someone else to interpret the readings. A carefully designed repeat can be useful even with one sensor, provided you don't make claims that depend on simultaneous measurement.",
            "q": []
          },
          {
            "speaker": "Lena",
            "voice": "m",
            "text": "Our two priorities are to repeat the visits in different weather and arrange simultaneous readings with borrowed sensors. We aren't proposing to buy a drone or measure every roof in the city. We'll also keep the site descriptions. They explain why a number from a sheltered courtyard shouldn't automatically be treated as representative of the whole surrounding neighbourhood.",
            "q": [
              29,
              30
            ]
          }
        ],
        "groups": [
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              21,
              24
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 21,
                "text": "Why did the students change the first measurement plan?",
                "options": [
                  "A It mixed surface and air temperatures",
                  "B It required too many questionnaires",
                  "C It measured only sound"
                ],
                "answer": "A",
                "explain": "Transcript dòng 2: “comparing surface temperatures with air temperatures”."
              },
              {
                "n": 22,
                "text": "How did they reduce a timing bias?",
                "options": [
                  "A They visited only at sunrise",
                  "B They varied the order of sites",
                  "C They removed all afternoon readings"
                ],
                "answer": "B",
                "explain": "Transcript dòng 2: “visited the sites in a rotating order”."
              },
              {
                "n": 23,
                "text": "Why is one rooftop reading missing?",
                "options": [
                  "A The sensor was lost",
                  "B The roof was too cold",
                  "C The required accompanying manager was unavailable"
                ],
                "answer": "C",
                "explain": "Transcript dòng 3: “couldn't accompany us”."
              },
              {
                "n": 24,
                "text": "Why reject a continuous colour map?",
                "options": [
                  "A The software was too expensive",
                  "B There were too few measured locations to support it",
                  "C The tutor had prohibited all maps"
                ],
                "answer": "B",
                "explain": "Transcript dòng 6: “locations are too few”."
              }
            ]
          },
          {
            "type": "matching",
            "kind": "match",
            "range": [
              25,
              28
            ],
            "instruction": "Match each item with the correct option. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Car park"
              },
              {
                "key": "B",
                "text": "Courtyard"
              },
              {
                "key": "C",
                "text": "Park"
              },
              {
                "key": "D",
                "text": "Shopping street"
              },
              {
                "key": "E",
                "text": "Rooftop"
              }
            ],
            "questions": [
              {
                "n": 25,
                "text": "Least shaded area",
                "answer": "A",
                "explain": "Transcript dòng 5: “car park had the least shade”."
              },
              {
                "n": 26,
                "text": "Little air movement",
                "answer": "B",
                "explain": "Transcript dòng 5: “little air movement”."
              },
              {
                "n": 27,
                "text": "Greatest tree cover",
                "answer": "C",
                "explain": "Transcript dòng 5: “most tree cover”."
              },
              {
                "n": 28,
                "text": "Noise interfered with recordings",
                "answer": "D",
                "explain": "Transcript dòng 5: “noisiest site”."
              }
            ]
          },
          {
            "type": "mcq-multi",
            "kind": "multi",
            "range": [
              29,
              30
            ],
            "instruction": "Choose <b>TWO</b> letters.",
            "questions": [
              {
                "ns": [
                  29,
                  30
                ],
                "text": "Which TWO improvements are prioritised?",
                "options": [
                  "A Purchase a drone",
                  "B Measure every city roof",
                  "C Repeat in different weather",
                  "D Use simultaneous readings",
                  "E Remove site descriptions"
                ],
                "answer": [
                  "C",
                  "D"
                ],
                "explain": "Transcript dòng 8: “repeat the visits in different weather”. Nhóm muốn lặp lại trong thời tiết khác và đo đồng thời bằng cảm biến mượn."
              }
            ]
          }
        ]
      },
      {
        "id": "L8-S4",
        "part": 4,
        "title": "Investigating shade in urban design",
        "context": "A lecturer explains an observation-based approach to urban shade.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Today we'll consider shade as part of urban design. Trees and structures can both prevent some sunlight from reaching a surface, but they do not create identical conditions. Trees also interact with water through their leaves, while a solid roof may change airflow in a different way. The purpose of our exercise is not to announce one universal winner. It is to identify which questions a design team should ask before choosing a solution for a particular place and group of users.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The first step is to define the activity. Waiting at a bus stop, walking along a street and sitting at a café involve different times and positions. A patch of shade that is useful in the morning may have moved away by the afternoon. The team therefore needs a record of time as well as location. A photograph taken at noon cannot represent every hour, even if it appears to show the whole site clearly.",
            "q": [
              31,
              32
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Next, separate the measurements. Air temperature, surface temperature and a person's experience are related, but they are not the same variable. A thermometer touching a bench does not provide a direct reading of the air above it. We ask students to label each measurement explicitly. This avoids a common problem in presentations, where numbers from different methods are placed side by side as though they were interchangeable observations of one thing.",
            "q": [
              33
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "In our illustrative project, the team compares three possible interventions. A tree can provide shade and contributes to cooling through transpiration, but it requires suitable growing conditions and continued care. A canopy offers shade from a structure, although its height and shape must suit the activity below. A schedule change moves an activity to a cooler part of the day without altering the site. That third option may be useful in a limited setting, but won't help someone who has no choice about when to travel.",
            "q": [
              34
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Each intervention has a different maintenance question. Trees need room for roots and arrangements for watering when appropriate. A canopy needs inspection of its fixings. A change of schedule needs communication so that intended users actually know about it. The team initially planned to compare only installation prices. It then added continuing responsibilities, since a low initial cost means little if no one has agreed to carry out the work that keeps a measure effective.",
            "q": [
              35,
              36,
              37,
              38
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Evaluation should include people using the space. Counting how many choose a shaded seat can be informative, but the result depends on whether seats are available and whether other features make them desirable. A seat near a busy road may be avoided for reasons unrelated to shade. Interviews and repeated observation can help explain the choice. The team should also notice people who stop coming, rather than assuming that everyone absent from the site has found a comfortable alternative.",
            "q": [
              39
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Finally, a trial should make its limits visible. A few observations in one season cannot establish performance throughout the year. We can still learn from them if the conditions are recorded accurately and the next questions are clear. Urban cooling decisions combine physical measurements with access, maintenance and timing. The best option is the one that addresses the stated need under the relevant conditions, with a plan for continued care, rather than the one that produces the most dramatic photograph on the day it is installed.",
            "q": [
              40
            ]
          }
        ],
        "references": [
          "https://www.epa.gov/heatislands/what-are-heat-islands"
        ],
        "groups": [
          {
            "type": "note",
            "kind": "gap",
            "range": [
              31,
              35
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Lecture notes",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Start by defining the intended {{31}}.</p><p>Record both location and {{32}}.</p><p>Do not confuse air and {{33}} temperature.</p><p>Trees cool partly through {{34}}.</p><p>Initial cost should be considered with continuing {{35}}.</p>",
            "answers": {
              "31": [
                "activity"
              ],
              "32": [
                "time"
              ],
              "33": [
                "surface"
              ],
              "34": [
                "transpiration"
              ],
              "35": [
                "responsibilities"
              ]
            },
            "explain": {
              "31": "Transcript dòng 2: “define the activity”.",
              "32": "Transcript dòng 2: “record of time”.",
              "33": "Transcript dòng 3: “surface temperature”.",
              "34": "Transcript dòng 4: “through transpiration”.",
              "35": "Transcript dòng 5: “continuing responsibilities”."
            }
          },
          {
            "type": "table",
            "kind": "gap",
            "range": [
              36,
              40
            ],
            "instruction": "Complete the table. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Examples and requirements",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<table><thead><tr><th>Item</th><th>Notes</th></tr></thead><tbody><tr><th>36</th><td>Trees: allow room for {{36}}.</td></tr><tr><th>37</th><td>Canopy: inspect its {{37}}.</td></tr><tr><th>38</th><td>Schedule change: ensure effective {{38}}.</td></tr><tr><th>39</th><td>Evaluation: combine interviews with repeated {{39}}.</td></tr><tr><th>40</th><td>A short trial cannot represent every {{40}}.</td></tr></tbody></table>",
            "answers": {
              "36": [
                "roots"
              ],
              "37": [
                "fixings"
              ],
              "38": [
                "communication"
              ],
              "39": [
                "observation"
              ],
              "40": [
                "season"
              ]
            },
            "explain": {
              "36": "Transcript dòng 5: “room for roots”.",
              "37": "Transcript dòng 5: “inspection of its fixings”.",
              "38": "Transcript dòng 5: “needs communication”.",
              "39": "Transcript dòng 6: “repeated observation”.",
              "40": "Transcript dòng 7: “one season”."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "L9",
    "title": "Practice Test 9 — Volunteering, Access & Archaeology",
    "source": "Biên soạn cho luyện tập · audio TTS · không phải đề thi thật",
    "provenance": {
      "kind": "original",
      "addedOn": "2026-10-16"
    },
    "sections": [
      {
        "id": "L9-S1",
        "part": 1,
        "title": "Joining a neighbourhood festival team",
        "context": "A volunteer talks to a festival coordinator.",
        "audio": null,
        "script": [
          {
            "speaker": "Coordinator",
            "voice": "f",
            "text": "Hello, this is the neighbourhood festival office. We're still looking for volunteers, particularly for the afternoon activities. You don't have to commit to the whole weekend. We can arrange one shift, provided you attend the short briefing beforehand. Have you volunteered with us before, or would this be your first festival?",
            "q": []
          },
          {
            "speaker": "Volunteer",
            "voice": "m",
            "text": "It would be my first. My name is Natalie Foster, F-O-S-T-E-R. I helped at a school event last year, mostly showing visitors where to go. I'd be comfortable doing something similar. I don't have any experience of sound equipment, so please don't put me in charge of the stage, even though I enjoy music.",
            "q": [
              1
            ]
          },
          {
            "speaker": "Coordinator",
            "voice": "f",
            "text": "We could use you at the information desk. That involves answering straightforward questions and referring anything complicated to a supervisor. The role at the ticket gate is already full. The festival day we need most help with is Sunday. Saturday has enough people, although the website hasn't been updated to show that yet. Would Sunday fit around your other plans?",
            "q": [
              2,
              3
            ]
          },
          {
            "speaker": "Volunteer",
            "voice": "m",
            "text": "Yes, I'm free then. I thought I'd be working until lunch, but my colleague has changed shifts with me. Could I begin at one? I can stay until five, so four hours altogether. I don't drive, but I can take a bus into the town centre and walk from there. I just need to know where to report.",
            "q": [
              4,
              5
            ]
          },
          {
            "speaker": "Coordinator",
            "voice": "f",
            "text": "Report to the library, not the town hall. The festival office will use a room beside the library entrance that day. Bring a bottle of water. We'll provide lunch for volunteers who work the earlier shift, but your afternoon shift includes a snack instead. There will be fruit and sandwiches, and we can accommodate dietary needs if we know in advance.",
            "q": [
              6,
              7
            ]
          },
          {
            "speaker": "Volunteer",
            "voice": "m",
            "text": "I'm vegetarian, but I don't have any allergies. I can bring something of my own as well, so please don't worry if arrangements are already fixed. Will I need a special shirt or badge? It would help visitors identify me, although I'd prefer not to buy clothing just for a single afternoon.",
            "q": [
              8
            ]
          },
          {
            "speaker": "Coordinator",
            "voice": "f",
            "text": "We'll lend you a jacket, so there's nothing to buy. Wear comfortable shoes, because you may occasionally walk with a visitor to show them a route. The briefing is on Thursday at six, here in the office. It takes about forty minutes. If you can't come, tell us now so we can offer the place to someone who can receive the same safety information.",
            "q": [
              9,
              10
            ]
          },
          {
            "speaker": "Volunteer",
            "voice": "m",
            "text": "Thursday is fine. I'll put both dates in my calendar. Could you send the details by text? I heard about the opportunity from a neighbour, rather than from the website, so I haven't filled in an online form yet. I can give you my number and complete the contact details at the briefing. I'm looking forward to meeting the rest of the team before the busy day.",
            "q": []
          }
        ],
        "groups": [
          {
            "type": "form",
            "kind": "gap",
            "range": [
              1,
              10
            ],
            "instruction": "Complete the form. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Booking and enquiry notes",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Volunteer surname: {{1}}</p><p>Assigned role: {{2}}</p><p>Day needing help: {{3}}</p><p>Start time: {{4}} p.m.</p><p>Shift length: {{5}} hours</p><p>Report to the {{6}}.</p><p>Bring a bottle of {{7}}.</p><p>Dietary requirement: {{8}}</p><p>Clothing lent to volunteers: {{9}}</p><p>Briefing day: {{10}}</p>",
            "answers": {
              "1": [
                "Foster"
              ],
              "2": [
                "information desk"
              ],
              "3": [
                "Sunday"
              ],
              "4": [
                "one",
                "1",
                "1.00",
                "1:00"
              ],
              "5": [
                "four",
                "4"
              ],
              "6": [
                "library"
              ],
              "7": [
                "water"
              ],
              "8": [
                "vegetarian"
              ],
              "9": [
                "jacket"
              ],
              "10": [
                "Thursday"
              ]
            },
            "explain": {
              "1": "Transcript dòng 2: “F-O-S-T-E-R”.",
              "2": "Transcript dòng 3: “at the information desk”.",
              "3": "Transcript dòng 3: “is Sunday”.",
              "4": "Transcript dòng 4: “begin at one”.",
              "5": "Transcript dòng 4: “four hours altogether”.",
              "6": "Transcript dòng 5: “Report to the library”.",
              "7": "Transcript dòng 5: “bottle of water”.",
              "8": "Transcript dòng 6: “I'm vegetarian”.",
              "9": "Transcript dòng 7: “lend you a jacket”.",
              "10": "Transcript dòng 7: “briefing is on Thursday”."
            }
          }
        ]
      },
      {
        "id": "L9-S2",
        "part": 2,
        "title": "Finding support on a college campus",
        "context": "A student adviser introduces campus support services.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Welcome to the college. You won't remember every office name today, so please keep the small guide we're giving you. It explains which team deals with which question. You can also start at the general reception if you're unsure. We would much rather redirect a question than have someone miss support because the first office they tried wasn't the right one. Most services accept initial enquiries without an appointment, although a longer private meeting may need to be booked.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Learning Hub helps with study methods, including planning an essay and keeping track of sources. Staff won't write an assignment for you or tell you what grade it deserves. They can help you organise your approach and decide what to ask your subject tutor. The Wellbeing Office is the place to discuss personal difficulties affecting study. It offers private appointments and can explain other services when a problem needs specialist support. It isn't simply a place to collect attendance forms.",
            "q": [
              11,
              14
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "For part-time job applications and interview practice, contact the Careers Centre. You don't have to wait until your final year. The Finance Desk explains fees, payment schedules and applications for college support funds. Please bring any relevant letter when asking about a payment, because staff cannot always understand the issue from an amount written on a piece of paper. They can explain a process, but they can't promise that every application for financial support will succeed.",
            "q": [
              12,
              13
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Accommodation Team deals with college rooms and can explain where to seek advice about private renting. Don't assume it can inspect or repair a privately owned flat. The International Desk helps with the practical arrangements of arriving from another country, such as finding the right registration event. It works closely with other teams, so international students should still use the Learning Hub for essay planning rather than expecting one office to handle every question they have.",
            "q": [
              15
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "A change this year concerns booking appointments. Most teams now use the same booking page, which saves you from maintaining several separate accounts. Telephone booking is still possible. We considered making every appointment online-only, but that would be unhelpful if access to your account was the very problem you needed to discuss. If you book and then can't attend, cancel as soon as possible so the time can be offered to another student.",
            "q": [
              16,
              18
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The first-week workshop we recommend to everyone is about organising deadlines. It is practical rather than a lecture on being a successful student. Bring your timetable, and you'll create a first version of a weekly plan. The workshop on interview skills is useful too, but is optional and not designed for every new student immediately. Small changes to seminar rooms are common in the opening week, so check the daily notice rather than relying on a photograph of last year's timetable.",
            "q": [
              17
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Your student card is needed to borrow equipment from the Learning Hub. The card also opens some doors after normal reception hours, but it doesn't give unlimited access to every building. Replacement cards are requested at reception, where staff will explain the process. Finally, notices about temporary room changes appear on the digital noticeboard near the main entrance. Check it before walking to an unfamiliar room, and leave a little extra time during your first week while you're learning the campus layout.",
            "q": [
              19,
              20
            ]
          }
        ],
        "groups": [
          {
            "type": "matching",
            "kind": "match",
            "range": [
              11,
              15
            ],
            "instruction": "Match each description with the correct place. There are more options than questions.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "Learning Hub"
              },
              {
                "key": "B",
                "text": "Wellbeing Office"
              },
              {
                "key": "C",
                "text": "Careers Centre"
              },
              {
                "key": "D",
                "text": "Finance Desk"
              },
              {
                "key": "E",
                "text": "Accommodation Team"
              },
              {
                "key": "F",
                "text": "International Desk"
              }
            ],
            "questions": [
              {
                "n": 11,
                "text": "Advice on organising sources for an essay",
                "answer": "A",
                "explain": "Transcript dòng 2: “keeping track of sources”."
              },
              {
                "n": 12,
                "text": "Practice for a job interview",
                "answer": "C",
                "explain": "Transcript dòng 3: “interview practice”."
              },
              {
                "n": 13,
                "text": "Questions about a fee payment",
                "answer": "D",
                "explain": "Transcript dòng 3: “explains fees”."
              },
              {
                "n": 14,
                "text": "A private discussion of personal difficulties",
                "answer": "B",
                "explain": "Transcript dòng 2: “personal difficulties affecting study”."
              },
              {
                "n": 15,
                "text": "Advice about college rooms",
                "answer": "E",
                "explain": "Transcript dòng 4: “college rooms”."
              }
            ]
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              16,
              18
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 16,
                "text": "What has changed about appointment booking?",
                "options": [
                  "A All teams require a separate new account",
                  "B Most teams share a booking page",
                  "C Telephone booking has ended"
                ],
                "answer": "B",
                "explain": "Transcript dòng 5: “same booking page”."
              },
              {
                "n": 17,
                "text": "What should students bring to the deadline workshop?",
                "options": [
                  "A A completed job application",
                  "B A payment receipt",
                  "C Their timetable"
                ],
                "answer": "C",
                "explain": "Transcript dòng 6: “Bring your timetable”."
              },
              {
                "n": 18,
                "text": "What should a student do if unable to attend a booked meeting?",
                "options": [
                  "A Cancel promptly",
                  "B Send a friend in their place",
                  "C Wait until the following week"
                ],
                "answer": "A",
                "explain": "Transcript dòng 5: “cancel as soon as possible”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              19,
              20
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Borrowing equipment requires a {{19}}.</p><p>Temporary room changes are shown on the digital {{20}}.</p>",
            "answers": {
              "19": [
                "student card"
              ],
              "20": [
                "noticeboard"
              ]
            },
            "explain": {
              "19": "Transcript dòng 7: “Your student card is needed”.",
              "20": "Transcript dòng 7: “digital noticeboard”."
            }
          }
        ]
      },
      {
        "id": "L9-S3",
        "part": 3,
        "title": "Reviewing access to a museum exhibition",
        "context": "Students discuss an exhibition-access project.",
        "audio": null,
        "script": [
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "You've been looking at how people use the museum exhibition. I hope your project goes beyond checking whether a door is wide enough. Physical access matters, but so do information, planning and the opportunity to ask for help. What question have you chosen, and how will you avoid making assumptions about what a visitor needs?",
            "q": []
          },
          {
            "speaker": "Hana",
            "voice": "m",
            "text": "We're examining whether the visit information helps people plan before arriving. At first we wanted to score the whole museum, but that would require expertise and much more time. We're focusing on one temporary exhibition and asking participants to complete a few planning tasks. We aren't trying to award an official accessibility rating.",
            "q": [
              21
            ]
          },
          {
            "speaker": "Tom",
            "voice": "f2",
            "text": "We chose tasks rather than a general satisfaction question. If someone says a website is fine, we still don't know whether they could find the information they needed. We'll ask them to locate the entrance, check seating and work out how to request assistance. They can explain their thinking while they try, and we will record where the information becomes difficult to find.",
            "q": [
              22
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "That's more specific. Make sure participants can decline to discuss personal circumstances. You need to understand how the information works, not collect a detailed account of everyone's health. Also, don't imply that one person's preference represents every visitor with a similar difficulty. Describe what your small group actually encountered.",
            "q": []
          },
          {
            "speaker": "Hana",
            "voice": "m",
            "text": "Our first review found four useful points. The entrance description needs a photograph showing the actual doorway. The labels need stronger contrast between text and background. The online guide needs an estimate of walking distances. The audio tour needs a transcript, so people can use the content in another format. The booking page already explains how to request assistance clearly, so we won't rewrite it just to make every part look changed.",
            "q": [
              25,
              26,
              27,
              28
            ]
          },
          {
            "speaker": "Tom",
            "voice": "f2",
            "text": "We initially planned to ask participants to finish everything within ten minutes, but that would turn the exercise into a speed test. We'll let them work at their own pace. Time taken can still be noted, but it won't be treated as a simple measure of ability. A pause may mean someone is checking an important detail rather than failing to understand the page.",
            "q": [
              23
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "And how will you present the findings? Avoid a long list of faults with no link to the task. Show the information a person sought, what they found and why the difference mattered. The museum can then decide which change to make first. Some suggestions will need checking with staff before you can know whether the proposed wording is accurate.",
            "q": [
              24
            ]
          },
          {
            "speaker": "Hana",
            "voice": "m",
            "text": "We'll include two kinds of evidence in the presentation: examples of unsuccessful searches and participants' explanations of their decisions. We won't include private medical histories or rank people by how fast they worked. Tom will prepare the task examples, and I'll check the proposed revisions with the museum contact before we show the final slides.",
            "q": [
              29,
              30
            ]
          }
        ],
        "groups": [
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              21,
              24
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 21,
                "text": "Why was the project narrowed?",
                "options": [
                  "A The exhibition had already closed",
                  "B The whole-museum assessment was too broad",
                  "C The tutor wanted an official rating"
                ],
                "answer": "B",
                "explain": "Transcript dòng 2: “would require expertise and much more time”."
              },
              {
                "n": 22,
                "text": "Why use planning tasks?",
                "options": [
                  "A To observe whether information can actually be found",
                  "B To test visitors’ medical knowledge",
                  "C To make every participant finish quickly"
                ],
                "answer": "A",
                "explain": "Transcript dòng 3: “whether they could find the information”."
              },
              {
                "n": 23,
                "text": "Why was the ten-minute limit removed?",
                "options": [
                  "A No clock was available",
                  "B The website had stopped working",
                  "C It would create a speed test"
                ],
                "answer": "C",
                "explain": "Transcript dòng 6: “turn the exercise into a speed test”."
              },
              {
                "n": 24,
                "text": "How should recommendations be presented?",
                "options": [
                  "A As a ranking of participants",
                  "B As faults unrelated to activities",
                  "C Connected to information sought and its consequences"
                ],
                "answer": "C",
                "explain": "Transcript dòng 7: “why the difference mattered”."
              }
            ]
          },
          {
            "type": "matching",
            "kind": "match",
            "range": [
              25,
              28
            ],
            "instruction": "Match each item with the correct option. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Entrance description"
              },
              {
                "key": "B",
                "text": "Exhibition labels"
              },
              {
                "key": "C",
                "text": "Online guide"
              },
              {
                "key": "D",
                "text": "Audio tour"
              },
              {
                "key": "E",
                "text": "Booking page"
              }
            ],
            "questions": [
              {
                "n": 25,
                "text": "Add a photograph of the doorway",
                "answer": "A",
                "explain": "Transcript dòng 5: “photograph showing the actual doorway”."
              },
              {
                "n": 26,
                "text": "Improve text-background contrast",
                "answer": "B",
                "explain": "Transcript dòng 5: “stronger contrast”."
              },
              {
                "n": 27,
                "text": "State walking distances",
                "answer": "C",
                "explain": "Transcript dòng 5: “estimate of walking distances”."
              },
              {
                "n": 28,
                "text": "Provide a transcript",
                "answer": "D",
                "explain": "Transcript dòng 5: “audio tour needs a transcript”."
              }
            ]
          },
          {
            "type": "mcq-multi",
            "kind": "multi",
            "range": [
              29,
              30
            ],
            "instruction": "Choose <b>TWO</b> letters.",
            "questions": [
              {
                "ns": [
                  29,
                  30
                ],
                "text": "Which TWO forms of evidence will be presented?",
                "options": [
                  "A Private medical histories",
                  "B Unsuccessful-search examples",
                  "C A ranking by working speed",
                  "D Visitors’ explanations of decisions",
                  "E An official museum rating"
                ],
                "answer": [
                  "B",
                  "D"
                ],
                "explain": "Transcript dòng 8: “examples of unsuccessful searches”. Bài trình bày dùng ví dụ tìm kiếm không thành công và giải thích quyết định của người tham gia."
              }
            ]
          }
        ]
      },
      {
        "id": "L9-S4",
        "part": 4,
        "title": "Documenting an underwater heritage site",
        "context": "A lecturer introduces the interpretation of underwater archaeological evidence.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "An underwater archaeological site is more than a collection of old objects. The position of an object and its relationship to other material can help answer questions that the object alone cannot resolve. Today's lecture focuses on documentation. It is not a practical diving lesson or an invitation to collect souvenirs. Archaeological work requires appropriate permission, expertise and site protection. Our interest is how a record allows researchers to connect an observation to an interpretation and explain the uncertainty between them.",
            "q": [
              31
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Work begins with a research question and a review of existing information. A ship's name may be known, but that doesn't mean every part of the site has been explained. Historical documents, earlier surveys and local accounts can suggest what to investigate. They can also disagree. A careful team preserves the difference between a documented event and a later story, rather than choosing whichever account makes the most exciting introduction to a report.",
            "q": [
              32
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "At the site, researchers need a reference system for positions. A site plan links measurements so that separate observations can be compared. Photographs add visual evidence, but need scale and location information. A close-up of an interesting object may reveal a surface detail while telling the reader almost nothing about where it lay. Several kinds of record are therefore complementary. Repeating one attractive photograph does not replace the missing relationships.",
            "q": [
              33
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Consider a hypothetical survey with four records. A plan shows where objects are located relative to one another. Photographs show visible condition at the time of the survey. A measurement log records dimensions and the procedure used. A documentary file brings together written sources that may explain the vessel's use. None is automatically complete, and an interpretation should identify which record supports it. A plan can be precise about location while remaining uncertain about the identity of an item.",
            "q": [
              36,
              37,
              38,
              39
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The surrounding environment also matters. Sediment can cover or reveal material, and later movement can alter an arrangement. An exposed object is not necessarily resting exactly where it first fell. Researchers therefore record environmental observations instead of treating the seabed as an untouched display case. In many situations, documenting material in place is preferable to removal. If removal is considered, the decision involves conservation and responsibility for what happens afterwards, not simply whether an object can be lifted.",
            "q": [
              34,
              35
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Digital models can help people examine a site remotely. Their usefulness depends on the observations from which they were made. A smooth completed model may hide gaps, so uncertain or reconstructed areas should be identified. We should not mistake a convincing visual surface for independent confirmation of every detail. The model is a way of organising evidence, and its presentation needs enough explanation for a reader to distinguish measurement from reconstruction.",
            "q": [
              40
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Finally, the archive should preserve the route from observation to claim. Future researchers may ask different questions or develop better ways to analyse a record. They need the measurements, descriptions and limitations, not just the first team's conclusion. Maritime archaeology gains value through this continuing examination of context. A carefully documented object left in place can provide more knowledge than an unrecorded object removed for display, because its relationships remain available for investigation.",
            "q": []
          }
        ],
        "references": [
          "https://oceanexplorer.noaa.gov/explainers/archaeology/"
        ],
        "groups": [
          {
            "type": "note",
            "kind": "gap",
            "range": [
              31,
              35
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Lecture notes",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>An object’s {{31}} links it to surrounding material.</p><p>Begin with a research {{32}} and existing information.</p><p>Photographs need location details and {{33}}.</p><p>Changing {{34}} can cover or reveal material.</p><p>Possible removal raises questions of {{35}}.</p>",
            "answers": {
              "31": [
                "position"
              ],
              "32": [
                "question"
              ],
              "33": [
                "scale"
              ],
              "34": [
                "sediment"
              ],
              "35": [
                "conservation"
              ]
            },
            "explain": {
              "31": "Transcript dòng 1: “The position of an object”.",
              "32": "Transcript dòng 2: “a research question”.",
              "33": "Transcript dòng 3: “need scale and location information”.",
              "34": "Transcript dòng 5: “Sediment can cover”.",
              "35": "Transcript dòng 5: “involves conservation”."
            }
          },
          {
            "type": "table",
            "kind": "gap",
            "range": [
              36,
              40
            ],
            "instruction": "Complete the table. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Examples and requirements",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<table><thead><tr><th>Item</th><th>Notes</th></tr></thead><tbody><tr><th>36</th><td>Site {{36}}: relative positions of objects</td></tr><tr><th>37</th><td>Photographs: visible {{37}} at the survey date</td></tr><tr><th>38</th><td>Measurement log: dimensions and {{38}} used</td></tr><tr><th>39</th><td>Documentary file: {{39}} sources</td></tr><tr><th>40</th><td>Digital model: mark uncertain or {{40}} areas.</td></tr></tbody></table>",
            "answers": {
              "36": [
                "plan"
              ],
              "37": [
                "condition"
              ],
              "38": [
                "procedure"
              ],
              "39": [
                "written"
              ],
              "40": [
                "reconstructed"
              ]
            },
            "explain": {
              "36": "Transcript dòng 4: “A plan shows”.",
              "37": "Transcript dòng 4: “visible condition”.",
              "38": "Transcript dòng 4: “the procedure used”.",
              "39": "Transcript dòng 4: “written sources”.",
              "40": "Transcript dòng 6: “reconstructed areas”."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "L10",
    "title": "Practice Test 10 — Camping, Sport & Communication",
    "source": "Biên soạn cho luyện tập · audio TTS · không phải đề thi thật",
    "provenance": {
      "kind": "original",
      "addedOn": "2026-10-16"
    },
    "sections": [
      {
        "id": "L10-S1",
        "part": 1,
        "title": "Reserving a campsite for a family",
        "context": "A camper phones a campsite to check facilities and make a reservation.",
        "audio": null,
        "script": [
          {
            "speaker": "Receptionist",
            "voice": "f",
            "text": "Good afternoon, Pine Hollow Campsite. We have tent pitches and a few cabins, although the cabins are almost fully booked for the school holidays. If you're bringing a caravan, I should mention that we no longer accept large vehicles on the lower field. What type of accommodation were you hoping to reserve?",
            "q": []
          },
          {
            "speaker": "Camper",
            "voice": "m",
            "text": "A pitch for a tent, please. My surname is Turner, T-U-R-N-E-R. There will be two adults and two children. We originally planned to come in July, but we've changed our holiday and would like August instead. We have a medium-sized tent, with a separate sleeping area for the children. We won't need electricity at the pitch.",
            "q": [
              1,
              2
            ]
          },
          {
            "speaker": "Receptionist",
            "voice": "f",
            "text": "August is possible. How many nights would you like? Some people assume we only accept week-long stays then, but that's only for the cabins. Tent bookings can be shorter. We ask everyone to arrive after two in the afternoon so that the previous campers have time to leave and we can check the pitch.",
            "q": []
          },
          {
            "speaker": "Camper",
            "voice": "m",
            "text": "We'd like three nights. We can arrive around three on the first day. We'd prefer the meadow field rather than the lakeside one. I know the lakeside pitches have a view, but the meadow is closer to the playground, and we'd rather not camp right beside the water with young children. Is there much difference in price?",
            "q": [
              3,
              4
            ]
          },
          {
            "speaker": "Receptionist",
            "voice": "f",
            "text": "The family rate is thirty-two pounds per night in either field. There's a deposit of twenty pounds for the booking, with the balance paid when you arrive. That's a deposit for the whole stay, not for each night. Please don't send the full payment before we've emailed the confirmation, because occasionally we need to offer a different pitch.",
            "q": [
              5,
              6
            ]
          },
          {
            "speaker": "Camper",
            "voice": "m",
            "text": "That's clear. Are cooking facilities provided, or should we bring everything? We have a small stove but limited space in the car. Also, one of the children is keen to go fishing. I realise you might not organise that yourselves, but perhaps there's somewhere suitable nearby where we could ask about permission.",
            "q": []
          },
          {
            "speaker": "Receptionist",
            "voice": "f",
            "text": "Bring your own stove and cooking equipment. There are shared sinks for washing up, but no communal kitchen. Fishing is possible at the reservoir, subject to its own rules and permits; reception can give you the contact details. On the campsite itself, dogs must remain on a lead. I'm mentioning that because some older reviews say they can run freely in the meadow, which is no longer correct.",
            "q": [
              7,
              8,
              9
            ]
          },
          {
            "speaker": "Camper",
            "voice": "m",
            "text": "We won't have a dog with us, but it's useful to know. Could we hire a storage locker for valuables? I'd rather not leave everything in the tent when we're out. If lockers are available, please add one to the booking. I found your campsite through a walking magazine, and the location looked ideal for a short break without spending every day in the car.",
            "q": [
              10
            ]
          }
        ],
        "groups": [
          {
            "type": "form",
            "kind": "gap",
            "range": [
              1,
              10
            ],
            "instruction": "Complete the form. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Booking and enquiry notes",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Surname: {{1}}</p><p>Month of visit: {{2}}</p><p>Length of stay: {{3}} nights</p><p>Preferred field: {{4}}</p><p>Family nightly price: £{{5}}</p><p>Deposit for the booking: £{{6}}</p><p>Campers must bring their own {{7}}.</p><p>Nearby fishing location: {{8}}</p><p>Dogs must be kept on a {{9}}.</p><p>Additional item requested: {{10}}</p>",
            "answers": {
              "1": [
                "Turner"
              ],
              "2": [
                "August"
              ],
              "3": [
                "three",
                "3"
              ],
              "4": [
                "meadow"
              ],
              "5": [
                "thirty-two",
                "32"
              ],
              "6": [
                "twenty",
                "20"
              ],
              "7": [
                "stove"
              ],
              "8": [
                "reservoir"
              ],
              "9": [
                "lead"
              ],
              "10": [
                "storage locker",
                "locker"
              ]
            },
            "explain": {
              "1": "Transcript dòng 2: “My surname is Turner”.",
              "2": "Transcript dòng 2: “would like August instead”.",
              "3": "Transcript dòng 4: “three nights”.",
              "4": "Transcript dòng 4: “the meadow field”.",
              "5": "Transcript dòng 5: “thirty-two pounds per night”.",
              "6": "Transcript dòng 5: “deposit of twenty pounds”.",
              "7": "Transcript dòng 7: “Bring your own stove”.",
              "8": "Transcript dòng 7: “at the reservoir”.",
              "9": "Transcript dòng 7: “on a lead”.",
              "10": "Transcript dòng 8: “hire a storage locker”."
            }
          }
        ]
      },
      {
        "id": "L10-S2",
        "part": 2,
        "title": "Facilities at Northgate Sports Centre",
        "context": "A centre manager introduces facilities to new members.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Good evening, and welcome to Northgate Sports Centre. Your membership gives you access to several facilities, but some organised sessions need a separate reservation. Please check the schedule rather than assuming a room is always available for informal use. We have changed the names of two spaces after the refurbishment, so staff may occasionally use an old name out of habit. The printed map and the current booking page use the same names, and those are the ones I'll use now.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Main Pool is used for lane swimming as well as lessons. For uninterrupted lengths, choose a time marked lane swimming, not family session. The Training Studio is where the instructor-led movement classes take place. You don't need to be experienced, but tell the instructor if it's your first visit so they can explain the equipment. The studio isn't an open gym where members use machines independently; that is a different room.",
            "q": [
              13,
              14
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Small Hall is available for table tennis, with tables that fold away between sessions. You can borrow bats at reception. The Outdoor Courts are used for tennis and basketball at different times. Please check which activity is booked before entering, since a tennis booking doesn't allow you to move the nets for a basketball game. The Fitness Room contains the machines for individual exercise. New users need an induction before using them without staff guidance.",
            "q": [
              11,
              12,
              15
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Our café serves snacks and is also a meeting place for walking groups that start from the centre. You can sit there without buying a full meal. We had planned to remove half the seating to add retail shelves, but member feedback persuaded us to keep it. People told us that a place to meet before and after activity was part of the centre's value, especially for those who came alone.",
            "q": [
              18
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The most important change for bookings is that members can now cancel through the same system they use to reserve a place. Previously, they had to telephone. Phone support is still available if the system doesn't work for you. Please cancel even if you think nobody will want the place at short notice. Some classes have a waiting list, and another member may be able to attend without much preparation.",
            "q": [
              16
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Saturday beginners' session is recommended for people who want to try several facilities before choosing a regular activity. It isn't an intensive training programme. Staff will explain what each area offers and help you decide where to start. For swimming, bring your own towel. We lend some sports equipment, but towels are not included. Lockers require a reusable token, which you can collect from reception and keep for future visits.",
            "q": [
              17,
              19,
              20
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Children under twelve must be accompanied in the general public areas, and organised classes have their own supervision arrangements. The centre closes at nine on weekdays, but the café closes an hour earlier. Please don't leave the Fitness Room at nine and then expect to buy a drink inside. Water fountains remain available near reception. If you have questions about a specific class, the timetable identifies the instructor and the best way to ask about its level before booking.",
            "q": []
          }
        ],
        "groups": [
          {
            "type": "matching",
            "kind": "match",
            "range": [
              11,
              15
            ],
            "instruction": "Match each description with the correct place. There are more options than questions.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "Main Pool"
              },
              {
                "key": "B",
                "text": "Training Studio"
              },
              {
                "key": "C",
                "text": "Small Hall"
              },
              {
                "key": "D",
                "text": "Outdoor Courts"
              },
              {
                "key": "E",
                "text": "Fitness Room"
              },
              {
                "key": "F",
                "text": "Café"
              }
            ],
            "questions": [
              {
                "n": 11,
                "text": "Independent exercise using machines",
                "answer": "E",
                "explain": "Transcript dòng 3: “machines for individual exercise”."
              },
              {
                "n": 12,
                "text": "Table tennis",
                "answer": "C",
                "explain": "Transcript dòng 3: “Small Hall is available for table tennis”."
              },
              {
                "n": 13,
                "text": "Instructor-led movement classes",
                "answer": "B",
                "explain": "Transcript dòng 2: “instructor-led movement classes”."
              },
              {
                "n": 14,
                "text": "Uninterrupted swimming lengths",
                "answer": "A",
                "explain": "Transcript dòng 2: “For uninterrupted lengths”."
              },
              {
                "n": 15,
                "text": "Tennis and basketball",
                "answer": "D",
                "explain": "Transcript dòng 3: “used for tennis and basketball”."
              }
            ]
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              16,
              18
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 16,
                "text": "What can members now do through the booking system?",
                "options": [
                  "A Buy every item in the café",
                  "B Skip the machine induction",
                  "C Cancel a reservation"
                ],
                "answer": "C",
                "explain": "Transcript dòng 5: “cancel through the same system”."
              },
              {
                "n": 17,
                "text": "Who is the Saturday session intended for?",
                "options": [
                  "A People exploring different facilities",
                  "B Experienced competitive swimmers",
                  "C Only children under twelve"
                ],
                "answer": "A",
                "explain": "Transcript dòng 6: “try several facilities”."
              },
              {
                "n": 18,
                "text": "Why was café seating retained?",
                "options": [
                  "A It was too costly to remove",
                  "B Members valued it as a meeting place",
                  "C The retail shelves were unavailable"
                ],
                "answer": "B",
                "explain": "Transcript dòng 4: “a place to meet before and after activity”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              19,
              20
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Swimmers should bring a {{19}}.</p><p>Lockers are operated with a reusable {{20}}.</p>",
            "answers": {
              "19": [
                "towel"
              ],
              "20": [
                "token"
              ]
            },
            "explain": {
              "19": "Transcript dòng 6: “bring your own towel”.",
              "20": "Transcript dòng 6: “reusable token”."
            }
          }
        ]
      },
      {
        "id": "L10-S3",
        "part": 3,
        "title": "Testing a reusable product package",
        "context": "Two design students discuss prototype packaging with a tutor.",
        "audio": null,
        "script": [
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "What did you learn from the packaging prototypes? I know you wanted a container that customers could use again, but the word reusable can hide several assumptions. You need to explain what the second use would be and whether your tests actually support it. A strong-looking box isn't automatically a useful package if people can't open it or store it conveniently.",
            "q": []
          },
          {
            "speaker": "Eva",
            "voice": "m",
            "text": "We selected a container for a small desk lamp. We first considered food packaging, but that would introduce questions we weren't equipped to investigate. The lamp gives us a clearer design problem: protect a fragile shade, keep the parts together and allow the box to become a storage container afterwards. We're not claiming it works for every household product.",
            "q": [
              21
            ]
          },
          {
            "speaker": "Sam",
            "voice": "f2",
            "text": "The first prototype had a complicated folding lid. People liked its appearance, but three of our trial users couldn't work out how to close it again. We simplified the lid before changing the material. That was useful because otherwise we might have blamed the cardboard for a problem caused by the instructions and the shape of the fastening.",
            "q": [
              22
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "How have you separated the tests? If a package fails after being soaked and dropped at the same time, it can be hard to tell which feature to redesign. Start with comparisons you can interpret. Later you can explain why combined conditions would be worth investigating, but don't present an uncontrolled demonstration as if it isolated a particular cause.",
            "q": [
              23
            ]
          },
          {
            "speaker": "Eva",
            "voice": "m",
            "text": "Our drop test checks protection against impact. The water test examines what happens after a small spill. The user trial checks whether people can open and reclose the lid without an explanation. The cost comparison looks at material prices. We also planned a storage test to see whether the box kept its shape over several months, but we can't complete that before the deadline.",
            "q": [
              24,
              25,
              26,
              27,
              28
            ]
          },
          {
            "speaker": "Sam",
            "voice": "f2",
            "text": "We'll report the storage test as future work. For the user trial, we won't tell people where to press before they begin, because that would remove the difficulty we need to observe. We can ask afterwards what they expected the fastening to do. We'll keep the instructions available as they would be with the actual product, rather than inventing extra spoken help for the trial.",
            "q": []
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "That sounds reasonable. Remember that a small number of users can reveal a problem without showing how common it is in the whole population. And be precise about the water test: a brief spill doesn't establish suitability for prolonged outdoor storage. State the conditions, including how long the material was wet and when you checked its strength.",
            "q": []
          },
          {
            "speaker": "Eva",
            "voice": "m",
            "text": "For the next prototype we will make two changes: enlarge the grip area and simplify the printed instructions. We aren't adding a plastic window or using a heavier decorative sleeve. Those wouldn't address the difficulties people actually had. Sam will update the drawing, and I'll repeat the opening trial so we can compare the new design with the old one under the same conditions.",
            "q": [
              29,
              30
            ]
          }
        ],
        "groups": [
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              21,
              24
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 21,
                "text": "Why choose packaging for a lamp?",
                "options": [
                  "A It avoided food-related questions beyond their project",
                  "B It required no protection",
                  "C It was the largest available product"
                ],
                "answer": "A",
                "explain": "Transcript dòng 2: “weren't equipped to investigate”."
              },
              {
                "n": 22,
                "text": "What difficulty appeared in the first trial?",
                "options": [
                  "A Users disliked every colour",
                  "B Users could not reclose the lid",
                  "C The lamp was too heavy to lift"
                ],
                "answer": "B",
                "explain": "Transcript dòng 3: “couldn't work out how to close it again”."
              },
              {
                "n": 23,
                "text": "Why separate the initial tests?",
                "options": [
                  "A To avoid collecting any measurements",
                  "B To reduce the number of users to one",
                  "C To identify which feature causes a failure"
                ],
                "answer": "C",
                "explain": "Transcript dòng 4: “which feature to redesign”."
              },
              {
                "n": 24,
                "text": "Why will the storage test remain future work?",
                "options": [
                  "A It is already guaranteed to succeed",
                  "B It requires more time than the project allows",
                  "C The tutor has banned storage containers"
                ],
                "answer": "B",
                "explain": "Transcript dòng 5: “several months”."
              }
            ]
          },
          {
            "type": "matching",
            "kind": "match",
            "range": [
              25,
              28
            ],
            "instruction": "Match each item with the correct option. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Drop test"
              },
              {
                "key": "B",
                "text": "Water test"
              },
              {
                "key": "C",
                "text": "User trial"
              },
              {
                "key": "D",
                "text": "Cost comparison"
              },
              {
                "key": "E",
                "text": "Storage test"
              }
            ],
            "questions": [
              {
                "n": 25,
                "text": "Resistance to impact",
                "answer": "A",
                "explain": "Transcript dòng 5: “drop test checks protection against impact”."
              },
              {
                "n": 26,
                "text": "Response to a small spill",
                "answer": "B",
                "explain": "Transcript dòng 5: “water test examines”."
              },
              {
                "n": 27,
                "text": "Opening and reclosing without spoken guidance",
                "answer": "C",
                "explain": "Transcript dòng 5: “user trial checks”."
              },
              {
                "n": 28,
                "text": "Prices of materials",
                "answer": "D",
                "explain": "Transcript dòng 5: “cost comparison looks at material prices”."
              }
            ]
          },
          {
            "type": "mcq-multi",
            "kind": "multi",
            "range": [
              29,
              30
            ],
            "instruction": "Choose <b>TWO</b> letters.",
            "questions": [
              {
                "ns": [
                  29,
                  30
                ],
                "text": "Which TWO changes will be made next?",
                "options": [
                  "A Add a plastic window",
                  "B Increase the grip area",
                  "C Use a heavier decorative sleeve",
                  "D Simplify printed instructions",
                  "E Remove the lid"
                ],
                "answer": [
                  "B",
                  "D"
                ],
                "explain": "Transcript dòng 8: “enlarge the grip area”. Hai sửa đổi nhắm vào thao tác mở: vùng cầm lớn hơn và hướng dẫn in đơn giản hơn."
              }
            ]
          }
        ]
      },
      {
        "id": "L10-S4",
        "part": 4,
        "title": "Helping an audience read a scientific chart",
        "context": "A lecturer explains how chart design affects interpretation.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Today we'll discuss scientific charts as arguments that readers must be able to inspect. A chart can be visually simple and still require careful explanation. The designer has chosen a measure, a scale and a comparison. Those decisions influence which pattern becomes noticeable. Our aim is not to remove all choices, which would be impossible, but to make the important ones clear enough that an audience can understand what the display supports and what remains uncertain.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Start with the question. If the audience needs to compare quantities, a chart designed mainly to show locations may make the task unnecessarily difficult. In our classroom example, students first chose a colourful map because it looked impressive. They later replaced it with a bar chart, since the question concerned differences between categories rather than geographical arrangement. The change wasn't a rule that maps are bad. It connected the display to the decision the audience actually needed to make.",
            "q": [
              31,
              32
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Labels need to identify the measure and its units. A number without a unit can be meaningless or misleading. The time period matters too: a monthly total cannot be compared directly with a yearly total simply because both appear under the same heading. We ask students to write a short caption that states what was measured, where the information came from and which observations were excluded. The caption is part of the explanation, not decoration added after the real work is finished.",
            "q": [
              33,
              34
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The axis deserves particular attention. A restricted range can make a small difference appear dramatic, although in some contexts it helps reveal a pattern that would otherwise be hard to see. The choice should be visible and justified. Similarly, equal spacing on a page should not suggest equal time intervals when the actual intervals differ. A reader should be able to recover the comparison from the chart rather than depend entirely on the presenter's spoken claim.",
            "q": [
              35
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Colour can distinguish groups, but it should not be the only way to do so. Patterns, labels or symbols can provide another route. This helps when a chart is printed without colour or viewed by someone who cannot readily distinguish the selected shades. Adding a different colour for every observation can also create noise. A limited palette is often easier to interpret when the same categories retain the same appearance across several related figures.",
            "q": [
              36,
              37
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Uncertainty needs a deliberate representation. Missing observations should not silently become zero values, and a smooth line should not imply measurements where none were taken. In the classroom example, the students marked a gap rather than joining two distant observations with an unexplained curve. They also retained access to a table of the underlying values. The table did not replace the chart; it allowed interested readers to check details that the visual summary was designed to simplify.",
            "q": [
              38,
              39
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Before presenting, ask someone unfamiliar with the work to explain what they think the chart shows. This can reveal a misleading title or an overlooked unit more effectively than another round of polishing. Do not simply ask whether the chart looks attractive. A useful test concerns interpretation: can the reader identify the comparison, the measure and the main limitation? The final goal is a display that makes the reasoning easier to examine, rather than one whose visual confidence asks the audience to accept a conclusion without checking it.",
            "q": [
              40
            ]
          }
        ],
        "groups": [
          {
            "type": "note",
            "kind": "gap",
            "range": [
              31,
              35
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Lecture notes",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Choose the display according to the audience’s {{31}}.</p><p>The classroom map was replaced by a {{32}} chart.</p><p>Numerical labels must include {{33}}.</p><p>Explain the period and source in a {{34}}.</p><p>A restricted axis can make differences appear {{35}}.</p>",
            "answers": {
              "31": [
                "question"
              ],
              "32": [
                "bar"
              ],
              "33": [
                "units"
              ],
              "34": [
                "caption"
              ],
              "35": [
                "dramatic"
              ]
            },
            "explain": {
              "31": "Transcript dòng 2: “Start with the question”.",
              "32": "Transcript dòng 2: “a bar chart”.",
              "33": "Transcript dòng 3: “its units”.",
              "34": "Transcript dòng 3: “short caption”.",
              "35": "Transcript dòng 4: “appear dramatic”."
            }
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              36,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Do not rely only on {{36}} to distinguish groups.</p><p>Use a limited {{37}} consistently across figures.</p><p>Missing observations must not silently become {{38}}.</p><p>Keep access to a table of underlying {{39}}.</p><p>Ask an unfamiliar reader to explain their {{40}}.</p>",
            "answers": {
              "36": [
                "Colour",
                "colour",
                "color"
              ],
              "37": [
                "palette"
              ],
              "38": [
                "zero",
                "0"
              ],
              "39": [
                "values"
              ],
              "40": [
                "interpretation"
              ]
            },
            "explain": {
              "36": "Transcript dòng 5: “Colour can distinguish”.",
              "37": "Transcript dòng 5: “A limited palette”.",
              "38": "Transcript dòng 6: “zero values”.",
              "39": "Transcript dòng 6: “underlying values”.",
              "40": "Transcript dòng 7: “A useful test concerns interpretation”."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "L11",
    "title": "Practice Test 11 — Animal Care, Recycling & Fieldwork",
    "source": "Biên soạn cho luyện tập · audio TTS · không phải đề thi thật",
    "provenance": {
      "kind": "original",
      "addedOn": "2026-10-16"
    },
    "sections": [
      {
        "id": "L11-S1",
        "part": 1,
        "title": "Arranging boarding for a dog",
        "context": "A dog owner asks a boarding service about a short stay.",
        "audio": null,
        "script": [
          {
            "speaker": "Assistant",
            "voice": "f",
            "text": "Hello, Willow Boarding. We look after dogs here, while the business next door handles cats. People sometimes confuse the two because we share the entrance road. Before we discuss dates, has your dog stayed with us before? We arrange a short introductory visit for new animals, so that the first overnight stay isn't their first experience of the place.",
            "q": []
          },
          {
            "speaker": "Owner",
            "voice": "m",
            "text": "No, this would be the first time. My surname is Bennett, B-E-N-N-E-T-T. The dog's name is Milo. He's a spaniel, and he's four years old. I said five on the online enquiry, but I was thinking of my sister's dog. Milo is used to staying with family, although this would be his first visit to a boarding service.",
            "q": [
              1,
              2,
              3,
              4
            ]
          },
          {
            "speaker": "Assistant",
            "voice": "f",
            "text": "Thanks for correcting that. What dates are you considering? We have more availability during the week than at weekends, but the introductory visit can be arranged separately. It's useful if you can bring him at a quiet time, because we want him to explore gradually rather than meet every other dog as soon as he comes through the gate.",
            "q": []
          },
          {
            "speaker": "Owner",
            "voice": "m",
            "text": "We need five nights in September. I can bring him for an introductory visit before then. He's sociable on walks, but he prefers a quiet place to sleep. We don't need grooming while he's with you, just the normal boarding service. Could you tell me what that costs and whether we should bring his own food?",
            "q": [
              5
            ]
          },
          {
            "speaker": "Assistant",
            "voice": "f",
            "text": "The standard price is twenty-nine pounds per night. Grooming would be extra, but I won't add that. Please bring his usual food in a labelled container, enough for the whole stay. Sudden changes aren't helpful, so we prefer not to give every dog the same meal. We'll also ask you to complete a routine sheet describing the times he's normally fed and walked.",
            "q": [
              6
            ]
          },
          {
            "speaker": "Owner",
            "voice": "m",
            "text": "I'll do that. He normally eats twice a day. His blanket would probably help him settle, so I'd like to bring that too. I don't need to bring his whole bed if space is limited. Will you send updates during the stay? I don't want to interrupt staff with lots of phone calls, but it would be nice to know he's settled.",
            "q": [
              7
            ]
          },
          {
            "speaker": "Assistant",
            "voice": "f",
            "text": "A blanket is welcome. We send a photo update once each afternoon if you choose that option on the form. For the introductory visit, please come on Friday at eleven. We first offered ten, but the morning cleaning takes a little longer now. Park by the green gate, not the main house, and ring the bell there. Someone will come out and show you around.",
            "q": [
              8,
              9,
              10
            ]
          },
          {
            "speaker": "Owner",
            "voice": "m",
            "text": "Friday at eleven works for me. Please send the form by email, and I'll complete it before the visit. My neighbour recommended you because her dog stayed here last winter. I'll bring the routine sheet and ask any remaining questions when I see the accommodation. I can pay the deposit after we've confirmed that the arrangements are suitable for Milo.",
            "q": []
          }
        ],
        "groups": [
          {
            "type": "form",
            "kind": "gap",
            "range": [
              1,
              10
            ],
            "instruction": "Complete the form. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Booking and enquiry notes",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Owner surname: {{1}}</p><p>Dog’s name: {{2}}</p><p>Breed: {{3}}</p><p>Correct age: {{4}}</p><p>Stay length: {{5}} nights</p><p>Nightly rate: £{{6}}</p><p>Familiar item owner will bring: {{7}}</p><p>Update format: {{8}}</p><p>Introductory visit day: {{9}}</p><p>Park beside the {{10}} gate.</p>",
            "answers": {
              "1": [
                "Bennett"
              ],
              "2": [
                "Milo"
              ],
              "3": [
                "spaniel"
              ],
              "4": [
                "four",
                "4"
              ],
              "5": [
                "five",
                "5"
              ],
              "6": [
                "twenty-nine",
                "29"
              ],
              "7": [
                "blanket"
              ],
              "8": [
                "photo"
              ],
              "9": [
                "Friday"
              ],
              "10": [
                "green"
              ]
            },
            "explain": {
              "1": "Transcript dòng 2: “My surname is Bennett”.",
              "2": "Transcript dòng 2: “dog's name is Milo”.",
              "3": "Transcript dòng 2: “a spaniel”.",
              "4": "Transcript dòng 2: “four years old”.",
              "5": "Transcript dòng 4: “five nights”.",
              "6": "Transcript dòng 5: “twenty-nine pounds”.",
              "7": "Transcript dòng 6: “His blanket”.",
              "8": "Transcript dòng 7: “a photo update”.",
              "9": "Transcript dòng 7: “come on Friday”.",
              "10": "Transcript dòng 7: “the green gate”."
            }
          }
        ]
      },
      {
        "id": "L11-S2",
        "part": 2,
        "title": "Using the town reuse and recycling centre",
        "context": "An employee explains a recycling centre’s procedures.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Welcome to the town reuse and recycling centre. Please pause at the entrance so an attendant can check what you've brought and direct you safely. The site has separate areas for different materials, and putting everything in the nearest container can make recovery more difficult. If you aren't sure about an item, ask before unloading it. Rules can change as our contractors change, so a neighbour's experience from several years ago may not describe the current arrangement.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Reuse Cabin accepts household objects that are still suitable for someone else to use. Staff decide whether an item can be accepted; please don't leave broken furniture outside the door when it is closed. The Paper Bay is for clean paper and cardboard. Flatten boxes before putting them in, because empty boxes take up space quickly. Cardboard covered with food or other material may need different handling, so show it to an attendant rather than mixing it into the clean load.",
            "q": [
              11,
              12
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Small appliances and other electrical items go to the Electrical Point. They don't belong in the Metal Container simply because part of the outside is metal. The Garden Area accepts plant material from ordinary household garden work. Remove plastic bags before emptying them. We used to allow compost bags to be left in the same area, but staff then had to remove them by hand, so that practice has ended.",
            "q": [
              13,
              14
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The Metal Container is for the metal items attendants identify as appropriate there. General Waste is the final option for accepted items that don't fit the recovery areas, rather than the place to put everything you haven't sorted. We know unloading can be tiring, and our staff can advise on safe arrangements, but visitors remain responsible for bringing a suitable load. Don't climb into a container to retrieve something, even if it is a small item. Tell a member of staff immediately.",
            "q": [
              15,
              18
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "There are two changes this month. First, vans need an advance booking. Ordinary cars do not need one for a normal household visit. Secondly, we are trialling a separate check for reusable items at the entrance. This may take a little extra time, but it helps keep usable objects out of the waste containers. We considered charging for every visit, but that is not part of the current trial. Please don't confuse a proposal discussed at a meeting with a rule that has already started.",
            "q": [
              16,
              17
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The quietest period is usually the middle of a weekday afternoon. Saturday mornings can be busy, although exact conditions vary. For your safety, wear closed shoes rather than sandals. Children should remain in the vehicle unless staff direct otherwise. If you need to discuss a disability-related access arrangement, contact us before travelling so we can explain the options and prepare a suitable place for unloading.",
            "q": [
              19
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "You can find the accepted-materials list on the council website, and a printed copy is available at the entrance. Bring proof of address if you are visiting for the first time, because this centre serves local households. Commercial waste follows a different system. At the end of your visit, follow the one-way arrows to the exit. Don't turn against the flow to reach a container you missed; an attendant will tell you how to return to it safely.",
            "q": [
              20
            ]
          }
        ],
        "groups": [
          {
            "type": "matching",
            "kind": "match",
            "range": [
              11,
              15
            ],
            "instruction": "Match each description with the correct place. There are more options than questions.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "Reuse Cabin"
              },
              {
                "key": "B",
                "text": "Paper Bay"
              },
              {
                "key": "C",
                "text": "Electrical Point"
              },
              {
                "key": "D",
                "text": "Garden Area"
              },
              {
                "key": "E",
                "text": "Metal Container"
              },
              {
                "key": "F",
                "text": "General Waste"
              }
            ],
            "questions": [
              {
                "n": 11,
                "text": "Objects still suitable for another household",
                "answer": "A",
                "explain": "Transcript dòng 2: “still suitable for someone else”."
              },
              {
                "n": 12,
                "text": "Clean flattened cardboard",
                "answer": "B",
                "explain": "Transcript dòng 2: “Paper Bay is for clean paper and cardboard”."
              },
              {
                "n": 13,
                "text": "Small appliances",
                "answer": "C",
                "explain": "Transcript dòng 3: “Small appliances”."
              },
              {
                "n": 14,
                "text": "Household plant waste",
                "answer": "D",
                "explain": "Transcript dòng 3: “plant material”."
              },
              {
                "n": 15,
                "text": "Accepted metal objects",
                "answer": "E",
                "explain": "Transcript dòng 4: “Metal Container is for the metal items”."
              }
            ]
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              16,
              18
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 16,
                "text": "Who now needs an advance booking?",
                "options": [
                  "A All visitors on foot",
                  "B Drivers of vans",
                  "C Drivers of ordinary cars"
                ],
                "answer": "B",
                "explain": "Transcript dòng 5: “vans need an advance booking”."
              },
              {
                "n": 17,
                "text": "What is being trialled at the entrance?",
                "options": [
                  "A A new charge for every visit",
                  "B A ban on reusable objects",
                  "C A separate check for reusable items"
                ],
                "answer": "C",
                "explain": "Transcript dòng 5: “separate check for reusable items”."
              },
              {
                "n": 18,
                "text": "What should someone do after dropping an object into the wrong container?",
                "options": [
                  "A Tell a member of staff",
                  "B Climb in immediately",
                  "C Drive against the one-way arrows"
                ],
                "answer": "A",
                "explain": "Transcript dòng 4: “Tell a member of staff immediately”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              19,
              20
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Visitors should wear closed {{19}}.</p><p>First-time visitors need proof of {{20}}.</p>",
            "answers": {
              "19": [
                "shoes"
              ],
              "20": [
                "address"
              ]
            },
            "explain": {
              "19": "Transcript dòng 6: “wear closed shoes”.",
              "20": "Transcript dòng 7: “proof of address”."
            }
          }
        ]
      },
      {
        "id": "L11-S3",
        "part": 3,
        "title": "Sampling litter beside a river",
        "context": "Environmental-science students plan a small riverbank survey.",
        "audio": null,
        "script": [
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "How is your riverbank litter survey taking shape? You can't survey the whole river in the time available, so the important question is how your selected sections relate to the claim you want to make. Please distinguish the number of objects you find from the amount entering the river. A count on the bank doesn't directly measure everything moving through the water.",
            "q": []
          },
          {
            "speaker": "Iman",
            "voice": "m",
            "text": "We're comparing three short bank sections. We initially chose them because they were close to the bus route, but that alone wouldn't explain why they're useful comparisons. We've selected one near a footbridge, one beside a picnic area and one downstream of the sports ground. Each section will be the same length, and we'll record the limits clearly so someone else can repeat it.",
            "q": [
              21
            ]
          },
          {
            "speaker": "Felix",
            "voice": "f2",
            "text": "We also changed the collection rule. We won't pick up an item first and decide its category later, because we'd lose information about where it was. We'll photograph its position, record it and then collect it if it's safe to handle under the fieldwork instructions. Anything we can't handle safely will be recorded but left for the appropriate team.",
            "q": [
              22
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "That is a better sequence. Check the weather and river conditions before travelling. If access is unsafe, postpone rather than substituting an easier section without explaining the change. The method should include decisions about exceptions. Otherwise the final table may look comparable even though different rules were used at different places.",
            "q": [
              23
            ]
          },
          {
            "speaker": "Iman",
            "voice": "m",
            "text": "We've called the footbridge section Site A. It is the easiest to reach but has the steepest steps. Site B is beside the picnic area and needs permission from the landowner. Site C is downstream of the sports ground and has the widest bank. At all sites we'll use the same category sheet, including an option for objects we can't identify confidently.",
            "q": [
              25,
              26,
              27,
              28
            ]
          },
          {
            "speaker": "Felix",
            "voice": "f2",
            "text": "The first pilot showed a problem with tiny fragments. It took a long time to decide whether something counted, and our decisions weren't consistent. We'll specify a minimum visible size in the method and acknowledge what that excludes. We aren't claiming to measure microscopic material. Adding a category for it without suitable equipment would make the survey sound more comprehensive than it really is.",
            "q": [
              24
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "What will you do if a public event takes place at one site during the survey week? That might affect the count, but it is also useful contextual information. Don't erase it simply to make the sites seem alike. Record the timing and discuss whether a later repeat would help distinguish an unusual event from a more regular pattern.",
            "q": []
          },
          {
            "speaker": "Iman",
            "voice": "m",
            "text": "In the report we'll retain two contextual records: recent weather and nearby public events. We won't collect visitors' names or estimate the entire river's annual plastic load. Our conclusions will stay with these measured sections and dates. Felix will prepare the site plan, and I'll write the rules for recording uncertain objects so we apply the same judgment throughout.",
            "q": [
              29,
              30
            ]
          }
        ],
        "groups": [
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              21,
              24
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 21,
                "text": "Why use sections of the same length?",
                "options": [
                  "A To make the comparisons repeatable",
                  "B To avoid recording locations",
                  "C To represent the whole river automatically"
                ],
                "answer": "A",
                "explain": "Transcript dòng 2: “someone else can repeat it”."
              },
              {
                "n": 22,
                "text": "What happens before collecting an item?",
                "options": [
                  "A It is given to a visitor",
                  "B Its position is photographed and recorded",
                  "C Its original location is ignored"
                ],
                "answer": "B",
                "explain": "Transcript dòng 3: “photograph its position, record it”."
              },
              {
                "n": 23,
                "text": "What should happen if access is unsafe?",
                "options": [
                  "A Choose another site without recording the change",
                  "B Continue with fewer people",
                  "C Postpone the visit"
                ],
                "answer": "C",
                "explain": "Transcript dòng 4: “postpone”."
              },
              {
                "n": 24,
                "text": "Why define a minimum visible size?",
                "options": [
                  "A To exclude all uncertainty from science",
                  "B To make inconsistent fragment decisions more consistent",
                  "C To estimate microscopic material precisely"
                ],
                "answer": "B",
                "explain": "Transcript dòng 6: “decisions weren't consistent”."
              }
            ]
          },
          {
            "type": "matching",
            "kind": "match",
            "range": [
              25,
              28
            ],
            "instruction": "Match each item with the correct option. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Site A"
              },
              {
                "key": "B",
                "text": "Site B"
              },
              {
                "key": "C",
                "text": "Site C"
              },
              {
                "key": "D",
                "text": "All sites"
              }
            ],
            "questions": [
              {
                "n": 25,
                "text": "Permission is needed from a landowner",
                "answer": "B",
                "explain": "Transcript dòng 5: “Site B”."
              },
              {
                "n": 26,
                "text": "The widest bank",
                "answer": "C",
                "explain": "Transcript dòng 5: “Site C”."
              },
              {
                "n": 27,
                "text": "The steepest access steps",
                "answer": "A",
                "explain": "Transcript dòng 5: “steepest steps”."
              },
              {
                "n": 28,
                "text": "Use of the same category sheet",
                "answer": "D",
                "explain": "Transcript dòng 5: “At all sites”."
              }
            ]
          },
          {
            "type": "mcq-multi",
            "kind": "multi",
            "range": [
              29,
              30
            ],
            "instruction": "Choose <b>TWO</b> letters.",
            "questions": [
              {
                "ns": [
                  29,
                  30
                ],
                "text": "Which TWO contextual records will be retained?",
                "options": [
                  "A Visitor names",
                  "B Annual plastic load of the entire river",
                  "C Recent weather",
                  "D Nearby public events",
                  "E The cost of every object"
                ],
                "answer": [
                  "C",
                  "D"
                ],
                "explain": "Transcript dòng 8: “recent weather and nearby public events”. Chỉ giữ thời tiết gần đây và sự kiện công cộng lân cận làm bối cảnh."
              }
            ]
          }
        ]
      },
      {
        "id": "L11-S4",
        "part": 4,
        "title": "Learning from observations of soil",
        "context": "A lecturer introduces a cautious approach to observing soil condition.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Our topic is how to use observations of soil without asking one simple test to answer every question. Soil is a habitat as well as material beneath a crop. Its structure, organisms, water and management history interact. A useful investigation combines records of the site with clearly described observations. It does not begin by declaring that one colour, one photograph or one handful gives a complete diagnosis. The aim today is to understand the questions an introductory field exercise can reasonably explore.",
            "q": [
              31
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "First, record the context. Note recent weather and the previous management of the area, including any disturbance you know about. A surface after heavy rain may look different from the same surface in a dry period. Comparing sites without this information can lead us to describe a temporary condition as a permanent property. It is also important to mark the sampling location, because a later visit is more informative if you know whether you returned to the same place.",
            "q": [
              32,
              33
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Next, describe rather than immediately judge. Note surface cover, visible roots and the arrangement of clumps. In our student exercise, one group initially wrote only good or bad in its notebook. We replaced those labels with descriptions that another observer could understand. The exercise became more useful because disagreement could be discussed through recorded features, rather than through two unexplained verdicts. A description may still contain uncertainty, and that uncertainty should be kept.",
            "q": [
              34
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Soil-health approaches commonly emphasise protecting the soil with cover, reducing unnecessary disturbance and maintaining living roots for more of the year. These are principles, not a single recipe for every field. Management decisions depend on the setting, including crops and local conditions. Our exercise does not recommend copying a neighbouring farm's exact schedule. It asks what processes the practice is intended to support and what evidence would help assess that aim in the area being studied.",
            "q": [
              35,
              36
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Infiltration is one process students can investigate with a carefully defined procedure. They record how water enters the soil under the chosen test conditions. The amount applied and the starting moisture matter, so those details belong with the result. A rapid result on one occasion should not be turned into a claim about every storm. We also avoid comparing a compacted path with a cultivated bed without recording that the two surfaces have had different uses.",
            "q": [
              37,
              38
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Living organisms provide further observations, but simple counts need context. Finding several earthworms is interesting; failing to find them in a small sample doesn't establish that the entire site contains none. Time of year and the method can affect what is seen. We therefore retain the observation and describe the search, rather than treating it as a final biological inventory. Repeated observations can reveal patterns, provided the procedure is consistent enough for the comparison to mean something.",
            "q": [
              39,
              40
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Finally, keep the records usable. Photographs need dates and a scale when size is relevant. Notes should link to the sampling location and the method, so a later student can understand the comparison. The broader lesson is that soil observation gains strength through context and repetition. A careful modest claim can guide a better question, while a dramatic verdict unsupported by the method can prevent learning. Good fieldwork makes its evidence available for others to examine, including the limitations of what was actually observed.",
            "q": []
          }
        ],
        "references": [
          "https://www.nrcs.usda.gov/conservation-basics/soil/soil-health/soil-health-on-cropland"
        ],
        "groups": [
          {
            "type": "note",
            "kind": "gap",
            "range": [
              31,
              35
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Lecture notes",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Soil is also a {{31}} for organisms.</p><p>Record recent {{32}} before comparing sites.</p><p>Mark the sampling {{33}}.</p><p>Replace broad judgments with observable {{34}}.</p><p>Soil cover and reduced disturbance are guiding {{35}}.</p>",
            "answers": {
              "31": [
                "habitat"
              ],
              "32": [
                "weather"
              ],
              "33": [
                "location"
              ],
              "34": [
                "descriptions"
              ],
              "35": [
                "principles"
              ]
            },
            "explain": {
              "31": "Transcript dòng 1: “Soil is a habitat”.",
              "32": "Transcript dòng 2: “recent weather”.",
              "33": "Transcript dòng 2: “sampling location”.",
              "34": "Transcript dòng 3: “with descriptions”.",
              "35": "Transcript dòng 4: “These are principles”."
            }
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              36,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Maintaining living {{36}} is a common soil-health aim.</p><p>A water-entry test examines {{37}}.</p><p>Record the starting {{38}} as part of that test.</p><p>Not finding earthworms in one sample is not proof that the whole site has {{39}}.</p><p>Meaningful repeated comparisons require a consistent {{40}}.</p>",
            "answers": {
              "36": [
                "roots"
              ],
              "37": [
                "Infiltration",
                "infiltration"
              ],
              "38": [
                "moisture"
              ],
              "39": [
                "none"
              ],
              "40": [
                "procedure"
              ]
            },
            "explain": {
              "36": "Transcript dòng 4: “maintaining living roots”.",
              "37": "Transcript dòng 5: “Infiltration is one process”.",
              "38": "Transcript dòng 5: “starting moisture”.",
              "39": "Transcript dòng 6: “contains none”.",
              "40": "Transcript dòng 6: “the procedure is consistent”."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "L12",
    "title": "Practice Test 12 — Photography, Theatre & Learning",
    "source": "Biên soạn cho luyện tập · audio TTS · không phải đề thi thật",
    "provenance": {
      "kind": "original",
      "addedOn": "2026-10-16"
    },
    "sections": [
      {
        "id": "L12-S1",
        "part": 1,
        "title": "Registering for a photography workshop",
        "context": "A learner contacts a community photography studio.",
        "audio": null,
        "script": [
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "Hello, Harbour Photography Studio. Are you calling about the exhibition or the workshops? The exhibition is free to visit, but workshop places need to be booked. We teach small groups so everyone has time to ask about their own equipment. You don't have to own an expensive camera, and several sessions are suitable for people using a phone.",
            "q": []
          },
          {
            "speaker": "Learner",
            "voice": "m",
            "text": "It's a workshop I'm interested in. My surname is Wallace, W-A-L-L-A-C-E. I'd like to learn about portraits. I first looked at landscape photography, but I mostly take pictures of family and friends, so portraits would be more useful. I have a basic digital camera and can bring it, though I don't understand all its settings yet.",
            "q": [
              1,
              2
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "The introductory portrait session would be appropriate. It's on Sunday, beginning at ten thirty. The Saturday workshop is for people who already know the manual controls, so don't book that by mistake. We spend the first part indoors and then go outside if the weather allows. You can borrow a light meter, but you won't need to buy any equipment beforehand.",
            "q": [
              3,
              4
            ]
          },
          {
            "speaker": "Learner",
            "voice": "m",
            "text": "Sunday is better for me anyway. How long does the session last? I need to be somewhere else in the late afternoon. Also, should I bring printed photographs for feedback? I have plenty on my laptop, but printing them would take a little time, and I'm not sure whether that would be useful at an introductory level.",
            "q": []
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "It lasts four hours, including a short break. Bring two examples of your photographs on a memory card, rather than prints. We'll look at a few examples together, but it's a practical session rather than a full portfolio review. Make sure the camera battery is charged. A spare battery is useful if you have one, although we don't expect beginners to own every accessory.",
            "q": [
              5,
              6,
              7
            ]
          },
          {
            "speaker": "Learner",
            "voice": "m",
            "text": "I can bring a memory card. My camera uses the common small type, so that should be straightforward. What is the fee? I saw a figure of fifty-five pounds on a poster, but the date looked old. I'm a student at the local college, if that makes any difference. I can bring my student card on the day.",
            "q": []
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "The current standard fee is sixty pounds, but students pay forty-five. Bring the card so we can confirm the reduced rate. Please come to the studio in Dock Street, above the bakery. We used to teach in the library, which is the address on that old poster. There's no parking outside, but the bus station is only a short walk away.",
            "q": [
              8,
              9,
              10
            ]
          },
          {
            "speaker": "Learner",
            "voice": "m",
            "text": "I know the bakery, so I'll find it easily. I'll come by bus. Could you reserve one place and email the payment link? I heard about the workshop from my cousin, who attended a session on night photography. I'll check which camera setting caused my last blurred portraits and bring those examples, so I have something specific to ask about rather than trying to cover everything.",
            "q": []
          }
        ],
        "groups": [
          {
            "type": "form",
            "kind": "gap",
            "range": [
              1,
              10
            ],
            "instruction": "Complete the form. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Booking and enquiry notes",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Learner surname: {{1}}</p><p>Workshop focus: {{2}}</p><p>Workshop day: {{3}}</p><p>Start time: {{4}}</p><p>Session length: {{5}} hours</p><p>Bring photographs on a {{6}}.</p><p>Check the camera’s {{7}} is charged.</p><p>Student fee: £{{8}}</p><p>Street name: {{9}} Street</p><p>Studio is above the {{10}}.</p>",
            "answers": {
              "1": [
                "Wallace"
              ],
              "2": [
                "portraits"
              ],
              "3": [
                "Sunday"
              ],
              "4": [
                "ten thirty",
                "10.30",
                "10:30"
              ],
              "5": [
                "four",
                "4"
              ],
              "6": [
                "memory card"
              ],
              "7": [
                "battery"
              ],
              "8": [
                "forty-five",
                "45"
              ],
              "9": [
                "Dock"
              ],
              "10": [
                "bakery"
              ]
            },
            "explain": {
              "1": "Transcript dòng 2: “My surname is Wallace”.",
              "2": "Transcript dòng 2: “learn about portraits”.",
              "3": "Transcript dòng 3: “on Sunday”.",
              "4": "Transcript dòng 3: “beginning at ten thirty”.",
              "5": "Transcript dòng 5: “lasts four hours”.",
              "6": "Transcript dòng 5: “on a memory card”.",
              "7": "Transcript dòng 5: “camera battery is charged”.",
              "8": "Transcript dòng 7: “students pay forty-five”.",
              "9": "Transcript dòng 7: “in Dock Street”.",
              "10": "Transcript dòng 7: “above the bakery”."
            }
          }
        ]
      },
      {
        "id": "L12-S2",
        "part": 2,
        "title": "An introduction for theatre volunteers",
        "context": "A front-of-house manager briefs new theatre volunteers.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Thank you for volunteering at the Riverside Theatre. Tonight is a training evening, so we'll practise the tasks before an audience arrives tomorrow. Most of your work will involve helping visitors find information and move comfortably through the building. You are not expected to solve every problem alone. A supervisor is always on duty, and the radio at the ticket desk can be used to contact that person without leaving a visitor waiting while you search the whole theatre.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "At the Welcome Position, just inside the main entrance, greet visitors and direct them to the right area. It is particularly helpful to notice anyone looking uncertain. The Ticket Desk deals with booking enquiries and missing tickets. Volunteers elsewhere should not promise a replacement seat or refund, because the desk needs to check the booking record first. The Cloakroom takes coats and larger bags. Give the visitor a numbered tag and place the matching tag with the item.",
            "q": [
              11,
              12,
              14
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "At the Auditorium Doors, check tickets and show people which aisle to use. Please don't simply point across a crowded room when someone needs more help. The Refreshment Counter serves drinks before the performance and during the interval. Only volunteers assigned there should handle the till. The Stage Entrance is for performers and technical staff, not a shortcut for audience members. If someone says they're meeting a performer, refer them to the supervisor rather than letting them enter unaccompanied.",
            "q": [
              13,
              15
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Our most important principle is to ask before providing physical assistance. A visitor may want directions rather than a hand on their arm. Explain the available route and let the person tell you what help would be useful. We used to give new volunteers a long script to memorise, but found that it could make conversations sound rigid. You still need accurate information, but you can use natural language while checking that the visitor has understood.",
            "q": [
              16
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Late arrivals are admitted at a suitable break chosen by the performance manager. Volunteers at the doors should wait for that signal, rather than making individual decisions. Some productions have no suitable early break, so the waiting time may vary. Please explain the situation calmly. Don't promise that everyone will be seated within five minutes simply because that happened at the previous show. We will keep the foyer seating available for visitors who need to wait.",
            "q": [
              17
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "If a visitor complains, listen and record the main point before referring it to the supervisor. You don't need to defend every theatre policy during the conversation. The purpose is to understand the issue and pass it to someone who can respond appropriately. Lost property goes to the Ticket Desk, where the item and the time it was found are recorded. Never take an item home for safekeeping, even if you intend to return it the next day.",
            "q": [
              18
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "For tomorrow, arrive at six, half an hour before the public doors open. Wear dark trousers and comfortable shoes; we'll provide a waistcoat so visitors can identify you. Name badges are kept in the staff cupboard and should be returned at the end of the evening. The final check is that no visitor remains in the toilets or seating areas before the building is locked. You'll work with an experienced volunteer for that check until you're familiar with the layout and the closing routine.",
            "q": [
              19,
              20
            ]
          }
        ],
        "groups": [
          {
            "type": "matching",
            "kind": "match",
            "range": [
              11,
              15
            ],
            "instruction": "Match each description with the correct place. There are more options than questions.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "Welcome Position"
              },
              {
                "key": "B",
                "text": "Ticket Desk"
              },
              {
                "key": "C",
                "text": "Cloakroom"
              },
              {
                "key": "D",
                "text": "Auditorium Doors"
              },
              {
                "key": "E",
                "text": "Refreshment Counter"
              },
              {
                "key": "F",
                "text": "Stage Entrance"
              }
            ],
            "questions": [
              {
                "n": 11,
                "text": "Replacement-ticket enquiries",
                "answer": "B",
                "explain": "Transcript dòng 2: “missing tickets”."
              },
              {
                "n": 12,
                "text": "Keeping coats and bags",
                "answer": "C",
                "explain": "Transcript dòng 2: “takes coats and larger bags”."
              },
              {
                "n": 13,
                "text": "Checking tickets and indicating aisles",
                "answer": "D",
                "explain": "Transcript dòng 3: “check tickets”."
              },
              {
                "n": 14,
                "text": "Greeting uncertain arrivals",
                "answer": "A",
                "explain": "Transcript dòng 2: “greet visitors”."
              },
              {
                "n": 15,
                "text": "Handling drink sales",
                "answer": "E",
                "explain": "Transcript dòng 3: “serves drinks”."
              }
            ]
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              16,
              18
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 16,
                "text": "What should volunteers do before physically helping a visitor?",
                "options": [
                  "A Ask what help the visitor wants",
                  "B Assume every visitor needs support",
                  "C Wait until the interval"
                ],
                "answer": "A",
                "explain": "Transcript dòng 4: “ask before providing physical assistance”."
              },
              {
                "n": 17,
                "text": "Who decides when late arrivals enter?",
                "options": [
                  "A Each volunteer independently",
                  "B The performance manager",
                  "C The person who bought the ticket"
                ],
                "answer": "B",
                "explain": "Transcript dòng 5: “chosen by the performance manager”."
              },
              {
                "n": 18,
                "text": "What is the first response to a complaint?",
                "options": [
                  "A Promise an immediate refund",
                  "B Explain every policy from memory",
                  "C Listen and record its main point"
                ],
                "answer": "C",
                "explain": "Transcript dòng 6: “listen and record the main point”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              19,
              20
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Volunteers should arrive at {{19}} p.m.</p><p>The theatre supplies a {{20}} for identification.</p>",
            "answers": {
              "19": [
                "six",
                "6",
                "6.00",
                "6:00"
              ],
              "20": [
                "waistcoat"
              ]
            },
            "explain": {
              "19": "Transcript dòng 7: “arrive at six”.",
              "20": "Transcript dòng 7: “provide a waistcoat”."
            }
          }
        ]
      },
      {
        "id": "L12-S3",
        "part": 3,
        "title": "Designing peer feedback for an online course",
        "context": "Education students discuss an online-course design with a tutor.",
        "audio": null,
        "script": [
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "You've proposed peer feedback for the online course. What do you want students to learn from it? Simply asking them to comment on one another's work may generate activity without much learning. You need a structure that helps them make judgments, and a way to see whether the comments affect a later attempt rather than disappearing after the discussion board closes.",
            "q": []
          },
          {
            "speaker": "Sofia",
            "voice": "m",
            "text": "We're focusing on explanations of evidence in short reports. We originally planned to let students assess a whole report, but that involved too many different criteria at once. Now they'll look at one paragraph. They'll identify the claim, check the evidence and explain whether the connection is clear. A narrower task should make it easier to discuss a disagreement.",
            "q": [
              21
            ]
          },
          {
            "speaker": "Ben",
            "voice": "f2",
            "text": "We tried the instructions with two classmates. They both wrote polite but general comments, such as saying the paragraph was interesting. We realised we needed examples of useful comments, not just a rule telling them to be constructive. We also need to show a weak comment and discuss why it doesn't help the writer decide what to change.",
            "q": [
              22
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "Yes. And don't treat agreement as the only sign that the activity worked. Two readers may notice different things. A useful exchange should make their reasons visible. What does the writer do afterwards? If the comments arrive after the final submission, there's no planned opportunity to act on them, and you won't know whether the advice was understood.",
            "q": []
          },
          {
            "speaker": "Sofia",
            "voice": "m",
            "text": "We've divided the course sequence into stages. Before class, students read the criteria and compare example comments. During class, they discuss a disputed example in small groups. After class, each writer revises the paragraph and explains one change. Throughout the activity, the tutor monitors questions and steps in if a misunderstanding is spreading. The tutor won't rewrite every paragraph personally.",
            "q": [
              25,
              26,
              27,
              28
            ]
          },
          {
            "speaker": "Ben",
            "voice": "f2",
            "text": "We also changed how partners are assigned. At first we wanted people to choose their friends, because that seemed comfortable. But some students might be left without a partner, and friendship could make criticism awkward. We'll assign pairs and explain that the task is about the paragraph, not the person's ability. There will still be a route to contact the tutor privately if a problem arises.",
            "q": [
              23
            ]
          },
          {
            "speaker": "Tutor",
            "voice": "f",
            "text": "How will you evaluate the design? A large number of posts won't necessarily mean the feedback was useful. Look at the comments and the subsequent revision together. You can ask writers how they interpreted a suggestion, but keep the evaluation manageable. Don't introduce a long questionnaire that takes more time than the actual learning task.",
            "q": [
              24
            ]
          },
          {
            "speaker": "Sofia",
            "voice": "m",
            "text": "We'll examine two things: whether comments refer to the criteria, and whether revisions respond meaningfully to the advice. We won't rank students by how many messages they send or require everyone to accept every suggestion. Sometimes rejecting advice with a clear explanation can show thoughtful judgment. We'll make that possibility explicit so students don't confuse participation with agreeing automatically.",
            "q": [
              29,
              30
            ]
          }
        ],
        "groups": [
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              21,
              24
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 21,
                "text": "Why reduce the task to one paragraph?",
                "options": [
                  "A To avoid reading any evidence",
                  "B To replace the final report",
                  "C To focus on a manageable set of criteria"
                ],
                "answer": "C",
                "explain": "Transcript dòng 2: “too many different criteria”."
              },
              {
                "n": 22,
                "text": "What did the pilot comments reveal?",
                "options": [
                  "A Students needed examples of useful feedback",
                  "B All feedback had to be anonymous",
                  "C The criteria were unnecessary"
                ],
                "answer": "A",
                "explain": "Transcript dòng 3: “needed examples of useful comments”."
              },
              {
                "n": 23,
                "text": "Why assign pairs?",
                "options": [
                  "A To guarantee identical opinions",
                  "B To avoid exclusion and difficulties linked to friendship",
                  "C To stop students asking questions"
                ],
                "answer": "B",
                "explain": "Transcript dòng 6: “left without a partner”."
              },
              {
                "n": 24,
                "text": "What does the tutor recommend for evaluation?",
                "options": [
                  "A Count posts only",
                  "B Use the longest possible questionnaire",
                  "C Examine comments alongside revisions"
                ],
                "answer": "C",
                "explain": "Transcript dòng 7: “comments and the subsequent revision together”."
              }
            ]
          },
          {
            "type": "matching",
            "kind": "match",
            "range": [
              25,
              28
            ],
            "instruction": "Match each item with the correct option. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Before class"
              },
              {
                "key": "B",
                "text": "During class"
              },
              {
                "key": "C",
                "text": "After class"
              },
              {
                "key": "D",
                "text": "Throughout the activity"
              }
            ],
            "questions": [
              {
                "n": 25,
                "text": "Compare sample comments",
                "answer": "A",
                "explain": "Transcript dòng 5: “Before class”."
              },
              {
                "n": 26,
                "text": "Discuss a disputed example in groups",
                "answer": "B",
                "explain": "Transcript dòng 5: “During class”."
              },
              {
                "n": 27,
                "text": "Revise a paragraph and explain a change",
                "answer": "C",
                "explain": "Transcript dòng 5: “After class”."
              },
              {
                "n": 28,
                "text": "Tutor monitors questions",
                "answer": "D",
                "explain": "Transcript dòng 5: “Throughout the activity”."
              }
            ]
          },
          {
            "type": "mcq-multi",
            "kind": "multi",
            "range": [
              29,
              30
            ],
            "instruction": "Choose <b>TWO</b> letters.",
            "questions": [
              {
                "ns": [
                  29,
                  30
                ],
                "text": "Which TWO aspects will the students evaluate?",
                "options": [
                  "A Number of messages per student",
                  "B References to the criteria",
                  "C Automatic acceptance of every suggestion",
                  "D Meaningful response in revisions",
                  "E Personal popularity of partners"
                ],
                "answer": [
                  "B",
                  "D"
                ],
                "explain": "Transcript dòng 8: “whether comments refer to the criteria”. Đánh giá bình luận có dựa tiêu chí và bản sửa có phản hồi lời khuyên một cách có ý nghĩa hay không."
              }
            ]
          }
        ]
      },
      {
        "id": "L12-S4",
        "part": 4,
        "title": "Designing a resilient supply network",
        "context": "A lecturer uses an imaginary delivery network to explain resilience.",
        "audio": null,
        "script": [
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Today we'll use an imaginary delivery network to examine resilience. The network supplies repair parts to several workshops. Under normal conditions, the cheapest arrangement appears straightforward: obtain each part from a preferred supplier, hold little stock and deliver it when required. But a plan designed only around normal conditions may struggle when a route closes or a supplier stops operating. Resilience concerns how the service continues or recovers, rather than a promise that no disruption will ever occur.",
            "q": []
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "The first step is to map dependencies. A workshop may buy from two companies that both depend on the same upstream factory. Counting two names would then exaggerate the independence of supply. Similarly, two delivery routes may share one bridge. We need to know which apparently separate options can fail together. The map should therefore show important relationships, not just a row of supplier logos or lines between towns.",
            "q": [
              31,
              32,
              33
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Next, distinguish the parts. Some are needed frequently and can be stored easily. Others are expensive, rarely used or liable to become obsolete. Holding the same quantity of every item is unlikely to be sensible. In our example, the team initially proposed doubling all stock. It then found that a small set of inexpensive parts caused many service delays. A targeted buffer for those parts was more relevant than filling the warehouse with equal quantities of everything.",
            "q": [
              34
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Alternative supply requires preparation. A second supplier may need specifications, checks and an agreed process before it can provide a usable part. Listing its telephone number is not the same as having an operational alternative. The team tested a small order and recorded the lead time, meaning the interval between placing an order and receiving it. That gave them evidence for a realistic contingency plan rather than an assumption that replacement stock would arrive immediately.",
            "q": [
              35,
              36
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Information also needs a route through the network. Workshop staff should know when a delay is expected and what options remain. In the first version of our example, each team kept its own spreadsheet, so the same part appeared available in one file and unavailable in another. A shared inventory reduced that conflict. It did not remove the need for responsibility: someone still had to record arrivals and correct mistakes promptly.",
            "q": [
              37
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Exercises can reveal whether the plan is usable. We asked the teams to respond to a hypothetical bridge closure, then to a supplier failure. These scenarios exposed different weaknesses. A route alternative helped in the first case but could not create a part that the factory had stopped making. We avoided presenting one successful exercise as proof of resilience against every event. The point was to identify assumptions and decide which deserved further testing.",
            "q": [
              38,
              39
            ]
          },
          {
            "speaker": "Speaker",
            "voice": "f",
            "text": "Finally, compare continuing costs with the service consequences of disruption. Extra stock, alternative suppliers and shared information all require resources. Their value depends on what a delay prevents the workshops from doing and how long the problem could last. The final plan records priorities, responsibilities and review dates. Resilience is maintained through these decisions over time. It is better understood as a capacity to respond with informed choices than as an impressive diagram that remains unchanged after the conditions around it have moved on.",
            "q": [
              40
            ]
          }
        ],
        "groups": [
          {
            "type": "note",
            "kind": "gap",
            "range": [
              31,
              35
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Lecture notes",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Start by mapping {{31}}.</p><p>Two suppliers may share an upstream {{32}}.</p><p>Two routes may depend on the same {{33}}.</p><p>A targeted stock {{34}} can address frequent delays.</p><p>A trial order provides evidence about lead {{35}}.</p>",
            "answers": {
              "31": [
                "dependencies"
              ],
              "32": [
                "factory"
              ],
              "33": [
                "bridge"
              ],
              "34": [
                "buffer"
              ],
              "35": [
                "time"
              ]
            },
            "explain": {
              "31": "Transcript dòng 2: “map dependencies”.",
              "32": "Transcript dòng 2: “same upstream factory”.",
              "33": "Transcript dòng 2: “share one bridge”.",
              "34": "Transcript dòng 3: “targeted buffer”.",
              "35": "Transcript dòng 4: “lead time”."
            }
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              36,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>An alternative supplier needs clear {{36}}.</p><p>A shared {{37}} helps avoid conflicting stock records.</p><p>Exercises used hypothetical disruption {{38}}.</p><p>A route alternative cannot replace a part a factory has stopped {{39}}.</p><p>The final plan assigns responsibilities and {{40}} dates.</p>",
            "answers": {
              "36": [
                "specifications"
              ],
              "37": [
                "inventory"
              ],
              "38": [
                "scenarios"
              ],
              "39": [
                "making"
              ],
              "40": [
                "review"
              ]
            },
            "explain": {
              "36": "Transcript dòng 4: “may need specifications”.",
              "37": "Transcript dòng 5: “shared inventory”.",
              "38": "Transcript dòng 6: “These scenarios”.",
              "39": "Transcript dòng 6: “had stopped making”.",
              "40": "Transcript dòng 7: “review dates”."
            }
          }
        ]
      }
    ]
  }
];
tests.forEach(function(test){window.IELTS.data.listeningTests.push(test);});
})();
