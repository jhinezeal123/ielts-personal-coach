/* bc-listening-01 — Official IELTS Practice Listening Test (IELTS USA / British Council, "2015 BC IELTS PT 13").
   Question paper, answer key, audio transcript and the four section recordings were published free by IELTS USA on
   ielts.org (/en-us/usa/ielts-practice-test). That page has since been retired, so the audio assets point to the
   Internet Archive copies (web.archive.org, id_ = raw original bytes). Questions, numbering and answers are the
   official ones; Vietnamese explanations were written for this app. Schema: SPEC §6.1 / §6.3, CONTRACT v1. */
IELTS.registerPack({
  id: "bc-listening-01",
  version: 1,
  minAppVersion: "1.1.0",
  title: "Listening chính thức — 1 đề đầy đủ (IELTS USA / British Council) + 8 bài mẫu IELTS.org",
  source: "IELTS USA Practice Listening Test (British Council, 2015) và IELTS.org Listening Sample Tasks (2023) — đề, đáp án, transcript và audio chính thức từ ielts.org (bản lưu trên Internet Archive, web.archive.org); giải thích tiếng Việt và các câu \"Extra practice\" do app biên soạn. Dùng cá nhân, không thương mại.",
  assets: [
    { file: "bc-l1/section-1.mp3", url: "https://web.archive.org/web/20220528095737id_/https://www.ielts.org/-/media/us-files/ielts-practice-listening-test_section-1-audio.ashx" },
    { file: "bc-l1/section-2.mp3", url: "https://web.archive.org/web/20220528095736id_/https://www.ielts.org/-/media/us-files/ielts-practice-listening-test_section-2-audio.ashx" },
    { file: "bc-l1/section-3.mp3", url: "https://web.archive.org/web/20220728101627id_/https://www.ielts.org/-/media/us-files/ielts-practice-listening-test_section-3-audio.ashx" },
    { file: "bc-l1/section-4.mp3", url: "https://web.archive.org/web/20220528095736id_/https://www.ielts.org/-/media/us-files/ielts-practice-listening-test_section-4-audio.ashx" },
    /* IELTS.org official Listening sample tasks (2023 booklet), Internet Archive copies */
    { file: "ielts-samples/task-1-form-completion.mp3", url: "https://web.archive.org/web/20251224071640id_/https://ielts.org/cdn/ielts-sample-tests/ielts-listening/ielts-listening-sample-task-1-form-completion.mp3" },
    { file: "ielts-samples/task-2-multiple-choice.mp3", url: "https://web.archive.org/web/20251224072005id_/https://ielts.org/cdn/ielts-sample-tests/ielts-listening/ielts-listening-sample-task-2-multiple-choice.mp3" },
    { file: "ielts-samples/task-3-short-answer.mp3", url: "https://web.archive.org/web/20251224073353id_/https://ielts.org/cdn/ielts-sample-tests/ielts-listening/ielts-listening-sample-task-3-short-answer-questions.mp3" },
    { file: "ielts-samples/task-4-sentence-completion.mp3", url: "https://web.archive.org/web/20251224093118id_/https://ielts.org/cdn/ielts-sample-tests/ielts-listening/ielts-listening-sample-task-4-sentence-completion.mp3" },
    { file: "ielts-samples/task-5-matching-1.mp3", url: "https://web.archive.org/web/20251224070501id_/https://ielts.org/cdn/ielts-sample-tests/ielts-listening/ielts-listening-sample-task-5-matching.mp3" },
    { file: "ielts-samples/task-6-matching-2.mp3", url: "https://web.archive.org/web/20251224065614id_/https://ielts.org/cdn/ielts-sample-tests/ielts-listening/ielts-listening-sample-task-6-matching.mp3" },
    { file: "ielts-samples/task-7-plan-labelling.mp3", url: "https://web.archive.org/web/20251224073233id_/https://ielts.org/cdn/ielts-sample-tests/ielts-listening/ielts-listening-sample-task-7-plan-map-diagram-labelling.mp3" },
    { file: "ielts-samples/task-8-note-completion.mp3", url: "https://web.archive.org/web/20230629105010id_/https://www.ielts.org/about-the-test//-/media/files/ielts-sample-tasks-recording-08.ashx" }
  ],
  listeningTests: [
    {
      id: "BC-L1",
      title: "Official Practice Test (IELTS USA / British Council sample)",
      source: "Đề mẫu chính thức của IELTS USA (British Council biên soạn, 2015) — audio, câu hỏi và đáp án gốc; giải thích tiếng Việt do app biên soạn.",
      sections: [
        /* ───────────────────────── SECTION 1 ───────────────────────── */
        {
          id: "BC-L1-S1",
          part: 1,
          title: "City Bank – term deposits and investments",
          context: "A conversation between a bank clerk called Jeanette and a man who is asking for information on investing money.",
          audio: "asset:bc-l1/section-1.mp3",
          script: [
            { speaker: "Narrator", voice: "m", text: "You will hear a conversation between a bank clerk called Jeanette and a man who is asking for information on investing money. First you have some time to look at questions 1 to 4." },
            { speaker: "Narrator", voice: "m", text: "You will see that there is an example that has been done for you. On this occasion only the conversation relating to this example will be played first." },
            { speaker: "Woman", voice: "f", text: "This is City Bank. You're speaking with Jeanette. How may I help you today?" },
            { speaker: "Man", voice: "m", text: "Hi, er – I'd like to ask a few questions about a term deposit." },
            { speaker: "Woman", voice: "f", text: "Certainly. Do you currently have any investments with us?" },
            { speaker: "Narrator", voice: "m", text: "The man is asking about term deposits, so term deposits has been written in the space. Now we shall begin. You should answer the questions as you listen because you will not hear the recording a second time. Listen carefully and answer questions 1 to 4." },
            { speaker: "Woman", voice: "f", text: "This is City Bank. You're speaking with Jeanette. How may I help you today?" },
            { speaker: "Man", voice: "m", text: "Hi, er – I'd like to ask a few questions about a term deposit." },
            { speaker: "Woman", voice: "f", text: "Certainly. Do you currently have any investments with us?" },
            { speaker: "Man", voice: "m", text: "Yes, I do, but my term deposit is due to mature soon, and I've come to find out my options for renewing and extending it. I'm considering a range of different investments, to be honest, but I wanted to begin with the simplest option." },
            { speaker: "Woman", voice: "f", text: "OK, sir. Well, before we begin, I just need to verify your ID. Can I have your name please?" },
            { speaker: "Man", voice: "m", text: "David Marshall. That's M for mother A... R... S... H... A... double L.", q: [1] },
            { speaker: "Woman", voice: "f", text: "Thank you, David. Now, I just need to ask you a couple of security questions. What's your mobile phone number?" },
            { speaker: "Man", voice: "m", text: "0-2-3 5-6-1-0 double 5." },
            { speaker: "Woman", voice: "f", text: "And your date of birth please?" },
            { speaker: "Man", voice: "m", text: "18th of February 1968." },
            { speaker: "Woman", voice: "f", text: "Right, so I've got your account information in front of me. You've currently got eighteen thousand dollars on a term of a hundred and eighty days. That's at a rate of 3.45% per year, or per annum.", q: [2] },
            { speaker: "Man", voice: "m", text: "OK, so what are my options? Can we start by looking at 1 and 2 year terms?" },
            { speaker: "Woman", voice: "f", text: "We can do that. Let's see ... Right ... if we put it on a 1-year term, we can offer you a yearly return of 3.65 per cent, and for 2 years it's 3.7 per cent. Oh no ... hang on ... sorry, we have a special deal on that term right now, at 3.85 per cent.", q: [3] },
            { speaker: "Man", voice: "m", text: "OK, so what does that mean in dollars?" },
            { speaker: "Woman", voice: "f", text: "Just one moment and I'll bring it up. OK, so the total interest earned would be six hundred and fifty seven dollars over 1 year, and ... I'm just bringing up the 2-year figure for you ... that's a total of one thousand four hundred and twelve dollars interest on maturity." },
            { speaker: "Man", voice: "m", text: "Right. That's about a seven hundred dollar difference." },
            { speaker: "Woman", voice: "f", text: "Yes, a bit more actually." },
            { speaker: "Man", voice: "m", text: "OK. Oh ... a friend of mine told me he gets his term deposit interest paid into his account every month. Do you have a monthly interest option?", q: [4] },
            { speaker: "Woman", voice: "f", text: "Yes, actually. We do offer that on term deposits, but only on investments of twenty thousand dollars or more.", q: [4] },
            { speaker: "Narrator", voice: "m", text: "Before you hear the rest of the conversation, you have some time to look at questions 5 to 10. Now listen and answer questions 5 to 10." },
            { speaker: "Woman", voice: "f", text: "Can I ask if you've considered a P.I.E. as an alternative investment option?" },
            { speaker: "Man", voice: "m", text: "A pie?" },
            { speaker: "Woman", voice: "f", text: "Yes, it stands for Personal Investment Entity – it's an investment trust – your earnings tend to be higher than they are for a term deposit, because 28 per cent is the maximum tax on those earnings.", q: [5] },
            { speaker: "Man", voice: "m", text: "OK, that sounds interesting. I've heard of those, but I've never really understood them. I thought they were called 'pies', and they always sounded like something you eat! But I'd sure like to get a bigger slice of my investment pie!" },
            { speaker: "Woman", voice: "f", text: "Well, with a P.I.E., your investment return changes, depending on how much tax you normally pay." },
            { speaker: "Man", voice: "m", text: "Oh, I see, according to my income bracket.", q: [6] },
            { speaker: "Woman", voice: "f", text: "Yes, that's right. For example, on a 2-year plan, if you're earning in the range between forty-eight thousand and one dollars to seventy thousand dollars, at 30 per cent tax, there's a 3.75 per cent effective rate on P.I.E. earnings." },
            { speaker: "Man", voice: "m", text: "OK. I'm actually on a 33 per cent tax rate." },
            { speaker: "Woman", voice: "f", text: "Well, that's an even better return. If you're earning between seventy thousand and one dollars and a hundred and twenty thousand dollars, the effective interest rate is higher too. So let's have a look ... for a 2-year investment ... um ... the rate actually goes up to 3.92 per cent.", q: [7] },
            { speaker: "Man", voice: "m", text: "Wow. OK, so a P.I.E. may be the better option, better than a term deposit I mean. And can I do that with an eighteen thousand dollar investment?" },
            { speaker: "Woman", voice: "f", text: "Yes. The minimum deposit for a P.I.E. investment is ten thousand dollars." },
            { speaker: "Man", voice: "m", text: "OK. And are there any hidden charges?" },
            { speaker: "Woman", voice: "f", text: "No, no fees at all for investing in a P.I.E.", q: [8] },
            { speaker: "Man", voice: "m", text: "Well, that's good news! Oh, wait a minute ... what about interest payment options? Is it the same as the term deposits – you have to have a minimum deposit to be eligible for monthly payments?" },
            { speaker: "Woman", voice: "f", text: "Let me check the options here ... well, you'll be pleased to hear that there's actually more flexibility with P.I.E.s than with term deposits – you can opt to have your interest paid every month, quarterly, 6-monthly or yearly.", q: [9] },
            { speaker: "Man", voice: "m", text: "OK, well that's given me something to think about." },
            { speaker: "Woman", voice: "f", text: "Would you like to apply today?" },
            { speaker: "Man", voice: "m", text: "Er – no, I'll have to think about it thanks." },
            { speaker: "Woman", voice: "f", text: "Certainly. If you do decide to go ahead with it, applications are processed in 2 days as long as you have a bank account with us, which you do. You can apply on our website, by phone or pop into one of our branches.", q: [10] },
            { speaker: "Man", voice: "m", text: "Great. Thanks for your help." },
            { speaker: "Narrator", voice: "m", text: "That is the end of section 1. You now have half a minute to check your answers. Now turn to section 2." }
          ],
          groups: [
            {
              type: "table",
              kind: "gap",
              range: [1, 4],
              instruction: "Complete the table below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
              wordLimit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
              title: "City Bank Customer Service Log",
              content:
`<h4>City Bank Customer Service Log</h4>
<table class="q-table q-form">
  <tbody>
    <tr><th scope="row">Example: Type of query</th><td><u>Term deposits</u></td></tr>
    <tr><th scope="row">Customer name</th><td>David {{1}}</td></tr>
    <tr><th scope="row">Phone</th><td>023 - 561 - 055</td></tr>
    <tr><th scope="row">D.O.B.</th><td>18 / 02 / 1968</td></tr>
    <tr><th scope="row" colspan="2">Customer's Term Deposit details:</th></tr>
    <tr><th scope="row">Amount</th><td>$18,000</td></tr>
    <tr><th scope="row">Term</th><td>{{2}}</td></tr>
    <tr><th scope="row">Interest rate</th><td>3.45% per annum</td></tr>
    <tr><th scope="row" colspan="2">Current Term Deposit interest rates:</th></tr>
    <tr><th scope="row">1 year</th><td>3.65% per annum</td></tr>
    <tr><th scope="row">2 years</th><td>{{3}} % per annum</td></tr>
    <tr><th scope="row">{{4}} Term Deposits</th><td>Minimum deposit: $20,000</td></tr>
  </tbody>
</table>`,
              answers: {
                "1": ["Marshall"],
                "2": ["180 days", "180-days"],
                "3": ["3.85", "3.85%", "3.85 %"],
                "4": ["Monthly Interest", "monthly interest"],
              },
              explain: {
                "1": "'David Marshall. That's M for mother A... R... S... H... A... double L.' → Marshall (chú ý 'double L' = LL).",
                "2": "'You've currently got eighteen thousand dollars on a term of a hundred and eighty days.' → 180 days (đáp án chính thức có cả 'days').",
                "3": "Bẫy tự sửa: 'for 2 years it's 3.7 per cent. Oh no ... hang on ... sorry, we have a special deal on that term right now, at 3.85 per cent.' → 3.85 (không phải 3.7).",
                "4": "'Do you have a monthly interest option?' – 'We do offer that on term deposits, but only on investments of twenty thousand dollars or more.' → Monthly Interest (khớp với 'Minimum deposit: $20,000')."
              }
            },
            {
              type: "table",
              kind: "gap",
              range: [5, 10],
              instruction: "Complete the table below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
              wordLimit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
              title: "Personal Investment Entities (PIE)",
              content:
`<h4>Personal Investment Entities (PIE)</h4>
<table class="q-table">
  <tbody>
    <tr><th scope="row">{{5}} tax rate</th><td colspan="2">28%</td></tr>
    <tr><th scope="row">Investment returns</th><td colspan="2">Depend on {{6}}</td></tr>
    <tr><th scope="row">Term</th><th colspan="2">Effective rate of return</th></tr>
    <tr><th scope="row" rowspan="2">2 years</th><td>Salary $48,001 – $70,000</td><td>Salary $70,001 – \${{7}}</td></tr>
    <tr><td>3.75% per annum</td><td>3.92% per annum</td></tr>
    <tr><th scope="row">Minimum investment amount</th><td colspan="2">$10,000</td></tr>
    <tr><th scope="row">Hidden charges/fees</th><td colspan="2">{{8}}</td></tr>
    <tr><th scope="row">Interest payment options</th><td colspan="2">monthly, {{9}}, 6-monthly, annually</td></tr>
    <tr><th scope="row">Application options</th><td colspan="2">online / {{10}} / in person</td></tr>
  </tbody>
</table>`,
              answers: {
                "5": ["maximum"],
                "6": ["income bracket"],
                "7": ["120,000", "120000", "$120,000", "$120000"],
                "8": ["no fees"],
                "9": ["quarterly"],
                "10": ["phone", "by phone"]
              },
              explain: {
                "5": "'because 28 per cent is the maximum tax on those earnings' → maximum (tax rate tối đa 28%).",
                "6": "'your investment return changes, depending on how much tax you normally pay.' – 'Oh, I see, according to my income bracket.' → income bracket",
                "7": "'If you're earning between seventy thousand and one dollars and a hundred and twenty thousand dollars ... the rate actually goes up to 3.92 per cent.' → 120,000 (33% là mức thuế của người đàn ông, không phải đáp án).",
                "8": "'And are there any hidden charges?' – 'No, no fees at all for investing in a P.I.E.' → no fees",
                "9": "'you can opt to have your interest paid every month, quarterly, 6-monthly or yearly.' → quarterly (monthly, 6-monthly, annually đã có sẵn).",
                "10": "'You can apply on our website, by phone or pop into one of our branches.' → (by) phone (website = online, branches = in person)."
              }
            }
          ]
        },

        /* ───────────────────────── SECTION 2 ───────────────────────── */
        {
          id: "BC-L1-S2",
          part: 2,
          title: "Lunar Realm Amusement Park – September Celebration Day",
          context: "A woman introducing the Lunar Realm Amusement Park to visitors.",
          audio: "asset:bc-l1/section-2.mp3",
          script: [
            { speaker: "Narrator", voice: "m", text: "You will hear a woman introducing the Lunar Realm Amusement Park. First you have some time to look at questions 11 to 15. Listen carefully and answer questions 11 to 15." },
            { speaker: "Speaker", voice: "f", text: "Good morning everyone ... We're very pleased to have you here at Lunar Realm for our September Celebration Day. We have many smaller celebrations throughout the year for different events ... I think it was 5 at last count ... but the September celebration is a special day to honour the park's development from tiny beginnings to the huge enterprise it is today. It's our most significant annual event.", q: [11] },
            { speaker: "Speaker", voice: "f", text: "Come into the visitor center now. Over here you can see a picture of the original park when it was under construction. The land was donated to the city in 1955, by the then mayor, Matthew Hardacre, but the park itself wasn't developed until 1979, and ... you'll notice ... it wasn't very big at that time. Then there was a huge growth in the 1990s and we're still growing today.", q: [12] },
            { speaker: "Speaker", voice: "f", text: "In the beginning, there were only a few small rides in the park. There were lots of other attractions in those days, including an adventure playground for younger kids. The kids loved the petting zoo with its farm animals, and in fact, that's the only attraction to have survived until now. We've still kept two of the original rides as an exhibit, but they're not in working order any more.", q: [13] },
            { speaker: "Speaker", voice: "f", text: "We're now one of the biggest amusement parks in the country. We've got an amazing range of amusement rides here, 43 in total this year. I think we're most famous for our roller-coasters, aren't we? I guess you'll all have heard about The Hurricane, that's our oldest and most famous one. Some of our visitors think it's not fast enough to be truly exciting, but we love it because it's the highest wooden roller-coaster in the country. Then we have the Bobcat – that one's a bit gentler for our younger visitors. And for the truly adventurous, the Scream Machine hurls you upside down and backwards at huge speeds. It's too much for me!", q: [14] },
            { speaker: "Speaker", voice: "f", text: "It's important to remember that all of our rides have age guidelines, and to help you, there's a color system. If the sign for a ride is yellow, it means it's suitable for all ages, although we do recommend that parents or older siblings go with very young children. Blue means that children younger than 14 can ride only if an adult accompanies them. And black, well, this means that you must be at least 110 cm tall to ride, regardless of age. We should say that no rides are really suitable for children younger than 18 months, but we do have a special section for parents with babies.", q: [15] },
            { speaker: "Narrator", voice: "m", text: "Before you hear the rest of the talk, you have some time to look at questions 16 to 20. Now listen and answer questions 16 to 20." },
            { speaker: "Speaker", voice: "f", text: "Now, I'll tell you about the many options for food around the park. You can get a range of different cuisines, Italian, Chinese and so on ... All of that's in the Food Court, in the center of the park. But there are lots of other places as well; if you want hamburgers, sandwiches, that sort of thing, you can find food stands everywhere. We pride ourselves on the quality of our food, and all of our vendors use fresh, healthy ingredients from local farms.", q: [16] },
            { speaker: "Speaker", voice: "f", text: "Don't forget the special events we've planned for the Anniversary Celebration. There are two main events today and they're both free. The first is the afternoon parade. It kicks off at noon, so arrive a bit early if you want a good view. The best place to see it is along the main street. It's all organized by final year school students. You'll see some gymnastics and acrobatics, hear music from a marching band, and see some fantastic floats. The parade has become one of our feature events of the year.", q: [17] },
            { speaker: "Speaker", voice: "f", text: "The second big event today is an evening concert, which takes place at our main amphitheater. The concert features singing and dancing, costumes and lights, and there's a different theme each year. This year the theme is Hollywood, and it's all about classic style and old films. The concert starts at 7 p.m., but try to arrive by 6:45.", q: [18] },
            { speaker: "Speaker", voice: "f", text: "Now I know you're all eager to get out there and have fun, but before you go I'm just going to tell you some information about safety and security. If anyone needs medical attention, we have help available. You can see on this map that next to the Visitor Center ... which is where we are now, of course ... ah ... can you see this red dot? Yes, so that is one of our ten first-aid centers. If you get hurt, all you need to do is ask a member of staff to direct you towards the nearest one.", q: [19] },
            { speaker: "Speaker", voice: "f", text: "And kids, remember, if something happens, you get lost ... and you can't find your parents, please tell someone who works at the park, just look for someone dressed in the Lunar Realm colors, and they will assist you. And for anyone who has a problem of any sort, you can come and talk to a member of our security team at any one of the many guard stations ... those are the blue dots here on the map ... Don't forget to take a copy of the map ...", q: [20] },
            { speaker: "Narrator", voice: "m", text: "That is the end of section 2. You now have half a minute to check your answers. Now turn to section 3." }
          ],
          groups: [
            {
              type: "mcq",
              kind: "mcq",
              range: [11, 15],
              instruction: "Choose the correct letter, A, B or C.",
              questions: [
                { n: 11, text: "The September Celebration day is held ...", options: ["A five times a year to honour the city", "B on the park's important birthday", "C to remember the history of the park"], answer: "C",
                  explain: "'the September celebration is a special day to honour the park's development from tiny beginnings to the huge enterprise it is today' → C. Bẫy A: số 5 là các lễ nhỏ khác ('I think it was 5 at last count'); B: không nhắc đến sinh nhật của công viên." },
                { n: 12, text: "The park was first built in ...", options: ["A 1955", "B 1979", "C the 1990s"], answer: "B",
                  explain: "'The land was donated to the city in 1955 ... but the park itself wasn't developed until 1979' → B. 1955 chỉ là năm hiến đất, 1990s là giai đoạn mở rộng." },
                { n: 13, text: "The park still uses ...", options: ["A a children's play area", "B a petting zoo", "C two of the early rides"], answer: "B",
                  explain: "'The kids loved the petting zoo with its farm animals, and in fact, that's the only attraction to have survived until now.' → B. Bẫy C: 'two of the original rides' chỉ được giữ làm vật trưng bày, 'not in working order any more'." },
                { n: 14, text: "The Hurricane roller-coaster is ...", options: ["A tall and made of wood", "B designed for smaller children", "C very fast and exciting"], answer: "A",
                  explain: "'it's the highest wooden roller-coaster in the country' → A (highest = tall, wooden = made of wood). B là tàu Bobcat; C bị phủ định: 'not fast enough to be truly exciting'." },
                { n: 15, text: "The rides with a height limit are coded ...", options: ["A yellow", "B blue", "C black"], answer: "C",
                  explain: "'And black, well, this means that you must be at least 110 cm tall to ride, regardless of age.' → C. Yellow = mọi lứa tuổi; blue = dưới 14 tuổi cần người lớn đi kèm." }
              ]
            },
            {
              type: "note",
              kind: "gap",
              range: [16, 20],
              instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",
              wordLimit: "NO MORE THAN TWO WORDS",
              title: "Lunar Realm – visitor information",
              content:
`<h5>Food options:</h5>
<ul>
  <li>Italian, Chinese, etc. at the Food Court</li>
  <li>hamburgers, sandwiches, etc. at {{16}}</li>
</ul>
<h5>Special Events:</h5>
<p><b>Parade</b></p>
<ul>
  <li>Starts at noon</li>
  <li>On the {{17}}</li>
  <li>Run by final year high school students</li>
</ul>
<p><b>Concert</b></p>
<ul>
  <li>At the amphitheatre</li>
  <li>Theme: {{18}}</li>
  <li>Starts at 7:00</li>
</ul>
<h5>Safety and Security:</h5>
<ul>
  <li>Ten {{19}} centres in the park</li>
  <li>Children ask any staff member for help</li>
  <li>Ask security team at the {{20}}</li>
</ul>`,
              answers: {
                "16": ["food stands"],
                "17": ["Main Street", "main st", "Main St."],
                "18": ["Hollywood"],
                "19": ["first-aid", "first aid"],
                "20": ["guard stations"]
              },
              explain: {
                "16": "'if you want hamburgers, sandwiches, that sort of thing, you can find food stands everywhere.' → food stands (Food Court là nơi bán đồ Ý, Trung Quốc).",
                "17": "'The best place to see it is along the main street.' → Main Street",
                "18": "'there's a different theme each year. This year the theme is Hollywood' → Hollywood",
                "19": "'that is one of our ten first-aid centers.' → first-aid",
                "20": "'you can come and talk to a member of our security team at any one of the many guard stations' → guard stations"
              }
            }
          ]
        },

        /* ───────────────────────── SECTION 3 ───────────────────────── */
        {
          id: "BC-L1-S3",
          part: 3,
          title: "Engineering project tutorial – grey-water treatment",
          context: "A conversation between a peer tutor and an engineering student who needs help with a project.",
          audio: "asset:bc-l1/section-3.mp3",
          script: [
            { speaker: "Narrator", voice: "m", text: "You will hear a conversation between a peer tutor and an engineering student who needs help with a project. First you have some time to look at questions 21 to 24. Now listen carefully and answer questions 21 to 24." },
            { speaker: "Lauren", voice: "f", text: "Hi Jon. Thanks for seeing me today. I'm really struggling with my project. I have to come up with a design for a water treatment system ... and I'm really not sure what I'm expected to do." },
            { speaker: "Tutor", voice: "m", text: "Well, as peer tutors we've been taught to follow a process in these tutorials, OK? The first step is to look closely at the task instructions.", q: [21] },
            { speaker: "Lauren", voice: "f", text: "That sounds good ... I'm also ... well ... we've been told to do some research, but I don't know where to start." },
            { speaker: "Tutor", voice: "m", text: "It's always hard to start with. We've got about 45 minutes today ... that should give us some time to go over it ... have you done much research before?" },
            { speaker: "Lauren", voice: "f", text: "No, this is my first project like this, and I'm really stressing out about it. I went to a seminar about research at the start of the year, but I've forgotten most of it." },
            { speaker: "Tutor", voice: "m", text: "Well, that's fine, because the next step in our tutorial will be to consider some common research strategies that you can use to get started. With engineering, a lot of the projects you do are practical, so you can think about how you can access other people's write-ups of similar projects.", q: [22] },
            { speaker: "Lauren", voice: "f", text: "Yes, that sounds useful. How do I find those?" },
            { speaker: "Tutor", voice: "m", text: "Well, there's always the online databases, but you need to know what search terms to use. So, can you think of any useful terms?" },
            { speaker: "Lauren", voice: "f", text: "Umm ... Cameroon, I guess, and maybe grey-water?" },
            { speaker: "Tutor", voice: "m", text: "Yes, good ... but those might not give you many hits. What about the type of research? I've always found it helpful to search for case studies, you know? There's probably a whole lot of those on systems set up for other villages in developing countries that you could look at. I've got a couple here actually – they're on different topics, but we can look at the structure, and develop some useful ways to focus your research. Is there anything else you'd like to look at today?", q: [23] },
            { speaker: "Lauren", voice: "f", text: "Um ... hmm ... I can't think of anything right now. That all sounds good." },
            { speaker: "Tutor", voice: "m", text: "Great – then the next step is to come up with an action plan – how long have you got?", q: [24] },
            { speaker: "Lauren", voice: "f", text: "To finish the project? 4 weeks I think. It's due on the sixth." },
            { speaker: "Narrator", voice: "m", text: "Before you hear the rest of the conversation, you have some time to look at questions 25 to 30. Now listen and answer questions 25 to 30." },
            { speaker: "Tutor", voice: "m", text: "Right, let's start with the project requirements then. You've got them there? – Great. Let's see ... tell me what you understand about the task." },
            { speaker: "Lauren", voice: "f", text: "Um ... so we need to create a system for grey water treatment, so that we can minimize the strain on the overloaded water supply in um ... a village in Cameroon.", q: [25] },
            { speaker: "Tutor", voice: "m", text: "That's right." },
            { speaker: "Lauren", voice: "f", text: "But I don't get the details, about the type of system and what it needs to be used for." },
            { speaker: "Tutor", voice: "m", text: "OK ... we'll come back to the type of system in a minute. It says here grey water – have you learned about grey water?" },
            { speaker: "Lauren", voice: "f", text: "No, I missed the lecture." },
            { speaker: "Tutor", voice: "m", text: "OK, so it's the water we use in our houses, but not in the toilet ... the water that goes down the drains, not into sewage – it can be recycled because it's relatively clean. So what might the water treatment system try to do?", q: [26] },
            { speaker: "Lauren", voice: "f", text: "Treat it and direct it somewhere else?" },
            { speaker: "Tutor", voice: "m", text: "Exactly ... why treat it?" },
            { speaker: "Lauren", voice: "f", text: "'Cause ... oh right – I get it, 'cause it's still going to have bacteria in it, that's why it needs to be treated." },
            { speaker: "Tutor", voice: "m", text: "That's right ... and then, when it's treated, what could it be used for?" },
            { speaker: "Lauren", voice: "f", text: "Something else ... like ... irrigation in gardens?" },
            { speaker: "Tutor", voice: "m", text: "Yes. There are other practical uses too, inside the house." },
            { speaker: "Lauren", voice: "f", text: "For toilet cisterns? Oh ... what about for laundry?", q: [27] },
            { speaker: "Tutor", voice: "m", text: "Yes, exactly. That's a good example.", q: [27] },
            { speaker: "Lauren", voice: "f", text: "OK, that's pretty clear now – thanks." },
            { speaker: "Tutor", voice: "m", text: "Great. Now ... let's think about the type of research you might need to do." },
            { speaker: "Lauren", voice: "f", text: "I'll need to look at different types of water treatment systems – so I know the pros and cons of each one." },
            { speaker: "Tutor", voice: "m", text: "Good. Where would you look first?" },
            { speaker: "Lauren", voice: "f", text: "The internet?" },
            { speaker: "Tutor", voice: "m", text: "Yes, but be careful. Remember you're likely to find a lot of biased websites – you know, manufacturers wanting to advertise their brands. It might be better to use the Engineering library.", q: [28] },
            { speaker: "Lauren", voice: "f", text: "I'm not too confident about using the library, to be honest – it's so hard finding the right resources." },
            { speaker: "Tutor", voice: "m", text: "Hmm – it's often about choosing the best search terms to put into the catalog search field." },
            { speaker: "Lauren", voice: "f", text: "Yeah, I try to do that. Like water treatment?" },
            { speaker: "Tutor", voice: "m", text: "That might be too broad." },
            { speaker: "Lauren", voice: "f", text: "Grey water treatment systems?" },
            { speaker: "Tutor", voice: "m", text: "That's more like it. And you'll need to search for systems designed for residential, not commercial, use. There's a big difference.", q: [29] },
            { speaker: "Lauren", voice: "f", text: "I usually end up borrowing a massive pile of books, then get home and find they're useless." },
            { speaker: "Tutor", voice: "m", text: "Er ... try reading through the contents before you take them out, flick through to relevant sections – often it helps to read parts – not all the way through – but ..." },
            { speaker: "Lauren", voice: "f", text: "Just to get the main idea?" },
            { speaker: "Tutor", voice: "m", text: "That's right. Oh – and I see this is an EWB project – have you seen the website? It might have some exemplars of the winning designs from last year's competition.", q: [30] },
            { speaker: "Lauren", voice: "f", text: "No. I saw that and didn't know what EWB meant." },
            { speaker: "Tutor", voice: "m", text: "Engineering Without Borders is what it stands for." },
            { speaker: "Narrator", voice: "m", text: "That is the end of section 3. You now have half a minute to check your answers. Now turn to section 4." }
          ],
          groups: [
            {
              type: "flow",
              kind: "gap",
              range: [21, 24],
              instruction: "Complete the flowchart below. Write NO MORE THAN TWO WORDS for each answer.",
              wordLimit: "NO MORE THAN TWO WORDS",
              title: "Session outline",
              content:
`<h4>Session outline</h4>
<p><b>Project topic:</b> design a water treatment system</p>
<p><b>Tutorial structure:</b></p>
<ol class="q-flow">
  <li>Step 1: go over {{21}}</li>
  <li>Step 2: think about research {{22}}
    <ul>
      <li>search online databases using good search terms</li>
      <li>consider the kind of research, e.g. {{23}} from other projects</li>
    </ul>
  </li>
  <li>Step 3: develop an {{24}}</li>
</ol>`,
              answers: {
                "21": ["task instructions"],
                "22": ["strategies"],
                "23": ["case studies"],
                "24": ["action plan"]
              },
              explain: {
                "21": "'The first step is to look closely at the task instructions.' → task instructions",
                "22": "'the next step in our tutorial will be to consider some common research strategies' → strategies (sau 'research' trong đề).",
                "23": "'What about the type of research? I've always found it helpful to search for case studies' → case studies (Cameroon, grey-water chỉ là search terms).",
                "24": "'then the next step is to come up with an action plan' → action plan (đề đã có 'an')."
              }
            },
            {
              type: "summary",
              kind: "gap",
              range: [25, 27],
              instruction: "Complete the summary below. Write NO MORE THAN ONE WORD for each answer.",
              wordLimit: "NO MORE THAN ONE WORD",
              title: "Project description",
              content:
`<h5>Project description:</h5>
<p>You need to design a grey-water treatment system to reduce the pressure on the water {{25}} in a Cameroon village.
Grey-water is wastewater from household {{26}}. The system needs to treat this water to remove bacteria, and recycle it
to use for purposes such as watering plants, flushing toilets and doing {{27}}.</p>`,
              answers: {
                "25": ["supply"],
                "26": ["drains"],
                "27": ["laundry"]
              },
              explain: {
                "25": "'minimize the strain on the overloaded water supply in um ... a village in Cameroon' → supply (minimize the strain = reduce the pressure).",
                "26": "'the water that goes down the drains, not into sewage' → drains (không phải toilet – 'but not in the toilet').",
                "27": "'For toilet cisterns? Oh ... what about for laundry?' – 'Yes, exactly.' → laundry (flushing toilets đã có trong đề)."
              }
            },
            {
              type: "note",
              kind: "gap",
              range: [28, 30],
              instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",
              wordLimit: "NO MORE THAN TWO WORDS",
              title: "Research tips",
              content:
`<h5>Research tips</h5>
<p><b>General internet searches:</b></p>
<ul><li>Avoid websites where {{28}} try to sell their products.</li></ul>
<p><b>Engineering library:</b></p>
<ul><li>Use key words when searching the catalogue</li>
<li>e.g. grey-water treatment systems / {{29}} use</li></ul>
<p><b>EWB website:</b></p>
<ul><li>Check examples from the {{30}} last year.</li></ul>`,
              answers: {
                "28": ["manufacturers"],
                "29": ["residential"],
                "30": ["competition"]
              },
              explain: {
                "28": "'a lot of biased websites – you know, manufacturers wanting to advertise their brands' → manufacturers",
                "29": "'search for systems designed for residential, not commercial, use' → residential (commercial bị loại).",
                "30": "'exemplars of the winning designs from last year's competition' → competition"
              }
            }
          ]
        },

        /* ───────────────────────── SECTION 4 ───────────────────────── */
        {
          id: "BC-L1-S4",
          part: 4,
          title: "Lecture – the Caveman diet",
          context: "A talk on the topic of the Caveman diet.",
          audio: "asset:bc-l1/section-4.mp3",
          script: [
            { speaker: "Narrator", voice: "m", text: "You will hear a talk on the topic of the Caveman diet. First you have some time to look at questions 31 to 40. Listen carefully and answer questions 31 to 40." },
            { speaker: "Lecturer", voice: "f", text: "Hello everyone. Do you use the internet? If I asked you, what is the single most common topic for advertisements on the net, I suspect ads for weight loss would win hands down. After all, dieting is one of our current obsessions. We've all heard of the Atkins diet, the macrobiotic plan, the South Beach diet, the raw food eating plan; all of these fad diets and many more promise that you will lose kilos and live a healthy life if you just follow their plan.", q: [31] },
            { speaker: "Lecturer", voice: "f", text: "Today, we're going to discuss one of the most well-known Western diet trends, the Paleo or Caveman diet. Firstly, what is this diet, and where did it come from? Proponents of this diet argue that we need to return to basics; that is, to what our forebears ate many years ago. They say that our bodies are not well suited to digest complex carbohydrates such as grains and legumes. We should be eating a hunter-gatherer diet, rich in lean meat, fish, nuts and berries and without wheat, oats or other grains that came into our diet after the invention of agriculture.", q: [32] },
            { speaker: "Lecturer", voice: "f", text: "Sounds logical, doesn't it? But, let's look a little closer. The first question to ask about the caveman diet is; what did our ancestors actually eat? One way to discover this is to study the diets of existing hunter-gatherer tribes. Although these groups do tend to regard meat as the best source of food, they often have difficulty in finding it. In Africa, for example, over 50% of the time the Bushmen tribes come home empty handed from their hunting expeditions, despite being very skilful with equipment such as bows and arrows. So, what do they eat when they can't get meat? Well, the wives come to the fore then, foraging for and cooking local plants. Most of the groups eat a lot of plants. These range through a huge variety of local species including nuts, plantains and yams, and evidence suggests that this was true of our ancient ancestors as well. Researchers suggest that these people would eat more meat if they could get it, but in fact only approximately a third of their calories comes from this protein and fat rich source.", q: [33, 34] },
            { speaker: "Lecturer", voice: "f", text: "Research shows that, when these groups first come into contact with a Western diet, their health suffers. Once they're exposed to our diet of refined carbohydrates and sugars, they quickly develop our lifestyle-related diseases. However, that does not mean that the human digestive system is suited to digesting only a few sources of food, nor that it cannot change to accommodate different food sources. In fact, the evidence would suggest exactly the opposite; as a species we are able to make significant modifications to our digestive systems according to what foods are available in our local environment.", q: [35] },
            { speaker: "Lecturer", voice: "f", text: "Examples abound, and our ability to digest lactose is a good one. Lactose is a sugar that is found in milk, and it is digested in the human gut by the enzyme lactase. In communities in Europe, the Middle East and Africa that traditionally herd cattle and drink cows' milk, this enzyme is present and people can digest milk products. However, in places such as China and Thailand, which do not have this style of farming, the enzyme is lacking, and most people have lactose intolerance. Another example is the ability to digest the sugars from starchy foods. Communities that eat a lot of these foods have saliva that breaks down starchy foods before they reach the gut, whereas other groups have more difficulty in getting nutrition from high starch sources.", q: [36] },
            { speaker: "Lecturer", voice: "f", text: "In fact, if you look at indigenous cultures around the world, there is a huge variety of successful diets. The Inuit get nearly all of their energy from high fat sources such as seal meat. The Jains in India have religious beliefs which prohibit eating any living thing, including eggs, but which do, however, allow for the consumption of milk products. Other groups eat mostly fish, or have an insect-based diet, depending on locally available sources of protein. So, the idea that our caveman ancestors ate one homogenous diet and that if we follow this we can all be healthy, would seem to be an oversimplification. Diets are the result of complex cultural dietary practices. People can, and will, eat just about anything!", q: [37, 38] },
            { speaker: "Lecturer", voice: "f", text: "So, if we can eat a variety of diets, is there anything actually wrong with following the Caveman diet? Well, firstly, on a practical level, it's an expensive way to get your daily calories. Few of us can afford to satisfy all of our energy requirements on a diet which depends on lean wild meat and nut oils. A few carbohydrates provide a cheap, filling and substantial energy boost for most of us.", q: [39] },
            { speaker: "Lecturer", voice: "f", text: "Secondly, a diet which includes a large proportion of red meat may not be good for our long term health, if our bodies are adapted to a sedentary lifestyle and a plant-based diet. We simply get less exercise than our ancestors did, and so we are more prone to some illnesses than they were. Finally, if we all start to eat a wild meat based diet, this will have negative implications for the environment, because it's not a sustainable way to feed a lot of people.", q: [40] },
            { speaker: "Narrator", voice: "m", text: "That is the end of section 4. You now have half a minute to check your answers. That is the end of the listening test. You now have 10 minutes to transfer your answers to the listening answer sheet." }
          ],
          groups: [
            {
              type: "summary",
              kind: "gap",
              range: [31, 34],
              instruction: "Complete the summary below. Write NO MORE THAN TWO WORDS for each answer.",
              wordLimit: "NO MORE THAN TWO WORDS",
              title: "Origins of the Caveman Diet",
              content:
`<h4>Origins of the Caveman Diet</h4>
<p>There are many popular fad diets nowadays. They all promise good health if you stick to the {{31}}.
The Caveman diet is a popular example. This diet includes foods such as lean meat and fish that our forebears ate
before we developed {{32}}. We need to find out what our ancestors did eat, so researchers are studying some
existing hunter-gatherer tribes. These tribes typically like to eat meat but they can't always get it, even though
they are skilled with their weapons, e.g. {{33}} (write both weapons, separated by a comma). So, instead, they eat foods that their wives gather.
They get only about a {{34}} of their energy from meat.</p>`,
              answers: {
                "31": ["plan"],
                "32": ["agriculture"],
                "33": ["bows, arrows", "arrows, bows", "bows arrows", "arrows bows"],
                "34": ["third", "3rd"]
              },
              explain: {
                "31": "'promise that you will lose kilos and live a healthy life if you just follow their plan' → plan (stick to = follow).",
                "32": "'other grains that came into our diet after the invention of agriculture' → agriculture",
                "33": "Đề gốc có hai chỗ trống '... and ...' cho câu 33 (đáp án chính thức: bows, arrows – thứ tự nào cũng được): 'despite being very skilful with equipment such as bows and arrows' → bows and arrows",
                "34": "'only approximately a third of their calories comes from this protein and fat rich source' → third (a third = một phần ba)."
              }
            },
            {
              type: "mcq",
              kind: "mcq",
              range: [35, 36],
              instruction: "Choose the correct letter, A, B or C.",
              questions: [
                { n: 35, text: "Research evidence suggests that ...", options: ["A the tribesmen's traditional diet is unhealthy", "B our bodies can digest only certain foods", "C we can adapt to a range of diets."], answer: "C",
                  explain: "'as a species we are able to make significant modifications to our digestive systems according to what foods are available' → C. B bị phủ định: 'that does not mean that the human digestive system is suited to digesting only a few sources of food'; A sai vì sức khoẻ chỉ kém đi khi họ tiếp xúc với chế độ ăn phương Tây." },
                { n: 36, text: "Thai people have difficulty digesting milk because ...", options: ["A they have too much lactase in their bodies", "B in the past they didn't farm cows", "C their saliva lacks certain enzymes."], answer: "B",
                  explain: "'in places such as China and Thailand, which do not have this style of farming, the enzyme is lacking' → B (this style of farming = chăn nuôi bò lấy sữa). A ngược lại (thiếu lactase); C nói về nước bọt tiêu hoá tinh bột, không liên quan sữa." }
              ]
            },
            {
              type: "note",
              kind: "gap",
              range: [37, 40],
              instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",
              wordLimit: "NO MORE THAN TWO WORDS",
              title: "Variation in global diets",
              content:
`<h5>Variation in global diets:</h5>
<ul>
  <li>Inuit – most calories from {{37}} foods, e.g. seal meat</li>
  <li>Jains – vegetarian, but milk is permitted</li>
  <li>Others – fish, insects</li>
</ul>
<h5>Implications for the caveman diet:</h5>
<ul>
  <li>Cavemen did not all eat the same diet</li>
  <li>Diets come from complicated cultural {{38}}</li>
</ul>
<h5>Problems with Caveman diet:</h5>
<ul>
  <li>Costs a lot of money for lean meat and {{39}}</li>
  <li>Too much red meat may be unhealthy</li>
  <li>Reliance on meat is bad for the {{40}}</li>
</ul>`,
              answers: {
                "37": ["high fat", "high-fat"],
                "38": ["practices", "dietary practices"],
                "39": ["nut oils"],
                "40": ["environment"]
              },
              explain: {
                "37": "'The Inuit get nearly all of their energy from high fat sources such as seal meat.' → high fat",
                "38": "'Diets are the result of complex cultural dietary practices.' → (dietary) practices (complex = complicated).",
                "39": "'a diet which depends on lean wild meat and nut oils' → nut oils (expensive = costs a lot of money).",
                "40": "'this will have negative implications for the environment' → environment"
              }
            }
          ]
        }
      ]
    }
  ],

  /* ───────────── Official IELTS Listening sample tasks (IELTS.org, 2023 booklet) ─────────────
     Each recording is one clip. Official question numbers are renumbered from 1 (the original
     number is given in every explanation). Where an official task has fewer than 6 questions,
     extra questions are added in a separate group whose instruction says "Extra practice (not part
     of the official task)"; their answers are taken word-for-word from the official tapescript. */
  listeningClips: [
    /* ── Task 1: Form completion (official Part 1, Q1–8) ── */
    {
      id: "BC-ST-01",
      title: "Official sample: Packham's Shipping Agency – form completion",
      source: "IELTS.org — Listening Sample Task: Form Completion (đề, tapescript, đáp án chính thức)",
      sourceUrl: "https://web.archive.org/web/20251224063858/https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf",
      level: "medium", topic: "travel", duration: "2:35",
      audio: "asset:ielts-samples/task-1-form-completion.mp3",
      context: "A telephone conversation between a customer and an agent at a company which ships large boxes overseas.",
      transcript: [
        { speaker: "Agent", text: "Good morning. Packham's Shipping Agents. Can I help you?" },
        { speaker: "Customer", text: "Oh yes, I'm ringing to make enquiries about sending a large box, a container, back home to Kenya from the UK." },
        { speaker: "Agent", text: "Yes, of course. Would you like me to try and find some quotations for you?" },
        { speaker: "Customer", text: "Yes, that'd be great. Thank you." },
        { speaker: "Agent", text: "Well first of all, I need a few details from you." },
        { speaker: "Customer", text: "Fine." },
        { speaker: "Agent", text: "Can I take your name?" },
        { speaker: "Customer", text: "It's Jacob Mkere." },
        { speaker: "Agent", text: "Can you spell your surname, please?" },
        { speaker: "Customer", text: "Yes, it's M-K-E-R-E.", q: [1] },
        { speaker: "Agent", text: "Is that 'M' for mother?" },
        { speaker: "Customer", text: "Yes." },
        { speaker: "Agent", text: "Thank you, and you say that you will be sending the box to Kenya?" },
        { speaker: "Customer", text: "That's right." },
        { speaker: "Agent", text: "And where would you like the box picked up from?" },
        { speaker: "Customer", text: "From college, if possible." },
        { speaker: "Agent", text: "Yes, of course. I'll take down the address now." },
        { speaker: "Customer", text: "It's Westall College." },
        { speaker: "Agent", text: "Is that W-E-S-T-A-L-L?", q: [2] },
        { speaker: "Customer", text: "Yes, ... college." },
        { speaker: "Agent", text: "Westall College. And where's that?" },
        { speaker: "Customer", text: "It's Downlands Road, in Bristol." },
        { speaker: "Agent", text: "Oh yes, I know it. And the postcode?" },
        { speaker: "Customer", text: "It's BS8 9PU.", q: [3] },
        { speaker: "Agent", text: "Right ... and I need to know the size." },
        { speaker: "Customer", text: "Yes, I've measured it carefully and it's 1.5m long ..." },
        { speaker: "Agent", text: "Right." },
        { speaker: "Customer", text: "0.75m wide ...", q: [4] },
        { speaker: "Agent", text: "OK." },
        { speaker: "Customer", text: "And it's 0.5m high or deep.", q: [5] },
        { speaker: "Agent", text: "Great. So I'll calculate the volume in a moment and get some quotes for that. But first can you tell me, you know, very generally, what will be in the box?" },
        { speaker: "Customer", text: "Yes there's mostly clothes." },
        { speaker: "Agent", text: "OK. [writing down]" },
        { speaker: "Customer", text: "And there's some books.", q: [6, 7] },
        { speaker: "Agent", text: "OK. Good. Um ... Anything else?" },
        { speaker: "Customer", text: "Yes, there's also some toys.", q: [6, 7] },
        { speaker: "Agent", text: "OK and what is the total value, do you think, of the contents?" },
        { speaker: "Customer", text: "Well the main costs are the clothes and the books – they'll be about £1500 but then the toys are about another two hundred – so I'd put down £1700.", q: [8] }
      ],
      groups: [
        {
          type: "form",
          kind: "gap",
          range: [1, 8],
          instruction: "Complete the form below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer. (Questions 6 and 7 may be answered in either order.)",
          wordLimit: "NO MORE THAN THREE WORDS AND/OR A NUMBER",
          title: "PACKHAM'S SHIPPING AGENCY – customer quotation form",
          content:
`<h4>PACKHAM'S SHIPPING AGENCY – customer quotation form</h4>
<table class="q-table q-form">
  <tbody>
    <tr><th scope="row">Example: Country of destination</th><td><u>Kenya</u></td></tr>
    <tr><th scope="row">Name</th><td>Jacob {{1}}</td></tr>
    <tr><th scope="row">Address to be collected from</th><td>{{2}} College, Downlands Rd</td></tr>
    <tr><th scope="row">Town</th><td>Bristol</td></tr>
    <tr><th scope="row">Postcode</th><td>{{3}}</td></tr>
    <tr><th scope="row">Size of container</th><td>Length: 1.5m &nbsp;·&nbsp; Width: {{4}} &nbsp;·&nbsp; Height: {{5}}</td></tr>
    <tr><th scope="row">Contents</th><td>clothes, {{6}}, {{7}}</td></tr>
    <tr><th scope="row">Total estimated value</th><td>£{{8}}</td></tr>
  </tbody>
</table>`,
          answers: {
            "1": ["Mkere"],
            "2": ["Westall"],
            "3": ["BS8 9PU", "BS89PU"],
            "4": ["0.75 m", "0.75m", "0.75 metres", "0.75 metre", "0.75 meters", "0.75 meter", "0.75 m wide", "0.75m wide", "75 cm", "75cm", "75 cms", "¾ m"],
            "5": ["0.5 m", "0.5m", "0.5 metres", "0.5 metre", "0.5 meters", "0.5 meter", "0.5 m high", "0.5m high", "0.5 m deep", "half a metre", "half a meter", "50 cm", "50cm", "50 cms", "½ m"],
            "6": ["books", "some books", "toys", "some toys"],
            "7": ["toys", "some toys", "books", "some books"],
            "8": ["1,700", "1700"]
          },
          explain: {
            "1": "Đề gốc câu 1. 'It's Jacob Mkere.' – 'Can you spell your surname, please?' – 'Yes, it's M-K-E-R-E.' → Mkere",
            "2": "Đề gốc câu 2. 'It's Westall College.' – 'Is that W-E-S-T-A-L-L?' – 'Yes' → Westall",
            "3": "Đề gốc câu 3. 'And the postcode?' – 'It's BS8 9PU.' → BS8 9PU",
            "4": "Đề gốc câu 4. '1.5m long ... 0.75m wide' → 0.75 m (đáp án chính thức cũng chấp nhận 75 cm / three-quarters of a metre; phải có đơn vị).",
            "5": "Đề gốc câu 5. 'And it's 0.5m high or deep.' → 0.5 m (hoặc half a metre / 50 cm).",
            "6": "Đề gốc câu 6 & 7 (thứ tự nào cũng được). 'there's mostly clothes' (đã cho) – 'And there's some books.' – 'there's also some toys.' → books / toys",
            "7": "Đề gốc câu 6 & 7 (thứ tự nào cũng được): 'some books' và 'some toys' → điền món còn lại (books / toys).",
            "8": "Đề gốc câu 8. Bẫy: '£1500' chỉ là quần áo + sách; 'the toys are about another two hundred – so I'd put down £1700.' → 1,700"
          }
        }
      ]
    },

    /* ── Task 2: Multiple choice (official Part 1, Q9–10) + extra practice ── */
    {
      id: "BC-ST-02",
      title: "Official sample: shipping insurance and delivery – multiple choice",
      source: "IELTS.org — Listening Sample Task: Multiple Choice (câu 1–2 chính thức; câu 3–6 là câu luyện thêm dựa trên tapescript chính thức)",
      sourceUrl: "https://web.archive.org/web/20251224063858/https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf",
      level: "medium", topic: "travel", duration: "1:04",
      audio: "asset:ielts-samples/task-2-multiple-choice.mp3",
      context: "A customer has been arranging with a shipping agent to send a large box overseas. This is the last part of the conversation.",
      transcript: [
        { speaker: "Agent", text: "OK right. Now obviously insurance is an important thing to consider and our companies are able to offer very good rates in a number of different all-inclusive packages." },
        { speaker: "Customer", text: "Sorry, could you explain a bit more?" },
        { speaker: "Agent", text: "Yes, sorry, um. There's really three rates according to quality of insurance cover – there's the highest comprehensive cover which is Premium rate, then there's Standard rate and then there's Economy rate. That one will only cover the cost of the contents second hand.", q: [1, 3, 4] },
        { speaker: "Customer", text: "Oh I've been stung before with Economy insurance so I'll go for the highest.", q: [1] },
        { speaker: "Agent", text: "Mh'hm and can I just check would you want home delivery or to a local depot or would you want to pick it up at the nearest port?", q: [2] },
        { speaker: "Customer", text: "The port'd be fine – I've got transport that end.", q: [2, 5] },
        { speaker: "Agent", text: "Fine and will you be paying by credit card?" },
        { speaker: "Customer", text: "Can I pay by cheque?", q: [6] }
      ],
      groups: [
        {
          type: "mcq",
          kind: "mcq",
          range: [1, 2],
          instruction: "Choose the correct letter, A, B or C.",
          questions: [
            { n: 1, text: "Type of insurance chosen", options: ["A Economy", "B Standard", "C Premium"], answer: "C",
              explain: "Đề gốc câu 9. 'the highest comprehensive cover which is Premium rate' + 'I've been stung before with Economy insurance so I'll go for the highest.' → C Premium (Economy bị loại)." },
            { n: 2, text: "Customer wants goods delivered to", options: ["A port", "B home", "C depot"], answer: "A",
              explain: "Đề gốc câu 10. Nhân viên nêu cả 3 lựa chọn 'home delivery or to a local depot or ... the nearest port'; khách chốt: 'The port'd be fine' → A port." }
          ]
        },
        {
          type: "sentence",
          kind: "gap",
          range: [3, 6],
          instruction: "Extra practice (not part of the official task): Complete the sentences below. Write NO MORE THAN TWO WORDS for each answer.",
          wordLimit: "NO MORE THAN TWO WORDS",
          content:
`<p>The Premium rate gives the highest {{3}} cover.</p>
<p>Economy insurance only covers the cost of the contents {{4}}.</p>
<p>The customer has got {{5}} at the other end.</p>
<p>The customer asks if he can pay by {{6}}.</p>`,
          answers: {
            "3": ["comprehensive"],
            "4": ["second hand", "second-hand", "secondhand"],
            "5": ["transport"],
            "6": ["cheque", "check"]
          },
          explain: {
            "3": "Câu luyện thêm. 'there's the highest comprehensive cover which is Premium rate' → comprehensive",
            "4": "Câu luyện thêm. 'Economy rate. That one will only cover the cost of the contents second hand.' → second hand",
            "5": "Câu luyện thêm. 'The port'd be fine – I've got transport that end.' → transport",
            "6": "Câu luyện thêm. Nhân viên hỏi 'paying by credit card?' nhưng khách hỏi lại: 'Can I pay by cheque?' → cheque (credit card là bẫy)."
          }
        }
      ]
    },

    /* ── Task 3: Short-answer questions (official Part 2, Q11–16) ── */
    {
      id: "BC-ST-03",
      title: "Official sample: making social contacts in the UK – short answers",
      source: "IELTS.org — Listening Sample Task: Short-answer Questions (đề, tapescript, đáp án chính thức)",
      sourceUrl: "https://web.archive.org/web/20251224063858/https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf",
      level: "medium", topic: "culture", duration: "1:33",
      audio: "asset:ielts-samples/task-3-short-answer.mp3",
      context: "An extract from a talk given to a group who are going to stay in the UK.",
      transcript: [
        { speaker: "John Parker", text: "Good evening, and welcome to the British Council. My name is John Parker and I've been asked to talk to you briefly about certain aspects of life in the UK before you actually go there. So I'm going to talk first about the best ways of making social contacts there. Now you might be wondering why it should be necessary. After all, we meet people all the time." },
        { speaker: "John Parker", text: "But when you're living in a foreign country it can be more difficult, not just because of the language, but because customs may be different.", q: [1, 2] },
        { speaker: "John Parker", text: "If you're going to work in the UK you will probably be living in private accommodation, so it won't be quite so easy to meet people. But there are still things that you can do to help yourself. First of all, you can get involved in activities in your local community, join a group of some kind." },
        { speaker: "John Parker", text: "For example, you'll probably find that there are theatre groups who might be looking for actors, set designers and so on, or if you play an instrument you could join music groups in your area. Or if you like the idea of finding out about local history there'll be a group for that too. These are just examples.", q: [3, 4] },
        { speaker: "John Parker", text: "And the best places to get information about things like this are either the town hall or the public library. Libraries in the UK perform quite a broad range of functions nowadays – they're not just confined to lending books, although that's their main role of course.", q: [5, 6] }
      ],
      groups: [
        {
          type: "short",
          kind: "gap",
          range: [1, 6],
          instruction: "Answer the questions below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer. (Each pair of answers may be written in either order.)",
          wordLimit: "NO MORE THAN THREE WORDS AND/OR A NUMBER",
          content:
`<p><b>What TWO factors can make social contact in a foreign country difficult?</b></p>
<ul><li>{{1}}</li><li>{{2}}</li></ul>
<p><b>Which types of community group does the speaker give examples of?</b></p>
<ul><li>theatre</li><li>{{3}}</li><li>{{4}}</li></ul>
<p><b>In which TWO places can information about community activities be found?</b></p>
<ul><li>{{5}}</li><li>{{6}}</li></ul>`,
          answers: {
            "1": ["language", "customs"],
            "2": ["customs", "language"],
            "3": ["music", "music groups", "local history", "local history groups"],
            "4": ["local history", "local history groups", "music", "music groups"],
            "5": ["library", "public library", "libraries", "town hall"],
            "6": ["town hall", "library", "public library", "libraries"]
          },
          explain: {
            "1": "Đề gốc câu 11 & 12 (thứ tự nào cũng được). 'it can be more difficult, not just because of the language, but because customs may be different.' → language / customs",
            "2": "Đề gốc câu 11 & 12: hai yếu tố là language và customs — điền yếu tố còn lại.",
            "3": "Đề gốc câu 13 & 14 (thứ tự nào cũng được). 'you could join music groups in your area. Or if you like the idea of finding out about local history there'll be a group for that too.' → music (groups) / local history (groups); theatre đã cho sẵn.",
            "4": "Đề gốc câu 13 & 14: music (groups) và local history (groups) — điền nhóm còn lại.",
            "5": "Đề gốc câu 15 & 16 (thứ tự nào cũng được). 'the best places to get information about things like this are either the town hall or the public library.' → (public) library / town hall",
            "6": "Đề gốc câu 15 & 16: town hall và (public) library — điền nơi còn lại."
          }
        }
      ]
    },

    /* ── Task 4: Sentence completion (official Part 3, Q27–30) + extra practice ── */
    {
      id: "BC-ST-04",
      title: "Official sample: studying with the Open University – sentence completion",
      source: "IELTS.org — Listening Sample Task: Sentence Completion (câu 1–4 chính thức; câu 5–7 là câu luyện thêm dựa trên tapescript chính thức)",
      sourceUrl: "https://web.archive.org/web/20251224063858/https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf",
      level: "hard", topic: "education", duration: "1:25",
      audio: "asset:ielts-samples/task-4-sentence-completion.mp3",
      context: "Two friends, Rachel and Paul, are discussing studying with the Open University. Rachel has already done a course at the university, but Paul has not.",
      transcript: [
        { speaker: "Paul", text: "The other thing I wanted to ask you was, did you find it hard, studying with the Open University?" },
        { speaker: "Rachel", text: "You mean, because you're studying on your own, most of the time?" },
        { speaker: "Paul", text: "Mm." },
        { speaker: "Rachel", text: "Well it took me a while to get used to it. I found I needed to maintain a high level of motivation, because it's so different from school. There's no-one saying, 'Why haven't you written your assignment yet?' and that sort of thing.", q: [1] },
        { speaker: "Paul", text: "Oh dear." },
        { speaker: "Rachel", text: "You'll learn it, Paul. Another thing was that I got very good at time-management because I had to fit time for studying round a full-time job.", q: [2, 5] },
        { speaker: "Paul", text: "Well I'm hoping to change to working part-time, so that'll help." },
        { speaker: "Rachel", text: "What makes it easier is that the degree is made up of modules, so you can take time off between them if you need to. It isn't like a traditional three- or four-year course, where you've got to do the whole thing of it in one go.", q: [3] },
        { speaker: "Paul", text: "That's good, because I'd like to spend six months travelling next year.", q: [7] },
        { speaker: "Rachel", text: "Huh, it's all right for some. Then even though you're mostly studying at home, remember you've got tutors to help you, and from time to time there are summer schools. They usually last a week. They're great, because you meet all the other people struggling with the same things as you. I've made some really good friends that way.", q: [4, 6] },
        { speaker: "Paul", text: "Sounds good. So how do I apply?" }
      ],
      groups: [
        {
          type: "sentence",
          kind: "gap",
          range: [1, 4],
          instruction: "Complete the sentences below. Write NO MORE THAN TWO WORDS for each answer.",
          wordLimit: "NO MORE THAN TWO WORDS",
          content:
`<p>Studying with the Open University demanded a great deal of {{1}}.</p>
<p>Studying and working at the same time improved Rachel's {{2}} skills.</p>
<p>It was helpful that the course was structured in {{3}}.</p>
<p>She enjoyed meeting other students at {{4}}.</p>`,
          answers: {
            "1": ["motivation"],
            "2": ["time-management", "time management", "timemanagement"],
            "3": ["modules"],
            "4": ["summer schools", "summer school"]
          },
          explain: {
            "1": "Đề gốc câu 27. 'I found I needed to maintain a high level of motivation' → motivation (a great deal of = a high level of).",
            "2": "Đề gốc câu 28. 'I got very good at time-management because I had to fit time for studying round a full-time job.' → time-management",
            "3": "Đề gốc câu 29. 'What makes it easier is that the degree is made up of modules' → modules (structured in = made up of).",
            "4": "Đề gốc câu 30. 'there are summer schools ... They're great, because you meet all the other people' → summer schools (tutors là bẫy — không phải nơi gặp sinh viên khác)."
          }
        },
        {
          type: "sentence",
          kind: "gap",
          range: [5, 7],
          instruction: "Extra practice (not part of the official task): Complete the sentences below. Write ONE WORD AND/OR A NUMBER for each answer.",
          wordLimit: "ONE WORD AND/OR A NUMBER",
          content:
`<p>Rachel had to fit her studies around a full-time {{5}}.</p>
<p>Summer schools usually last a {{6}}.</p>
<p>Paul would like to spend six months {{7}} next year.</p>`,
          answers: {
            "5": ["job"],
            "6": ["week"],
            "7": ["travelling", "traveling"]
          },
          explain: {
            "5": "Câu luyện thêm. 'I had to fit time for studying round a full-time job.' → job",
            "6": "Câu luyện thêm. 'there are summer schools. They usually last a week.' → week",
            "7": "Câu luyện thêm. 'I'd like to spend six months travelling next year.' → travelling"
          }
        }
      ]
    },

    /* ── Task 5: Matching 1 (official Part 3, Q21–25) + extra practice ── */
    {
      id: "BC-ST-05",
      title: "Official sample: choosing course options – matching",
      source: "IELTS.org — Listening Sample Task: Matching 1 (câu 1–5 chính thức; câu 6–8 là câu luyện thêm dựa trên tapescript chính thức)",
      sourceUrl: "https://web.archive.org/web/20251224063858/https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf",
      level: "hard", topic: "education", duration: "3:04",
      audio: "asset:ielts-samples/task-5-matching-1.mp3",
      context: "A Communication Studies student talking to his tutor about optional courses for the next semester.",
      transcript: [
        { speaker: "Dr Ray", text: "Come in. Oh hello Jack. Have a seat. Right ... you said you wanted to see me to talk about your options next semester?" },
        { speaker: "Jack", text: "That's right. We have to decide by the end of next week. Really, I'd like to do all five options but we have to choose two, don't we.", q: [6] },
        { speaker: "Dr Ray", text: "Yes, but the choice depends on your major to some extent. You're majoring in Communication Studies, aren't you?" },
        { speaker: "Jack", text: "That's right." },
        { speaker: "Dr Ray", text: "So for example the Media Studies Option will cover quite a lot of the same area you did in the core module on mass communications this semester - the development of the media through the last two centuries, in relation to political and social issues.", q: [1] },
        { speaker: "Jack", text: "Mmm. Well that was interesting, but I've decided I'd rather do something completely new. There's a Women's Studies option, isn't there?", q: [1] },
        { speaker: "Dr Ray", text: "Yes, 'Women and Power' – again it has a historical focus, it aims to contextualise women's studies by looking at the legal and social situation in the nineteenth and early twentieth centuries ..." },
        { speaker: "Jack", text: "So it would be useful if I intended to specialise in women's studies ... but I'm not sure I do actually." },
        { speaker: "Dr Ray", text: "Well, it might still be useful to give you an idea of the issues involved. It's taught by Dr Steed.", q: [7] },
        { speaker: "Jack", text: "Oh, really? I'll sign up for that, then. What about the option on Culture and Society?", q: [2] },
        { speaker: "Dr Ray", text: "That addresses the historical debate on the place of culture since the Industrial Revolution in Britain." },
        { speaker: "Jack", text: "So a historical focus again ..." },
        { speaker: "Dr Ray", text: "Do I get the message you're not so keen on history?" },
        { speaker: "Jack", text: "Well, it's just we seem to have done quite a lot this semester ... anyway I'll think about that one.", q: [3] },
        { speaker: "Dr Ray", text: "If you're interested in a course focusing on current issues there's the option on Identity and Popular Culture – that approaches the subject through things like contemporary film, adverts, soap operas and so on." },
        { speaker: "Jack", text: "Oh? That sounds interesting. Can you tell me who runs it?" },
        { speaker: "Dr Ray", text: "Well, it's normally Dr Stevens but he's on sabbatical next semester, so I'm not sure who'll be running it. It should be decided by next week though.", q: [8] },
        { speaker: "Jack", text: "Right, well I might wait until then to decide ... And the last option is Introduction to Cultural Theory, isn't it. I'm quite interested in that too – I was talking to one of the second year students, and she said it was really useful, it made a lot of things fall into place.", q: [4] },
        { speaker: "Dr Ray", text: "Yes, but in fact in your major, you'll have covered a lot of that already in Communications 102, so that might be less useful than some of the others." },
        { speaker: "Jack", text: "Oh, I'll forget about that one, then.", q: [5] },
        { speaker: "Dr Ray", text: "Now while you're here, we could also discuss how you're getting on with your Core Module assignment ..." }
      ],
      groups: [
        {
          type: "matching",
          kind: "match",
          range: [1, 5],
          instruction: "What does Jack tell his tutor about each of the following course options? Write the correct letter, A, B or C, next to questions 1–5. You may choose any letter more than once.",
          options: [
            { key: "A", text: "He'll definitely do it." },
            { key: "B", text: "He may or may not do it." },
            { key: "C", text: "He won't do it." }
          ],
          allowReuse: true,
          questions: [
            { n: 1, text: "Media Studies", answer: "C",
              explain: "Đề gốc câu 21. Môn này trùng nội dung đã học; Jack nói: 'I've decided I'd rather do something completely new.' → C (sẽ không học)." },
            { n: 2, text: "Women and Power", answer: "A",
              explain: "Đề gốc câu 22. Lúc đầu Jack lưỡng lự ('I'm not sure I do actually') nhưng nghe dạy bởi Dr Steed thì chốt: 'Oh, really? I'll sign up for that, then.' → A" },
            { n: 3, text: "Culture and Society", answer: "B",
              explain: "Đề gốc câu 23. 'anyway I'll think about that one.' → B (có thể học, có thể không)." },
            { n: 4, text: "Identity and Popular Culture", answer: "B",
              explain: "Đề gốc câu 24. Chưa biết ai dạy: 'Right, well I might wait until then to decide' → B" },
            { n: 5, text: "Introduction to Cultural Theory", answer: "C",
              explain: "Đề gốc câu 25. Bẫy: Jack 'quite interested' lúc đầu, nhưng sau khi biết đã học trong Communications 102: 'Oh, I'll forget about that one, then.' → C" }
          ]
        },
        {
          type: "sentence",
          kind: "gap",
          range: [6, 8],
          instruction: "Extra practice (not part of the official task): Complete the sentences below. Write ONE WORD AND/OR A NUMBER for each answer.",
          wordLimit: "ONE WORD AND/OR A NUMBER",
          content:
`<p>Students have to choose {{6}} of the five options.</p>
<p>Women and Power is taught by Dr {{7}}.</p>
<p>Identity and Popular Culture is normally run by Dr {{8}}, who is on sabbatical next semester.</p>`,
          answers: {
            "6": ["two", "2"],
            "7": ["Steed"],
            "8": ["Stevens"]
          },
          explain: {
            "6": "Câu luyện thêm. 'I'd like to do all five options but we have to choose two' → two (five là bẫy).",
            "7": "Câu luyện thêm. 'It's taught by Dr Steed.' → Steed",
            "8": "Câu luyện thêm. 'it's normally Dr Stevens but he's on sabbatical next semester' → Stevens (chú ý phân biệt Steed / Stevens)."
          }
        }
      ]
    },

    /* ── Task 6: Matching 2 (official Part 1, Q1–4) + extra practice ── */
    {
      id: "BC-ST-06",
      title: "Official sample: choosing a hotel – matching",
      source: "IELTS.org — Listening Sample Task: Matching 2 (câu 1–4 chính thức; câu 5–8 là câu luyện thêm dựa trên tapescript chính thức)",
      sourceUrl: "https://web.archive.org/web/20251224063858/https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf",
      level: "medium", topic: "travel", duration: "2:21",
      audio: "asset:ielts-samples/task-6-matching-2.mp3",
      context: "A man talking to an official at a tourist information office.",
      transcript: [
        { speaker: "Official", text: "Can I help you?" },
        { speaker: "Man", text: "Yes, I was wanting somewhere to stay for a few days - a four- or five-star hotel. Can you tell me something about the possibilities?" },
        { speaker: "Official", text: "OK, right, well there are five hotels that might interest you. Were you wanting a city centre location, or would you be interested in something a bit further out?" },
        { speaker: "Man", text: "Well, I do have a car so I could go for either." },
        { speaker: "Official", text: "Well, there are two central hotels in the range you're looking for – there's Carlton House and The Imperial, they're both near the main square, but if you've got your own transport you might be interested in the Royal Oak – that's out in the country, about ten kilometres away, very peaceful. Then there's the Bridge hotel and the Majestic – they're both in town but not in the centre, they're out on the airport road.", q: [1, 5] },
        { speaker: "Man", text: "Mmm that might be a bit far out actually. OK, now the other two you mentioned, in the city centre. Can you tell me a bit about them?" },
        { speaker: "Official", text: "Well, they're both excellent hotels. If you want something with a bit of character, Carlton House is quite unusual – it's a very old building that was originally a large private house. It was bought by the Vannis chain and they completely refurbished it – they took their first guests just a few months ago but it's already got an excellent reputation. That's a five-star hotel.", q: [2, 6] },
        { speaker: "Official", text: "Or there's the Imperial, which is a much more modern building. That also has its own gym and it also has internet connection and meetings rooms – it's used for conferences and corporate events as well as private guests. That's five-star as well.", q: [3] },
        { speaker: "Man", text: "Does it have a swimming pool as well as a gym?" },
        { speaker: "Official", text: "No – the Royal Oak has an outdoor pool, which is lovely in the summer, but the only hotel with an indoor pool is the Bridge Hotel. It doesn't have a gym though. The Majestic is planning to build a swimming pool and a fitness centre, but it's not finished yet.", q: [4, 7, 8] },
        { speaker: "Man", text: "I see. Well, I think I'll probably go for one of the city centre hotels." }
      ],
      groups: [
        {
          type: "matching",
          kind: "match",
          range: [1, 4],
          instruction: "Which hotel matches each description? Choose your answers from the box and write the correct letter, A–E, next to questions 1–4.",
          optionsTitle: "Hotels",
          options: [
            { key: "A", text: "The Bridge Hotel" },
            { key: "B", text: "Carlton House" },
            { key: "C", text: "The Imperial" },
            { key: "D", text: "The Majestic" },
            { key: "E", text: "The Royal Oak" }
          ],
          questions: [
            { n: 1, text: "is in a rural area", answer: "E",
              explain: "Đề gốc câu 1. 'the Royal Oak – that's out in the country, about ten kilometres away' → E (out in the country = rural). Bridge và Majestic 'in town but not in the centre'." },
            { n: 2, text: "only opened recently", answer: "B",
              explain: "Đề gốc câu 2. Carlton House là 'a very old building' (bẫy) nhưng 'they took their first guests just a few months ago' → B" },
            { n: 3, text: "offers facilities for business functions", answer: "C",
              explain: "Đề gốc câu 3. The Imperial: 'meetings rooms – it's used for conferences and corporate events' → C" },
            { n: 4, text: "has an indoor swimming pool", answer: "A",
              explain: "Đề gốc câu 4. Royal Oak có hồ ngoài trời (bẫy); 'the only hotel with an indoor pool is the Bridge Hotel' → A. Majestic mới chỉ 'planning to build' hồ bơi." }
          ]
        },
        {
          type: "sentence",
          kind: "gap",
          range: [5, 8],
          instruction: "Extra practice (not part of the official task): Complete the sentences below. Write ONE WORD AND/OR A NUMBER for each answer.",
          wordLimit: "ONE WORD AND/OR A NUMBER",
          content:
`<p>The Royal Oak is about {{5}} kilometres away.</p>
<p>Carlton House was originally a large private {{6}}.</p>
<p>The Bridge Hotel does not have a {{7}}.</p>
<p>The Majestic is planning to build a swimming pool and a fitness {{8}}.</p>`,
          answers: {
            "5": ["ten", "10"],
            "6": ["house"],
            "7": ["gym"],
            "8": ["centre", "center"]
          },
          explain: {
            "5": "Câu luyện thêm. 'that's out in the country, about ten kilometres away' → ten / 10",
            "6": "Câu luyện thêm. 'it's a very old building that was originally a large private house' → house",
            "7": "Câu luyện thêm. 'the only hotel with an indoor pool is the Bridge Hotel. It doesn't have a gym though.' → gym",
            "8": "Câu luyện thêm. 'The Majestic is planning to build a swimming pool and a fitness centre' → centre"
          }
        }
      ]
    },

    /* ── Task 7: Plan labelling (official Part 2, Q11–15) + extra practice ── */
    {
      id: "BC-ST-07",
      title: "Official sample: Town Library – plan labelling",
      source: "IELTS.org — Listening Sample Task: Plan/map/diagram Labelling (câu 1–5 chính thức, sơ đồ vẽ lại theo đề gốc; câu 6–8 là câu luyện thêm dựa trên tapescript chính thức)",
      sourceUrl: "https://web.archive.org/web/20251224063858/https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf",
      level: "medium", topic: "education", duration: "2:55",
      audio: "asset:ielts-samples/task-7-plan-labelling.mp3",
      context: "The librarian of a new town library talking to a group of people who are visiting the library.",
      transcript: [
        { speaker: "Ann (librarian)", text: "OK everyone. So here we are at the entrance to the town library. My name is Ann, and I'm the chief librarian here, and you'll usually find me at the desk just by the main entrance here. So I'd like to tell you a bit about the way the library is organised, and what you'll find where ... and you should all have a plan in front of you." },
        { speaker: "Ann (librarian)", text: "Well, as you see my desk is just on your right as you go in, and opposite this the first room on your left has an excellent collection of reference books and is also a place where people can read or study peacefully.", q: [1] },
        { speaker: "Ann (librarian)", text: "Just beyond the librarian's desk on the right is a room where we have up to date periodicals such as newspapers and magazines and this room also has a photocopier in case you want to copy any of the articles.", q: [2] },
        { speaker: "Ann (librarian)", text: "If you carry straight on you'll come into a large room and this is the main library area. There is fiction in the shelves on the left, and non-fiction materials on your right, and on the shelves on the far wall there is an excellent collection of books relating to local history. We're hoping to add a section on local tourist attractions too, later in the year.", q: [3] },
        { speaker: "Ann (librarian)", text: "Through the far door in the library just past the fiction shelves is a seminar room, and that can be booked for meetings or talks, and next door to that is the children's library, which has a good collection of stories and picture books for the under elevens.", q: [4, 7, 8] },
        { speaker: "Ann (librarian)", text: "Then there's a large room to the right of the library area – that's the multimedia collection, where you can borrow videos and DVDs and so on, and we also have CD-Roms you can borrow to use on your computer at home. It was originally the art collection but that's been moved to another building.", q: [5, 6] },
        { speaker: "Ann (librarian)", text: "And that's about it – oh, there's also the Library Office, on the left of the librarian's desk. OK, now does anyone have any questions?" }
      ],
      groups: [
        {
          type: "map",
          kind: "match",
          range: [1, 5],
          instruction: "Label the plan below. Choose FIVE answers from the box and write the correct letters, A–I, next to questions 1–5.",
          optionsTitle: "Town Library",
          image: [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" role="img" aria-label="Plan of the Town Library" font-family="Nunito, Segoe UI, sans-serif">',
            '<rect x="0" y="0" width="600" height="400" fill="#FFFFFF"/>',
            '<text x="200" y="18" font-size="14" font-weight="700" fill="#1F2A3D" text-anchor="middle">Town Library</text>',
            '<g fill="none" stroke="#1F2A3D" stroke-width="2">',
            '<rect x="30" y="28" width="360" height="322"/>',
            '<line x1="30" y1="108" x2="310" y2="108"/>',
            '<line x1="150" y1="28" x2="150" y2="108"/>',
            '<line x1="310" y1="28" x2="310" y2="350"/>',
            '<line x1="310" y1="188" x2="390" y2="188"/>',
            '<line x1="30" y1="188" x2="125" y2="188"/>',
            '<line x1="165" y1="188" x2="310" y2="188"/>',
            '<line x1="125" y1="188" x2="125" y2="350"/>',
            '<line x1="165" y1="188" x2="165" y2="350"/>',
            '<line x1="165" y1="312" x2="310" y2="312"/>',
            '<line x1="165" y1="330" x2="310" y2="330"/>',
            '</g>',
            '<g font-size="12" fill="#1F2A3D">',
            '<text x="45" y="62">Seminar room</text>',
            '<text x="110" y="160">Library area</text>',
            '<text x="0" y="0" transform="translate(48 172) rotate(-90)">Fiction</text>',
            '<text x="0" y="0" transform="translate(296 118) rotate(90)">Non-fiction</text>',
            '<text x="318" y="270">Library office</text>',
            '<text x="185" y="325">Librarian\'s desk</text>',
            '<text x="120" y="390" font-weight="700">Entrance</text>',
            '</g>',
            '<path d="M145 372 L145 356 M139 362 L145 354 L151 362" stroke="#1F2A3D" stroke-width="2" fill="none"/>',
            '<g font-size="14" font-weight="700" fill="#E9725F">',
            '<text x="40" y="250">11 ______</text>',
            '<text x="175" y="215">12 ______</text>',
            '<text x="90" y="128">13 ______</text>',
            '<text x="165" y="50">14 ______</text>',
            '<text x="318" y="60">15 ______</text>',
            '</g>',
            '<g font-size="11" fill="#555">',
            '<text x="40" y="266">(Q1)</text><text x="175" y="231">(Q2)</text><text x="90" y="144">(Q3)</text><text x="165" y="66">(Q4)</text><text x="318" y="76">(Q5)</text>',
            '</g>',
            '<g font-size="13" fill="#1F2A3D">',
            '<rect x="410" y="40" width="175" height="250" fill="#F6F8FB" stroke="#1F2A3D" stroke-width="1.5"/>',
            '<text x="420" y="64"><tspan font-weight="700">A</tspan> Art collection</text>',
            '<text x="420" y="90"><tspan font-weight="700">B</tspan> Children\'s books</text>',
            '<text x="420" y="116"><tspan font-weight="700">C</tspan> Computers</text>',
            '<text x="420" y="142"><tspan font-weight="700">D</tspan> Local history collection</text>',
            '<text x="420" y="168"><tspan font-weight="700">E</tspan> Meeting room</text>',
            '<text x="420" y="194"><tspan font-weight="700">F</tspan> Multimedia</text>',
            '<text x="420" y="220"><tspan font-weight="700">G</tspan> Periodicals</text>',
            '<text x="420" y="246"><tspan font-weight="700">H</tspan> Reference books</text>',
            '<text x="420" y="272"><tspan font-weight="700">I</tspan> Tourist information</text>',
            '</g>',
            '</svg>'
          ].join(""),
          options: [
            { key: "A", text: "Art collection" },
            { key: "B", text: "Children's books" },
            { key: "C", text: "Computers" },
            { key: "D", text: "Local history collection" },
            { key: "E", text: "Meeting room" },
            { key: "F", text: "Multimedia" },
            { key: "G", text: "Periodicals" },
            { key: "H", text: "Reference books" },
            { key: "I", text: "Tourist information" }
          ],
          questions: [
            { n: 1, text: "Room marked 11 (first room on the left of the entrance)", answer: "H",
              explain: "Đề gốc câu 11. 'opposite this the first room on your left has an excellent collection of reference books' → H" },
            { n: 2, text: "Room marked 12 (beyond the librarian's desk)", answer: "G",
              explain: "Đề gốc câu 12. 'Just beyond the librarian's desk on the right is a room where we have up to date periodicals' → G" },
            { n: 3, text: "Shelves marked 13 (far wall of the library area)", answer: "D",
              explain: "Đề gốc câu 13. 'on the shelves on the far wall there is an excellent collection of books relating to local history' → D. Bẫy I: tourist attractions mới chỉ là dự định 'later in the year'." },
            { n: 4, text: "Room marked 14 (next to the seminar room)", answer: "B",
              explain: "Đề gốc câu 14. 'a seminar room ... and next door to that is the children's library' → B. Bẫy E: seminar room 'can be booked for meetings' nhưng nó đã có tên trên sơ đồ." },
            { n: 5, text: "Room marked 15 (to the right of the library area)", answer: "F",
              explain: "Đề gốc câu 15. 'a large room to the right of the library area – that's the multimedia collection' → F. Bẫy A: 'It was originally the art collection but that's been moved'; C: computer là máy ở nhà người mượn." }
          ]
        },
        {
          type: "sentence",
          kind: "gap",
          range: [6, 8],
          instruction: "Extra practice (not part of the official task): Complete the sentences below. Write ONE WORD for each answer.",
          wordLimit: "ONE WORD",
          content:
`<p>The art collection has been moved to another {{6}}.</p>
<p>The seminar room can be booked for meetings or {{7}}.</p>
<p>The children's library has stories and picture books for the under {{8}}.</p>`,
          answers: {
            "6": ["building"],
            "7": ["talks"],
            "8": ["elevens", "11s", "11"]
          },
          explain: {
            "6": "Câu luyện thêm. 'It was originally the art collection but that's been moved to another building.' → building",
            "7": "Câu luyện thêm. 'a seminar room, and that can be booked for meetings or talks' → talks",
            "8": "Câu luyện thêm. 'a good collection of stories and picture books for the under elevens' → elevens"
          }
        }
      ]
    },

    /* ── Task 8: Note/table completion (official Part 2, Q11–20) ── */
    {
      id: "BC-ST-08",
      title: "Official sample: The National Arts Centre – note and table completion",
      source: "IELTS.org — Listening Sample Task: Note Completion (đề, tapescript, đáp án chính thức)",
      sourceUrl: "https://web.archive.org/web/20251224063858/https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf",
      level: "medium", topic: "culture", duration: "5:47",
      audio: "asset:ielts-samples/task-8-note-completion.mp3",
      context: "A man talking on the radio about a National Arts Centre.",
      transcript: [
        { speaker: "Dave Green", text: "Hello, and welcome to \"Focus on the Arts\". I'm your host - Dave Green - and this is your very own local radio programme. Every Friday evening we put the spotlight on different arts and culture facilities, and look at the shows and events that are on offer in the coming week." },
        { speaker: "Dave Green", text: "And today the focus is on The National Arts Centre. Now, if you don't already know it yourself, I'm sure you've all heard of it. It's famous throughout the world as one of the major venues for classical music.", q: [1] },
        { speaker: "Dave Green", text: "But did you know that it's actually much more than just a place to hear concerts? The Centre itself is a huge complex that caters for a great range of arts. Under a single roof it houses concert rooms, theatres, cinemas, art galleries and a wonderful public library, as well as service facilities including 3 restaurants and a book shop. So, at any one time, the choice of entertainment there is simply enormous.", q: [2] },
        { speaker: "Dave Green", text: "So, how did they manage to build such a big arts complex right in the heart of the city? Well, the area was completely destroyed by bombs during the war in 1940. So, the opportunity was taken to create a cultural centre that would be, what they called: 'the City's gift to the Nation'. Of course, it took a while for such a big project to get started, but it was planned in the 60s, built in the 70s and eventually opened to the public in 1983. Ever since then it has proved to be a great success.", q: [3, 4] },
        { speaker: "Dave Green", text: "It's not privately owned, like many arts centres, but is still in public hands: - it's run by the City Council. Both our National Symphony Orchestra and National Theatre Company were involved in the planning of the project, and they are now based there - giving regular performances every week - and as the Centre is open 363 days of the year, there are plenty of performances to choose from.", q: [5, 6] },
        { speaker: "Dave Green", text: "So, to give you some idea of what's on, and to help you choose from the many possibilities, we've made a selection of the star attractions." },
        { speaker: "Dave Green", text: "If you're interested in classical music, then we recommend you go along to the National on either Monday or Tuesday evening at 7.30 for a spectacular production of 'The Magic Flute' - probably the most popular of all Mozart's operas. It's in the Garden Hall and tickets start at only £8.00, but you'll have to be early if you want to get them that cheap! And remember, it's only on for those two evenings.", q: [7] },
        { speaker: "Dave Green", text: "For those more interested in the cinema, you might like to see the new Canadian film which is showing on Wednesday evening at 8pm in Cinema 2. And that's called 'Three Lives.' It's had fantastic reviews and tickets cost just £4.50, which is a reduction on the usual price of £5.50. So it's really good value, especially for such a great movie.", q: [8, 9] },
        { speaker: "Dave Green", text: "But you can see the centre's main attraction at the weekend, because on Saturday and Sunday, 11am to 10pm, they're showing a wonderful new exhibition that hasn't been seen anywhere else in Europe yet. It's a collection of Chinese Art called 'Faces of China' - that's in Gallery 1 - and it has some really fascinating paintings and sculptures by leading artists from all over China - and the good news is that it's completely free, so don't miss it!", q: [10] },
        { speaker: "Dave Green", text: "So, why not go along to the National Arts Centre next week for one - or all - of these great events - and you can always pick up a programme and check out all the other performances and exhibitions on offer, or coming soon, on almost every day of the year." },
        { speaker: "Dave Green", text: "Next week we'll be looking at the new Museum of Science ..." }
      ],
      groups: [
        {
          type: "note",
          kind: "gap",
          range: [1, 6],
          instruction: "Complete the notes below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.",
          wordLimit: "NO MORE THAN THREE WORDS AND/OR A NUMBER",
          title: "The National Arts Centre",
          content:
`<h4>THE NATIONAL ARTS CENTRE</h4>
<table class="q-table q-form">
  <tbody>
    <tr><th scope="row">Well known for</th><td>{{1}}</td></tr>
    <tr><th scope="row">Complex consists of</th><td>concert rooms, theatres, cinemas, art galleries, public library, restaurants, {{2}}</td></tr>
    <tr><th scope="row">Historical background</th><td>1940 – area destroyed by bombs<br>1960s – Centre was {{3}}<br>In {{4}} – opened to public</td></tr>
    <tr><th scope="row">Managed by</th><td>{{5}}</td></tr>
    <tr><th scope="row">Open</th><td>{{6}} days per year</td></tr>
  </tbody>
</table>`,
          answers: {
            "1": ["classical music", "classical music concerts", "classical concerts", "music concerts", "concerts"],
            "2": ["bookshop", "a bookshop", "bookstore", "a bookstore", "book shop", "a book shop"],
            "3": ["planned"],
            "4": ["1983", "the 1980s", "1980s"],
            "5": ["City Council", "the City Council"],
            "6": ["363"]
          },
          explain: {
            "1": "Đề gốc câu 11. 'It's famous throughout the world as one of the major venues for classical music.' → classical music (concerts)",
            "2": "Đề gốc câu 12. 'including 3 restaurants and a book shop' → bookshop (restaurants đã có sẵn).",
            "3": "Đề gốc câu 13. 'it was planned in the 60s, built in the 70s' → planned (built là thập niên 70 – bẫy).",
            "4": "Đề gốc câu 14. 'eventually opened to the public in 1983' → 1983 (1940 là năm bị bom phá).",
            "5": "Đề gốc câu 15. 'It's not privately owned ... it's run by the City Council.' → (the) City Council",
            "6": "Đề gốc câu 16. 'as the Centre is open 363 days of the year' → 363"
          }
        },
        {
          type: "table",
          kind: "gap",
          range: [7, 10],
          instruction: "Complete the table below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.",
          wordLimit: "NO MORE THAN THREE WORDS AND/OR A NUMBER",
          content:
`<table class="q-table">
  <thead><tr><th>Day</th><th>Time</th><th>Event</th><th>Venue</th><th>Ticket price</th></tr></thead>
  <tbody>
    <tr><td>Monday and Tuesday</td><td>7.30 p.m.</td><td>'The Magic Flute' (opera by Mozart)</td><td>{{7}}</td><td>from £8.00</td></tr>
    <tr><td>Wednesday</td><td>8.00 p.m.</td><td>'{{8}}' (Canadian film)</td><td>Cinema 2</td><td>{{9}}</td></tr>
    <tr><td>Saturday and Sunday</td><td>11 a.m. to 10 p.m.</td><td>'{{10}}' (art exhibition)</td><td>Gallery 1</td><td>free</td></tr>
  </tbody>
</table>`,
          answers: {
            "7": ["Garden Hall", "the Garden Hall"],
            "8": ["Three Lives"],
            "9": ["£4.50", "4.50"],
            "10": ["Faces of China"]
          },
          explain: {
            "7": "Đề gốc câu 17. 'It's in the Garden Hall and tickets start at only £8.00' → (the) Garden Hall",
            "8": "Đề gốc câu 18. 'the new Canadian film ... And that's called 'Three Lives.'' → Three Lives",
            "9": "Đề gốc câu 19. 'tickets cost just £4.50, which is a reduction on the usual price of £5.50' → £4.50 (£5.50 là giá thường – bẫy).",
            "10": "Đề gốc câu 20. 'a collection of Chinese Art called 'Faces of China' - that's in Gallery 1' → Faces of China"
          }
        }
      ]
    }
  ]
});
