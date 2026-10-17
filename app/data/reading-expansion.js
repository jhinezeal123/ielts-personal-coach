/* 8 additional full tests; frozen content, no network required. Rebuild: node scripts/build-reading-expansion.mjs */
(function(){"use strict";
var tests = [
  {
    "id": "R5",
    "title": "Practice Test 5 — Planets, Light & Public Space",
    "source": "Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật",
    "passages": [
      {
        "id": "R5-P1",
        "part": 1,
        "title": "Mercury: A World of Extremes",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Mercury is the smallest planet in our solar system and nearest to the Sun. It's only slightly larger than Earth's Moon. From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter. Mercury's surface temperatures are both extremely hot and cold. Because the planet is so close to the Sun, day temperatures can reach highs of 800°F (430°C). Without an atmosphere to retain that heat at night, temperatures can dip as low as -290°F (-180°C)."
          },
          {
            "label": "B",
            "text": "Despite its proximity to the Sun, Mercury is not the hottest planet in our solar system – that title belongs to nearby Venus, thanks to its dense atmosphere. But Mercury is the fastest planet, zipping around the Sun every 88 Earth days. Mercury's environment is not conducive to life as we know it. The temperatures and solar radiation that characterize this planet are most likely too extreme for organisms to adapt to. With a radius of 1,516 miles (2,440 kilometers), Mercury is a little more than 1/3 the width of Earth."
          },
          {
            "label": "C",
            "text": "If Earth were the size of a nickel, Mercury would be about as big as a blueberry. From an average distance of 36 million miles (58 million kilometers), Mercury is 0.4 astronomical units away from the Sun. One astronomical unit (abbreviated as AU), is the distance from the Sun to Earth. From this distance, it takes sunlight 3.2 minutes to travel from the Sun to Mercury. Mercury's highly eccentric, egg-shaped orbit takes the planet as close as 29 million miles (47 million kilometers) and as far as 43 million miles (70 million kilometers) from the Sun."
          },
          {
            "label": "D",
            "text": "It speeds around the Sun every 88 days, traveling through space at nearly 29 miles (47 kilometers) per second, faster than any other planet. Mercury spins slowly on its axis and completes one rotation every 59 Earth days. But when Mercury is moving fastest in its elliptical orbit around the Sun (and it is closest to the Sun), each rotation is not accompanied by sunrise and sunset like it is on most other planets. The morning Sun appears to rise briefly, set, and rise again from some parts of the planet's surface."
          },
          {
            "label": "E",
            "text": "The same thing happens in reverse at sunset for other parts of the surface. One Mercury solar day (one full day-night cycle) equals 176 Earth days – just over two years on Mercury. Mercury's axis of rotation is tilted just 2 degrees with respect to the plane of its orbit around the Sun. That means it spins nearly perfectly upright and so does not experience seasons as many other planets do. Mercury formed about 4.5 billion years ago when gravity pulled swirling gas and dust together to form this small planet nearest the Sun. Like its fellow terrestrial planets, Mercury has a central core, a rocky mantle, and a solid crust."
          },
          {
            "label": "F",
            "text": "Mercury is the second densest planet, after Earth. It has a large metallic core with a radius of about 1,289 miles (2,074 kilometers), about 85% of the planet's radius. There is evidence that it is partly molten or liquid. Mercury's outer shell, comparable to Earth's outer shell (called the mantle and crust), is only about 400 kilometers (250 miles) thick. Mercury's surface resembles that of Earth's Moon, scarred by many impact craters resulting from collisions with meteoroids and comets. Craters and features on Mercury are named after famous deceased artists, musicians, or authors, including children's author Dr. Seuss and dance pioneer Alvin Ailey."
          },
          {
            "label": "G",
            "text": "Very large impact basins, including Caloris (960 miles or 1,550 kilometers in diameter) and Rachmaninoff (190 miles, or 306 kilometers in diameter), were created by asteroid impacts on the planet's surface early in the solar system's history. While there are large areas of smooth terrain, there are also cliffs, some hundreds of miles long and soaring up to a mile high. They rose as the planet's interior cooled and contracted over the billions of years since Mercury formed. Most of Mercury's surface would appear greyish-brown to the human eye. The bright streaks are called \"crater rays.\" They are formed when an asteroid or comet strikes the surface."
          },
          {
            "label": "H",
            "text": "The tremendous amount of energy that is released in such an impact digs a big hole in the ground, and also crushes a huge amount of rock under the point of impact. Some of this crushed material is thrown far from the crater and then falls to the surface, forming the rays. Fine particles of crushed rock are more reflective than large pieces, so the rays look brighter. The space environment – dust impacts and solar-wind particles – causes the rays to darken with time. Temperatures on Mercury are extreme. During the day, temperatures on the surface can reach 800 degrees Fahrenheit (430 degrees Celsius)."
          }
        ],
        "provenance": {
          "kind": "public-information-excerpt",
          "publisher": "NASA Science",
          "url": "https://science.nasa.gov/mercury/facts/",
          "rightsUrl": "https://www.nasa.gov/nasa-brand-center/images-and-media/",
          "note": "Trích tuyển văn bản giáo dục NASA Science; chia lại đoạn A–H để luyện đọc. Câu hỏi và lời giải do app biên soạn. Không ngụ ý NASA bảo trợ."
        },
        "intro": "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        "groups": [
          {
            "type": "tfng",
            "kind": "tfng",
            "variant": "tfng",
            "range": [
              1,
              5
            ],
            "instruction": "Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 1,
                "text": "Mercury is smaller than Earth’s Moon.",
                "answer": "FALSE",
                "explain": "Đoạn A: “only slightly larger”."
              },
              {
                "n": 2,
                "text": "Venus has a higher temperature than Mercury.",
                "answer": "TRUE",
                "explain": "Đoạn B: “that title belongs to nearby Venus”."
              },
              {
                "n": 3,
                "text": "The first spacecraft to reach Mercury was built in Europe.",
                "answer": "NOT GIVEN",
                "explain": "Bài không nêu nơi chế tạo tàu vũ trụ đầu tiên tới Mercury."
              },
              {
                "n": 4,
                "text": "Mercury completes an orbit faster than any other planet.",
                "answer": "TRUE",
                "explain": "Đoạn D: “faster than any other planet”."
              },
              {
                "n": 5,
                "text": "Mercury’s axis is strongly tilted away from the upright position.",
                "answer": "FALSE",
                "explain": "Đoạn E: “nearly perfectly upright”."
              }
            ]
          },
          {
            "type": "note",
            "kind": "gap",
            "range": [
              6,
              9
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Mercury’s movement and structure",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Time for one rotation: {{6}} Earth days</p><p>Length of a full solar day: {{7}} Earth days</p><p>The planet has a central core and a rocky {{8}}.</p><p>The core contains {{9}} material.</p>",
            "answers": {
              "6": [
                "59"
              ],
              "7": [
                "176"
              ],
              "8": [
                "mantle"
              ],
              "9": [
                "metallic"
              ]
            },
            "explain": {
              "6": "Đoạn D: “one rotation every 59 Earth days”.",
              "7": "Đoạn E: “equals 176 Earth days”.",
              "8": "Đoạn E: “a rocky mantle”.",
              "9": "Đoạn F: “large metallic core”."
            }
          },
          {
            "type": "short",
            "kind": "gap",
            "range": [
              10,
              13
            ],
            "instruction": "Complete the answers. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>What shape is used to describe the orbit? {{10}}</p><p>What surface features are produced by collisions? {{11}}</p><p>What colour would most of the surface appear? {{12}}</p><p>What are the bright streaks called? {{13}}</p>",
            "answers": {
              "10": [
                "egg-shaped"
              ],
              "11": [
                "impact craters"
              ],
              "12": [
                "greyish-brown"
              ],
              "13": [
                "crater rays"
              ]
            },
            "explain": {
              "10": "Đoạn C: “egg-shaped orbit”.",
              "11": "Đoạn F: “many impact craters”.",
              "12": "Đoạn G: “appear greyish-brown”.",
              "13": "Đoạn G: “called \"crater rays”."
            }
          }
        ],
        "vocab": [
          {
            "word": "planet",
            "ipa": "/ˈplænɪt/",
            "pos": "n.",
            "vi": "hành tinh",
            "band": "7.0",
            "example": "Mercury is the smallest planet in our solar system and nearest to the Sun.",
            "id": "planet",
            "topic": "science"
          },
          {
            "word": "solar",
            "ipa": "/ˈsəʊlə/",
            "pos": "adj.",
            "vi": "thuộc Mặt Trời",
            "band": "7.0",
            "example": "Mercury is the smallest planet in our solar system and nearest to the Sun.",
            "id": "solar",
            "topic": "science"
          },
          {
            "word": "surface",
            "ipa": "/ˈsɜːfɪs/",
            "pos": "n.",
            "vi": "bề mặt",
            "band": "7.0",
            "example": "From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter.",
            "id": "surface",
            "topic": "science"
          },
          {
            "word": "atmosphere",
            "ipa": "/ˈætməsfɪə/",
            "pos": "n.",
            "vi": "khí quyển",
            "band": "7.0",
            "example": "Without an atmosphere to retain that heat at night, temperatures can dip as low as -290°F (-180°C).",
            "id": "atmosphere",
            "topic": "science"
          },
          {
            "word": "orbit",
            "ipa": "/ˈɔːbɪt/",
            "pos": "n./v.",
            "vi": "quỹ đạo; quay quanh",
            "band": "7.0",
            "example": "Mercury's highly eccentric, egg-shaped orbit takes the planet as close as 29 million miles (47 million kilometers) and as far as 43 million miles (70 million kilometers) from the Sun.",
            "id": "orbit",
            "topic": "science"
          },
          {
            "word": "rotation",
            "ipa": "/rəʊˈteɪʃən/",
            "pos": "n.",
            "vi": "sự tự quay",
            "band": "7.0",
            "example": "Mercury spins slowly on its axis and completes one rotation every 59 Earth days.",
            "id": "rotation",
            "topic": "science"
          },
          {
            "word": "axis",
            "ipa": "/ˈæksɪs/",
            "pos": "n.",
            "vi": "trục",
            "band": "7.0",
            "example": "Mercury spins slowly on its axis and completes one rotation every 59 Earth days.",
            "id": "axis",
            "topic": "science"
          },
          {
            "word": "core",
            "ipa": "/kɔː/",
            "pos": "n.",
            "vi": "lõi",
            "band": "7.0",
            "example": "Like its fellow terrestrial planets, Mercury has a central core, a rocky mantle, and a solid crust.",
            "id": "core",
            "topic": "science"
          },
          {
            "word": "mantle",
            "ipa": "/ˈmæntəl/",
            "pos": "n.",
            "vi": "lớp phủ bên dưới vỏ",
            "band": "7.0",
            "example": "Like its fellow terrestrial planets, Mercury has a central core, a rocky mantle, and a solid crust.",
            "id": "mantle",
            "topic": "science"
          },
          {
            "word": "crust",
            "ipa": "/krʌst/",
            "pos": "n.",
            "vi": "lớp vỏ",
            "band": "7.0",
            "example": "Like its fellow terrestrial planets, Mercury has a central core, a rocky mantle, and a solid crust.",
            "id": "crust",
            "topic": "science"
          },
          {
            "word": "gravity",
            "ipa": "/ˈɡrævəti/",
            "pos": "n.",
            "vi": "lực hấp dẫn",
            "band": "7.0",
            "example": "Mercury formed about 4.5 billion years ago when gravity pulled swirling gas and dust together to form this small planet nearest the Sun.",
            "id": "gravity",
            "topic": "science"
          },
          {
            "word": "radius",
            "ipa": "/ˈreɪdiəs/",
            "pos": "n.",
            "vi": "bán kính",
            "band": "7.0",
            "example": "With a radius of 1,516 miles (2,440 kilometers), Mercury is a little more than 1/3 the width of Earth.",
            "id": "radius",
            "topic": "science"
          },
          {
            "word": "temperature",
            "ipa": "/ˈtemprətʃə/",
            "pos": "n.",
            "vi": "nhiệt độ",
            "band": "7.0",
            "example": "Mercury's surface temperatures are both extremely hot and cold.",
            "id": "temperature",
            "topic": "science"
          },
          {
            "word": "particle",
            "ipa": "/ˈpɑːtɪkəl/",
            "pos": "n.",
            "vi": "hạt nhỏ",
            "band": "7.0",
            "example": "Fine particles of crushed rock are more reflective than large pieces, so the rays look brighter.",
            "id": "particle",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R5-P2",
        "part": 2,
        "title": "Why a Candle Holds Its Shape",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Now, as to the light of the candle. We will light one or two, and set them at work in the performance of their proper functions. You observe a candle is a very different thing from a lamp. With a lamp you take a little oil, fill your vessel, put in a little moss or some cotton prepared by artificial means, and then light the top of the wick. When the flame runs down the cotton to the oil, it gets extinguished, but it goes on burning in the part above."
          },
          {
            "label": "B",
            "text": "Now, I have no doubt you will ask, how is it that the oil, which will not burn of itself, gets up to the top of the cotton, where it will burn? We shall presently examine that; but there is a much more wonderful thing about the burning of a candle than this. You have here a solid substance with no vessel to contain it; and how is it that this solid substance can get up to the place where the flame is? How is it that this solid gets there, it not being a fluid? or, when it is made a fluid, then how is it that it keeps together?"
          },
          {
            "label": "C",
            "text": "This is a wonderful thing about a candle. We have here a good deal of wind, which will help us in some of our illustrations, but tease us in others; for the sake, therefore, of a little regularity, and to simplify the matter, I shall make a quiet flame—for who can study a subject when there are difficulties in the way not belonging to it? Here is a clever invention of some costermonger or street stander in the market-place for the shading of their candles on Saturday nights, when they are selling their greens, or potatoes, or fish."
          },
          {
            "label": "D",
            "text": "I have very often admired it. They put a lamp-glass round the candle, supported on a kind of gallery, which clasps it, and it can be slipped up and down as required. By the use of this lamp-glass, employed in the same way, you have a steady flame, which you can look at, and carefully examine, as I hope you will do, at home. You see, then, in the first instance, that a beautiful cup is formed. As the air comes to the candle it moves upwards by the force of the current which the heat of the candle produces, and it so cools all the sides of the wax, tallow, or fuel, as to keep the edge much cooler than the part within; the part within melts by the flame that runs down the wick as far as it can go before it is extinguished, but the part on the outside does not melt."
          },
          {
            "label": "E",
            "text": "If I made a current in one direction, my cup would be lop-sided, and the fluid would consequently run over,—for the same force of gravity which holds worlds together holds this fluid in a horizontal position, and if the cup be not horizontal, of course the fluid will run away in guttering. You see, therefore, that the cup is formed by this beautifully regular ascending current of air playing upon all sides, which keeps the exterior of the candle cool."
          },
          {
            "label": "F",
            "text": "No fuel would serve for a candle which has not the property of giving this cup, except such fuel as the Irish bogwood, where the material itself is like a sponge, and holds its own fuel. You see now why you would have had such a bad result if you were to burn these beautiful candles that I have shewn you, which are irregular, intermittent in their shape, and cannot therefore have that nicely-formed edge to the cup which is the great beauty in a candle."
          },
          {
            "label": "G",
            "text": "I hope you will now see that the perfection of a process—that is, its utility—is the better point of beauty about it. It is not the best looking thing, but the best acting thing, which is the most advantageous to us. This good-looking candle is a bad burning one. There will be a guttering round about it because of the irregularity of the stream of air and the badness of the cup which is formed thereby."
          },
          {
            "label": "H",
            "text": "You may see some pretty examples (and I trust you will notice these instances) of the action of the ascending current when you have A little gutter run down the side of a candle, making it thicker there than it is elsewhere. As the candle goes on burning, that keeps its place and forms a little pillar sticking up by the side, because, as it rises higher above the rest of the wax or fuel, the air gets better round it, and it is more cooled and better able to resist the action of the heat at a little distance."
          }
        ],
        "provenance": {
          "kind": "public-domain-excerpt",
          "publisher": "Michael Faraday — The Chemical History of a Candle (1861)",
          "url": "https://www.gutenberg.org/cache/epub/14474/pg14474-images.html",
          "rightsUrl": "https://www.gutenberg.org/policy/license.html",
          "note": "Trích văn bản lịch sử thuộc phạm vi công cộng: Michael Faraday, The Chemical History of a Candle (1861); giữ ngôn ngữ và góc nhìn thời kỳ đó, chia lại đoạn A–H. Dùng để luyện đọc hiểu, không trình bày như kiến thức khoa học hoặc quan điểm hiện hành. Câu hỏi và lời giải do app biên soạn. Nguồn số hóa có kèm giấy phép Project Gutenberg."
        },
        "intro": "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        "groups": [
          {
            "type": "headings",
            "kind": "match",
            "range": [
              14,
              17
            ],
            "instruction": "Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.",
            "allowReuse": false,
            "options": [
              {
                "key": "i",
                "text": "A puzzle about solid fuel"
              },
              {
                "key": "ii",
                "text": "How candle colour changes heat"
              },
              {
                "key": "iii",
                "text": "How a lamp behaves"
              },
              {
                "key": "iv",
                "text": "A glass shield and the formation of a cup"
              },
              {
                "key": "v",
                "text": "Methods for manufacturing decorative candles"
              },
              {
                "key": "vi",
                "text": "Removing a distracting influence"
              }
            ],
            "questions": [
              {
                "n": 14,
                "text": "Paragraph A",
                "answer": "iii",
                "explain": "Đoạn A: “With a lamp you take a little oil”. Đoạn mô tả cách bố trí và đốt đèn dầu."
              },
              {
                "n": 15,
                "text": "Paragraph B",
                "answer": "i",
                "explain": "Đoạn B: “how is it that this solid substance”. Các câu hỏi tập trung vào nghịch lý nhiên liệu rắn di chuyển tới ngọn lửa."
              },
              {
                "n": 16,
                "text": "Paragraph C",
                "answer": "vi",
                "explain": "Đoạn C: “a good deal of wind”. Giảng viên loại tác động của gió để quan sát ngọn lửa ổn định."
              },
              {
                "n": 17,
                "text": "Paragraph D",
                "answer": "iv",
                "explain": "Đoạn D: “By the use of this lamp-glass”. Chụp kính giữ lửa đều; đoạn sau giải thích cốc sáp được hình thành."
              }
            ]
          },
          {
            "type": "info",
            "kind": "match",
            "range": [
              18,
              20
            ],
            "instruction": "Which paragraph contains the following information? You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Paragraph A"
              },
              {
                "key": "B",
                "text": "Paragraph B"
              },
              {
                "key": "C",
                "text": "Paragraph C"
              },
              {
                "key": "D",
                "text": "Paragraph D"
              },
              {
                "key": "E",
                "text": "Paragraph E"
              },
              {
                "key": "F",
                "text": "Paragraph F"
              },
              {
                "key": "G",
                "text": "Paragraph G"
              },
              {
                "key": "H",
                "text": "Paragraph H"
              }
            ],
            "questions": [
              {
                "n": 18,
                "text": "An explanation involving the same force that holds worlds together",
                "answer": "E",
                "explain": "Đoạn E: “same force of gravity”."
              },
              {
                "n": 19,
                "text": "An unusual fuel that can hold liquid within itself",
                "answer": "F",
                "explain": "Đoạn F: “Irish bogwood”."
              },
              {
                "n": 20,
                "text": "A preference for performance rather than appearance",
                "answer": "G",
                "explain": "Đoạn G: “best acting thing”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              21,
              23
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Air keeps the exterior of the candle {{21}}.</p><p>A current from only one side makes the cup {{22}}.</p><p>An upward projection of wax is described as a little {{23}}.</p>",
            "answers": {
              "21": [
                "cool"
              ],
              "22": [
                "lop-sided"
              ],
              "23": [
                "pillar"
              ]
            },
            "explain": {
              "21": "Đoạn E: “exterior of the candle cool”.",
              "22": "Đoạn E: “cup would be lop-sided”.",
              "23": "Đoạn H: “forms a little pillar”."
            }
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              24,
              26
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 24,
                "text": "Why does the lecturer place glass around the candle?",
                "options": [
                  "A To make the wax melt faster",
                  "B To obtain a steady flame for observation",
                  "C To increase the amount of fuel"
                ],
                "answer": "B",
                "explain": "Đoạn D: “you have a steady flame”."
              },
              {
                "n": 25,
                "text": "What makes an attractive candle burn badly in this example?",
                "options": [
                  "A The age of its materials",
                  "B The colour of its flame",
                  "C An irregular stream of air and an imperfect cup"
                ],
                "answer": "C",
                "explain": "Đoạn G: “irregularity of the stream of air”."
              },
              {
                "n": 26,
                "text": "Why can a small wax pillar resist melting?",
                "options": [
                  "A More air reaches and cools it",
                  "B It has a separate wick",
                  "C It is made of a different substance"
                ],
                "answer": "A",
                "explain": "Đoạn H: “air gets better round it”."
              }
            ]
          }
        ],
        "vocab": [
          {
            "word": "gravity",
            "ipa": "/ˈɡrævəti/",
            "pos": "n.",
            "vi": "lực hấp dẫn",
            "band": "7.0",
            "example": "If I made a current in one direction, my cup would be lop-sided, and the fluid would consequently run over,—for the same force of gravity which holds worlds together holds this fluid in a horizontal position, and if the cup be not horizontal, of course the fluid will run away in guttering.",
            "id": "gravity",
            "topic": "science"
          },
          {
            "word": "wick",
            "ipa": "/wɪk/",
            "pos": "n.",
            "vi": "bấc nến",
            "band": "7.0",
            "example": "With a lamp you take a little oil, fill your vessel, put in a little moss or some cotton prepared by artificial means, and then light the top of the wick.",
            "id": "wick",
            "topic": "science"
          },
          {
            "word": "flame",
            "ipa": "/fleɪm/",
            "pos": "n.",
            "vi": "ngọn lửa",
            "band": "7.0",
            "example": "When the flame runs down the cotton to the oil, it gets extinguished, but it goes on burning in the part above.",
            "id": "flame",
            "topic": "science"
          },
          {
            "word": "fuel",
            "ipa": "/ˈfjuːəl/",
            "pos": "n.",
            "vi": "nhiên liệu",
            "band": "7.0",
            "example": "As the air comes to the candle it moves upwards by the force of the current which the heat of the candle produces, and it so cools all the sides of the wax, tallow, or fuel, as to keep the edge much cooler than the part within; the part within melts by the flame that runs down the wick as far as it can go before it is extinguished, but the part on the outside does not melt.",
            "id": "fuel",
            "topic": "science"
          },
          {
            "word": "vessel",
            "ipa": "/ˈvesəl/",
            "pos": "n.",
            "vi": "bình chứa",
            "band": "7.0",
            "example": "With a lamp you take a little oil, fill your vessel, put in a little moss or some cotton prepared by artificial means, and then light the top of the wick.",
            "id": "vessel",
            "topic": "science"
          },
          {
            "word": "extinguished",
            "ipa": "/ɪkˈstɪŋɡwɪʃt/",
            "pos": "adj./v.",
            "vi": "bị dập tắt",
            "band": "7.0",
            "example": "When the flame runs down the cotton to the oil, it gets extinguished, but it goes on burning in the part above.",
            "id": "extinguished",
            "topic": "science"
          },
          {
            "word": "solid",
            "ipa": "/ˈsɒlɪd/",
            "pos": "adj./n.",
            "vi": "rắn; chất rắn",
            "band": "7.0",
            "example": "You have here a solid substance with no vessel to contain it; and how is it that this solid substance can get up to the place where the flame is?",
            "id": "solid",
            "topic": "science"
          },
          {
            "word": "fluid",
            "ipa": "/ˈfluːɪd/",
            "pos": "n./adj.",
            "vi": "chất lưu; dạng lỏng",
            "band": "7.0",
            "example": "How is it that this solid gets there, it not being a fluid? or, when it is made a fluid, then how is it that it keeps together?",
            "id": "fluid",
            "topic": "science"
          },
          {
            "word": "substance",
            "ipa": "/ˈsʌbstəns/",
            "pos": "n.",
            "vi": "chất; vật chất",
            "band": "7.0",
            "example": "You have here a solid substance with no vessel to contain it; and how is it that this solid substance can get up to the place where the flame is?",
            "id": "substance",
            "topic": "science"
          },
          {
            "word": "current",
            "ipa": "/ˈkʌrənt/",
            "pos": "n.",
            "vi": "luồng chuyển động",
            "band": "7.0",
            "example": "As the air comes to the candle it moves upwards by the force of the current which the heat of the candle produces, and it so cools all the sides of the wax, tallow, or fuel, as to keep the edge much cooler than the part within; the part within melts by the flame that runs down the wick as far as it can go before it is extinguished, but the part on the outside does not melt.",
            "id": "current",
            "topic": "science"
          },
          {
            "word": "horizontal",
            "ipa": "/ˌhɒrɪˈzɒntəl/",
            "pos": "adj.",
            "vi": "nằm ngang",
            "band": "7.0",
            "example": "If I made a current in one direction, my cup would be lop-sided, and the fluid would consequently run over,—for the same force of gravity which holds worlds together holds this fluid in a horizontal position, and if the cup be not horizontal, of course the fluid will run away in guttering.",
            "id": "horizontal",
            "topic": "science"
          },
          {
            "word": "exterior",
            "ipa": "/ɪkˈstɪəriə/",
            "pos": "n.",
            "vi": "phần bên ngoài",
            "band": "7.0",
            "example": "You see, therefore, that the cup is formed by this beautifully regular ascending current of air playing upon all sides, which keeps the exterior of the candle cool.",
            "id": "exterior",
            "topic": "science"
          },
          {
            "word": "utility",
            "ipa": "/juːˈtɪləti/",
            "pos": "n.",
            "vi": "tính hữu ích",
            "band": "7.0",
            "example": "I hope you will now see that the perfection of a process—that is, its utility—is the better point of beauty about it.",
            "id": "utility",
            "topic": "science"
          },
          {
            "word": "irregularity",
            "ipa": "/ɪˌreɡjəˈlærəti/",
            "pos": "n.",
            "vi": "sự không đều",
            "band": "7.0",
            "example": "There will be a guttering round about it because of the irregularity of the stream of air and the badness of the cup which is formed thereby.",
            "id": "irregularity",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R5-P3",
        "title": "The Public Value of a Place to Sit",
        "topic": "urban",
        "paragraphs": [
          {
            "label": "A",
            "text": "A public bench is easily counted, photographed and entered into a maintenance register. Its contribution to a journey is harder to describe. A seat may enable someone to reach a shop independently, wait comfortably for a friend or remain outdoors after becoming tired. These benefits arise through relationships between the object, its location and the person using it. A policy concerned only with the number of seats can therefore succeed on paper while leaving important routes difficult to use. The relevant question is not simply whether a district possesses benches, but whether people can rely on opportunities to pause along the journeys they actually make."
          },
          {
            "label": "B",
            "text": "Consider the fictional town of Merewick, where planners initially proposed installing every new bench around a recently renovated square. The arrangement looked coherent on a map, and the square offered attractive photographs for the annual report. During route walks, however, residents described difficulties on the uphill approach from the bus stop. Several could reach the first shop only by leaning against a wall. The council consequently moved part of the seating budget to that approach. The resulting distribution looked less symmetrical, but it provided rest before the hardest stage of a common journey. Here, the value of a bench depended on sequence rather than visual concentration."
          },
          {
            "label": "C",
            "text": "In fictional Dunley, the problem concerned responsibility rather than position. Several useful seats stood on land belonging to different organisations. When slats broke, each owner assumed another department would arrange repairs. Residents encountered benches on the map that were unusable in practice. A shared maintenance agreement identified who would inspect each seat, how faults would be reported and which organisation would pay. No new bench was purchased during the first stage. Nevertheless, reliable resting places increased because existing assets returned to service. Dunley's example challenges the assumption that improving public space must begin with construction rather than with the less visible organisation of care."
          },
          {
            "label": "D",
            "text": "The imaginary university district of Harrowgate faced a different difficulty. Designers wanted sculptural furniture that could accommodate many informal activities. Users with limited balance asked for backs and armrests that would help them sit down and stand up. The final scheme included several forms of seating, with supported seats clearly available near the main pedestrian route. Consultation did not produce one design that satisfied everyone. It produced a distribution that recognised different physical requirements. The lesson is not that experimental design has no place, but that visual novelty should not remove a basic function on which some users depend more heavily than others."
          },
          {
            "label": "E",
            "text": "Such examples expose a limitation in the language of equal provision. Giving every neighbourhood the same number of benches may appear fair, yet journeys differ in slope, distance and available alternatives. A short level route beside a staffed building is unlike a long exposed route with nowhere to stop. The same numerical allocation can leave very different levels of access. Assessment should therefore include the difficulty of reaching essential destinations. This requires local knowledge as well as mapping. A line on a digital plan does not reveal whether a doorway offers shelter or whether an apparently open courtyard is locked in the afternoon."
          },
          {
            "label": "F",
            "text": "Observation also requires restraint. A seat that appears empty during a brief inspection is not necessarily unnecessary. Its availability may allow someone to attempt a journey, even if that person rarely needs to use it. Conversely, a heavily occupied bench may be serving visitors who already have many comfortable alternatives. Counting seated people provides useful information, but cannot by itself reveal dependence on the facility. Route interviews, repeated visits and reports of abandoned journeys offer complementary evidence. The aim should be to understand the opportunities created by seating, rather than to treat constant occupation as the sole proof that public money has been well spent."
          },
          {
            "label": "G",
            "text": "There are practical limits to provision. Every seat requires space, cleaning and repair, and a poorly positioned bench can obstruct movement. These costs should be considered openly rather than used to dismiss every request. A removable trial installation may reveal conflicts before permanent work begins. Yet a trial needs an announced decision process: users should know when evidence will be reviewed and how the final location will be chosen. Otherwise temporary furniture can remain uncertain for years, and people cannot plan around it. Reliability includes not only physical condition but confidence that a useful resting place will continue to exist."
          },
          {
            "label": "H",
            "text": "The broader implication is that modest public objects deserve serious evaluation. Their significance can be greatest for people whose journeys are least visible in conventional measures of traffic or spending. A bench does not become valuable only when it attracts a crowd or transforms a district's image. It can matter by making an ordinary trip possible without assistance. Success should be judged against that possibility, alongside cost and the competing uses of space. Counting remains necessary for management, but understanding access requires asking what happens between the counted objects, and whose movement becomes easier because they are there."
          }
        ],
        "part": 3,
        "provenance": {
          "kind": "original",
          "note": "Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức."
        },
        "intro": "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        "groups": [
          {
            "type": "features",
            "kind": "match",
            "range": [
              27,
              29
            ],
            "instruction": "Match each statement with the correct illustrative case. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Merewick"
              },
              {
                "key": "B",
                "text": "Dunley"
              },
              {
                "key": "C",
                "text": "Harrowgate"
              }
            ],
            "questions": [
              {
                "n": 27,
                "text": "Existing seating became usable through an agreement about upkeep.",
                "answer": "B",
                "explain": "Đoạn C: “shared maintenance agreement”."
              },
              {
                "n": 28,
                "text": "Different seating forms were retained to meet different physical needs.",
                "answer": "C",
                "explain": "Đoạn D: “included several forms of seating”."
              },
              {
                "n": 29,
                "text": "Some money was moved away from the central square.",
                "answer": "A",
                "explain": "Đoạn B: “moved part of the seating budget”."
              }
            ]
          },
          {
            "type": "ynng",
            "kind": "tfng",
            "variant": "ynng",
            "range": [
              30,
              33
            ],
            "instruction": "Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 30,
                "text": "The same number of benches can provide unequal levels of access.",
                "answer": "YES",
                "explain": "Đoạn E: “very different levels of access”."
              },
              {
                "n": 31,
                "text": "A bench is unnecessary whenever an observer finds it empty.",
                "answer": "NO",
                "explain": "Đoạn F: “not necessarily unnecessary”."
              },
              {
                "n": 32,
                "text": "Most towns currently assess benches through weekly route interviews.",
                "answer": "NOT GIVEN",
                "explain": "Bài đề xuất phỏng vấn nhưng không cho biết đa số thị trấn hiện có làm hàng tuần hay không."
              },
              {
                "n": 33,
                "text": "The continued availability of a seat can influence people’s plans.",
                "answer": "YES",
                "explain": "Đoạn G: “people cannot plan around it”."
              }
            ]
          },
          {
            "type": "endings",
            "kind": "match",
            "range": [
              34,
              36
            ],
            "instruction": "Complete each sentence with the correct ending, A–F.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "needs a clearly announced process for reaching a decision."
              },
              {
                "key": "B",
                "text": "should prioritise visual symmetry above all else."
              },
              {
                "key": "C",
                "text": "is unnecessary if one inspection finds it empty."
              },
              {
                "key": "D",
                "text": "can conceal differences in the difficulty of journeys."
              },
              {
                "key": "E",
                "text": "can be judged only by its occupation at noon."
              },
              {
                "key": "F",
                "text": "may enable an ordinary independent trip."
              }
            ],
            "questions": [
              {
                "n": 34,
                "text": "A numerical allocation of benches",
                "answer": "D",
                "explain": "Đoạn E: “same numerical allocation”."
              },
              {
                "n": 35,
                "text": "A trial installation",
                "answer": "A",
                "explain": "Đoạn G: “announced decision process”."
              },
              {
                "n": 36,
                "text": "A modest public object",
                "answer": "F",
                "explain": "Đoạn H: “making an ordinary trip possible”."
              }
            ]
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              37,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Routes can differ in distance, alternatives and {{37}}.</p><p>A bench must not {{38}} people moving through the space.</p><p>A temporary trial should explain how the final {{39}} will be chosen.</p><p>Evaluation should investigate the opportunities created, alongside {{40}}.</p>",
            "answers": {
              "37": [
                "slope"
              ],
              "38": [
                "obstruct"
              ],
              "39": [
                "location"
              ],
              "40": [
                "cost"
              ]
            },
            "explain": {
              "37": "Đoạn E: “differ in slope”.",
              "38": "Đoạn G: “can obstruct movement”.",
              "39": "Đoạn G: “final location”.",
              "40": "Đoạn H: “alongside cost”."
            }
          }
        ],
        "vocab": [
          {
            "word": "occupation",
            "ipa": "/ˌɒkjəˈpeɪʃən/",
            "pos": "n.",
            "vi": "nghề nghiệp; công việc",
            "band": "7.0",
            "example": "The aim should be to understand the opportunities created by seating, rather than to treat constant occupation as the sole proof that public money has been well spent.",
            "id": "occupation",
            "topic": "urban"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "Route interviews, repeated visits and reports of abandoned journeys offer complementary evidence.",
            "id": "evidence",
            "topic": "urban"
          },
          {
            "word": "sequence",
            "ipa": "/ˈsiːkwəns/",
            "pos": "n.",
            "vi": "trình tự",
            "band": "7.0",
            "example": "Here, the value of a bench depended on sequence rather than visual concentration.",
            "id": "sequence",
            "topic": "urban"
          },
          {
            "word": "evaluation",
            "ipa": "/ɪˌvæljuˈeɪʃən/",
            "pos": "n.",
            "vi": "sự đánh giá",
            "band": "7.0",
            "example": "The broader implication is that modest public objects deserve serious evaluation.",
            "id": "evaluation",
            "topic": "urban"
          },
          {
            "word": "allocation",
            "ipa": "/ˌæləˈkeɪʃən/",
            "pos": "n.",
            "vi": "sự phân bổ",
            "band": "7.0",
            "example": "The same numerical allocation can leave very different levels of access.",
            "id": "allocation",
            "topic": "urban"
          },
          {
            "word": "reliability",
            "ipa": "/rɪˌlaɪəˈbɪləti/",
            "pos": "n.",
            "vi": "độ tin cậy",
            "band": "7.0",
            "example": "Reliability includes not only physical condition but confidence that a useful resting place will continue to exist.",
            "id": "reliability",
            "topic": "urban"
          },
          {
            "word": "maintenance",
            "ipa": "/ˈmeɪntənəns/",
            "pos": "n.",
            "vi": "sự bảo trì",
            "band": "7.0",
            "example": "A public bench is easily counted, photographed and entered into a maintenance register.",
            "id": "maintenance",
            "topic": "urban"
          },
          {
            "word": "provision",
            "ipa": "/prəˈvɪʒən/",
            "pos": "n.",
            "vi": "sự cung cấp",
            "band": "7.0",
            "example": "Such examples expose a limitation in the language of equal provision.",
            "id": "provision",
            "topic": "urban"
          },
          {
            "word": "distribution",
            "ipa": "/ˌdɪstrɪˈbjuːʃən/",
            "pos": "n.",
            "vi": "sự phân bố",
            "band": "7.0",
            "example": "The resulting distribution looked less symmetrical, but it provided rest before the hardest stage of a common journey.",
            "id": "distribution",
            "topic": "urban"
          },
          {
            "id": "destination",
            "word": "destination",
            "ipa": "/ˌdestɪˈneɪʃn/",
            "pos": "n.",
            "band": "6.5",
            "vi": "điểm đến",
            "example": "Assessment should therefore include the difficulty of reaching essential destinations.",
            "topic": "urban"
          },
          {
            "id": "inspection",
            "word": "inspection",
            "ipa": "/ɪnˈspekʃn/",
            "pos": "n.",
            "band": "7.0",
            "vi": "sự kiểm tra",
            "example": "A seat that appears empty during a brief inspection is not necessarily unnecessary.",
            "topic": "urban"
          },
          {
            "id": "complementary",
            "word": "complementary",
            "ipa": "/ˌkɒmplɪˈmentri/",
            "pos": "adj.",
            "band": "7.0",
            "vi": "bổ sung cho nhau",
            "example": "Route interviews, repeated visits and reports of abandoned journeys offer complementary evidence.",
            "topic": "urban"
          },
          {
            "id": "consultation",
            "word": "consultation",
            "ipa": "/ˌkɒnslˈteɪʃn/",
            "pos": "n.",
            "band": "7.0",
            "vi": "sự tham vấn",
            "example": "Consultation did not produce one design that satisfied everyone.",
            "topic": "urban"
          },
          {
            "id": "temporary",
            "word": "temporary",
            "ipa": "/ˈtemprəri/",
            "pos": "adj.",
            "band": "7.0",
            "vi": "tạm thời",
            "example": "Otherwise temporary furniture can remain uncertain for years, and people cannot plan around it.",
            "topic": "urban"
          }
        ]
      }
    ]
  },
  {
    "id": "R6",
    "title": "Practice Test 6 — Venus, Manufacture & Working Time",
    "source": "Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật",
    "passages": [
      {
        "id": "R6-P1",
        "part": 1,
        "title": "Venus and the Greenhouse",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Venus is the second planet from the Sun, and our closest planetary neighbor. It's the hottest planet in our solar system, and is sometimes called Earth's twin. Venus is the second planet from the Sun, and Earth's closest planetary neighbor. Venus is the third brightest object in the sky after the Sun and Moon. Venus spins slowly in the opposite direction from most planets. Venus is similar in structure and size to Earth, and is sometimes called Earth's evil twin. Its thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system with surface temperatures hot enough to melt lead — about 872 degrees Fahrenheit (467 Celsius)."
          },
          {
            "label": "B",
            "text": "And the atmospheric pressure at the surface is about 93 times what it is at sea level on Earth. Below Venus' dense, persistent clouds, the surface has volcanoes and deformed mountains. The ancient Romans could easily see seven bright objects in the sky: the Sun, the Moon, and the five brightest planets: Mercury, Venus, Mars, Jupiter, and Saturn. They named the objects after their most important gods. Venus is named for the ancient Roman goddess of love and beauty, who was known as Aphrodite to the ancient Greeks."
          },
          {
            "label": "C",
            "text": "Most features on Venus are named for women. It’s the only planet named after a female god. Thirty miles up (about 50 kilometers) from the surface of Venus temperatures range from 86 to 158 Fahrenheit (30 to 70 Celsius). This temperature range could accommodate Earthly life, such as “extremophile” microbes. And atmospheric pressure at that height is similar to what we find on Earth’s surface. At the tops of Venus’ clouds, whipped around the planet by winds measured as high as 224 mph (360 kph), we find another transformation."
          },
          {
            "label": "D",
            "text": "Persistent, dark streaks appear. Scientists are so far unable to explain why these streaks remain stubbornly intact, even amid hurricane-force winds. They also have the odd habit of absorbing ultraviolet radiation. The most likely explanations focus on fine particles, ice crystals, or even a chemical compound called iron chloride. Although it's much less likely, another possibility considered by scientists who study astrobiology is that these streaks could be made up of microbial life, Venus-style. Astrobiologists note that ring-shaped linkages of sulfur atoms, known to exist in Venus’ atmosphere, could provide microbes with a kind of coating that would protect them from sulfuric acid."
          },
          {
            "label": "E",
            "text": "These handy chemical cloaks would also absorb potentially damaging ultraviolet light and re-radiate it as visible light. Some of the Russian Venera probes did, indeed, detect particles in Venus’ lower atmosphere about a micron in length — roughly the same size as a bacterium on Earth. None of these findings provide compelling evidence for the existence of life in Venus’ clouds. But the questions they raise, along with Venus’ vanished ocean, its violently volcanic surface, and its hellish history, make a compelling case for missions to investigate our temperamental sister planet."
          },
          {
            "label": "F",
            "text": "There is much, it would seem, that she can teach us. Venus orbits the Sun from an average distance of 67 million miles (108 million kilometers), or 0.72 astronomical units (1 astronomical unit, abbreviated AU, is the distance from the Sun to Earth). Sunlight takes about six minutes to travel from the Sun to Venus, compared to about eight minutes for the Sun and Earth. Earth's nearness to Venus is a matter of perspective. The planet is nearly as big around as Earth. Its diameter at its equator is about 7,521 miles (12,104 kilometers), versus 7,926 miles (12,756 kilometers) for Earth."
          },
          {
            "label": "G",
            "text": "From Earth, Venus is the brightest object in the night sky after our own Moon. The ancients, therefore, gave it great importance in their cultures, even thinking it was two objects: a morning star and an evening star. That’s where the trick of perspective comes in. Because Venus’ orbit is closer to the Sun than ours, the two of them — from our viewpoint — never stray far from each other. The ancient Egyptians and Greeks saw Venus in two guises: first in one orbital position (seen in the morning), then another (your “evening” Venus), just at different times of the year."
          },
          {
            "label": "H",
            "text": "At its nearest to Earth, Venus is about 24 million miles away (about 38 million kilometers). But most of the time the two planets are farther apart. The maximum distance between Venus and Earth is about 162 million miles (261 million kilometers). Mercury, the innermost planet, actually spends more time in Earth’s proximity than Venus. One more trick of perspective: how Venus looks through binoculars or a telescope. Keep watch over many months, and you’ll notice that Venus has phases, just like our Moon — full, half, quarter, etc. The complete cycle, however, new to full, takes 584 days, while our Moon takes just a month."
          }
        ],
        "provenance": {
          "kind": "public-information-excerpt",
          "publisher": "NASA Science",
          "url": "https://science.nasa.gov/venus/facts/",
          "rightsUrl": "https://www.nasa.gov/nasa-brand-center/images-and-media/",
          "note": "Trích tuyển văn bản giáo dục NASA Science; chia lại đoạn A–H để luyện đọc. Câu hỏi và lời giải do app biên soạn. Không ngụ ý NASA bảo trợ."
        },
        "intro": "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        "groups": [
          {
            "type": "tfng",
            "kind": "tfng",
            "variant": "tfng",
            "range": [
              1,
              5
            ],
            "instruction": "Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 1,
                "text": "Venus rotates in the same direction as most planets.",
                "answer": "FALSE",
                "explain": "Đoạn A: “opposite direction from most planets”."
              },
              {
                "n": 2,
                "text": "The surface temperature is sufficient to melt lead.",
                "answer": "TRUE",
                "explain": "Đoạn A: “hot enough to melt lead”."
              },
              {
                "n": 3,
                "text": "Every surface feature on Venus is named after a woman.",
                "answer": "FALSE",
                "explain": "Đoạn C: “Most features on Venus are named for women”."
              },
              {
                "n": 4,
                "text": "Researchers have confirmed living organisms in the clouds.",
                "answer": "FALSE",
                "explain": "Đoạn E: “None of these findings provide compelling evidence”."
              },
              {
                "n": 5,
                "text": "Early Venera probes were more expensive to build than later ones.",
                "answer": "NOT GIVEN",
                "explain": "Không nêu hoặc so sánh chi phí chế tạo các tàu Venera."
              }
            ]
          },
          {
            "type": "note",
            "kind": "gap",
            "range": [
              6,
              9
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Venus’ atmosphere",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Pressure at the surface: about {{6}} times Earth’s sea-level pressure</p><p>The unexplained dark streaks absorb {{7}} radiation.</p><p>One possible explanation involves the chemical {{8}}.</p><p>Sulfur linkages might give microbes a protective {{9}}.</p>",
            "answers": {
              "6": [
                "93"
              ],
              "7": [
                "ultraviolet"
              ],
              "8": [
                "iron chloride"
              ],
              "9": [
                "coating"
              ]
            },
            "explain": {
              "6": "Đoạn B: “about 93 times”.",
              "7": "Đoạn D: “absorbing ultraviolet radiation”.",
              "8": "Đoạn D: “called iron chloride”.",
              "9": "Đoạn D: “a kind of coating”."
            }
          },
          {
            "type": "short",
            "kind": "gap",
            "range": [
              10,
              13
            ],
            "instruction": "Complete the answers. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>How many minutes does sunlight take to reach Venus? {{10}}</p><p>Which planet spends more time near Earth than Venus does? {{11}}</p><p>What instrument is mentioned alongside binoculars? {{12}}</p><p>How long is the complete cycle of Venus’ phases, in days? {{13}}</p>",
            "answers": {
              "10": [
                "six",
                "6"
              ],
              "11": [
                "Mercury"
              ],
              "12": [
                "telescope"
              ],
              "13": [
                "584"
              ]
            },
            "explain": {
              "10": "Đoạn F: “about six minutes”.",
              "11": "Đoạn H: “Mercury, the innermost planet”.",
              "12": "Đoạn H: “binoculars or a telescope”.",
              "13": "Đoạn H: “takes 584 days”."
            }
          }
        ],
        "vocab": [
          {
            "word": "planet",
            "ipa": "/ˈplænɪt/",
            "pos": "n.",
            "vi": "hành tinh",
            "band": "7.0",
            "example": "Venus is the second planet from the Sun, and our closest planetary neighbor.",
            "id": "planet",
            "topic": "science"
          },
          {
            "word": "solar",
            "ipa": "/ˈsəʊlə/",
            "pos": "adj.",
            "vi": "thuộc Mặt Trời",
            "band": "7.0",
            "example": "It's the hottest planet in our solar system, and is sometimes called Earth's twin.",
            "id": "solar",
            "topic": "science"
          },
          {
            "word": "surface",
            "ipa": "/ˈsɜːfɪs/",
            "pos": "n.",
            "vi": "bề mặt",
            "band": "7.0",
            "example": "Its thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system with surface temperatures hot enough to melt lead — about 872 degrees Fahrenheit (467 Celsius).",
            "id": "surface",
            "topic": "science"
          },
          {
            "word": "atmosphere",
            "ipa": "/ˈætməsfɪə/",
            "pos": "n.",
            "vi": "khí quyển",
            "band": "7.0",
            "example": "Its thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system with surface temperatures hot enough to melt lead — about 872 degrees Fahrenheit (467 Celsius).",
            "id": "atmosphere",
            "topic": "science"
          },
          {
            "word": "orbit",
            "ipa": "/ˈɔːbɪt/",
            "pos": "n./v.",
            "vi": "quỹ đạo; quay quanh",
            "band": "7.0",
            "example": "Venus orbits the Sun from an average distance of 67 million miles (108 million kilometers), or 0.72 astronomical units (1 astronomical unit, abbreviated AU, is the distance from the Sun to Earth).",
            "id": "orbit",
            "topic": "science"
          },
          {
            "word": "temperature",
            "ipa": "/ˈtemprətʃə/",
            "pos": "n.",
            "vi": "nhiệt độ",
            "band": "7.0",
            "example": "Its thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system with surface temperatures hot enough to melt lead — about 872 degrees Fahrenheit (467 Celsius).",
            "id": "temperature",
            "topic": "science"
          },
          {
            "word": "particle",
            "ipa": "/ˈpɑːtɪkəl/",
            "pos": "n.",
            "vi": "hạt nhỏ",
            "band": "7.0",
            "example": "The most likely explanations focus on fine particles, ice crystals, or even a chemical compound called iron chloride.",
            "id": "particle",
            "topic": "science"
          },
          {
            "word": "radiation",
            "ipa": "/ˌreɪdiˈeɪʃən/",
            "pos": "n.",
            "vi": "bức xạ",
            "band": "7.0",
            "example": "They also have the odd habit of absorbing ultraviolet radiation.",
            "id": "radiation",
            "topic": "science"
          },
          {
            "word": "dense",
            "ipa": "/dens/",
            "pos": "adj.",
            "vi": "dày đặc",
            "band": "7.0",
            "example": "Below Venus' dense, persistent clouds, the surface has volcanoes and deformed mountains.",
            "id": "dense",
            "topic": "science"
          },
          {
            "word": "pressure",
            "ipa": "/ˈpreʃə/",
            "pos": "n.",
            "vi": "áp suất; áp lực",
            "band": "7.0",
            "example": "And the atmospheric pressure at the surface is about 93 times what it is at sea level on Earth.",
            "id": "pressure",
            "topic": "science"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "None of these findings provide compelling evidence for the existence of life in Venus’ clouds.",
            "id": "evidence",
            "topic": "science"
          },
          {
            "id": "absorb",
            "word": "absorb",
            "ipa": "/əbˈzɔːb/",
            "pos": "v.",
            "band": "6.5",
            "vi": "hấp thụ",
            "example": "They also have the odd habit of absorbing ultraviolet radiation.",
            "topic": "science"
          },
          {
            "id": "compelling",
            "word": "compelling",
            "ipa": "/kəmˈpelɪŋ/",
            "pos": "adj.",
            "band": "7.0",
            "vi": "thuyết phục, hấp dẫn",
            "example": "None of these findings provide compelling evidence for the existence of life in Venus’ clouds.",
            "topic": "science"
          },
          {
            "id": "particles",
            "word": "particles",
            "ipa": "/ˈpɑːtɪklz/",
            "pos": "n.",
            "band": "7.0",
            "vi": "các hạt nhỏ",
            "example": "The most likely explanations focus on fine particles, ice crystals, or even a chemical compound called iron chloride.",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R6-P2",
        "part": 2,
        "title": "Dividing the Work of Manufacture",
        "topic": "work",
        "paragraphs": [
          {
            "label": "A",
            "text": "217. Perhaps the most important principle on which the economy of a manufacture depends, is the division of labour amongst the persons who perform the work. The first application of this principle must have been made in a very early stage of society, for it must soon have been apparent, that a larger number of comforts and conveniences could be acquired by each individual, if one man restricted his occupation to the art of making bows, another to that of building houses, a third boats, and so on."
          },
          {
            "label": "B",
            "text": "This division of labour into trades was not, however, the result of an opinion that the general riches of the community would be increased by such an arrangement; but it must have arisen from the circumstance of each individual so employed discovering that he himself could thus make a greater profit of his labour than by pursuing more varied occupations. Society must have made considerable advances before this principle could have been carried into the workshop; for it is only in countries which have attained a high degree of civilization, and in articles in which there is a great competition amongst the producers, that the most perfect system of the division of labour is to be observed."
          },
          {
            "label": "C",
            "text": "The various principles on which the advantages of this system depend, have been much the subject of discussion amongst writers on political economy; but the relative importance of their influence does not appear, in all cases, to have been estimated with sufficient precision. It is my intention, in the first instance, to state shortly those principles, and then to point out what appears to me to have been omitted by those who have previously treated the subject. 218. 1. Of the time required for learning. It will readily be admitted, that the portion of time occupied in the acquisition of any art will depend on the difficulty of its execution; and that the greater the number of distinct processes, the longer will be the time which the apprentice must employ in acquiring it."
          },
          {
            "label": "D",
            "text": "Five or seven years have been adopted, in a great many trades, as the time considered requisite for a lad to acquire a sufficient knowledge of his art, and to enable him to repay by his labour, during the latter portion of his time, the expense incurred by his master at its commencement. If, however, instead of learning all the different processes for making a needle, for instance, his attention be confined to one operation, the portion of time consumed unprofitably at the commencement of his apprenticeship will be small, and all the rest of it will be beneficial to his master: and, consequently, if there be any competition amongst the masters, the apprentice will be able to make better terms, and diminish the period of his servitude."
          },
          {
            "label": "E",
            "text": "Again, the facility of acquiring skill in a single process, and the early period of life at which it can be made a source of profit, will induce a greater number of parents to bring up their children to it; and from this circumstance also, the number of workmen being increased, the wages will soon fall. 219. 2. Of waste of materials in learning. A certain quantity of material will, in all cases, be consumed unprofitably, or spoiled by every person who learns an art; and as he applies himself to each new process, he will waste some of the raw material, or of the partly manufactured commodity."
          },
          {
            "label": "F",
            "text": "But if each man commit this waste in acquiring successively every process, the quantity of waste will be much greater than if each person confine his attention to one process; in this view of the subject, therefore, the division of labour will diminish the price of production. 220. 3. Another advantage resulting from the division of labour is, the saving of that portion of time which is always lost in changing from one occupation to another."
          },
          {
            "label": "G",
            "text": "When the human hand, or the human head, has been for some time occupied in any kind of work, it cannot instantly change its employment with full effect. The muscles of the limbs employed have acquired a flexibility during their exertion, and those not in action a stiffness during rest, which renders every change slow and unequal in the commencement. Long habit also produces in the muscles exercised a capacity for enduring fatigue to a much greater degree than they could support under other circumstances."
          },
          {
            "label": "H",
            "text": "A similar result seems to take place in any change of mental exertion; the attention bestowed on the new subject not being so perfect at first as it becomes after some exercise. 221. 4. Change of tools. The employment of different tools in the successive processes is another cause of the loss of time in changing from one operation to another."
          }
        ],
        "provenance": {
          "kind": "public-domain-excerpt",
          "publisher": "Charles Babbage — On the Economy of Machinery and Manufactures (1832)",
          "url": "https://www.gutenberg.org/cache/epub/4238/pg4238-images.html",
          "rightsUrl": "https://www.gutenberg.org/policy/license.html",
          "note": "Trích văn bản lịch sử thuộc phạm vi công cộng: Charles Babbage, On the Economy of Machinery and Manufactures (1832); giữ ngôn ngữ và góc nhìn thời kỳ đó, chia lại đoạn A–H. Dùng để luyện đọc hiểu, không trình bày như kiến thức khoa học hoặc quan điểm hiện hành. Câu hỏi và lời giải do app biên soạn. Nguồn số hóa có kèm giấy phép Project Gutenberg."
        },
        "intro": "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        "groups": [
          {
            "type": "headings",
            "kind": "match",
            "range": [
              14,
              17
            ],
            "instruction": "Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.",
            "allowReuse": false,
            "options": [
              {
                "key": "i",
                "text": "A shorter route through an apprenticeship"
              },
              {
                "key": "ii",
                "text": "Introducing the analysis and the cost of learning"
              },
              {
                "key": "iii",
                "text": "Why high wages improve every trade"
              },
              {
                "key": "iv",
                "text": "Individual gain before collective prosperity"
              },
              {
                "key": "v",
                "text": "Early specialisation in different trades"
              },
              {
                "key": "vi",
                "text": "Replacing apprentices with machinery"
              }
            ],
            "questions": [
              {
                "n": 14,
                "text": "Paragraph A",
                "answer": "v",
                "explain": "Đoạn A: “division of labour amongst the persons”. Ví dụ làm cung, nhà, thuyền minh họa phân công theo nghề từ sớm."
              },
              {
                "n": 15,
                "text": "Paragraph B",
                "answer": "iv",
                "explain": "Đoạn B: “greater profit of his labour”. Động lực ban đầu là lợi ích cá nhân, chưa phải ý định tăng của cải chung."
              },
              {
                "n": 16,
                "text": "Paragraph C",
                "answer": "ii",
                "explain": "Đoạn C: “Of the time required for learning”. Đoạn mở phần phân tích các lợi thế, bắt đầu bằng thời gian học nghề."
              },
              {
                "n": 17,
                "text": "Paragraph D",
                "answer": "i",
                "explain": "Đoạn D: “confined to one operation”. Chỉ học một thao tác giúp giảm thời gian đầu chưa tạo lợi ích."
              }
            ]
          },
          {
            "type": "info",
            "kind": "match",
            "range": [
              18,
              20
            ],
            "instruction": "Which paragraph contains the following information? You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Paragraph A"
              },
              {
                "key": "B",
                "text": "Paragraph B"
              },
              {
                "key": "C",
                "text": "Paragraph C"
              },
              {
                "key": "D",
                "text": "Paragraph D"
              },
              {
                "key": "E",
                "text": "Paragraph E"
              },
              {
                "key": "F",
                "text": "Paragraph F"
              },
              {
                "key": "G",
                "text": "Paragraph G"
              },
              {
                "key": "H",
                "text": "Paragraph H"
              }
            ],
            "questions": [
              {
                "n": 18,
                "text": "A prediction that easier access to a skill can reduce pay",
                "answer": "E",
                "explain": "Đoạn E: “wages will soon fall”."
              },
              {
                "n": 19,
                "text": "An explanation of why changing activity is initially inefficient",
                "answer": "G",
                "explain": "Đoạn G: “renders every change slow”."
              },
              {
                "n": 20,
                "text": "A comparison between physical and mental changes of activity",
                "answer": "H",
                "explain": "Đoạn H: “change of mental exertion”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              21,
              23
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Learning each new process wastes some raw {{21}}.</p><p>Restricting workers to single processes can reduce the price of {{22}}.</p><p>Moving between different {{23}} also consumes time.</p>",
            "answers": {
              "21": [
                "material"
              ],
              "22": [
                "production"
              ],
              "23": [
                "tools"
              ]
            },
            "explain": {
              "21": "Đoạn E: “raw material”.",
              "22": "Đoạn F: “price of production”.",
              "23": "Đoạn H: “Change of tools”."
            }
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              24,
              26
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 24,
                "text": "Why did early individuals restrict themselves to one trade, according to Babbage?",
                "options": [
                  "A They expected greater personal returns",
                  "B They were obeying a national plan",
                  "C They wanted to teach every trade"
                ],
                "answer": "A",
                "explain": "Đoạn B: “greater profit of his labour”."
              },
              {
                "n": 25,
                "text": "What does the author intend to add to earlier discussions?",
                "options": [
                  "A An account of advertising",
                  "B Something previous writers have omitted",
                  "C An argument against all machinery"
                ],
                "answer": "B",
                "explain": "Đoạn C: “what appears to me to have been omitted”."
              },
              {
                "n": 26,
                "text": "Why might employers offer shorter apprenticeships?",
                "options": [
                  "A Training would require more trades",
                  "B Every apprentice would receive identical pay",
                  "C Competition and faster useful work would alter the terms"
                ],
                "answer": "C",
                "explain": "Đoạn D: “if there be any competition amongst the masters”."
              }
            ]
          }
        ],
        "vocab": [
          {
            "word": "manufacture",
            "ipa": "/ˌmænjəˈfæktʃə/",
            "pos": "n./v.",
            "vi": "sự sản xuất; sản xuất",
            "band": "7.0",
            "example": "Perhaps the most important principle on which the economy of a manufacture depends, is the division of labour amongst the persons who perform the work.",
            "id": "manufacture",
            "topic": "work"
          },
          {
            "word": "occupation",
            "ipa": "/ˌɒkjəˈpeɪʃən/",
            "pos": "n.",
            "vi": "nghề nghiệp; công việc",
            "band": "7.0",
            "example": "The first application of this principle must have been made in a very early stage of society, for it must soon have been apparent, that a larger number of comforts and conveniences could be acquired by each individual, if one man restricted his occupation to the art of making bows, another to that of building houses, a third boats, and so on.",
            "id": "occupation",
            "topic": "work"
          },
          {
            "word": "division",
            "ipa": "/dɪˈvɪʒən/",
            "pos": "n.",
            "vi": "sự phân chia",
            "band": "7.0",
            "example": "Perhaps the most important principle on which the economy of a manufacture depends, is the division of labour amongst the persons who perform the work.",
            "id": "division",
            "topic": "work"
          },
          {
            "word": "principle",
            "ipa": "/ˈprɪnsəpəl/",
            "pos": "n.",
            "vi": "nguyên tắc",
            "band": "7.0",
            "example": "Perhaps the most important principle on which the economy of a manufacture depends, is the division of labour amongst the persons who perform the work.",
            "id": "principle",
            "topic": "work"
          },
          {
            "word": "trade",
            "ipa": "/treɪd/",
            "pos": "n.",
            "vi": "nghề; thương mại",
            "band": "7.0",
            "example": "This division of labour into trades was not, however, the result of an opinion that the general riches of the community would be increased by such an arrangement; but it must have arisen from the circumstance of each individual so employed discovering that he himself could thus make a greater profit of his labour than by pursuing more varied occupations.",
            "id": "trade",
            "topic": "work"
          },
          {
            "word": "apprentice",
            "ipa": "/əˈprentɪs/",
            "pos": "n.",
            "vi": "người học nghề",
            "band": "7.0",
            "example": "It will readily be admitted, that the portion of time occupied in the acquisition of any art will depend on the difficulty of its execution; and that the greater the number of distinct processes, the longer will be the time which the apprentice must employ in acquiring it.",
            "id": "apprentice",
            "topic": "work"
          },
          {
            "word": "execution",
            "ipa": "/ˌeksɪˈkjuːʃən/",
            "pos": "n.",
            "vi": "việc thực hiện",
            "band": "7.0",
            "example": "It will readily be admitted, that the portion of time occupied in the acquisition of any art will depend on the difficulty of its execution; and that the greater the number of distinct processes, the longer will be the time which the apprentice must employ in acquiring it.",
            "id": "execution",
            "topic": "work"
          },
          {
            "word": "precision",
            "ipa": "/prɪˈsɪʒən/",
            "pos": "n.",
            "vi": "độ chính xác",
            "band": "7.0",
            "example": "The various principles on which the advantages of this system depend, have been much the subject of discussion amongst writers on political economy; but the relative importance of their influence does not appear, in all cases, to have been estimated with sufficient precision.",
            "id": "precision",
            "topic": "work"
          },
          {
            "word": "commodity",
            "ipa": "/kəˈmɒdəti/",
            "pos": "n.",
            "vi": "hàng hóa",
            "band": "7.0",
            "example": "A certain quantity of material will, in all cases, be consumed unprofitably, or spoiled by every person who learns an art; and as he applies himself to each new process, he will waste some of the raw material, or of the partly manufactured commodity.",
            "id": "commodity",
            "topic": "work"
          },
          {
            "word": "wages",
            "ipa": "/ˈweɪdʒɪz/",
            "pos": "n.",
            "vi": "tiền công",
            "band": "7.0",
            "example": "Again, the facility of acquiring skill in a single process, and the early period of life at which it can be made a source of profit, will induce a greater number of parents to bring up their children to it; and from this circumstance also, the number of workmen being increased, the wages will soon fall. 219. 2.",
            "id": "wages",
            "topic": "work"
          },
          {
            "word": "exertion",
            "ipa": "/ɪɡˈzɜːʃən/",
            "pos": "n.",
            "vi": "sự gắng sức",
            "band": "7.0",
            "example": "The muscles of the limbs employed have acquired a flexibility during their exertion, and those not in action a stiffness during rest, which renders every change slow and unequal in the commencement.",
            "id": "exertion",
            "topic": "work"
          },
          {
            "word": "flexibility",
            "ipa": "/ˌfleksəˈbɪləti/",
            "pos": "n.",
            "vi": "tính linh hoạt",
            "band": "7.0",
            "example": "The muscles of the limbs employed have acquired a flexibility during their exertion, and those not in action a stiffness during rest, which renders every change slow and unequal in the commencement.",
            "id": "flexibility",
            "topic": "work"
          },
          {
            "word": "capacity",
            "ipa": "/kəˈpæsəti/",
            "pos": "n.",
            "vi": "khả năng; sức chứa",
            "band": "7.0",
            "example": "Long habit also produces in the muscles exercised a capacity for enduring fatigue to a much greater degree than they could support under other circumstances.",
            "id": "capacity",
            "topic": "work"
          },
          {
            "word": "fatigue",
            "ipa": "/fəˈtiːɡ/",
            "pos": "n.",
            "vi": "sự mệt mỏi",
            "band": "7.0",
            "example": "Long habit also produces in the muscles exercised a capacity for enduring fatigue to a much greater degree than they could support under other circumstances.",
            "id": "fatigue",
            "topic": "work"
          }
        ]
      },
      {
        "id": "R6-P3",
        "title": "What a Shorter Working Week Measures",
        "topic": "work",
        "paragraphs": [
          {
            "label": "A",
            "text": "A shorter working week can mean several different changes. Employees may work fewer hours, complete the same hours in longer days, or redistribute duties across a larger team. These arrangements produce different consequences, yet public discussion often treats them as a single policy. Even a promising trial becomes difficult to interpret if its basic terms remain unclear. Before examining productivity, an evaluator needs to know what happened to contracted hours, pay and access to services. Otherwise a headline about an extra day off may conceal work transferred to evenings, colleagues or customers. The calendar is a starting point for investigation, rather than a sufficient description of the reform."
          },
          {
            "label": "B",
            "text": "The fictional design firm Alder Studio reduced contracted hours while retaining salaries. It removed an internal meeting, required clearer project briefs and asked clients to consolidate minor requests. Staff reported fewer interruptions, but managers did not assume that every saved meeting hour became productive design time. They examined deadlines, revisions and the distribution of urgent tasks. One employee still answered messages on the nominal day off. That work was recorded rather than treated as a personal preference outside the trial. Alder's experience illustrates why the boundary of paid work must be observed carefully when an attractive schedule encourages people to protect the appearance of success."
          },
          {
            "label": "C",
            "text": "At fictional Brookline Services, public access had to continue throughout the existing opening week. Employees therefore took different days off, supported by a rota. A handover log recorded unresolved cases so that residents did not have to repeat their circumstances to each worker. The arrangement depended less on removing meetings than on making knowledge transferable. Managers also compared waiting times across days, since an unchanged weekly total could conceal a severe delay every Friday. Brookline did not regard continuous opening as proof that nothing had changed. It investigated how continuity was achieved and whether employees acquired additional responsibilities when covering for absent colleagues."
          },
          {
            "label": "D",
            "text": "The imaginary manufacturer Caster Works kept total weekly hours unchanged but compressed them into four longer shifts. Many workers valued the reduction in commuting days. Others found the final hours of a shift demanding, particularly when they had caring commitments after work. Calling this a reduction in working time would be inaccurate: it was a redistribution of time. The company examined errors near the end of shifts and allowed some teams to retain the earlier pattern. A calendar with fewer workdays can therefore represent a useful choice without providing evidence about the effects of genuinely shorter hours. Distinguishing the two arrangements protects both employees and the interpretation of results."
          },
          {
            "label": "E",
            "text": "Measurement creates another difficulty. Output is relatively visible when a team produces standard units, but less obvious when its work involves prevention, advice or experimentation. Counting completed cases may reward rapid closure while ignoring whether the problem returns. Counting new ideas may encourage minor suggestions that consume little effort. An evaluation should specify what a measure misses, and combine several indicators where necessary. Staff accounts of concentration and recovery can be informative without being treated as exact substitutes for service quality. No single figure is likely to capture every consequence of a change that alters coordination, personal routines and the timing of demand."
          },
          {
            "label": "F",
            "text": "Comparisons over time also require attention to the surrounding workload. A trial conducted during a quiet season may look successful even if the same arrangement would struggle during an annual deadline. Conversely, the costs of learning a new routine can make the opening weeks unusually difficult. A useful assessment records both the transition and a later period when the arrangement has become familiar. It should also retain information about unsuccessful adjustments. An organisation that quietly restores old hours in one department has discovered a limit worth understanding, rather than an embarrassing detail to remove from a favourable account."
          },
          {
            "label": "G",
            "text": "Fairness cannot be inferred from an average improvement. Senior staff may gain uninterrupted time while junior colleagues absorb the urgent requests that remain. Workers whose roles require physical presence may have fewer options than those who can complete tasks at home. Asking who benefits does not invalidate the proposal; it identifies where additional design is needed. Options might include different rotas, clearer escalation rules or protection from messages outside agreed hours. Participation should remain meaningful when employees fear that expressing a difficulty will threaten a benefit enjoyed by everyone else. Anonymous feedback alone may not resolve that pressure."
          },
          {
            "label": "H",
            "text": "The most useful trials are consequently explicit about their claims. They establish which schedule was tested, whose work was included and what evidence would count against continuation. A shorter week should be assessed as an organisational arrangement with particular conditions, rather than as a universal reward for modern management. Its success may depend on eliminating avoidable coordination costs, but those savings are not guaranteed or evenly distributed. A credible account can still be positive while explaining these limits. The objective is to learn how time can be organised more effectively, including when fewer days and fewer hours turn out to be different answers."
          }
        ],
        "part": 3,
        "provenance": {
          "kind": "original",
          "note": "Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức."
        },
        "intro": "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        "groups": [
          {
            "type": "features",
            "kind": "match",
            "range": [
              27,
              29
            ],
            "instruction": "Match each statement with the correct illustrative case. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Alder Studio"
              },
              {
                "key": "B",
                "text": "Brookline Services"
              },
              {
                "key": "C",
                "text": "Caster Works"
              }
            ],
            "questions": [
              {
                "n": 27,
                "text": "Employees worked the same total hours in fewer days.",
                "answer": "C",
                "explain": "Đoạn D: “kept total weekly hours unchanged”."
              },
              {
                "n": 28,
                "text": "Staff used a record to transfer unresolved work between colleagues.",
                "answer": "B",
                "explain": "Đoạn C: “A handover log”."
              },
              {
                "n": 29,
                "text": "An internal meeting was removed from the schedule.",
                "answer": "A",
                "explain": "Đoạn B: “removed an internal meeting”."
              }
            ]
          },
          {
            "type": "ynng",
            "kind": "tfng",
            "variant": "ynng",
            "range": [
              30,
              33
            ],
            "instruction": "Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 30,
                "text": "Fewer workdays always mean fewer working hours.",
                "answer": "NO",
                "explain": "Đoạn D: “it was a redistribution of time”."
              },
              {
                "n": 31,
                "text": "Several indicators may be needed to assess complex work.",
                "answer": "YES",
                "explain": "Đoạn E: “combine several indicators”."
              },
              {
                "n": 32,
                "text": "Most employees would accept lower salaries for a shorter week.",
                "answer": "NOT GIVEN",
                "explain": "Không có khảo sát hoặc tỷ lệ về chấp nhận giảm lương."
              },
              {
                "n": 33,
                "text": "An average benefit can conceal extra pressure on junior staff.",
                "answer": "YES",
                "explain": "Đoạn G: “junior colleagues absorb the urgent requests”."
              }
            ]
          },
          {
            "type": "endings",
            "kind": "match",
            "range": [
              34,
              36
            ],
            "instruction": "Complete each sentence with the correct ending, A–F.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "can ignore work done outside agreed hours."
              },
              {
                "key": "B",
                "text": "can describe the limits of the arrangement."
              },
              {
                "key": "C",
                "text": "may not show how the system handles an annual deadline."
              },
              {
                "key": "D",
                "text": "always represents a reduction in contracted hours."
              },
              {
                "key": "E",
                "text": "may overlook problems that return after closure."
              },
              {
                "key": "F",
                "text": "proves every department will respond identically."
              }
            ],
            "questions": [
              {
                "n": 34,
                "text": "A trial held during a quiet period",
                "answer": "C",
                "explain": "Đoạn F: “during an annual deadline”."
              },
              {
                "n": 35,
                "text": "Counting completed cases",
                "answer": "E",
                "explain": "Đoạn E: “whether the problem returns”."
              },
              {
                "n": 36,
                "text": "A credible positive account",
                "answer": "B",
                "explain": "Đoạn H: “positive while explaining these limits”."
              }
            ]
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              37,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>An evaluation first needs clarity about hours, pay and access to {{37}}.</p><p>Work on a nominal day off should be {{38}}.</p><p>The arrangement should be assessed again after it becomes {{39}}.</p><p>Fair arrangements may require protection from out-of-hours {{40}}.</p>",
            "answers": {
              "37": [
                "services"
              ],
              "38": [
                "recorded"
              ],
              "39": [
                "familiar"
              ],
              "40": [
                "messages"
              ]
            },
            "explain": {
              "37": "Đoạn A: “access to services”.",
              "38": "Đoạn B: “That work was recorded”.",
              "39": "Đoạn F: “arrangement has become familiar”.",
              "40": "Đoạn G: “protection from messages”."
            }
          }
        ],
        "vocab": [
          {
            "word": "pressure",
            "ipa": "/ˈpreʃə/",
            "pos": "n.",
            "vi": "áp suất; áp lực",
            "band": "7.0",
            "example": "Anonymous feedback alone may not resolve that pressure.",
            "id": "pressure",
            "topic": "work"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "A calendar with fewer workdays can therefore represent a useful choice without providing evidence about the effects of genuinely shorter hours.",
            "id": "evidence",
            "topic": "work"
          },
          {
            "word": "transition",
            "ipa": "/trænˈzɪʃən/",
            "pos": "n.",
            "vi": "sự chuyển đổi",
            "band": "7.0",
            "example": "A useful assessment records both the transition and a later period when the arrangement has become familiar.",
            "id": "transition",
            "topic": "work"
          },
          {
            "word": "evaluation",
            "ipa": "/ɪˌvæljuˈeɪʃən/",
            "pos": "n.",
            "vi": "sự đánh giá",
            "band": "7.0",
            "example": "An evaluation should specify what a measure misses, and combine several indicators where necessary.",
            "id": "evaluation",
            "topic": "work"
          },
          {
            "word": "interpretation",
            "ipa": "/ɪnˌtɜːprɪˈteɪʃən/",
            "pos": "n.",
            "vi": "sự diễn giải",
            "band": "7.0",
            "example": "Distinguishing the two arrangements protects both employees and the interpretation of results.",
            "id": "interpretation",
            "topic": "work"
          },
          {
            "word": "distribution",
            "ipa": "/ˌdɪstrɪˈbjuːʃən/",
            "pos": "n.",
            "vi": "sự phân bố",
            "band": "7.0",
            "example": "They examined deadlines, revisions and the distribution of urgent tasks.",
            "id": "distribution",
            "topic": "work"
          },
          {
            "word": "consequence",
            "ipa": "/ˈkɒnsɪkwəns/",
            "pos": "n.",
            "vi": "hệ quả",
            "band": "7.0",
            "example": "These arrangements produce different consequences, yet public discussion often treats them as a single policy.",
            "id": "consequence",
            "topic": "work"
          },
          {
            "word": "indicator",
            "ipa": "/ˈɪndɪkeɪtə/",
            "pos": "n.",
            "vi": "chỉ số",
            "band": "7.0",
            "example": "An evaluation should specify what a measure misses, and combine several indicators where necessary.",
            "id": "indicator",
            "topic": "work"
          },
          {
            "word": "coordination",
            "ipa": "/kəʊˌɔːdɪˈneɪʃən/",
            "pos": "n.",
            "vi": "sự phối hợp",
            "band": "7.0",
            "example": "No single figure is likely to capture every consequence of a change that alters coordination, personal routines and the timing of demand.",
            "id": "coordination",
            "topic": "work"
          },
          {
            "word": "productivity",
            "ipa": "/ˌprɒdʌkˈtɪvəti/",
            "pos": "n.",
            "vi": "năng suất",
            "band": "7.0",
            "example": "Before examining productivity, an evaluator needs to know what happened to contracted hours, pay and access to services.",
            "id": "productivity",
            "topic": "work"
          },
          {
            "word": "continuity",
            "ipa": "/ˌkɒntɪˈnjuːəti/",
            "pos": "n.",
            "vi": "tính liên tục",
            "band": "7.0",
            "example": "It investigated how continuity was achieved and whether employees acquired additional responsibilities when covering for absent colleagues.",
            "id": "continuity",
            "topic": "work"
          },
          {
            "word": "contracted",
            "ipa": "/kənˈtræktɪd/",
            "pos": "adj.",
            "vi": "theo hợp đồng",
            "band": "7.0",
            "example": "Before examining productivity, an evaluator needs to know what happened to contracted hours, pay and access to services.",
            "id": "contracted",
            "topic": "work"
          },
          {
            "word": "compressed",
            "ipa": "/kəmˈprest/",
            "pos": "adj.",
            "vi": "được nén; rút gọn",
            "band": "7.0",
            "example": "The imaginary manufacturer Caster Works kept total weekly hours unchanged but compressed them into four longer shifts.",
            "id": "compressed",
            "topic": "work"
          },
          {
            "word": "interruption",
            "ipa": "/ˌɪntəˈrʌpʃən/",
            "pos": "n.",
            "vi": "sự gián đoạn",
            "band": "7.0",
            "example": "Staff reported fewer interruptions, but managers did not assume that every saved meeting hour became productive design time.",
            "id": "interruption",
            "topic": "work"
          }
        ]
      }
    ]
  },
  {
    "id": "R7",
    "title": "Practice Test 7 — Mars, Inquiry & Learning",
    "source": "Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật",
    "passages": [
      {
        "id": "R7-P1",
        "part": 1,
        "title": "Reading the Landscape of Mars",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Mars — the fourth planet from the Sun — is a dusty, cold, desert world with a very thin atmosphere. This dynamic planet has seasons, polar ice caps, extinct volcanoes, canyons, and weather. Mars is one of the most explored bodies in our solar system, and it's the only planet where we've sent rovers to roam the alien landscape. NASA missions have found lots of evidence that Mars was much wetter and warmer, with a thicker atmosphere, billions of years ago. Mars was named by the ancient Romans for their god of war because its reddish color was reminiscent of blood."
          },
          {
            "label": "B",
            "text": "Other civilizations also named the planet for this attribute — for example, the Egyptians called it \"Her Desher,\" meaning \"the red one.\" Even today, it is frequently called the \"Red Planet\" because iron minerals in the Martian dirt oxidize, or rust, causing the surface to look red. Scientists don't expect to find living things currently thriving on Mars. Instead, they're looking for signs of life that existed long ago, when Mars was warmer and covered with water. With a radius of 2,106 miles (3,390 kilometers), Mars is about half the size of Earth."
          },
          {
            "label": "C",
            "text": "If Earth were the size of a nickel, Mars would be about as big as a raspberry. From an average distance of 142 million miles (228 million kilometers), Mars is 1.5 astronomical units away from the Sun. One astronomical unit (abbreviated as AU), is the distance from the Sun to Earth. From this distance, it takes sunlight 13 minutes to travel from the Sun to Mars. As Mars orbits the Sun, it completes one rotation every 24.6 hours, which is very similar to one day on Earth (23.9 hours)."
          },
          {
            "label": "D",
            "text": "Martian days are called sols — short for \"solar day.\" A year on Mars lasts 669.6 sols, which is the same as 687 Earth days. Mars' axis of rotation is tilted 25 degrees with respect to the plane of its orbit around the Sun. This is another similarity with Earth, which has an axial tilt of 23.4 degrees. Like Earth, Mars has distinct seasons, but they last longer than seasons here on Earth since Mars takes longer to orbit the Sun (because it's farther away). And while here on Earth the seasons are evenly spread over the year, lasting 3 months (or one quarter of a year), on Mars the seasons vary in length because of Mars' elliptical, egg-shaped orbit around the Sun."
          },
          {
            "label": "E",
            "text": "Spring in the northern hemisphere (autumn in the southern) is the longest season at 194 sols. Autumn in the northern hemisphere (spring in the southern) is the shortest at 142 days. Northern winter/southern summer is 154 sols, and northern summer/southern winter is 178 sols. Mars has two small moons, Phobos and Deimos , that may be captured asteroids. They're potato-shaped because they have too little mass for gravity to make them spherical. Phobos, the innermost and larger moon, is heavily cratered, with deep grooves on its surface."
          },
          {
            "label": "F",
            "text": "It is slowly moving towards Mars and will crash into the planet or break apart in about 50 million years. Deimos is about half as big as Phobos and orbits two and a half times farther away from Mars. Oddly-shaped Deimos is covered in loose dirt that often fills the craters on its surface, making it appear smoother than pockmarked Phobos. Mars has no rings. However, in 50 million years when Phobos crashes into Mars or breaks apart, it could create a dusty ring around the Red Planet."
          },
          {
            "label": "G",
            "text": "When the solar system settled into its current layout about 4.5 billion years ago, Mars formed when gravity pulled swirling gas and dust in to become the fourth planet from the Sun. Mars is about half the size of Earth, and like its fellow terrestrial planets, it has a central core, a rocky mantle, and a solid crust. Mars has a dense core at its center between 930 and 1,300 miles (1,500 to 2,100 kilometers) in radius. It's made of iron, nickel, and sulfur. Surrounding the core is a rocky mantle between 770 and 1,170 miles (1,240 to 1,880 kilometers) thick, and above that, a crust made of iron, magnesium, aluminum, calcium, and potassium."
          },
          {
            "label": "H",
            "text": "This crust is between 6 and 30 miles (10 to 50 kilometers) deep. The Red Planet is actually many colors. At the surface, we see colors such as brown, gold, and tan. The reason Mars looks reddish is due to oxidization — or rusting — of iron in the rocks, regolith (Martian “soil”), and dust of Mars. This dust gets kicked up into the atmosphere and from a distance makes the planet appear mostly red. Interestingly, while Mars is about half the diameter of Earth, its surface has nearly the same area as Earth’s dry land."
          }
        ],
        "provenance": {
          "kind": "public-information-excerpt",
          "publisher": "NASA Science",
          "url": "https://science.nasa.gov/mars/facts/",
          "rightsUrl": "https://www.nasa.gov/nasa-brand-center/images-and-media/",
          "note": "Trích tuyển văn bản giáo dục NASA Science; chia lại đoạn A–H để luyện đọc. Câu hỏi và lời giải do app biên soạn. Không ngụ ý NASA bảo trợ."
        },
        "intro": "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        "groups": [
          {
            "type": "tfng",
            "kind": "tfng",
            "variant": "tfng",
            "range": [
              1,
              5
            ],
            "instruction": "Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 1,
                "text": "Mars has a thick atmosphere today.",
                "answer": "FALSE",
                "explain": "Đoạn A: “a very thin atmosphere”."
              },
              {
                "n": 2,
                "text": "Evidence suggests ancient Mars was wetter than it is today.",
                "answer": "TRUE",
                "explain": "Đoạn A: “much wetter and warmer”."
              },
              {
                "n": 3,
                "text": "The planet’s reddish appearance is connected with iron.",
                "answer": "TRUE",
                "explain": "Đoạn B: “iron minerals in the Martian dirt oxidize”."
              },
              {
                "n": 4,
                "text": "Mars has four moons.",
                "answer": "FALSE",
                "explain": "Đoạn E: “Mars has two small moons”."
              },
              {
                "n": 5,
                "text": "Exactly five rovers are currently operating on Mars.",
                "answer": "NOT GIVEN",
                "explain": "Bài nhắc rovers nhưng không cho biết tổng số rover đang hoạt động."
              }
            ]
          },
          {
            "type": "note",
            "kind": "gap",
            "range": [
              6,
              9
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Time and moons",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Sunlight reaches Mars after {{6}} minutes.</p><p>The term for Martian days is {{7}}.</p><p>Seasons vary in length because the orbit is {{8}}.</p><p>The moon with the smoother appearance is {{9}}.</p>",
            "answers": {
              "6": [
                "13"
              ],
              "7": [
                "sols"
              ],
              "8": [
                "elliptical"
              ],
              "9": [
                "Deimos"
              ]
            },
            "explain": {
              "6": "Đoạn C: “takes sunlight 13 minutes”.",
              "7": "Đoạn D: “Martian days are called sols”.",
              "8": "Đoạn D: “elliptical, egg-shaped orbit”.",
              "9": "Đoạn F: “Deimos is covered in loose dirt”."
            }
          },
          {
            "type": "short",
            "kind": "gap",
            "range": [
              10,
              13
            ],
            "instruction": "Complete the answers. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Which moon is gradually approaching Mars? {{10}}</p><p>What could form if the inner moon breaks apart? {{11}}</p><p>Which material surrounds the core? {{12}}</p><p>What is the Martian soil called in the passage? {{13}}</p>",
            "answers": {
              "10": [
                "Phobos"
              ],
              "11": [
                "dusty ring"
              ],
              "12": [
                "rocky mantle"
              ],
              "13": [
                "regolith"
              ]
            },
            "explain": {
              "10": "Đoạn E: “Phobos, the innermost”.",
              "11": "Đoạn F: “create a dusty ring”.",
              "12": "Đoạn G: “a rocky mantle”.",
              "13": "Đoạn H: “regolith (Martian”."
            }
          }
        ],
        "vocab": [
          {
            "word": "planet",
            "ipa": "/ˈplænɪt/",
            "pos": "n.",
            "vi": "hành tinh",
            "band": "7.0",
            "example": "Mars — the fourth planet from the Sun — is a dusty, cold, desert world with a very thin atmosphere.",
            "id": "planet",
            "topic": "science"
          },
          {
            "word": "solar",
            "ipa": "/ˈsəʊlə/",
            "pos": "adj.",
            "vi": "thuộc Mặt Trời",
            "band": "7.0",
            "example": "Mars is one of the most explored bodies in our solar system, and it's the only planet where we've sent rovers to roam the alien landscape.",
            "id": "solar",
            "topic": "science"
          },
          {
            "word": "surface",
            "ipa": "/ˈsɜːfɪs/",
            "pos": "n.",
            "vi": "bề mặt",
            "band": "7.0",
            "example": "Other civilizations also named the planet for this attribute — for example, the Egyptians called it \"Her Desher,\" meaning \"the red one.\" Even today, it is frequently called the \"Red Planet\" because iron minerals in the Martian dirt oxidize, or rust, causing the surface to look red.",
            "id": "surface",
            "topic": "science"
          },
          {
            "word": "atmosphere",
            "ipa": "/ˈætməsfɪə/",
            "pos": "n.",
            "vi": "khí quyển",
            "band": "7.0",
            "example": "Mars — the fourth planet from the Sun — is a dusty, cold, desert world with a very thin atmosphere.",
            "id": "atmosphere",
            "topic": "science"
          },
          {
            "word": "orbit",
            "ipa": "/ˈɔːbɪt/",
            "pos": "n./v.",
            "vi": "quỹ đạo; quay quanh",
            "band": "7.0",
            "example": "As Mars orbits the Sun, it completes one rotation every 24.6 hours, which is very similar to one day on Earth (23.9 hours).",
            "id": "orbit",
            "topic": "science"
          },
          {
            "word": "rotation",
            "ipa": "/rəʊˈteɪʃən/",
            "pos": "n.",
            "vi": "sự tự quay",
            "band": "7.0",
            "example": "As Mars orbits the Sun, it completes one rotation every 24.6 hours, which is very similar to one day on Earth (23.9 hours).",
            "id": "rotation",
            "topic": "science"
          },
          {
            "word": "axis",
            "ipa": "/ˈæksɪs/",
            "pos": "n.",
            "vi": "trục",
            "band": "7.0",
            "example": "Mars' axis of rotation is tilted 25 degrees with respect to the plane of its orbit around the Sun.",
            "id": "axis",
            "topic": "science"
          },
          {
            "word": "core",
            "ipa": "/kɔː/",
            "pos": "n.",
            "vi": "lõi",
            "band": "7.0",
            "example": "Mars is about half the size of Earth, and like its fellow terrestrial planets, it has a central core, a rocky mantle, and a solid crust.",
            "id": "core",
            "topic": "science"
          },
          {
            "word": "mantle",
            "ipa": "/ˈmæntəl/",
            "pos": "n.",
            "vi": "lớp phủ bên dưới vỏ",
            "band": "7.0",
            "example": "Mars is about half the size of Earth, and like its fellow terrestrial planets, it has a central core, a rocky mantle, and a solid crust.",
            "id": "mantle",
            "topic": "science"
          },
          {
            "word": "crust",
            "ipa": "/krʌst/",
            "pos": "n.",
            "vi": "lớp vỏ",
            "band": "7.0",
            "example": "Mars is about half the size of Earth, and like its fellow terrestrial planets, it has a central core, a rocky mantle, and a solid crust.",
            "id": "crust",
            "topic": "science"
          },
          {
            "word": "gravity",
            "ipa": "/ˈɡrævəti/",
            "pos": "n.",
            "vi": "lực hấp dẫn",
            "band": "7.0",
            "example": "They're potato-shaped because they have too little mass for gravity to make them spherical.",
            "id": "gravity",
            "topic": "science"
          },
          {
            "word": "radius",
            "ipa": "/ˈreɪdiəs/",
            "pos": "n.",
            "vi": "bán kính",
            "band": "7.0",
            "example": "With a radius of 2,106 miles (3,390 kilometers), Mars is about half the size of Earth.",
            "id": "radius",
            "topic": "science"
          },
          {
            "word": "dense",
            "ipa": "/dens/",
            "pos": "adj.",
            "vi": "dày đặc",
            "band": "7.0",
            "example": "Mars has a dense core at its center between 930 and 1,300 miles (1,500 to 2,100 kilometers) in radius.",
            "id": "dense",
            "topic": "science"
          },
          {
            "word": "crater",
            "ipa": "/ˈkreɪtə/",
            "pos": "n.",
            "vi": "hố va chạm",
            "band": "7.0",
            "example": "Phobos, the innermost and larger moon, is heavily cratered, with deep grooves on its surface.",
            "id": "crater",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R7-P2",
        "part": 2,
        "title": "From Doubt to Inquiry",
        "topic": "education",
        "paragraphs": [
          {
            "label": "A",
            "text": "So much for the description of the more external and obvious aspects of the fact called thinking . Further consideration at once reveals certain subprocesses which are involved in every reflective operation. These are: ( a ) a state of perplexity, hesitation, doubt; and ( b ) an act of search or investigation directed toward bringing to light further facts which serve to corroborate or to nullify the suggested belief. ( a ) In our illustration, the shock of coolness generated confusion and suspended belief, at least momentarily."
          },
          {
            "label": "B",
            "text": "Because it was unexpected, it was a shock or an interruption needing to be accounted for, identified, or placed. To say that the abrupt occurrence of the change of temperature constitutes a problem may sound forced and artificial; but if we are willing to extend the meaning of the word problem to whatever—no matter how slight and commonplace in character—perplexes and challenges the mind so that it makes belief at all uncertain, there is a genuine problem or question involved in this experience of sudden change. ( b ) The turning of the head, the lifting of the eyes, the scanning of the heavens, are activities adapted to bring to recognition facts that will answer the question presented by the sudden coolness."
          },
          {
            "label": "C",
            "text": "The facts as they first presented themselves were perplexing; they suggested, however, clouds. The act of looking was an act to discover if this suggested explanation held good. It may again seem forced to speak of this looking, almost automatic, as an act of research or inquiry. But once more, if we are willing to generalize our conceptions of our mental operations to include the trivial and ordinary as well as the technical and recondite, there is no good reason for refusing to give such a title to the act of looking."
          },
          {
            "label": "D",
            "text": "The purport of this act of inquiry is to confirm or to refute the suggested belief. New facts are brought to perception, which either corroborate the idea that a change of weather is imminent, or negate it. Another instance, commonplace also, yet not quite so trivial, may enforce this lesson. A man traveling in an unfamiliar region comes to a branching of the roads. Having no sure knowledge to fall back upon, he is brought to a standstill of hesitation and suspense. Which road is right? And how shall perplexity be resolved?"
          },
          {
            "label": "E",
            "text": "There are but two alternatives: he must either blindly and arbitrarily take his course, trusting to luck for the outcome, or he must discover grounds for the conclusion that a given road is right. Any attempt to decide the matter by thinking will involve inquiry into other facts, whether brought out by memory or by further observation, or by both. The perplexed wayfarer must carefully scrutinize what is before him and he must cudgel his memory. He looks for evidence that will support belief in favor of either of the roads—for evidence that will weight down one suggestion."
          },
          {
            "label": "F",
            "text": "He may climb a tree; he may go first in this direction, then in that, looking, in either case, for signs, clues, indications. He wants something in the nature of a signboard or a map, and his reflection is aimed at the discovery of facts that will serve this purpose . The above illustration may be generalized. Thinking begins in what may fairly enough be called a forked-road situation, a situation which is ambiguous, which presents a dilemma, which proposes alternatives. As long as our activity glides smoothly along from one thing to another, or as long as we permit our imagination to entertain fancies at pleasure, there is no call for reflection."
          },
          {
            "label": "G",
            "text": "Difficulty or obstruction in the way of reaching a belief brings us, however, to a pause. In the suspense of uncertainty, we metaphorically climb a tree; we try to find some standpoint from which we may survey additional facts and, getting a more commanding view of the situation, may decide how the facts stand related to one another. Demand for the solution of a perplexity is the steadying and guiding factor in the entire process of reflection. Where there is no question of a problem to be solved or a difficulty to be surmounted, the course of suggestions flows on at random; we have the first type of thought described."
          },
          {
            "label": "H",
            "text": "If the stream of suggestions is controlled simply by their emotional congruity, their fitting agreeably into a single picture or story, we have the second type. But a question to be answered, an ambiguity to be resolved, sets up an end and holds the current of ideas to a definite channel. Every suggested conclusion is tested by its reference to this regulating end, by its pertinence to the problem in hand. This need of straightening out a perplexity also controls the kind of inquiry undertaken."
          }
        ],
        "provenance": {
          "kind": "public-domain-excerpt",
          "publisher": "John Dewey — How We Think (1910)",
          "url": "https://www.gutenberg.org/cache/epub/37423/pg37423-images.html",
          "rightsUrl": "https://www.gutenberg.org/policy/license.html",
          "note": "Trích văn bản lịch sử thuộc phạm vi công cộng: John Dewey, How We Think (1910); giữ ngôn ngữ và góc nhìn thời kỳ đó, chia lại đoạn A–H. Dùng để luyện đọc hiểu, không trình bày như kiến thức khoa học hoặc quan điểm hiện hành. Câu hỏi và lời giải do app biên soạn. Nguồn số hóa có kèm giấy phép Project Gutenberg."
        },
        "intro": "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        "groups": [
          {
            "type": "headings",
            "kind": "match",
            "range": [
              14,
              17
            ],
            "instruction": "Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.",
            "allowReuse": false,
            "options": [
              {
                "key": "i",
                "text": "A lesson about map-making standards"
              },
              {
                "key": "ii",
                "text": "Two components of reflective activity"
              },
              {
                "key": "iii",
                "text": "Testing a belief and facing a choice of roads"
              },
              {
                "key": "iv",
                "text": "The emotional value of imagining a story"
              },
              {
                "key": "v",
                "text": "Everyday looking as an act of research"
              },
              {
                "key": "vi",
                "text": "An ordinary interruption becomes a problem"
              }
            ],
            "questions": [
              {
                "n": 14,
                "text": "Paragraph A",
                "answer": "ii",
                "explain": "Đoạn A: “a state of perplexity, hesitation, doubt”. Hai thành phần là nghi vấn và hoạt động tìm thêm bằng chứng."
              },
              {
                "n": 15,
                "text": "Paragraph B",
                "answer": "vi",
                "explain": "Đoạn B: “no matter how slight and commonplace”. Một thay đổi nhỏ đời thường vẫn có thể tạo ra vấn đề cần giải thích."
              },
              {
                "n": 16,
                "text": "Paragraph C",
                "answer": "v",
                "explain": "Đoạn C: “an act of research or inquiry”. Nhìn lên trời cũng là nghiên cứu nếu dùng để kiểm tra lời giải thích."
              },
              {
                "n": 17,
                "text": "Paragraph D",
                "answer": "iii",
                "explain": "Đoạn D: “a branching of the roads”. Sau mục tiêu xác nhận hoặc bác bỏ, tác giả chuyển sang ví dụ chọn đường."
              }
            ]
          },
          {
            "type": "info",
            "kind": "match",
            "range": [
              18,
              20
            ],
            "instruction": "Which paragraph contains the following information? You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Paragraph A"
              },
              {
                "key": "B",
                "text": "Paragraph B"
              },
              {
                "key": "C",
                "text": "Paragraph C"
              },
              {
                "key": "D",
                "text": "Paragraph D"
              },
              {
                "key": "E",
                "text": "Paragraph E"
              },
              {
                "key": "F",
                "text": "Paragraph F"
              },
              {
                "key": "G",
                "text": "Paragraph G"
              },
              {
                "key": "H",
                "text": "Paragraph H"
              }
            ],
            "questions": [
              {
                "n": 18,
                "text": "Two possible ways of choosing when the route is unknown",
                "answer": "E",
                "explain": "Đoạn E: “trusting to luck for the outcome”."
              },
              {
                "n": 19,
                "text": "A physical action used as a metaphor for seeking perspective",
                "answer": "G",
                "explain": "Đoạn G: “we metaphorically climb a tree”."
              },
              {
                "n": 20,
                "text": "A statement that a question directs the course of ideas",
                "answer": "H",
                "explain": "Đoạn H: “sets up an end and holds the current”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              21,
              23
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>A traveler must use observation and also consult his {{21}}.</p><p>A map or {{22}} can provide the facts the traveler needs.</p><p>The author says a {{23}} is the guiding factor in reflection.</p>",
            "answers": {
              "21": [
                "memory"
              ],
              "22": [
                "signboard"
              ],
              "23": [
                "perplexity"
              ]
            },
            "explain": {
              "21": "Đoạn E: “cudgel his memory”.",
              "22": "Đoạn F: “signboard or a map”.",
              "23": "Đoạn G: “solution of a perplexity”."
            }
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              24,
              26
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 24,
                "text": "Why does the author describe looking at the sky as inquiry?",
                "options": [
                  "A It requires expensive instruments",
                  "B It always proves a forecast correct",
                  "C It checks an explanation against observations"
                ],
                "answer": "C",
                "explain": "Đoạn C: “discover if this suggested explanation held good”."
              },
              {
                "n": 25,
                "text": "What normally calls reflection into action?",
                "options": [
                  "A An obstacle or an unresolved uncertainty",
                  "B The absence of any possible question",
                  "C An activity proceeding without difficulty"
                ],
                "answer": "A",
                "explain": "Đoạn G: “Difficulty or obstruction”."
              },
              {
                "n": 26,
                "text": "How is each suggested conclusion assessed?",
                "options": [
                  "A By how emotionally pleasing it is",
                  "B By its relevance to the problem",
                  "C By the social status of its author"
                ],
                "answer": "B",
                "explain": "Đoạn H: “pertinence to the problem in hand”."
              }
            ]
          }
        ],
        "vocab": [
          {
            "word": "temperature",
            "ipa": "/ˈtemprətʃə/",
            "pos": "n.",
            "vi": "nhiệt độ",
            "band": "7.0",
            "example": "To say that the abrupt occurrence of the change of temperature constitutes a problem may sound forced and artificial; but if we are willing to extend the meaning of the word problem to whatever—no matter how slight and commonplace in character—perplexes and challenges the mind so that it makes belief at all uncertain, there is a genuine problem or question involved in this experience of sudden change. ( b ) The turning of the head, the lifting of the eyes, the scanning of the heavens, are activities adapted to bring to recognition facts that will answer the question presented by the sudden coolness.",
            "id": "temperature",
            "topic": "education"
          },
          {
            "word": "current",
            "ipa": "/ˈkʌrənt/",
            "pos": "n.",
            "vi": "luồng chuyển động",
            "band": "7.0",
            "example": "But a question to be answered, an ambiguity to be resolved, sets up an end and holds the current of ideas to a definite channel.",
            "id": "current",
            "topic": "education"
          },
          {
            "word": "perplexity",
            "ipa": "/pəˈpleksəti/",
            "pos": "n.",
            "vi": "sự bối rối; điều khó hiểu",
            "band": "7.0",
            "example": "These are: ( a ) a state of perplexity, hesitation, doubt; and ( b ) an act of search or investigation directed toward bringing to light further facts which serve to corroborate or to nullify the suggested belief. ( a ) In our illustration, the shock of coolness generated confusion and suspended belief, at least momentarily.",
            "id": "perplexity",
            "topic": "education"
          },
          {
            "word": "inquiry",
            "ipa": "/ɪnˈkwaɪəri/",
            "pos": "n.",
            "vi": "sự tìm hiểu",
            "band": "7.0",
            "example": "It may again seem forced to speak of this looking, almost automatic, as an act of research or inquiry.",
            "id": "inquiry",
            "topic": "education"
          },
          {
            "word": "corroborate",
            "ipa": "/kəˈrɒbəreɪt/",
            "pos": "v.",
            "vi": "củng cố bằng chứng",
            "band": "7.0",
            "example": "These are: ( a ) a state of perplexity, hesitation, doubt; and ( b ) an act of search or investigation directed toward bringing to light further facts which serve to corroborate or to nullify the suggested belief. ( a ) In our illustration, the shock of coolness generated confusion and suspended belief, at least momentarily.",
            "id": "corroborate",
            "topic": "education"
          },
          {
            "word": "refute",
            "ipa": "/rɪˈfjuːt/",
            "pos": "v.",
            "vi": "bác bỏ",
            "band": "7.0",
            "example": "The purport of this act of inquiry is to confirm or to refute the suggested belief.",
            "id": "refute",
            "topic": "education"
          },
          {
            "word": "hesitation",
            "ipa": "/ˌhezɪˈteɪʃən/",
            "pos": "n.",
            "vi": "sự do dự",
            "band": "7.0",
            "example": "These are: ( a ) a state of perplexity, hesitation, doubt; and ( b ) an act of search or investigation directed toward bringing to light further facts which serve to corroborate or to nullify the suggested belief. ( a ) In our illustration, the shock of coolness generated confusion and suspended belief, at least momentarily.",
            "id": "hesitation",
            "topic": "education"
          },
          {
            "word": "belief",
            "ipa": "/bɪˈliːf/",
            "pos": "n.",
            "vi": "niềm tin",
            "band": "7.0",
            "example": "These are: ( a ) a state of perplexity, hesitation, doubt; and ( b ) an act of search or investigation directed toward bringing to light further facts which serve to corroborate or to nullify the suggested belief. ( a ) In our illustration, the shock of coolness generated confusion and suspended belief, at least momentarily.",
            "id": "belief",
            "topic": "education"
          },
          {
            "word": "suspense",
            "ipa": "/səˈspens/",
            "pos": "n.",
            "vi": "trạng thái chờ đợi chưa rõ",
            "band": "7.0",
            "example": "Having no sure knowledge to fall back upon, he is brought to a standstill of hesitation and suspense.",
            "id": "suspense",
            "topic": "education"
          },
          {
            "word": "arbitrarily",
            "ipa": "/ˈɑːbɪtrərəli/",
            "pos": "adv.",
            "vi": "một cách tùy tiện",
            "band": "7.0",
            "example": "There are but two alternatives: he must either blindly and arbitrarily take his course, trusting to luck for the outcome, or he must discover grounds for the conclusion that a given road is right.",
            "id": "arbitrarily",
            "topic": "education"
          },
          {
            "word": "scrutinize",
            "ipa": "/ˈskruːtənaɪz/",
            "pos": "v.",
            "vi": "xem xét kỹ",
            "band": "7.0",
            "example": "The perplexed wayfarer must carefully scrutinize what is before him and he must cudgel his memory.",
            "id": "scrutinize",
            "topic": "education"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "He looks for evidence that will support belief in favor of either of the roads—for evidence that will weight down one suggestion.",
            "id": "evidence",
            "topic": "education"
          },
          {
            "word": "ambiguous",
            "ipa": "/æmˈbɪɡjuəs/",
            "pos": "adj.",
            "vi": "mơ hồ",
            "band": "7.0",
            "example": "Thinking begins in what may fairly enough be called a forked-road situation, a situation which is ambiguous, which presents a dilemma, which proposes alternatives.",
            "id": "ambiguous",
            "topic": "education"
          },
          {
            "word": "dilemma",
            "ipa": "/dɪˈlemə/",
            "pos": "n.",
            "vi": "tình thế khó xử",
            "band": "7.0",
            "example": "Thinking begins in what may fairly enough be called a forked-road situation, a situation which is ambiguous, which presents a dilemma, which proposes alternatives.",
            "id": "dilemma",
            "topic": "education"
          }
        ]
      },
      {
        "id": "R7-P3",
        "title": "When Feedback Becomes Useful",
        "topic": "education",
        "paragraphs": [
          {
            "label": "A",
            "text": "Teachers can spend considerable time writing comments that students barely use. This is sometimes interpreted as a failure of motivation: the advice was available, so the learner should have acted on it. Yet information becomes feedback only through what it enables the learner to do. A detailed explanation arriving after a topic has ended may have little influence on the next decision. A brief question asked while a revision is still possible can matter more. Evaluating feedback therefore requires attention to timing, opportunity and the learner's interpretation. The number of comments is a weak substitute for understanding the actions those comments make possible."
          },
          {
            "label": "B",
            "text": "In the fictional Westmere College, students submitted a first version of an essay before receiving a grade. Tutors selected one recurring difficulty and asked for a revised paragraph that addressed it. They deliberately avoided correcting every sentence. The revision gave learners a small, achievable action and gave tutors evidence of how advice had been understood. Some students initially asked for a complete list of mistakes, believing that quantity signalled value. Over time the course explained why choosing a priority could be more useful than accumulating corrections. The exercise did not imply that other weaknesses were unimportant; it created a manageable entry point for independent improvement."
          },
          {
            "label": "C",
            "text": "Fictional Northbridge School used examples of anonymous work during a science project. Groups compared two explanations and discussed which better connected evidence to a claim. The teacher withheld the final answer until students had justified their judgments. This activity made standards visible before the next report was written. Its value lay partly in disagreement: a group had to explain why a polished sentence might still contain weak reasoning. The examples were selected to reveal a specific distinction, rather than to display an ideal response too distant from the class's current work. Comparison became a rehearsal for decisions students would later need to make alone."
          },
          {
            "label": "D",
            "text": "The imaginary adult training provider Cedar Centre faced a different problem. Learners practised customer conversations during short evening sessions, then waited a week before returning. Trainers introduced voice notes recorded immediately after a practice task. Each note referred to one moment in the conversation and suggested a different response to try next time. Learners listened before the following session and chose a personal target. The change preserved a link between advice and a remembered event. It also required a way to ask questions: a recording that cannot be discussed may leave an uncertain learner repeatedly interpreting the same phrase incorrectly."
          },
          {
            "label": "E",
            "text": "These approaches place responsibility on the design of the next task. Telling a learner to be more analytical is unlikely to help if the course offers no opportunity to practise analysis separately from other demands. A revision, a comparison or a rehearsal can turn a broad instruction into a decision. The task should be sufficiently similar for the advice to apply, yet different enough to require thought. Copying a corrected sentence demonstrates attention but may reveal little about understanding. Transfer becomes more convincing when the learner recognises a comparable problem in new material without being told exactly where it is."
          },
          {
            "label": "F",
            "text": "There are limits to personalisation. An individual comment is not automatically better than a class discussion of a common misconception. If many learners have misunderstood the same principle, repeated private explanations can consume time without improving access to the idea. Conversely, general advice may miss a difficulty rooted in one learner's interpretation. The choice should follow the problem. What matters is whether learners can connect an explanation to their own work and test that connection. The format is useful insofar as it supports this process, rather than because written, spoken or digital feedback carries an inherent educational advantage."
          },
          {
            "label": "G",
            "text": "Students also need practice in seeking clarification. Asking what a comment means can feel like admitting failure, especially in settings where polished performance receives more recognition than revision. Teachers can reduce this barrier by making questions about feedback an expected part of the routine. They can also ask students to describe the change they intend to make before beginning it. Such conversations reveal misunderstandings while they are still inexpensive to correct. However, requiring elaborate accounts of every edit can create a new administrative burden. The aim is a productive exchange, not a second assessment concerned mainly with proving that the first was read."
          },
          {
            "label": "H",
            "text": "A useful evaluation consequently follows advice beyond its delivery. Did the learner have time to act? Was the proposed action understood? Did the next attempt display a change that could be explained and repeated? These questions may expose a weakness in an apparently generous feedback system. They may also reveal why a modest intervention succeeds. Educational improvement depends on the relationship between information and subsequent activity, rather than on the visible volume of commentary. The most important document may be the learner's next attempt, because it shows whether advice has become a resource for making decisions instead of a record of what went wrong."
          }
        ],
        "part": 3,
        "provenance": {
          "kind": "original",
          "note": "Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức."
        },
        "intro": "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        "groups": [
          {
            "type": "features",
            "kind": "match",
            "range": [
              27,
              29
            ],
            "instruction": "Match each statement with the correct illustrative case. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Westmere College"
              },
              {
                "key": "B",
                "text": "Northbridge School"
              },
              {
                "key": "C",
                "text": "Cedar Centre"
              }
            ],
            "questions": [
              {
                "n": 27,
                "text": "Students compared anonymous examples before producing the next report.",
                "answer": "B",
                "explain": "Đoạn C: “examples of anonymous work”."
              },
              {
                "n": 28,
                "text": "Learners received recordings tied to a specific moment in a task.",
                "answer": "C",
                "explain": "Đoạn D: “voice notes recorded immediately”."
              },
              {
                "n": 29,
                "text": "Tutors requested a revised paragraph addressing one main difficulty.",
                "answer": "A",
                "explain": "Đoạn B: “asked for a revised paragraph”."
              }
            ]
          },
          {
            "type": "ynng",
            "kind": "tfng",
            "variant": "ynng",
            "range": [
              30,
              33
            ],
            "instruction": "Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 30,
                "text": "The volume of comments is a reliable measure of their usefulness.",
                "answer": "NO",
                "explain": "Đoạn A: “number of comments is a weak substitute”."
              },
              {
                "n": 31,
                "text": "Students need an opportunity to practise the action recommended.",
                "answer": "YES",
                "explain": "Đoạn E: “no opportunity to practise analysis”."
              },
              {
                "n": 32,
                "text": "Written feedback is inherently more effective than spoken feedback.",
                "answer": "NO",
                "explain": "Đoạn F: “rather than because written, spoken or digital feedback”."
              },
              {
                "n": 33,
                "text": "Most teachers prefer anonymous examples to individual comments.",
                "answer": "NOT GIVEN",
                "explain": "Bài không nêu sở thích của đa số giáo viên."
              }
            ]
          },
          {
            "type": "endings",
            "kind": "match",
            "range": [
              34,
              36
            ],
            "instruction": "Complete each sentence with the correct ending, A–F.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "can become an additional administrative burden."
              },
              {
                "key": "B",
                "text": "may reveal attention without demonstrating understanding."
              },
              {
                "key": "C",
                "text": "demonstrates transfer as soon as a correction is copied."
              },
              {
                "key": "D",
                "text": "can sometimes be addressed through a class discussion."
              },
              {
                "key": "E",
                "text": "guarantees that written advice has been understood."
              },
              {
                "key": "F",
                "text": "requires the tutor to mark every sentence individually."
              }
            ],
            "questions": [
              {
                "n": 34,
                "text": "Copying a corrected sentence",
                "answer": "B",
                "explain": "Đoạn E: “may reveal little about understanding”."
              },
              {
                "n": 35,
                "text": "A common misconception",
                "answer": "D",
                "explain": "Đoạn F: “class discussion of a common misconception”."
              },
              {
                "n": 36,
                "text": "An elaborate account of every edit",
                "answer": "A",
                "explain": "Đoạn G: “new administrative burden”."
              }
            ]
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              37,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Feedback may be ineffective if it arrives after a {{37}} has ended.</p><p>A new task should require thought rather than simple {{38}}.</p><p>Learners should be encouraged to seek {{39}}.</p><p>The most revealing evidence may be the learner’s next {{40}}.</p>",
            "answers": {
              "37": [
                "topic"
              ],
              "38": [
                "Copying",
                "copying"
              ],
              "39": [
                "clarification"
              ],
              "40": [
                "attempt"
              ]
            },
            "explain": {
              "37": "Đoạn A: “after a topic has ended”.",
              "38": "Đoạn E: “Copying a corrected sentence”.",
              "39": "Đoạn G: “seeking clarification”.",
              "40": "Đoạn H: “learner's next attempt”."
            }
          }
        ],
        "vocab": [
          {
            "word": "current",
            "ipa": "/ˈkʌrənt/",
            "pos": "n.",
            "vi": "luồng chuyển động",
            "band": "7.0",
            "example": "The examples were selected to reveal a specific distinction, rather than to display an ideal response too distant from the class's current work.",
            "id": "current",
            "topic": "education"
          },
          {
            "word": "principle",
            "ipa": "/ˈprɪnsəpəl/",
            "pos": "n.",
            "vi": "nguyên tắc",
            "band": "7.0",
            "example": "If many learners have misunderstood the same principle, repeated private explanations can consume time without improving access to the idea.",
            "id": "principle",
            "topic": "education"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "The revision gave learners a small, achievable action and gave tutors evidence of how advice had been understood.",
            "id": "evidence",
            "topic": "education"
          },
          {
            "word": "deliberately",
            "ipa": "/dɪˈlɪbərətli/",
            "pos": "adv.",
            "vi": "có chủ ý; cẩn trọng",
            "band": "7.0",
            "example": "They deliberately avoided correcting every sentence.",
            "id": "deliberately",
            "topic": "education"
          },
          {
            "word": "subsequent",
            "ipa": "/ˈsʌbsɪkwənt/",
            "pos": "adj.",
            "vi": "sau đó",
            "band": "7.0",
            "example": "Educational improvement depends on the relationship between information and subsequent activity, rather than on the visible volume of commentary.",
            "id": "subsequent",
            "topic": "education"
          },
          {
            "word": "evaluation",
            "ipa": "/ɪˌvæljuˈeɪʃən/",
            "pos": "n.",
            "vi": "sự đánh giá",
            "band": "7.0",
            "example": "A useful evaluation consequently follows advice beyond its delivery.",
            "id": "evaluation",
            "topic": "education"
          },
          {
            "word": "interpretation",
            "ipa": "/ɪnˌtɜːprɪˈteɪʃən/",
            "pos": "n.",
            "vi": "sự diễn giải",
            "band": "7.0",
            "example": "Evaluating feedback therefore requires attention to timing, opportunity and the learner's interpretation.",
            "id": "interpretation",
            "topic": "education"
          },
          {
            "word": "resource",
            "ipa": "/rɪˈsɔːs/",
            "pos": "n.",
            "vi": "nguồn lực",
            "band": "7.0",
            "example": "The most important document may be the learner's next attempt, because it shows whether advice has become a resource for making decisions instead of a record of what went wrong.",
            "id": "resource",
            "topic": "education"
          },
          {
            "word": "revision",
            "ipa": "/rɪˈvɪʒən/",
            "pos": "n.",
            "vi": "sự chỉnh sửa",
            "band": "7.0",
            "example": "A brief question asked while a revision is still possible can matter more.",
            "id": "revision",
            "topic": "education"
          },
          {
            "word": "clarification",
            "ipa": "/ˌklærɪfɪˈkeɪʃən/",
            "pos": "n.",
            "vi": "sự làm rõ",
            "band": "7.0",
            "example": "Students also need practice in seeking clarification.",
            "id": "clarification",
            "topic": "education"
          },
          {
            "word": "independent",
            "ipa": "/ˌɪndɪˈpendənt/",
            "pos": "adj.",
            "vi": "độc lập",
            "band": "7.0",
            "example": "The exercise did not imply that other weaknesses were unimportant; it created a manageable entry point for independent improvement.",
            "id": "independent",
            "topic": "education"
          },
          {
            "word": "substitute",
            "ipa": "/ˈsʌbstɪtjuːt/",
            "pos": "n.",
            "vi": "vật thay thế",
            "band": "7.0",
            "example": "The number of comments is a weak substitute for understanding the actions those comments make possible.",
            "id": "substitute",
            "topic": "education"
          },
          {
            "id": "preserve",
            "word": "preserve",
            "ipa": "/prɪˈzɜːv/",
            "pos": "v.",
            "band": "6.5",
            "vi": "bảo tồn, gìn giữ",
            "example": "The change preserved a link between advice and a remembered event.",
            "topic": "education"
          },
          {
            "id": "considerable",
            "word": "considerable",
            "ipa": "/kənˈsɪdərəbl/",
            "pos": "adj.",
            "band": "6.5",
            "vi": "đáng kể, lớn",
            "example": "Teachers can spend considerable time writing comments that students barely use.",
            "topic": "education"
          }
        ]
      }
    ]
  },
  {
    "id": "R8",
    "title": "Practice Test 8 — Jupiter, Glaciers & Museum Copies",
    "source": "Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật",
    "passages": [
      {
        "id": "R8-P1",
        "part": 1,
        "title": "Inside a Gas Giant",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Jupiter is a world of extremes. It's the largest planet in our solar system – if it were a hollow shell, 1,000 Earths could fit inside. It's also the oldest planet, forming from the dust and gases left over from the Sun's formation 4.6 billion years ago. But it has the shortest day in the solar system, taking about 9.9 hours to spin around once on its axis. Jupiter's signature stripes and swirls are actually cold, windy clouds of ammonia and water, floating in an atmosphere of hydrogen and helium."
          },
          {
            "label": "B",
            "text": "The dark orange stripes are called belts, while the lighter bands are called zones, and they flow east and west in opposite directions. Jupiter’s iconic Great Red Spot is a giant storm bigger than Earth that has raged for hundreds of years. The king of planets was named for Jupiter, king of the gods in Roman mythology. Most of its moons are also named for mythological characters, figures associated with Jupiter or his Greek counterpart, Zeus. Jupiter’s environment is probably not conducive to life as we know it. The temperatures, pressures, and materials that characterize this planet are most likely too extreme and volatile for organisms to adapt to."
          },
          {
            "label": "C",
            "text": "While planet Jupiter is an unlikely place for living things to take hold, the same is not true of some of its many moons. Europa is one of the likeliest places to find life elsewhere in our solar system. There is evidence of a vast ocean just beneath its icy crust, where life could possibly be supported. With a radius of 43,440.7 miles (69,911 kilometers), Jupiter is 11 times wider than Earth. If Earth were the size of a grape, Jupiter would be about as big as a basketball."
          },
          {
            "label": "D",
            "text": "From an average distance of 484 million miles (778 million kilometers), Jupiter is 5.2 astronomical units away from the Sun. One astronomical unit (abbreviated as AU), is the distance from the Sun to Earth. From this distance, it takes sunlight 43 minutes to travel from the Sun to Jupiter. Jupiter has the shortest day in the solar system. One day on Jupiter takes 9.9 hours (the time it takes for Jupiter to rotate or spin around once), and Jupiter makes a complete orbit around the Sun (a year in Jovian time) in about 12 Earth years (4,333 Earth days)."
          },
          {
            "label": "E",
            "text": "Its equator is tilted with respect to its orbital path around the Sun by just 3 degrees. This means Jupiter spins nearly upright and does not have seasons as extreme as other planets do. Jupiter has 115 moons that are officially recognized by the International Astronomical Union. The four largest moons – Io, Europa, Ganymede, and Callisto – were first observed by the astronomer Galileo Galilei in 1610 using an early version of the telescope. These four moons are known today as the Galilean satellites, and they're some of the most fascinating destinations in our solar system."
          },
          {
            "label": "F",
            "text": "Io is the most volcanically active body in the solar system. Ganymede is the largest moon in the solar system (even bigger than the planet Mercury). Callisto’s very few small craters indicate a small degree of current surface activity. A liquid-water ocean with the ingredients for life may lie beneath the frozen crust of Europa, the target of NASA's Europa Clipper mission that launched Oct. 14, 2024. Discovered in 1979 by NASA's Voyager 1 spacecraft, Jupiter's rings were a surprise. The rings are composed of small, dark particles, and they are difficult to see except when backlit by the Sun."
          },
          {
            "label": "G",
            "text": "Data from the Galileo spacecraft indicate that Jupiter's ring system may be formed by dust kicked up as interplanetary meteoroids smash into the giant planet's small innermost moons. Jupiter took shape along with rest of the solar system about 4.6 billion years ago. Gravity pulled swirling gas and dust together to form this gas giant. Jupiter took most of the mass left over after the formation of the Sun, ending up with more than twice the combined material of the other bodies in the solar system. In fact, Jupiter has the same ingredients as a star, but it did not grow massive enough to ignite."
          },
          {
            "label": "H",
            "text": "About 4 billion years ago, Jupiter settled into its current position in the outer solar system, where it is the fifth planet from the Sun. The composition of Jupiter is similar to that of the Sun – mostly hydrogen and helium. Deep in the atmosphere, pressure and temperature increase, compressing the hydrogen gas into a liquid. This gives Jupiter the largest ocean in the solar system – an ocean made of hydrogen instead of water. Scientists think that, at depths perhaps halfway to the planet's center, the pressure becomes so great that electrons are squeezed off the hydrogen atoms, making the liquid electrically conducting like metal."
          }
        ],
        "provenance": {
          "kind": "public-information-excerpt",
          "publisher": "NASA Science",
          "url": "https://science.nasa.gov/jupiter/facts/",
          "rightsUrl": "https://www.nasa.gov/nasa-brand-center/images-and-media/",
          "note": "Trích tuyển văn bản giáo dục NASA Science; chia lại đoạn A–H để luyện đọc. Câu hỏi và lời giải do app biên soạn. Không ngụ ý NASA bảo trợ."
        },
        "intro": "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        "groups": [
          {
            "type": "tfng",
            "kind": "tfng",
            "variant": "tfng",
            "range": [
              1,
              5
            ],
            "instruction": "Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 1,
                "text": "Jupiter takes longer than every other planet to rotate.",
                "answer": "FALSE",
                "explain": "Đoạn A: “shortest day in the solar system”."
              },
              {
                "n": 2,
                "text": "The Great Red Spot is a storm.",
                "answer": "TRUE",
                "explain": "Đoạn B: “a giant storm bigger than Earth”."
              },
              {
                "n": 3,
                "text": "All of Jupiter’s moons were discovered in 1610.",
                "answer": "FALSE",
                "explain": "Đoạn E: “The four largest moons”."
              },
              {
                "n": 4,
                "text": "The rings were an unexpected discovery.",
                "answer": "TRUE",
                "explain": "Đoạn F: “rings were a surprise”."
              },
              {
                "n": 5,
                "text": "Galileo cost more than any earlier spacecraft sent to Jupiter.",
                "answer": "NOT GIVEN",
                "explain": "Không nêu hoặc so sánh chi phí tàu Galileo."
              }
            ]
          },
          {
            "type": "note",
            "kind": "gap",
            "range": [
              6,
              9
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Clouds and satellites",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Dark stripes are known as {{6}}.</p><p>The light bands are known as {{7}}.</p><p>The moon with the greatest volcanic activity is {{8}}.</p><p>The largest moon is {{9}}.</p>",
            "answers": {
              "6": [
                "belts"
              ],
              "7": [
                "zones"
              ],
              "8": [
                "Io"
              ],
              "9": [
                "Ganymede"
              ]
            },
            "explain": {
              "6": "Đoạn B: “stripes are called belts”.",
              "7": "Đoạn B: “lighter bands are called zones”.",
              "8": "Đoạn F: “Io is the most volcanically active”.",
              "9": "Đoạn F: “Ganymede is the largest moon”."
            }
          },
          {
            "type": "short",
            "kind": "gap",
            "range": [
              10,
              13
            ],
            "instruction": "Complete the answers. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>What is the main liquid in Jupiter’s deep ocean? {{10}}</p><p>Which moon is the destination of Europa Clipper? {{11}}</p><p>What pushes electrons off hydrogen atoms at great depth? {{12}}</p><p>How many Earth years does one orbit take, approximately? {{13}}</p>",
            "answers": {
              "10": [
                "hydrogen"
              ],
              "11": [
                "Europa"
              ],
              "12": [
                "pressure"
              ],
              "13": [
                "12",
                "twelve"
              ]
            },
            "explain": {
              "10": "Đoạn H: “hydrogen instead of water”.",
              "11": "Đoạn F: “frozen crust of Europa”.",
              "12": "Đoạn H: “the pressure becomes so great”.",
              "13": "Đoạn D: “about 12 Earth years”."
            }
          }
        ],
        "vocab": [
          {
            "word": "planet",
            "ipa": "/ˈplænɪt/",
            "pos": "n.",
            "vi": "hành tinh",
            "band": "7.0",
            "example": "It's the largest planet in our solar system – if it were a hollow shell, 1,000 Earths could fit inside.",
            "id": "planet",
            "topic": "science"
          },
          {
            "word": "solar",
            "ipa": "/ˈsəʊlə/",
            "pos": "adj.",
            "vi": "thuộc Mặt Trời",
            "band": "7.0",
            "example": "It's the largest planet in our solar system – if it were a hollow shell, 1,000 Earths could fit inside.",
            "id": "solar",
            "topic": "science"
          },
          {
            "word": "surface",
            "ipa": "/ˈsɜːfɪs/",
            "pos": "n.",
            "vi": "bề mặt",
            "band": "7.0",
            "example": "Callisto’s very few small craters indicate a small degree of current surface activity.",
            "id": "surface",
            "topic": "science"
          },
          {
            "word": "atmosphere",
            "ipa": "/ˈætməsfɪə/",
            "pos": "n.",
            "vi": "khí quyển",
            "band": "7.0",
            "example": "Jupiter's signature stripes and swirls are actually cold, windy clouds of ammonia and water, floating in an atmosphere of hydrogen and helium.",
            "id": "atmosphere",
            "topic": "science"
          },
          {
            "word": "orbit",
            "ipa": "/ˈɔːbɪt/",
            "pos": "n./v.",
            "vi": "quỹ đạo; quay quanh",
            "band": "7.0",
            "example": "One day on Jupiter takes 9.9 hours (the time it takes for Jupiter to rotate or spin around once), and Jupiter makes a complete orbit around the Sun (a year in Jovian time) in about 12 Earth years (4,333 Earth days).",
            "id": "orbit",
            "topic": "science"
          },
          {
            "word": "axis",
            "ipa": "/ˈæksɪs/",
            "pos": "n.",
            "vi": "trục",
            "band": "7.0",
            "example": "But it has the shortest day in the solar system, taking about 9.9 hours to spin around once on its axis.",
            "id": "axis",
            "topic": "science"
          },
          {
            "word": "crust",
            "ipa": "/krʌst/",
            "pos": "n.",
            "vi": "lớp vỏ",
            "band": "7.0",
            "example": "There is evidence of a vast ocean just beneath its icy crust, where life could possibly be supported.",
            "id": "crust",
            "topic": "science"
          },
          {
            "word": "gravity",
            "ipa": "/ˈɡrævəti/",
            "pos": "n.",
            "vi": "lực hấp dẫn",
            "band": "7.0",
            "example": "Gravity pulled swirling gas and dust together to form this gas giant.",
            "id": "gravity",
            "topic": "science"
          },
          {
            "word": "radius",
            "ipa": "/ˈreɪdiəs/",
            "pos": "n.",
            "vi": "bán kính",
            "band": "7.0",
            "example": "With a radius of 43,440.7 miles (69,911 kilometers), Jupiter is 11 times wider than Earth.",
            "id": "radius",
            "topic": "science"
          },
          {
            "word": "temperature",
            "ipa": "/ˈtemprətʃə/",
            "pos": "n.",
            "vi": "nhiệt độ",
            "band": "7.0",
            "example": "The temperatures, pressures, and materials that characterize this planet are most likely too extreme and volatile for organisms to adapt to.",
            "id": "temperature",
            "topic": "science"
          },
          {
            "word": "particle",
            "ipa": "/ˈpɑːtɪkəl/",
            "pos": "n.",
            "vi": "hạt nhỏ",
            "band": "7.0",
            "example": "The rings are composed of small, dark particles, and they are difficult to see except when backlit by the Sun.",
            "id": "particle",
            "topic": "science"
          },
          {
            "word": "liquid",
            "ipa": "/ˈlɪkwɪd/",
            "pos": "n./adj.",
            "vi": "chất lỏng; dạng lỏng",
            "band": "7.0",
            "example": "A liquid-water ocean with the ingredients for life may lie beneath the frozen crust of Europa, the target of NASA's Europa Clipper mission that launched Oct. 14, 2024.",
            "id": "liquid",
            "topic": "science"
          },
          {
            "word": "formation",
            "ipa": "/fɔːˈmeɪʃən/",
            "pos": "n.",
            "vi": "sự hình thành",
            "band": "7.0",
            "example": "It's also the oldest planet, forming from the dust and gases left over from the Sun's formation 4.6 billion years ago.",
            "id": "formation",
            "topic": "science"
          },
          {
            "word": "satellite",
            "ipa": "/ˈsætəlaɪt/",
            "pos": "n.",
            "vi": "vệ tinh",
            "band": "7.0",
            "example": "These four moons are known today as the Galilean satellites, and they're some of the most fascinating destinations in our solar system.",
            "id": "satellite",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R8-P2",
        "part": 2,
        "title": "Mountains Shaped by Ice",
        "topic": "environment",
        "paragraphs": [
          {
            "label": "A",
            "text": "Along the western base of the range a telling series of sedimentary rocks containing the early history of the Sierra are now being studied. But leaving for the present these first chapters, we see that only a very short geological time ago, just before the coming on of that winter of winters called the glacial period, a vast deluge of molten rocks poured from many a chasm and crater on the flanks and summit of the range, filling lake basins and river channels, and obliterating nearly every existing feature on the northern portion."
          },
          {
            "label": "B",
            "text": "At length these all-destroying floods ceased to flow. But while the great volcanic cones built up along the axis still burned and smoked, the whole Sierra passed under the domain of ice and snow. Then over the bald, featureless, fire-blackened mountains, glaciers began to crawl, covering them from the summits to the sea with a mantle of ice; and then with infinite deliberation the work went on of sculpturing the range anew. These mighty agents of erosion, halting never through unnumbered centuries, crushed and ground the flinty lavas and granites beneath their crystal folds, wasting and building until in the fullness of time the Sierra was born again, brought to light nearly as we behold it today, with glaciers and snow-crushed pines at the top of the range, wheat-fields and orange-groves at the foot of it."
          },
          {
            "label": "C",
            "text": "This change from icy darkness and death to life and beauty was slow, as we count time, and is still going on, north and south, over all the world wherever glaciers exist, whether in the form of distinct rivers, as in Switzerland, Norway, the mountains of Asia, and the Pacific Coast; or in continuous mantling folds, as in portions of Alaska, Greenland, Franz-Joseph-Land, Nova Zembla, Spitzbergen, and the lands about the South Pole. But in no country, as far as I know, may these majestic changes be studied to better advantage than in the plains and mountains of California."
          },
          {
            "label": "D",
            "text": "Toward the close of the glacial period, when the snow-clouds became less fertile and the melting waste of sunshine became greater, the lower folds of the ice-sheet in California, discharging fleets of icebergs into the sea, began to shallow and recede from the lowlands, and then move slowly up the flanks of the Sierra in compliance with the changes of climate. The great white mantle on the mountains broke up into a series of glaciers more or less distinct and river-like, with many tributaries, and these again were melted and divided into still smaller glaciers, until now only a few of the smallest residual topmost branches of the grand system exist on the cool slopes of the summit peaks."
          },
          {
            "label": "E",
            "text": "Plants and animals, biding their time, closely followed the retiring ice, bestowing quick and joyous animation on the new-born landscapes. Pine-trees marched up the sun-warmed moraines in long, hopeful files, taking the ground and establishing themselves as soon as it was ready for them; brown-spiked sedges fringed the shores of the newborn lakes; young rivers roared in the abandoned channels of the glaciers; flowers bloomed around the feet of the great burnished domes,—while with quick fertility mellow beds of soil, settling and warming, offered food to multitudes of Nature’s waiting children, great and small, animals as well as plants; mice, squirrels, marmots, deer, bears, elephants, etc."
          },
          {
            "label": "F",
            "text": "The ground burst into bloom with magical rapidity, and the young forests into bird-song: life in every form warming and sweetening and growing richer as the years passed away over the mighty Sierra so lately suggestive of death and consummate desolation only. It is hard without long and loving study to realize the magnitude of the work done on these mountains during the last glacial period by glaciers, which are only streams of closely compacted snow-crystals. Careful study of the phenomena presented goes to show that the pre-glacial condition of the range was comparatively simple: one vast wave of stone in which a thousand mountains, domes, cañons, ridges, etc., lay concealed."
          },
          {
            "label": "G",
            "text": "And in the development of these Nature chose for a tool not the earthquake or lightning to rend and split asunder, not the stormy torrent or eroding rain, but the tender snow-flowers noiselessly falling through unnumbered centuries, the offspring of the sun and sea. Laboring harmoniously in united strength they crushed and ground and wore away the rocks in their march, making vast beds of soil, and at the same time developed and fashioned the landscapes into the delightful variety of hill and dale and lordly mountain that mortals call beauty."
          },
          {
            "label": "H",
            "text": "Perhaps more than a mile in average depth has the range been thus degraded during the last glacial period,—a quantity of mechanical work almost inconceivably great. And our admiration must be excited again and again as we toil and study and learn that this vast job of rockwork, so far-reaching in its influences, was done by agents so fragile and small as are these flowers of the mountain clouds."
          }
        ],
        "provenance": {
          "kind": "public-domain-excerpt",
          "publisher": "John Muir — The Mountains of California (1894)",
          "url": "https://www.gutenberg.org/cache/epub/10012/pg10012-images.html",
          "rightsUrl": "https://www.gutenberg.org/policy/license.html",
          "note": "Trích văn bản lịch sử thuộc phạm vi công cộng: John Muir, The Mountains of California (1894); giữ ngôn ngữ và góc nhìn thời kỳ đó, chia lại đoạn A–H. Dùng để luyện đọc hiểu, không trình bày như kiến thức khoa học hoặc quan điểm hiện hành. Câu hỏi và lời giải do app biên soạn. Nguồn số hóa có kèm giấy phép Project Gutenberg."
        },
        "intro": "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        "groups": [
          {
            "type": "headings",
            "kind": "match",
            "range": [
              14,
              17
            ],
            "instruction": "Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.",
            "allowReuse": false,
            "options": [
              {
                "key": "i",
                "text": "A continuing process seen beyond California"
              },
              {
                "key": "ii",
                "text": "Glaciers remake the mountains"
              },
              {
                "key": "iii",
                "text": "Plants that survive volcanic eruptions"
              },
              {
                "key": "iv",
                "text": "A volcanic landscape before the ice"
              },
              {
                "key": "v",
                "text": "Earthquakes as the main sculptors"
              },
              {
                "key": "vi",
                "text": "The retreat and fragmentation of the ice"
              }
            ],
            "questions": [
              {
                "n": 14,
                "text": "Paragraph A",
                "answer": "iv",
                "explain": "Đoạn A: “a vast deluge of molten rocks”. Dung nham xóa nhiều đặc điểm địa hình trước giai đoạn băng hà."
              },
              {
                "n": 15,
                "text": "Paragraph B",
                "answer": "ii",
                "explain": "Đoạn B: “sculpturing the range anew”. Băng hà xói mòn và tái tạo dãy núi."
              },
              {
                "n": 16,
                "text": "Paragraph C",
                "answer": "i",
                "explain": "Đoạn C: “over all the world wherever glaciers exist”. Tác giả liệt kê các vùng khác để cho thấy quá trình vẫn tiếp diễn rộng rãi."
              },
              {
                "n": 17,
                "text": "Paragraph D",
                "answer": "vi",
                "explain": "Đoạn D: “broke up into a series of glaciers”. Khối băng rút lên cao và chia thành các nhánh nhỏ."
              }
            ]
          },
          {
            "type": "info",
            "kind": "match",
            "range": [
              18,
              20
            ],
            "instruction": "Which paragraph contains the following information? You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Paragraph A"
              },
              {
                "key": "B",
                "text": "Paragraph B"
              },
              {
                "key": "C",
                "text": "Paragraph C"
              },
              {
                "key": "D",
                "text": "Paragraph D"
              },
              {
                "key": "E",
                "text": "Paragraph E"
              },
              {
                "key": "F",
                "text": "Paragraph F"
              },
              {
                "key": "G",
                "text": "Paragraph G"
              },
              {
                "key": "H",
                "text": "Paragraph H"
              }
            ],
            "questions": [
              {
                "n": 18,
                "text": "Plants and animals colonising newly exposed ground",
                "answer": "E",
                "explain": "Đoạn E: “Pine-trees marched up”."
              },
              {
                "n": 19,
                "text": "A description of the mountains before glaciation as comparatively simple",
                "answer": "F",
                "explain": "Đoạn F: “one vast wave of stone”."
              },
              {
                "n": 20,
                "text": "An estimate of the depth of rock removed",
                "answer": "H",
                "explain": "Đoạn H: “more than a mile in average depth”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              21,
              23
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Young rivers ran in channels abandoned by {{21}}.</p><p>Glaciers are described as closely compacted {{22}}.</p><p>The glaciers created large beds of {{23}}.</p>",
            "answers": {
              "21": [
                "glaciers"
              ],
              "22": [
                "snow-crystals"
              ],
              "23": [
                "soil"
              ]
            },
            "explain": {
              "21": "Đoạn E: “abandoned channels of the glaciers”.",
              "22": "Đoạn F: “closely compacted snow-crystals”.",
              "23": "Đoạn G: “making vast beds of soil”."
            }
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              24,
              26
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 24,
                "text": "Which contrast especially interests Muir?",
                "options": [
                  "A Rock colour versus the price of land",
                  "B Small fragile agents versus the scale of their work",
                  "C Forests in cities versus forests in gardens"
                ],
                "answer": "B",
                "explain": "Đoạn H: “agents so fragile and small”."
              },
              {
                "n": 25,
                "text": "How does Muir characterise the pace of the change?",
                "options": [
                  "A Instantaneous on a human scale",
                  "B Completed in one winter",
                  "C Slow when judged by human measures of time"
                ],
                "answer": "C",
                "explain": "Đoạn C: “slow, as we count time”."
              },
              {
                "n": 26,
                "text": "What followed the receding ice?",
                "options": [
                  "A The spread of plants and animals",
                  "B A permanent absence of soil",
                  "C The disappearance of every river"
                ],
                "answer": "A",
                "explain": "Đoạn E: “Plants and animals, biding their time”."
              }
            ]
          }
        ],
        "vocab": [
          {
            "word": "axis",
            "ipa": "/ˈæksɪs/",
            "pos": "n.",
            "vi": "trục",
            "band": "7.0",
            "example": "But while the great volcanic cones built up along the axis still burned and smoked, the whole Sierra passed under the domain of ice and snow.",
            "id": "axis",
            "topic": "environment"
          },
          {
            "word": "mantle",
            "ipa": "/ˈmæntəl/",
            "pos": "n.",
            "vi": "lớp phủ bên dưới vỏ",
            "band": "7.0",
            "example": "Then over the bald, featureless, fire-blackened mountains, glaciers began to crawl, covering them from the summits to the sea with a mantle of ice; and then with infinite deliberation the work went on of sculpturing the range anew.",
            "id": "mantle",
            "topic": "environment"
          },
          {
            "word": "crater",
            "ipa": "/ˈkreɪtə/",
            "pos": "n.",
            "vi": "hố va chạm",
            "band": "7.0",
            "example": "But leaving for the present these first chapters, we see that only a very short geological time ago, just before the coming on of that winter of winters called the glacial period, a vast deluge of molten rocks poured from many a chasm and crater on the flanks and summit of the range, filling lake basins and river channels, and obliterating nearly every existing feature on the northern portion.",
            "id": "crater",
            "topic": "environment"
          },
          {
            "word": "sedimentary",
            "ipa": "/ˌsedɪˈmentəri/",
            "pos": "adj.",
            "vi": "thuộc trầm tích",
            "band": "7.0",
            "example": "Along the western base of the range a telling series of sedimentary rocks containing the early history of the Sierra are now being studied.",
            "id": "sedimentary",
            "topic": "environment"
          },
          {
            "word": "glacial",
            "ipa": "/ˈɡleɪsiəl/",
            "pos": "adj.",
            "vi": "thuộc băng hà",
            "band": "7.0",
            "example": "But leaving for the present these first chapters, we see that only a very short geological time ago, just before the coming on of that winter of winters called the glacial period, a vast deluge of molten rocks poured from many a chasm and crater on the flanks and summit of the range, filling lake basins and river channels, and obliterating nearly every existing feature on the northern portion.",
            "id": "glacial",
            "topic": "environment"
          },
          {
            "word": "erosion",
            "ipa": "/ɪˈrəʊʒən/",
            "pos": "n.",
            "vi": "sự xói mòn",
            "band": "7.0",
            "example": "These mighty agents of erosion, halting never through unnumbered centuries, crushed and ground the flinty lavas and granites beneath their crystal folds, wasting and building until in the fullness of time the Sierra was born again, brought to light nearly as we behold it today, with glaciers and snow-crushed pines at the top of the range, wheat-fields and orange-groves at the foot of it.",
            "id": "erosion",
            "topic": "environment"
          },
          {
            "word": "granite",
            "ipa": "/ˈɡrænɪt/",
            "pos": "n.",
            "vi": "đá granit",
            "band": "7.0",
            "example": "These mighty agents of erosion, halting never through unnumbered centuries, crushed and ground the flinty lavas and granites beneath their crystal folds, wasting and building until in the fullness of time the Sierra was born again, brought to light nearly as we behold it today, with glaciers and snow-crushed pines at the top of the range, wheat-fields and orange-groves at the foot of it.",
            "id": "granite",
            "topic": "environment"
          },
          {
            "word": "tributaries",
            "ipa": "/ˈtrɪbjətəriz/",
            "pos": "n.",
            "vi": "các nhánh phụ",
            "band": "7.0",
            "example": "The great white mantle on the mountains broke up into a series of glaciers more or less distinct and river-like, with many tributaries, and these again were melted and divided into still smaller glaciers, until now only a few of the smallest residual topmost branches of the grand system exist on the cool slopes of the summit peaks.",
            "id": "tributaries",
            "topic": "environment"
          },
          {
            "word": "moraines",
            "ipa": "/məˈreɪnz/",
            "pos": "n.",
            "vi": "bãi vật liệu do sông băng để lại",
            "band": "7.0",
            "example": "Pine-trees marched up the sun-warmed moraines in long, hopeful files, taking the ground and establishing themselves as soon as it was ready for them; brown-spiked sedges fringed the shores of the newborn lakes; young rivers roared in the abandoned channels of the glaciers; flowers bloomed around the feet of the great burnished domes,—while with quick fertility mellow beds of soil, settling and warming, offered food to multitudes of Nature’s waiting children, great and small, animals as well as plants; mice, squirrels, marmots, deer, bears, elephants, etc.",
            "id": "moraines",
            "topic": "environment"
          },
          {
            "word": "fertility",
            "ipa": "/fəˈtɪləti/",
            "pos": "n.",
            "vi": "sự màu mỡ; khả năng sinh sản",
            "band": "7.0",
            "example": "Pine-trees marched up the sun-warmed moraines in long, hopeful files, taking the ground and establishing themselves as soon as it was ready for them; brown-spiked sedges fringed the shores of the newborn lakes; young rivers roared in the abandoned channels of the glaciers; flowers bloomed around the feet of the great burnished domes,—while with quick fertility mellow beds of soil, settling and warming, offered food to multitudes of Nature’s waiting children, great and small, animals as well as plants; mice, squirrels, marmots, deer, bears, elephants, etc.",
            "id": "fertility",
            "topic": "environment"
          },
          {
            "word": "phenomena",
            "ipa": "/fəˈnɒmɪnə/",
            "pos": "n.",
            "vi": "các hiện tượng",
            "band": "7.0",
            "example": "Careful study of the phenomena presented goes to show that the pre-glacial condition of the range was comparatively simple: one vast wave of stone in which a thousand mountains, domes, cañons, ridges, etc., lay concealed.",
            "id": "phenomena",
            "topic": "environment"
          },
          {
            "word": "concealed",
            "ipa": "/kənˈsiːld/",
            "pos": "adj./v.",
            "vi": "bị che giấu",
            "band": "7.0",
            "example": "Careful study of the phenomena presented goes to show that the pre-glacial condition of the range was comparatively simple: one vast wave of stone in which a thousand mountains, domes, cañons, ridges, etc., lay concealed.",
            "id": "concealed",
            "topic": "environment"
          },
          {
            "word": "magnitude",
            "ipa": "/ˈmæɡnɪtjuːd/",
            "pos": "n.",
            "vi": "quy mô; độ lớn",
            "band": "7.0",
            "example": "It is hard without long and loving study to realize the magnitude of the work done on these mountains during the last glacial period by glaciers, which are only streams of closely compacted snow-crystals.",
            "id": "magnitude",
            "topic": "environment"
          },
          {
            "word": "compacted",
            "ipa": "/kəmˈpæktɪd/",
            "pos": "adj.",
            "vi": "được nén chặt",
            "band": "7.0",
            "example": "It is hard without long and loving study to realize the magnitude of the work done on these mountains during the last glacial period by glaciers, which are only streams of closely compacted snow-crystals.",
            "id": "compacted",
            "topic": "environment"
          }
        ]
      },
      {
        "id": "R8-P3",
        "title": "Why Museums Make Copies",
        "topic": "culture",
        "paragraphs": [
          {
            "label": "A",
            "text": "A museum replica can invite two opposite reactions. One visitor welcomes the chance to approach an object without the restrictions required by a fragile original. Another feels that a copy weakens the promise of authenticity associated with a museum. Both reactions are understandable, but neither settles what a replica can contribute. The relevant issue is what the display claims to communicate and how clearly it explains the relationship between copy and source. Material age, visible form and opportunities for examination are different qualities. A reproduction may preserve one while changing another, and visitors deserve enough information to judge the distinction themselves."
          },
          {
            "label": "B",
            "text": "In the fictional Portwell Museum, an intricate carved panel could not safely remain in a busy teaching room. Staff commissioned a robust replica that students could touch. The label identified the material of the copy and explained which features had been simplified during manufacture. Students could trace the design with their fingers, but were not invited to infer the weight or texture of the original from this substitute. The object supported an activity that conservation rules would otherwise prevent. Its educational value depended on acknowledging its limits, since a physically accessible copy can still mislead if every sensory property is presented as historically accurate."
          },
          {
            "label": "C",
            "text": "Fictional Glassmere Gallery used a digital reconstruction of a damaged wall painting. Different versions showed alternative interpretations of missing sections. Rather than selecting one complete image and hiding the uncertainty, the gallery allowed visitors to compare the evidence behind competing arrangements. Some fragments fitted several possible positions. The reconstruction therefore functioned as an argument that could be examined, not as a transparent window onto a recovered past. A polished image might have been more immediately impressive, but visible alternatives helped explain the work of interpretation. The gallery treated uncertainty as part of the subject rather than as an inconvenience to be concealed."
          },
          {
            "label": "D",
            "text": "The imaginary Fernbank Collection displayed a copy of a ceremonial vessel while the original remained with the community that owned it. The label described the agreement and named the people who had decided how the object could be represented. The replica's presence did not imply that the museum had acquired the original or the authority to explain every aspect of its use. Some information was deliberately withheld at the owners' request. This arrangement made a relationship visible as well as a form. It challenged the assumption that possessing an object is the only basis on which a museum can create a meaningful public display."
          },
          {
            "label": "E",
            "text": "These cases suggest that authenticity is better examined through explicit questions than through a single verdict. Is the material original? Is the form reconstructed from strong evidence? Has the represented community authorised the interpretation? A display may answer these questions differently without becoming worthless. Problems arise when one answer is allowed to stand for all the others. A highly accurate surface scan does not establish that a proposed historical colour is correct. An old object does not guarantee that a modern account of its purpose is reliable. Visitors need distinctions that help them assess what each part of a display can actually support."
          },
          {
            "label": "F",
            "text": "Cost introduces further choices. A replica requires design, checking, maintenance and eventual replacement. Digital versions may need new software or equipment even when the underlying model remains unchanged. It is therefore misleading to assume that a copy is automatically a cheap solution. Equally, comparing only purchase prices misses benefits such as handling sessions or access in several locations. An evaluation should identify which activities the reproduction enables, the resources they require and what would happen without it. The question concerns the quality of a particular use, rather than an abstract competition between expensive originals and inexpensive substitutes."
          },
          {
            "label": "G",
            "text": "Clear labelling should be integrated into the encounter with the object. A small disclosure hidden at the end of a long text cannot reliably correct the impression created by a convincing display. Yet labels need not overwhelm visitors with technical detail. A short statement can identify the reproduction, its purpose and the most significant uncertainty, with further explanation available nearby. Staff should also observe how visitors describe the display afterwards. If people consistently remember a proposed reconstruction as a surviving ancient object, the communication has failed even when every sentence in the label was technically accurate."
          },
          {
            "label": "H",
            "text": "The strongest justification for a replica is consequently specific. It may permit touch, reveal alternative interpretations or support an agreement that keeps an original elsewhere. These are positive contributions when the copy is presented honestly and used thoughtfully. They do not require pretending that age, material and ownership are irrelevant. A museum can respect the distinctive value of an original while showing why another form of access matters. The success of the display lies in what visitors are enabled to understand, including the reasons for the reproduction and the boundaries of the claims that can reasonably be made from it."
          }
        ],
        "part": 3,
        "provenance": {
          "kind": "original",
          "note": "Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức."
        },
        "intro": "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        "groups": [
          {
            "type": "features",
            "kind": "match",
            "range": [
              27,
              29
            ],
            "instruction": "Match each statement with the correct illustrative case. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Portwell Museum"
              },
              {
                "key": "B",
                "text": "Glassmere Gallery"
              },
              {
                "key": "C",
                "text": "Fernbank Collection"
              }
            ],
            "questions": [
              {
                "n": 27,
                "text": "A display showed competing versions of missing parts.",
                "answer": "B",
                "explain": "Đoạn C: “alternative interpretations of missing sections”."
              },
              {
                "n": 28,
                "text": "The original remained with the community that owned it.",
                "answer": "C",
                "explain": "Đoạn D: “original remained with the community”."
              },
              {
                "n": 29,
                "text": "A durable copy made touching a carved design possible.",
                "answer": "A",
                "explain": "Đoạn B: “robust replica that students could touch”."
              }
            ]
          },
          {
            "type": "ynng",
            "kind": "tfng",
            "variant": "ynng",
            "range": [
              30,
              33
            ],
            "instruction": "Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 30,
                "text": "A reproduction can preserve form while changing another quality.",
                "answer": "YES",
                "explain": "Đoạn A: “preserve one while changing another”."
              },
              {
                "n": 31,
                "text": "Every replica is automatically cheaper than using an original.",
                "answer": "NO",
                "explain": "Đoạn F: “a copy is automatically a cheap solution”."
              },
              {
                "n": 32,
                "text": "Technical accuracy in a label guarantees visitors will understand it correctly.",
                "answer": "NO",
                "explain": "Đoạn G: “communication has failed even when every sentence”."
              },
              {
                "n": 33,
                "text": "Most visitors now prefer replicas to original objects.",
                "answer": "NOT GIVEN",
                "explain": "Bài chỉ nêu phản ứng khác nhau, không có số liệu về đa số khách."
              }
            ]
          },
          {
            "type": "endings",
            "kind": "match",
            "range": [
              34,
              36
            ],
            "instruction": "Complete each sentence with the correct ending, A–F.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "proves that the proposed colours are original."
              },
              {
                "key": "B",
                "text": "is justified whenever it is inexpensive to purchase."
              },
              {
                "key": "C",
                "text": "can identify the copy, its purpose and its main uncertainty."
              },
              {
                "key": "D",
                "text": "removes the need to explain who authorised a display."
              },
              {
                "key": "E",
                "text": "is linked to a particular opportunity it creates."
              },
              {
                "key": "F",
                "text": "does not prove that reconstructed colour is correct."
              }
            ],
            "questions": [
              {
                "n": 34,
                "text": "An accurate surface scan",
                "answer": "F",
                "explain": "Đoạn E: “does not establish that a proposed historical colour”."
              },
              {
                "n": 35,
                "text": "A clear short label",
                "answer": "C",
                "explain": "Đoạn G: “its purpose and the most significant uncertainty”."
              },
              {
                "n": 36,
                "text": "A replica’s strongest justification",
                "answer": "E",
                "explain": "Đoạn H: “strongest justification for a replica is consequently specific”."
              }
            ]
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              37,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Copies should explain their relationship to the {{37}}.</p><p>Replicas also incur costs of checking and {{38}}.</p><p>Visitors’ later descriptions can reveal failed {{39}}.</p><p>A copy may offer access while respecting the distinctive value of an {{40}}.</p>",
            "answers": {
              "37": [
                "source"
              ],
              "38": [
                "maintenance"
              ],
              "39": [
                "communication"
              ],
              "40": [
                "original"
              ]
            },
            "explain": {
              "37": "Đoạn A: “relationship between copy and source”.",
              "38": "Đoạn F: “checking, maintenance”.",
              "39": "Đoạn G: “the communication has failed”.",
              "40": "Đoạn H: “distinctive value of an original”."
            }
          }
        ],
        "vocab": [
          {
            "word": "surface",
            "ipa": "/ˈsɜːfɪs/",
            "pos": "n.",
            "vi": "bề mặt",
            "band": "7.0",
            "example": "A highly accurate surface scan does not establish that a proposed historical colour is correct.",
            "id": "surface",
            "topic": "culture"
          },
          {
            "word": "vessel",
            "ipa": "/ˈvesəl/",
            "pos": "n.",
            "vi": "bình chứa",
            "band": "7.0",
            "example": "The imaginary Fernbank Collection displayed a copy of a ceremonial vessel while the original remained with the community that owned it.",
            "id": "vessel",
            "topic": "culture"
          },
          {
            "word": "manufacture",
            "ipa": "/ˌmænjəˈfæktʃə/",
            "pos": "n./v.",
            "vi": "sự sản xuất; sản xuất",
            "band": "7.0",
            "example": "The label identified the material of the copy and explained which features had been simplified during manufacture.",
            "id": "manufacture",
            "topic": "culture"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "Rather than selecting one complete image and hiding the uncertainty, the gallery allowed visitors to compare the evidence behind competing arrangements.",
            "id": "evidence",
            "topic": "culture"
          },
          {
            "word": "concealed",
            "ipa": "/kənˈsiːld/",
            "pos": "adj./v.",
            "vi": "bị che giấu",
            "band": "7.0",
            "example": "The gallery treated uncertainty as part of the subject rather than as an inconvenience to be concealed.",
            "id": "concealed",
            "topic": "culture"
          },
          {
            "word": "fragile",
            "ipa": "/ˈfrædʒaɪl/",
            "pos": "adj.",
            "vi": "mong manh",
            "band": "7.0",
            "example": "One visitor welcomes the chance to approach an object without the restrictions required by a fragile original.",
            "id": "fragile",
            "topic": "culture"
          },
          {
            "word": "reconstruction",
            "ipa": "/ˌriːkənˈstrʌkʃən/",
            "pos": "n.",
            "vi": "sự tái dựng",
            "band": "7.0",
            "example": "Fictional Glassmere Gallery used a digital reconstruction of a damaged wall painting.",
            "id": "reconstruction",
            "topic": "culture"
          },
          {
            "word": "deliberately",
            "ipa": "/dɪˈlɪbərətli/",
            "pos": "adv.",
            "vi": "có chủ ý; cẩn trọng",
            "band": "7.0",
            "example": "Some information was deliberately withheld at the owners' request.",
            "id": "deliberately",
            "topic": "culture"
          },
          {
            "word": "evaluation",
            "ipa": "/ɪˌvæljuˈeɪʃən/",
            "pos": "n.",
            "vi": "sự đánh giá",
            "band": "7.0",
            "example": "An evaluation should identify which activities the reproduction enables, the resources they require and what would happen without it.",
            "id": "evaluation",
            "topic": "culture"
          },
          {
            "word": "maintenance",
            "ipa": "/ˈmeɪntənəns/",
            "pos": "n.",
            "vi": "sự bảo trì",
            "band": "7.0",
            "example": "A replica requires design, checking, maintenance and eventual replacement.",
            "id": "maintenance",
            "topic": "culture"
          },
          {
            "word": "interpretation",
            "ipa": "/ɪnˌtɜːprɪˈteɪʃən/",
            "pos": "n.",
            "vi": "sự diễn giải",
            "band": "7.0",
            "example": "Different versions showed alternative interpretations of missing sections.",
            "id": "interpretation",
            "topic": "culture"
          },
          {
            "word": "accessible",
            "ipa": "/əkˈsesəbəl/",
            "pos": "adj.",
            "vi": "có thể tiếp cận",
            "band": "7.0",
            "example": "Its educational value depended on acknowledging its limits, since a physically accessible copy can still mislead if every sensory property is presented as historically accurate.",
            "id": "accessible",
            "topic": "culture"
          },
          {
            "word": "uncertainty",
            "ipa": "/ʌnˈsɜːtənti/",
            "pos": "n.",
            "vi": "sự không chắc chắn",
            "band": "7.0",
            "example": "Rather than selecting one complete image and hiding the uncertainty, the gallery allowed visitors to compare the evidence behind competing arrangements.",
            "id": "uncertainty",
            "topic": "culture"
          },
          {
            "word": "resource",
            "ipa": "/rɪˈsɔːs/",
            "pos": "n.",
            "vi": "nguồn lực",
            "band": "7.0",
            "example": "An evaluation should identify which activities the reproduction enables, the resources they require and what would happen without it.",
            "id": "resource",
            "topic": "culture"
          }
        ]
      }
    ]
  },
  {
    "id": "R9",
    "title": "Practice Test 9 — Saturn, Industry & Food Labels",
    "source": "Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật",
    "passages": [
      {
        "id": "R9-P1",
        "part": 1,
        "title": "Saturn Beyond Its Rings",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Like fellow gas giant Jupiter, Saturn is a massive ball made mostly of hydrogen and helium. Saturn is not the only planet to have rings, but none are as spectacular or as complex as Saturn's. Saturn also has dozens of moons. From the jets of water that spray from Saturn's moon Enceladus to the methane lakes on smoggy Titan , the Saturn system is a rich source of scientific discovery and still holds many mysteries. The farthest planet from Earth discovered by the unaided human eye, Saturn has been known since ancient times."
          },
          {
            "label": "B",
            "text": "The planet is named for the Roman god of agriculture and wealth, who was also the father of Jupiter. Saturn's environment is not conducive to life as we know it. The temperatures, pressures, and materials that characterize this planet are most likely too extreme and volatile for organisms to adapt to. While planet Saturn is an unlikely place for living things to take hold, the same is not true of some of its many moons. Satellites like Enceladus and Titan, home to internal oceans, could possibly support life. With an equatorial diameter of about 74,897 miles (120,500 kilometers), Saturn is 9 times wider than Earth."
          },
          {
            "label": "C",
            "text": "If Earth were the size of a nickel, Saturn would be about as big as a volleyball. From an average distance of 886 million miles (1.4 billion kilometers), Saturn is 9.5 astronomical units away from the Sun. One astronomical unit (abbreviated as AU), is the distance from the Sun to Earth. From this distance, it takes sunlight 80 minutes to travel from the Sun to Saturn. Saturn has the second-shortest day in the solar system. One day on Saturn takes only 10.7 hours (the time it takes for Saturn to rotate or spin around once), and Saturn makes a complete orbit around the Sun (a year in Saturnian time) in about 29.4 Earth years (10,756 Earth days)."
          },
          {
            "label": "D",
            "text": "Its axis is tilted by 26.73 degrees with respect to its orbit around the Sun, which is similar to Earth's 23.5-degree tilt. This means that, like Earth, Saturn experiences seasons. Saturn is home to a vast array of intriguing and unique worlds. From the haze-shrouded surface of Titan to crater-riddled Phoebe, each of Saturn's moons tells another piece of the story surrounding the Saturn system. As of March 2025, Saturn had 274 confirmed moons in its orbit, far more than any other planet in our solar system, with other Saturnian satellites continually awaiting confirmation of their discovery and official naming by the International Astronomical Union (IAU)."
          },
          {
            "label": "E",
            "text": "Saturn's rings are thought to be pieces of comets, asteroids, or shattered moons that broke up before they reached the planet, torn apart by Saturn's powerful gravity. They are made of billions of small chunks of ice and rock coated with other materials such as dust. The ring particles mostly range from tiny, dust-sized icy grains to chunks as big as a house. A few particles are as large as mountains. The rings would look mostly white if you looked at them from the cloud tops of Saturn, and interestingly, each ring orbits at a different speed around the planet."
          },
          {
            "label": "F",
            "text": "Saturn's ring system extends up to 175,000 miles (282,000 kilometers) from the planet, yet the vertical height is typically about 30 feet (10 meters) in the main rings. Named alphabetically in the order they were discovered, the rings are relatively close to each other, with the exception of a gap measuring 2,920 miles (4,700 kilometers) in width called the Cassini Division that separates Rings A and B. The main rings are A, B, and C. Rings D, E, F, and G are fainter and more recently discovered."
          },
          {
            "label": "G",
            "text": "Starting at Saturn and moving outward, there is the D ring, C ring, B ring, Cassini Division, A ring, F ring, G ring, and finally, the E ring. Much farther out, there is the very faint Phoebe ring in the orbit of Saturn's moon Phoebe. Saturn took shape when the rest of the solar system formed about 4.5 billion years ago when gravity pulled swirling gas and dust in to become this gas giant. About 4 billion years ago, Saturn settled into its current position in the outer solar system, where it is the sixth planet from the Sun."
          },
          {
            "label": "H",
            "text": "Like Jupiter, Saturn is mostly made of hydrogen and helium, the same two main components that make up the Sun. Like Jupiter, Saturn is made mostly of hydrogen and helium. At Saturn's center is a dense core of metals like iron and nickel surrounded by rocky material and other compounds solidified by intense pressure and heat. It is enveloped by liquid metallic hydrogen inside a layer of liquid hydrogen –similar to Jupiter's core but considerably smaller. It's hard to imagine, but Saturn is the only planet in our solar system with an average density that is less than water."
          }
        ],
        "provenance": {
          "kind": "public-information-excerpt",
          "publisher": "NASA Science",
          "url": "https://science.nasa.gov/saturn/facts/",
          "rightsUrl": "https://www.nasa.gov/nasa-brand-center/images-and-media/",
          "note": "Trích tuyển văn bản giáo dục NASA Science; chia lại đoạn A–H để luyện đọc. Câu hỏi và lời giải do app biên soạn. Không ngụ ý NASA bảo trợ."
        },
        "intro": "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        "groups": [
          {
            "type": "tfng",
            "kind": "tfng",
            "variant": "tfng",
            "range": [
              1,
              5
            ],
            "instruction": "Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 1,
                "text": "Saturn is the only planet with rings.",
                "answer": "FALSE",
                "explain": "Đoạn A: “Saturn is not the only planet to have rings”."
              },
              {
                "n": 2,
                "text": "Saturn could be seen before telescopes were invented.",
                "answer": "TRUE",
                "explain": "Đoạn A: “unaided human eye”."
              },
              {
                "n": 3,
                "text": "The rings all orbit at an identical speed.",
                "answer": "FALSE",
                "explain": "Đoạn E: “each ring orbits at a different speed”."
              },
              {
                "n": 4,
                "text": "Saturn’s axial tilt allows it to have seasons.",
                "answer": "TRUE",
                "explain": "Đoạn D: “Saturn experiences seasons”."
              },
              {
                "n": 5,
                "text": "Saturn was first photographed from a spacecraft in 1969.",
                "answer": "NOT GIVEN",
                "explain": "Không nêu năm đầu tiên chụp Saturn từ tàu vũ trụ."
              }
            ]
          },
          {
            "type": "note",
            "kind": "gap",
            "range": [
              6,
              9
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Saturn and its rings",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>One day on Saturn lasts {{6}} hours.</p><p>Most ring particles consist of ice and {{7}}.</p><p>The gap between Rings A and B is the {{8}}.</p><p>The planet’s average {{9}} is lower than water’s.</p>",
            "answers": {
              "6": [
                "10.7"
              ],
              "7": [
                "rock"
              ],
              "8": [
                "Cassini Division"
              ],
              "9": [
                "density"
              ]
            },
            "explain": {
              "6": "Đoạn C: “only 10.7 hours”.",
              "7": "Đoạn E: “chunks of ice and rock”.",
              "8": "Đoạn F: “called the Cassini Division”.",
              "9": "Đoạn H: “average density that is less than water”."
            }
          },
          {
            "type": "short",
            "kind": "gap",
            "range": [
              10,
              13
            ],
            "instruction": "Complete the answers. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Which moon has methane lakes? {{10}}</p><p>Which moon produces jets of water? {{11}}</p><p>Which is the outermost ring in the sequence ending after G? {{12}}</p><p>Name one of the two main gases in Saturn. {{13}}</p>",
            "answers": {
              "10": [
                "Titan"
              ],
              "11": [
                "Enceladus"
              ],
              "12": [
                "E"
              ],
              "13": [
                "hydrogen",
                "helium"
              ]
            },
            "explain": {
              "10": "Đoạn A: “methane lakes on smoggy Titan”.",
              "11": "Đoạn A: “jets of water that spray from Saturn's moon Enceladus”.",
              "12": "Đoạn G: “finally, the E ring”.",
              "13": "Đoạn A: “hydrogen and helium”."
            }
          }
        ],
        "vocab": [
          {
            "word": "planet",
            "ipa": "/ˈplænɪt/",
            "pos": "n.",
            "vi": "hành tinh",
            "band": "7.0",
            "example": "Saturn is not the only planet to have rings, but none are as spectacular or as complex as Saturn's.",
            "id": "planet",
            "topic": "science"
          },
          {
            "word": "solar",
            "ipa": "/ˈsəʊlə/",
            "pos": "adj.",
            "vi": "thuộc Mặt Trời",
            "band": "7.0",
            "example": "Saturn has the second-shortest day in the solar system.",
            "id": "solar",
            "topic": "science"
          },
          {
            "word": "surface",
            "ipa": "/ˈsɜːfɪs/",
            "pos": "n.",
            "vi": "bề mặt",
            "band": "7.0",
            "example": "From the haze-shrouded surface of Titan to crater-riddled Phoebe, each of Saturn's moons tells another piece of the story surrounding the Saturn system.",
            "id": "surface",
            "topic": "science"
          },
          {
            "word": "orbit",
            "ipa": "/ˈɔːbɪt/",
            "pos": "n./v.",
            "vi": "quỹ đạo; quay quanh",
            "band": "7.0",
            "example": "One day on Saturn takes only 10.7 hours (the time it takes for Saturn to rotate or spin around once), and Saturn makes a complete orbit around the Sun (a year in Saturnian time) in about 29.4 Earth years (10,756 Earth days).",
            "id": "orbit",
            "topic": "science"
          },
          {
            "word": "axis",
            "ipa": "/ˈæksɪs/",
            "pos": "n.",
            "vi": "trục",
            "band": "7.0",
            "example": "Its axis is tilted by 26.73 degrees with respect to its orbit around the Sun, which is similar to Earth's 23.5-degree tilt.",
            "id": "axis",
            "topic": "science"
          },
          {
            "word": "core",
            "ipa": "/kɔː/",
            "pos": "n.",
            "vi": "lõi",
            "band": "7.0",
            "example": "At Saturn's center is a dense core of metals like iron and nickel surrounded by rocky material and other compounds solidified by intense pressure and heat.",
            "id": "core",
            "topic": "science"
          },
          {
            "word": "gravity",
            "ipa": "/ˈɡrævəti/",
            "pos": "n.",
            "vi": "lực hấp dẫn",
            "band": "7.0",
            "example": "Saturn's rings are thought to be pieces of comets, asteroids, or shattered moons that broke up before they reached the planet, torn apart by Saturn's powerful gravity.",
            "id": "gravity",
            "topic": "science"
          },
          {
            "word": "temperature",
            "ipa": "/ˈtemprətʃə/",
            "pos": "n.",
            "vi": "nhiệt độ",
            "band": "7.0",
            "example": "The temperatures, pressures, and materials that characterize this planet are most likely too extreme and volatile for organisms to adapt to.",
            "id": "temperature",
            "topic": "science"
          },
          {
            "word": "particle",
            "ipa": "/ˈpɑːtɪkəl/",
            "pos": "n.",
            "vi": "hạt nhỏ",
            "band": "7.0",
            "example": "The ring particles mostly range from tiny, dust-sized icy grains to chunks as big as a house.",
            "id": "particle",
            "topic": "science"
          },
          {
            "word": "liquid",
            "ipa": "/ˈlɪkwɪd/",
            "pos": "n./adj.",
            "vi": "chất lỏng; dạng lỏng",
            "band": "7.0",
            "example": "It is enveloped by liquid metallic hydrogen inside a layer of liquid hydrogen –similar to Jupiter's core but considerably smaller.",
            "id": "liquid",
            "topic": "science"
          },
          {
            "word": "satellite",
            "ipa": "/ˈsætəlaɪt/",
            "pos": "n.",
            "vi": "vệ tinh",
            "band": "7.0",
            "example": "Satellites like Enceladus and Titan, home to internal oceans, could possibly support life.",
            "id": "satellite",
            "topic": "science"
          },
          {
            "word": "dense",
            "ipa": "/dens/",
            "pos": "adj.",
            "vi": "dày đặc",
            "band": "7.0",
            "example": "At Saturn's center is a dense core of metals like iron and nickel surrounded by rocky material and other compounds solidified by intense pressure and heat.",
            "id": "dense",
            "topic": "science"
          },
          {
            "word": "metallic",
            "ipa": "/məˈtælɪk/",
            "pos": "adj.",
            "vi": "thuộc kim loại",
            "band": "7.0",
            "example": "It is enveloped by liquid metallic hydrogen inside a layer of liquid hydrogen –similar to Jupiter's core but considerably smaller.",
            "id": "metallic",
            "topic": "science"
          },
          {
            "word": "hydrogen",
            "ipa": "/ˈhaɪdrədʒən/",
            "pos": "n.",
            "vi": "hiđrô",
            "band": "7.0",
            "example": "Like fellow gas giant Jupiter, Saturn is a massive ball made mostly of hydrogen and helium.",
            "id": "hydrogen",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R9-P2",
        "part": 2,
        "title": "A Museum of Working Lives",
        "topic": "culture",
        "paragraphs": [
          {
            "label": "A",
            "text": "An overmastering desire to reveal the humbler immigrant parents to their own children lay at the base of what has come to be called the Hull-House Labor Museum. This was first suggested to my mind one early spring day when I saw an old Italian woman, her distaff against her homesick face, patiently spinning a thread by the simple stick spindle so reminiscent of all southern Europe. I was walking down Polk Street, perturbed in spirit, because it seemed so difficult to come into genuine relations with the Italian women and because they themselves so often lost their hold upon their Americanized children."
          },
          {
            "label": "B",
            "text": "It seemed to me that Hull-House ought to be able to devise some educational enterprise which should build a bridge between European and American experiences in such wise as to give them both more meaning and a sense of relation. I meditated that perhaps the power to see life as a whole is more needed in the immigrant quarter of a large city than anywhere else, and that the lack of this power is the most fruitful source of misunderstanding between European immigrants and their children, as it is between them and their American neighbors; and why should that chasm between fathers and sons, yawning at the feet of each generation, be made so unnecessarily cruel and impassable to these bewildered immigrants?"
          },
          {
            "label": "C",
            "text": "Suddenly I looked up and saw the old woman with her distaff, sitting in the sun on the steps of a tenement house. She might have served as a model for one of Michelangelo's Fates, but her face brightened as I passed and, holding up her spindle for me to see, she called out that when she had spun a little more yarn, she would knit a pair of stockings for her goddaughter. The occupation of the old woman gave me the clue that was needed. Could we not interest the young people working in the neighborhood factories in these older forms of industry, so that, through their own parents and grandparents, they would find a dramatic representation of the inherited resources of their daily occupation."
          },
          {
            "label": "D",
            "text": "If these young people could actually see that the complicated machinery of the factory had been evolved from simple tools, they might at least make a beginning toward that education which Dr. Dewey defines as \"a continuing reconstruction of experience.\" They might also lay a foundation for reverence of the past which Goethe declares to be the basis of all sound progress. My exciting walk on Polk Street was followed by many talks with Dr. Dewey and with one of the teachers in his school who was a resident at Hull-House."
          },
          {
            "label": "E",
            "text": "Within a month a room was fitted up to which we might invite those of our neighbors who were possessed of old crafts and who were eager to use them. We found in the immediate neighborhood at least four varieties of these most primitive methods of spinning and three distinct variations of the same spindle in connection with wheels. It was possible to put these seven into historic sequence and order and to connect the whole with the present method of factory spinning. The same thing was done for weaving, and on every Saturday evening a little exhibit was made of these various forms of labor in the textile industry."
          },
          {
            "label": "F",
            "text": "Within one room a Syrian woman, a Greek, an Italian, a Russian, and an Irishwoman enabled even the most casual observer to see that there is no break in orderly evolution if we look at history from the industrial standpoint; that industry develops similarly and peacefully year by year among the workers of each nation, heedless of differences in language, religion, and political experiences. And then we grew ambitious and arranged lectures upon industrial history. I remember that after an interesting lecture upon the industrial revolution in England and a portrayal of the appalling conditions throughout the weaving districts of the north, which resulted from the hasty gathering of the weavers into the new towns, a Russian tailor in the audience was moved to make a speech."
          },
          {
            "label": "G",
            "text": "He suggested that whereas time had done much to alleviate the first difficulties in the transition of weaving from hand work to steam power, that in the application of steam to sewing we are still in our first stages, illustrated by the isolated woman who tries to support herself by hand needlework at home until driven out by starvation, as many of the hand weavers had been. The historical analogy seemed to bring a certain comfort to the tailor, as did a chart upon the wall showing the infinitesimal amount of time that steam had been applied to manufacturing processes compared to the centuries of hand labor."
          },
          {
            "label": "H",
            "text": "Human progress is slow and perhaps never more cruel than in the advance of industry, but is not the worker comforted by knowing that other historical periods have existed similar to the one in which he finds himself, and that the readjustment may be shortened and alleviated by judicious action; and is he not entitled to the solace which an artistic portrayal of the situation might give him?"
          }
        ],
        "provenance": {
          "kind": "public-domain-excerpt",
          "publisher": "Jane Addams — Twenty Years at Hull-House (1910)",
          "url": "https://www.gutenberg.org/cache/epub/1325/pg1325-images.html",
          "rightsUrl": "https://www.gutenberg.org/policy/license.html",
          "note": "Trích văn bản lịch sử thuộc phạm vi công cộng: Jane Addams, Twenty Years at Hull-House (1910); giữ ngôn ngữ và góc nhìn thời kỳ đó, chia lại đoạn A–H. Dùng để luyện đọc hiểu, không trình bày như kiến thức khoa học hoặc quan điểm hiện hành. Câu hỏi và lời giải do app biên soạn. Nguồn số hóa có kèm giấy phép Project Gutenberg."
        },
        "intro": "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        "groups": [
          {
            "type": "headings",
            "kind": "match",
            "range": [
              14,
              17
            ],
            "instruction": "Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.",
            "allowReuse": false,
            "options": [
              {
                "key": "i",
                "text": "Replacing crafts with imported machines"
              },
              {
                "key": "ii",
                "text": "An educational argument and its supporters"
              },
              {
                "key": "iii",
                "text": "A need to connect two generations"
              },
              {
                "key": "iv",
                "text": "The financial failure of a museum"
              },
              {
                "key": "v",
                "text": "An old craft offers an educational clue"
              },
              {
                "key": "vi",
                "text": "A spinning woman inspires a museum"
              }
            ],
            "questions": [
              {
                "n": 14,
                "text": "Paragraph A",
                "answer": "vi",
                "explain": "Đoạn A: “an old Italian woman”. Hình ảnh người phụ nữ xe sợi khơi nguồn ý tưởng bảo tàng."
              },
              {
                "n": 15,
                "text": "Paragraph B",
                "answer": "iii",
                "explain": "Đoạn B: “build a bridge between European and American experiences”. Đề xuất giáo dục nhằm nối trải nghiệm của cha mẹ nhập cư và con cái."
              },
              {
                "n": 16,
                "text": "Paragraph C",
                "answer": "v",
                "explain": "Đoạn C: “gave me the clue that was needed”. Nghề thủ công là manh mối giúp kết nối lao động nhà máy với di sản gia đình."
              },
              {
                "n": 17,
                "text": "Paragraph D",
                "answer": "ii",
                "explain": "Đoạn D: “many talks with Dr. Dewey”. Đoạn đưa cơ sở giáo dục và những người tham gia phát triển ý tưởng."
              }
            ]
          },
          {
            "type": "info",
            "kind": "match",
            "range": [
              18,
              20
            ],
            "instruction": "Which paragraph contains the following information? You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Paragraph A"
              },
              {
                "key": "B",
                "text": "Paragraph B"
              },
              {
                "key": "C",
                "text": "Paragraph C"
              },
              {
                "key": "D",
                "text": "Paragraph D"
              },
              {
                "key": "E",
                "text": "Paragraph E"
              },
              {
                "key": "F",
                "text": "Paragraph F"
              },
              {
                "key": "G",
                "text": "Paragraph G"
              },
              {
                "key": "H",
                "text": "Paragraph H"
              }
            ],
            "questions": [
              {
                "n": 18,
                "text": "The regular evening on which demonstrations took place",
                "answer": "E",
                "explain": "Đoạn E: “every Saturday evening”."
              },
              {
                "n": 19,
                "text": "A description of craftspeople from several national backgrounds",
                "answer": "F",
                "explain": "Đoạn F: “a Syrian woman”."
              },
              {
                "n": 20,
                "text": "A comparison between the historical transitions of weaving and sewing",
                "answer": "G",
                "explain": "Đoạn G: “application of steam to sewing”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              21,
              23
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Four spinning methods and three spindle variations made a sequence of {{21}} examples.</p><p>The woman intended to knit {{22}} for her goddaughter.</p><p>The audience member who compared industrial transitions was a Russian {{23}}.</p>",
            "answers": {
              "21": [
                "seven"
              ],
              "22": [
                "stockings"
              ],
              "23": [
                "tailor"
              ]
            },
            "explain": {
              "21": "Đoạn E: “these seven into historic sequence”.",
              "22": "Đoạn C: “a pair of stockings”.",
              "23": "Đoạn F: “a Russian tailor”."
            }
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              24,
              26
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 24,
                "text": "What was a central aim of the museum?",
                "options": [
                  "A To replace every modern factory",
                  "B To sell imported textiles",
                  "C To help children understand their parents’ inherited skills"
                ],
                "answer": "C",
                "explain": "Đoạn C: “through their own parents and grandparents”."
              },
              {
                "n": 25,
                "text": "How were old methods displayed?",
                "options": [
                  "A In a historical sequence connected to factory spinning",
                  "B In order of the demonstrators’ income",
                  "C As unrelated curiosities without explanation"
                ],
                "answer": "A",
                "explain": "Đoạn E: “connect the whole with the present method”."
              },
              {
                "n": 26,
                "text": "What comfort might industrial history offer workers?",
                "options": [
                  "A Proof that difficult adjustments never happen",
                  "B Recognition of similar earlier transitions and possible action",
                  "C A promise that all work will disappear immediately"
                ],
                "answer": "B",
                "explain": "Đoạn H: “readjustment may be shortened and alleviated”."
              }
            ]
          }
        ],
        "vocab": [
          {
            "word": "occupation",
            "ipa": "/ˌɒkjəˈpeɪʃən/",
            "pos": "n.",
            "vi": "nghề nghiệp; công việc",
            "band": "7.0",
            "example": "The occupation of the old woman gave me the clue that was needed.",
            "id": "occupation",
            "topic": "culture"
          },
          {
            "word": "standpoint",
            "ipa": "/ˈstændpɔɪnt/",
            "pos": "n.",
            "vi": "góc nhìn",
            "band": "7.0",
            "example": "Within one room a Syrian woman, a Greek, an Italian, a Russian, and an Irishwoman enabled even the most casual observer to see that there is no break in orderly evolution if we look at history from the industrial standpoint; that industry develops similarly and peacefully year by year among the workers of each nation, heedless of differences in language, religion, and political experiences.",
            "id": "standpoint",
            "topic": "culture"
          },
          {
            "word": "immigrant",
            "ipa": "/ˈɪmɪɡrənt/",
            "pos": "n.",
            "vi": "người nhập cư",
            "band": "7.0",
            "example": "An overmastering desire to reveal the humbler immigrant parents to their own children lay at the base of what has come to be called the Hull-House Labor Museum.",
            "id": "immigrant",
            "topic": "culture"
          },
          {
            "word": "distaff",
            "ipa": "/ˈdɪstɑːf/",
            "pos": "n.",
            "vi": "cọc giữ xơ để xe sợi",
            "band": "7.0",
            "example": "This was first suggested to my mind one early spring day when I saw an old Italian woman, her distaff against her homesick face, patiently spinning a thread by the simple stick spindle so reminiscent of all southern Europe.",
            "id": "distaff",
            "topic": "culture"
          },
          {
            "word": "spindle",
            "ipa": "/ˈspɪndəl/",
            "pos": "n.",
            "vi": "con quay xe sợi",
            "band": "7.0",
            "example": "This was first suggested to my mind one early spring day when I saw an old Italian woman, her distaff against her homesick face, patiently spinning a thread by the simple stick spindle so reminiscent of all southern Europe.",
            "id": "spindle",
            "topic": "culture"
          },
          {
            "word": "enterprise",
            "ipa": "/ˈentəpraɪz/",
            "pos": "n.",
            "vi": "dự án; hoạt động có tổ chức",
            "band": "7.0",
            "example": "It seemed to me that Hull-House ought to be able to devise some educational enterprise which should build a bridge between European and American experiences in such wise as to give them both more meaning and a sense of relation.",
            "id": "enterprise",
            "topic": "culture"
          },
          {
            "word": "reconstruction",
            "ipa": "/ˌriːkənˈstrʌkʃən/",
            "pos": "n.",
            "vi": "sự tái dựng",
            "band": "7.0",
            "example": "Dewey defines as \"a continuing reconstruction of experience.\" They might also lay a foundation for reverence of the past which Goethe declares to be the basis of all sound progress.",
            "id": "reconstruction",
            "topic": "culture"
          },
          {
            "word": "reverence",
            "ipa": "/ˈrevərəns/",
            "pos": "n.",
            "vi": "lòng tôn kính",
            "band": "7.0",
            "example": "Dewey defines as \"a continuing reconstruction of experience.\" They might also lay a foundation for reverence of the past which Goethe declares to be the basis of all sound progress.",
            "id": "reverence",
            "topic": "culture"
          },
          {
            "word": "primitive",
            "ipa": "/ˈprɪmətɪv/",
            "pos": "adj.",
            "vi": "sơ khai",
            "band": "7.0",
            "example": "We found in the immediate neighborhood at least four varieties of these most primitive methods of spinning and three distinct variations of the same spindle in connection with wheels.",
            "id": "primitive",
            "topic": "culture"
          },
          {
            "word": "sequence",
            "ipa": "/ˈsiːkwəns/",
            "pos": "n.",
            "vi": "trình tự",
            "band": "7.0",
            "example": "It was possible to put these seven into historic sequence and order and to connect the whole with the present method of factory spinning.",
            "id": "sequence",
            "topic": "culture"
          },
          {
            "word": "textile",
            "ipa": "/ˈtekstaɪl/",
            "pos": "n./adj.",
            "vi": "hàng dệt; thuộc dệt may",
            "band": "7.0",
            "example": "The same thing was done for weaving, and on every Saturday evening a little exhibit was made of these various forms of labor in the textile industry.",
            "id": "textile",
            "topic": "culture"
          },
          {
            "word": "portrayal",
            "ipa": "/pɔːˈtreɪəl/",
            "pos": "n.",
            "vi": "sự mô tả",
            "band": "7.0",
            "example": "I remember that after an interesting lecture upon the industrial revolution in England and a portrayal of the appalling conditions throughout the weaving districts of the north, which resulted from the hasty gathering of the weavers into the new towns, a Russian tailor in the audience was moved to make a speech.",
            "id": "portrayal",
            "topic": "culture"
          },
          {
            "word": "transition",
            "ipa": "/trænˈzɪʃən/",
            "pos": "n.",
            "vi": "sự chuyển đổi",
            "band": "7.0",
            "example": "He suggested that whereas time had done much to alleviate the first difficulties in the transition of weaving from hand work to steam power, that in the application of steam to sewing we are still in our first stages, illustrated by the isolated woman who tries to support herself by hand needlework at home until driven out by starvation, as many of the hand weavers had been.",
            "id": "transition",
            "topic": "culture"
          },
          {
            "word": "alleviate",
            "ipa": "/əˈliːvieɪt/",
            "pos": "v.",
            "vi": "làm giảm nhẹ",
            "band": "7.0",
            "example": "He suggested that whereas time had done much to alleviate the first difficulties in the transition of weaving from hand work to steam power, that in the application of steam to sewing we are still in our first stages, illustrated by the isolated woman who tries to support herself by hand needlework at home until driven out by starvation, as many of the hand weavers had been.",
            "id": "alleviate",
            "topic": "culture"
          }
        ]
      },
      {
        "id": "R9-P3",
        "title": "The Information a Food Label Cannot Supply",
        "topic": "food",
        "paragraphs": [
          {
            "label": "A",
            "text": "Food labels organise information at the moment of purchase, but the decisions they are intended to support extend beyond the shop. A package may give a clear account of ingredients while telling a household little about the time needed to prepare a meal or the likelihood that part of it will be wasted. This does not make the label useless. It means that the usefulness of information depends on the question a purchaser is trying to answer. A single symbol cannot represent every nutritional, environmental and practical consideration. Evaluating a label requires identifying its intended function before judging how much behaviour it has changed."
          },
          {
            "label": "B",
            "text": "The fictional Seabrook Market tested shelf notices that explained portion sizes using familiar household measures. Customers had previously compared package totals without noticing that the packages contained different numbers of servings. The notices helped them ask a more consistent question, but staff avoided claiming that every family should consume the same amount. The purpose was comparability, not a prescription for individual diets. Interviews after shopping revealed whether people could explain the unit being used. Sales figures alone would have been difficult to interpret, since price promotions and changing stock could alter purchases without any improvement in understanding."
          },
          {
            "label": "C",
            "text": "In fictional Hillcross, a group of small producers developed a common label for how ingredients were sourced. They discovered that a shared symbol required a shared definition. Some had counted only the place where a food was processed, while others considered where the principal ingredients were grown. The revised scheme published its boundary and kept exceptions visible. It did not turn every environmental consequence into a single number. Instead, it made one claim that could be checked. The exercise showed that a familiar-looking mark becomes meaningful through the rules behind it, rather than through attractive colours or the confidence with which it is displayed."
          },
          {
            "label": "D",
            "text": "The imaginary college kitchen at Elmport focused on food discarded after meals. Cooks placed a short storage reminder beside items frequently taken away for later use. They then examined whether the reminders matched the containers and facilities students actually had. A suggestion requiring a large freezer was irrelevant to someone living in a room with only a small refrigerator. Staff revised the information after discussing these constraints. Here the difficulty was not simply a lack of facts. Advice had assumed resources that some intended users did not possess, so practical access became part of the communication problem."
          },
          {
            "label": "E",
            "text": "These examples distinguish recognition from understanding. A shopper may recognise a logo and associate it with a desirable quality without knowing what has been verified. Familiarity is useful, but it can also allow one narrow claim to acquire an unjustified halo. A label about sourcing does not automatically establish superior nutrition, and an account of ingredients does not establish that a product suits every household's routine. Good communication makes the scope of a claim easy to recover. It should remain possible for an interested person to find the definition without having to interpret promotional language or guess which parts are independently checked."
          },
          {
            "label": "F",
            "text": "The pressure to simplify is real. Purchasers cannot investigate every product in depth during an ordinary shopping trip. Long explanations may be accurate yet impractical at the shelf. A layered approach can address this tension: a concise statement supports an immediate comparison, while a fuller account explains the method and limitations. The layers must remain consistent. A bold front label should not promise an outcome that the detailed wording quietly withdraws. Nor should a website be the only route to essential clarification when some customers lack a suitable device or reliable connection while shopping."
          },
          {
            "label": "G",
            "text": "Measuring success demands a similar distinction. An increase in sales may be commercially welcome without demonstrating that people made better-informed choices. Conversely, a label can improve understanding without shifting purchases when budgets leave little flexibility. Useful assessment might ask purchasers to compare two examples and explain their reasoning, then examine how prices and availability constrain action. This approach avoids blaming individuals for failing to act on information they understood but could not use. It also reveals whether a design helps only confident readers, leaving other customers dependent on assumptions the scheme was meant to correct."
          },
          {
            "label": "H",
            "text": "A label is therefore one element in a broader setting of choice. Its value lies in making a defined question easier to answer accurately, rather than carrying the full burden of improving diets or production systems. Clear boundaries, practical examples and accessible explanations strengthen that contribution. They also make disagreement more productive, because people can identify what a symbol does and does not establish. Information should be judged alongside the conditions under which it is used. A well-designed label can support a decision, but it cannot supply the money, equipment or opportunities that the decision may require."
          }
        ],
        "part": 3,
        "provenance": {
          "kind": "original",
          "note": "Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức."
        },
        "intro": "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        "groups": [
          {
            "type": "features",
            "kind": "match",
            "range": [
              27,
              29
            ],
            "instruction": "Match each statement with the correct illustrative case. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Seabrook Market"
              },
              {
                "key": "B",
                "text": "Hillcross"
              },
              {
                "key": "C",
                "text": "Elmport"
              }
            ],
            "questions": [
              {
                "n": 27,
                "text": "A common mark required agreement on what sourcing meant.",
                "answer": "B",
                "explain": "Đoạn C: “a shared symbol required a shared definition”."
              },
              {
                "n": 28,
                "text": "Advice was changed because some users lacked the assumed equipment.",
                "answer": "C",
                "explain": "Đoạn D: “resources that some intended users did not possess”."
              },
              {
                "n": 29,
                "text": "Customers were helped to compare servings using familiar measures.",
                "answer": "A",
                "explain": "Đoạn B: “portion sizes using familiar household measures”."
              }
            ]
          },
          {
            "type": "ynng",
            "kind": "tfng",
            "variant": "ynng",
            "range": [
              30,
              33
            ],
            "instruction": "Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 30,
                "text": "One symbol can fully represent every relevant consideration.",
                "answer": "NO",
                "explain": "Đoạn A: “A single symbol cannot represent every”."
              },
              {
                "n": 31,
                "text": "Knowing a logo is different from understanding what it verifies.",
                "answer": "YES",
                "explain": "Đoạn E: “recognition from understanding”."
              },
              {
                "n": 32,
                "text": "Better understanding must always lead to different purchases.",
                "answer": "NO",
                "explain": "Đoạn G: “improve understanding without shifting purchases”."
              },
              {
                "n": 33,
                "text": "Most shoppers spend more time reading labels than comparing prices.",
                "answer": "NOT GIVEN",
                "explain": "Không so sánh thời gian đọc nhãn với thời gian so giá."
              }
            ]
          },
          {
            "type": "endings",
            "kind": "match",
            "range": [
              34,
              36
            ],
            "instruction": "Complete each sentence with the correct ending, A–F.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "can be supported by a fuller explanation elsewhere."
              },
              {
                "key": "B",
                "text": "should be interpreted without considering prices."
              },
              {
                "key": "C",
                "text": "can prevent someone from acting on understood information."
              },
              {
                "key": "D",
                "text": "guarantees identical outcomes for all households."
              },
              {
                "key": "E",
                "text": "establishes that every purchaser understood the label."
              },
              {
                "key": "F",
                "text": "does not by itself prove better-informed choices."
              }
            ],
            "questions": [
              {
                "n": 34,
                "text": "A concise statement at the shelf",
                "answer": "A",
                "explain": "Đoạn F: “a fuller account explains the method”."
              },
              {
                "n": 35,
                "text": "An increase in sales",
                "answer": "F",
                "explain": "Đoạn G: “without demonstrating that people made better-informed choices”."
              },
              {
                "n": 36,
                "text": "A lower household budget",
                "answer": "C",
                "explain": "Đoạn G: “budgets leave little flexibility”."
              }
            ]
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              37,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Before evaluating a label, establish its intended {{37}}.</p><p>The Hillcross scheme published the {{38}} of its claim.</p><p>Different layers of explanation must remain {{39}}.</p><p>Useful information cannot supply the money or {{40}} needed for a choice.</p>",
            "answers": {
              "37": [
                "function"
              ],
              "38": [
                "boundary"
              ],
              "39": [
                "consistent"
              ],
              "40": [
                "equipment"
              ]
            },
            "explain": {
              "37": "Đoạn A: “intended function”.",
              "38": "Đoạn C: “published its boundary”.",
              "39": "Đoạn F: “layers must remain consistent”.",
              "40": "Đoạn H: “money, equipment or opportunities”."
            }
          }
        ],
        "vocab": [
          {
            "word": "pressure",
            "ipa": "/ˈpreʃə/",
            "pos": "n.",
            "vi": "áp suất; áp lực",
            "band": "7.0",
            "example": "The pressure to simplify is real.",
            "id": "pressure",
            "topic": "food"
          },
          {
            "word": "flexibility",
            "ipa": "/ˌfleksəˈbɪləti/",
            "pos": "n.",
            "vi": "tính linh hoạt",
            "band": "7.0",
            "example": "Conversely, a label can improve understanding without shifting purchases when budgets leave little flexibility.",
            "id": "flexibility",
            "topic": "food"
          },
          {
            "word": "constraint",
            "ipa": "/kənˈstreɪnt/",
            "pos": "n.",
            "vi": "hạn chế; ràng buộc",
            "band": "7.0",
            "example": "Staff revised the information after discussing these constraints.",
            "id": "constraint",
            "topic": "food"
          },
          {
            "word": "accessible",
            "ipa": "/əkˈsesəbəl/",
            "pos": "adj.",
            "vi": "có thể tiếp cận",
            "band": "7.0",
            "example": "Clear boundaries, practical examples and accessible explanations strengthen that contribution.",
            "id": "accessible",
            "topic": "food"
          },
          {
            "word": "resource",
            "ipa": "/rɪˈsɔːs/",
            "pos": "n.",
            "vi": "nguồn lực",
            "band": "7.0",
            "example": "Advice had assumed resources that some intended users did not possess, so practical access became part of the communication problem.",
            "id": "resource",
            "topic": "food"
          },
          {
            "word": "consequence",
            "ipa": "/ˈkɒnsɪkwəns/",
            "pos": "n.",
            "vi": "hệ quả",
            "band": "7.0",
            "example": "It did not turn every environmental consequence into a single number.",
            "id": "consequence",
            "topic": "food"
          },
          {
            "word": "clarification",
            "ipa": "/ˌklærɪfɪˈkeɪʃən/",
            "pos": "n.",
            "vi": "sự làm rõ",
            "band": "7.0",
            "example": "Nor should a website be the only route to essential clarification when some customers lack a suitable device or reliable connection while shopping.",
            "id": "clarification",
            "topic": "food"
          },
          {
            "word": "boundary",
            "ipa": "/ˈbaʊndəri/",
            "pos": "n.",
            "vi": "ranh giới; phạm vi",
            "band": "7.0",
            "example": "The revised scheme published its boundary and kept exceptions visible.",
            "id": "boundary",
            "topic": "food"
          },
          {
            "word": "promotion",
            "ipa": "/prəˈməʊʃən/",
            "pos": "n.",
            "vi": "quảng bá; khuyến mãi",
            "band": "7.0",
            "example": "Sales figures alone would have been difficult to interpret, since price promotions and changing stock could alter purchases without any improvement in understanding.",
            "id": "promotion",
            "topic": "food"
          },
          {
            "word": "halo",
            "ipa": "/ˈheɪləʊ/",
            "pos": "n.",
            "vi": "hào quang; ấn tượng tốt lan rộng",
            "band": "7.0",
            "example": "Familiarity is useful, but it can also allow one narrow claim to acquire an unjustified halo.",
            "id": "halo",
            "topic": "food"
          },
          {
            "id": "discard",
            "word": "discard",
            "ipa": "/dɪˈskɑːd/",
            "pos": "v.",
            "band": "7.0",
            "vi": "vứt bỏ, loại bỏ",
            "example": "The imaginary college kitchen at Elmport focused on food discarded after meals.",
            "topic": "food"
          },
          {
            "id": "productive",
            "word": "productive",
            "ipa": "/prəˈdʌktɪv/",
            "pos": "adj.",
            "band": "7.0",
            "vi": "có năng suất, cho sản lượng",
            "example": "They also make disagreement more productive, because people can identify what a symbol does and does not establish.",
            "topic": "food"
          },
          {
            "id": "consistent",
            "word": "consistent",
            "ipa": "/kənˈsɪstənt/",
            "pos": "adj.",
            "band": "7.0",
            "vi": "nhất quán",
            "example": "The notices helped them ask a more consistent question, but staff avoided claiming that every family should consume the same amount.",
            "topic": "food"
          },
          {
            "id": "assessment",
            "word": "assessment",
            "ipa": "/əˈsesmənt/",
            "pos": "n.",
            "band": "7.0",
            "vi": "sự đánh giá",
            "example": "Useful assessment might ask purchasers to compare two examples and explain their reasoning, then examine how prices and availability constrain action.",
            "topic": "food"
          }
        ]
      }
    ]
  },
  {
    "id": "R10",
    "title": "Practice Test 10 — The Moon, Literature & Waiting",
    "source": "Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật",
    "passages": [
      {
        "id": "R10-P1",
        "part": 1,
        "title": "The Moon and Its Origins",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Earth's Moon records evidence of our solar system's history in the form of impact craters , cooled lava landforms , ancient ice deposits , and more. If you set a single green pea next to a U.S. nickel, you'd have a pretty good idea of the size of the Moon compared to Earth. The Moon is tidally locked to Earth: it rotates once during each orbit, so observers on Earth see the same lunar hemisphere. Humans didn't see the lunar far side until a Soviet spacecraft flew past in 1959."
          },
          {
            "label": "B",
            "text": "More than 105 robotic spacecraft have been launched to explore the Moon. It is the only celestial body beyond Earth – so far – visited by human beings. Our Moon shares a name with all moons simply because people didn't know other moons existed until Galileo Galilei discovered four moons orbiting Jupiter in 1610. In Latin, the Moon was called Luna, which is the main adjective for all things Moon-related: lunar. The many missions that have explored the Moon have found no evidence to suggest it has its own living things."
          },
          {
            "label": "C",
            "text": "However, the Moon could be the site of future colonization by humans. The discovery that the Moon harbors water ice , and that the highest concentrations occur within darkened craters at the poles, makes the Moon a little more hospitable for future human colonists. With a radius of about 1,080 miles (1,740 kilometers), the Moon is less than a third of the width of Earth. If Earth were the size of a nickel, the Moon would be about as big as a coffee bean. The Moon is rotating at the same rate that it revolves around Earth (called synchronous rotation ), so the same hemisphere faces Earth all the time."
          },
          {
            "label": "D",
            "text": "Some people call the far side – the hemisphere we never see from Earth – the \"dark side\", but that's misleading. As the Moon orbits Earth, different parts are in sunlight or darkness at different times. The changing illumination is why, from our perspective, the Moon goes through phases . During a \"full moon,\" the hemisphere of the Moon we can see from Earth is fully illuminated by the Sun. And a \"new moon\" occurs when the far side of the Moon has full sunlight, and the side facing us is having its night."
          },
          {
            "label": "E",
            "text": "The Moon makes a complete orbit around Earth in 27 Earth days and rotates or spins at that same rate, or in that same amount of time. Because Earth is moving as well – rotating on its axis as it orbits the Sun – from our perspective, the Moon appears to orbit us every 29 days. Scientists think a Mars-sized body struck Earth early in the solar system's history. The resulting debris from both Earth and the impactor accumulated to form our natural satellite 239,000 miles (384,000 kilometers) away. The newly formed Moon was in a molten state, but within about 100 million years, most of the global \"magma ocean\" had crystallized, with less-dense rocks floating upward and eventually forming the lunar crust."
          },
          {
            "label": "F",
            "text": "The Moon’s core is proportionally smaller than other terrestrial bodies' cores. The solid, iron-rich inner core is 149 miles (240 kilometers) in radius. It is surrounded by a liquid iron shell 56 miles (90 kilometers) thick. A partially molten layer surrounds the iron core. The mantle extends from the top of the partially molten layer to the bottom of the Moon's crust. It is most likely made of minerals like olivine and pyroxene, which are made up of magnesium, iron, silicon, and oxygen atoms."
          },
          {
            "label": "G",
            "text": "The crust is about 25 miles (40 kilometers) thick on the Moon’s near-side hemisphere and up to about 37 miles (60 kilometers) thick on the far-side. It is made of oxygen, silicon, magnesium, iron, calcium, and aluminum, with small amounts of titanium, uranium, thorium, potassium, and hydrogen. With too sparse an atmosphere to impede impacts, a steady rain of asteroids, meteoroids, and comets strikes the surface of the Moon, leaving numerous craters behind. Tycho Crater is more than 52 miles (85 kilometers) wide. Over billions of years, these impacts have ground up the surface of the Moon into fragments ranging from huge boulders to powder."
          },
          {
            "label": "H",
            "text": "Nearly the entire Moon is covered by a rubble pile of charcoal-gray, powdery dust, and rocky debris called the lunar regolith. Beneath is a region of fractured bedrock referred to as the megaregolith. The light areas of the Moon are known as the highlands. The dark features, called maria (Latin for seas), are impact basins that were filled with lava between 4.2 and 1.2 billion years ago. These light and dark areas represent rocks of different compositions and ages, which provide evidence for how the early crust may have crystallized from a lunar magma ocean."
          }
        ],
        "provenance": {
          "kind": "public-information-excerpt",
          "publisher": "NASA Science",
          "url": "https://science.nasa.gov/moon/facts/",
          "rightsUrl": "https://www.nasa.gov/nasa-brand-center/images-and-media/",
          "note": "Trích tuyển văn bản giáo dục NASA Science; chia lại đoạn A–H để luyện đọc. Câu hỏi và lời giải do app biên soạn. Không ngụ ý NASA bảo trợ."
        },
        "intro": "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        "groups": [
          {
            "type": "tfng",
            "kind": "tfng",
            "variant": "tfng",
            "range": [
              1,
              5
            ],
            "instruction": "Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 1,
                "text": "Humans saw the far side of the Moon before 1959.",
                "answer": "FALSE",
                "explain": "Đoạn A: “didn't see the lunar far side until”."
              },
              {
                "n": 2,
                "text": "The far side of the Moon is permanently without sunlight.",
                "answer": "FALSE",
                "explain": "Đoạn D: “different parts are in sunlight or darkness”."
              },
              {
                "n": 3,
                "text": "The Moon turns once during each orbit around Earth.",
                "answer": "TRUE",
                "explain": "Đoạn C: “rotating at the same rate”."
              },
              {
                "n": 4,
                "text": "Evidence of native lunar organisms has been found.",
                "answer": "FALSE",
                "explain": "Đoạn B: “no evidence to suggest it has its own living things”."
              },
              {
                "n": 5,
                "text": "The first astronauts on the Moon stayed there for three days.",
                "answer": "NOT GIVEN",
                "explain": "Bài không nêu thời gian lưu lại của nhóm phi hành gia đầu tiên."
              }
            ]
          },
          {
            "type": "note",
            "kind": "gap",
            "range": [
              6,
              9
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Lunar features",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Most water ice is concentrated in dark craters at the {{6}}.</p><p>When the near side is fully lit, the phase is a {{7}}.</p><p>The iron-rich inner core is {{8}}.</p><p>Powder and rocky debris at the surface are called lunar {{9}}.</p>",
            "answers": {
              "6": [
                "poles"
              ],
              "7": [
                "full moon"
              ],
              "8": [
                "solid"
              ],
              "9": [
                "regolith"
              ]
            },
            "explain": {
              "6": "Đoạn C: “craters at the poles”.",
              "7": "Đoạn D: “During a \"full moon”.",
              "8": "Đoạn F: “solid, iron-rich inner core”.",
              "9": "Đoạn H: “called the lunar regolith”."
            }
          },
          {
            "type": "short",
            "kind": "gap",
            "range": [
              10,
              13
            ],
            "instruction": "Complete the answers. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>What is the Latin name from which “lunar” comes? {{10}}</p><p>What are the lighter areas called? {{11}}</p><p>What filled the dark impact basins? {{12}}</p><p>What is the fractured bedrock below the surface debris called? {{13}}</p>",
            "answers": {
              "10": [
                "Luna"
              ],
              "11": [
                "highlands"
              ],
              "12": [
                "lava"
              ],
              "13": [
                "megaregolith"
              ]
            },
            "explain": {
              "10": "Đoạn B: “Moon was called Luna”.",
              "11": "Đoạn H: “known as the highlands”.",
              "12": "Đoạn H: “filled with lava”.",
              "13": "Đoạn H: “referred to as the megaregolith”."
            }
          }
        ],
        "vocab": [
          {
            "word": "solar",
            "ipa": "/ˈsəʊlə/",
            "pos": "adj.",
            "vi": "thuộc Mặt Trời",
            "band": "7.0",
            "example": "Earth's Moon records evidence of our solar system's history in the form of impact craters , cooled lava landforms , ancient ice deposits , and more.",
            "id": "solar",
            "topic": "science"
          },
          {
            "word": "surface",
            "ipa": "/ˈsɜːfɪs/",
            "pos": "n.",
            "vi": "bề mặt",
            "band": "7.0",
            "example": "With too sparse an atmosphere to impede impacts, a steady rain of asteroids, meteoroids, and comets strikes the surface of the Moon, leaving numerous craters behind.",
            "id": "surface",
            "topic": "science"
          },
          {
            "word": "atmosphere",
            "ipa": "/ˈætməsfɪə/",
            "pos": "n.",
            "vi": "khí quyển",
            "band": "7.0",
            "example": "With too sparse an atmosphere to impede impacts, a steady rain of asteroids, meteoroids, and comets strikes the surface of the Moon, leaving numerous craters behind.",
            "id": "atmosphere",
            "topic": "science"
          },
          {
            "word": "orbit",
            "ipa": "/ˈɔːbɪt/",
            "pos": "n./v.",
            "vi": "quỹ đạo; quay quanh",
            "band": "7.0",
            "example": "The Moon is tidally locked to Earth: it rotates once during each orbit, so observers on Earth see the same lunar hemisphere.",
            "id": "orbit",
            "topic": "science"
          },
          {
            "word": "rotation",
            "ipa": "/rəʊˈteɪʃən/",
            "pos": "n.",
            "vi": "sự tự quay",
            "band": "7.0",
            "example": "The Moon is rotating at the same rate that it revolves around Earth (called synchronous rotation ), so the same hemisphere faces Earth all the time.",
            "id": "rotation",
            "topic": "science"
          },
          {
            "word": "axis",
            "ipa": "/ˈæksɪs/",
            "pos": "n.",
            "vi": "trục",
            "band": "7.0",
            "example": "Because Earth is moving as well – rotating on its axis as it orbits the Sun – from our perspective, the Moon appears to orbit us every 29 days.",
            "id": "axis",
            "topic": "science"
          },
          {
            "word": "core",
            "ipa": "/kɔː/",
            "pos": "n.",
            "vi": "lõi",
            "band": "7.0",
            "example": "The Moon’s core is proportionally smaller than other terrestrial bodies' cores.",
            "id": "core",
            "topic": "science"
          },
          {
            "word": "mantle",
            "ipa": "/ˈmæntəl/",
            "pos": "n.",
            "vi": "lớp phủ bên dưới vỏ",
            "band": "7.0",
            "example": "The mantle extends from the top of the partially molten layer to the bottom of the Moon's crust.",
            "id": "mantle",
            "topic": "science"
          },
          {
            "word": "crust",
            "ipa": "/krʌst/",
            "pos": "n.",
            "vi": "lớp vỏ",
            "band": "7.0",
            "example": "The newly formed Moon was in a molten state, but within about 100 million years, most of the global \"magma ocean\" had crystallized, with less-dense rocks floating upward and eventually forming the lunar crust.",
            "id": "crust",
            "topic": "science"
          },
          {
            "word": "radius",
            "ipa": "/ˈreɪdiəs/",
            "pos": "n.",
            "vi": "bán kính",
            "band": "7.0",
            "example": "With a radius of about 1,080 miles (1,740 kilometers), the Moon is less than a third of the width of Earth.",
            "id": "radius",
            "topic": "science"
          },
          {
            "word": "liquid",
            "ipa": "/ˈlɪkwɪd/",
            "pos": "n./adj.",
            "vi": "chất lỏng; dạng lỏng",
            "band": "7.0",
            "example": "It is surrounded by a liquid iron shell 56 miles (90 kilometers) thick.",
            "id": "liquid",
            "topic": "science"
          },
          {
            "word": "satellite",
            "ipa": "/ˈsætəlaɪt/",
            "pos": "n.",
            "vi": "vệ tinh",
            "band": "7.0",
            "example": "The resulting debris from both Earth and the impactor accumulated to form our natural satellite 239,000 miles (384,000 kilometers) away.",
            "id": "satellite",
            "topic": "science"
          },
          {
            "word": "dense",
            "ipa": "/dens/",
            "pos": "adj.",
            "vi": "dày đặc",
            "band": "7.0",
            "example": "The newly formed Moon was in a molten state, but within about 100 million years, most of the global \"magma ocean\" had crystallized, with less-dense rocks floating upward and eventually forming the lunar crust.",
            "id": "dense",
            "topic": "science"
          },
          {
            "word": "hydrogen",
            "ipa": "/ˈhaɪdrədʒən/",
            "pos": "n.",
            "vi": "hiđrô",
            "band": "7.0",
            "example": "It is made of oxygen, silicon, magnesium, iron, calcium, and aluminum, with small amounts of titanium, uranium, thorium, potassium, and hydrogen.",
            "id": "hydrogen",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R10-P2",
        "part": 2,
        "title": "The Demands of Serious Reading",
        "topic": "education",
        "paragraphs": [
          {
            "label": "A",
            "text": "My residence was more favorable, not only to thought, but to serious reading, than a university; and though I was beyond the range of the ordinary circulating library, I had more than ever come within the influence of those books which circulate round the world, whose sentences were first written on bark, and are now merely copied from time to time on to linen paper. Says the poet Mîr Camar Uddîn Mast, “Being seated to run through the region of the spiritual world; I have had this advantage in books."
          },
          {
            "label": "B",
            "text": "To be intoxicated by a single glass of wine; I have experienced this pleasure when I have drunk the liquor of the esoteric doctrines.” I kept Homer’s Iliad on my table through the summer, though I looked at his page only now and then. Incessant labor with my hands, at first, for I had my house to finish and my beans to hoe at the same time, made more study impossible. Yet I sustained myself by the prospect of such reading in future. I read one or two shallow books of travel in the intervals of my work, till that employment made me ashamed of myself, and I asked where it was then that I lived."
          },
          {
            "label": "C",
            "text": "The student may read Homer or Æschylus in the Greek without danger of dissipation or luxuriousness, for it implies that he in some measure emulate their heroes, and consecrate morning hours to their pages. The heroic books, even if printed in the character of our mother tongue, will always be in a language dead to degenerate times; and we must laboriously seek the meaning of each word and line, conjecturing a larger sense than common use permits out of what wisdom and valor and generosity we have. The modern cheap and fertile press, with all its translations, has done little to bring us nearer to the heroic writers of antiquity."
          },
          {
            "label": "D",
            "text": "They seem as solitary, and the letter in which they are printed as rare and curious, as ever. It is worth the expense of youthful days and costly hours, if you learn only some words of an ancient language, which are raised out of the trivialness of the street, to be perpetual suggestions and provocations. It is not in vain that the farmer remembers and repeats the few Latin words which he has heard. Men sometimes speak as if the study of the classics would at length make way for more modern and practical studies; but the adventurous student will always study classics, in whatever language they may be written and however ancient they may be."
          },
          {
            "label": "E",
            "text": "For what are the classics but the noblest recorded thoughts of man? They are the only oracles which are not decayed, and there are such answers to the most modern inquiry in them as Delphi and Dodona never gave. We might as well omit to study Nature because she is old. To read well, that is, to read true books in a true spirit, is a noble exercise, and one that will task the reader more than any exercise which the customs of the day esteem."
          },
          {
            "label": "F",
            "text": "It requires a training such as the athletes underwent, the steady intention almost of the whole life to this object. Books must be read as deliberately and reservedly as they were written. It is not enough even to be able to speak the language of that nation by which they are written, for there is a memorable interval between the spoken and the written language, the language heard and the language read. The one is commonly transitory, a sound, a tongue, a dialect merely, almost brutish, and we learn it unconsciously, like the brutes, of our mothers."
          },
          {
            "label": "G",
            "text": "The other is the maturity and experience of that; if that is our mother tongue, this is our father tongue, a reserved and select expression, too significant to be heard by the ear, which we must be born again in order to speak. The crowds of men who merely spoke the Greek and Latin tongues in the middle ages were not entitled by the accident of birth to read the works of genius written in those languages; for these were not written in that Greek or Latin which they knew, but in the select language of literature."
          },
          {
            "label": "H",
            "text": "They had not learned the nobler dialects of Greece and Rome, but the very materials on which they were written were waste paper to them, and they prized instead a cheap contemporary literature. But when the several nations of Europe had acquired distinct though rude written languages of their own, sufficient for the purposes of their rising literatures, then first learning revived, and scholars were enabled to discern from that remoteness the treasures of antiquity. What the Roman and Grecian multitude could not hear , after the lapse of ages a few scholars read , and a few scholars only are still reading it."
          }
        ],
        "provenance": {
          "kind": "public-domain-excerpt",
          "publisher": "Henry David Thoreau — Walden (1854)",
          "url": "https://www.gutenberg.org/cache/epub/205/pg205-images.html",
          "rightsUrl": "https://www.gutenberg.org/policy/license.html",
          "note": "Trích văn bản lịch sử thuộc phạm vi công cộng: Henry David Thoreau, Walden (1854); giữ ngôn ngữ và góc nhìn thời kỳ đó, chia lại đoạn A–H. Dùng để luyện đọc hiểu, không trình bày như kiến thức khoa học hoặc quan điểm hiện hành. Câu hỏi và lời giải do app biên soạn. Nguồn số hóa có kèm giấy phép Project Gutenberg."
        },
        "intro": "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        "groups": [
          {
            "type": "headings",
            "kind": "match",
            "range": [
              14,
              17
            ],
            "instruction": "Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.",
            "allowReuse": false,
            "options": [
              {
                "key": "i",
                "text": "A location favourable to serious reading"
              },
              {
                "key": "ii",
                "text": "The decline of every European language"
              },
              {
                "key": "iii",
                "text": "The effort required to approach heroic literature"
              },
              {
                "key": "iv",
                "text": "Manual labour delays a reading ambition"
              },
              {
                "key": "v",
                "text": "The enduring value of ancient languages"
              },
              {
                "key": "vi",
                "text": "Reading solely for immediate practical gain"
              }
            ],
            "questions": [
              {
                "n": 14,
                "text": "Paragraph A",
                "answer": "i",
                "explain": "Đoạn A: “more favorable, not only to thought, but to serious reading”. Nơi ở được mô tả là thuận lợi cho suy nghĩ và đọc sâu."
              },
              {
                "n": 15,
                "text": "Paragraph B",
                "answer": "iv",
                "explain": "Đoạn B: “Incessant labor with my hands”. Công việc dựng nhà, trồng đậu khiến dự định đọc phải chờ."
              },
              {
                "n": 16,
                "text": "Paragraph C",
                "answer": "iii",
                "explain": "Đoạn C: “laboriously seek the meaning of each word and line”. Tiếp cận văn học anh hùng đòi hỏi nỗ lực giải nghĩa."
              },
              {
                "n": 17,
                "text": "Paragraph D",
                "answer": "v",
                "explain": "Đoạn D: “some words of an ancient language”. Tác giả bảo vệ giá trị lâu dài của việc học ngôn ngữ và tác phẩm cổ."
              }
            ]
          },
          {
            "type": "info",
            "kind": "match",
            "range": [
              18,
              20
            ],
            "instruction": "Which paragraph contains the following information? You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Paragraph A"
              },
              {
                "key": "B",
                "text": "Paragraph B"
              },
              {
                "key": "C",
                "text": "Paragraph C"
              },
              {
                "key": "D",
                "text": "Paragraph D"
              },
              {
                "key": "E",
                "text": "Paragraph E"
              },
              {
                "key": "F",
                "text": "Paragraph F"
              },
              {
                "key": "G",
                "text": "Paragraph G"
              },
              {
                "key": "H",
                "text": "Paragraph H"
              }
            ],
            "questions": [
              {
                "n": 18,
                "text": "An explicit comparison between reading and demanding physical training",
                "answer": "F",
                "explain": "Đoạn F: “training such as the athletes”."
              },
              {
                "n": 19,
                "text": "A distinction between ordinary speech and literary expression",
                "answer": "G",
                "explain": "Đoạn G: “a reserved and select expression”."
              },
              {
                "n": 20,
                "text": "A description of renewed access to ancient works",
                "answer": "H",
                "explain": "Đoạn H: “learning revived”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              21,
              23
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>The book kept on the writer’s table was Homer’s {{21}}.</p><p>The writer had to finish a house and {{22}} beans.</p><p>Books should be read as deliberately as they were {{23}}.</p>",
            "answers": {
              "21": [
                "Iliad"
              ],
              "22": [
                "hoe"
              ],
              "23": [
                "written"
              ]
            },
            "explain": {
              "21": "Đoạn B: “Homer’s Iliad”.",
              "22": "Đoạn B: “beans to hoe”.",
              "23": "Đoạn F: “as they were written”."
            }
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              24,
              26
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 24,
                "text": "What does Thoreau say about numerous modern translations?",
                "options": [
                  "A They eliminate every difficulty in reading classics",
                  "B They have done little to close the distance to ancient authors",
                  "C They make classical languages worthless"
                ],
                "answer": "B",
                "explain": "Đoạn C: “done little to bring us nearer”."
              },
              {
                "n": 25,
                "text": "Why is knowing a spoken language insufficient?",
                "options": [
                  "A Literary works may employ a distinct, developed language",
                  "B Written works contain no ideas",
                  "C Every great book must be read aloud"
                ],
                "answer": "A",
                "explain": "Đoạn F: “memorable interval between the spoken and the written language”."
              },
              {
                "n": 26,
                "text": "How does he regard replacing classics with practical studies?",
                "options": [
                  "A As the only reasonable educational reform",
                  "B As something that has already happened everywhere",
                  "C As inconsistent with the adventurous student’s continuing interest"
                ],
                "answer": "C",
                "explain": "Đoạn D: “adventurous student will always study classics”."
              }
            ]
          }
        ],
        "vocab": [
          {
            "word": "inquiry",
            "ipa": "/ɪnˈkwaɪəri/",
            "pos": "n.",
            "vi": "sự tìm hiểu",
            "band": "7.0",
            "example": "They are the only oracles which are not decayed, and there are such answers to the most modern inquiry in them as Delphi and Dodona never gave.",
            "id": "inquiry",
            "topic": "education"
          },
          {
            "word": "residence",
            "ipa": "/ˈrezɪdəns/",
            "pos": "n.",
            "vi": "nơi ở",
            "band": "7.0",
            "example": "My residence was more favorable, not only to thought, but to serious reading, than a university; and though I was beyond the range of the ordinary circulating library, I had more than ever come within the influence of those books which circulate round the world, whose sentences were first written on bark, and are now merely copied from time to time on to linen paper.",
            "id": "residence",
            "topic": "education"
          },
          {
            "word": "circulating",
            "ipa": "/ˈsɜːkjəleɪtɪŋ/",
            "pos": "adj.",
            "vi": "lưu hành; cho mượn luân chuyển",
            "band": "7.0",
            "example": "My residence was more favorable, not only to thought, but to serious reading, than a university; and though I was beyond the range of the ordinary circulating library, I had more than ever come within the influence of those books which circulate round the world, whose sentences were first written on bark, and are now merely copied from time to time on to linen paper.",
            "id": "circulating",
            "topic": "education"
          },
          {
            "word": "incessant",
            "ipa": "/ɪnˈsesənt/",
            "pos": "adj.",
            "vi": "không ngừng",
            "band": "7.0",
            "example": "Incessant labor with my hands, at first, for I had my house to finish and my beans to hoe at the same time, made more study impossible.",
            "id": "incessant",
            "topic": "education"
          },
          {
            "word": "prospect",
            "ipa": "/ˈprɒspekt/",
            "pos": "n.",
            "vi": "triển vọng",
            "band": "7.0",
            "example": "Yet I sustained myself by the prospect of such reading in future.",
            "id": "prospect",
            "topic": "education"
          },
          {
            "word": "consecrate",
            "ipa": "/ˈkɒnsɪkreɪt/",
            "pos": "v.",
            "vi": "dành trọn cho mục đích trang trọng",
            "band": "7.0",
            "example": "The student may read Homer or Æschylus in the Greek without danger of dissipation or luxuriousness, for it implies that he in some measure emulate their heroes, and consecrate morning hours to their pages.",
            "id": "consecrate",
            "topic": "education"
          },
          {
            "word": "antiquity",
            "ipa": "/ænˈtɪkwəti/",
            "pos": "n.",
            "vi": "thời cổ đại",
            "band": "7.0",
            "example": "The modern cheap and fertile press, with all its translations, has done little to bring us nearer to the heroic writers of antiquity.",
            "id": "antiquity",
            "topic": "education"
          },
          {
            "word": "perpetual",
            "ipa": "/pəˈpetʃuəl/",
            "pos": "adj.",
            "vi": "liên tục; lâu dài",
            "band": "7.0",
            "example": "It is worth the expense of youthful days and costly hours, if you learn only some words of an ancient language, which are raised out of the trivialness of the street, to be perpetual suggestions and provocations.",
            "id": "perpetual",
            "topic": "education"
          },
          {
            "word": "oracles",
            "ipa": "/ˈɒrəkəlz/",
            "pos": "n.",
            "vi": "lời sấm; nguồn minh triết",
            "band": "7.0",
            "example": "They are the only oracles which are not decayed, and there are such answers to the most modern inquiry in them as Delphi and Dodona never gave.",
            "id": "oracles",
            "topic": "education"
          },
          {
            "word": "deliberately",
            "ipa": "/dɪˈlɪbərətli/",
            "pos": "adv.",
            "vi": "có chủ ý; cẩn trọng",
            "band": "7.0",
            "example": "Books must be read as deliberately and reservedly as they were written.",
            "id": "deliberately",
            "topic": "education"
          },
          {
            "word": "transitory",
            "ipa": "/ˈtrænzətri/",
            "pos": "adj.",
            "vi": "nhất thời",
            "band": "7.0",
            "example": "The one is commonly transitory, a sound, a tongue, a dialect merely, almost brutish, and we learn it unconsciously, like the brutes, of our mothers.",
            "id": "transitory",
            "topic": "education"
          },
          {
            "word": "dialect",
            "ipa": "/ˈdaɪəlekt/",
            "pos": "n.",
            "vi": "phương ngữ",
            "band": "7.0",
            "example": "The one is commonly transitory, a sound, a tongue, a dialect merely, almost brutish, and we learn it unconsciously, like the brutes, of our mothers.",
            "id": "dialect",
            "topic": "education"
          },
          {
            "word": "remoteness",
            "ipa": "/rɪˈməʊtnəs/",
            "pos": "n.",
            "vi": "sự xa cách",
            "band": "7.0",
            "example": "But when the several nations of Europe had acquired distinct though rude written languages of their own, sufficient for the purposes of their rising literatures, then first learning revived, and scholars were enabled to discern from that remoteness the treasures of antiquity.",
            "id": "remoteness",
            "topic": "education"
          },
          {
            "word": "maturity",
            "ipa": "/məˈtʃʊərəti/",
            "pos": "n.",
            "vi": "sự trưởng thành",
            "band": "7.0",
            "example": "The other is the maturity and experience of that; if that is our mother tongue, this is our father tongue, a reserved and select expression, too significant to be heard by the ear, which we must be born again in order to speak.",
            "id": "maturity",
            "topic": "education"
          }
        ]
      },
      {
        "id": "R10-P3",
        "title": "Designing the Experience of Waiting",
        "topic": "society",
        "paragraphs": [
          {
            "label": "A",
            "text": "Waiting is usually described in units of time, yet two queues of equal duration can feel strikingly different. People also attend to fairness, uncertainty and what they can do while they wait. These factors do not make actual delay irrelevant: a comfortable room cannot compensate indefinitely for a service that fails to arrive. They do show why a measure of average minutes is incomplete. Designing a queue involves allocating both time and information. A useful system enables people to understand their place, anticipate the next step and raise a problem without losing an entitlement that may have taken considerable effort to obtain."
          },
          {
            "label": "B",
            "text": "The fictional Calder Centre replaced an unexplained line with numbered tickets. Visitors could sit while retaining their place, and a display showed the number currently being served. The change improved physical comfort without initially increasing the speed of service. Staff were careful to separate these outcomes in their report. They also retained a spoken announcement for visitors who could not easily read the display. A ticket system is not inherently accessible merely because it removes standing. Its usefulness depends on whether people can obtain a ticket, notice the call and reach the desk before the system assumes they have left."
          },
          {
            "label": "C",
            "text": "Fictional Birchfield Repairs offered estimated completion times for customers leaving equipment. Early messages gave precise appointments that technicians could not reliably keep, because the condition of each item was initially unknown. The shop changed to a time range and explained when the estimate would be updated. Some customers preferred the earlier apparent certainty, but a missed promise created more frustration than an openly provisional range. The revised approach did not reduce the repair workload. It reduced avoidable uncertainty about when further information would arrive. Predictability can concern the timing of an update even when the timing of completion remains difficult to forecast."
          },
          {
            "label": "D",
            "text": "At the imaginary Leven Sports Office, online applicants could join a virtual queue for popular classes. This removed the need to travel simply to hold a place, but it disadvantaged people whose internet access was unreliable. The office reserved a share of places for applications made in person or by telephone, with a published allocation process. It also prevented one person from holding several duplicate positions. The result was more complicated to administer than a single digital line. Nevertheless, simplicity for the organisation was not treated as sufficient evidence of fairness for everyone seeking a place in a limited programme."
          },
          {
            "label": "E",
            "text": "Rules matter because people interpret exceptions socially. A person invited forward may be receiving a different service rather than jumping the queue, but that distinction must be intelligible to those waiting. Publishing broad categories can help without exposing private circumstances. Excessively detailed explanations may compromise confidentiality, while silence encourages suspicion. The aim is to explain the principle of allocation rather than the personal history of each case. This is particularly important when several queues share a room: visible movement at one desk should not automatically imply that another line is being neglected or that staff are applying inconsistent rules."
          },
          {
            "label": "F",
            "text": "Estimates present a separate challenge. An average wait calculated from yesterday's cases may describe no individual experience accurately today. A system should distinguish a typical duration from a promise and reveal significant changes when they occur. Extremely frequent updates can create anxiety if the numbers fluctuate without explanation. In some settings, a clear statement about the next review time is more useful than a constantly changing countdown. The right level of detail depends on what a person can do with it, such as arranging transport, contacting a colleague or deciding whether to return later."
          },
          {
            "label": "G",
            "text": "Evaluation should also examine people who leave. A shorter recorded queue can look like improved efficiency when frustrated visitors have simply abandoned it. Their absence may disappear from the service's statistics even though their original need remains. Exit interviews, missed appointments and repeat applications can help reveal this hidden displacement. Equally, allowing a person to wait elsewhere may reduce visible crowding while leaving the underlying delay unchanged. A credible account distinguishes these effects. It should be possible to recognise a worthwhile improvement in comfort without inflating it into a claim that the service has become faster."
          },
          {
            "label": "H",
            "text": "Good queue design therefore combines operational measures with an understanding of users' choices. Actual delay, confidence in the rules and access to useful information should be assessed together. None provides a complete substitute for the others. A transparent system can still be too slow, and a fast system can still allocate opportunities unfairly. Improvement begins by specifying which difficulty is being addressed and observing who continues to face it. The goal is not merely to make waiting seem shorter, but to make an unavoidable pause more predictable, accessible and consistent with the purposes of the service."
          }
        ],
        "part": 3,
        "provenance": {
          "kind": "original",
          "note": "Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức."
        },
        "intro": "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        "groups": [
          {
            "type": "features",
            "kind": "match",
            "range": [
              27,
              29
            ],
            "instruction": "Match each statement with the correct illustrative case. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Calder Centre"
              },
              {
                "key": "B",
                "text": "Birchfield Repairs"
              },
              {
                "key": "C",
                "text": "Leven Sports Office"
              }
            ],
            "questions": [
              {
                "n": 27,
                "text": "People could sit down without losing their position.",
                "answer": "A",
                "explain": "Đoạn B: “sit while retaining their place”."
              },
              {
                "n": 28,
                "text": "Some places remained available through non-digital applications.",
                "answer": "C",
                "explain": "Đoạn D: “in person or by telephone”."
              },
              {
                "n": 29,
                "text": "A range replaced an unreliable precise completion time.",
                "answer": "B",
                "explain": "Đoạn C: “changed to a time range”."
              }
            ]
          },
          {
            "type": "ynng",
            "kind": "tfng",
            "variant": "ynng",
            "range": [
              30,
              33
            ],
            "instruction": "Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 30,
                "text": "Equal waiting times can feel different to users.",
                "answer": "YES",
                "explain": "Đoạn A: “queues of equal duration can feel strikingly different”."
              },
              {
                "n": 31,
                "text": "Making a queue more comfortable necessarily speeds up service.",
                "answer": "NO",
                "explain": "Đoạn B: “without initially increasing the speed of service”."
              },
              {
                "n": 32,
                "text": "A constantly updated countdown is always the most useful format.",
                "answer": "NO",
                "explain": "Đoạn F: “more useful than a constantly changing countdown”."
              },
              {
                "n": 33,
                "text": "Most repair customers prefer updates by text rather than telephone.",
                "answer": "NOT GIVEN",
                "explain": "Không nêu kênh liên lạc mà đa số khách thích."
              }
            ]
          },
          {
            "type": "endings",
            "kind": "match",
            "range": [
              34,
              36
            ],
            "instruction": "Complete each sentence with the correct ending, A–F.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "must reveal each person’s private circumstances."
              },
              {
                "key": "B",
                "text": "should describe the rule without revealing private histories."
              },
              {
                "key": "C",
                "text": "eliminates every difference in access."
              },
              {
                "key": "D",
                "text": "can create predictability before completion can be forecast."
              },
              {
                "key": "E",
                "text": "can result from visitors abandoning the service."
              },
              {
                "key": "F",
                "text": "proves that the underlying service has become faster."
              }
            ],
            "questions": [
              {
                "n": 34,
                "text": "A smaller visible queue",
                "answer": "E",
                "explain": "Đoạn G: “frustrated visitors have simply abandoned it”."
              },
              {
                "n": 35,
                "text": "A public explanation of priority",
                "answer": "B",
                "explain": "Đoạn E: “principle of allocation rather than the personal history”."
              },
              {
                "n": 36,
                "text": "A reliable update time",
                "answer": "D",
                "explain": "Đoạn C: “timing of an update”."
              }
            ]
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              37,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Waiting includes concerns about fairness and {{37}}.</p><p>Explaining individual circumstances too fully can damage {{38}}.</p><p>People who {{39}} should be included in evaluation.</p><p>Assessment must distinguish comfort from actual {{40}}.</p>",
            "answers": {
              "37": [
                "uncertainty"
              ],
              "38": [
                "confidentiality"
              ],
              "39": [
                "leave"
              ],
              "40": [
                "delay"
              ]
            },
            "explain": {
              "37": "Đoạn A: “fairness, uncertainty”.",
              "38": "Đoạn E: “compromise confidentiality”.",
              "39": "Đoạn G: “examine people who leave”.",
              "40": "Đoạn A: “Actual delay”."
            }
          }
        ],
        "vocab": [
          {
            "word": "principle",
            "ipa": "/ˈprɪnsəpəl/",
            "pos": "n.",
            "vi": "nguyên tắc",
            "band": "7.0",
            "example": "The aim is to explain the principle of allocation rather than the personal history of each case.",
            "id": "principle",
            "topic": "society"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "Nevertheless, simplicity for the organisation was not treated as sufficient evidence of fairness for everyone seeking a place in a limited programme.",
            "id": "evidence",
            "topic": "society"
          },
          {
            "word": "evaluation",
            "ipa": "/ɪˌvæljuˈeɪʃən/",
            "pos": "n.",
            "vi": "sự đánh giá",
            "band": "7.0",
            "example": "Evaluation should also examine people who leave.",
            "id": "evaluation",
            "topic": "society"
          },
          {
            "word": "allocation",
            "ipa": "/ˌæləˈkeɪʃən/",
            "pos": "n.",
            "vi": "sự phân bổ",
            "band": "7.0",
            "example": "The office reserved a share of places for applications made in person or by telephone, with a published allocation process.",
            "id": "allocation",
            "topic": "society"
          },
          {
            "word": "accessible",
            "ipa": "/əkˈsesəbəl/",
            "pos": "adj.",
            "vi": "có thể tiếp cận",
            "band": "7.0",
            "example": "A ticket system is not inherently accessible merely because it removes standing.",
            "id": "accessible",
            "topic": "society"
          },
          {
            "word": "uncertainty",
            "ipa": "/ʌnˈsɜːtənti/",
            "pos": "n.",
            "vi": "sự không chắc chắn",
            "band": "7.0",
            "example": "People also attend to fairness, uncertainty and what they can do while they wait.",
            "id": "uncertainty",
            "topic": "society"
          },
          {
            "word": "substitute",
            "ipa": "/ˈsʌbstɪtjuːt/",
            "pos": "n.",
            "vi": "vật thay thế",
            "band": "7.0",
            "example": "None provides a complete substitute for the others.",
            "id": "substitute",
            "topic": "society"
          },
          {
            "word": "confidentiality",
            "ipa": "/ˌkɒnfɪdenʃiˈæləti/",
            "pos": "n.",
            "vi": "tính bảo mật",
            "band": "7.0",
            "example": "Excessively detailed explanations may compromise confidentiality, while silence encourages suspicion.",
            "id": "confidentiality",
            "topic": "society"
          },
          {
            "word": "entitlement",
            "ipa": "/ɪnˈtaɪtəlmənt/",
            "pos": "n.",
            "vi": "quyền được hưởng",
            "band": "7.0",
            "example": "A useful system enables people to understand their place, anticipate the next step and raise a problem without losing an entitlement that may have taken considerable effort to obtain.",
            "id": "entitlement",
            "topic": "society"
          },
          {
            "word": "provisional",
            "ipa": "/prəˈvɪʒənəl/",
            "pos": "adj.",
            "vi": "tạm thời; dự kiến",
            "band": "7.0",
            "example": "Some customers preferred the earlier apparent certainty, but a missed promise created more frustration than an openly provisional range.",
            "id": "provisional",
            "topic": "society"
          },
          {
            "word": "displacement",
            "ipa": "/dɪsˈpleɪsmənt/",
            "pos": "n.",
            "vi": "sự dịch chuyển",
            "band": "7.0",
            "example": "Exit interviews, missed appointments and repeat applications can help reveal this hidden displacement.",
            "id": "displacement",
            "topic": "society"
          },
          {
            "id": "credible",
            "word": "credible",
            "ipa": "/ˈkredəbl/",
            "pos": "adj.",
            "band": "7.0",
            "vi": "đáng tin cậy",
            "example": "A credible account distinguishes these effects.",
            "topic": "society"
          },
          {
            "id": "fluctuate",
            "word": "fluctuate",
            "ipa": "/ˈflʌktʃueɪt/",
            "pos": "v.",
            "band": "7.0",
            "vi": "dao động, lên xuống thất thường",
            "example": "Extremely frequent updates can create anxiety if the numbers fluctuate without explanation.",
            "topic": "society"
          },
          {
            "id": "unreliable",
            "word": "unreliable",
            "ipa": "/ˌʌnrɪˈlaɪəbl/",
            "pos": "adj.",
            "band": "6.5",
            "vi": "không đáng tin cậy, thất thường",
            "example": "This removed the need to travel simply to hold a place, but it disadvantaged people whose internet access was unreliable.",
            "topic": "society"
          }
        ]
      }
    ]
  },
  {
    "id": "R11",
    "title": "Practice Test 11 — Exoplanets, Craft & Digital Memory",
    "source": "Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật",
    "passages": [
      {
        "id": "R11-P1",
        "part": 1,
        "title": "Finding Worlds Around Other Stars",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Since the first confirmation of an exoplanet orbiting a Sun-like star in 1995 , and with only a small sampling of our Milky Way galaxy so far surveyed, we’ve already struck many rich veins. A statistical estimate based on data from NASA’s Kepler Space Telescope revealed that there are more planets than stars in our galaxy. That means there are more than a trillion planets in our galaxy alone, many of them in Earth’s size range. “Right now we know, for the first time, that small planets are very common,” said Sara Seager, a professor at the Massachusetts Institute of Technology and an exoplanet research pioneer."
          },
          {
            "label": "B",
            "text": "“It’s phenomenal. We had no way to know that before Kepler. We’ll just say, colloquially: They’re everywhere.” The planet discovered in 1995 was a hot, star-hugging gas giant believed to be about half the size of Jupiter. It tugged so hard on its parent star as it raced around in a four-day orbit that the star’s wobbling was obvious to earthly telescopes — once astronomers knew what to look for. Finding this fast-moving gas giant, known as 51 Pegasi b, kicked off what might be called the “classical” period of planet hunting."
          },
          {
            "label": "C",
            "text": "The early technique of tracking wobbling stars revealed one planet after another, many of them large “hot Jupiters” with tight, blistering orbits. The wobble method measures changes in a star’s “radial velocity.” The wavelengths of starlight are alternately squeezed and stretched as a star moves slightly closer, then slightly farther away from us. Those gyrations are caused by gravitational tugs, this way and that, from orbiting planets. The Kepler Space Telescope (2009-2018) ushered in what we could call the “modern” era of planet hunting. Kepler settled into an Earth-trailing orbit, then fixed its gaze on a small patch of sky."
          },
          {
            "label": "D",
            "text": "It stared at that patch for four years. Within that small patch were 150,000 stars. Kepler was waiting to catch tiny dips in the amount of light coming from individual stars, caused by planets crossing in front of them. This is called “transit method.” Once detected, the planet's orbital size can be calculated from the period (how long it takes the planet to circle once around the star) and the mass of the star. NASA’s Transiting Exoplanet Survey Satellite, launched in 2018, employs the same technique (it’s in the name, afterall) to survey whole swaths of our sky."
          },
          {
            "label": "E",
            "text": "Space telescopes like Spitzer and Hubble have been used to discover exoplanets and reveal more information about what they’re like. From mass characterizations to elements in atmospheres to planetary weather maps. Our eyes in space will grow sharper, begin to scrutinize the atmospheres of extremely distant planets, and even capture direct images of some of these worlds – perhaps another small, rocky, blue and white marble. Once light is captured, it can be probed to reveal the composition of exoplanet atmospheres . Think of a prism: shine white light through it, and it splits the light into a rainbow spectrum."
          },
          {
            "label": "F",
            "text": "Scientists can read the color bands of this spectrum like a bar code, revealing which molecules are present. It's a technique known as \"transit spectroscopy,\" when light from a star travels through the atmosphere of an orbiting planet and reaches our telescopes – in space or on the ground – and tells about where it's been. The Hubble Space Telescope has detected helium and water vapor in exoplanet atmospheres using spectroscopy; more detailed profiles of exoplanet atmospheres are coming from the James Webb Space Telescope , launched in 2021."
          },
          {
            "label": "G",
            "text": "Another planet-hunting method takes advantage of an effect first described by Einstein: gravity's ability to warp and bend starlight. The gravity of a star in the foreground will magnify the light from a background star that passes just behind it. If the foreground star has a planet in orbit, the star will appear to a properly positioned telescope as a spike in light intensity as the background star goes by; the planet will appear as a second, smaller spike. NASA’s future Nancy Grace Roman Space Telescope will employ this technique, currently used by ground telescopes, to discover exoplanets."
          },
          {
            "label": "H",
            "text": "The single pixels of light captured directly from exoplanets won't be enough to reveal surface features. But they will provide the next best thing: profiles of exoplanet atmospheres, and perhaps evidence of gases suggesting the presence of life. So far, such \"direct images\" of exoplanets have been mainly confined to giant planets still so hot from their fresh creation that they remain self-luminous. One of the most striking is a movie of four exoplanets in orbit around the star HR 8799, created by astronomers using images from Hawaii's Keck Observatory. The next generation of space telescopes would seek direct images of exoplanets using technology that is now under development: the coronagraph."
          }
        ],
        "provenance": {
          "kind": "public-information-excerpt",
          "publisher": "NASA Science",
          "url": "https://science.nasa.gov/exoplanets/how-we-find-and-characterize/",
          "rightsUrl": "https://www.nasa.gov/nasa-brand-center/images-and-media/",
          "note": "Trích tuyển văn bản giáo dục NASA Science; chia lại đoạn A–H để luyện đọc. Câu hỏi và lời giải do app biên soạn. Không ngụ ý NASA bảo trợ."
        },
        "intro": "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        "groups": [
          {
            "type": "tfng",
            "kind": "tfng",
            "variant": "tfng",
            "range": [
              1,
              5
            ],
            "instruction": "Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 1,
                "text": "The statistical estimate suggests there are more stars than planets in our galaxy.",
                "answer": "FALSE",
                "explain": "Đoạn A: “more planets than stars”."
              },
              {
                "n": 2,
                "text": "51 Pegasi b took about four days to orbit its star.",
                "answer": "TRUE",
                "explain": "Đoạn B: “a four-day orbit”."
              },
              {
                "n": 3,
                "text": "Kepler waited for reductions in the light from stars.",
                "answer": "TRUE",
                "explain": "Đoạn D: “tiny dips in the amount of light”."
              },
              {
                "n": 4,
                "text": "A directly captured single pixel reveals detailed surface features.",
                "answer": "FALSE",
                "explain": "Đoạn H: “won't be enough to reveal surface features”."
              },
              {
                "n": 5,
                "text": "51 Pegasi b has a moon larger than Earth.",
                "answer": "NOT GIVEN",
                "explain": "Bài không mô tả vệ tinh của 51 Pegasi b."
              }
            ]
          },
          {
            "type": "note",
            "kind": "gap",
            "range": [
              6,
              9
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Methods of detection",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Stellar wobbling reveals changes in radial {{6}}.</p><p>Planets crossing in front of stars are found using the {{7}} method.</p><p>A spectrum’s bands help identify which {{8}} are present.</p><p>Gravity may warp and bend {{9}}.</p>",
            "answers": {
              "6": [
                "velocity"
              ],
              "7": [
                "transit"
              ],
              "8": [
                "molecules"
              ],
              "9": [
                "starlight"
              ]
            },
            "explain": {
              "6": "Đoạn C: “radial velocity”.",
              "7": "Đoạn D: “transit method”.",
              "8": "Đoạn F: “which molecules are present”.",
              "9": "Đoạn G: “warp and bend starlight”."
            }
          },
          {
            "type": "short",
            "kind": "gap",
            "range": [
              10,
              13
            ],
            "instruction": "Complete the answers. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>For how many years did Kepler stare at the patch of sky? {{10}}</p><p>What ordinary object is used to explain a rainbow spectrum? {{11}}</p><p>Which telescope detected helium and water vapour in atmospheres? {{12}}</p><p>What developing technology is named at the end? {{13}}</p>",
            "answers": {
              "10": [
                "four",
                "4"
              ],
              "11": [
                "prism"
              ],
              "12": [
                "Hubble"
              ],
              "13": [
                "coronagraph"
              ]
            },
            "explain": {
              "10": "Đoạn D: “four years”.",
              "11": "Đoạn E: “Think of a prism”.",
              "12": "Đoạn F: “Hubble Space Telescope has detected”.",
              "13": "Đoạn H: “the coronagraph”."
            }
          }
        ],
        "vocab": [
          {
            "word": "planet",
            "ipa": "/ˈplænɪt/",
            "pos": "n.",
            "vi": "hành tinh",
            "band": "7.0",
            "example": "Since the first confirmation of an exoplanet orbiting a Sun-like star in 1995 , and with only a small sampling of our Milky Way galaxy so far surveyed, we’ve already struck many rich veins.",
            "id": "planet",
            "topic": "science"
          },
          {
            "word": "surface",
            "ipa": "/ˈsɜːfɪs/",
            "pos": "n.",
            "vi": "bề mặt",
            "band": "7.0",
            "example": "The single pixels of light captured directly from exoplanets won't be enough to reveal surface features.",
            "id": "surface",
            "topic": "science"
          },
          {
            "word": "atmosphere",
            "ipa": "/ˈætməsfɪə/",
            "pos": "n.",
            "vi": "khí quyển",
            "band": "7.0",
            "example": "From mass characterizations to elements in atmospheres to planetary weather maps.",
            "id": "atmosphere",
            "topic": "science"
          },
          {
            "word": "orbit",
            "ipa": "/ˈɔːbɪt/",
            "pos": "n./v.",
            "vi": "quỹ đạo; quay quanh",
            "band": "7.0",
            "example": "Since the first confirmation of an exoplanet orbiting a Sun-like star in 1995 , and with only a small sampling of our Milky Way galaxy so far surveyed, we’ve already struck many rich veins.",
            "id": "orbit",
            "topic": "science"
          },
          {
            "word": "gravity",
            "ipa": "/ˈɡrævəti/",
            "pos": "n.",
            "vi": "lực hấp dẫn",
            "band": "7.0",
            "example": "Another planet-hunting method takes advantage of an effect first described by Einstein: gravity's ability to warp and bend starlight.",
            "id": "gravity",
            "topic": "science"
          },
          {
            "word": "satellite",
            "ipa": "/ˈsætəlaɪt/",
            "pos": "n.",
            "vi": "vệ tinh",
            "band": "7.0",
            "example": "NASA’s Transiting Exoplanet Survey Satellite, launched in 2018, employs the same technique (it’s in the name, afterall) to survey whole swaths of our sky.",
            "id": "satellite",
            "topic": "science"
          },
          {
            "word": "helium",
            "ipa": "/ˈhiːliəm/",
            "pos": "n.",
            "vi": "heli",
            "band": "7.0",
            "example": "The Hubble Space Telescope has detected helium and water vapor in exoplanet atmospheres using spectroscopy; more detailed profiles of exoplanet atmospheres are coming from the James Webb Space Telescope , launched in 2021.",
            "id": "helium",
            "topic": "science"
          },
          {
            "word": "molecule",
            "ipa": "/ˈmɒlɪkjuːl/",
            "pos": "n.",
            "vi": "phân tử",
            "band": "7.0",
            "example": "Scientists can read the color bands of this spectrum like a bar code, revealing which molecules are present.",
            "id": "molecule",
            "topic": "science"
          },
          {
            "word": "spectrum",
            "ipa": "/ˈspektrəm/",
            "pos": "n.",
            "vi": "quang phổ",
            "band": "7.0",
            "example": "Think of a prism: shine white light through it, and it splits the light into a rainbow spectrum.",
            "id": "spectrum",
            "topic": "science"
          },
          {
            "word": "wavelength",
            "ipa": "/ˈweɪvleŋθ/",
            "pos": "n.",
            "vi": "bước sóng",
            "band": "7.0",
            "example": "The wobble method measures changes in a star’s “radial velocity.” The wavelengths of starlight are alternately squeezed and stretched as a star moves slightly closer, then slightly farther away from us.",
            "id": "wavelength",
            "topic": "science"
          },
          {
            "word": "gravitational",
            "ipa": "/ˌɡrævɪˈteɪʃənəl/",
            "pos": "adj.",
            "vi": "thuộc lực hấp dẫn",
            "band": "7.0",
            "example": "Those gyrations are caused by gravitational tugs, this way and that, from orbiting planets.",
            "id": "gravitational",
            "topic": "science"
          },
          {
            "word": "transit",
            "ipa": "/ˈtrænzɪt/",
            "pos": "n.",
            "vi": "sự đi qua phía trước",
            "band": "7.0",
            "example": "This is called “transit method.” Once detected, the planet's orbital size can be calculated from the period (how long it takes the planet to circle once around the star) and the mass of the star.",
            "id": "transit",
            "topic": "science"
          },
          {
            "word": "mass",
            "ipa": "/mæs/",
            "pos": "n.",
            "vi": "khối lượng",
            "band": "7.0",
            "example": "“Right now we know, for the first time, that small planets are very common,” said Sara Seager, a professor at the Massachusetts Institute of Technology and an exoplanet research pioneer.",
            "id": "mass",
            "topic": "science"
          },
          {
            "word": "scrutinize",
            "ipa": "/ˈskruːtənaɪz/",
            "pos": "v.",
            "vi": "xem xét kỹ",
            "band": "7.0",
            "example": "Our eyes in space will grow sharper, begin to scrutinize the atmospheres of extremely distant planets, and even capture direct images of some of these worlds – perhaps another small, rocky, blue and white marble.",
            "id": "scrutinize",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R11-P2",
        "part": 2,
        "title": "The Craft of Josiah Wedgwood",
        "topic": "history",
        "paragraphs": [
          {
            "label": "A",
            "text": "The career of Josiah Wedgwood, the English potter, was less chequered and more prosperous than that of either Palissy or Böttgher, and his lot was cast in happier times. Down to the middle of last century England was behind most other nations of the first order in Europe in respect of skilled industry. Although there were many potters in Staffordshire—and Wedgwood himself belonged to a numerous clan of potters of the same name—their productions were of the rudest kind, for the most part only plain brown ware, with the patterns scratched in while the clay was wet."
          },
          {
            "label": "B",
            "text": "The principal supply of the better articles of earthenware came from Delft in Holland, and of drinking stone pots from Cologne. Two foreign potters, the brothers Elers from Nuremberg, settled for a time in Staffordshire, and introduced an improved manufacture, but they shortly after removed to Chelsea, where they confined themselves to the manufacture of ornamental pieces. No porcelain capable of resisting a scratch with a hard point had yet been made in England; and for a long time the “white ware” made in Staffordshire was not white, but of a dirty cream colour."
          },
          {
            "label": "C",
            "text": "Such, in a few words, was the condition of the pottery manufacture when Josiah Wedgwood was born at Burslem in 1730. By the time that he died, sixty-four years later, it had become completely changed. By his energy, skill, and genius, he established the trade upon a new and solid foundation; and, in the words of his epitaph, “converted a rude and inconsiderable manufacture into an elegant art and an important branch of national commerce.” Josiah Wedgwood was one of those indefatigable men who from time to time spring from the ranks of the common people, and by their energetic character not only practically educate the working population in habits of industry, but by the example of diligence and perseverance which they set before them, largely influence the public activity in all directions, and contribute in a great degree to form the national character."
          },
          {
            "label": "D",
            "text": "He was, like Arkwright, the youngest of a family of thirteen children. His grandfather and granduncle were both potters, as was also his father who died when he was a mere boy, leaving him a patrimony of twenty pounds. He had learned to read and write at the village school; but on the death of his father he was taken from it and set to work as a “thrower” in a small pottery carried on by his elder brother. There he began life, his working life, to use his own words, “at the lowest round of the ladder,” when only eleven years old."
          },
          {
            "label": "E",
            "text": "He was shortly after seized by an attack of virulent smallpox, from the effects of which he suffered during the rest of his life, for it was followed by a disease in the right knee, which recurred at frequent intervals, and was only got rid of by the amputation of the limb many years later. Mr. Gladstone, in his eloquent Éloge on Wedgwood recently delivered at Burslem, well observed that the disease from which he suffered was not improbably the occasion of his subsequent excellence."
          },
          {
            "label": "F",
            "text": "“It prevented him from growing up to be the active, vigorous English workman, possessed of all his limbs, and knowing right well the use of them; but it put him upon considering whether, as he could not be that, he might not be something else, and something greater. It sent his mind inwards; it drove him to meditate upon the laws and secrets of his art. The result was, that he arrived at a perception and a grasp of them which might, perhaps, have been envied, certainly have been owned, by an Athenian potter.” When he had completed his apprenticeship with his brother, Josiah joined partnership with another workman, and carried on a small business in making knife-hafts, boxes, and sundry articles for domestic use."
          },
          {
            "label": "G",
            "text": "Another partnership followed, when he proceeded to make melon table plates, green pickle leaves, candlesticks, snuffboxes, and such like articles; but he made comparatively little progress until he began business on his own account at Burslem in the year 1759. There he diligently pursued his calling, introducing new articles to the trade, and gradually extending his business. What he chiefly aimed at was to manufacture cream-coloured ware of a better quality than was then produced in Staffordshire as regarded shape, colour, glaze, and durability."
          },
          {
            "label": "H",
            "text": "To understand the subject thoroughly, he devoted his leisure to the study of chemistry; and he made numerous experiments on fluxes, glazes, and various sorts of clay. Being a close inquirer and accurate observer, he noticed that a certain earth containing silica, which was black before calcination, became white after exposure to the heat of a furnace. This fact, observed and pondered on, led to the idea of mixing silica with the red powder of the potteries, and to the discovery that the mixture becomes white when calcined."
          }
        ],
        "provenance": {
          "kind": "public-domain-excerpt",
          "publisher": "Samuel Smiles — Self-Help (1859)",
          "url": "https://www.gutenberg.org/cache/epub/935/pg935-images.html",
          "rightsUrl": "https://www.gutenberg.org/policy/license.html",
          "note": "Trích văn bản lịch sử thuộc phạm vi công cộng: Samuel Smiles, Self-Help (1859); giữ ngôn ngữ và góc nhìn thời kỳ đó, chia lại đoạn A–H. Dùng để luyện đọc hiểu, không trình bày như kiến thức khoa học hoặc quan điểm hiện hành. Câu hỏi và lời giải do app biên soạn. Nguồn số hóa có kèm giấy phép Project Gutenberg."
        },
        "intro": "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        "groups": [
          {
            "type": "headings",
            "kind": "match",
            "range": [
              14,
              17
            ],
            "instruction": "Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.",
            "allowReuse": false,
            "options": [
              {
                "key": "i",
                "text": "A childhood introduction to pottery work"
              },
              {
                "key": "ii",
                "text": "The limitations of early English pottery"
              },
              {
                "key": "iii",
                "text": "The disappearance of imported ceramics"
              },
              {
                "key": "iv",
                "text": "Wedgwood’s transformation of a trade"
              },
              {
                "key": "v",
                "text": "An expensive international exhibition"
              },
              {
                "key": "vi",
                "text": "Foreign supply and imperfect local alternatives"
              }
            ],
            "questions": [
              {
                "n": 14,
                "text": "Paragraph A",
                "answer": "ii",
                "explain": "Đoạn A: “only plain brown ware”. Sản phẩm chủ yếu thô sơ, cho thấy điểm xuất phát thấp của nghề gốm."
              },
              {
                "n": 15,
                "text": "Paragraph B",
                "answer": "vi",
                "explain": "Đoạn B: “came from Delft in Holland”. Đoạn nói về nguồn nhập khẩu và loại đồ trắng nội địa còn chưa đạt."
              },
              {
                "n": 16,
                "text": "Paragraph C",
                "answer": "iv",
                "explain": "Đoạn C: “it had become completely changed”. Wedgwood biến nghề gốm thành một ngành thương mại và nghệ thuật phát triển."
              },
              {
                "n": 17,
                "text": "Paragraph D",
                "answer": "i",
                "explain": "Đoạn D: “when only eleven years old”. Gia đình và việc vào làm từ nhỏ giải thích khởi đầu nghề nghiệp."
              }
            ]
          },
          {
            "type": "info",
            "kind": "match",
            "range": [
              18,
              20
            ],
            "instruction": "Which paragraph contains the following information? You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Paragraph A"
              },
              {
                "key": "B",
                "text": "Paragraph B"
              },
              {
                "key": "C",
                "text": "Paragraph C"
              },
              {
                "key": "D",
                "text": "Paragraph D"
              },
              {
                "key": "E",
                "text": "Paragraph E"
              },
              {
                "key": "F",
                "text": "Paragraph F"
              },
              {
                "key": "G",
                "text": "Paragraph G"
              },
              {
                "key": "H",
                "text": "Paragraph H"
              }
            ],
            "questions": [
              {
                "n": 18,
                "text": "An interpretation of how disability redirected a craftsman’s attention",
                "answer": "F",
                "explain": "Đoạn F: “It sent his mind inwards”."
              },
              {
                "n": 19,
                "text": "The qualities targeted in an improved product",
                "answer": "G",
                "explain": "Đoạn G: “shape, colour, glaze, and durability”."
              },
              {
                "n": 20,
                "text": "An observation about a material changing colour when heated",
                "answer": "H",
                "explain": "Đoạn H: “became white after exposure”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              21,
              23
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>Wedgwood began working as a {{21}} for his brother.</p><p>He opened his own business at Burslem in {{22}}.</p><p>To deepen his understanding, he studied {{23}}.</p>",
            "answers": {
              "21": [
                "thrower"
              ],
              "22": [
                "1759"
              ],
              "23": [
                "chemistry"
              ]
            },
            "explain": {
              "21": "Đoạn D: “as a “thrower””.",
              "22": "Đoạn G: “year 1759”.",
              "23": "Đoạn H: “study of chemistry”."
            }
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              24,
              26
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 24,
                "text": "What does the earlier “white ware” show about local manufacture?",
                "options": [
                  "A It was imperfect despite its name",
                  "B It was imported only from Delft",
                  "C It was always pure white"
                ],
                "answer": "A",
                "explain": "Đoạn B: “not white, but of a dirty cream colour”."
              },
              {
                "n": 25,
                "text": "How does Smiles represent Wedgwood’s influence?",
                "options": [
                  "A As restricted to his own income",
                  "B As damaging to national commerce",
                  "C As extending beyond pottery into habits of industry"
                ],
                "answer": "C",
                "explain": "Đoạn C: “influence the public activity in all directions”."
              },
              {
                "n": 26,
                "text": "What led towards a new white mixture?",
                "options": [
                  "A Copying an advertised formula without testing",
                  "B Observing and reflecting on heated silica-containing earth",
                  "C Avoiding experiments with clay"
                ],
                "answer": "B",
                "explain": "Đoạn H: “observed and pondered on”."
              }
            ]
          }
        ],
        "vocab": [
          {
            "word": "solid",
            "ipa": "/ˈsɒlɪd/",
            "pos": "adj./n.",
            "vi": "rắn; chất rắn",
            "band": "7.0",
            "example": "By his energy, skill, and genius, he established the trade upon a new and solid foundation; and, in the words of his epitaph, “converted a rude and inconsiderable manufacture into an elegant art and an important branch of national commerce.” Josiah Wedgwood was one of those indefatigable men who from time to time spring from the ranks of the common people, and by their energetic character not only practically educate the working population in habits of industry, but by the example of diligence and perseverance which they set before them, largely influence the public activity in all directions, and contribute in a great degree to form the national character.",
            "id": "solid",
            "topic": "history"
          },
          {
            "word": "manufacture",
            "ipa": "/ˌmænjəˈfæktʃə/",
            "pos": "n./v.",
            "vi": "sự sản xuất; sản xuất",
            "band": "7.0",
            "example": "Two foreign potters, the brothers Elers from Nuremberg, settled for a time in Staffordshire, and introduced an improved manufacture, but they shortly after removed to Chelsea, where they confined themselves to the manufacture of ornamental pieces.",
            "id": "manufacture",
            "topic": "history"
          },
          {
            "word": "trade",
            "ipa": "/treɪd/",
            "pos": "n.",
            "vi": "nghề; thương mại",
            "band": "7.0",
            "example": "By his energy, skill, and genius, he established the trade upon a new and solid foundation; and, in the words of his epitaph, “converted a rude and inconsiderable manufacture into an elegant art and an important branch of national commerce.” Josiah Wedgwood was one of those indefatigable men who from time to time spring from the ranks of the common people, and by their energetic character not only practically educate the working population in habits of industry, but by the example of diligence and perseverance which they set before them, largely influence the public activity in all directions, and contribute in a great degree to form the national character.",
            "id": "trade",
            "topic": "history"
          },
          {
            "word": "earthenware",
            "ipa": "/ˈɜːθənweə/",
            "pos": "n.",
            "vi": "đồ đất nung",
            "band": "7.0",
            "example": "The principal supply of the better articles of earthenware came from Delft in Holland, and of drinking stone pots from Cologne.",
            "id": "earthenware",
            "topic": "history"
          },
          {
            "word": "porcelain",
            "ipa": "/ˈpɔːsəlɪn/",
            "pos": "n.",
            "vi": "đồ sứ",
            "band": "7.0",
            "example": "No porcelain capable of resisting a scratch with a hard point had yet been made in England; and for a long time the “white ware” made in Staffordshire was not white, but of a dirty cream colour.",
            "id": "porcelain",
            "topic": "history"
          },
          {
            "word": "durability",
            "ipa": "/ˌdjʊərəˈbɪləti/",
            "pos": "n.",
            "vi": "độ bền",
            "band": "7.0",
            "example": "What he chiefly aimed at was to manufacture cream-coloured ware of a better quality than was then produced in Staffordshire as regarded shape, colour, glaze, and durability.",
            "id": "durability",
            "topic": "history"
          },
          {
            "word": "apprenticeship",
            "ipa": "/əˈprentɪʃɪp/",
            "pos": "n.",
            "vi": "thời gian học nghề",
            "band": "7.0",
            "example": "The result was, that he arrived at a perception and a grasp of them which might, perhaps, have been envied, certainly have been owned, by an Athenian potter.” When he had completed his apprenticeship with his brother, Josiah joined partnership with another workman, and carried on a small business in making knife-hafts, boxes, and sundry articles for domestic use.",
            "id": "apprenticeship",
            "topic": "history"
          },
          {
            "word": "diligence",
            "ipa": "/ˈdɪlɪdʒəns/",
            "pos": "n.",
            "vi": "sự cần cù",
            "band": "7.0",
            "example": "By his energy, skill, and genius, he established the trade upon a new and solid foundation; and, in the words of his epitaph, “converted a rude and inconsiderable manufacture into an elegant art and an important branch of national commerce.” Josiah Wedgwood was one of those indefatigable men who from time to time spring from the ranks of the common people, and by their energetic character not only practically educate the working population in habits of industry, but by the example of diligence and perseverance which they set before them, largely influence the public activity in all directions, and contribute in a great degree to form the national character.",
            "id": "diligence",
            "topic": "history"
          },
          {
            "word": "perseverance",
            "ipa": "/ˌpɜːsɪˈvɪərəns/",
            "pos": "n.",
            "vi": "sự kiên trì",
            "band": "7.0",
            "example": "By his energy, skill, and genius, he established the trade upon a new and solid foundation; and, in the words of his epitaph, “converted a rude and inconsiderable manufacture into an elegant art and an important branch of national commerce.” Josiah Wedgwood was one of those indefatigable men who from time to time spring from the ranks of the common people, and by their energetic character not only practically educate the working population in habits of industry, but by the example of diligence and perseverance which they set before them, largely influence the public activity in all directions, and contribute in a great degree to form the national character.",
            "id": "perseverance",
            "topic": "history"
          },
          {
            "word": "patrimony",
            "ipa": "/ˈpætrɪməni/",
            "pos": "n.",
            "vi": "tài sản thừa kế",
            "band": "7.0",
            "example": "His grandfather and granduncle were both potters, as was also his father who died when he was a mere boy, leaving him a patrimony of twenty pounds.",
            "id": "patrimony",
            "topic": "history"
          },
          {
            "word": "subsequent",
            "ipa": "/ˈsʌbsɪkwənt/",
            "pos": "adj.",
            "vi": "sau đó",
            "band": "7.0",
            "example": "Gladstone, in his eloquent Éloge on Wedgwood recently delivered at Burslem, well observed that the disease from which he suffered was not improbably the occasion of his subsequent excellence.",
            "id": "subsequent",
            "topic": "history"
          },
          {
            "word": "eloquent",
            "ipa": "/ˈeləkwənt/",
            "pos": "adj.",
            "vi": "hùng hồn",
            "band": "7.0",
            "example": "Gladstone, in his eloquent Éloge on Wedgwood recently delivered at Burslem, well observed that the disease from which he suffered was not improbably the occasion of his subsequent excellence.",
            "id": "eloquent",
            "topic": "history"
          },
          {
            "word": "domestic",
            "ipa": "/dəˈmestɪk/",
            "pos": "adj.",
            "vi": "trong gia đình; trong nước",
            "band": "7.0",
            "example": "The result was, that he arrived at a perception and a grasp of them which might, perhaps, have been envied, certainly have been owned, by an Athenian potter.” When he had completed his apprenticeship with his brother, Josiah joined partnership with another workman, and carried on a small business in making knife-hafts, boxes, and sundry articles for domestic use.",
            "id": "domestic",
            "topic": "history"
          },
          {
            "word": "glaze",
            "ipa": "/ɡleɪz/",
            "pos": "n.",
            "vi": "men gốm",
            "band": "7.0",
            "example": "What he chiefly aimed at was to manufacture cream-coloured ware of a better quality than was then produced in Staffordshire as regarded shape, colour, glaze, and durability.",
            "id": "glaze",
            "topic": "history"
          }
        ]
      },
      {
        "id": "R11-P3",
        "title": "Who Can Find a Digital Memory?",
        "topic": "media",
        "paragraphs": [
          {
            "label": "A",
            "text": "Digitising an archive is often described as opening it to the world. A file placed online can indeed cross distances that once made consultation impossible. Yet technical availability does not guarantee that an intended reader can find, interpret or use it. Search terms, descriptions and decisions about permission shape access long after scanning has finished. The question is therefore not only how much material has been converted, but whose ways of describing the past are represented in the catalogue. An archive can be publicly reachable while remaining practically obscure to the communities whose experience gives its records much of their meaning."
          },
          {
            "label": "B",
            "text": "The fictional Lowbank Archive scanned recordings of local interviews and catalogued them by the formal names of organisations. Residents often searched using neighbourhood nicknames instead. Their unsuccessful searches initially looked like a lack of interest in the collection. Staff added alternative terms after workshops in which people described how they remembered places and events. The original catalogue entries remained available, but were connected to a wider vocabulary. Lowbank's experience shows that an empty search result can reveal a mismatch between languages of description rather than an absence of relevant material or public curiosity. Discoverability depends on these connections as much as on the number of files stored."
          },
          {
            "label": "C",
            "text": "Fictional Cresswell Library worked with handwritten letters in several languages. Automatic transcription produced useful drafts, but it repeatedly confused personal names and expressions absent from its training examples. Volunteers checked the transcriptions alongside images of the originals, and the interface made uncertain readings visible. Readers could therefore examine the evidence instead of treating every searchable word as an exact transcription. The library prioritised checking names before polishing punctuation. That choice reflected the way researchers sought relatives in the collection: a single mistaken letter could prevent a family from discovering a document that otherwise contained an entirely readable account."
          },
          {
            "label": "D",
            "text": "The imaginary Redhaven Project collected photographs contributed by residents. Some contributors agreed to display an image but wanted restrictions on downloading a high-resolution version. Others withdrew permission after identifying a person whose circumstances had changed. The project recorded these decisions and provided a clear contact route for reconsideration. It treated permission as a relationship requiring continued attention rather than as a box permanently settled at the moment of upload. This approach complicated administration, but avoided assuming that public interest in a photograph automatically outweighed every concern of the people represented in it. Digital copying makes that balance more consequential, not less."
          },
          {
            "label": "E",
            "text": "These cases reveal why counting digitised items is an incomplete measure of access. A record can exist as an image, a transcription and several catalogue descriptions, each serving a different purpose. The image preserves features that a text version omits, while the text may enable searching that an image alone cannot support. Descriptions connect both to questions users know how to ask. Evaluation should distinguish these functions rather than count every representation as a separate achievement. Otherwise a project can improve its totals by multiplying versions while leaving the central difficulty of finding relevant material untouched."
          },
          {
            "label": "F",
            "text": "Standardisation remains valuable. Shared formats and consistent fields allow collections to be maintained and connected. The difficulty lies in confusing consistency with a requirement that every local expression disappear. A catalogue can preserve a formal term while linking it to community language, older spellings or translated descriptions. Such links need checking: a nickname may refer to different locations in different periods. The task is not simply to add as many keywords as possible. It is to document relationships clearly enough that a future reader can understand why a result has appeared and assess whether it answers the intended question."
          },
          {
            "label": "G",
            "text": "Sustainability also extends beyond the initial grant. Files may need migration, links may break and contributors may send corrections years after an exhibition closes. A modest collection with a reliable maintenance plan can offer better long-term access than a large launch followed by neglect. This does not justify keeping material unavailable until every uncertainty has been resolved. It requires making responsibilities explicit: who will answer a request, review a correction and explain a removal? A collection remains a service even when the photographs or letters themselves describe a distant past. The continued work should be included in its budget."
          },
          {
            "label": "H",
            "text": "Opening an archive is consequently an ongoing practice of translation, verification and negotiation. Technical conversion makes new forms of access possible, but the possibilities become useful through descriptions people recognise and evidence they can inspect. Communities should have ways to question the catalogue as well as contribute items to it. Their participation can reveal gaps that professional standards alone would miss. Success is best understood through the encounters the archive supports: a family locating a letter, a resident correcting a place name or a researcher recognising uncertainty. The file count records activity; these encounters show what the activity has enabled."
          }
        ],
        "part": 3,
        "provenance": {
          "kind": "original",
          "note": "Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức."
        },
        "intro": "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        "groups": [
          {
            "type": "features",
            "kind": "match",
            "range": [
              27,
              29
            ],
            "instruction": "Match each statement with the correct illustrative case. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Lowbank Archive"
              },
              {
                "key": "B",
                "text": "Cresswell Library"
              },
              {
                "key": "C",
                "text": "Redhaven Project"
              }
            ],
            "questions": [
              {
                "n": 27,
                "text": "Contributors could ask for permission decisions to be reconsidered.",
                "answer": "C",
                "explain": "Đoạn D: “contact route for reconsideration”."
              },
              {
                "n": 28,
                "text": "Alternative local names were linked to existing catalogue entries.",
                "answer": "A",
                "explain": "Đoạn B: “neighbourhood nicknames”."
              },
              {
                "n": 29,
                "text": "Uncertain transcriptions were shown alongside the source images.",
                "answer": "B",
                "explain": "Đoạn C: “uncertain readings visible”."
              }
            ]
          },
          {
            "type": "ynng",
            "kind": "tfng",
            "variant": "ynng",
            "range": [
              30,
              33
            ],
            "instruction": "Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 30,
                "text": "Online availability guarantees practical access.",
                "answer": "NO",
                "explain": "Đoạn A: “technical availability does not guarantee”."
              },
              {
                "n": 31,
                "text": "Consistent formats can help maintain and connect collections.",
                "answer": "YES",
                "explain": "Đoạn F: “allow collections to be maintained and connected”."
              },
              {
                "n": 32,
                "text": "The largest number of keywords always creates the best catalogue.",
                "answer": "NO",
                "explain": "Đoạn F: “not simply to add as many keywords as possible”."
              },
              {
                "n": 33,
                "text": "Every archive currently has a budget for long-term migration.",
                "answer": "NOT GIVEN",
                "explain": "Bài nói cần dự toán bảo trì, không khẳng định tất cả kho hiện có ngân sách."
              }
            ]
          },
          {
            "type": "endings",
            "kind": "match",
            "range": [
              34,
              36
            ],
            "instruction": "Complete each sentence with the correct ending, A–F.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "may offer better access than a neglected large launch."
              },
              {
                "key": "B",
                "text": "proves a community has no interest in its past."
              },
              {
                "key": "C",
                "text": "can be judged by file totals alone."
              },
              {
                "key": "D",
                "text": "can expose a mismatch in descriptive language."
              },
              {
                "key": "E",
                "text": "should not automatically be treated as exact."
              },
              {
                "key": "F",
                "text": "requires every local expression to be removed."
              }
            ],
            "questions": [
              {
                "n": 34,
                "text": "An unsuccessful search",
                "answer": "D",
                "explain": "Đoạn B: “mismatch between languages of description”."
              },
              {
                "n": 35,
                "text": "A searchable transcription",
                "answer": "E",
                "explain": "Đoạn C: “every searchable word as an exact transcription”."
              },
              {
                "n": 36,
                "text": "A modest maintained collection",
                "answer": "A",
                "explain": "Đoạn G: “better long-term access than a large launch”."
              }
            ]
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              37,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>Catalogue language should connect formal terms with community {{37}}.</p><p>Links between descriptions require {{38}}.</p><p>Long-term work includes file {{39}} and corrections.</p><p>A file count records activity, while encounters show what it has {{40}}.</p>",
            "answers": {
              "37": [
                "language"
              ],
              "38": [
                "checking"
              ],
              "39": [
                "migration"
              ],
              "40": [
                "enabled"
              ]
            },
            "explain": {
              "37": "Đoạn F: “community language”.",
              "38": "Đoạn F: “Such links need checking”.",
              "39": "Đoạn G: “Files may need migration”.",
              "40": "Đoạn H: “activity has enabled”."
            }
          }
        ],
        "vocab": [
          {
            "word": "workshop",
            "ipa": "/ˈwɜːkʃɒp/",
            "pos": "n.",
            "vi": "xưởng",
            "band": "7.0",
            "example": "Staff added alternative terms after workshops in which people described how they remembered places and events.",
            "id": "workshop",
            "topic": "media"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "Readers could therefore examine the evidence instead of treating every searchable word as an exact transcription.",
            "id": "evidence",
            "topic": "media"
          },
          {
            "word": "evaluation",
            "ipa": "/ɪˌvæljuˈeɪʃən/",
            "pos": "n.",
            "vi": "sự đánh giá",
            "band": "7.0",
            "example": "Evaluation should distinguish these functions rather than count every representation as a separate achievement.",
            "id": "evaluation",
            "topic": "media"
          },
          {
            "word": "maintenance",
            "ipa": "/ˈmeɪntənəns/",
            "pos": "n.",
            "vi": "sự bảo trì",
            "band": "7.0",
            "example": "A modest collection with a reliable maintenance plan can offer better long-term access than a large launch followed by neglect.",
            "id": "maintenance",
            "topic": "media"
          },
          {
            "word": "uncertainty",
            "ipa": "/ʌnˈsɜːtənti/",
            "pos": "n.",
            "vi": "sự không chắc chắn",
            "band": "7.0",
            "example": "This does not justify keeping material unavailable until every uncertainty has been resolved.",
            "id": "uncertainty",
            "topic": "media"
          },
          {
            "word": "verification",
            "ipa": "/ˌverɪfɪˈkeɪʃən/",
            "pos": "n.",
            "vi": "sự kiểm chứng",
            "band": "7.0",
            "example": "Opening an archive is consequently an ongoing practice of translation, verification and negotiation.",
            "id": "verification",
            "topic": "media"
          },
          {
            "word": "consistency",
            "ipa": "/kənˈsɪstənsi/",
            "pos": "n.",
            "vi": "tính nhất quán",
            "band": "7.0",
            "example": "The difficulty lies in confusing consistency with a requirement that every local expression disappear.",
            "id": "consistency",
            "topic": "media"
          },
          {
            "word": "transcription",
            "ipa": "/trænˈskrɪpʃən/",
            "pos": "n.",
            "vi": "bản chép lại",
            "band": "7.0",
            "example": "Automatic transcription produced useful drafts, but it repeatedly confused personal names and expressions absent from its training examples.",
            "id": "transcription",
            "topic": "media"
          },
          {
            "word": "migration",
            "ipa": "/maɪˈɡreɪʃən/",
            "pos": "n.",
            "vi": "sự di chuyển; chuyển đổi dữ liệu",
            "band": "7.0",
            "example": "Files may need migration, links may break and contributors may send corrections years after an exhibition closes.",
            "id": "migration",
            "topic": "media"
          },
          {
            "word": "catalogue",
            "ipa": "/ˈkætəlɒɡ/",
            "pos": "n.",
            "vi": "mục lục tra cứu",
            "band": "7.0",
            "example": "The question is therefore not only how much material has been converted, but whose ways of describing the past are represented in the catalogue.",
            "id": "catalogue",
            "topic": "media"
          },
          {
            "word": "negotiation",
            "ipa": "/nɪˌɡəʊʃiˈeɪʃən/",
            "pos": "n.",
            "vi": "sự thương lượng",
            "band": "7.0",
            "example": "Opening an archive is consequently an ongoing practice of translation, verification and negotiation.",
            "id": "negotiation",
            "topic": "media"
          },
          {
            "id": "preserve",
            "word": "preserve",
            "ipa": "/prɪˈzɜːv/",
            "pos": "v.",
            "band": "6.5",
            "vi": "bảo tồn, gìn giữ",
            "example": "The image preserves features that a text version omits, while the text may enable searching that an image alone cannot support.",
            "topic": "media"
          },
          {
            "id": "volunteer",
            "word": "volunteer",
            "ipa": "/ˌvɒlənˈtɪə/",
            "pos": "v.",
            "band": "6.5",
            "vi": "làm tình nguyện",
            "example": "Volunteers checked the transcriptions alongside images of the originals, and the interface made uncertain readings visible.",
            "topic": "media"
          },
          {
            "id": "resolution",
            "word": "resolution",
            "ipa": "/ˌrezəˈluːʃn/",
            "pos": "n.",
            "band": "7.0",
            "vi": "độ phân giải",
            "example": "Some contributors agreed to display an image but wanted restrictions on downloading a high-resolution version.",
            "topic": "media"
          }
        ]
      }
    ]
  },
  {
    "id": "R12",
    "title": "Practice Test 12 — Stars, Island Wildlife & Transport",
    "source": "Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật",
    "passages": [
      {
        "id": "R12-P1",
        "part": 1,
        "title": "The Lives of Stars",
        "topic": "science",
        "paragraphs": [
          {
            "label": "A",
            "text": "Astronomers estimate that the universe could contain up to one septillion stars – that’s a one followed by 24 zeros. Our Milky Way alone contains more than 100 billion, including our most well-studied star, the Sun. Stars are giant balls of hot gas – mostly hydrogen, with some helium and small amounts of other elements. Every star has its own life cycle, ranging from a few million to trillions of years, and its properties change as it ages. Stars form in large clouds of gas and dust called molecular clouds."
          },
          {
            "label": "B",
            "text": "Molecular clouds range from 1,000 to 10 million times the mass of the Sun and can span as much as hundreds of light-years. Molecular clouds are cold which causes gas to clump, creating high-density pockets. Some of these clumps can collide with each other or collect more matter, strengthening their gravitational force as their mass grows. Eventually, gravity causes some of these clumps to collapse. When this happens, friction causes the material to heat up, which eventually leads to the development of a protostar – a baby star."
          },
          {
            "label": "C",
            "text": "Batches of stars that have recently formed from molecular clouds are often called stellar clusters, and molecular clouds full of stellar clusters are called stellar nurseries. At first, most of the protostar’s energy comes from heat released by its initial collapse. After millions of years, immense pressures and temperatures in the star’s core squeeze the nuclei of hydrogen atoms together to form helium, a process called nuclear fusion. Nuclear fusion releases energy, which heats the star and prevents it from further collapsing under the force of gravity."
          },
          {
            "label": "D",
            "text": "Astronomers call stars that are stably undergoing nuclear fusion of hydrogen into helium main sequence stars . This is the longest phase of a star’s life. The star’s luminosity, size, and temperature will slowly change over millions or billions of years during this phase. Our Sun is roughly midway through its main sequence stage. A star’s gas provides its fuel, and its mass determines how rapidly it runs through its supply, with lower-mass stars burning longer, dimmer, and cooler than very massive stars. More massive stars must burn fuel at a higher rate to generate the energy that keeps them from collapsing under their own weight."
          },
          {
            "label": "E",
            "text": "Some low-mass stars will shine for trillions of years – longer than the universe has currently existed – while some massive stars will live for only a few million years. At the beginning of the end of a star’s life, its core runs out of hydrogen to convert into helium. The energy produced by fusion creates pressure inside the star that balances gravity’s tendency to pull matter together, so the core starts to collapse. But squeezing the core also increases its temperature and pressure, making the star slowly puff up."
          },
          {
            "label": "F",
            "text": "However, the details of the late stages of the star’s death depend strongly on its mass. A low-mass star’s atmosphere will keep expanding until it becomes a subgiant or giant star while fusion converts helium into carbon in the core. (This will be the fate of our Sun, in several billion years.) Some giants become unstable and pulsate, periodically inflating and ejecting some of their atmospheres. Eventually, all the star’s outer layers blow away, creating an expanding cloud of dust and gas called a planetary nebula."
          },
          {
            "label": "G",
            "text": "All that’s left of the star is its core, now called a white dwarf, a roughly Earth-sized stellar cinder that gradually cools over billions of years. A high-mass star goes further. Fusion converts carbon into heavier elements like oxygen, neon, and magnesium, which will become future fuel for the core. For the largest stars, this chain continues until silicon fuses into iron. These processes produce energy that keeps the core from collapsing, but each new fuel buys it less and less time. The whole process takes just a few million years. By the time silicon fuses into iron, the star runs out of fuel in a matter of days."
          },
          {
            "label": "H",
            "text": "The next step would be fusing iron into some heavier element but doing so requires energy instead of releasing it. The star’s iron core collapses until forces between the nuclei push the brakes, then it rebounds. This change creates a shock wave that travels outward through the star. The result is a huge explosion called a supernova. The core survives as an incredibly dense remnant, either a neutron star or a black hole . Material cast into the cosmos by supernovae and other stellar events will enrich future molecular clouds and become incorporated into the next generation of stars."
          }
        ],
        "provenance": {
          "kind": "public-information-excerpt",
          "publisher": "NASA Science",
          "url": "https://science.nasa.gov/universe/stars/",
          "rightsUrl": "https://www.nasa.gov/nasa-brand-center/images-and-media/",
          "note": "Trích tuyển văn bản giáo dục NASA Science; chia lại đoạn A–H để luyện đọc. Câu hỏi và lời giải do app biên soạn. Không ngụ ý NASA bảo trợ."
        },
        "intro": "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        "groups": [
          {
            "type": "tfng",
            "kind": "tfng",
            "variant": "tfng",
            "range": [
              1,
              5
            ],
            "instruction": "Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 1,
                "text": "All stars have the same life span.",
                "answer": "FALSE",
                "explain": "Đoạn A: “ranging from a few million to trillions”."
              },
              {
                "n": 2,
                "text": "Cold molecular clouds can form dense clumps.",
                "answer": "TRUE",
                "explain": "Đoạn B: “creating high-density pockets”."
              },
              {
                "n": 3,
                "text": "Main sequence is the shortest stage of stellar life.",
                "answer": "FALSE",
                "explain": "Đoạn D: “the longest phase”."
              },
              {
                "n": 4,
                "text": "Massive stars consume their fuel more quickly.",
                "answer": "TRUE",
                "explain": "Đoạn D: “burn fuel at a higher rate”."
              },
              {
                "n": 5,
                "text": "The earliest recorded supernova was observed in Asia.",
                "answer": "NOT GIVEN",
                "explain": "Không nêu nơi quan sát supernova sớm nhất được ghi lại."
              }
            ]
          },
          {
            "type": "note",
            "kind": "gap",
            "range": [
              6,
              9
            ],
            "instruction": "Complete the notes. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "Stellar evolution",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>A baby star is called a {{6}}.</p><p>Fusion initially changes hydrogen into {{7}}.</p><p>The remnant of a low-mass star is a white {{8}}.</p><p>A massive star may explode as a {{9}}.</p>",
            "answers": {
              "6": [
                "protostar"
              ],
              "7": [
                "helium"
              ],
              "8": [
                "dwarf"
              ],
              "9": [
                "supernova"
              ]
            },
            "explain": {
              "6": "Đoạn B: “a protostar”.",
              "7": "Đoạn C: “form helium”.",
              "8": "Đoạn G: “a white dwarf”.",
              "9": "Đoạn H: “called a supernova”."
            }
          },
          {
            "type": "short",
            "kind": "gap",
            "range": [
              10,
              13
            ],
            "instruction": "Complete the answers. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>What force causes a gas clump to collapse? {{10}}</p><p>Which element is produced by the fusion of silicon? {{11}}</p><p>What travels outward before a supernova? {{12}}</p><p>Give one possible dense remnant of a high-mass star. {{13}}</p>",
            "answers": {
              "10": [
                "gravity"
              ],
              "11": [
                "iron"
              ],
              "12": [
                "shock wave"
              ],
              "13": [
                "neutron star",
                "black hole"
              ]
            },
            "explain": {
              "10": "Đoạn B: “gravity causes”.",
              "11": "Đoạn G: “silicon fuses into iron”.",
              "12": "Đoạn H: “a shock wave”.",
              "13": "Đoạn H: “either a neutron star or a black hole”."
            }
          }
        ],
        "vocab": [
          {
            "word": "atmosphere",
            "ipa": "/ˈætməsfɪə/",
            "pos": "n.",
            "vi": "khí quyển",
            "band": "7.0",
            "example": "A low-mass star’s atmosphere will keep expanding until it becomes a subgiant or giant star while fusion converts helium into carbon in the core. (This will be the fate of our Sun, in several billion years.) Some giants become unstable and pulsate, periodically inflating and ejecting some of their atmospheres.",
            "id": "atmosphere",
            "topic": "science"
          },
          {
            "word": "core",
            "ipa": "/kɔː/",
            "pos": "n.",
            "vi": "lõi",
            "band": "7.0",
            "example": "After millions of years, immense pressures and temperatures in the star’s core squeeze the nuclei of hydrogen atoms together to form helium, a process called nuclear fusion.",
            "id": "core",
            "topic": "science"
          },
          {
            "word": "gravity",
            "ipa": "/ˈɡrævəti/",
            "pos": "n.",
            "vi": "lực hấp dẫn",
            "band": "7.0",
            "example": "Eventually, gravity causes some of these clumps to collapse.",
            "id": "gravity",
            "topic": "science"
          },
          {
            "word": "temperature",
            "ipa": "/ˈtemprətʃə/",
            "pos": "n.",
            "vi": "nhiệt độ",
            "band": "7.0",
            "example": "After millions of years, immense pressures and temperatures in the star’s core squeeze the nuclei of hydrogen atoms together to form helium, a process called nuclear fusion.",
            "id": "temperature",
            "topic": "science"
          },
          {
            "word": "dense",
            "ipa": "/dens/",
            "pos": "adj.",
            "vi": "dày đặc",
            "band": "7.0",
            "example": "The core survives as an incredibly dense remnant, either a neutron star or a black hole .",
            "id": "dense",
            "topic": "science"
          },
          {
            "word": "hydrogen",
            "ipa": "/ˈhaɪdrədʒən/",
            "pos": "n.",
            "vi": "hiđrô",
            "band": "7.0",
            "example": "Stars are giant balls of hot gas – mostly hydrogen, with some helium and small amounts of other elements.",
            "id": "hydrogen",
            "topic": "science"
          },
          {
            "word": "helium",
            "ipa": "/ˈhiːliəm/",
            "pos": "n.",
            "vi": "heli",
            "band": "7.0",
            "example": "Stars are giant balls of hot gas – mostly hydrogen, with some helium and small amounts of other elements.",
            "id": "helium",
            "topic": "science"
          },
          {
            "word": "gravitational",
            "ipa": "/ˌɡrævɪˈteɪʃənəl/",
            "pos": "adj.",
            "vi": "thuộc lực hấp dẫn",
            "band": "7.0",
            "example": "Some of these clumps can collide with each other or collect more matter, strengthening their gravitational force as their mass grows.",
            "id": "gravitational",
            "topic": "science"
          },
          {
            "word": "luminosity",
            "ipa": "/ˌluːmɪˈnɒsəti/",
            "pos": "n.",
            "vi": "độ sáng",
            "band": "7.0",
            "example": "The star’s luminosity, size, and temperature will slowly change over millions or billions of years during this phase.",
            "id": "luminosity",
            "topic": "science"
          },
          {
            "word": "fusion",
            "ipa": "/ˈfjuːʒən/",
            "pos": "n.",
            "vi": "sự hợp nhất; phản ứng nhiệt hạch",
            "band": "7.0",
            "example": "After millions of years, immense pressures and temperatures in the star’s core squeeze the nuclei of hydrogen atoms together to form helium, a process called nuclear fusion.",
            "id": "fusion",
            "topic": "science"
          },
          {
            "word": "protostar",
            "ipa": "/ˈprəʊtəʊstɑː/",
            "pos": "n.",
            "vi": "tiền sao",
            "band": "7.0",
            "example": "When this happens, friction causes the material to heat up, which eventually leads to the development of a protostar – a baby star.",
            "id": "protostar",
            "topic": "science"
          },
          {
            "word": "nebula",
            "ipa": "/ˈnebjələ/",
            "pos": "n.",
            "vi": "tinh vân",
            "band": "7.0",
            "example": "Eventually, all the star’s outer layers blow away, creating an expanding cloud of dust and gas called a planetary nebula.",
            "id": "nebula",
            "topic": "science"
          },
          {
            "word": "remnant",
            "ipa": "/ˈremnənt/",
            "pos": "n.",
            "vi": "phần còn lại",
            "band": "7.0",
            "example": "The core survives as an incredibly dense remnant, either a neutron star or a black hole .",
            "id": "remnant",
            "topic": "science"
          },
          {
            "word": "supernova",
            "ipa": "/ˌsuːpəˈnəʊvə/",
            "pos": "n.",
            "vi": "siêu tân tinh",
            "band": "7.0",
            "example": "The result is a huge explosion called a supernova.",
            "id": "supernova",
            "topic": "science"
          }
        ]
      },
      {
        "id": "R12-P2",
        "part": 2,
        "title": "Tortoises of the Galapagos",
        "topic": "animals",
        "paragraphs": [
          {
            "label": "A",
            "text": "We will now turn to the order of reptiles, which gives the most striking character to the zoology of these islands. The species are not numerous, but the numbers of individuals of each species are extraordinarily great. There is one small lizard belonging to a South American genus, and two species (and probably more) of the Amblyrhynchus—a genus confined to the Galapagos Islands. There is one snake which is numerous; it is identical, as I am informed by M. Bibron, with the Psammophis Temminckii from Chile. Of sea-turtle I believe there are more than one species, and of tortoises there are, as we shall presently show, two or three species or races."
          },
          {
            "label": "B",
            "text": "Of toads and frogs there are none: I was surprised at this, considering how well suited for them the temperate and damp upper woods appeared to be. It recalled to my mind the remark made by Bory St. Vincent, 173 namely, that none of this family are found on any of the volcanic islands in the great oceans. As far as I can ascertain from various works, this seems to hold good throughout the Pacific, and even in the large islands of the Sandwich archipelago."
          },
          {
            "label": "C",
            "text": "Mauritius offers an apparent exception, where I saw the Rana Mascariensis in abundance: this frog is said now to inhabit the Seychelles, Madagascar, and Bourbon; but on the other hand, Du Bois, in his voyage in 1669, states that there were no reptiles in Bourbon except tortoises; and the Officier du Roi asserts that before 1768 it had been attempted, without success, to introduce frogs into Mauritius—I presume for the purpose of eating: hence it may be well doubted whether this frog is an aboriginal of these islands."
          },
          {
            "label": "D",
            "text": "The absence of the frog family in the oceanic islands is the more remarkable, when contrasted with the case of lizards, which swarm on most of the smallest islands. May this difference not be caused, by the greater facility with which the eggs of lizards, protected by calcareous shells might be transported through salt-water, than could the slimy spawn of frogs? I will first describe the habits of the tortoise (Testudo nigra, formerly called Indica), which has been so frequently alluded to. These animals are found, I believe, on all the islands of the archipelago; certainly on the greater number."
          },
          {
            "label": "E",
            "text": "They frequent in preference the high damp parts, but they likewise live in the lower and arid districts. I have already shown, from the numbers which have been caught in a single day, how very numerous they must be. Some grow to an immense size: Mr. Lawson, an Englishman, and vice-governor of the colony, told us that he had seen several so large, that it required six or eight men to lift them from the ground; and that some had afforded as much as two hundred pounds of meat. The old males are the largest, the females rarely growing to so great a size: the male can readily be distinguished from the female by the greater length of its tail."
          },
          {
            "label": "F",
            "text": "The tortoises which live on those islands where there is no water, or in the lower and arid parts of the others, feed chiefly on the succulent cactus. Those which frequent the higher and damp regions, eat the leaves of various trees, a kind of berry (called guayavita) which is acid and austere, and likewise a pale green filamentous lichen (Usnera plicata), that hangs from the boughs of the trees. The tortoise is very fond of water, drinking large quantities, and wallowing in the mud."
          },
          {
            "label": "G",
            "text": "The larger islands alone possess springs, and these are always situated towards the central parts, and at a considerable height. The tortoises, therefore, which frequent the lower districts, when thirsty, are obliged to travel from a long distance. Hence broad and well-beaten paths branch off in every direction from the wells down to the sea-coast; and the Spaniards by following them up, first discovered the watering-places. When I landed at Chatham Island, I could not imagine what animal travelled so methodically along well-chosen tracks. Near the springs it was a curious spectacle to behold many of these huge creatures, one set eagerly travelling onwards with outstretched necks, and another set returning, after having drunk their fill."
          },
          {
            "label": "H",
            "text": "When the tortoise arrives at the spring, quite regardless of any spectator, he buries his head in the water above his eyes, and greedily swallows great mouthfuls, at the rate of about ten in a minute. The inhabitants say each animal stays three or four days in the neighbourhood of the water, and then returns to the lower country; but they differed respecting the frequency of these visits. The animal probably regulates them according to the nature of the food on which it has lived."
          }
        ],
        "provenance": {
          "kind": "public-domain-excerpt",
          "publisher": "Charles Darwin — The Voyage of the Beagle (1839)",
          "url": "https://www.gutenberg.org/cache/epub/944/pg944-images.html",
          "rightsUrl": "https://www.gutenberg.org/policy/license.html",
          "note": "Trích văn bản lịch sử thuộc phạm vi công cộng: Charles Darwin, The Voyage of the Beagle (1839); giữ ngôn ngữ và góc nhìn thời kỳ đó, chia lại đoạn A–H. Dùng để luyện đọc hiểu, không trình bày như kiến thức khoa học hoặc quan điểm hiện hành. Câu hỏi và lời giải do app biên soạn. Nguồn số hóa có kèm giấy phép Project Gutenberg."
        },
        "intro": "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        "groups": [
          {
            "type": "headings",
            "kind": "match",
            "range": [
              14,
              17
            ],
            "instruction": "Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.",
            "allowReuse": false,
            "options": [
              {
                "key": "i",
                "text": "The unexpected absence of frogs"
              },
              {
                "key": "ii",
                "text": "A possible island exception examined historically"
              },
              {
                "key": "iii",
                "text": "A small variety but large numbers of reptiles"
              },
              {
                "key": "iv",
                "text": "The classification of island birds"
              },
              {
                "key": "v",
                "text": "A hypothesis about transport and a turn to tortoises"
              },
              {
                "key": "vi",
                "text": "The introduction of lizards by settlers"
              }
            ],
            "questions": [
              {
                "n": 14,
                "text": "Paragraph A",
                "answer": "iii",
                "explain": "Đoạn A: “species are not numerous”. Ít loài nhưng số cá thể của từng loài rất lớn."
              },
              {
                "n": 15,
                "text": "Paragraph B",
                "answer": "i",
                "explain": "Đoạn B: “Of toads and frogs there are none”. Tác giả ngạc nhiên vì không thấy ếch nhái dù môi trường có vẻ phù hợp."
              },
              {
                "n": 16,
                "text": "Paragraph C",
                "answer": "ii",
                "explain": "Đoạn C: “introduce frogs into Mauritius”. Các ghi chép lịch sử khiến ông nghi ngờ ếch tại Mauritius là loài được đưa vào."
              },
              {
                "n": 17,
                "text": "Paragraph D",
                "answer": "v",
                "explain": "Đoạn D: “eggs of lizards”. Giả thuyết vận chuyển trứng giải thích khác biệt, rồi bài chuyển sang rùa."
              }
            ]
          },
          {
            "type": "info",
            "kind": "match",
            "range": [
              18,
              20
            ],
            "instruction": "Which paragraph contains the following information? You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Paragraph A"
              },
              {
                "key": "B",
                "text": "Paragraph B"
              },
              {
                "key": "C",
                "text": "Paragraph C"
              },
              {
                "key": "D",
                "text": "Paragraph D"
              },
              {
                "key": "E",
                "text": "Paragraph E"
              },
              {
                "key": "F",
                "text": "Paragraph F"
              },
              {
                "key": "G",
                "text": "Paragraph G"
              },
              {
                "key": "H",
                "text": "Paragraph H"
              }
            ],
            "questions": [
              {
                "n": 18,
                "text": "A physical feature used to distinguish male and female tortoises",
                "answer": "E",
                "explain": "Đoạn E: “greater length of its tail”."
              },
              {
                "n": 19,
                "text": "Food associated with the driest habitats",
                "answer": "F",
                "explain": "Đoạn F: “feed chiefly on the succulent cactus”."
              },
              {
                "n": 20,
                "text": "Routes to water helping humans find springs",
                "answer": "G",
                "explain": "Đoạn G: “Spaniards by following them up”."
              }
            ]
          },
          {
            "type": "sentence",
            "kind": "gap",
            "range": [
              21,
              23
            ],
            "instruction": "Complete the sentences. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.",
            "title": "",
            "wordLimit": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            "content": "<p>The protective quality of lizard eggs comes from {{21}} shells.</p><p>In higher damp areas, tortoises eat leaves, berries and {{22}}.</p><p>According to residents, animals may remain near water for three or four {{23}}.</p>",
            "answers": {
              "21": [
                "calcareous"
              ],
              "22": [
                "lichen"
              ],
              "23": [
                "days"
              ]
            },
            "explain": {
              "21": "Đoạn D: “protected by calcareous shells”.",
              "22": "Đoạn F: “filamentous lichen”.",
              "23": "Đoạn H: “three or four days”."
            }
          },
          {
            "type": "mcq",
            "kind": "mcq",
            "range": [
              24,
              26
            ],
            "instruction": "Choose the correct letter, <b>A, B or C</b>.",
            "questions": [
              {
                "n": 24,
                "text": "Why is the presence of frogs on Mauritius not decisive for Darwin?",
                "options": [
                  "A He thinks the island has no water",
                  "B He doubts they were originally native there",
                  "C He has never read about the island"
                ],
                "answer": "B",
                "explain": "Đoạn C: “whether this frog is an aboriginal”."
              },
              {
                "n": 25,
                "text": "Where does the passage locate springs?",
                "options": [
                  "A On all islands at the coastline",
                  "B Only in the lowest dry districts",
                  "C At considerable height in the central areas of larger islands"
                ],
                "answer": "C",
                "explain": "Đoạn G: “larger islands alone possess springs”."
              },
              {
                "n": 26,
                "text": "What may explain the frequency of visits to water?",
                "options": [
                  "A The nature of the animals’ food",
                  "B The number of human spectators",
                  "C A single timetable followed by every animal"
                ],
                "answer": "A",
                "explain": "Đoạn H: “according to the nature of the food”."
              }
            ]
          }
        ],
        "vocab": [
          {
            "word": "reptile",
            "ipa": "/ˈreptaɪl/",
            "pos": "n.",
            "vi": "bò sát",
            "band": "7.0",
            "example": "We will now turn to the order of reptiles, which gives the most striking character to the zoology of these islands.",
            "id": "reptile",
            "topic": "animals"
          },
          {
            "word": "genus",
            "ipa": "/ˈdʒiːnəs/",
            "pos": "n.",
            "vi": "chi sinh học",
            "band": "7.0",
            "example": "There is one small lizard belonging to a South American genus, and two species (and probably more) of the Amblyrhynchus—a genus confined to the Galapagos Islands.",
            "id": "genus",
            "topic": "animals"
          },
          {
            "word": "archipelago",
            "ipa": "/ˌɑːkɪˈpeləɡəʊ/",
            "pos": "n.",
            "vi": "quần đảo",
            "band": "7.0",
            "example": "As far as I can ascertain from various works, this seems to hold good throughout the Pacific, and even in the large islands of the Sandwich archipelago.",
            "id": "archipelago",
            "topic": "animals"
          },
          {
            "word": "aboriginal",
            "ipa": "/ˌæbəˈrɪdʒənəl/",
            "pos": "adj.",
            "vi": "bản địa",
            "band": "7.0",
            "example": "Mauritius offers an apparent exception, where I saw the Rana Mascariensis in abundance: this frog is said now to inhabit the Seychelles, Madagascar, and Bourbon; but on the other hand, Du Bois, in his voyage in 1669, states that there were no reptiles in Bourbon except tortoises; and the Officier du Roi asserts that before 1768 it had been attempted, without success, to introduce frogs into Mauritius—I presume for the purpose of eating: hence it may be well doubted whether this frog is an aboriginal of these islands.",
            "id": "aboriginal",
            "topic": "animals"
          },
          {
            "word": "arid",
            "ipa": "/ˈærɪd/",
            "pos": "adj.",
            "vi": "khô cằn",
            "band": "7.0",
            "example": "They frequent in preference the high damp parts, but they likewise live in the lower and arid districts.",
            "id": "arid",
            "topic": "animals"
          },
          {
            "word": "succulent",
            "ipa": "/ˈsʌkjələnt/",
            "pos": "adj.",
            "vi": "mọng nước",
            "band": "7.0",
            "example": "The tortoises which live on those islands where there is no water, or in the lower and arid parts of the others, feed chiefly on the succulent cactus.",
            "id": "succulent",
            "topic": "animals"
          },
          {
            "word": "filamentous",
            "ipa": "/ˌfɪləˈmentəs/",
            "pos": "adj.",
            "vi": "dạng sợi",
            "band": "7.0",
            "example": "Those which frequent the higher and damp regions, eat the leaves of various trees, a kind of berry (called guayavita) which is acid and austere, and likewise a pale green filamentous lichen (Usnera plicata), that hangs from the boughs of the trees.",
            "id": "filamentous",
            "topic": "animals"
          },
          {
            "word": "lichen",
            "ipa": "/ˈlaɪkən/",
            "pos": "n.",
            "vi": "địa y",
            "band": "7.0",
            "example": "Those which frequent the higher and damp regions, eat the leaves of various trees, a kind of berry (called guayavita) which is acid and austere, and likewise a pale green filamentous lichen (Usnera plicata), that hangs from the boughs of the trees.",
            "id": "lichen",
            "topic": "animals"
          },
          {
            "word": "calcareous",
            "ipa": "/kælˈkeəriəs/",
            "pos": "adj.",
            "vi": "chứa canxi cacbonat",
            "band": "7.0",
            "example": "May this difference not be caused, by the greater facility with which the eggs of lizards, protected by calcareous shells might be transported through salt-water, than could the slimy spawn of frogs?",
            "id": "calcareous",
            "topic": "animals"
          },
          {
            "word": "spawn",
            "ipa": "/spɔːn/",
            "pos": "n.",
            "vi": "trứng động vật dưới nước",
            "band": "7.0",
            "example": "May this difference not be caused, by the greater facility with which the eggs of lizards, protected by calcareous shells might be transported through salt-water, than could the slimy spawn of frogs?",
            "id": "spawn",
            "topic": "animals"
          },
          {
            "word": "swarm",
            "ipa": "/swɔːm/",
            "pos": "v.",
            "vi": "tụ tập đông; nhung nhúc",
            "band": "7.0",
            "example": "The absence of the frog family in the oceanic islands is the more remarkable, when contrasted with the case of lizards, which swarm on most of the smallest islands.",
            "id": "swarm",
            "topic": "animals"
          },
          {
            "word": "spectator",
            "ipa": "/spekˈteɪtə/",
            "pos": "n.",
            "vi": "người xem",
            "band": "7.0",
            "example": "When the tortoise arrives at the spring, quite regardless of any spectator, he buries his head in the water above his eyes, and greedily swallows great mouthfuls, at the rate of about ten in a minute.",
            "id": "spectator",
            "topic": "animals"
          },
          {
            "word": "temperate",
            "ipa": "/ˈtempərət/",
            "pos": "adj.",
            "vi": "ôn hòa",
            "band": "7.0",
            "example": "Of toads and frogs there are none: I was surprised at this, considering how well suited for them the temperate and damp upper woods appeared to be.",
            "id": "temperate",
            "topic": "animals"
          },
          {
            "id": "regulate",
            "word": "regulate",
            "ipa": "/ˈreɡjuleɪt/",
            "pos": "v.",
            "band": "6.5",
            "vi": "điều tiết, quản lý bằng quy định",
            "example": "The animal probably regulates them according to the nature of the food on which it has lived.",
            "topic": "animals"
          }
        ]
      },
      {
        "id": "R12-P3",
        "title": "The Fare and the Journey",
        "topic": "travel",
        "paragraphs": [
          {
            "label": "A",
            "text": "A cheaper bus ticket changes the price of a journey, but it does not necessarily make the journey possible. A service may run too infrequently, stop too far from a destination or finish before a worker's shift ends. These limitations help explain why a fare policy should be evaluated alongside the service it accompanies. Counting additional boardings can reveal a response to price, yet cannot by itself show whose access has improved. Some passengers may make extra leisure trips while others remain unable to reach essential appointments. The relationship between affordability and usefulness must therefore be investigated rather than assumed from the attractiveness of a discount."
          },
          {
            "label": "B",
            "text": "In the fictional city of Oakford, a reduced-fare pass was introduced for evening workers. Early use was lower than expected. Interviews revealed that the final bus left before several major workplaces closed, so the pass helped only the outward half of the commute. The city extended one late service before reassessing the scheme. This adjustment addressed a timetable constraint rather than a failure to advertise the discount. Oakford's experience illustrates the importance of examining the whole journey, including the return. An affordable outward trip does not create dependable mobility if the passenger must still find an expensive alternative home."
          },
          {
            "label": "C",
            "text": "Fictional Bellhaven offered a simple flat fare across its network. The change made costs easier for occasional riders to predict, particularly when they needed to transfer between routes. However, passengers on very short trips had previously paid less. The transport authority published these differences instead of treating simplicity as a benefit without distributional costs. It also compared transfer reliability, since a ticket valid across the network was less useful when connections were regularly missed. A pricing reform can remove one barrier while leaving another unchanged, and the people gaining from the simpler system need not be identical to those who face the largest service difficulties."
          },
          {
            "label": "D",
            "text": "The imaginary district of Marshgate trialled free travel on a weekend market route. Boardings increased, but survey responses showed that some new passengers had previously walked the short distance. The route also brought residents from an outer estate who had seldom visited the market. These were different effects of the same scheme. The authority distinguished trips replacing car journeys, trips replacing walking and newly possible trips. It did not assume that every additional boarding represented a car removed from the road. This classification made it possible to discuss access and traffic reduction separately, even when both were legitimate reasons for supporting public transport."
          },
          {
            "label": "E",
            "text": "Such distinctions matter when a policy has several aims. Increasing social access, reducing congestion and encouraging healthier travel can overlap without moving together in every case. A scheme that improves access for isolated residents may have little immediate effect on peak traffic. That result need not represent failure if access was an explicit objective. Difficulties arise when success is claimed against whichever measure happens to improve, while the original purpose quietly disappears. Evaluation should state priorities in advance and retain evidence about trade-offs. Public discussion becomes clearer when different benefits are described as different benefits rather than compressed into a single favourable passenger total."
          },
          {
            "label": "F",
            "text": "Time is another component of affordability. A cheaper route requiring two long waits may be impractical for someone paid by the hour or responsible for collecting a child. Passengers do not exchange money and time under identical conditions. An average value assigned to waiting can conceal these differences, especially when delays are unpredictable. Reliable information and coordinated services can therefore strengthen the effect of a fare reduction. They should not be presented as substitutes that make price irrelevant, but as conditions that influence whether a lower price can be converted into a useful opportunity to travel."
          },
          {
            "label": "G",
            "text": "There are also constraints on public budgets. A fare reduction may require continuing support, and that expenditure competes with other uses of the same money, including service frequency. Comparing the alternatives requires more than asking which attracts the largest number of riders in a short trial. It requires understanding where capacity is limited, which journeys remain impossible and how stable the funding will be. A temporary discount can produce useful evidence, but users should know its duration. People may reorganise work or care around an apparently affordable service, making an unexplained withdrawal costly even when the scheme was initially described as experimental."
          },
          {
            "label": "H",
            "text": "The strongest account of a fare policy therefore connects the ticket to the journey it is meant to enable. It considers the outward and return trip, the reliability of connections and the circumstances of people who still cannot use the service. Lower prices can make a substantial contribution, but their effects depend on these surrounding conditions. Assessment should remain open to results that differ across groups and purposes. A useful transport policy is one that makes its intended opportunities more achievable, with costs and limits visible, rather than one whose success rests entirely on a larger number printed beside the word passengers."
          }
        ],
        "part": 3,
        "provenance": {
          "kind": "original",
          "note": "Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức."
        },
        "intro": "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        "groups": [
          {
            "type": "features",
            "kind": "match",
            "range": [
              27,
              29
            ],
            "instruction": "Match each statement with the correct illustrative case. You may use a letter more than once.",
            "allowReuse": true,
            "options": [
              {
                "key": "A",
                "text": "Oakford"
              },
              {
                "key": "B",
                "text": "Bellhaven"
              },
              {
                "key": "C",
                "text": "Marshgate"
              }
            ],
            "questions": [
              {
                "n": 27,
                "text": "A flat price benefited some passengers but raised costs for short trips.",
                "answer": "B",
                "explain": "Đoạn C: “short trips had previously paid less”."
              },
              {
                "n": 28,
                "text": "An additional late service addressed the return journey.",
                "answer": "A",
                "explain": "Đoạn B: “extended one late service”."
              },
              {
                "n": 29,
                "text": "New boardings included journeys previously made on foot.",
                "answer": "C",
                "explain": "Đoạn D: “previously walked the short distance”."
              }
            ]
          },
          {
            "type": "ynng",
            "kind": "tfng",
            "variant": "ynng",
            "range": [
              30,
              33
            ],
            "instruction": "Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.",
            "questions": [
              {
                "n": 30,
                "text": "Lower fares automatically make every necessary journey possible.",
                "answer": "NO",
                "explain": "Đoạn A: “does not necessarily make the journey possible”."
              },
              {
                "n": 31,
                "text": "A policy can improve access without immediately reducing peak traffic.",
                "answer": "YES",
                "explain": "Đoạn E: “little immediate effect on peak traffic”."
              },
              {
                "n": 32,
                "text": "Priorities should be established before results are assessed.",
                "answer": "YES",
                "explain": "Đoạn E: “state priorities in advance”."
              },
              {
                "n": 33,
                "text": "Fare reductions cost more than frequency increases in most cities.",
                "answer": "NOT GIVEN",
                "explain": "Không có so sánh chi phí giữa hai chính sách trên đa số thành phố."
              }
            ]
          },
          {
            "type": "endings",
            "kind": "match",
            "range": [
              34,
              36
            ],
            "instruction": "Complete each sentence with the correct ending, A–F.",
            "allowReuse": false,
            "options": [
              {
                "key": "A",
                "text": "need not indicate an equivalent reduction in car journeys."
              },
              {
                "key": "B",
                "text": "removes the relevance of journey timing."
              },
              {
                "key": "C",
                "text": "may still be unhelpful if connections are unreliable."
              },
              {
                "key": "D",
                "text": "always represents one fewer car journey."
              },
              {
                "key": "E",
                "text": "should make its duration clear to passengers."
              },
              {
                "key": "F",
                "text": "should be continued without reviewing its funding."
              }
            ],
            "questions": [
              {
                "n": 34,
                "text": "A ticket allowing transfers",
                "answer": "C",
                "explain": "Đoạn C: “connections were regularly missed”."
              },
              {
                "n": 35,
                "text": "A larger boarding total",
                "answer": "A",
                "explain": "Đoạn D: “every additional boarding represented a car removed”."
              },
              {
                "n": 36,
                "text": "A time-limited discount",
                "answer": "E",
                "explain": "Đoạn G: “users should know its duration”."
              }
            ]
          },
          {
            "type": "summary",
            "kind": "gap",
            "range": [
              37,
              40
            ],
            "instruction": "Complete the summary. Write <b>NO MORE THAN TWO WORDS</b> for each answer.",
            "title": "Complete the summary",
            "wordLimit": "NO MORE THAN TWO WORDS",
            "content": "<p>The whole trip includes both the outward and {{37}} journey.</p><p>Price is only one barrier; a poorly matched {{38}} can remain another.</p><p>Transport spending may also be used to increase service {{39}}.</p><p>A trial should explain the stability of its {{40}}.</p>",
            "answers": {
              "37": [
                "return"
              ],
              "38": [
                "timetable"
              ],
              "39": [
                "frequency"
              ],
              "40": [
                "funding"
              ]
            },
            "explain": {
              "37": "Đoạn H: “outward and return trip”.",
              "38": "Đoạn B: “timetable constraint”.",
              "39": "Đoạn G: “including service frequency”.",
              "40": "Đoạn G: “how stable the funding will be”."
            }
          }
        ],
        "vocab": [
          {
            "word": "trade",
            "ipa": "/treɪd/",
            "pos": "n.",
            "vi": "nghề; thương mại",
            "band": "7.0",
            "example": "Evaluation should state priorities in advance and retain evidence about trade-offs.",
            "id": "trade",
            "topic": "travel"
          },
          {
            "word": "capacity",
            "ipa": "/kəˈpæsəti/",
            "pos": "n.",
            "vi": "khả năng; sức chứa",
            "band": "7.0",
            "example": "It requires understanding where capacity is limited, which journeys remain impossible and how stable the funding will be.",
            "id": "capacity",
            "topic": "travel"
          },
          {
            "word": "evidence",
            "ipa": "/ˈevɪdəns/",
            "pos": "n.",
            "vi": "bằng chứng",
            "band": "7.0",
            "example": "Evaluation should state priorities in advance and retain evidence about trade-offs.",
            "id": "evidence",
            "topic": "travel"
          },
          {
            "word": "evaluation",
            "ipa": "/ɪˌvæljuˈeɪʃən/",
            "pos": "n.",
            "vi": "sự đánh giá",
            "band": "7.0",
            "example": "Evaluation should state priorities in advance and retain evidence about trade-offs.",
            "id": "evaluation",
            "topic": "travel"
          },
          {
            "word": "reliability",
            "ipa": "/rɪˌlaɪəˈbɪləti/",
            "pos": "n.",
            "vi": "độ tin cậy",
            "band": "7.0",
            "example": "It also compared transfer reliability, since a ticket valid across the network was less useful when connections were regularly missed.",
            "id": "reliability",
            "topic": "travel"
          },
          {
            "word": "constraint",
            "ipa": "/kənˈstreɪnt/",
            "pos": "n.",
            "vi": "hạn chế; ràng buộc",
            "band": "7.0",
            "example": "This adjustment addressed a timetable constraint rather than a failure to advertise the discount.",
            "id": "constraint",
            "topic": "travel"
          },
          {
            "word": "compressed",
            "ipa": "/kəmˈprest/",
            "pos": "adj.",
            "vi": "được nén; rút gọn",
            "band": "7.0",
            "example": "Public discussion becomes clearer when different benefits are described as different benefits rather than compressed into a single favourable passenger total.",
            "id": "compressed",
            "topic": "travel"
          },
          {
            "word": "substitute",
            "ipa": "/ˈsʌbstɪtjuːt/",
            "pos": "n.",
            "vi": "vật thay thế",
            "band": "7.0",
            "example": "They should not be presented as substitutes that make price irrelevant, but as conditions that influence whether a lower price can be converted into a useful opportunity to travel.",
            "id": "substitute",
            "topic": "travel"
          },
          {
            "word": "affordability",
            "ipa": "/əˌfɔːdəˈbɪləti/",
            "pos": "n.",
            "vi": "khả năng chi trả",
            "band": "7.0",
            "example": "The relationship between affordability and usefulness must therefore be investigated rather than assumed from the attractiveness of a discount.",
            "id": "affordability",
            "topic": "travel"
          },
          {
            "word": "congestion",
            "ipa": "/kənˈdʒestʃən/",
            "pos": "n.",
            "vi": "sự tắc nghẽn",
            "band": "7.0",
            "example": "Increasing social access, reducing congestion and encouraging healthier travel can overlap without moving together in every case.",
            "id": "congestion",
            "topic": "travel"
          },
          {
            "word": "commute",
            "ipa": "/kəˈmjuːt/",
            "pos": "n./v.",
            "vi": "việc đi làm hằng ngày; đi làm",
            "band": "7.0",
            "example": "Interviews revealed that the final bus left before several major workplaces closed, so the pass helped only the outward half of the commute.",
            "id": "commute",
            "topic": "travel"
          },
          {
            "word": "timetable",
            "ipa": "/ˈtaɪmteɪbəl/",
            "pos": "n.",
            "vi": "lịch trình",
            "band": "7.0",
            "example": "This adjustment addressed a timetable constraint rather than a failure to advertise the discount.",
            "id": "timetable",
            "topic": "travel"
          },
          {
            "id": "destination",
            "word": "destination",
            "ipa": "/ˌdestɪˈneɪʃn/",
            "pos": "n.",
            "band": "6.5",
            "vi": "điểm đến",
            "example": "A service may run too infrequently, stop too far from a destination or finish before a worker's shift ends.",
            "topic": "travel"
          },
          {
            "id": "public-transport",
            "word": "public transport",
            "ipa": "/ˌpʌblɪk ˈtrænspɔːt/",
            "pos": "collocation",
            "band": "6.5",
            "vi": "giao thông công cộng",
            "example": "This classification made it possible to discuss access and traffic reduction separately, even when both were legitimate reasons for supporting public transport.",
            "topic": "travel"
          }
        ]
      }
    ]
  }
];
tests.forEach(function(test){window.IELTS.data.readingTests.push(test);});
})();
