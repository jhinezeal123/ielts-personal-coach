/* =============================================================================
 * IELTS Coach — Writing bank (owner: W)
 * Sets window.IELTS.data.writing. Data only: no core calls at load time.
 *
 * SCHEMA
 * IELTS.data.writing = {
 *   task1Types: [ T1Type x7 ],     // ids: line, bar, pie, table, mixed, map, process
 *   task2Types: [ T2Type x5 ],     // ids: opinion, discussion, advdis, problem, twopart
 *   task1Prompts: [ T1Prompt x28 ],// 4 per Task 1 type
 *   task2Prompts: [ T2Prompt x30 ] // 6 per Task 2 type
 * }
 *
 * T1Type / T2Type = {
 *   id, name (English), nameVi, short (1-line Vietnamese tagline),
 *   what      : "Mô tả dạng bài" (Vietnamese),
 *   approach  : ["bước/ý giải thích hướng đi", ...] (Vietnamese, specific: overview + grouping),
 *   outline   : [ { part:"Introduction", how:"(VI) làm gì", example:"(EN) câu mẫu" } ]  (4 for T1, 4–5 for T2),
 *   template  : [ { part, frames:["English sentence frame with ___ blanks", ...] } ],
 *   language  : { "Nhóm (label tiếng Việt)": ["phrase", ...], ... },
 *   vocab     : [ { word, vi } ]       // key words for the "Từ nên dùng" panel (Task 1 types)
 *   development (T2 only): { method:"Claim → Explain → Example → Link",
 *                            steps:[{step, how}], example:"(EN) a fully developed body paragraph" },
 *   mistakes  : ["(VI) lỗi thường gặp", ...],
 *   sample    : { promptId, text (band 8 model, paragraphs separated by \n\n), notes:["(VI) vì sao tốt", ...] }
 * }
 *
 * T1Prompt = { id:"t1-line-01", type, topic (TOPICS tag), title (short EN), prompt (full IELTS wording,
 *   lines separated by \n), chart, addedOn:"2026-MM" }
 * chart kinds (drawn as SVG by js/pages/writing.js — no images):
 *   line    { kind:"line", title, unit, xLabels:[..], series:[{name, values:[..]}], projectedFrom?: index }
 *   bar     { kind:"bar", title, unit, categories:[..], series:[{name, values:[..]}], orientation?:"horizontal" }
 *   pie     { kind:"pie", title, unit:"%", pies:[{label, slices:[{name, value}]}] }   (each pie sums to 100)
 *   table   { kind:"table", title, headers:[..], rows:[[..], ..] }
 *   mixed   { kind:"mixed", charts:[chart, chart] }
 *   map     { kind:"map", maps:[{label, features:[{type:"building"|"road"|"tree"|"water"|"park"|"carpark",
 *             x, y, w, h, label}]}] }   coordinates in a 100 × 70 plan, north = up, drawn in array order
 *   process { kind:"process", title, cyclic:bool, steps:[{label, note}] }
 *
 * T2Prompt = { id:"t2-opinion-01", type, topic (TOPICS tag), title (short EN), prompt (real IELTS phrasing),
 *   ideas: { <key>: ["English idea bullet", ...], ... }   keys used: for/against (opinion, discussion),
 *          advantages/disadvantages (advdis), causes/solutions (problem), q1/q2 (twopart),
 *   collocations: [ { word, vi } ] (5–7), addedOn:"2026-MM" }   addedOn ≥ "2026-09" is shown as "Mới".
 * ========================================================================== */
(function () {
  "use strict";

  var W = { task1Types: [], task2Types: [], task1Prompts: [], task2Prompts: [] };
  var P = function (arr) { return arr.join("\n\n"); };

  /* -------------------------------------------------------------------------
   * TASK 1 TYPES
   * ---------------------------------------------------------------------- */
  W.task1Types.push({
    id: "line", name: "Line Graph", nameVi: "Biểu đồ đường",
    short: "Thay đổi theo thời gian của 1–4 đối tượng",
    what: "Biểu đồ đường thể hiện số liệu của một hoặc nhiều đối tượng thay đổi qua nhiều mốc thời gian (năm, tháng…). Trọng tâm là XU HƯỚNG: tăng, giảm, dao động, ổn định, đạt đỉnh và các điểm giao nhau giữa các đường.",
    approach: [
      "Nhìn toàn cảnh trước khi nhìn số: đường nào tăng, đường nào giảm, đường nào cao nhất/thấp nhất trong phần lớn thời gian, có điểm giao cắt (đổi thứ hạng) nào không.",
      "Overview chọn 2 đặc điểm lớn nhất: (1) xu hướng chung của các đường, (2) đối tượng dẫn đầu hoặc thay đổi mạnh nhất. Không đưa số liệu cụ thể vào overview.",
      "Chia thân bài theo NHÓM XU HƯỚNG chứ không theo từng năm: ví dụ Body 1 = các đường giảm, Body 2 = các đường tăng; hoặc Body 1 = giai đoạn đầu, Body 2 = giai đoạn sau nếu có bước ngoặt rõ.",
      "Với mỗi đường chỉ nêu điểm đầu – điểm đỉnh/đáy – điểm cuối và dùng số để so sánh giữa các đường tại cùng một mốc.",
      "Nếu có số liệu dự đoán (projected), đổi thì sang 'is expected/predicted to…'."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase đề: loại biểu đồ + đối tượng + đơn vị + địa điểm + khoảng thời gian.", example: "The line graph compares the proportion of commuters in a European city who travelled to work by car, bus and bicycle between 1990 and 2020." },
      { part: "Overview", how: "2 câu: xu hướng chung nổi bật nhất và đối tượng cao nhất/thay đổi lớn nhất. Không có số.", example: "Overall, the car remained the most common way of commuting, although its popularity declined after 2000, while cycling grew dramatically." },
      { part: "Body 1", how: "Mô tả nhóm đối tượng thứ nhất (ví dụ các đường giảm): điểm đầu, đỉnh/đáy, điểm cuối, có số liệu và so sánh.", example: "In 1990, 55% of workers drove to work, and this figure climbed to a peak of 60% in 2000 before falling steadily to 41%." },
      { part: "Body 2", how: "Mô tả nhóm còn lại, nhấn mạnh điểm giao cắt hoặc thay đổi lớn nhất.", example: "Cycling, by contrast, more than tripled from 2005 onwards, reaching 25% in 2020 and overtaking the bus." }
    ],
    template: [
      { part: "Introduction", frames: ["The line graph compares/illustrates ___ (what) in ___ (where) between ___ and ___.", "The graph shows how ___ changed over a ___-year period from ___."] },
      { part: "Overview", frames: ["Overall, ___ increased/decreased significantly, while ___ remained relatively stable.", "It is also clear that ___ was the most ___ throughout the period, although ___ had overtaken it by ___."] },
      { part: "Body 1", frames: ["In ___, ___ stood at ___, and this figure rose/fell to ___ in ___.", "After peaking at ___ in ___, ___ declined steadily, finishing the period at ___."] },
      { part: "Body 2", frames: ["By contrast, ___ started at only ___ but rose sharply to ___ by ___.", "The figures for ___ and ___ converged in ___, when both stood at around ___."] }
    ],
    language: {
      "Tăng (rise)": ["rise / increase / grow / climb", "a sharp / steep / dramatic rise", "rose gradually / steadily", "more than doubled / tripled", "soared to (tăng vọt)"],
      "Giảm (fall)": ["fall / decline / drop / decrease", "a slight / significant / considerable drop", "plummeted to (giảm mạnh)", "dipped to (giảm nhẹ rồi hồi lại)"],
      "Đỉnh – đáy – ổn định": ["peaked at / reached a peak of", "hit a low of / bottomed out at", "remained stable / levelled off at", "fluctuated between ___ and ___", "recovered to"],
      "So sánh – thời gian": ["overtook / surpassed", "the figures converged / diverged", "over the following decade", "from 2005 onwards", "by the end of the period"]
    },
    vocab: [
      { word: "overall", vi: "nhìn chung (mở overview)" }, { word: "peak", vi: "đạt đỉnh" }, { word: "steadily", vi: "đều đặn" },
      { word: "overtake", vi: "vượt qua" }, { word: "fluctuate", vi: "dao động" }, { word: "by contrast", vi: "ngược lại" }
    ],
    mistakes: [
      "Liệt kê từng năm một ('In 1990… In 1995… In 2000…') thay vì nhóm theo xu hướng.",
      "Viết overview chứa số liệu hoặc quên hẳn overview → Task Achievement khó vượt band 5.",
      "Dùng sai thì: số liệu quá khứ phải dùng quá khứ đơn; số liệu dự đoán dùng 'is expected to'.",
      "Lặp đi lặp lại 'increase' – đa dạng bằng danh từ ('a sharp rise in…') và động từ khác.",
      "Đưa ra lý do/ý kiến cá nhân ('because people became healthier') — Task 1 chỉ mô tả."
    ],
    sample: {
      promptId: "t1-line-01",
      text: P([
        "The line graph compares the proportion of commuters in a European city who travelled to work by car, bus and bicycle over a 30-year period from 1990.",
        "Overall, the car remained the most common way of commuting throughout the period, although its popularity declined after 2000. By contrast, cycling grew dramatically, and by 2020 it had overtaken the bus.",
        "In 1990, 55% of workers drove to work, and this figure climbed to a peak of 60% in 2000. Over the following two decades, however, car use fell steadily, finishing at 41%. The bus followed a different pattern: its share dipped from a quarter of commuters to a low of 19% in 2005, before recovering gradually to 24% by the end of the period.",
        "The most striking change was in cycling. Only 8% of people cycled to work in 1990, and the figure remained virtually unchanged at around 7% for the next ten years. From 2005 onwards, though, it rose sharply, more than tripling to reach 25% in 2020, finishing one percentage point above the bus."
      ]),
      notes: [
        "Overview nêu đúng 2 đặc điểm lớn (car luôn cao nhất nhưng giảm; bicycle tăng mạnh và vượt bus) mà không dùng số.",
        "Thân bài nhóm theo đối tượng: Body 1 = car + bus (hai phương tiện giảm/dao động), Body 2 = bicycle (thay đổi lớn nhất).",
        "Mỗi đường chỉ nêu điểm đầu – đỉnh/đáy – điểm cuối; số liệu chính xác với biểu đồ.",
        "Từ vựng xu hướng đa dạng: climbed to a peak, fell steadily, dipped, recovering gradually, more than tripling.",
        "Câu phức tự nhiên (mệnh đề 'and this figure…', phân từ '…finishing at 41%') → GRA cao."
      ]
    }
  });

  W.task1Types.push({
    id: "bar", name: "Bar Chart", nameVi: "Biểu đồ cột",
    short: "So sánh các hạng mục (có thể theo 2–3 mốc thời gian)",
    what: "Biểu đồ cột so sánh độ lớn của nhiều hạng mục. Có 2 kiểu: (1) cột tĩnh – một thời điểm, trọng tâm là SO SÁNH lớn/nhỏ; (2) cột có nhiều mốc thời gian – vừa so sánh vừa nói về thay đổi.",
    approach: [
      "Xác định biểu đồ có yếu tố thời gian hay không. Có → dùng ngôn ngữ thay đổi (rose, fell); không → chỉ dùng ngôn ngữ so sánh (higher than, twice as many as).",
      "Overview: hạng mục cao nhất/thấp nhất và sự thay đổi (hoặc khác biệt) lớn nhất. Nếu có 2 nhóm (nam/nữ, 2 năm), nêu nhóm nào nhìn chung cao hơn.",
      "Nhóm hạng mục có đặc điểm giống nhau vào cùng một đoạn: ví dụ Body 1 = các hạng mục tăng, Body 2 = các hạng mục giảm; hoặc Body 1 = 2–3 hạng mục lớn nhất, Body 2 = phần còn lại.",
      "Luôn so sánh trong cùng câu (whereas, compared with, twice as…) thay vì đọc từng cột riêng lẻ.",
      "Biểu đồ nhiều cột: không cần nêu tất cả số liệu; chọn số liệu minh hoạ cho nhận định của bạn."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase: biểu đồ cột so sánh gì, của ai/ở đâu, năm nào, đơn vị.", example: "The bar chart compares the average number of minutes per day that teenagers in a city spent on five activities in 2005 and 2025." },
      { part: "Overview", how: "Hạng mục nổi bật nhất + xu hướng chung/khác biệt lớn nhất.", example: "Overall, the most noticeable change was a shift from television to social media, which swapped places as the most time-consuming activity." },
      { part: "Body 1", how: "Nhóm hạng mục thay đổi lớn/hoặc lớn nhất, có số liệu và so sánh.", example: "In 2005, watching television occupied teenagers for 150 minutes a day, whereas social media accounted for a mere 10 minutes." },
      { part: "Body 2", how: "Nhóm hạng mục còn lại, so sánh ngắn gọn.", example: "Time devoted to sport fell from 55 to 35 minutes, and reading dropped to only 15 minutes." }
    ],
    template: [
      { part: "Introduction", frames: ["The bar chart compares ___ in terms of ___ in ___ (and ___).", "The chart gives information about the number/percentage of ___ in ___ categories in ___."] },
      { part: "Overview", frames: ["Overall, ___ was by far the most ___, while ___ was the least ___.", "It is also noticeable that ___ rose in most categories, with the exception of ___."] },
      { part: "Body 1", frames: ["In ___, ___ accounted for ___, compared with only ___ for ___.", "The figure for ___ was almost twice as high as that for ___."] },
      { part: "Body 2", frames: ["As for the remaining categories, ___ and ___ were fairly similar, at ___ and ___ respectively.", "By contrast, ___ fell from ___ to ___, the largest decline of all."] }
    ],
    language: {
      "So sánh": ["higher / lower than", "twice / three times as many as", "by far the largest", "slightly more than", "compared with", "whereas / while"],
      "Ước lượng": ["just over / just under", "roughly / approximately", "a quarter / a third / half", "the vast majority of", "a mere (chỉ vỏn vẹn)"],
      "Thay đổi (nếu có thời gian)": ["rose from ___ to ___", "fell by ___ percentage points", "remained unchanged", "doubled", "swapped places"],
      "Liệt kê gọn": ["___ and ___ respectively", "the figures for ___ and ___", "apart from ___", "with the exception of ___"]
    },
    vocab: [
      { word: "respectively", vi: "lần lượt" }, { word: "whereas", vi: "trong khi đó" }, { word: "by far", vi: "vượt xa" },
      { word: "account for", vi: "chiếm" }, { word: "compared with", vi: "so với" }, { word: "twice as", vi: "gấp đôi" }
    ],
    mistakes: [
      "Mô tả lần lượt từng cột như đọc số → không có so sánh, CC và TA đều thấp.",
      "Dùng ngôn ngữ xu hướng (increase/decrease) cho biểu đồ không có trục thời gian.",
      "Nhầm 'percent' và 'percentage point': từ 20% lên 30% là tăng 10 percentage points, không phải 10%.",
      "Quên đơn vị (minutes, thousands, %) hoặc ghi sai đơn vị.",
      "Overview chỉ lặp lại đề bài thay vì nêu đặc điểm chính."
    ],
    sample: {
      promptId: "t1-bar-01",
      text: P([
        "The bar chart compares the average number of minutes per day that teenagers in a city spent on five activities in 2005 and 2025.",
        "Overall, the most noticeable change was a shift from television to social media, which swapped places as the most time-consuming activity. Apart from homework, which remained fairly stable, all the other activities lost ground over the 20 years.",
        "In 2005, watching television was by far the most popular pastime, occupying teenagers for 150 minutes a day, whereas social media accounted for a mere 10 minutes. By 2025, the situation had reversed completely: time spent on social media soared to 185 minutes, while television viewing plummeted to just 60 minutes.",
        "As for the remaining activities, homework took up roughly the same amount of time in both years, at 75 and 70 minutes respectively. In contrast, time devoted to sport fell from 55 to 35 minutes, and reading for pleasure dropped even more significantly in relative terms, from 35 minutes to only 15, less than half its original level."
      ]),
      notes: [
        "Overview bắt được 'câu chuyện' chính: TV và social media đổi chỗ cho nhau; các hoạt động khác (trừ homework) đều giảm.",
        "Body 1 dành cho 2 hạng mục thay đổi mạnh nhất; Body 2 gom 3 hạng mục còn lại → bố cục logic.",
        "So sánh trong cùng câu (whereas, while, respectively) thay vì đọc từng cột.",
        "Từ vựng chính xác và đa dạng: soared, plummeted, lost ground, a mere, less than half its original level.",
        "Mọi số liệu đều khớp biểu đồ; không suy đoán nguyên nhân."
      ]
    }
  });

  W.task1Types.push({
    id: "pie", name: "Pie Chart", nameVi: "Biểu đồ tròn",
    short: "Tỉ lệ các phần trong một tổng thể",
    what: "Biểu đồ tròn thể hiện tỉ lệ (%) của các thành phần trong một tổng thể. Đề thường cho 2–3 biểu đồ để so sánh giữa các năm hoặc các nhóm. Trọng tâm là phần LỚN NHẤT/NHỎ NHẤT và sự thay đổi tỉ trọng.",
    approach: [
      "Xác định các biểu đồ khác nhau về thời gian (→ nói thay đổi) hay về nhóm/địa điểm (→ chỉ so sánh).",
      "Overview: thành phần chiếm tỉ trọng lớn nhất ở mỗi biểu đồ (có đổi vị trí không?) + xu hướng chung của đa số thành phần.",
      "Nhóm theo độ lớn hoặc theo hướng thay đổi: Body 1 = 2 thành phần lớn nhất (hoặc thay đổi mạnh nhất), Body 2 = các thành phần nhỏ.",
      "Dùng phân số và cách diễn đạt tỉ lệ để tránh lặp '%': a quarter, a third, almost half, a fifth.",
      "Phân biệt 'percentage' (danh từ) và 'percent' (đi sau số); tăng từ 22% lên 32% = 'rose by ten percentage points'."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase: các biểu đồ tròn minh hoạ tỉ lệ gì, ở đâu, các năm/nhóm nào.", example: "The two pie charts illustrate how the average household in a country divided its income between six categories of spending in 1990 and 2020." },
      { part: "Overview", how: "Thành phần lớn nhất (đổi chỗ?) và xu hướng chung.", example: "Overall, food was the largest expense in 1990, but by 2020 it had been replaced by housing." },
      { part: "Body 1", how: "2 thành phần lớn/thay đổi mạnh nhất, so sánh giữa 2 biểu đồ.", example: "Housing rose by ten percentage points to 32%, whereas the share spent on food fell to a fifth." },
      { part: "Body 2", how: "Các thành phần nhỏ: gom những phần cùng tăng / cùng giảm.", example: "Leisure and education both grew noticeably, from 10% to 15% and from 8% to 12% respectively." }
    ],
    template: [
      { part: "Introduction", frames: ["The pie charts illustrate the proportion of ___ in ___ in ___ and ___.", "The charts compare how ___ was divided between ___ categories in ___."] },
      { part: "Overview", frames: ["Overall, ___ accounted for the largest share in ___, but by ___ it had been overtaken by ___.", "It is also clear that the proportion of ___ increased, while that of ___ declined."] },
      { part: "Body 1", frames: ["In ___, ___ made up just over a third of ___ (___%), while ___ represented ___%.", "By ___, the share of ___ had risen by ___ percentage points to ___%."] },
      { part: "Body 2", frames: ["Among the smaller categories, ___ and ___ both grew, from ___% to ___% and from ___% to ___% respectively.", "___, by contrast, almost halved, falling to just ___%."] }
    ],
    language: {
      "Tỉ lệ": ["accounted for / made up / represented / comprised", "the largest / smallest share of", "a quarter / a third / a fifth / almost half", "the vast majority / a small minority"],
      "Thay đổi tỉ trọng": ["rose by ___ percentage points", "almost doubled / halved", "the share of ___ fell to", "remained the same at"],
      "So sánh giữa các biểu đồ": ["compared with", "in contrast to", "the figures for ___ were identical", "swapped positions / changed places"]
    },
    vocab: [
      { word: "proportion", vi: "tỉ lệ" }, { word: "account for", vi: "chiếm" }, { word: "share", vi: "phần, tỉ trọng" },
      { word: "percentage point", vi: "điểm phần trăm" }, { word: "a quarter", vi: "một phần tư" }, { word: "respectively", vi: "lần lượt" }
    ],
    mistakes: [
      "Liệt kê từng lát cắt của biểu đồ 1, rồi từng lát của biểu đồ 2 → không so sánh.",
      "Viết 'increased by 10%' khi thực tế là tăng 10 percentage points.",
      "Lặp 'percent' liên tục — hãy dùng phân số và 'the share/proportion of'.",
      "Viết 'the percentage of food' (sai logic) thay vì 'the percentage of income spent on food'.",
      "Bỏ quên các lát nhỏ hoặc mục 'Other' khi chúng có thay đổi đáng kể."
    ],
    sample: {
      promptId: "t1-pie-01",
      text: P([
        "The two pie charts illustrate how the average household in a country divided its income between six categories of spending in 1990 and 2020.",
        "Overall, food was the largest expense in 1990, but by 2020 it had been replaced by housing. Spending on most other categories increased as a proportion of income, with the exception of miscellaneous items.",
        "In 1990, food accounted for just over a third of household budgets (35%), while housing took up 22%. Thirty years later, these positions had almost reversed: the share of income spent on housing rose by ten percentage points to 32%, making it the dominant category, whereas the proportion spent on food fell to exactly a fifth.",
        "Among the smaller categories, leisure and education both grew noticeably, from 10% to 15% and from 8% to 12% respectively. Transport saw only a slight rise, from 12% to 14%, remaining the fourth largest category in both years. The 'other' category, by contrast, almost halved, falling from 13% to just 7%, which made it the smallest item of household spending in 2020."
      ]),
      notes: [
        "Overview chỉ ra sự đổi chỗ của 2 khoản lớn nhất (food → housing) và xu hướng chung của phần còn lại.",
        "Dùng phân số (just over a third, exactly a fifth) và 'percentage points' chính xác.",
        "Body 2 gom các khoản nhỏ cùng tăng vào một câu với 'respectively' → ngắn gọn, mạch lạc.",
        "Không có câu nào chỉ đọc số đơn thuần; mọi số liệu đều phục vụ so sánh giữa 1990 và 2020."
      ]
    }
  });

  W.task1Types.push({
    id: "table", name: "Table", nameVi: "Bảng số liệu",
    short: "Nhiều số liệu — phải chọn lọc và nhóm",
    what: "Bảng trình bày nhiều số liệu theo hàng và cột. Khó nhất là CHỌN LỌC: không thể mô tả hết, phải tìm điểm cao nhất/thấp nhất, xu hướng chung và các ngoại lệ.",
    approach: [
      "Đọc theo hàng và theo cột: hàng nào luôn cao nhất/thấp nhất, cột nào có tổng lớn nhất, có hàng nào đi ngược xu hướng không.",
      "Nếu bảng có các năm → tìm hàng tăng và hàng giảm. Nếu bảng là nhiều chỉ số (lương, giờ làm…) → tìm đối tượng nổi bật ở từng chỉ số.",
      "Overview: đối tượng dẫn đầu + xu hướng chung (hoặc mối liên hệ giữa các cột).",
      "Chia thân bài theo nhóm có cùng xu hướng (tăng vs giảm) hoặc theo cột chỉ số; KHÔNG viết mỗi hàng một câu theo thứ tự trong bảng.",
      "Chỉ chọn khoảng 8–12 số liệu quan trọng nhất; làm tròn hợp lý (just under 3 million)."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase: bảng cho biết gì, các đối tượng, các năm/chỉ số.", example: "The table shows how many people visited five tourist attractions in a city in 2015, 2019 and 2023." },
      { part: "Overview", how: "Đối tượng nổi bật nhất + nhóm tăng / nhóm giảm.", example: "Overall, the National Museum was the most visited attraction in all three years, whereas the City Zoo and the Old Castle attracted fewer visitors by the end of the period." },
      { part: "Body 1", how: "Nhóm đối tượng tăng (hoặc chỉ số thứ nhất).", example: "The Science Centre showed the most dramatic growth, with visitor numbers more than doubling from 0.9 million to 2.4 million." },
      { part: "Body 2", how: "Nhóm đối tượng giảm/ngoại lệ (hoặc chỉ số còn lại).", example: "The City Zoo declined throughout, from 2.8 million to just 1.9 million." }
    ],
    template: [
      { part: "Introduction", frames: ["The table gives information about ___ in ___ (places) in ___, ___ and ___.", "The table compares ___ in terms of ___, ___ and ___."] },
      { part: "Overview", frames: ["Overall, ___ had the highest ___ in every year, while ___ had the lowest.", "It is also clear that ___ and ___ became more ___, whereas ___ declined."] },
      { part: "Body 1", frames: ["___ welcomed ___ in ___, a figure which rose to ___ in ___ and ___ in ___.", "The most dramatic growth was seen in ___, which more than doubled from ___ to ___."] },
      { part: "Body 2", frames: ["By contrast, ___ rose slightly to ___ in ___ but then fell to ___.", "___ declined throughout the period, from ___ to just ___."] }
    ],
    language: {
      "Chọn lọc – nhấn mạnh": ["the most / least ___ in every year", "stand out as", "the only ___ to", "with the exception of", "a similar pattern can be seen in"],
      "Thay đổi": ["a figure which rose to", "more than doubled", "declined throughout", "rose slightly before falling", "the largest increase was in"],
      "So sánh nhiều chỉ số": ["earned the most but worked the longest hours", "in terms of ___", "ranked first / second", "by comparison"]
    },
    vocab: [
      { word: "in terms of", vi: "xét về mặt" }, { word: "a figure which", vi: "một con số mà (mệnh đề quan hệ)" }, { word: "throughout", vi: "suốt" },
      { word: "the exception", vi: "ngoại lệ" }, { word: "considerably", vi: "đáng kể" }, { word: "rank", vi: "xếp hạng" }
    ],
    mistakes: [
      "Chép lại toàn bộ bảng thành câu → quá dài, không có overview, không chọn lọc.",
      "Mô tả theo thứ tự hàng trong bảng thay vì theo nhóm đặc điểm.",
      "Không làm tròn và sai đơn vị (million / thousand / %).",
      "Không có so sánh giữa các hàng ('A was 4.2 million. B was 2.8 million.').",
      "Overview quá chung chung ('There were many changes')."
    ],
    sample: {
      promptId: "t1-table-01",
      text: P([
        "The table shows how many people visited five tourist attractions in a city in 2015, 2019 and 2023.",
        "Overall, the National Museum was the most visited attraction in all three years, and its visitor numbers grew consistently. The Botanic Gardens and the Science Centre also became more popular, whereas the City Zoo and the Old Castle attracted fewer visitors by the end of the period.",
        "The National Museum welcomed 4.2 million visitors in 2015, a figure which rose to 5.1 million in 2019 and 5.6 million in 2023. The Science Centre showed the most dramatic growth, with visitor numbers more than doubling from 0.9 million to 2.4 million. Similarly, the Botanic Gardens attracted 1.5 million people at first and 2.6 million by 2023, with most of this increase occurring after 2019.",
        "By contrast, the Old Castle, the second most popular attraction in 2015 with 3.6 million visitors, rose slightly to 4 million in 2019 but then fell to 3.1 million. The City Zoo declined throughout, from 2.8 million to just 1.9 million, making it the only attraction to lose visitors in both periods."
      ]),
      notes: [
        "Overview chia rõ 3 nhóm: dẫn đầu (Museum), nhóm tăng (Gardens, Science Centre), nhóm giảm (Zoo, Castle).",
        "Thân bài theo nhóm xu hướng chứ không theo thứ tự hàng trong bảng.",
        "Chọn lọc số liệu: chỉ nêu số đầu – giữa – cuối khi cần chứng minh xu hướng.",
        "Mệnh đề quan hệ và cụm đồng vị (a figure which…, the second most popular attraction in 2015…) → GRA đa dạng."
      ]
    }
  });

  W.task1Types.push({
    id: "mixed", name: "Mixed Charts", nameVi: "Biểu đồ kết hợp",
    short: "Hai biểu đồ khác loại — tìm mối liên hệ",
    what: "Đề kết hợp 2 loại biểu đồ (ví dụ line + bar, pie + table). Mỗi biểu đồ có thông tin riêng nhưng thường liên quan đến nhau. Trọng tâm: mô tả đủ CẢ HAI và chỉ ra MỐI LIÊN HỆ nếu có.",
    approach: [
      "Hiểu từng biểu đồ riêng: mỗi biểu đồ có 1–2 đặc điểm chính.",
      "Tìm mối liên hệ giữa hai biểu đồ (tỉ lệ nghịch, cùng tăng, biểu đồ này giải thích chi tiết cho biểu đồ kia…) — đây là điểm cộng lớn cho overview.",
      "Overview: 1 câu cho biểu đồ thứ nhất, 1 câu cho biểu đồ thứ hai (hoặc 1 câu về mối liên hệ).",
      "Thân bài: Body 1 = biểu đồ thứ nhất, Body 2 = biểu đồ thứ hai. Giữ độ dài hai đoạn cân đối.",
      "Viết gọn hơn bình thường vì thông tin nhiều: chỉ nêu điểm nổi bật, tổng vẫn khoảng 170–200 từ."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase cả hai biểu đồ trong 1 câu (dùng 'while' / 'and').", example: "The line graph illustrates average monthly rainfall in a coastal town, while the bar chart shows how many tourists visited the town each month." },
      { part: "Overview", how: "Đặc điểm chính của mỗi biểu đồ và mối liên hệ.", example: "Overall, there was an inverse relationship between the two: the town received the most tourists in the dry summer months." },
      { part: "Body 1", how: "Biểu đồ thứ nhất: đỉnh, đáy, xu hướng.", example: "Rainfall was highest in winter, peaking at 90mm in December, and reached a low of 10mm in July." },
      { part: "Body 2", how: "Biểu đồ thứ hai, liên hệ lại với biểu đồ một nếu hợp lý.", example: "Tourist numbers followed the opposite pattern, reaching a peak of 61,000 in July." }
    ],
    template: [
      { part: "Introduction", frames: ["The ___ chart illustrates ___, while the ___ shows ___.", "The two charts give information about ___ and ___ in ___."] },
      { part: "Overview", frames: ["Overall, ___ increased steadily, and it is clear from the ___ that ___ accounted for the largest share.", "There appears to be a clear relationship between ___ and ___: as ___ rose, ___ also ___."] },
      { part: "Body 1", frames: ["According to the ___, ___ stood at ___ in ___ and rose to ___ by ___.", "___ was highest in ___ (___) and lowest in ___ (___)."] },
      { part: "Body 2", frames: ["Turning to the ___, ___ made up ___, followed by ___ at ___.", "___ followed a similar / the opposite pattern, ___."] }
    ],
    language: {
      "Chuyển biểu đồ": ["turning to the ___", "as for the ___", "according to the table", "the bar chart reveals that"],
      "Mối liên hệ": ["an inverse relationship", "followed the opposite / a similar pattern", "this coincided with", "in line with"],
      "Gọn gàng": ["respectively", "with ___ at ___", "followed by", "the remaining ___"]
    },
    vocab: [
      { word: "turning to", vi: "chuyển sang" }, { word: "coincide with", vi: "trùng với" }, { word: "inverse relationship", vi: "quan hệ nghịch" },
      { word: "followed by", vi: "tiếp theo là" }, { word: "in line with", vi: "tương ứng với" }, { word: "respectively", vi: "lần lượt" }
    ],
    mistakes: [
      "Chỉ mô tả kỹ một biểu đồ và bỏ sót biểu đồ còn lại → mất điểm Task Achievement.",
      "Overview chỉ nói về một biểu đồ.",
      "Viết quá dài (trên 250 từ) vì cố nêu mọi số liệu → mất thời gian cho Task 2.",
      "Gượng ép mối liên hệ hoặc suy diễn nguyên nhân không có trong biểu đồ."
    ],
    sample: {
      promptId: "t1-mixed-01",
      text: P([
        "The line graph illustrates average monthly rainfall in a coastal town, while the bar chart shows how many tourists visited the town each month.",
        "Overall, there was an inverse relationship between the two sets of data: the town received the most tourists in the dry summer months and the fewest during the wettest part of the year.",
        "Rainfall was highest in winter, peaking at 90mm in December and remaining above 70mm in November and January. It then decreased steadily through the spring to only 15mm in June, before reaching a low of 10mm in July. From September, it rose again, returning to 80mm by November, so the driest period clearly lasted from June to August.",
        "Tourist numbers followed the opposite pattern. Fewer than 10,000 people visited the town in January, February and November. Visitor numbers then climbed month by month, reaching a peak of 61,000 in July and staying high in August at 58,000. After that, they fell sharply to 35,000 in September and 18,000 in October, although there was a small rise to 12,000 in December."
      ]),
      notes: [
        "Overview nêu được mối liên hệ nghịch giữa lượng mưa và lượng khách — đặc điểm quan trọng nhất của đề kết hợp.",
        "Mỗi biểu đồ một đoạn thân bài, độ dài cân đối.",
        "Nhóm tháng thông minh ('in January, February and November') thay vì liệt kê 12 tháng.",
        "Không suy diễn nguyên nhân (ví dụ lễ hội) vì biểu đồ không cung cấp."
      ]
    }
  });

  W.task1Types.push({
    id: "map", name: "Maps / Plans", nameVi: "Bản đồ",
    short: "So sánh một địa điểm trước và sau",
    what: "Đề bản đồ cho 2 (đôi khi 3) bản đồ của cùng một địa điểm ở các thời điểm khác nhau, hoặc bản đồ hiện tại và kế hoạch tương lai. Trọng tâm: CÁI GÌ thay đổi, CÁI GÌ giữ nguyên, Ở ĐÂU.",
    approach: [
      "So sánh hai bản đồ và đánh dấu: cái gì được xây mới, bị phá bỏ, được mở rộng, được chuyển đổi chức năng, và cái gì giữ nguyên.",
      "Overview: thay đổi tổng thể (ví dụ: từ vùng nông thôn thành khu dân cư; khu vực trở nên hiện đại hơn, nhiều tiện ích hơn) + điều gì giữ nguyên.",
      "Chia thân bài theo VỊ TRÍ ĐỊA LÝ (phía bắc/nam của con đường, khu phía đông/tây), không theo trình tự ngẫu nhiên.",
      "Dùng câu bị động là chủ yếu: 'has been demolished', 'was converted into', 'will be replaced by'.",
      "Thì: hai mốc quá khứ → quá khứ đơn; quá khứ → hiện tại → hiện tại hoàn thành; kế hoạch → will be / is planned to be."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase: bản đồ cho thấy địa điểm nào, những thay đổi giữa các mốc nào.", example: "The maps illustrate how the village of Ashby has changed between 1995 and the present day." },
      { part: "Overview", how: "Thay đổi tổng thể + những gì giữ nguyên.", example: "Overall, Ashby has been transformed from a small farming village into a more developed residential area." },
      { part: "Body 1", how: "Thay đổi ở khu vực thứ nhất (ví dụ phía bắc con đường).", example: "North of the main road, the original houses remain, but the shop has been converted into a café." },
      { part: "Body 2", how: "Thay đổi ở khu vực thứ hai.", example: "South of the main road, the farmland in the west has made way for a large housing estate." }
    ],
    template: [
      { part: "Introduction", frames: ["The maps illustrate the changes that took place in ___ between ___ and ___.", "The plans show ___ at present and how it will look after the proposed redevelopment."] },
      { part: "Overview", frames: ["Overall, ___ has been transformed from ___ into ___, with the addition of ___.", "The most significant change is the ___, while ___ remains unchanged."] },
      { part: "Body 1", frames: ["In the north/west of ___, ___ has been demolished to make way for ___.", "___ has been extended / converted into ___, and a new ___ has been built next to ___."] },
      { part: "Body 2", frames: ["To the south of ___, ___ was replaced by ___.", "___ now runs from ___ to ___, and ___ has been turned into ___."] }
    ],
    language: {
      "Xây mới – phá bỏ": ["was constructed / built / erected", "has been demolished / knocked down / removed", "made way for", "was cleared to make room for"],
      "Thay đổi chức năng": ["was converted into", "was turned into", "was replaced by", "was relocated to", "was extended / expanded / enlarged"],
      "Vị trí": ["north of / to the south of", "in the north-east corner", "next to / adjacent to", "opposite", "running from ___ to ___", "on the outskirts"],
      "Giữ nguyên": ["remains unchanged", "is still in the same place", "the only feature that has not changed"]
    },
    vocab: [
      { word: "demolish", vi: "phá dỡ" }, { word: "convert into", vi: "chuyển đổi thành" }, { word: "make way for", vi: "nhường chỗ cho" },
      { word: "extend", vi: "mở rộng" }, { word: "adjacent to", vi: "liền kề" }, { word: "remain unchanged", vi: "giữ nguyên" }
    ],
    mistakes: [
      "Mô tả bản đồ 1 xong rồi mới mô tả bản đồ 2 → không thấy sự so sánh.",
      "Dùng chủ động với chủ ngữ mơ hồ ('They built a supermarket') thay vì bị động.",
      "Sai thì (dùng hiện tại đơn cho thay đổi đã xảy ra).",
      "Không nêu vị trí, chỉ nói 'a supermarket was built' mà không biết ở đâu.",
      "Bỏ qua các đặc điểm giữ nguyên — đó cũng là thông tin quan trọng cho overview."
    ],
    sample: {
      promptId: "t1-map-01",
      text: P([
        "The maps illustrate how the village of Ashby has changed between 1995 and the present day.",
        "Overall, Ashby has been transformed from a small farming village into a more developed residential area, with almost all of the farmland south of the main road being replaced by new housing and facilities. The river, the main road and the original houses, however, remain unchanged.",
        "North of the main road, the shop next to the houses has been converted into a café. The school has been extended eastwards, and as a result, part of the forest has been cut down. In addition, the lane leading north from the main road now continues across the river by means of a new bridge.",
        "The most dramatic changes have taken place south of the main road. The farmland in the west has made way for a large housing estate, which is served by a new road running south from the main road. To the east, the farmhouse has been demolished, and a supermarket with its own car park has been built on the former fields. The easternmost part of the farmland has been turned into a park."
      ]),
      notes: [
        "Overview nêu thay đổi tổng thể (nông thôn → khu dân cư) VÀ những gì giữ nguyên.",
        "Chia thân bài theo vị trí: phía bắc / phía nam con đường chính → người đọc dễ hình dung.",
        "Bị động thì hiện tại hoàn thành dùng nhất quán (has been converted, has been extended, has been demolished).",
        "Từ vựng bản đồ chính xác: made way for, by means of a new bridge, the easternmost part."
      ]
    }
  });

  W.task1Types.push({
    id: "process", name: "Process Diagram", nameVi: "Quy trình",
    short: "Các bước sản xuất / chu trình tự nhiên",
    what: "Sơ đồ quy trình mô tả các giai đoạn của một quá trình: sản xuất (nhân tạo, tuyến tính) hoặc chu trình tự nhiên (vòng tròn, lặp lại). Không có số liệu để so sánh, trọng tâm là TRÌNH TỰ và mô tả chính xác từng bước.",
    approach: [
      "Đếm số bước, xác định điểm bắt đầu và kết thúc; quy trình là tuyến tính (sản xuất) hay chu trình (lặp lại).",
      "Overview: tổng số giai đoạn + bắt đầu bằng gì, kết thúc bằng gì (với chu trình: nói rằng quá trình lặp lại liên tục).",
      "Chia thân bài theo nửa quy trình: Body 1 = các bước đầu (khoảng một nửa), Body 2 = các bước còn lại. Có thể chia theo nhóm giai đoạn tự nhiên (chuẩn bị nguyên liệu / chế biến / đóng gói).",
      "Quy trình nhân tạo dùng bị động thì hiện tại đơn ('the leaves are dried'); chu trình tự nhiên thường dùng chủ động ('the salmon migrate to the sea').",
      "Dùng từ nối trình tự đa dạng và mệnh đề thời gian (once…, after being…) để câu liền mạch; đưa các chi tiết nhỏ (nhiệt độ, thời gian) vào câu."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase: sơ đồ minh hoạ quy trình gì.", example: "The diagram illustrates the stages involved in the production of black tea." },
      { part: "Overview", how: "Số bước, điểm đầu – điểm cuối, loại quy trình.", example: "Overall, the process consists of eight steps, starting with picking fresh leaves and ending with distribution." },
      { part: "Body 1", how: "Nửa đầu quy trình, theo đúng thứ tự, có chi tiết.", example: "At the beginning of the process, fresh leaves are picked by hand and then left to wither for between 12 and 17 hours." },
      { part: "Body 2", how: "Nửa sau quy trình đến bước cuối.", example: "Once oxidation is complete, the leaves are heated to 120°C. Finally, the tea is packed and transported to shops." }
    ],
    template: [
      { part: "Introduction", frames: ["The diagram illustrates the process by which ___ is produced / the stages in the life cycle of ___.", "The flow chart shows how ___ is ___, from ___ to ___."] },
      { part: "Overview", frames: ["Overall, there are ___ stages in the process, beginning with ___ and ending with ___.", "It is a cyclical process which repeats itself, starting from ___."] },
      { part: "Body 1", frames: ["At the first stage, ___ is/are ___ (passive).", "After that, ___ is/are ___ so that ___."] },
      { part: "Body 2", frames: ["Once ___ has been ___, it is ___ at ___°C.", "In the final stage, ___ is/are ___ before being ___ to ___."] }
    ],
    language: {
      "Trình tự": ["first / at the first stage", "next / then / after that / subsequently", "following this", "once / as soon as", "finally / in the final stage"],
      "Câu nối nâng cao": ["after being ___, the ___", "before being ___", "which is then ___", "so that / in order to"],
      "Bị động thường gặp": ["is heated / cooled / dried", "is transported / delivered", "is sorted / graded", "is crushed / ground", "is packaged"]
    },
    vocab: [
      { word: "subsequently", vi: "sau đó" }, { word: "once", vi: "một khi" }, { word: "stage", vi: "giai đoạn" },
      { word: "is transported", vi: "được vận chuyển" }, { word: "in order to", vi: "để" }, { word: "finally", vi: "cuối cùng" }
    ],
    mistakes: [
      "Bỏ sót bước hoặc đảo thứ tự các bước.",
      "Dùng chủ động với chủ ngữ 'people/workers' cho mọi câu thay vì bị động.",
      "Thiếu overview vì nghĩ 'quy trình không có xu hướng' — vẫn phải nêu số bước và điểm đầu/cuối.",
      "Chép nguyên văn nhãn trên sơ đồ thành câu cụt ('Step 3: rolling').",
      "Lặp 'then… then… then…' — cần đa dạng từ nối và mệnh đề."
    ],
    sample: {
      promptId: "t1-process-01",
      text: P([
        "The diagram illustrates the stages involved in the production of black tea, from harvesting the leaves to delivering the finished product to shops.",
        "Overall, the process consists of eight steps, starting with picking fresh leaves and ending with distribution. The first five stages change the physical condition of the leaves, while the last three prepare the tea for sale.",
        "At the beginning of the process, fresh leaves are picked by hand from tea bushes. They are then spread out and left to wither for between 12 and 17 hours so that they lose some of their moisture. After this, the leaves are rolled in order to release their natural juices, and they are subsequently placed in a humid room, where they oxidise and turn dark over a period of one to three hours.",
        "Once oxidation is complete, the leaves are heated to 120°C so that the process is stopped. The dried tea is then sorted and graded according to the size of the leaves. Finally, it is packed into boxes or tea bags and transported to shops for sale."
      ]),
      notes: [
        "Overview nêu số bước, điểm đầu – cuối và chia quy trình thành 2 nhóm giai đoạn.",
        "Bị động thì hiện tại đơn dùng nhất quán và chính xác (are picked, are rolled, is sorted and graded).",
        "Từ nối trình tự đa dạng: then, after this, subsequently, once, finally.",
        "Chi tiết nhỏ trên sơ đồ (12–17 hours, 120°C, 1–3 hours) được lồng vào câu tự nhiên."
      ]
    }
  });

  /* -------------------------------------------------------------------------
   * TASK 2 TYPES
   * ---------------------------------------------------------------------- */
  var CEEL = {
    method: "Claim → Explain → Example → Link",
    steps: [
      { step: "Claim", how: "Câu chủ đề nêu MỘT ý chính của đoạn, trả lời trực tiếp đề bài." },
      { step: "Explain", how: "Giải thích vì sao/như thế nào ý đó đúng (1–2 câu, dùng because, as a result, this means that)." },
      { step: "Example", how: "Ví dụ cụ thể: quốc gia, số liệu phổ biến, tình huống thực tế hoặc giả định ('For instance, …')." },
      { step: "Link", how: "Câu kết nối lại với quan điểm/đề bài, cho thấy ý này chứng minh điều gì." }
    ]
  };
  var dev = function (example) { return { method: CEEL.method, steps: CEEL.steps, example: example }; };

  W.task2Types.push({
    id: "opinion", name: "Opinion (Agree / Disagree)", nameVi: "Đồng ý / Không đồng ý",
    short: "To what extent do you agree or disagree?",
    what: "Đề đưa ra một nhận định và hỏi bạn đồng ý đến mức nào. Bạn có thể hoàn toàn đồng ý, hoàn toàn phản đối, hoặc đồng ý một phần — nhưng quan điểm phải RÕ RÀNG từ mở bài đến kết bài.",
    approach: [
      "Quyết định quan điểm trong 2 phút đầu: chọn phía bạn có nhiều lý do và ví dụ nhất, không nhất thiết là quan điểm thật của bạn.",
      "Nêu quan điểm ngay trong mở bài (thesis) bằng cụm 'to what extent': I completely/largely agree… / I partly agree…",
      "Mỗi đoạn thân bài = 1 lý do ủng hộ quan điểm, phát triển theo Claim → Explain → Example → Link.",
      "Nếu đồng ý mạnh: có thể thêm 1 đoạn nhượng bộ ngắn (Admittedly… However…) để bác bỏ phía ngược lại — thể hiện tư duy phản biện.",
      "Nếu đồng ý một phần: Body 1 = phần đồng ý, Body 2 = phần không đồng ý; thesis phải nói rõ đồng ý ở điểm nào."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase đề (1 câu) + thesis nêu rõ mức độ đồng ý và lý do chính.", example: "While I accept that this policy would be costly, I largely agree that tuition fees should be abolished, because higher education benefits society as a whole." },
      { part: "Body 1", how: "Lý do mạnh nhất ủng hộ quan điểm (CEEL).", example: "The main reason for my view is that free university education promotes equal opportunity." },
      { part: "Body 2", how: "Lý do thứ hai (CEEL).", example: "Furthermore, a highly educated population brings long-term economic returns." },
      { part: "Body 3 (tuỳ chọn)", how: "Nhượng bộ – phản bác: thừa nhận ý ngược lại rồi chỉ ra vì sao nó yếu hơn.", example: "Admittedly, free education must be funded by taxpayers. However, this can be reduced by…" },
      { part: "Conclusion", how: "Nhắc lại quan điểm bằng từ khác + tóm tắt 2 lý do. Không thêm ý mới.", example: "In conclusion, although making university free is expensive, I believe its benefits clearly outweigh the costs." }
    ],
    development: dev("The main reason for my view is that free university education promotes equal opportunity. (Claim) When students have to pay high fees, talented young people from low-income families are often discouraged from applying, regardless of their ability. (Explain) Countries like Germany and Finland, which charge little or no tuition, show that removing this barrier allows students to be selected on merit. (Example) Therefore, abolishing fees would make higher education fairer for everyone. (Link)"),
    template: [
      { part: "Introduction", frames: ["It is often argued that ___. I completely / largely agree with this view because ___ and ___.", "While some people believe that ___, I disagree, as ___."] },
      { part: "Body", frames: ["The main reason why I believe ___ is that ___.", "This is because ___. As a result, ___.", "For instance, in ___, ___.", "Therefore, it is clear that ___."] },
      { part: "Concession", frames: ["Admittedly, ___. However, ___.", "It is true that ___, but this does not mean that ___."] },
      { part: "Conclusion", frames: ["In conclusion, I firmly believe that ___ because ___ and ___.", "To sum up, although ___, I agree that ___."] }
    ],
    language: {
      "Nêu quan điểm": ["I completely / largely / partly agree that", "I strongly disagree with the view that", "In my opinion / From my perspective", "I am convinced that"],
      "Thêm ý": ["Furthermore / Moreover / In addition", "Another reason is that", "Not only … but also"],
      "Nhượng bộ": ["Admittedly / Granted", "It is true that … However", "Although some argue that …"],
      "Kết quả – ví dụ": ["As a result / Consequently", "This means that", "For instance / A clear example of this is", "Therefore / Thus"]
    },
    mistakes: [
      "Quan điểm không rõ hoặc thay đổi giữa bài (mở bài đồng ý, kết bài lại 'both sides have merits').",
      "Viết như dạng Discussion (trình bày hai bên ngang nhau) mà không trả lời 'to what extent'.",
      "Ý chung chung, không có ví dụ cụ thể → Task Response khó vượt 6.",
      "Một đoạn thân bài chứa 3–4 ý nhưng không ý nào được phát triển.",
      "Kết bài đưa thêm ý mới hoặc quá dài."
    ],
    sample: {
      promptId: "t2-opinion-01",
      text: P([
        "In many countries, the cost of higher education has risen sharply, leading some to argue that university should be free for everyone. While I accept that this policy would place a heavy burden on public finances, I largely agree that tuition fees should be abolished, because higher education benefits society as a whole.",
        "The main reason for my view is that free university education promotes equal opportunity. When students have to pay high fees, talented young people from low-income families are often discouraged from applying, regardless of their ability. As a result, access to well-paid professions such as medicine or law becomes limited to the wealthy. Countries like Germany and Finland, which charge little or no tuition, show that removing this financial barrier allows students to be selected on merit rather than on their parents' income.",
        "Furthermore, a highly educated population brings long-term economic returns. Graduates tend to earn more, pay more tax and are more likely to work in innovative industries. Therefore, the money a government spends on tuition is not simply a cost but an investment that is repaid over a graduate's working life. Without such investment, a country risks a shortage of skilled workers in key sectors like engineering and healthcare.",
        "Admittedly, free education must be funded by taxpayers, including those who never attend university, and this may seem unfair. However, this problem can be reduced by linking funding to subjects that the economy needs, or by asking high-earning graduates to contribute through slightly higher taxes later in life.",
        "In conclusion, although making university free for all is expensive, I believe its benefits for social fairness and economic development clearly outweigh the costs. Governments should therefore treat higher education as a public good rather than a private product."
      ]),
      notes: [
        "Thesis rõ ràng ngay mở bài ('I largely agree… because…') và nhất quán đến kết bài.",
        "Mỗi đoạn thân bài một ý chính, phát triển đủ Claim → Explain → Example → Link.",
        "Đoạn nhượng bộ (Admittedly… However…) thể hiện tư duy phản biện, vẫn bảo vệ quan điểm.",
        "Collocation tự nhiên: place a heavy burden on, selected on merit, long-term economic returns, a public good.",
        "Từ nối đa dạng nhưng không lạm dụng (As a result, Furthermore, Therefore, Admittedly, However)."
      ]
    }
  });

  W.task2Types.push({
    id: "discussion", name: "Discussion (Discuss both views)", nameVi: "Thảo luận hai quan điểm",
    short: "Discuss both views and give your own opinion.",
    what: "Đề nêu hai quan điểm đối lập. Bạn phải thảo luận CẢ HAI quan điểm (một cách công bằng) VÀ đưa ra ý kiến của mình. Thiếu ý kiến cá nhân = chưa trả lời đủ đề.",
    approach: [
      "Gạch chân hai quan điểm A và B trong đề; quyết định bạn nghiêng về bên nào (hoặc kết hợp cả hai).",
      "Mở bài: giới thiệu tranh luận + nói rõ bài sẽ bàn cả hai phía + ý kiến của bạn.",
      "Body 1 = quan điểm bạn KHÔNG chọn (trình bày khách quan: 'Some people argue that…', 'Supporters point out…').",
      "Body 2 = quan điểm bạn ủng hộ, viết dài và thuyết phục hơn, dùng ngôi thứ nhất ('I agree with those who…').",
      "Kết bài: tóm tắt cả hai và khẳng định lại ý kiến. Tránh dùng 'Advantages/Disadvantages' vì đây không phải đề ưu nhược điểm."
    ],
    outline: [
      { part: "Introduction", how: "Bối cảnh + hai quan điểm + ý kiến của bạn.", example: "Some people argue that building more roads is the answer, whereas others believe in public transport. This essay will discuss both views, but I believe improving public transport is the more sustainable solution." },
      { part: "Body 1", how: "Quan điểm thứ nhất (thường là phía bạn không chọn): 2 lý do + ví dụ, giọng khách quan.", example: "On the one hand, there are some reasons why building new roads may seem attractive." },
      { part: "Body 2", how: "Quan điểm thứ hai (phía bạn ủng hộ): lý do mạnh hơn, ví dụ cụ thể.", example: "On the other hand, I agree with those who favour public transport, for two main reasons." },
      { part: "Conclusion", how: "Tóm tắt hai phía + khẳng định ý kiến.", example: "In conclusion, while building roads can bring short-term relief, I believe investment in public transport offers a more effective long-term solution." }
    ],
    development: dev("First, new roads often attract more traffic rather than reducing it. (Claim) This happens because faster roads encourage more people to drive, a phenomenon known as induced demand. (Explain) Within a few years of a motorway being widened, the extra lanes are typically just as crowded as before. (Example) This suggests that road building alone cannot solve congestion in the long run. (Link)"),
    template: [
      { part: "Introduction", frames: ["Some people believe that ___, whereas others argue that ___. This essay will discuss both views, but I believe ___.", "There is disagreement about whether ___ or ___. In my opinion, ___."] },
      { part: "Body 1", frames: ["On the one hand, there are several reasons why some people think ___.", "Supporters of this view point out that ___. For example, ___."] },
      { part: "Body 2", frames: ["On the other hand, I agree with those who believe ___, for two main reasons.", "First, ___. Second, ___. A clear example of this is ___."] },
      { part: "Conclusion", frames: ["In conclusion, while ___ may ___, I believe ___ because ___.", "To conclude, both views have some merit, but in my view ___."] }
    ],
    language: {
      "Trình bày quan điểm người khác": ["Some people argue / claim that", "Supporters / Opponents of this view", "It is often said that", "Those who favour ___ point out that"],
      "Chuyển phía": ["On the one hand … On the other hand", "In contrast / Conversely", "However, others believe"],
      "Ý kiến của mình": ["I agree with those who", "In my view / I would argue that", "Personally, I believe", "I side with the view that"],
      "Kết bài": ["In conclusion / To conclude", "Both views have some merit, but", "On balance"]
    },
    mistakes: [
      "Quên đưa ý kiến cá nhân hoặc chỉ nêu ở kết bài một cách mơ hồ.",
      "Chỉ bàn một phía hoặc một phía quá sơ sài (1–2 câu).",
      "Dùng cấu trúc ưu điểm/nhược điểm thay vì hai quan điểm.",
      "Đưa ý kiến bản thân vào đoạn đang trình bày quan điểm người khác gây mâu thuẫn.",
      "Lạm dụng 'On the one hand / On the other hand' ở đầu mọi câu."
    ],
    sample: {
      promptId: "t2-discussion-01",
      text: P([
        "Traffic congestion has become a daily problem in many large cities, and there is disagreement about how to tackle it. Some people argue that building more roads is the answer, whereas others believe the money should be invested in public transport. This essay will discuss both views, but I believe improving public transport is the more sustainable solution.",
        "On the one hand, there are some reasons why building new roads may seem attractive. In cities where most people already own cars, wider roads and new ring roads can reduce journey times quickly and allow goods to be delivered more efficiently. For example, a bypass can take heavy lorries out of the city centre, which benefits both drivers and residents. Supporters also point out that roads serve everyone, including emergency vehicles and businesses, whereas public transport only covers fixed routes.",
        "On the other hand, I agree with those who favour public transport, for two main reasons. First, new roads often attract more traffic rather than reducing it, a phenomenon known as induced demand. Within a few years, the extra lanes become just as crowded as before. Second, an efficient metro or bus network can move far more people using much less space. A single train can carry over a thousand passengers, replacing hundreds of cars and cutting both congestion and air pollution. Cities such as Singapore and Seoul have shown that when public transport is fast, cheap and reliable, many people willingly leave their cars at home.",
        "In conclusion, while building roads can bring short-term relief and remains necessary in some cases, I believe investment in public transport offers a more effective long-term solution to traffic congestion, as well as making cities cleaner and more pleasant places to live."
      ]),
      notes: [
        "Mở bài nêu đủ hai quan điểm và ý kiến cá nhân ngay từ đầu.",
        "Body 1 trình bày phía đối lập một cách công bằng, có ví dụ (bypass) — không phủ nhận vội.",
        "Body 2 dài và mạnh hơn, có khái niệm chuyên môn (induced demand) và ví dụ thực tế (Singapore, Seoul).",
        "Kết bài cân bằng ('remains necessary in some cases') nhưng khẳng định rõ lựa chọn.",
        "Collocation: tackle congestion, short-term relief, fixed routes, fast, cheap and reliable."
      ]
    }
  });

  W.task2Types.push({
    id: "advdis", name: "Advantages & Disadvantages", nameVi: "Ưu điểm – Nhược điểm",
    short: "Do the advantages outweigh the disadvantages?",
    what: "Đề hỏi về ưu và nhược điểm của một xu hướng. Có 2 biến thể: (1) 'Discuss the advantages and disadvantages' – trình bày cả hai, không bắt buộc ý kiến; (2) 'Do the advantages outweigh the disadvantages?' / 'Is this a positive or negative development?' – BẮT BUỘC nêu bên nào nặng hơn.",
    approach: [
      "Đọc kỹ câu hỏi để biết có cần ý kiến 'outweigh' hay không.",
      "Liệt kê nhanh 2–3 ưu điểm và 2–3 nhược điểm, chọn bên có lập luận mạnh hơn làm kết luận.",
      "Với đề outweigh: mở bài nói luôn bên nào nặng hơn. Body 1 = bên yếu hơn (ngắn hơn), Body 2 = bên mạnh hơn (dài hơn, nhiều ví dụ hơn).",
      "Có thể kết luận 'ưu điểm nặng hơn nếu có điều kiện X' — nhưng phải rõ ràng.",
      "Ví dụ nên thực tế và gần gũi với xu hướng trong đề (dữ liệu phổ biến, kinh nghiệm quốc gia)."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase xu hướng + trả lời bên nào nặng hơn.", example: "Although this trend has certain drawbacks, I believe its advantages are more significant." },
      { part: "Body 1", how: "Nhược điểm (bên yếu hơn): 1–2 ý, phát triển rõ.", example: "There are undeniably some disadvantages to remote working. The most serious is the sense of isolation." },
      { part: "Body 2", how: "Ưu điểm (bên mạnh hơn): 2–3 ý, có ví dụ.", example: "However, these problems are outweighed by the benefits. Firstly, working from home saves a great deal of time and money." },
      { part: "Conclusion", how: "Tóm tắt hai bên + khẳng định bên nào nặng hơn (có thể kèm khuyến nghị).", example: "In conclusion, I believe the savings in time, higher productivity and environmental benefits make it a largely positive development." }
    ],
    development: dev("Firstly, working from home saves a great deal of time and money. (Claim) Employees no longer have to travel to an office every day, so the hours and fares spent on commuting disappear. (Explain) A worker who previously spent an hour travelling each way gains around ten hours a week, which can be used for rest, exercise or family. (Example) This extra time is a major improvement in quality of life that outweighs the occasional loneliness of remote work. (Link)"),
    template: [
      { part: "Introduction", frames: ["In recent years, ___ has become increasingly common. Although this has some drawbacks, I believe the benefits are more significant.", "This essay will examine both sides before concluding that ___."] },
      { part: "Body 1", frames: ["There are undeniably some disadvantages to ___. The most serious is ___.", "In addition, ___, which can lead to ___."] },
      { part: "Body 2", frames: ["However, these problems are outweighed by the benefits. Firstly, ___.", "Secondly, ___. For example, ___. Finally, ___."] },
      { part: "Conclusion", frames: ["In conclusion, while ___ can cause ___, I believe ___ make it a largely positive development.", "Overall, the advantages of ___ clearly outweigh its disadvantages."] }
    ],
    language: {
      "Ưu điểm": ["The main advantage / benefit of ___ is", "___ brings considerable benefits", "One positive aspect is", "___ is beneficial for"],
      "Nhược điểm": ["The main drawback / downside is", "___ may lead to / result in", "A serious disadvantage is", "___ poses a threat to"],
      "Cân nhắc": ["these problems are outweighed by", "the benefits far outweigh the drawbacks", "on balance", "provided that / as long as"]
    },
    mistakes: [
      "Đề hỏi 'outweigh' nhưng không nói rõ bên nào nặng hơn.",
      "Viết ưu điểm và nhược điểm dài bằng nhau rồi kết luận một bên — thiếu thuyết phục.",
      "Liệt kê nhiều ưu/nhược điểm bằng một câu ngắn mỗi ý, không phát triển.",
      "Nhầm sang dạng Opinion: chỉ bàn về việc đồng ý với xu hướng hay không."
    ],
    sample: {
      promptId: "t2-advdis-01",
      text: P([
        "In recent years, particularly since the COVID-19 pandemic, a growing number of employees have started working from home instead of commuting to an office. Although this trend has certain drawbacks, I believe its advantages are more significant.",
        "There are undeniably some disadvantages to remote working. The most serious is the sense of isolation that many people experience. Without daily face-to-face contact, employees may feel disconnected from their colleagues, and young staff in particular lose the chance to learn informally from more experienced workers. In addition, the boundary between work and personal life can become blurred. When the office is also the living room, many people find it difficult to switch off, which can lead to longer working hours and stress.",
        "However, these problems are outweighed by the benefits. Firstly, working from home saves a great deal of time and money. An employee who previously spent an hour commuting each way gains around ten hours a week, which can be used for rest, exercise or family. Secondly, remote work often increases productivity, as staff can concentrate without the constant interruptions of an open-plan office. Many companies have reported that output remained stable or even improved when employees worked remotely. Finally, there are wider benefits for society: fewer commuters mean less traffic congestion and lower carbon emissions, and companies can hire talented people who live far from major cities.",
        "In conclusion, while working from home can cause loneliness and make it harder to separate work from personal life, I believe the savings in time and money, higher productivity and environmental benefits make it a largely positive development. A hybrid model, combining home and office work, may offer the best of both worlds."
      ]),
      notes: [
        "Trả lời trực tiếp câu hỏi 'outweigh' ngay từ mở bài và lặp lại ở kết bài.",
        "Body 1 (nhược điểm) ngắn hơn Body 2 (ưu điểm) → cấu trúc phản ánh quan điểm.",
        "Câu chuyển đoạn 'However, these problems are outweighed by the benefits' liên kết hai đoạn mượt mà.",
        "Ví dụ định lượng (ten hours a week) làm lập luận thuyết phục.",
        "Collocation: sense of isolation, blurred boundary, switch off, open-plan office, the best of both worlds."
      ]
    }
  });

  W.task2Types.push({
    id: "problem", name: "Problem & Solution / Causes & Effects", nameVi: "Vấn đề – Giải pháp / Nguyên nhân",
    short: "What are the causes? What can be done?",
    what: "Đề nêu một vấn đề xã hội và hỏi nguyên nhân (causes/reasons) hoặc hậu quả (effects/problems) cùng với giải pháp (solutions/measures). Không cần đưa ý kiến đồng ý/không đồng ý, nhưng giải pháp phải thực tế và khớp với nguyên nhân.",
    approach: [
      "Xác định chính xác 2 câu hỏi của đề (causes + solutions? problems + solutions? causes + effects?) — trả lời đúng cả hai.",
      "Chọn 2 nguyên nhân rõ ràng nhất và phát triển kỹ thay vì liệt kê 5 nguyên nhân hời hợt.",
      "Giải pháp nên đối ứng với nguyên nhân (nguyên nhân 1 → giải pháp 1) và chỉ rõ AI làm (chính phủ, trường học, cá nhân) và LÀM GÌ.",
      "Body 1 = nguyên nhân/hậu quả, Body 2 = giải pháp. Mở bài nói rõ bài sẽ trình bày cả hai.",
      "Ví dụ chính sách thật (thuế, lệnh cấm, chiến dịch) giúp giải pháp thuyết phục."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase vấn đề + nói bài sẽ phân tích nguyên nhân và giải pháp.", example: "This essay will examine the main causes of this problem and suggest some practical measures to address it." },
      { part: "Body 1", how: "2 nguyên nhân (hoặc hậu quả) chính, mỗi cái được giải thích + ví dụ.", example: "The primary cause is the enormous quantity of single-use plastic that modern societies consume." },
      { part: "Body 2", how: "2–3 giải pháp tương ứng: ai làm, làm gì, vì sao hiệu quả.", example: "Firstly, governments should reduce the production of unnecessary plastic by taxing or banning single-use items." },
      { part: "Conclusion", how: "Tóm tắt nguyên nhân và giải pháp chính.", example: "A combination of legislation, international investment and stricter regulation is needed." }
    ],
    development: dev("Firstly, governments should reduce the production of unnecessary plastic by taxing or banning single-use items. (Claim) When disposable products become more expensive, both manufacturers and shoppers quickly switch to reusable alternatives. (Explain) The introduction of a small charge for plastic bags in the UK, for example, cut their use by more than 90% within a few years. (Example) Such measures tackle the problem at its source, before plastic can reach rivers and oceans. (Link)"),
    template: [
      { part: "Introduction", frames: ["___ has become a serious problem in many countries. This essay will examine the main causes of this issue and suggest some measures to tackle it.", "There are several reasons for ___, but there are also effective steps that can be taken."] },
      { part: "Body 1", frames: ["The primary cause of ___ is ___. This is because ___.", "A second factor is ___, which leads to ___. For instance, ___."] },
      { part: "Body 2", frames: ["Several measures could help to address this issue. Firstly, governments should ___ by ___.", "Secondly, ___ could ___, since ___. Finally, individuals can ___."] },
      { part: "Conclusion", frames: ["In conclusion, ___ results mainly from ___ and ___. A combination of ___ and ___ is needed to solve it."] }
    ],
    language: {
      "Nguyên nhân": ["The primary / root cause of ___ is", "___ stems from / is attributable to", "___ is largely due to", "A contributing factor is"],
      "Hậu quả": ["___ leads to / results in", "As a consequence", "This has a detrimental effect on", "___ poses a serious threat to"],
      "Giải pháp": ["One effective solution would be to", "Governments should introduce / impose", "___ could be tackled by", "Raising public awareness of"],
      "Hiệu quả": ["This would help to", "which would encourage people to", "tackle the problem at its source", "in the long run"]
    },
    mistakes: [
      "Chỉ trả lời một trong hai câu hỏi (ví dụ chỉ nói nguyên nhân).",
      "Giải pháp chung chung ('Governments should do something', 'people should be more aware').",
      "Giải pháp không liên quan tới nguyên nhân đã nêu.",
      "Liệt kê quá nhiều ý, mỗi ý một câu, không phát triển.",
      "Thêm ý kiến đồng ý/không đồng ý không cần thiết."
    ],
    sample: {
      promptId: "t2-problem-01",
      text: P([
        "Every year, millions of tonnes of plastic enter the world's oceans, harming marine life and eventually entering the human food chain. This essay will examine the main causes of this problem and suggest some practical measures to address it.",
        "The primary cause is the enormous quantity of single-use plastic that modern societies consume. Items such as bottles, bags and food packaging are used for only a few minutes but take hundreds of years to break down. Because these products are cheap and convenient, both manufacturers and consumers have little incentive to reduce them. A second cause is poor waste management, especially in rapidly developing countries. Where rubbish collection is irregular and landfill sites are uncovered, plastic is easily blown or washed into rivers, which then carry it to the sea. In addition, the fishing industry contributes significantly through abandoned nets and equipment.",
        "Several measures could help to tackle this issue. Firstly, governments should reduce the production of unnecessary plastic by taxing or banning single-use items. The introduction of a small charge for plastic bags in the UK, for example, cut their use by more than 90% within a few years. Secondly, wealthier nations and international organisations should invest in waste collection and recycling infrastructure in countries where it is lacking, since stopping plastic before it reaches rivers is far more effective than cleaning the ocean afterwards. Finally, the fishing industry could be required to mark and return its nets, with fines for those who dump equipment at sea.",
        "In conclusion, ocean plastic results mainly from excessive use of disposable products, inadequate waste management and careless fishing practices. A combination of legislation, international investment and stricter regulation of fishing is needed if this growing threat is to be brought under control."
      ]),
      notes: [
        "Trả lời đủ cả hai câu hỏi: nguyên nhân (Body 1) và giải pháp (Body 2).",
        "Mỗi giải pháp đối ứng với một nguyên nhân (single-use → tax/ban; waste management → infrastructure; fishing → regulation).",
        "Giải pháp cụ thể: chỉ rõ ai làm, làm gì và vì sao hiệu quả, kèm ví dụ thật (phí túi nilon ở Anh).",
        "Collocation: break down, little incentive, waste management, recycling infrastructure, brought under control."
      ]
    }
  });

  W.task2Types.push({
    id: "twopart", name: "Two-part Question", nameVi: "Câu hỏi kép",
    short: "Hai câu hỏi trực tiếp — trả lời đủ cả hai",
    what: "Đề đưa một tình huống rồi hỏi HAI câu hỏi khác nhau (ví dụ: Why is this happening? Is it a positive or negative development?). Mỗi câu hỏi cần được trả lời đầy đủ trong một đoạn thân bài riêng.",
    approach: [
      "Viết lại hai câu hỏi ra giấy nháp; mỗi câu hỏi = một đoạn thân bài.",
      "Mở bài: paraphrase tình huống + trả lời ngắn gọn cả hai câu hỏi (thesis kép).",
      "Body 1 trả lời câu hỏi 1 (thường là 2 lý do), Body 2 trả lời câu hỏi 2 (ý kiến + lý giải). Có thể thêm Body 3 nếu câu hỏi 2 cần nhượng bộ.",
      "Dùng từ khoá của câu hỏi ở câu chủ đề mỗi đoạn để giám khảo thấy rõ bạn đang trả lời câu nào.",
      "Câu hỏi dạng 'positive or negative' cần một câu trả lời rõ ràng (mostly positive / largely negative)."
    ],
    outline: [
      { part: "Introduction", how: "Paraphrase + câu trả lời ngắn cho cả hai câu hỏi.", example: "This essay will explain the main reasons for this trend and argue that, although it has some drawbacks, it is largely a positive development." },
      { part: "Body 1", how: "Câu hỏi 1: 2–3 lý do/ý, mỗi ý giải thích + ví dụ.", example: "There are several reasons why more people now live on their own. The most important is economic independence." },
      { part: "Body 2", how: "Câu hỏi 2: câu trả lời chính + lý giải.", example: "In my opinion, this trend is mostly positive. Living alone allows people to develop independence and responsibility." },
      { part: "Body 3 (tuỳ chọn)", how: "Mặt còn lại của câu hỏi 2 (nhược điểm, hạn chế) và cách khắc phục.", example: "Nevertheless, there are some negative consequences, such as social isolation." },
      { part: "Conclusion", how: "Tóm tắt câu trả lời cho cả hai câu hỏi.", example: "In conclusion, the rise in people living alone is driven by financial independence and changing attitudes, and I believe it is a positive development overall." }
    ],
    development: dev("The most important reason is economic independence. (Claim) As incomes have risen and more women have entered the workforce, many adults can afford a home without sharing the cost. (Explain) In cities such as Stockholm, more than half of all households now consist of a single person. (Example) Financial freedom is therefore a key factor behind the growth in people living alone. (Link)"),
    template: [
      { part: "Introduction", frames: ["Nowadays, ___. This essay will explain why this is happening and argue that it is largely a ___ development.", "There are several reasons for ___, and in my view this trend is ___."] },
      { part: "Body 1", frames: ["There are several reasons why ___. The most important is ___.", "Another factor is ___. For example, ___."] },
      { part: "Body 2", frames: ["In my opinion, this is a positive / negative development because ___.", "Firstly, ___. Moreover, ___."] },
      { part: "Conclusion", frames: ["In conclusion, ___ is mainly caused by ___ and ___. Although ___, I believe it is a ___ trend overall."] }
    ],
    language: {
      "Trả lời câu hỏi 1": ["There are several reasons why", "The main reason for this is", "This trend can be explained by", "Another contributing factor is"],
      "Trả lời câu hỏi 2": ["In my view, this is a largely positive development", "I believe this trend is mostly negative", "The main benefit is that", "This could have serious consequences for"],
      "Nhượng bộ – kết": ["Nevertheless / Even so", "These problems can be reduced through", "On balance", "Overall"]
    },
    mistakes: [
      "Trả lời kỹ câu hỏi 1 nhưng câu hỏi 2 chỉ 2–3 câu.",
      "Gộp hai câu hỏi vào cùng một đoạn khiến giám khảo khó theo dõi.",
      "Câu trả lời cho 'positive or negative' lưng chừng ('it has both sides').",
      "Mở bài không trả lời câu hỏi nào."
    ],
    sample: {
      promptId: "t2-twopart-01",
      text: P([
        "In many parts of the world, single-person households are becoming increasingly common. This essay will explain the main reasons for this trend and argue that, although it has some drawbacks, it is largely a positive development.",
        "There are several reasons why more people now live on their own. The most important is economic independence. As incomes have risen and more women have entered the workforce, many adults can afford to rent or buy a home without sharing the cost. Another factor is changing social attitudes. People are marrying later or not at all, and living alone is no longer seen as a sign of loneliness or failure but as a lifestyle choice. Finally, increased life expectancy means that many elderly people continue to live independently for years after losing a partner.",
        "In my opinion, this trend is mostly positive. Living alone allows people to develop independence and responsibility, as they must manage their own finances, cooking and household tasks. It also gives them the freedom to organise their lives according to their own preferences, which can improve well-being and creativity. For young professionals, having their own space can be an important step towards maturity before starting a family.",
        "Nevertheless, there are some negative consequences. Single-person households use more housing, energy and resources per person, which puts pressure on cities where housing is already scarce. Moreover, some people, particularly the elderly, may become socially isolated. However, these problems can be reduced through better urban planning, such as building smaller, energy-efficient flats, and through community programmes that keep older residents connected.",
        "In conclusion, the rise in people living alone is driven by greater financial independence, changing attitudes and longer lives. Although it brings some challenges, I believe it is a positive development overall because it reflects greater freedom and choice."
      ]),
      notes: [
        "Mở bài trả lời ngắn gọn cả hai câu hỏi (lý do + positive).",
        "Body 1 dùng từ khoá câu hỏi ('reasons why') — giám khảo thấy ngay đoạn trả lời câu 1.",
        "Body 2 + Body 3 trả lời câu 2 có chiều sâu: ý kiến chính + nhượng bộ + giải pháp.",
        "Collocation: economic independence, life expectancy, lifestyle choice, socially isolated, energy-efficient flats.",
        "Kết bài tóm tắt cả hai câu trả lời, không thêm ý mới."
      ]
    }
  });

  /* -------------------------------------------------------------------------
   * TASK 1 PROMPTS (28 — 4 per type)
   * ---------------------------------------------------------------------- */
  var T1END = "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.";
  var t1 = function (desc) { return desc + "\n" + T1END; };
  var add1 = function (o) { W.task1Prompts.push(o); };

  /* ---- LINE ---- */
  add1({
    id: "t1-line-01", type: "line", topic: "urban", title: "Commuting by car, bus and bicycle (1990–2020)", addedOn: "2026-03",
    prompt: t1("The graph below shows the percentage of workers in a European city who travelled to work by car, bus and bicycle between 1990 and 2020."),
    chart: { kind: "line", title: "Main way of travelling to work, European city", unit: "% of workers",
      xLabels: ["1990", "1995", "2000", "2005", "2010", "2015", "2020"],
      series: [
        { name: "Car", values: [55, 58, 60, 57, 52, 46, 41] },
        { name: "Bus", values: [25, 23, 20, 19, 20, 22, 24] },
        { name: "Bicycle", values: [8, 7, 7, 10, 14, 19, 25] }
      ] }
  });
  add1({
    id: "t1-line-02", type: "line", topic: "energy", title: "Electricity generation by source (2000–2020)", addedOn: "2026-04",
    prompt: t1("The graph below shows the amount of electricity generated from four different sources in one country between 2000 and 2020."),
    chart: { kind: "line", title: "Electricity generated by source", unit: "terawatt hours (TWh)",
      xLabels: ["2000", "2005", "2010", "2015", "2020"],
      series: [
        { name: "Coal", values: [120, 125, 118, 100, 80] },
        { name: "Natural gas", values: [40, 55, 70, 78, 82] },
        { name: "Nuclear", values: [60, 62, 60, 58, 55] },
        { name: "Renewables", values: [10, 15, 28, 52, 90] }
      ] }
  });
  add1({
    id: "t1-line-03", type: "line", topic: "education", title: "International students in four countries (2002–2022)", addedOn: "2026-06",
    prompt: t1("The graph below shows the number of international students enrolled at universities in four countries between 2002 and 2022."),
    chart: { kind: "line", title: "International students enrolled at universities", unit: "thousands of students",
      xLabels: ["2002", "2007", "2012", "2017", "2022"],
      series: [
        { name: "UK", values: [230, 300, 420, 440, 600] },
        { name: "Germany", values: [160, 190, 250, 300, 370] },
        { name: "Australia", values: [120, 180, 230, 290, 260] },
        { name: "Canada", values: [70, 90, 120, 210, 310] }
      ] }
  });
  add1({
    id: "t1-line-04", type: "line", topic: "society", title: "Population aged 65+ in Japan, the USA and Vietnam (1980–2040)", addedOn: "2026-10",
    prompt: t1("The graph below shows the proportion of the population aged 65 and over in Japan, the USA and Vietnam between 1980 and 2020, with projections to 2040."),
    chart: { kind: "line", title: "Population aged 65 and over", unit: "% of total population", projectedFrom: 5,
      xLabels: ["1980", "1990", "2000", "2010", "2020", "2030*", "2040*"],
      series: [
        { name: "Japan", values: [9, 12, 17, 23, 29, 31, 35] },
        { name: "USA", values: [11, 12.5, 12.4, 13, 16.6, 20, 22] },
        { name: "Vietnam", values: [5, 5.5, 6.4, 6.6, 8, 12, 17] }
      ] }
  });

  /* ---- BAR ---- */
  add1({
    id: "t1-bar-01", type: "bar", topic: "technology", title: "Teenagers' daily activities (2005 vs 2025)", addedOn: "2026-03",
    prompt: t1("The bar chart below shows the average amount of time teenagers in one city spent on five different activities per day in 2005 and 2025."),
    chart: { kind: "bar", title: "Average time spent per day by teenagers", unit: "minutes per day",
      categories: ["Watching TV", "Social media", "Homework", "Sport", "Reading for pleasure"],
      series: [
        { name: "2005", values: [150, 10, 75, 55, 35] },
        { name: "2025", values: [60, 185, 70, 35, 15] }
      ] }
  });
  add1({
    id: "t1-bar-02", type: "bar", topic: "environment", title: "Household waste recycled in five countries (2010 vs 2020)", addedOn: "2026-05",
    prompt: t1("The chart below shows the percentage of household waste that was recycled in five countries in 2010 and 2020."),
    chart: { kind: "bar", title: "Household waste recycled", unit: "% of household waste",
      categories: ["Germany", "South Korea", "UK", "Japan", "Vietnam"],
      series: [
        { name: "2010", values: [62, 50, 39, 20, 6] },
        { name: "2020", values: [67, 59, 44, 20, 12] }
      ] }
  });
  add1({
    id: "t1-bar-03", type: "bar", topic: "work", title: "Male and female employees by sector (2023)", addedOn: "2026-07",
    prompt: t1("The bar chart below shows the number of male and female employees working in six different sectors in one country in 2023."),
    chart: { kind: "bar", title: "Employees by sector and gender, 2023", unit: "thousands of employees", orientation: "horizontal",
      categories: ["Healthcare", "Construction", "Education", "IT", "Finance", "Retail"],
      series: [
        { name: "Men", values: [120, 410, 140, 260, 180, 230] },
        { name: "Women", values: [380, 45, 290, 90, 170, 250] }
      ] }
  });
  add1({
    id: "t1-bar-04", type: "bar", topic: "economy", title: "Household spending in Hanoi, Bangkok and Singapore", addedOn: "2026-09",
    prompt: t1("The bar chart below shows the percentage of household income spent on four categories in three Asian cities in 2024."),
    chart: { kind: "bar", title: "Share of household income spent, 2024", unit: "% of household income",
      categories: ["Housing", "Food", "Transport", "Entertainment"],
      series: [
        { name: "Hanoi", values: [25, 35, 10, 6] },
        { name: "Bangkok", values: [30, 28, 12, 8] },
        { name: "Singapore", values: [38, 18, 9, 10] }
      ] }
  });

  /* ---- PIE ---- */
  add1({
    id: "t1-pie-01", type: "pie", topic: "economy", title: "Household spending in 1990 and 2020", addedOn: "2026-03",
    prompt: t1("The pie charts below show how the average household in one country spent its income in 1990 and 2020."),
    chart: { kind: "pie", title: "Average household spending", unit: "%",
      pies: [
        { label: "1990", slices: [{ name: "Housing", value: 22 }, { name: "Food", value: 35 }, { name: "Transport", value: 12 }, { name: "Education", value: 8 }, { name: "Leisure", value: 10 }, { name: "Other", value: 13 }] },
        { label: "2020", slices: [{ name: "Housing", value: 32 }, { name: "Food", value: 20 }, { name: "Transport", value: 14 }, { name: "Education", value: 12 }, { name: "Leisure", value: 15 }, { name: "Other", value: 7 }] }
      ] }
  });
  add1({
    id: "t1-pie-02", type: "pie", topic: "environment", title: "How a city disposed of its waste (2005 vs 2025)", addedOn: "2026-05",
    prompt: t1("The pie charts below show how household waste was disposed of in one city in 2005 and 2025."),
    chart: { kind: "pie", title: "Methods of household waste disposal", unit: "%",
      pies: [
        { label: "2005", slices: [{ name: "Landfill", value: 64 }, { name: "Recycling", value: 18 }, { name: "Incineration", value: 12 }, { name: "Composting", value: 6 }] },
        { label: "2025", slices: [{ name: "Landfill", value: 28 }, { name: "Recycling", value: 39 }, { name: "Incineration", value: 21 }, { name: "Composting", value: 12 }] }
      ] }
  });
  add1({
    id: "t1-pie-03", type: "pie", topic: "media", title: "Main news sources by age group", addedOn: "2026-08",
    prompt: t1("The pie charts below show the main source of news for adults in three age groups in one country in 2025."),
    chart: { kind: "pie", title: "Main source of news, 2025", unit: "%",
      pies: [
        { label: "Aged 18–34", slices: [{ name: "Social media", value: 52 }, { name: "Television", value: 15 }, { name: "News websites & apps", value: 23 }, { name: "Print newspapers", value: 3 }, { name: "Radio", value: 7 }] },
        { label: "Aged 35–54", slices: [{ name: "Social media", value: 30 }, { name: "Television", value: 32 }, { name: "News websites & apps", value: 25 }, { name: "Print newspapers", value: 6 }, { name: "Radio", value: 7 }] },
        { label: "Aged 55+", slices: [{ name: "Social media", value: 12 }, { name: "Television", value: 51 }, { name: "News websites & apps", value: 14 }, { name: "Print newspapers", value: 15 }, { name: "Radio", value: 8 }] }
      ] }
  });
  add1({
    id: "t1-pie-04", type: "pie", topic: "food", title: "Daily calorie intake by food group (1980 vs 2020)", addedOn: "2026-10",
    prompt: t1("The pie charts below show the proportion of daily calories that people in one country obtained from five food groups in 1980 and 2020."),
    chart: { kind: "pie", title: "Sources of daily calorie intake", unit: "%",
      pies: [
        { label: "1980", slices: [{ name: "Grains & rice", value: 55 }, { name: "Meat & fish", value: 12 }, { name: "Dairy", value: 8 }, { name: "Fruit & vegetables", value: 15 }, { name: "Sugar & snacks", value: 10 }] },
        { label: "2020", slices: [{ name: "Grains & rice", value: 42 }, { name: "Meat & fish", value: 20 }, { name: "Dairy", value: 10 }, { name: "Fruit & vegetables", value: 12 }, { name: "Sugar & snacks", value: 16 }] }
      ] }
  });

  /* ---- TABLE ---- */
  add1({
    id: "t1-table-01", type: "table", topic: "travel", title: "Visitors to five tourist attractions (2015–2023)", addedOn: "2026-03",
    prompt: t1("The table below shows the number of visitors to five tourist attractions in one city in 2015, 2019 and 2023."),
    chart: { kind: "table", title: "Visitors to tourist attractions (millions)",
      headers: ["Attraction", "2015", "2019", "2023"],
      rows: [
        ["National Museum", "4.2", "5.1", "5.6"],
        ["City Zoo", "2.8", "2.5", "1.9"],
        ["Botanic Gardens", "1.5", "1.7", "2.6"],
        ["Old Castle", "3.6", "4.0", "3.1"],
        ["Science Centre", "0.9", "1.6", "2.4"]
      ] }
  });
  add1({
    id: "t1-table-02", type: "table", topic: "work", title: "Salary, hours and holidays in five occupations", addedOn: "2026-06",
    prompt: t1("The table below gives information about the average annual salary, weekly working hours and paid holiday in five occupations in one country in 2024."),
    chart: { kind: "table", title: "Working conditions in five occupations, 2024",
      headers: ["Occupation", "Average annual salary (USD)", "Average weekly hours", "Paid holiday (days per year)"],
      rows: [
        ["Doctor", "92,000", "52", "25"],
        ["Software engineer", "78,000", "41", "22"],
        ["Nurse", "46,000", "38", "25"],
        ["Teacher", "41,000", "45", "40"],
        ["Shop assistant", "24,000", "39", "15"]
      ] }
  });
  add1({
    id: "t1-table-03", type: "table", topic: "health", title: "Adults who exercise regularly by age (2004 vs 2024)", addedOn: "2026-07",
    prompt: t1("The table below shows the percentage of people in different age groups who exercised regularly in one country in 2004 and 2024."),
    chart: { kind: "table", title: "People who exercised at least three times a week (%)",
      headers: ["Age group", "2004", "2024"],
      rows: [
        ["16–24", "52", "61"],
        ["25–34", "44", "55"],
        ["35–44", "38", "47"],
        ["45–54", "30", "41"],
        ["55–64", "25", "38"],
        ["65 and over", "18", "33"]
      ] }
  });
  add1({
    id: "t1-table-04", type: "table", topic: "environment", title: "Plastic packaging use and recycling in six countries", addedOn: "2026-10",
    prompt: t1("The table below shows the amount of plastic packaging used per person and the percentage of it that was recycled in six countries in 2023."),
    chart: { kind: "table", title: "Plastic packaging waste, 2023",
      headers: ["Country", "Plastic packaging used (kg per person)", "Recycled (%)"],
      rows: [
        ["USA", "72", "9"],
        ["Australia", "59", "18"],
        ["South Korea", "44", "41"],
        ["Japan", "41", "25"],
        ["Germany", "39", "49"],
        ["Vietnam", "32", "14"]
      ] }
  });

  /* ---- MIXED ---- */
  add1({
    id: "t1-mixed-01", type: "mixed", topic: "travel", title: "Rainfall and tourist numbers in a coastal town", addedOn: "2026-03",
    prompt: t1("The line graph below shows the average monthly rainfall in a coastal town, and the bar chart shows the number of tourists who visited the town each month."),
    chart: { kind: "mixed", charts: [
      { kind: "line", title: "Average monthly rainfall", unit: "millimetres (mm)",
        xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        series: [{ name: "Rainfall", values: [75, 60, 55, 45, 30, 15, 10, 12, 30, 55, 80, 90] }] },
      { kind: "bar", title: "Number of tourists per month", unit: "thousands of visitors",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        series: [{ name: "Tourists", values: [8, 9, 14, 20, 32, 48, 61, 58, 35, 18, 9, 12] }] }
    ] }
  });
  add1({
    id: "t1-mixed-02", type: "mixed", topic: "government", title: "City budget by sector (2014 vs 2024)", addedOn: "2026-06",
    prompt: t1("The pie chart below shows how a city's budget was divided between six sectors in 2024, and the table shows the amount spent on each sector in 2014 and 2024."),
    chart: { kind: "mixed", charts: [
      { kind: "pie", title: "City budget by sector, 2024", unit: "%",
        pies: [{ label: "2024 (total $1,000 million)", slices: [{ name: "Education", value: 28 }, { name: "Transport", value: 22 }, { name: "Health", value: 18 }, { name: "Housing", value: 12 }, { name: "Administration", value: 12 }, { name: "Parks & culture", value: 8 }] }] },
      { kind: "table", title: "Spending by sector ($ million)",
        headers: ["Sector", "2014", "2024"],
        rows: [["Education", "210", "280"], ["Transport", "150", "220"], ["Health", "140", "180"], ["Housing", "130", "120"], ["Administration", "140", "120"], ["Parks & culture", "50", "80"], ["Total", "820", "1,000"]] }
    ] }
  });
  add1({
    id: "t1-mixed-03", type: "mixed", topic: "technology", title: "Electric car sales and charging stations (2018–2024)", addedOn: "2026-08",
    prompt: t1("The bar chart below shows the number of electric cars sold in one country between 2018 and 2024, and the line graph shows the number of public charging stations over the same period."),
    chart: { kind: "mixed", charts: [
      { kind: "bar", title: "Electric cars sold", unit: "thousands of cars",
        categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
        series: [{ name: "Electric cars sold", values: [12, 20, 31, 55, 90, 140, 185] }] },
      { kind: "line", title: "Public charging stations", unit: "thousands of stations",
        xLabels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
        series: [{ name: "Charging stations", values: [2, 3.5, 5, 8, 14, 22, 35] }] }
    ] }
  });
  add1({
    id: "t1-mixed-04", type: "mixed", topic: "education", title: "University enrolment by faculty and travel to campus", addedOn: "2026-09",
    prompt: t1("The table below shows the number of undergraduate and postgraduate students in five faculties at a university in 2025, and the pie chart shows how students travelled to the campus."),
    chart: { kind: "mixed", charts: [
      { kind: "table", title: "Students by faculty, 2025",
        headers: ["Faculty", "Undergraduate", "Postgraduate"],
        rows: [["Business", "4,100", "1,200"], ["Engineering", "3,200", "800"], ["Science", "2,600", "700"], ["Arts", "2,200", "300"], ["Medicine", "1,500", "600"]] },
      { kind: "pie", title: "How students travel to campus", unit: "%",
        pies: [{ label: "All students, 2025", slices: [{ name: "Bus", value: 34 }, { name: "Walking", value: 22 }, { name: "Bicycle", value: 18 }, { name: "Car", value: 16 }, { name: "Metro", value: 10 }] }] }
    ] }
  });

  /* ---- MAP ---- */
  add1({
    id: "t1-map-01", type: "map", topic: "urban", title: "The village of Ashby: 1995 and today", addedOn: "2026-03",
    prompt: t1("The maps below show the village of Ashby in 1995 and today."),
    chart: { kind: "map", maps: [
      { label: "1995", features: [
        { type: "park", x: 5, y: 40, w: 50, h: 26, label: "Farmland" },
        { type: "park", x: 60, y: 40, w: 36, h: 26, label: "Farmland" },
        { type: "water", x: 0, y: 0, w: 100, h: 8, label: "River" },
        { type: "road", x: 0, y: 32, w: 100, h: 4, label: "Main Road" },
        { type: "road", x: 48, y: 8, w: 4, h: 24, label: "" },
        { type: "building", x: 10, y: 20, w: 10, h: 8, label: "Houses" },
        { type: "building", x: 24, y: 20, w: 8, h: 8, label: "Shop" },
        { type: "building", x: 56, y: 18, w: 12, h: 10, label: "School" },
        { type: "tree", x: 72, y: 12, w: 26, h: 18, label: "Forest" },
        { type: "building", x: 82, y: 42, w: 12, h: 7, label: "Farmhouse" }
      ] },
      { label: "Today", features: [
        { type: "water", x: 0, y: 0, w: 100, h: 8, label: "River" },
        { type: "road", x: 0, y: 32, w: 100, h: 4, label: "Main Road" },
        { type: "road", x: 48, y: 0, w: 4, h: 32, label: "Bridge" },
        { type: "building", x: 10, y: 20, w: 10, h: 8, label: "Houses" },
        { type: "building", x: 24, y: 20, w: 8, h: 8, label: "Café" },
        { type: "building", x: 56, y: 18, w: 22, h: 10, label: "School" },
        { type: "tree", x: 82, y: 12, w: 16, h: 18, label: "Forest" },
        { type: "building", x: 5, y: 40, w: 34, h: 26, label: "Housing estate" },
        { type: "road", x: 41, y: 36, w: 4, h: 34, label: "" },
        { type: "building", x: 50, y: 40, w: 26, h: 12, label: "Supermarket" },
        { type: "carpark", x: 50, y: 54, w: 26, h: 12, label: "Car park" },
        { type: "park", x: 80, y: 40, w: 16, h: 26, label: "Park" }
      ] }
    ] }
  });
  add1({
    id: "t1-map-02", type: "map", topic: "education", title: "University library ground floor: now and after redevelopment", addedOn: "2026-05",
    prompt: t1("The plans below show the ground floor of a university library at present and how it will look after redevelopment."),
    chart: { kind: "map", maps: [
      { label: "Present", features: [
        { type: "building", x: 5, y: 5, w: 40, h: 30, label: "Book shelves" },
        { type: "building", x: 50, y: 5, w: 20, h: 20, label: "Office" },
        { type: "building", x: 75, y: 5, w: 20, h: 20, label: "Toilets" },
        { type: "building", x: 50, y: 30, w: 45, h: 25, label: "Study area (40 desks)" },
        { type: "building", x: 5, y: 40, w: 22, h: 18, label: "Computer room (12 PCs)" },
        { type: "building", x: 31, y: 44, w: 15, h: 10, label: "Reception desk" },
        { type: "road", x: 38, y: 60, w: 24, h: 10, label: "Entrance" }
      ] },
      { label: "After redevelopment", features: [
        { type: "building", x: 5, y: 5, w: 24, h: 30, label: "Book shelves" },
        { type: "building", x: 32, y: 5, w: 14, h: 30, label: "Group study rooms" },
        { type: "building", x: 50, y: 5, w: 20, h: 20, label: "Office" },
        { type: "building", x: 75, y: 5, w: 20, h: 20, label: "Toilets" },
        { type: "building", x: 50, y: 30, w: 22, h: 25, label: "Silent study" },
        { type: "building", x: 75, y: 30, w: 20, h: 25, label: "Café" },
        { type: "building", x: 5, y: 38, w: 28, h: 22, label: "Computer room (30 PCs)" },
        { type: "building", x: 35, y: 44, w: 12, h: 10, label: "Self-service" },
        { type: "road", x: 38, y: 60, w: 24, h: 10, label: "Entrance" }
      ] }
    ] }
  });
  add1({
    id: "t1-map-03", type: "map", topic: "urban", title: "City waterfront: 2000 and 2025", addedOn: "2026-07",
    prompt: t1("The maps below show the waterfront area of a city in 2000 and 2025."),
    chart: { kind: "map", maps: [
      { label: "2000", features: [
        { type: "water", x: 0, y: 45, w: 100, h: 25, label: "Harbour" },
        { type: "road", x: 0, y: 8, w: 100, h: 4, label: "Main Street" },
        { type: "road", x: 0, y: 38, w: 100, h: 3, label: "Goods railway" },
        { type: "building", x: 5, y: 16, w: 20, h: 18, label: "Warehouses" },
        { type: "building", x: 30, y: 16, w: 20, h: 18, label: "Warehouses" },
        { type: "building", x: 58, y: 14, w: 26, h: 20, label: "Factory" },
        { type: "carpark", x: 87, y: 14, w: 11, h: 20, label: "Car park" },
        { type: "building", x: 8, y: 46, w: 32, h: 7, label: "Cargo docks" }
      ] },
      { label: "2025", features: [
        { type: "water", x: 0, y: 45, w: 100, h: 25, label: "Harbour" },
        { type: "road", x: 0, y: 8, w: 100, h: 4, label: "Main Street" },
        { type: "park", x: 0, y: 38, w: 100, h: 3, label: "Cycle path" },
        { type: "building", x: 5, y: 16, w: 20, h: 18, label: "Apartments" },
        { type: "building", x: 30, y: 16, w: 20, h: 18, label: "Shops & cafés" },
        { type: "building", x: 58, y: 14, w: 26, h: 20, label: "Art museum" },
        { type: "park", x: 87, y: 14, w: 11, h: 20, label: "Park" },
        { type: "building", x: 8, y: 47, w: 32, h: 9, label: "Marina" },
        { type: "road", x: 66, y: 41, w: 4, h: 29, label: "Footbridge" }
      ] }
    ] }
  });
  add1({
    id: "t1-map-04", type: "map", topic: "travel", title: "An island before and after tourist development", addedOn: "2026-10",
    prompt: t1("The maps below show a small island in 2010 and the same island in 2025 after the construction of tourist facilities."),
    chart: { kind: "map", maps: [
      { label: "2010", features: [
        { type: "water", x: 0, y: 0, w: 100, h: 70, label: "" },
        { type: "park", x: 14, y: 10, w: 72, h: 50, label: "" },
        { type: "beach", x: 14, y: 40, w: 22, h: 20, label: "Beach" },
        { type: "tree", x: 40, y: 15, w: 34, h: 24, label: "Forest" },
        { type: "building", x: 77, y: 13, w: 8, h: 8, label: "Lighthouse" }
      ] },
      { label: "2025", features: [
        { type: "water", x: 0, y: 0, w: 100, h: 70, label: "" },
        { type: "park", x: 14, y: 10, w: 72, h: 50, label: "" },
        { type: "beach", x: 14, y: 40, w: 22, h: 20, label: "Beach" },
        { type: "road", x: 0, y: 49, w: 14, h: 3, label: "Pier" },
        { type: "building", x: 18, y: 14, w: 16, h: 11, label: "Hotel" },
        { type: "road", x: 25, y: 25, w: 3, h: 15, label: "" },
        { type: "road", x: 34, y: 18, w: 14, h: 3, label: "" },
        { type: "tree", x: 48, y: 15, w: 26, h: 20, label: "Forest" },
        { type: "building", x: 77, y: 13, w: 8, h: 8, label: "Lighthouse" },
        { type: "building", x: 39, y: 44, w: 13, h: 9, label: "Restaurant" },
        { type: "building", x: 58, y: 42, w: 22, h: 12, label: "Solar panels" }
      ] }
    ] }
  });

  /* ---- PROCESS ---- */
  add1({
    id: "t1-process-01", type: "process", topic: "food", title: "How black tea is produced", addedOn: "2026-03",
    prompt: t1("The diagram below shows the stages in the production of black tea."),
    chart: { kind: "process", title: "Black tea production", cyclic: false, steps: [
      { label: "Picking", note: "Fresh leaves hand-picked from tea bushes" },
      { label: "Withering", note: "Spread out to dry for 12–17 hours" },
      { label: "Rolling", note: "Rolled to release natural juices" },
      { label: "Oxidation", note: "Leaves turn dark in a humid room (1–3 hours)" },
      { label: "Drying", note: "Heated to 120°C to stop oxidation" },
      { label: "Sorting", note: "Graded by leaf size" },
      { label: "Packaging", note: "Packed into boxes or tea bags" },
      { label: "Distribution", note: "Transported to shops" }
    ] }
  });
  add1({
    id: "t1-process-02", type: "process", topic: "environment", title: "Recycling aluminium cans", addedOn: "2026-05",
    prompt: t1("The diagram below shows how aluminium drinks cans are recycled."),
    chart: { kind: "process", title: "Aluminium can recycling", cyclic: true, steps: [
      { label: "Consumers", note: "Drinks bought and cans used" },
      { label: "Collection", note: "Cans put in recycling bins" },
      { label: "Sorting", note: "Separated from other waste by magnets" },
      { label: "Shredding", note: "Cut into small pieces and cleaned" },
      { label: "Melting", note: "Heated to 750°C in a furnace" },
      { label: "Ingots", note: "Molten metal cast into blocks" },
      { label: "Rolling", note: "Blocks rolled into thin sheets" },
      { label: "New cans", note: "Sheets shaped and filled with drinks" },
      { label: "Shops", note: "Delivered to supermarkets" }
    ] }
  });
  add1({
    id: "t1-process-03", type: "process", topic: "animals", title: "The life cycle of the salmon", addedOn: "2026-07",
    prompt: t1("The diagram below shows the life cycle of the salmon."),
    chart: { kind: "process", title: "Life cycle of the salmon", cyclic: true, steps: [
      { label: "Eggs", note: "Laid in gravel in upper river" },
      { label: "Alevins", note: "Hatch after 2–3 months; stay in gravel" },
      { label: "Fry", note: "Small fish (3–8 cm) feed in streams" },
      { label: "Smolts", note: "12–15 cm; swim downstream (1–3 years old)" },
      { label: "Adults at sea", note: "Grow to 70–76 cm over 1–4 years" },
      { label: "Return", note: "Swim back to native river" },
      { label: "Spawning", note: "Females lay eggs; many adults die" }
    ] }
  });
  add1({
    id: "t1-process-04", type: "process", topic: "energy", title: "How a hydroelectric power station works", addedOn: "2026-10",
    prompt: t1("The diagram below shows how electricity is generated in a hydroelectric power station."),
    chart: { kind: "process", title: "Hydroelectric power generation", cyclic: false, steps: [
      { label: "Reservoir", note: "Rain and rivers fill a lake behind a dam" },
      { label: "Intake gates", note: "Gates open to let water in" },
      { label: "Penstock", note: "Water flows down a steep pipe at high speed" },
      { label: "Turbine", note: "Moving water spins the turbine blades" },
      { label: "Generator", note: "Turbine shaft drives generator → electricity" },
      { label: "Transformer", note: "Voltage increased for transmission" },
      { label: "Power lines", note: "Electricity sent to homes and factories" },
      { label: "Outflow", note: "Water returns to river below the dam" }
    ] }
  });

  /* -------------------------------------------------------------------------
   * TASK 2 PROMPTS (30 — 6 per type)
   * ---------------------------------------------------------------------- */
  var add2 = function (o) { W.task2Prompts.push(o); };
  var c = function (word, vi) { return { word: word, vi: vi }; };

  /* ---- OPINION ---- */
  add2({
    id: "t2-opinion-01", type: "opinion", topic: "education", title: "Free university education for all", addedOn: "2026-03",
    prompt: "Some people believe that university education should be provided free of charge to all students, regardless of their financial background.\nTo what extent do you agree or disagree?",
    ideas: {
      for: ["Equal opportunity: talented students from poor families are not excluded", "Educated workforce boosts the economy and tax revenue", "Graduates avoid heavy debt and can start families/businesses earlier", "Examples: Germany, Finland, Norway charge little or no tuition"],
      against: ["Huge cost for taxpayers, including those who never attend university", "Free places may lower quality if funding per student falls", "Students may value the course less and drop out more", "Money could go to primary schools or vocational training instead"]
    },
    collocations: [c("tuition fees", "học phí"), c("equal opportunity", "cơ hội bình đẳng"), c("a heavy financial burden", "gánh nặng tài chính lớn"), c("selected on merit", "được chọn dựa trên năng lực"), c("skilled workforce", "lực lượng lao động có kỹ năng"), c("public good", "lợi ích công / hàng hoá công")]
  });
  add2({
    id: "t2-opinion-02", type: "opinion", topic: "technology", title: "Smartphones make people less sociable", addedOn: "2026-04",
    prompt: "The widespread use of smartphones and social media is making people less sociable and less able to communicate face to face.\nTo what extent do you agree or disagree?",
    ideas: {
      for: ["People check phones during meals and meetings, reducing real conversation", "Young people practise fewer face-to-face skills such as reading body language", "Online 'friends' replace deeper offline relationships; loneliness rises", "Constant notifications shorten attention spans in conversation"],
      against: ["Smartphones help people stay in touch with distant family and friends", "Shy people and minorities find communities online", "Apps are used to organise real-life meetings and events", "Video calls kept relationships alive during the pandemic"]
    },
    collocations: [c("face-to-face interaction", "giao tiếp trực tiếp"), c("social isolation", "sự cô lập xã hội"), c("stay in touch", "giữ liên lạc"), c("attention span", "khả năng tập trung"), c("interpersonal skills", "kỹ năng giao tiếp"), c("screen time", "thời gian dùng màn hình")]
  });
  add2({
    id: "t2-opinion-03", type: "opinion", topic: "animals", title: "Zoos should be closed", addedOn: "2026-05",
    prompt: "Some people think that keeping animals in zoos is cruel and that all zoos should be closed down.\nTo what extent do you agree or disagree?",
    ideas: {
      for: ["Animals suffer stress in small enclosures and show abnormal behaviour", "Wild animals lose natural instincts and cannot be released", "Zoos exist mainly for entertainment and profit", "Documentaries and virtual reality can educate without captivity"],
      against: ["Breeding programmes save endangered species (e.g. the Arabian oryx)", "Zoos fund conservation and scientific research", "Seeing real animals inspires children to care about wildlife", "Modern zoos provide large, natural habitats; better to regulate than close"]
    },
    collocations: [c("endangered species", "loài có nguy cơ tuyệt chủng"), c("in captivity", "bị nuôi nhốt"), c("natural habitat", "môi trường sống tự nhiên"), c("breeding programme", "chương trình nhân giống"), c("animal welfare", "phúc lợi động vật"), c("raise awareness of", "nâng cao nhận thức về")]
  });
  add2({
    id: "t2-opinion-04", type: "opinion", topic: "history", title: "Preserving old buildings is a waste of money", addedOn: "2026-06",
    prompt: "Some people believe that spending public money on preserving old buildings is a waste, and that the money should be used to build new homes and roads instead.\nTo what extent do you agree or disagree?",
    ideas: {
      for: ["Growing cities urgently need housing and infrastructure", "Maintenance of old buildings is very expensive", "Many old buildings are unsafe or not energy-efficient", "Land in city centres is scarce and valuable"],
      against: ["Historic buildings give cities identity and connect people to their past", "Heritage attracts tourists and generates income (e.g. Hoi An, Prague)", "Once demolished, they can never be replaced", "Old buildings can be adapted into homes, offices or museums"]
    },
    collocations: [c("historic buildings", "công trình lịch sử"), c("cultural heritage", "di sản văn hoá"), c("sense of identity", "bản sắc"), c("restore and maintain", "trùng tu và bảo dưỡng"), c("urban development", "phát triển đô thị"), c("generate revenue", "tạo ra doanh thu")]
  });
  add2({
    id: "t2-opinion-05", type: "opinion", topic: "energy", title: "Raising energy prices to cut consumption", addedOn: "2026-10",
    prompt: "The best way to reduce the amount of energy people use is to increase the price of fuel and electricity.\nTo what extent do you agree or disagree?",
    ideas: {
      for: ["Higher prices give a direct financial incentive to save energy", "Revenue can fund public transport and renewable energy", "Price signals encourage businesses to invest in efficiency"],
      against: ["Unfair to low-income households: energy poverty", "Demand for heating, cooking and commuting is inelastic", "Better options: efficiency standards, insulation grants, clean public transport", "Education campaigns and smart meters change habits without punishing the poor"]
    },
    collocations: [c("energy consumption", "mức tiêu thụ năng lượng"), c("financial incentive", "động lực tài chính"), c("low-income households", "hộ gia đình thu nhập thấp"), c("energy efficiency", "hiệu quả năng lượng"), c("renewable sources", "nguồn tái tạo"), c("fuel poverty", "nghèo năng lượng")]
  });
  add2({
    id: "t2-opinion-06", type: "opinion", topic: "crime", title: "Longer prison sentences reduce crime", addedOn: "2026-08",
    prompt: "Some people believe that longer prison sentences are the most effective way to reduce crime.\nTo what extent do you agree or disagree?",
    ideas: {
      for: ["Long sentences deter potential criminals", "Dangerous offenders are kept away from the public", "Victims feel that justice has been done"],
      against: ["Many crimes are committed on impulse; criminals do not expect to be caught", "Prisons can act as 'schools of crime' and increase reoffending", "Education, job training and rehabilitation reduce reoffending more", "Addressing root causes: poverty, drugs, lack of education"]
    },
    collocations: [c("prison sentence", "án tù"), c("act as a deterrent", "có tác dụng răn đe"), c("reoffending rates", "tỉ lệ tái phạm"), c("rehabilitation programmes", "chương trình cải tạo"), c("root causes of crime", "nguyên nhân gốc rễ của tội phạm"), c("law-abiding citizens", "công dân tuân thủ pháp luật")]
  });

  /* ---- DISCUSSION ---- */
  add2({
    id: "t2-discussion-01", type: "discussion", topic: "urban", title: "Public transport vs more roads", addedOn: "2026-03",
    prompt: "Some people think that the best way to reduce traffic congestion is to build more roads, while others believe that governments should invest in public transport instead.\nDiscuss both views and give your own opinion.",
    ideas: {
      for: ["(Roads) Quick reduction in journey times where car ownership is high", "(Roads) Bypasses take lorries out of city centres", "(Roads) Serve emergency vehicles, businesses and rural areas"],
      against: ["(Public transport) New roads create induced demand and fill up again", "(Public transport) Moves more people in less space; cuts pollution", "(Public transport) Examples: Singapore, Seoul, Tokyo metro systems"]
    },
    collocations: [c("traffic congestion", "ùn tắc giao thông"), c("public transport network", "mạng lưới giao thông công cộng"), c("induced demand", "nhu cầu phát sinh"), c("reduce journey times", "giảm thời gian di chuyển"), c("air pollution", "ô nhiễm không khí"), c("long-term solution", "giải pháp lâu dài")]
  });
  add2({
    id: "t2-discussion-02", type: "discussion", topic: "education", title: "Starting school early vs at seven", addedOn: "2026-04",
    prompt: "Some people believe that children should begin formal education at a very early age, while others think they should not start school until they are at least seven years old.\nDiscuss both views and give your own opinion.",
    ideas: {
      for: ["(Early) Young brains learn languages and numbers quickly", "(Early) Helps working parents and develops social skills", "(Early) Reduces gaps for disadvantaged children"],
      against: ["(Later) Play is essential for creativity and emotional development", "(Later) Early academic pressure causes stress and dislike of school", "(Later) Finland starts at seven and has strong results"]
    },
    collocations: [c("formal education", "giáo dục chính quy"), c("early childhood", "giai đoạn đầu đời"), c("learning through play", "học qua vui chơi"), c("social skills", "kỹ năng xã hội"), c("academic pressure", "áp lực học tập"), c("emotional development", "phát triển cảm xúc")]
  });
  add2({
    id: "t2-discussion-03", type: "discussion", topic: "health", title: "Who is responsible for people's health?", addedOn: "2026-05",
    prompt: "Some people think that governments should be responsible for the health of their citizens, while others believe that individuals should take responsibility for their own health.\nDiscuss both views and give your own opinion.",
    ideas: {
      for: ["(Government) Controls healthcare, food safety, clean air and water", "(Government) Taxes on sugar/tobacco and public campaigns work", "(Government) Poor people cannot afford healthy choices alone"],
      against: ["(Individual) Lifestyle choices: diet, exercise, smoking", "(Individual) Personal responsibility reduces pressure on hospitals", "(Individual) Information is widely available today"]
    },
    collocations: [c("public health", "sức khoẻ cộng đồng"), c("lifestyle choices", "lựa chọn lối sống"), c("preventive measures", "biện pháp phòng ngừa"), c("healthcare system", "hệ thống y tế"), c("take responsibility for", "chịu trách nhiệm về"), c("sedentary lifestyle", "lối sống ít vận động")]
  });
  add2({
    id: "t2-discussion-04", type: "discussion", topic: "culture", title: "Local traditions vs global culture", addedOn: "2026-06",
    prompt: "Some people think that it is important to preserve local traditions and ways of life, while others believe it is better to adopt the modern international culture brought by globalisation.\nDiscuss both views and give your own opinion.",
    ideas: {
      for: ["(Traditions) Identity, sense of belonging and diversity", "(Traditions) Traditional festivals and crafts support tourism", "(Traditions) Older generations pass on knowledge and values"],
      against: ["(Global) Shared culture improves communication and trade", "(Global) Access to new ideas, technology and freedoms", "(Global) Some traditions are outdated or discriminatory"]
    },
    collocations: [c("cultural identity", "bản sắc văn hoá"), c("globalisation", "toàn cầu hoá"), c("pass down from generation to generation", "truyền từ đời này sang đời khác"), c("cultural diversity", "đa dạng văn hoá"), c("traditional customs", "phong tục truyền thống"), c("sense of belonging", "cảm giác gắn bó")]
  });
  add2({
    id: "t2-discussion-05", type: "discussion", topic: "science", title: "Space exploration vs problems on Earth", addedOn: "2026-08",
    prompt: "Some people believe that the money spent on space exploration is justified, while others think it would be better spent on solving problems here on Earth.\nDiscuss both views and give your own opinion.",
    ideas: {
      for: ["(Space) Technologies such as satellites, GPS and weather forecasting", "(Space) Scientific knowledge and inspiration for young scientists", "(Space) Monitoring climate change from orbit"],
      against: ["(Earth) Poverty, hunger and disease need urgent funding", "(Earth) Space budgets are huge compared with aid", "(Earth) Private companies can fund space travel instead"]
    },
    collocations: [c("space exploration", "thám hiểm không gian"), c("scientific breakthroughs", "đột phá khoa học"), c("allocate funding", "phân bổ ngân sách"), c("pressing issues", "vấn đề cấp bách"), c("technological advances", "tiến bộ công nghệ"), c("satellite technology", "công nghệ vệ tinh")]
  });
  add2({
    id: "t2-discussion-06", type: "discussion", topic: "economy", title: "Economic growth vs well-being", addedOn: "2026-10",
    prompt: "Some people think that economic growth is the most important measure of a country's success, while others believe that other factors, such as the happiness and health of its people, are more important.\nDiscuss both views and give your own opinion.",
    ideas: {
      for: ["(Growth) Creates jobs and raises living standards", "(Growth) Funds hospitals, schools and infrastructure", "(Growth) GDP is measurable and comparable"],
      against: ["(Well-being) GDP ignores inequality, pollution and stress", "(Well-being) Bhutan's Gross National Happiness; New Zealand's well-being budget", "(Well-being) Above a certain income, happiness rises little"]
    },
    collocations: [c("economic growth", "tăng trưởng kinh tế"), c("standard of living", "mức sống"), c("quality of life", "chất lượng cuộc sống"), c("income inequality", "bất bình đẳng thu nhập"), c("gross domestic product (GDP)", "tổng sản phẩm quốc nội"), c("well-being", "hạnh phúc, an sinh")]
  });

  /* ---- ADVANTAGES / DISADVANTAGES ---- */
  add2({
    id: "t2-advdis-01", type: "advdis", topic: "work", title: "Working from home", addedOn: "2026-03",
    prompt: "More and more people are now working from home rather than travelling to an office.\nDo the advantages of this trend outweigh the disadvantages?",
    ideas: {
      advantages: ["No commuting: saves time and money", "Fewer interruptions → higher productivity", "Less traffic and lower emissions", "Companies can hire talent from anywhere"],
      disadvantages: ["Isolation and loss of team spirit", "Blurred line between work and personal life", "Junior staff miss informal learning", "Not possible for many jobs (healthcare, retail)"]
    },
    collocations: [c("remote working", "làm việc từ xa"), c("work-life balance", "cân bằng công việc – cuộc sống"), c("commuting time", "thời gian đi lại"), c("boost productivity", "tăng năng suất"), c("sense of isolation", "cảm giác cô lập"), c("hybrid model", "mô hình kết hợp")]
  });
  add2({
    id: "t2-advdis-02", type: "advdis", topic: "food", title: "Ready-made meals instead of home cooking", addedOn: "2026-04",
    prompt: "Nowadays, many people buy ready-made meals or order food delivery instead of cooking at home.\nDo the advantages of this outweigh the disadvantages?",
    ideas: {
      advantages: ["Saves time for busy workers", "Wide choice of cuisines", "Supports restaurants and delivery jobs"],
      disadvantages: ["High in salt, sugar and fat → obesity", "More expensive over time", "Packaging waste", "Loss of cooking skills and family meals"]
    },
    collocations: [c("processed food", "thực phẩm chế biến sẵn"), c("nutritional value", "giá trị dinh dưỡng"), c("time-saving", "tiết kiệm thời gian"), c("home-cooked meals", "bữa ăn nấu tại nhà"), c("single-use packaging", "bao bì dùng một lần"), c("balanced diet", "chế độ ăn cân bằng")]
  });
  add2({
    id: "t2-advdis-03", type: "advdis", topic: "technology", title: "Self-driving cars", addedOn: "2026-06",
    prompt: "In the future, self-driving cars may replace vehicles driven by humans.\nDo the advantages of this development outweigh the disadvantages?",
    ideas: {
      advantages: ["Fewer accidents caused by human error", "Mobility for elderly and disabled people", "Smoother traffic and less congestion", "Passengers can work or rest during journeys"],
      disadvantages: ["Job losses for taxi, bus and lorry drivers", "Hacking and software failures", "Legal questions about responsibility in accidents", "High cost at first"]
    },
    collocations: [c("autonomous vehicles", "xe tự lái"), c("human error", "lỗi do con người"), c("road safety", "an toàn giao thông"), c("job displacement", "mất việc do bị thay thế"), c("cyber security", "an ninh mạng"), c("cutting-edge technology", "công nghệ tiên tiến")]
  });
  add2({
    id: "t2-advdis-04", type: "advdis", topic: "society", title: "An ageing population", addedOn: "2026-07",
    prompt: "In many countries, people are living longer and the proportion of older people in the population is increasing.\nDo the advantages of this outweigh the disadvantages?",
    ideas: {
      advantages: ["Older people share experience and care for grandchildren", "Many continue working or volunteering", "Growth of 'silver economy' industries"],
      disadvantages: ["Pressure on pensions and healthcare", "Smaller workforce pays more tax", "Need for care homes and carers"]
    },
    collocations: [c("ageing population", "dân số già hoá"), c("life expectancy", "tuổi thọ"), c("retirement age", "tuổi nghỉ hưu"), c("pension system", "hệ thống lương hưu"), c("strain on healthcare", "áp lực lên y tế"), c("working-age population", "dân số trong độ tuổi lao động")]
  });
  add2({
    id: "t2-advdis-05", type: "advdis", topic: "urban", title: "Moving from the countryside to cities", addedOn: "2026-08",
    prompt: "In many developing countries, large numbers of people are moving from rural areas to cities.\nDo the advantages of this trend outweigh the disadvantages?",
    ideas: {
      advantages: ["Better jobs and higher incomes", "Access to universities and hospitals", "Cities drive innovation and economic growth"],
      disadvantages: ["Overcrowding, slums and high housing costs", "Traffic and pollution", "Rural areas lose young people; farming declines"]
    },
    collocations: [c("rural-urban migration", "di cư nông thôn – thành thị"), c("job opportunities", "cơ hội việc làm"), c("overcrowding", "tình trạng quá tải"), c("cost of living", "chi phí sinh hoạt"), c("rural depopulation", "suy giảm dân số nông thôn"), c("urban infrastructure", "cơ sở hạ tầng đô thị")]
  });
  add2({
    id: "t2-advdis-06", type: "advdis", topic: "science", title: "Genetically modified crops", addedOn: "2026-10",
    prompt: "Scientists are now able to genetically modify crops so that they grow faster and resist pests and disease.\nDo the advantages of this outweigh the disadvantages?",
    ideas: {
      advantages: ["Higher yields to feed a growing population", "Less use of chemical pesticides", "Crops resistant to drought as the climate changes", "Added nutrients (e.g. Golden Rice with vitamin A)"],
      disadvantages: ["Unknown long-term effects on health and ecosystems", "Large corporations control seeds; farmers depend on them", "Risk of cross-contamination with wild plants", "Public distrust"]
    },
    collocations: [c("genetically modified (GM) crops", "cây trồng biến đổi gen"), c("crop yields", "năng suất cây trồng"), c("food security", "an ninh lương thực"), c("resistant to pests", "kháng sâu bệnh"), c("long-term effects", "tác động lâu dài"), c("ecological balance", "cân bằng sinh thái")]
  });

  /* ---- PROBLEM / SOLUTION ---- */
  add2({
    id: "t2-problem-01", type: "problem", topic: "environment", title: "Plastic waste in the oceans", addedOn: "2026-03",
    prompt: "Large amounts of plastic waste end up in the world's oceans every year.\nWhat are the main causes of this problem, and what measures could be taken to solve it?",
    ideas: {
      causes: ["Huge consumption of single-use plastic", "Poor waste collection in developing countries", "Abandoned fishing nets", "Low recycling rates"],
      solutions: ["Taxes or bans on single-use items (UK bag charge)", "Invest in waste infrastructure where it is lacking", "Deposit-return schemes for bottles", "Regulate and fine the fishing industry"]
    },
    collocations: [c("single-use plastic", "nhựa dùng một lần"), c("marine life", "sinh vật biển"), c("waste management", "quản lý chất thải"), c("break down", "phân huỷ"), c("impose a ban on", "áp đặt lệnh cấm"), c("food chain", "chuỗi thức ăn")]
  });
  add2({
    id: "t2-problem-02", type: "problem", topic: "health", title: "Rising childhood obesity", addedOn: "2026-04",
    prompt: "In many countries, the number of children who are overweight or obese is increasing.\nWhat are the causes of this, and what solutions can you suggest?",
    ideas: {
      causes: ["Fast food and sugary drinks are cheap and heavily advertised", "Less physical activity; more screen time", "Busy parents cook less", "Unsafe streets, fewer playgrounds"],
      solutions: ["Sugar taxes and limits on junk food advertising to children", "Daily PE and healthy school meals", "Nutrition education for parents", "Safe parks and cycle routes"]
    },
    collocations: [c("childhood obesity", "béo phì ở trẻ em"), c("junk food", "đồ ăn vặt không lành mạnh"), c("physical activity", "hoạt động thể chất"), c("sugary drinks", "đồ uống nhiều đường"), c("sedentary lifestyle", "lối sống ít vận động"), c("eating habits", "thói quen ăn uống")]
  });
  add2({
    id: "t2-problem-03", type: "problem", topic: "animals", title: "Wild animals becoming extinct", addedOn: "2026-06",
    prompt: "Many species of wild animals are in danger of becoming extinct.\nWhy is this happening, and what can be done to protect them?",
    ideas: {
      causes: ["Habitat loss from farming, logging and cities", "Poaching and illegal wildlife trade", "Climate change and pollution"],
      solutions: ["Protected areas and national parks", "Strict laws and penalties on wildlife trade", "Breeding programmes", "Reduce demand through education"]
    },
    collocations: [c("habitat destruction", "phá huỷ môi trường sống"), c("illegal poaching", "săn bắt trái phép"), c("on the verge of extinction", "bên bờ tuyệt chủng"), c("wildlife conservation", "bảo tồn động vật hoang dã"), c("protected areas", "khu bảo tồn"), c("biodiversity", "đa dạng sinh học")]
  });
  add2({
    id: "t2-problem-04", type: "problem", topic: "history", title: "Young people know little about history", addedOn: "2026-07",
    prompt: "In many countries, young people know very little about the history of their own country.\nWhy is this the case, and what can be done to change it?",
    ideas: {
      causes: ["History taught as memorising dates; seen as boring", "Exam focus on science and maths", "Entertainment and social media dominate free time"],
      solutions: ["Interactive teaching: museum visits, role-play, local projects", "Historical films, games and podcasts", "Families share personal and local history"]
    },
    collocations: [c("national history", "lịch sử dân tộc"), c("rote learning", "học vẹt"), c("historical sites", "di tích lịch sử"), c("bring history to life", "làm lịch sử trở nên sống động"), c("curriculum", "chương trình học"), c("learn from the past", "học hỏi từ quá khứ")]
  });
  add2({
    id: "t2-problem-05", type: "problem", topic: "energy", title: "Rising household energy use", addedOn: "2026-09",
    prompt: "Household energy consumption is increasing in many countries.\nWhat are the reasons for this, and how can it be reduced?",
    ideas: {
      causes: ["More electrical devices and air conditioners", "Larger homes and more single-person households", "Poor insulation and inefficient appliances", "Cheap or subsidised electricity"],
      solutions: ["Energy-efficiency labels and standards", "Grants for insulation and solar panels", "Smart meters show real-time use", "Campaigns on simple habits"]
    },
    collocations: [c("energy-efficient appliances", "thiết bị tiết kiệm năng lượng"), c("carbon footprint", "dấu chân carbon"), c("solar panels", "tấm pin mặt trời"), c("insulation", "cách nhiệt"), c("power consumption", "mức tiêu thụ điện"), c("government subsidies", "trợ cấp của chính phủ")]
  });
  add2({
    id: "t2-problem-06", type: "problem", topic: "food", title: "Food waste in developed countries", addedOn: "2026-10",
    prompt: "In many developed countries, a large amount of food is thrown away every day.\nWhy does this happen, and what can be done to reduce food waste?",
    ideas: {
      causes: ["Supermarkets reject 'ugly' produce; bulk discounts", "Confusing 'best before' and 'use by' dates", "Large portions in restaurants", "Food is relatively cheap"],
      solutions: ["Laws requiring supermarkets to donate unsold food (France)", "Clearer date labelling", "Apps selling surplus food cheaply", "Composting and education on planning meals"]
    },
    collocations: [c("food waste", "lãng phí thực phẩm"), c("expiry date", "hạn sử dụng"), c("surplus food", "thực phẩm dư thừa"), c("landfill sites", "bãi chôn lấp"), c("donate to food banks", "quyên góp cho ngân hàng thực phẩm"), c("consumer behaviour", "hành vi người tiêu dùng")]
  });

  /* ---- TWO-PART ---- */
  add2({
    id: "t2-twopart-01", type: "twopart", topic: "society", title: "More people living alone", addedOn: "2026-03",
    prompt: "Nowadays, more and more people choose to live alone.\nWhy is this happening? Is it a positive or negative development?",
    ideas: {
      q1: ["Higher incomes and economic independence", "Later marriage; living alone seen as a lifestyle choice", "Longer life expectancy: elderly widows/widowers"],
      q2: ["Positive: independence, freedom, personal growth", "Negative: loneliness, more housing and energy per person", "Solutions: small efficient flats, community programmes"]
    },
    collocations: [c("single-person households", "hộ gia đình một người"), c("economic independence", "độc lập kinh tế"), c("lifestyle choice", "lựa chọn lối sống"), c("socially isolated", "bị cô lập xã hội"), c("personal freedom", "tự do cá nhân"), c("housing shortage", "thiếu nhà ở")]
  });
  add2({
    id: "t2-twopart-02", type: "twopart", topic: "media", title: "News from social media", addedOn: "2026-05",
    prompt: "Many people now get their news from social media rather than from newspapers or television.\nWhy is this? Is this a positive or negative development?",
    ideas: {
      q1: ["Instant, free and on mobile phones", "Personalised feeds and short videos", "Distrust of traditional media"],
      q2: ["Positive: speed, citizen journalism, diverse voices", "Negative: fake news, echo chambers, clickbait", "Need for media literacy education"]
    },
    collocations: [c("fake news", "tin giả"), c("echo chamber", "buồng vang (chỉ nghe ý kiến giống mình)"), c("media literacy", "năng lực thông tin"), c("reliable sources", "nguồn đáng tin cậy"), c("breaking news", "tin nóng"), c("spread misinformation", "lan truyền thông tin sai lệch")]
  });
  add2({
    id: "t2-twopart-03", type: "twopart", topic: "environment", title: "Can individuals help the environment?", addedOn: "2026-06",
    prompt: "Some people say that individuals can do little to improve the environment and that only governments and large companies can make a real difference.\nTo what extent do you agree with this view? What can individuals do to protect the environment?",
    ideas: {
      q1: ["Governments set laws, taxes and invest in clean energy", "Companies produce most emissions", "But consumer choices and votes shape what governments and companies do"],
      q2: ["Use public transport, cycle, fly less", "Reduce, reuse, recycle; avoid single-use plastic", "Eat less meat; waste less food", "Vote and campaign for green policies"]
    },
    collocations: [c("make a real difference", "tạo ra thay đổi thực sự"), c("carbon emissions", "khí thải carbon"), c("environmentally friendly", "thân thiện với môi trường"), c("consumer choices", "lựa chọn của người tiêu dùng"), c("reduce, reuse and recycle", "giảm thiểu, tái sử dụng và tái chế"), c("green policies", "chính sách xanh")]
  });
  add2({
    id: "t2-twopart-04", type: "twopart", topic: "culture", title: "Traditional crafts are disappearing", addedOn: "2026-08",
    prompt: "In many countries, traditional crafts and skills, such as making things by hand, are disappearing.\nWhy is this happening? What could be done to keep these skills alive?",
    ideas: {
      q1: ["Mass-produced goods are cheaper", "Young people prefer office jobs with higher pay", "Crafts take years to learn"],
      q2: ["Government grants and 'living treasure' schemes (Japan)", "Craft villages linked to tourism (Bát Tràng pottery)", "Online marketplaces for handmade products", "Teach crafts in schools and workshops"]
    },
    collocations: [c("traditional crafts", "nghề thủ công truyền thống"), c("mass-produced goods", "hàng sản xuất hàng loạt"), c("craft village", "làng nghề"), c("keep alive", "duy trì, giữ gìn"), c("skilled artisans", "nghệ nhân lành nghề"), c("handmade products", "sản phẩm thủ công")]
  });
  add2({
    id: "t2-twopart-05", type: "twopart", topic: "economy", title: "Spending on experiences rather than possessions", addedOn: "2026-09",
    prompt: "Many young people today prefer to spend their money on experiences, such as travel and concerts, rather than on possessions like cars or houses.\nWhy is this? Is it a positive or negative trend?",
    ideas: {
      q1: ["Housing is too expensive, so saving seems pointless", "Social media rewards sharing experiences", "Research suggests experiences bring longer-lasting happiness"],
      q2: ["Positive: personal growth, memories, less consumerism", "Negative: little saving for the future, financial insecurity", "Balance: budget for both experiences and savings"]
    },
    collocations: [c("disposable income", "thu nhập khả dụng"), c("material possessions", "của cải vật chất"), c("financial security", "an toàn tài chính"), c("long-lasting memories", "kỷ niệm lâu bền"), c("save for the future", "tiết kiệm cho tương lai"), c("consumer culture", "văn hoá tiêu dùng")]
  });
  add2({
    id: "t2-twopart-06", type: "twopart", topic: "government", title: "Public services moving online", addedOn: "2026-10",
    prompt: "Many governments now provide public services, such as tax payments and document applications, online.\nWhat are the reasons for this? Is it a positive or negative development?",
    ideas: {
      q1: ["Saves money on staff and offices", "Faster and available 24 hours a day", "Most citizens now have smartphones"],
      q2: ["Positive: convenience, less corruption, transparency", "Negative: elderly and rural people left behind (digital divide)", "Risks: data breaches; need offline options and support"]
    },
    collocations: [c("public services", "dịch vụ công"), c("digital divide", "khoảng cách số"), c("administrative procedures", "thủ tục hành chính"), c("data security", "bảo mật dữ liệu"), c("cut red tape", "giảm thủ tục rườm rà"), c("tech-savvy", "thành thạo công nghệ")]
  });

  /* ------------------------------------------------------------------------ */
  var root = window.IELTS = window.IELTS || {};
  root.data = root.data || {};
  root.data.writing = W;
})();
