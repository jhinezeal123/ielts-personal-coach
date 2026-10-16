/* data/reading-1.js (RD1) — Academic Reading Practice Test 1 (original text, biên soạn cho luyện tập) */
(function () {
  "use strict";
  var IELTS = window.IELTS;

  var TFNG_INSTR = function (a, b) {
    return "Do the following statements agree with the information given in Reading Passage 1?<br>" +
      "In boxes " + a + "–" + b + " on your answer sheet, write<br>" +
      "<b>TRUE</b> if the statement agrees with the information<br>" +
      "<b>FALSE</b> if the statement contradicts the information<br>" +
      "<b>NOT GIVEN</b> if there is no information on this";
  };

  /* ===================================================================== */
  /* PASSAGE 1 — history                                                    */
  /* ===================================================================== */
  var P1 = {
    id: "R1-P1",
    part: 1,
    title: "The Frozen Water Trade",
    topic: "history",
    intro: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
    paragraphs: [
      { label: "", text: "For most of human history, ice was a luxury that only the wealthy could enjoy outside the coldest months. Ancient rulers in Persia, China and Rome had snow and ice carried down from mountains and stored in pits insulated with straw, but such supplies were small, expensive and unreliable. It was not until the nineteenth century that ice became a commodity traded across oceans and consumed by ordinary households. The story of how this happened is one of ambition, technical ingenuity and, eventually, sudden decline." },
      { label: "", text: "The trade began in New England, a region with long, harsh winters and an abundance of freshwater lakes and ponds. In 1806, a young Boston merchant named Frederic Tudor sent a shipload of ice to the Caribbean island of Martinique. Most of the people who knew him considered the venture absurd, and the first voyage was a commercial failure: much of the cargo melted, and the local population had little idea what to do with the ice that survived. Tudor, however, was convinced that people living in hot climates would pay for cold drinks and preserved food once they had experienced them. He spent the following years experimenting with ways to reduce melting and persuading bar owners to serve chilled drinks, sometimes offering ice free of charge until customers developed a taste for it." },
      { label: "", text: "The central problem was insulation. Early shipments were packed in hay, which offered limited protection. Through trial and error, traders discovered that sawdust, a waste product of the region's many timber mills, was far more effective. Packed tightly around large blocks, it slowed the transfer of heat so successfully that losses during long voyages fell dramatically. Because sawdust was otherwise worthless, it added almost nothing to the cost of a shipment. Equally important was the design of the storage buildings, known as ice houses, at both ends of the journey. These were constructed with double walls, the space between them filled with insulating material, and they were often partly built below ground, where temperatures remain relatively stable." },
      { label: "", text: "Harvesting methods also changed. In the early years, workers cut ice by hand using axes and saws, producing blocks of irregular sizes that were difficult to stack and wasted valuable space in ships' holds. In the late 1820s, one of Tudor's suppliers, Nathaniel Wyeth, introduced a horse-drawn cutter that scored the frozen surface of a pond in a regular grid. Workers could then break off blocks of identical dimensions, which fitted together neatly and, once stacked, melted more slowly because less of their surface was exposed to the air. The new equipment allowed a small team to harvest in a single day what had previously required weeks of labour." },
      { label: "", text: "With these improvements, the market expanded rapidly. In 1833, a ship carrying around 180 tons of New England ice reached Calcutta in India after a voyage of four months, with more than half of its cargo still frozen. Within a few decades, American ice was being sold in South America, the Caribbean, China and Australia. At home, demand grew even faster. Expanding cities such as New York and Philadelphia relied on ice to keep meat, fish and dairy products fresh, while brewers used it to control fermentation during the warm months. By the 1880s, the harvest on the Hudson River alone employed tens of thousands of seasonal workers, many of them farmers who welcomed the chance to earn wages in winter, when there was little work to be done on the land." },
      { label: "", text: "The availability of cheap ice gradually changed the way people ate. Households acquired 'iceboxes', wooden cabinets lined with tin or zinc, in which a block delivered by an iceman several times a week kept food cool. Fresh produce could now be transported over greater distances, and diets became more varied. Railway companies introduced refrigerated wagons, cooled by ice loaded at stations along the route, which enabled meat from the Midwest to be sold in the cities of the east coast." },
      { label: "", text: "Yet the industry contained the seeds of its own decline. Natural ice depended on the weather, and an unusually mild winter could cause severe shortages and sharp price rises. In addition, as cities grew, many of the rivers and ponds from which ice was cut became polluted with sewage and industrial waste, and public health officials began to warn that natural ice might carry disease. Meanwhile, engineers had been developing machines that could produce ice artificially. Early versions were costly and unreliable, but by the end of the nineteenth century, factories were manufacturing clean ice throughout the year, regardless of the climate. The final blow came in the early twentieth century with the arrival of electric household refrigerators, which made the iceman unnecessary. By the 1930s, the great harvests had virtually disappeared, and many ice houses had been demolished or converted to other uses." },
      { label: "", text: "Although the natural ice trade lasted little more than a century, its influence was considerable. It created the expectation that food and drink should be available cold at any time of year, and it established distribution networks and storage practices that the refrigeration industry would later inherit. Some historians also argue that it helped to turn New England, a region with few natural resources other than timber and granite, into an important participant in global trade." }
    ],
    groups: [
      {
        type: "tfng", kind: "tfng", variant: "tfng", range: [1, 6],
        instruction: TFNG_INSTR(1, 6),
        questions: [
          { n: 1, text: "In ancient times, some rulers had ice stored in pits that were insulated with straw.", answer: "TRUE",
            explain: "Đoạn 1: 'Ancient rulers in Persia, China and Rome had snow and ice carried down from mountains and stored in pits insulated with straw' → khớp hoàn toàn với câu hỏi → TRUE." },
          { n: 2, text: "Tudor's first shipment of ice to Martinique made a profit.", answer: "FALSE",
            explain: "Đoạn 2: 'the first voyage was a commercial failure: much of the cargo melted' → chuyến đầu tiên thất bại về thương mại, mâu thuẫn với 'made a profit' → FALSE." },
          { n: 3, text: "Tudor sometimes gave ice away in order to create demand for it.", answer: "TRUE",
            explain: "Đoạn 2: 'sometimes offering ice free of charge until customers developed a taste for it' → 'free of charge' = 'gave ice away', mục đích là để khách quen dùng (tạo nhu cầu) → TRUE." },
          { n: 4, text: "Ice houses were normally built entirely above ground.", answer: "FALSE",
            explain: "Đoạn 3: 'they were often partly built below ground, where temperatures remain relatively stable' → nhà chứa băng thường được xây một phần dưới mặt đất, mâu thuẫn với 'entirely above ground' → FALSE." },
          { n: 5, text: "Wyeth's horse-drawn cutter was soon adopted by ice harvesters in Europe.", answer: "NOT GIVEN",
            explain: "Đoạn 4 chỉ nói Wyeth 'introduced a horse-drawn cutter' và nó giúp thu hoạch nhanh hơn; bài không hề nhắc đến châu Âu hay việc người khác áp dụng máy này → NOT GIVEN." },
          { n: 6, text: "The ice that arrived in Calcutta in 1833 was sold at a high price.", answer: "NOT GIVEN",
            explain: "Đoạn 5 chỉ cho biết con tàu tới Calcutta 'with more than half of its cargo still frozen'; bài không nói gì về giá bán số băng đó → NOT GIVEN." }
        ]
      },
      {
        type: "note", kind: "gap", range: [7, 10],
        instruction: "Complete the notes below.<br>Choose <b>ONE WORD ONLY</b> from the passage for each answer.<br>Write your answers in boxes 7–10 on your answer sheet.",
        title: "The natural ice trade",
        wordLimit: "ONE WORD ONLY",
        content:
          "<p><b>Harvesting</b></p><ul>" +
          "<li>early method: blocks cut by hand with axes and saws – irregular sizes</li>" +
          "<li>horse-drawn cutter produced blocks of identical {{7}}, which were easy to stack</li></ul>" +
          "<p><b>Uses of ice</b></p><ul>" +
          "<li>cities: kept meat, fish and dairy products fresh</li>" +
          "<li>{{8}} used ice to control fermentation in warm weather</li>" +
          "<li>homes: food kept cool in wooden cabinets called {{9}}</li>" +
          "<li>transport: refrigerated railway {{10}} carried meat from the Midwest</li></ul>" +
          "<p><b>Reasons for decline</b></p><ul>" +
          "<li>mild winters led to shortages and higher prices</li>" +
          "<li>rivers and ponds polluted with sewage and industrial waste</li></ul>",
        answers: {
          "7": ["dimensions"],
          "8": ["brewers"],
          "9": ["iceboxes", "ice-boxes"],
          "10": ["wagons"]
        },
        explain: {
          "7": "Đoạn 4: 'Workers could then break off blocks of identical dimensions, which fitted together neatly' → dimensions.",
          "8": "Đoạn 5: 'while brewers used it to control fermentation during the warm months' → brewers.",
          "9": "Đoạn 6: 'Households acquired 'iceboxes', wooden cabinets lined with tin or zinc' → iceboxes.",
          "10": "Đoạn 6: 'Railway companies introduced refrigerated wagons ... which enabled meat from the Midwest to be sold' → wagons."
        }
      },
      {
        type: "sentence", kind: "gap", range: [11, 13],
        instruction: "Complete the sentences below.<br>Choose <b>NO MORE THAN TWO WORDS</b> from the passage for each answer.<br>Write your answers in boxes 11–13 on your answer sheet.",
        wordLimit: "NO MORE THAN TWO WORDS",
        content:
          "<p><b>11</b> Sawdust, a waste product of the region's {{11}}, proved to be a cheap and effective insulator.</p>" +
          "<p><b>12</b> Ice houses were built with {{12}}, and the gap between them was filled with insulating material.</p>" +
          "<p><b>13</b> Ice deliveries to homes were no longer needed once electric household {{13}} became available.</p>",
        answers: {
          "11": ["timber mills"],
          "12": ["double walls"],
          "13": ["refrigerators"]
        },
        explain: {
          "11": "Đoạn 3: 'sawdust, a waste product of the region's many timber mills, was far more effective' → timber mills (2 từ).",
          "12": "Đoạn 3: 'These were constructed with double walls, the space between them filled with insulating material' → double walls.",
          "13": "Đoạn 7: 'the arrival of electric household refrigerators, which made the iceman unnecessary' → refrigerators."
        }
      }
    ],
    vocab: [
      { id: "commodity", word: "commodity", ipa: "/kəˈmɒdəti/", pos: "n.", band: "7.0", vi: "hàng hoá (được mua bán)", example: "Coffee is one of the most widely traded commodities in the world.", topic: "economy" },
      { id: "ingenuity", word: "ingenuity", ipa: "/ˌɪndʒəˈnjuːəti/", pos: "n.", band: "7.5+", vi: "sự khéo léo, óc sáng tạo", example: "The engineers showed great ingenuity in building the bridge with so little money.", topic: "history" },
      { id: "abundance", word: "abundance", ipa: "/əˈbʌndəns/", pos: "n.", band: "7.0", vi: "sự dồi dào, phong phú", example: "The valley has an abundance of fresh water, which makes it ideal for farming.", topic: "environment" },
      { id: "venture", word: "venture", ipa: "/ˈventʃə/", pos: "n.", band: "6.5", vi: "dự án kinh doanh mạo hiểm", example: "Her first business venture failed, but she learned a great deal from it.", topic: "economy" },
      { id: "commercial-failure", word: "commercial failure", ipa: "/kəˈmɜːʃl ˈfeɪljə/", pos: "collocation", band: "6.5", vi: "thất bại về mặt thương mại", example: "The film won several awards but was a commercial failure at the box office.", topic: "economy" },
      { id: "preserve", word: "preserve", ipa: "/prɪˈzɜːv/", pos: "v.", band: "6.5", vi: "bảo quản, giữ gìn", example: "Salt was traditionally used to preserve fish for the winter.", topic: "food" },
      { id: "insulation", word: "insulation", ipa: "/ˌɪnsjuˈleɪʃn/", pos: "n.", band: "7.0", vi: "sự cách nhiệt; vật liệu cách nhiệt", example: "Better insulation can cut a family's heating bills significantly.", topic: "energy" },
      { id: "trial-and-error", word: "trial and error", ipa: "/ˌtraɪəl ən ˈerə/", pos: "phr.", band: "6.5", vi: "phương pháp thử và sai", example: "Most young cooks learn to make bread by trial and error.", topic: "science" },
      { id: "waste-product", word: "waste product", ipa: "/ˈweɪst ˌprɒdʌkt/", pos: "n.", band: "6.5", vi: "phế phẩm, chất thải sản xuất", example: "Some factories now turn their waste products into fertiliser.", topic: "environment" },
      { id: "seasonal", word: "seasonal", ipa: "/ˈsiːzənl/", pos: "adj.", band: "6.5", vi: "theo mùa, thời vụ", example: "Many seasonal jobs in tourism disappear when the summer ends.", topic: "work" },
      { id: "fermentation", word: "fermentation", ipa: "/ˌfɜːmenˈteɪʃn/", pos: "n.", band: "7.0", vi: "sự lên men", example: "Yoghurt is produced through the fermentation of milk by bacteria.", topic: "food" },
      { id: "shortage", word: "shortage", ipa: "/ˈʃɔːtɪdʒ/", pos: "n.", band: "6.5", vi: "sự thiếu hụt", example: "The drought caused a serious shortage of drinking water in the region.", topic: "environment" },
      { id: "unreliable", word: "unreliable", ipa: "/ˌʌnrɪˈlaɪəbl/", pos: "adj.", band: "6.5", vi: "không đáng tin cậy, thất thường", example: "Public transport in the area is so unreliable that most people drive.", topic: "urban" },
      { id: "regardless-of", word: "regardless of", ipa: "/rɪˈɡɑːdləs əv/", pos: "phr.", band: "7.0", vi: "bất kể, không phụ thuộc vào", example: "The museum is free for all visitors, regardless of age.", topic: "society" },
      { id: "demolish", word: "demolish", ipa: "/dɪˈmɒlɪʃ/", pos: "v.", band: "7.0", vi: "phá huỷ, đập bỏ (công trình)", example: "The old cinema was demolished to make way for a car park.", topic: "urban" },
      { id: "considerable", word: "considerable", ipa: "/kənˈsɪdərəbl/", pos: "adj.", band: "6.5", vi: "đáng kể, lớn", example: "The new policy has had a considerable effect on youth unemployment.", topic: "economy" },
      { id: "distribution-network", word: "distribution network", ipa: "/ˌdɪstrɪˈbjuːʃn ˌnetwɜːk/", pos: "collocation", band: "7.0", vi: "mạng lưới phân phối", example: "The company built a national distribution network to deliver its products within a day.", topic: "economy" },
      { id: "inherit", word: "inherit", ipa: "/ɪnˈherɪt/", pos: "v.", band: "7.0", vi: "thừa hưởng, kế thừa", example: "The new government inherited a large budget deficit from its predecessor.", topic: "government" }
    ]
  };

  /* ===================================================================== */
  /* PASSAGE 2 — urban (paragraphs A–G)                                     */
  /* ===================================================================== */
  var P2 = {
    id: "R1-P2",
    part: 2,
    title: "Cooling the City",
    topic: "urban",
    intro: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
    paragraphs: [
      { label: "A", text: "On a still summer evening, the centre of a large city can be several degrees warmer than the surrounding countryside. This difference, known as the urban heat island effect, was first documented in the early nineteenth century, when an amateur meteorologist noticed that temperatures in central London were consistently higher than those in nearby villages. Today, with more than half of the world's population living in urban areas and global temperatures rising, the effect has become a pressing concern for planners, engineers and public health authorities alike. Because the extra heat is generated by the city itself, it adds to, rather than replaces, the warming caused by climate change, and many large urban areas are now heating up considerably faster than the regions around them." },
      { label: "B", text: "The causes are well understood. Natural landscapes of soil and vegetation absorb sunlight but also release moisture through evaporation, a process that cools the surrounding air. Cities, by contrast, are dominated by materials such as asphalt, concrete and brick, which absorb large amounts of solar energy during the day and release it slowly as heat after sunset. Tall buildings trap this warmth in the narrow spaces between them and reduce the wind speeds that would otherwise carry it away. On top of this, vehicles, air-conditioning units and industrial processes all emit waste heat directly into the urban atmosphere. The result is that city temperatures often remain high throughout the night, denying residents the relief that cooler evenings normally bring." },
      { label: "C", text: "The consequences extend well beyond discomfort. During heatwaves, mortality rates in cities rise sharply, with elderly people and those with heart or respiratory conditions at greatest risk. Higher temperatures also accelerate the chemical reactions that produce ground-level ozone, a pollutant that aggravates asthma. Economically, too, the effect is costly. As temperatures climb, demand for air conditioning increases, placing pressure on electricity networks and, where power is generated from fossil fuels, adding to the emissions that drive climate change in the first place. A study by researchers at the Delmont Institute of Urban Studies estimated that each one-degree increase in summer temperature raised peak electricity demand in the cities it examined by between two and four per cent." },
      { label: "D", text: "One of the simplest responses is to change the colour of urban surfaces. Dark roofs and roads can reach temperatures of over 70°C on a sunny afternoon, whereas surfaces painted white or coated with reflective materials stay considerably cooler because they send much of the incoming sunlight back into the sky. Several cities have launched programmes to paint roofs white, and trials of light-coloured road coatings have reported reductions in surface temperature of around ten degrees. However, the approach is not without drawbacks. Highly reflective pavements can create glare for drivers and pedestrians, and in cities with cold winters a white roof may increase heating costs by reducing the amount of solar warmth a building absorbs." },
      { label: "E", text: "A second strategy is to bring vegetation back into the urban fabric. Trees provide shade and, like all plants, release water vapour from their leaves, cooling the air around them. Measurements taken in parks have found that temperatures there can be several degrees lower than in neighbouring streets, and the cooling influence may extend some distance beyond the park boundaries. Green roofs, covered with a layer of soil and low-growing plants, insulate the buildings beneath them and absorb rainwater that would otherwise overwhelm drainage systems. Planting is not a quick fix, though. Young trees take years to grow a canopy large enough to make a difference, they need regular watering during dry periods, and their roots can damage pavements and underground pipes if species are poorly chosen." },
      { label: "F", text: "Water features and building design offer further options. Fountains, canals and shallow pools cool their surroundings through evaporation, and some cities have uncovered rivers that were buried beneath roads decades ago, creating cooler corridors through dense districts. Architects, meanwhile, are rediscovering techniques that have been used for centuries in hot climates: narrow streets that remain shaded for much of the day, courtyards that draw cooler air into buildings, and thick walls that slow the passage of heat. Computer modelling now allows designers to test how a proposed development will affect airflow and temperature before construction begins, so that new neighbourhoods can be laid out to channel breezes rather than block them." },
      { label: "G", text: "Experts increasingly agree that no single measure is sufficient and that the most effective approach combines several. They also stress the importance of deciding where interventions are made. In many cities, the hottest districts are low-income areas with few trees and a high density of poorly insulated housing, whose residents are the least able to afford air conditioning. Some cities have therefore begun to map surface temperatures street by street using satellite images, so that resources can be directed precisely to where they are needed most. Directing investment towards these neighbourhoods, rather than towards areas that are already relatively green, could deliver the greatest benefit to public health. As one planner involved in such a programme put it, cooling a city is not only an engineering challenge but also a question of fairness." }
    ],
    groups: [
      {
        type: "headings", kind: "match", range: [14, 20],
        instruction: "Reading Passage 2 has seven paragraphs, <b>A–G</b>.<br>Choose the correct heading for each paragraph from the list of headings below.<br>Write the correct number, <b>i–ix</b>, in boxes 14–20 on your answer sheet.",
        optionsTitle: "List of Headings",
        options: [
          { key: "i", text: "Natural solutions and their limitations" },
          { key: "ii", text: "A long-recognised problem of growing importance" },
          { key: "iii", text: "Why urban areas retain heat" },
          { key: "iv", text: "Reducing heat by reflecting sunlight" },
          { key: "v", text: "The cost of fitting air conditioning in older buildings" },
          { key: "vi", text: "Targeting the areas in greatest need" },
          { key: "vii", text: "Effects on health, air quality and energy use" },
          { key: "viii", text: "Combining traditional ideas with modern tools" },
          { key: "ix", text: "International agreements on city temperatures" }
        ],
        questions: [
          { n: 14, text: "Paragraph A", answer: "ii",
            explain: "Đoạn A: hiện tượng 'was first documented in the early nineteenth century' (được nhận biết từ lâu) và nay 'has become a pressing concern' (ngày càng quan trọng) → heading ii." },
          { n: 15, text: "Paragraph B", answer: "iii",
            explain: "Đoạn B mở đầu 'The causes are well understood' rồi giải thích vật liệu 'absorb large amounts of solar energy during the day and release it slowly as heat after sunset' → lý do thành phố giữ nhiệt → heading iii." },
          { n: 16, text: "Paragraph C", answer: "vii",
            explain: "Đoạn C: 'mortality rates in cities rise sharply' (sức khoẻ), 'ground-level ozone, a pollutant' (chất lượng không khí), 'demand for air conditioning increases, placing pressure on electricity networks' (năng lượng) → heading vii." },
          { n: 17, text: "Paragraph D", answer: "iv",
            explain: "Đoạn D: bề mặt sơn trắng 'stay considerably cooler because they send much of the incoming sunlight back into the sky' → giảm nhiệt bằng cách phản xạ ánh nắng → heading iv." },
          { n: 18, text: "Paragraph E", answer: "i",
            explain: "Đoạn E nói về cây xanh, mái nhà xanh (giải pháp tự nhiên) và hạn chế: 'Planting is not a quick fix, though. Young trees take years to grow a canopy...' → heading i." },
          { n: 19, text: "Paragraph F", answer: "viii",
            explain: "Đoạn F: kiến trúc sư 'are rediscovering techniques that have been used for centuries in hot climates' (ý tưởng truyền thống) và 'Computer modelling now allows designers to test...' (công cụ hiện đại) → heading viii." },
          { n: 20, text: "Paragraph G", answer: "vi",
            explain: "Đoạn G: 'Directing investment towards these neighbourhoods ... could deliver the greatest benefit' — tập trung vào khu thu nhập thấp nóng nhất → heading vi." }
        ]
      },
      {
        type: "info", kind: "match", range: [21, 23], allowReuse: true,
        instruction: "Reading Passage 2 has seven paragraphs, <b>A–G</b>.<br>Which paragraph contains the following information?<br>Write the correct letter, <b>A–G</b>, in boxes 21–23 on your answer sheet.<br><b>NB</b> You may use any letter more than once.",
        options: [
          { key: "A", text: "Paragraph A" }, { key: "B", text: "Paragraph B" }, { key: "C", text: "Paragraph C" },
          { key: "D", text: "Paragraph D" }, { key: "E", text: "Paragraph E" }, { key: "F", text: "Paragraph F" },
          { key: "G", text: "Paragraph G" }
        ],
        questions: [
          { n: 21, text: "a reference to when the effect was first recorded", answer: "A",
            explain: "Đoạn A: 'was first documented in the early nineteenth century, when an amateur meteorologist noticed...' → thời điểm hiện tượng được ghi nhận lần đầu → A." },
          { n: 22, text: "a disadvantage of one cooling method in places with cold winters", answer: "D",
            explain: "Đoạn D: 'in cities with cold winters a white roof may increase heating costs by reducing the amount of solar warmth a building absorbs' → D." },
          { n: 23, text: "an example of the use of computer simulation in planning", answer: "F",
            explain: "Đoạn F: 'Computer modelling now allows designers to test how a proposed development will affect airflow and temperature before construction begins' → F." }
        ]
      },
      {
        type: "summary", kind: "gap", range: [24, 26],
        instruction: "Complete the summary using the list of words, <b>A–G</b>, below.<br>Write the correct letter, <b>A–G</b>, in boxes 24–26 on your answer sheet.",
        title: "Why are cities warmer than the countryside?",
        wordLimit: "ONE LETTER",
        wordBank: ["A evaporation", "B wind speeds", "C waste heat", "D sunlight", "E shade", "F vegetation", "G rainfall"],
        content: "<p>Natural landscapes are cooled by the {{24}} of moisture, but cities are built from materials that store solar energy during the day and give it out as heat after dark. Tall buildings trap warm air between them and reduce {{25}} which would otherwise carry the heat away. In addition, vehicles and air-conditioning units release {{26}} directly into the air, so temperatures stay high even at night.</p>",
        answers: { "24": ["A"], "25": ["B"], "26": ["C"] },
        explain: {
          "24": "Đoạn B: 'Natural landscapes of soil and vegetation absorb sunlight but also release moisture through evaporation, a process that cools the surrounding air' → A (evaporation).",
          "25": "Đoạn B: 'Tall buildings trap this warmth ... and reduce the wind speeds that would otherwise carry it away' → B (wind speeds).",
          "26": "Đoạn B: 'vehicles, air-conditioning units and industrial processes all emit waste heat directly into the urban atmosphere' → C (waste heat)."
        }
      }
    ],
    vocab: [
      { id: "pressing-concern", word: "pressing concern", ipa: "/ˈpresɪŋ kənˈsɜːn/", pos: "collocation", band: "7.0", vi: "mối lo ngại cấp bách", example: "Affordable housing has become a pressing concern for young families in the capital.", topic: "urban" },
      { id: "absorb", word: "absorb", ipa: "/əbˈzɔːb/", pos: "v.", band: "6.5", vi: "hấp thụ", example: "Forests absorb large quantities of carbon dioxide from the atmosphere.", topic: "environment" },
      { id: "evaporation", word: "evaporation", ipa: "/ɪˌvæpəˈreɪʃn/", pos: "n.", band: "7.0", vi: "sự bay hơi", example: "In hot weather, evaporation from the reservoir can lower water levels quickly.", topic: "science" },
      { id: "emit", word: "emit", ipa: "/iˈmɪt/", pos: "v.", band: "7.0", vi: "thải ra, phát ra", example: "Older cars emit far more pollutants than modern electric vehicles.", topic: "environment" },
      { id: "relief", word: "relief", ipa: "/rɪˈliːf/", pos: "n.", band: "6.5", vi: "sự dễ chịu, sự giải toả", example: "The afternoon rain brought welcome relief from the heat.", topic: "environment" },
      { id: "mortality-rate", word: "mortality rate", ipa: "/mɔːˈtæləti reɪt/", pos: "collocation", band: "7.0", vi: "tỉ lệ tử vong", example: "Better access to clean water has reduced the infant mortality rate dramatically.", topic: "health" },
      { id: "respiratory", word: "respiratory", ipa: "/rəˈspɪrətri/", pos: "adj.", band: "7.5+", vi: "(thuộc) đường hô hấp", example: "Air pollution is linked to a rise in respiratory illnesses among children.", topic: "health" },
      { id: "aggravate", word: "aggravate", ipa: "/ˈæɡrəveɪt/", pos: "v.", band: "7.5+", vi: "làm trầm trọng thêm", example: "Lack of sleep can aggravate the symptoms of stress.", topic: "health" },
      { id: "accelerate", word: "accelerate", ipa: "/əkˈseləreɪt/", pos: "v.", band: "7.0", vi: "đẩy nhanh, tăng tốc", example: "The government hopes the new tax breaks will accelerate economic growth.", topic: "economy" },
      { id: "fossil-fuel", word: "fossil fuel", ipa: "/ˈfɒsl ˌfjuːəl/", pos: "n.", band: "6.5", vi: "nhiên liệu hoá thạch", example: "Many countries are trying to reduce their dependence on fossil fuels.", topic: "energy" },
      { id: "drawback", word: "drawback", ipa: "/ˈdrɔːbæk/", pos: "n.", band: "7.0", vi: "nhược điểm, bất lợi", example: "The main drawback of living in the suburbs is the long commute.", topic: "urban" },
      { id: "glare", word: "glare", ipa: "/ɡleə/", pos: "n.", band: "7.5+", vi: "ánh sáng chói", example: "She wore sunglasses to protect her eyes from the glare of the snow.", topic: "environment" },
      { id: "canopy", word: "canopy", ipa: "/ˈkænəpi/", pos: "n.", band: "7.5+", vi: "tán cây (tầng lá phía trên)", example: "Many rainforest animals spend their entire lives in the canopy.", topic: "environment" },
      { id: "overwhelm", word: "overwhelm", ipa: "/ˌəʊvəˈwelm/", pos: "v.", band: "7.0", vi: "làm quá tải, áp đảo", example: "A sudden flu outbreak could overwhelm local hospitals.", topic: "health" },
      { id: "quick-fix", word: "quick fix", ipa: "/ˌkwɪk ˈfɪks/", pos: "phr.", band: "7.0", vi: "giải pháp nhanh (nhưng tạm thời)", example: "There is no quick fix for the problem of youth unemployment.", topic: "society" },
      { id: "intervention", word: "intervention", ipa: "/ˌɪntəˈvenʃn/", pos: "n.", band: "7.0", vi: "biện pháp can thiệp", example: "Early intervention can prevent minor learning difficulties from becoming serious.", topic: "education" },
      { id: "low-income", word: "low-income", ipa: "/ˌləʊ ˈɪnkʌm/", pos: "adj.", band: "6.5", vi: "(có) thu nhập thấp", example: "The scheme provides free laptops to students from low-income families.", topic: "society" }
    ]
  };

  /* ===================================================================== */
  /* PASSAGE 3 — science (argumentative)                                    */
  /* ===================================================================== */
  var P3 = {
    id: "R1-P3",
    part: 3,
    title: "In Praise of Slow Science",
    topic: "science",
    intro: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
    paragraphs: [
      { label: "", text: "Over the past half-century, the volume of scientific research has grown at an astonishing rate. The number of papers published each year now runs into the millions, and there have never been more working scientists. At first glance, this looks like unambiguous progress: more research, one might assume, must mean more knowledge. Yet a growing number of researchers have begun to question whether the modern scientific enterprise, with its emphasis on speed and productivity, is really serving the goal of understanding the world. Some have gone further, calling for a deliberate return to what they term 'slow science'. Their arguments deserve to be taken more seriously than they generally are." },
      { label: "", text: "The pressures that drive the current pace are not difficult to identify. Academic careers depend heavily on publication records: the number of papers a researcher has produced, and the prestige of the journals in which they appear, strongly influence decisions about appointments, promotion and funding. Grants are typically awarded for periods of three to five years, and researchers who fail to show results within that time risk losing their support altogether. In such a system, there is a powerful incentive to divide findings into the smallest publishable units, to favour projects that are likely to produce quick results, and to avoid lines of inquiry that may take a decade to bear fruit. The philosopher of science Helena Marsh has described this as 'a culture that rewards the appearance of productivity rather than its substance'." },
      { label: "", text: "The consequences are becoming visible. In several fields, attempts to repeat well-known experiments have produced disappointing results, with a substantial proportion of published findings failing to hold up when tested again by independent teams. The causes of this so-called replication crisis are complex, but many observers trace them partly to haste. Studies with small samples are quicker and cheaper to run, but they are also more likely to produce results that arise purely by chance. The statistician Tomas Lindqvist has argued that the problem is less one of dishonesty than of 'a system that makes careful work look like a luxury'. When there is little reward for repeating someone else's experiment, errors may remain uncorrected for years, and subsequent studies may be built on foundations that are far less secure than they appear." },
      { label: "", text: "Advocates of slow science are sometimes caricatured as nostalgic idealists who wish to return to an imagined golden age when gentleman scholars could spend a lifetime on a single problem. This is a misreading. Few of them object to efficiency as such, and none suggests that urgent questions, such as the development of vaccines during an epidemic, should be pursued at a leisurely pace. Their concern is rather with the assumption that speed is always a virtue. What they propose is a research culture in which scientists have time to think before they experiment, to check their results thoroughly, to share their data openly and to pursue questions whose answers cannot be predicted in advance." },
      { label: "", text: "There are good reasons to believe that such a culture would be more productive in the long run. Many of the discoveries that have most transformed our understanding emerged from years of patient, often unfashionable work whose practical value was not apparent at the time. Research into the defence mechanisms of obscure bacteria, for example, eventually provided some of the tools now used for gene editing, yet a funding body focused on immediate results would have been unlikely to support it. The biologist Ruth Okafor, who has studied the careers of prize-winning scientists, found that a striking number had spent long periods producing few publications before completing the work for which they became known. In today's system, she suggests, many of them would not have survived." },
      { label: "", text: "Critics raise legitimate objections. Public money funds much research, and taxpayers are entitled to expect some return on their investment within a reasonable period. Without deadlines and measurable outputs, it is argued, some researchers would simply become less productive. There is also a danger that slow science could become a privilege available only to those who already hold secure senior positions, while junior researchers on short contracts continue to face the same pressures as before. These concerns cannot be dismissed. However, they are arguments for designing incentives carefully, not for preserving a system whose shortcomings are now widely acknowledged." },
      { label: "", text: "Several practical reforms have been proposed. Some funding agencies have experimented with longer grants that support individuals over a decade rather than specific projects over three years. Others now ask applicants to list only their five most significant publications, rather than every paper they have written, in the hope of shifting attention from quantity to quality. A number of journals have introduced 'registered reports', in which a study's methods are reviewed and accepted before any data are collected, so that publication does not depend on whether the results turn out to be striking. Anika Sorensen, who chairs an international group of research funders, believes that such changes, while modest individually, could 'gradually alter what scientists regard as normal'." },
      { label: "", text: "None of these measures will transform scientific practice overnight, and it would be naive to imagine that competition for funding and recognition will ever disappear. Nor should it: competition has driven many important advances. But a system that consistently values the quantity of output over its reliability risks undermining the very trust on which science depends. If the public is to continue believing what scientists tell them, the scientific community must show that it is willing to take the time to get things right." }
    ],
    groups: [
      {
        type: "mcq", kind: "mcq", range: [27, 29],
        instruction: "Choose the correct letter, <b>A, B, C</b> or <b>D</b>.<br>Write the correct letter in boxes 27–29 on your answer sheet.",
        questions: [
          { n: 27, text: "In the first paragraph, the writer suggests that the growth in scientific research",
            options: ["A has been greatly exaggerated.", "B may not have produced a matching increase in understanding.", "C has been concentrated in a small number of fields.", "D has been welcomed by the majority of researchers."],
            answer: "B",
            explain: "Đoạn 1: 'At first glance, this looks like unambiguous progress' nhưng 'a growing number of researchers have begun to question whether the modern scientific enterprise ... is really serving the goal of understanding the world' → nhiều nghiên cứu chưa chắc đã mang lại hiểu biết tương xứng → B. A, C, D không được đề cập." },
          { n: 28, text: "According to the second paragraph, the current system encourages researchers to",
            options: ["A work more closely with colleagues at other institutions.", "B apply for grants lasting longer than five years.", "C report their findings in as many separate papers as possible.", "D concentrate on projects with long-term goals."],
            answer: "C",
            explain: "Đoạn 2: 'there is a powerful incentive to divide findings into the smallest publishable units' → chia kết quả thành càng nhiều bài báo càng tốt → C. D ngược lại với 'avoid lines of inquiry that may take a decade to bear fruit'; B sai vì grants chỉ kéo dài 'three to five years'." },
          { n: 29, text: "What point does the writer make about supporters of slow science in the fourth paragraph?",
            options: ["A They have been misrepresented by some of their opponents.", "B They believe that all research should proceed more slowly.", "C They are mainly senior scientists who are close to retirement.", "D They are opposed to the use of modern technology in research."],
            answer: "A",
            explain: "Đoạn 4: 'Advocates of slow science are sometimes caricatured as nostalgic idealists ... This is a misreading.' → họ bị mô tả sai lệch → A. B sai vì 'none suggests that urgent questions ... should be pursued at a leisurely pace'." }
        ]
      },
      {
        type: "ynng", kind: "tfng", variant: "ynng", range: [30, 34],
        instruction: "Do the following statements agree with the claims of the writer in Reading Passage 3?<br>In boxes 30–34 on your answer sheet, write<br><b>YES</b> if the statement agrees with the claims of the writer<br><b>NO</b> if the statement contradicts the claims of the writer<br><b>NOT GIVEN</b> if it is impossible to say what the writer thinks about this",
        questions: [
          { n: 30, text: "The arguments in favour of slow science have received less attention than they merit.", answer: "YES",
            explain: "Đoạn 1: 'Their arguments deserve to be taken more seriously than they generally are.' → tác giả cho rằng các lập luận này chưa được coi trọng đúng mức → YES." },
          { n: 31, text: "Studies with small samples are particularly common in medical research.", answer: "NOT GIVEN",
            explain: "Đoạn 3 chỉ nói 'Studies with small samples are quicker and cheaper to run, but they are also more likely to produce results that arise purely by chance'; tác giả không nói lĩnh vực nào dùng mẫu nhỏ nhiều nhất, không nhắc đến y học → NOT GIVEN." },
          { n: 32, text: "Most supporters of slow science are opposed to efficiency in research.", answer: "NO",
            explain: "Đoạn 4: 'Few of them object to efficiency as such' → rất ít người ủng hộ slow science phản đối tính hiệu quả, mâu thuẫn với 'Most ... are opposed' → NO." },
          { n: 33, text: "Taxpayers have no right to expect results from the research they help to fund.", answer: "NO",
            explain: "Đoạn 6: 'taxpayers are entitled to expect some return on their investment within a reasonable period' và tác giả gọi đây là 'legitimate objections', 'These concerns cannot be dismissed' → tác giả đồng ý người đóng thuế có quyền kỳ vọng kết quả → NO." },
          { n: 34, text: "Competition between scientists has had some beneficial effects.", answer: "YES",
            explain: "Đoạn cuối: 'Nor should it: competition has driven many important advances.' → tác giả thừa nhận cạnh tranh mang lại nhiều tiến bộ quan trọng → YES." }
        ]
      },
      {
        type: "features", kind: "match", range: [35, 37], allowReuse: true,
        instruction: "Look at the following statements (Questions 35–37) and the list of people below.<br>Match each statement with the correct person, <b>A–D</b>.<br>Write the correct letter, <b>A–D</b>, in boxes 35–37 on your answer sheet.<br><b>NB</b> You may use any letter more than once.",
        optionsTitle: "List of People",
        options: [
          { key: "A", text: "Helena Marsh" },
          { key: "B", text: "Tomas Lindqvist" },
          { key: "C", text: "Ruth Okafor" },
          { key: "D", text: "Anika Sorensen" }
        ],
        questions: [
          { n: 35, text: "Researchers are rewarded for seeming to be productive rather than for genuine achievement.", answer: "A",
            explain: "Đoạn 2: Helena Marsh mô tả hệ thống là 'a culture that rewards the appearance of productivity rather than its substance' → A." },
          { n: 36, text: "Unreliable research results from the way science is organised more than from deliberate deception.", answer: "B",
            explain: "Đoạn 3: Tomas Lindqvist 'has argued that the problem is less one of dishonesty than of 'a system that makes careful work look like a luxury'' → lỗi do hệ thống hơn là do gian dối → B." },
          { n: 37, text: "Many highly successful scientists might not have continued their careers under present conditions.", answer: "C",
            explain: "Đoạn 5: Ruth Okafor nghiên cứu sự nghiệp các nhà khoa học đoạt giải và 'In today's system, she suggests, many of them would not have survived.' → C." }
        ]
      },
      {
        type: "endings", kind: "match", range: [38, 40],
        instruction: "Complete each sentence with the correct ending, <b>A–F</b>, below.<br>Write the correct letter, <b>A–F</b>, in boxes 38–40 on your answer sheet.",
        optionsTitle: "List of Endings",
        options: [
          { key: "A", text: "are unlikely to produce results for many years." },
          { key: "B", text: "does not depend on whether a study's findings are remarkable." },
          { key: "C", text: "encourage researchers to value quality above quantity." },
          { key: "D", text: "are supported by international groups of funders." },
          { key: "E", text: "ensures that experiments are repeated by independent teams." },
          { key: "F", text: "reduce the cost of reviewing grant applications." }
        ],
        questions: [
          { n: 38, text: "Researchers on short-term grants have an incentive to avoid projects which", answer: "A",
            explain: "Đoạn 2: hệ thống tạo động lực 'to avoid lines of inquiry that may take a decade to bear fruit' → tránh các dự án lâu mới có kết quả → A." },
          { n: 39, text: "Under the system of registered reports, publication", answer: "B",
            explain: "Đoạn 7: 'registered reports ... so that publication does not depend on whether the results turn out to be striking' → B ('striking' = 'remarkable'). E sai: bài không nói registered reports đảm bảo thí nghiệm được lặp lại." },
          { n: 40, text: "Some funding agencies limit the number of publications that applicants can list in order to", answer: "C",
            explain: "Đoạn 7: 'ask applicants to list only their five most significant publications ... in the hope of shifting attention from quantity to quality' → C." }
        ]
      }
    ],
    vocab: [
      { id: "unambiguous", word: "unambiguous", ipa: "/ˌʌnæmˈbɪɡjuəs/", pos: "adj.", band: "8.0+", vi: "rõ ràng, không thể hiểu sai", example: "The instructions on the label were clear and unambiguous.", topic: "science" },
      { id: "enterprise", word: "enterprise", ipa: "/ˈentəpraɪz/", pos: "n.", band: "7.0", vi: "công cuộc, hoạt động quy mô lớn; doanh nghiệp", example: "Space exploration has always been an expensive and risky enterprise.", topic: "science" },
      { id: "deliberate", word: "deliberate", ipa: "/dɪˈlɪbərət/", pos: "adj.", band: "7.0", vi: "có chủ ý, có cân nhắc", example: "The company made a deliberate decision to stop advertising on television.", topic: "society" },
      { id: "prestige", word: "prestige", ipa: "/preˈstiːʒ/", pos: "n.", band: "7.0", vi: "uy tín, danh tiếng", example: "Some students choose a university for its prestige rather than its teaching quality.", topic: "education" },
      { id: "incentive", word: "incentive", ipa: "/ɪnˈsentɪv/", pos: "n.", band: "7.0", vi: "động lực, sự khuyến khích", example: "Tax breaks give companies an incentive to invest in clean energy.", topic: "economy" },
      { id: "bear-fruit", word: "bear fruit", ipa: "/beə fruːt/", pos: "phr.", band: "7.5+", vi: "mang lại kết quả, đơm hoa kết trái", example: "Years of careful planning finally bore fruit when the project won national funding.", topic: "work" },
      { id: "substantial-proportion", word: "substantial proportion", ipa: "/səbˈstænʃl prəˈpɔːʃn/", pos: "collocation", band: "7.0", vi: "một tỉ lệ đáng kể", example: "A substantial proportion of household waste could be recycled.", topic: "environment" },
      { id: "hold-up", word: "hold up", ipa: "/ˌhəʊld ˈʌp/", pos: "phr.", band: "7.5+", vi: "đứng vững, vẫn đúng (khi bị kiểm chứng)", example: "His theory did not hold up once more data became available.", topic: "science" },
      { id: "subsequent", word: "subsequent", ipa: "/ˈsʌbsɪkwənt/", pos: "adj.", band: "7.0", vi: "tiếp theo, sau đó", example: "The first edition sold poorly, but subsequent editions were far more successful.", topic: "media" },
      { id: "caricature", word: "caricature", ipa: "/ˈkærɪkətʃʊə/", pos: "v.", band: "8.0+", vi: "mô tả phóng đại, biếm hoạ hoá", example: "Teenagers are often caricatured as lazy and selfish in the media.", topic: "media" },
      { id: "nostalgic", word: "nostalgic", ipa: "/nɒˈstældʒɪk/", pos: "adj.", band: "7.5+", vi: "hoài niệm, luyến tiếc quá khứ", example: "Old photographs always make my grandparents feel nostalgic.", topic: "culture" },
      { id: "pursue", word: "pursue", ipa: "/pəˈsjuː/", pos: "v.", band: "7.0", vi: "theo đuổi", example: "After graduating, she decided to pursue a career in medicine.", topic: "work" },
      { id: "unfashionable", word: "unfashionable", ipa: "/ʌnˈfæʃnəbl/", pos: "adj.", band: "7.5+", vi: "không hợp thời, không được ưa chuộng", example: "Studying classical languages has become unfashionable in many schools.", topic: "education" },
      { id: "legitimate", word: "legitimate", ipa: "/lɪˈdʒɪtɪmət/", pos: "adj.", band: "7.5+", vi: "chính đáng, hợp lý", example: "Parents have legitimate concerns about how much time children spend online.", topic: "society" },
      { id: "entitled-to", word: "entitled to", ipa: "/ɪnˈtaɪtld tə/", pos: "phr.", band: "7.0", vi: "có quyền (được hưởng)", example: "All full-time employees are entitled to twenty days of paid leave.", topic: "work" },
      { id: "shortcoming", word: "shortcoming", ipa: "/ˈʃɔːtkʌmɪŋ/", pos: "n.", band: "7.5+", vi: "khuyết điểm, thiếu sót", example: "The report highlighted several shortcomings in the hospital's safety procedures.", topic: "health" },
      { id: "undermine", word: "undermine", ipa: "/ˌʌndəˈmaɪn/", pos: "v.", band: "7.5+", vi: "làm suy yếu, phá hoại dần", example: "Constant criticism can undermine a child's self-confidence.", topic: "family" }
    ]
  };

  IELTS.data.readingTests.push({
    id: "R1",
    title: "Practice Test 1",
    source: "Biên soạn cho luyện tập (không phải đề thi thật)",
    passages: [P1, P2, P3]
  });
})();
