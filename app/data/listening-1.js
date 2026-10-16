/* listening-1.js (LD1) — original IELTS Academic Listening practice test (not a real exam).
   Schema: SPEC.md §6.1 / §6.3. Data only — pushes one test into IELTS.data.listeningTests. */
(function () {
  "use strict";

  var MAP_SVG = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" role="img" aria-label="Map of Brackwood Country Park" font-family="Nunito, Segoe UI, sans-serif">',
    '<rect x="0" y="0" width="600" height="400" rx="14" fill="#EEF5E6"/>',
    '<rect x="1" y="1" width="598" height="398" rx="14" fill="none" stroke="#C9D6BC" stroke-width="2"/>',
    // woodland (top left)
    '<path d="M40 30 H262 V195 H40 Z" fill="#CFE3C0" stroke="#A9C79A" stroke-width="1.5" stroke-dasharray="5 4"/>',
    '<g fill="#8DBB7A">',
    '<circle cx="70" cy="60" r="11"/><circle cx="105" cy="75" r="9"/><circle cx="145" cy="55" r="12"/><circle cx="190" cy="70" r="10"/>',
    '<circle cx="230" cy="52" r="9"/><circle cx="65" cy="120" r="10"/><circle cx="160" cy="115" r="9"/><circle cx="215" cy="125" r="11"/>',
    '<circle cx="60" cy="165" r="8"/><circle cx="185" cy="165" r="8"/>',
    '</g>',
    '<text x="120" y="148" font-size="15" font-weight="700" fill="#4E7A3F">WOODLAND</text>',
    // lake (top right)
    '<ellipse cx="450" cy="110" rx="95" ry="60" fill="#BFE0F2" stroke="#8DC3E0" stroke-width="2"/>',
    '<text x="428" y="115" font-size="16" font-weight="700" fill="#2F6F95">LAKE</text>',
    // car park (bottom left)
    '<rect x="40" y="305" width="150" height="70" rx="8" fill="#E4E4E4" stroke="#BDBDBD"/>',
    '<text x="72" y="345" font-size="14" font-weight="700" fill="#666">CAR PARK</text>',
    // paths
    '<rect x="290" y="35" width="20" height="342" fill="#E9DCC3"/>',
    '<rect x="40" y="210" width="522" height="20" fill="#E9DCC3"/>',
    '<text x="0" y="0" font-size="13" font-weight="700" fill="#7A6340" transform="translate(323 325) rotate(-90)">Oak Drive</text>',
    '<text x="395" y="245" font-size="13" font-weight="700" fill="#7A6340">Mill Lane</text>',
    '<text x="140" y="245" font-size="13" font-weight="700" fill="#7A6340">Mill Lane</text>',
    // entrance / you are here
    '<rect x="270" y="372" width="60" height="10" fill="#7A6340"/>',
    '<circle cx="300" cy="360" r="7" fill="#E9725F"/>',
    '<text x="214" y="396" font-size="12" font-weight="700" fill="#B9473A">ENTRANCE – You are here</text>',
    // north arrow
    '<g transform="translate(565 340)"><path d="M0 -24 L8 0 L0 -6 L-8 0 Z" fill="#1F2A3D"/><text x="-5" y="16" font-size="13" font-weight="700" fill="#1F2A3D">N</text></g>',
    // letters A–H
    '<g font-size="14" font-weight="700" fill="#1F2A3D" text-anchor="middle">',
    '<circle cx="250" cy="300" r="13" fill="#fff" stroke="#1F2A3D" stroke-width="2"/><text x="250" y="305">A</text>',
    '<circle cx="350" cy="300" r="13" fill="#fff" stroke="#1F2A3D" stroke-width="2"/><text x="350" y="305">B</text>',
    '<circle cx="90" cy="262" r="13" fill="#fff" stroke="#1F2A3D" stroke-width="2"/><text x="90" y="267">C</text>',
    '<circle cx="90" cy="180" r="13" fill="#fff" stroke="#1F2A3D" stroke-width="2"/><text x="90" y="185">D</text>',
    '<circle cx="270" cy="172" r="13" fill="#fff" stroke="#1F2A3D" stroke-width="2"/><text x="270" y="177">E</text>',
    '<circle cx="338" cy="110" r="13" fill="#fff" stroke="#1F2A3D" stroke-width="2"/><text x="338" y="115">F</text>',
    '<circle cx="562" cy="110" r="13" fill="#fff" stroke="#1F2A3D" stroke-width="2"/><text x="562" y="115">G</text>',
    '<circle cx="520" cy="262" r="13" fill="#fff" stroke="#1F2A3D" stroke-width="2"/><text x="520" y="267">H</text>',
    '</g>',
    '</svg>'
  ].join("");

  var test = {
    id: "L1",
    title: "Practice Test 1",
    source: "Biên soạn cho luyện tập (không phải đề thi thật)",
    sections: [
      /* ───────────────────────── PART 1 ───────────────────────── */
      {
        id: "L1-S1",
        part: 1,
        title: "Seaview Holiday Cottages – booking enquiry",
        context: "A woman phones a holiday cottage agency to ask about renting a cottage for a family holiday.",
        audio: null,
        script: [
          { speaker: "Agent", voice: "m", text: "Good morning, Seaview Holiday Cottages, Daniel speaking. How can I help?" },
          { speaker: "Caller", voice: "f", text: "Oh, hello. Um, I'm ringing because I'd like to book a cottage for a family holiday this summer. I've had a look at your website, but I had a few questions first." },
          { speaker: "Agent", voice: "m", text: "Of course. Let me just open a booking enquiry form for you, and then we can see what's available. Could I start with your name?" },
          { speaker: "Caller", voice: "f", text: "Yes, it's Sarah Thornbury." },
          { speaker: "Agent", voice: "m", text: "Is that T-H-O-R-N-B-E-R-R-Y?" },
          { speaker: "Caller", voice: "f", text: "No, it's B-U-R-Y at the end. So that's T-H-O-R-N-B-U-R-Y.", q: [1] },
          { speaker: "Agent", voice: "m", text: "Thornbury. Got it, thank you. And your address, Mrs Thornbury?" },
          { speaker: "Caller", voice: "f", text: "It's 14 Mardale Road – that's M-A-R-D-A-L-E – in Bristol.", q: [2] },
          { speaker: "Agent", voice: "m", text: "Lovely. And what's the best number to contact you on?" },
          { speaker: "Caller", voice: "f", text: "My mobile is probably best. It's 0-7-9-4-6, 3-8-1-2-3-5... oh no, sorry, I always get that wrong. The end is 2-2-5, not 2-3-5. So it's 0-7-9-4-6, 3-8-1-2-2-5.", q: [3] },
          { speaker: "Agent", voice: "m", text: "Right, I'll just read that back to you: 0-7-9-4-6, 3-8-1-2-2-5." },
          { speaker: "Caller", voice: "f", text: "Yes, that's it." },
          { speaker: "Agent", voice: "m", text: "Now, how many people will be staying?" },
          { speaker: "Caller", voice: "f", text: "Well, there'll be two adults, my husband and me, and then the children. We were going to bring my niece as well, which would have made four children, but she can't come now, so it's just our three.", q: [4] },
          { speaker: "Agent", voice: "m", text: "So, two adults and three children. And when were you hoping to arrive?" },
          { speaker: "Caller", voice: "f", text: "We were thinking of Saturday the 21st of July... although, hang on, my husband doesn't finish work until the Monday. So the 23rd would be better. Yes, let's say the 23rd.", q: [5] },
          { speaker: "Agent", voice: "m", text: "Monday the 23rd of July, and is that for one week?" },
          { speaker: "Caller", voice: "f", text: "Yes, seven nights." },
          { speaker: "Agent", voice: "m", text: "OK. And is there anything in particular you need the cottage to have?" },
          { speaker: "Caller", voice: "f", text: "Well, we're all quite keen cyclists, so we'll be bringing our bicycles with us. We'd need somewhere secure to store them – a garage or a shed, perhaps.", q: [6] },
          { speaker: "Agent", voice: "m", text: "That's no problem at all – most of our properties have a lockable shed. I'll make a note of that. Now, there are three cottages that are free that week and that would sleep five. Shall I tell you a bit about each one?" },
          { speaker: "Caller", voice: "f", text: "Yes, please." },
          { speaker: "Agent", voice: "m", text: "The first one is called The Old Mill. It sleeps six, and it's in a lovely quiet spot just outside the village." },
          { speaker: "Caller", voice: "f", text: "And how much is that one?" },
          { speaker: "Agent", voice: "m", text: "Let me see... in high season it's normally £680 a week, but we've got a special offer running for July at the moment, so for you it would be £640.", q: [7] },
          { speaker: "Caller", voice: "f", text: "Oh, that's good. And what's it like?" },
          { speaker: "Agent", voice: "m", text: "It's very peaceful. It doesn't have a sea view, I'm afraid, despite our name, but from the garden there's a fantastic view of the castle. It's lit up at night, which children usually love.", q: [8] },
          { speaker: "Caller", voice: "f", text: "That sounds nice. What's the second one?" },
          { speaker: "Agent", voice: "m", text: "That's Willow Barn. It's a little bigger – it sleeps seven – and it's £720 for the week." },
          { speaker: "Caller", voice: "f", text: "Does that one have a swimming pool? The kids keep asking about one." },
          { speaker: "Agent", voice: "m", text: "I'm afraid none of our cottages has a pool. But Willow Barn does have its own sauna, which is a nice treat after a long day of cycling.", q: [9] },
          { speaker: "Caller", voice: "f", text: "Hmm, I'm not sure the children would appreciate that as much as we would! And the third one?" },
          { speaker: "Agent", voice: "m", text: "The third is Heron Lodge, which sleeps eight. It's the most expensive at £810, but the location is excellent. It's right in the town, close to the harbour, so you can walk to the restaurants and watch the fishing boats come in.", q: [10] },
          { speaker: "Caller", voice: "f", text: "Right. Well, that's really useful. I'll talk it over with my husband tonight and call you back tomorrow, if that's OK." },
          { speaker: "Agent", voice: "m", text: "Of course. I'll keep the enquiry open under your name. Thanks for calling, Mrs Thornbury." },
          { speaker: "Caller", voice: "f", text: "Thank you. Bye." }
        ],
        groups: [
          {
            type: "form",
            kind: "gap",
            range: [1, 6],
            instruction: "Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.",
            wordLimit: "ONE WORD AND/OR A NUMBER",
            title: "Seaview Holiday Cottages – Booking Enquiry",
            content:
              `<h4>Seaview Holiday Cottages</h4>
<h5>BOOKING ENQUIRY</h5>
<table class="q-table q-form">
  <tbody>
    <tr><th scope="row">Example: Agent's name</th><td><u>Daniel</u></td></tr>
    <tr><th scope="row">Customer name</th><td>Sarah {{1}}</td></tr>
    <tr><th scope="row">Address</th><td>14 {{2}} Road, Bristol</td></tr>
    <tr><th scope="row">Mobile number</th><td>{{3}}</td></tr>
    <tr><th scope="row">Number of people</th><td>2 adults and {{4}} children</td></tr>
    <tr><th scope="row">Arrival date</th><td>Monday {{5}} July</td></tr>
    <tr><th scope="row">Length of stay</th><td>7 nights</td></tr>
    <tr><th scope="row">Special requirement</th><td>secure storage for {{6}}</td></tr>
  </tbody>
</table>`,
            answers: {
              "1": ["Thornbury"],
              "2": ["Mardale"],
              "3": ["07946381225", "07946 381225", "07946 381 225"],
              "4": ["3", "three"],
              "5": ["23", "23rd", "twenty-third"],
              "6": ["bicycles", "bikes", "bicycle", "bike"]
            },
            explain: {
              "1": "Nhân viên đánh vần sai 'T-H-O-R-N-B-E-R-R-Y' (bẫy), người gọi sửa lại: 'No, it's B-U-R-Y at the end. So that's T-H-O-R-N-B-U-R-Y.' → Thornbury",
              "2": "Người gọi nói và đánh vần tên đường: 'It's 14 Mardale Road – that's M-A-R-D-A-L-E – in Bristol.' → Mardale (số 14 và 'Road' đã có sẵn trong form).",
              "3": "Lần đầu đọc '...2-3-5' (bẫy) rồi tự sửa: 'The end is 2-2-5, not 2-3-5. So it's 0-7-9-4-6, 3-8-1-2-2-5.' → 07946 381225",
              "4": "Bẫy: 'which would have made four children, but she can't come now, so it's just our three.' → 3 (không phải 4).",
              "5": "Ban đầu nói 'Saturday the 21st of July' nhưng sửa lại: 'So the 23rd would be better. Yes, let's say the 23rd.' → 23",
              "6": "'we'll be bringing our bicycles with us. We'd need somewhere secure to store them' → bicycles (garage/shed chỉ là nơi cất, không phải thứ cần cất)."
            }
          },
          {
            type: "table",
            kind: "gap",
            range: [7, 10],
            instruction: "Complete the table below. Write ONE WORD AND/OR A NUMBER for each answer.",
            wordLimit: "ONE WORD AND/OR A NUMBER",
            title: "Available cottages",
            content:
              `<table class="q-table">
  <thead>
    <tr><th>Cottage</th><th>Sleeps</th><th>Price per week</th><th>Special feature</th></tr>
  </thead>
  <tbody>
    <tr><td>The Old Mill</td><td>6</td><td>£{{7}}</td><td>view of the {{8}}</td></tr>
    <tr><td>Willow Barn</td><td>7</td><td>£720</td><td>has its own {{9}}</td></tr>
    <tr><td>Heron Lodge</td><td>8</td><td>£810</td><td>close to the {{10}}</td></tr>
  </tbody>
</table>`,
            answers: {
              "7": ["640", "£640"],
              "8": ["castle"],
              "9": ["sauna"],
              "10": ["harbour", "harbor"]
            },
            explain: {
              "7": "Bẫy giá: 'normally £680 a week' là giá thường; giá thực tế nhờ ưu đãi tháng 7: '...so for you it would be £640.' → 640",
              "8": "'It doesn't have a sea view, I'm afraid ... but from the garden there's a fantastic view of the castle.' → castle (không phải sea).",
              "9": "Người gọi hỏi về swimming pool nhưng bị bác bỏ: 'none of our cottages has a pool. But Willow Barn does have its own sauna' → sauna",
              "10": "'It's right in the town, close to the harbour' → harbour (restaurants chỉ là nơi có thể đi bộ tới, không điền vào sau 'close to the')."
            }
          }
        ]
      },

      /* ───────────────────────── PART 2 ───────────────────────── */
      {
        id: "L1-S2",
        part: 2,
        title: "Brackwood Country Park – visitor information",
        context: "A park ranger gives information to a group of visitors at the start of their visit.",
        audio: null,
        script: [
          { speaker: "Park ranger", voice: "m", text: "Good morning, everyone, and welcome to Brackwood Country Park. My name's Tom, and I'm one of the rangers here. Before you head off to explore, I'd like to give you a bit of information about the park and what's happening this summer, and then I'll show you on the map where everything is." },
          { speaker: "Park ranger", voice: "m", text: "So, first of all, the visitor centre, where we're standing now. Some of you may have read in the local paper that we'd be opening an hour earlier this summer. Unfortunately, that plan has been put on hold because we haven't been able to recruit enough staff, so we still open at nine. And I should mention that if you're interested in the boat trips on the lake, tickets for those aren't sold here – you get them from the boathouse itself." },
          { speaker: "Park ranger", voice: "m", text: "What is new, though, and I'd really recommend it, is the exhibition upstairs. It's all about the wildlife you can find here in the park, from otters to dragonflies, and it only opened last month.", q: [11] },
          { speaker: "Park ranger", voice: "m", text: "Now, a few requests from us. Dogs are very welcome in the park, and you don't need to keep them on a lead everywhere – only around the lake, where there are nesting birds. And in the woodland you're free to leave the paths and wander wherever you like." },
          { speaker: "Park ranger", voice: "m", text: "But the one thing we really do ask is this: please take all your litter home with you. We've removed most of the bins because they were attracting rats, so there's nowhere to leave rubbish.", q: [12] },
          { speaker: "Park ranger", voice: "m", text: "A lot of you have asked about our guided walks. There's one every Saturday. The old leaflet says it meets by the lake, but in fact it now starts here at the visitor centre at ten o'clock. People sometimes expect a gentle stroll of an hour or so, but it's actually quite a long walk – it lasts three hours, including a stop for a drink.", q: [13] },
          { speaker: "Park ranger", voice: "m", text: "And because the paths are narrow in places, we limit the size of the group. We used to take up to twenty people, but that was really too many, so the maximum is now fifteen.", q: [14] },
          { speaker: "Park ranger", voice: "m", text: "Right, let's have a look at the map. We're here at the entrance, at the bottom of the map, and the main path, Oak Drive, goes straight up the middle of the park from here. Almost immediately on your left you'll see the gift shop." },
          { speaker: "Park ranger", voice: "m", text: "And opposite that, the first building on your right-hand side, before you get to the crossroads, is the café. It does excellent homemade soup, by the way.", q: [15] },
          { speaker: "Park ranger", voice: "m", text: "If you carry on up Oak Drive, you come to a crossroads, where it meets Mill Lane. If you've got children with you, turn left here and go right along to the far end of Mill Lane. The adventure playground is on the left-hand side, just before the lane ends.", q: [16] },
          { speaker: "Park ranger", voice: "m", text: "And directly opposite the playground, on the other side of the lane, at the edge of the woodland, is the picnic area – so parents can keep an eye on the children while they eat.", q: [17] },
          { speaker: "Park ranger", voice: "m", text: "Now, the lake. That's the large area at the top right of the map. A lot of people assume the bird hide is on the near shore, close to Oak Drive, but that building is actually the boathouse." },
          { speaker: "Park ranger", voice: "m", text: "The bird hide is on the far side of the lake, on the eastern shore, where it's much quieter.", q: [18] },
          { speaker: "Park ranger", voice: "m", text: "If you'd like to hire a bike, go back to the crossroads and this time turn right along Mill Lane. Keep going all the way to the end, and the bike hire shop is there on your right-hand side, at the very end of the lane.", q: [19] },
          { speaker: "Park ranger", voice: "m", text: "And finally, the start of the woodland trail. Go straight over the crossroads and continue north along Oak Drive. Just where the woodland begins, on your left, right beside the path, you'll see a wooden signpost – that's where the woodland trail starts. It's about two kilometres long and very well marked.", q: [20] },
          { speaker: "Park ranger", voice: "m", text: "OK, I think that's everything. Enjoy your day, and if you have any questions at all, just ask at the desk." }
        ],
        groups: [
          {
            type: "mcq",
            kind: "mcq",
            range: [11, 12],
            instruction: "Choose the correct letter, A, B or C.",
            questions: [
              {
                n: 11,
                text: "What is new at the visitor centre this summer?",
                options: ["A It opens an hour earlier.", "B It has an exhibition about local wildlife.", "C It sells tickets for boat trips."],
                answer: "B",
                explain: "A bị loại: 'that plan has been put on hold ... we still open at nine'. C bị loại: vé thuyền 'aren't sold here – you get them from the boathouse'. Đáp án: 'What is new, though ... is the exhibition upstairs. It's all about the wildlife you can find here in the park' → B"
              },
              {
                n: 12,
                text: "What are visitors asked to do?",
                options: ["A keep dogs on a lead at all times", "B stay on the paths in the woodland", "C take their litter home"],
                answer: "C",
                explain: "A sai: chó chỉ cần dắt dây 'only around the lake'. B sai: 'in the woodland you're free to leave the paths'. Đáp án: 'the one thing we really do ask is this: please take all your litter home with you' → C"
              }
            ]
          },
          {
            type: "short",
            kind: "gap",
            range: [13, 14],
            instruction: "Answer the questions below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
            wordLimit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            title: "Saturday guided walk",
            content:
              `<ol class="q-short" start="13">
  <li>How long does the Saturday guided walk last? {{13}}</li>
  <li>What is the maximum number of people on each guided walk? {{14}}</li>
</ol>`,
            answers: {
              "13": ["three hours", "3 hours", "3 hrs", "three hrs"],
              "14": ["15", "fifteen", "15 people", "fifteen people"]
            },
            explain: {
              "13": "Bẫy: khách thường nghĩ 'a gentle stroll of an hour or so', nhưng thực tế 'it lasts three hours, including a stop for a drink' → three hours",
              "14": "Bẫy: 'We used to take up to twenty people' là con số cũ; hiện tại: 'so the maximum is now fifteen' → 15"
            }
          },
          {
            type: "map",
            kind: "match",
            range: [15, 20],
            instruction: "Label the map below. Write the correct letter, A–H, next to Questions 15–20.",
            optionsTitle: "Brackwood Country Park",
            image: MAP_SVG,
            options: [
              { key: "A", text: "Location A" },
              { key: "B", text: "Location B" },
              { key: "C", text: "Location C" },
              { key: "D", text: "Location D" },
              { key: "E", text: "Location E" },
              { key: "F", text: "Location F" },
              { key: "G", text: "Location G" },
              { key: "H", text: "Location H" }
            ],
            questions: [
              { n: 15, text: "Café", answer: "B", explain: "A (bên trái lối vào) là gift shop — bẫy. 'opposite that, the first building on your right-hand side, before you get to the crossroads, is the café' → bên phải Oak Drive, trước ngã tư → B" },
              { n: 16, text: "Adventure playground", answer: "C", explain: "'turn left here and go right along to the far end of Mill Lane. The adventure playground is on the left-hand side, just before the lane ends' → đi về phía tây, bên trái là phía nam, cuối đường → C" },
              { n: 17, text: "Picnic area", answer: "D", explain: "'directly opposite the playground, on the other side of the lane, at the edge of the woodland, is the picnic area' → đối diện C, mép rừng → D" },
              { n: 18, text: "Bird hide", answer: "G", explain: "Bẫy: tòa nhà ở bờ gần Oak Drive (F) 'is actually the boathouse'. 'The bird hide is on the far side of the lake, on the eastern shore' → G" },
              { n: 19, text: "Bike hire", answer: "H", explain: "'go back to the crossroads and this time turn right along Mill Lane ... the bike hire shop is there on your right-hand side, at the very end of the lane' → đi về phía đông, bên phải là phía nam, cuối đường → H" },
              { n: 20, text: "Start of the woodland trail", answer: "E", explain: "'Go straight over the crossroads and continue north along Oak Drive. Just where the woodland begins, on your left, right beside the path' → E" }
            ]
          }
        ]
      },

      /* ───────────────────────── PART 3 ───────────────────────── */
      {
        id: "L1-S3",
        part: 3,
        title: "Research project on secondhand clothing",
        context: "Two students, Mia and Josh, discuss their research project with their tutor, Dr Patel.",
        audio: null,
        script: [
          { speaker: "Dr Patel", voice: "m2", text: "Come in, Mia, Josh. Have a seat. So, you wanted to talk about your research project for the consumer behaviour module?" },
          { speaker: "Mia", voice: "f", text: "Yes, thanks for seeing us. We've decided to look at attitudes to buying secondhand clothes." },
          { speaker: "Dr Patel", voice: "m2", text: "Interesting. What made you choose that? I know I mentioned fast fashion in one of my lectures." },
          { speaker: "Josh", voice: "m", text: "You did, and that got us thinking a bit, but honestly the main reason is that Mia volunteers in a charity shop every Saturday, so she's seen a lot of what goes on first-hand.", q: [21] },
          { speaker: "Mia", voice: "f", text: "Yeah, I've been doing it for about a year now, so we thought we could make use of that experience." },
          { speaker: "Dr Patel", voice: "m2", text: "That's a real advantage. And how's the background reading going?" },
          { speaker: "Mia", voice: "f", text: "Pretty well. There's a lot about how much clothing ends up in landfill, and the figures are huge, but I sort of expected that. What actually surprised me was that only about a quarter of the clothes people donate are ever sold in the shops. The rest get sent abroad or recycled.", q: [22] },
          { speaker: "Josh", voice: "m", text: "I hadn't realised that either. I'd already read that secondhand buying among young people was growing fast, so that wasn't really news to me – but the quarter figure was." },
          { speaker: "Dr Patel", voice: "m2", text: "Good. Now, let's look at your research question. You've written, 'What are people's attitudes to secondhand clothing?' It's not that nobody has studied this before – there's some research, but you'd be adding to it. My main worry is that, as it stands, it's far too broad. 'People' could mean anyone, and 'attitudes' could cover price, hygiene, the environment...", q: [23] },
          { speaker: "Josh", voice: "m", text: "Yeah, we wondered about that. So should we narrow it down to one group?" },
          { speaker: "Dr Patel", voice: "m2", text: "I think so. Who did you have in mind?" },
          { speaker: "Josh", voice: "m", text: "Well, I thought people over sixty might be interesting, because they grew up when mending and reusing clothes was completely normal." },
          { speaker: "Dr Patel", voice: "m2", text: "It would be interesting, but realistically, how would you reach enough of them in four weeks?" },
          { speaker: "Mia", voice: "f", text: "That's true. Parents with young children was another idea, because kids grow out of their clothes so quickly." },
          { speaker: "Dr Patel", voice: "m2", text: "Same problem, I'm afraid – they're very busy people, and they're unlikely to have time for you." },
          { speaker: "Mia", voice: "f", text: "So perhaps we should stick with students here at the university. We can reach them easily, and there's a lot of variety in their spending habits." },
          { speaker: "Josh", voice: "m", text: "Yeah, I'm happy with that. Let's go with students at the university.", q: [24] },
          { speaker: "Dr Patel", voice: "m2", text: "Good, I think that's sensible. Now, you're also giving a presentation of your findings in December, aren't you? A couple of suggestions. Some groups like to include a video clip, but I'd steer clear of that – the equipment in that room is very unreliable. What I would like to see is a comparison with another country. Japan, for example, has a huge secondhand market, and contrasting it with the UK would really strengthen your argument.", q: [25, 26] },
          { speaker: "Mia", voice: "f", text: "OK, that's a good idea. What about handouts?" },
          { speaker: "Dr Patel", voice: "m2", text: "Not necessary – your slides will be online anyway. But do include direct quotations from the people you interview. Hearing their actual words really brings the data to life.", q: [25, 26] },
          { speaker: "Josh", voice: "m", text: "Great. Could we talk about methods too? We've got four in mind and we wanted your opinion." },
          { speaker: "Dr Patel", voice: "m2", text: "Go ahead." },
          { speaker: "Josh", voice: "m", text: "Well, first, an online survey." },
          { speaker: "Dr Patel", voice: "m2", text: "That's quick to set up, but be careful. The people who reply to these surveys tend to be the ones who are already enthusiastic about the topic, so you're likely to get biased results.", q: [27] },
          { speaker: "Mia", voice: "f", text: "Right. Second, we'd like to interview the managers of some local secondhand shops." },
          { speaker: "Dr Patel", voice: "m2", text: "You won't need any special software for that – a phone app will record them perfectly well. But think about the timescale. Arranging and transcribing interviews takes far longer than students expect. It could easily eat up most of your four weeks.", q: [28] },
          { speaker: "Josh", voice: "m", text: "Hmm. Then there's observation – just watching how customers behave in Mia's shop." },
          { speaker: "Dr Patel", voice: "m2", text: "I like that idea. The main thing is, before you do it, you'll need to get formal approval from the university ethics committee, because you'll be observing members of the public.", q: [29] },
          { speaker: "Mia", voice: "f", text: "Oh, I hadn't thought of that. And the last one is looking at the shop's sales records." },
          { speaker: "Dr Patel", voice: "m2", text: "Now that would give you the most detailed data of all – a picture of what people actually buy, rather than what they say they buy.", q: [30] },
          { speaker: "Mia", voice: "f", text: "Brilliant. That's really helpful, thank you." },
          { speaker: "Dr Patel", voice: "m2", text: "You're welcome. Send me your revised research question by Friday, and we'll meet again next week." }
        ],
        groups: [
          {
            type: "mcq",
            kind: "mcq",
            range: [21, 24],
            instruction: "Choose the correct letter, A, B or C.",
            questions: [
              {
                n: 21,
                text: "Why did the students choose secondhand clothing as their topic?",
                options: ["A They had read a recent news article about it.", "B Their tutor suggested it in a lecture.", "C One of them has experience of working in a secondhand shop."],
                answer: "C",
                explain: "Bẫy B: tutor có nhắc 'fast fashion' trong lecture, nhưng Josh nói 'honestly the main reason is that Mia volunteers in a charity shop every Saturday' → C"
              },
              {
                n: 22,
                text: "What surprised Mia in her background reading?",
                options: ["A how many young people buy secondhand clothes", "B how much clothing ends up in landfill", "C how little donated clothing is sold in shops"],
                answer: "C",
                explain: "B: số liệu landfill 'I sort of expected that'. A: Josh nói 'that wasn't really news to me'. Đáp án: 'What actually surprised me was that only about a quarter of the clothes people donate are ever sold in the shops' → C"
              },
              {
                n: 23,
                text: "What does the tutor say about the students' research question?",
                options: ["A It is too broad.", "B It has been studied too often.", "C It would be difficult to measure."],
                answer: "A",
                explain: "B bị bác: 'It's not that nobody has studied this before ... you'd be adding to it'. Đáp án: 'My main worry is that, as it stands, it's far too broad' → A"
              },
              {
                n: 24,
                text: "Which group of people do the students decide to focus on?",
                options: ["A students at their university", "B parents of young children", "C people over sixty"],
                answer: "A",
                explain: "Người trên 60 và phụ huynh bị loại vì khó tiếp cận ('how would you reach enough of them', 'Same problem'). Chốt lại: 'Let's go with students at the university.' → A"
              }
            ]
          },
          {
            type: "mcq-multi",
            kind: "multi",
            range: [25, 26],
            instruction: "Choose TWO letters, A–E.",
            questions: [
              {
                ns: [25, 26],
                text: "Which TWO things does the tutor recommend including in the presentation?",
                options: ["A a short video clip", "B a comparison with another country", "C a live demonstration", "D quotations from interviews", "E a handout summarising the results"],
                answer: ["B", "D"],
                explain: "A bị loại: 'a video clip, but I'd steer clear of that'. E bị loại: handouts 'Not necessary'. Được khuyên: 'What I would like to see is a comparison with another country' (B) và 'do include direct quotations from the people you interview' (D). C không được nhắc tới → B, D"
              }
            ]
          },
          {
            type: "matching",
            kind: "match",
            range: [27, 30],
            instruction: "What comment does the tutor make about each of the following research methods? Choose FOUR answers from the box and write the correct letter, A–F, next to Questions 27–30.",
            optionsTitle: "Comments",
            options: [
              { key: "A", text: "It is likely to take too much time." },
              { key: "B", text: "It may produce biased results." },
              { key: "C", text: "It is cheap to carry out." },
              { key: "D", text: "It will provide the most detailed data." },
              { key: "E", text: "It requires formal permission." },
              { key: "F", text: "It needs specialist software." }
            ],
            questions: [
              { n: 27, text: "online survey", answer: "B", explain: "'quick to set up, but be careful ... you're likely to get biased results' → B ('quick' không phải là 'cheap')." },
              { n: 28, text: "interviews with shop managers", answer: "A", explain: "Bẫy F bị phủ định: 'You won't need any special software'. Ý chính: 'Arranging and transcribing interviews takes far longer than students expect. It could easily eat up most of your four weeks.' → A" },
              { n: 29, text: "observing customers", answer: "E", explain: "'you'll need to get formal approval from the university ethics committee' → E" },
              { n: 30, text: "analysing sales records", answer: "D", explain: "'Now that would give you the most detailed data of all' → D" }
            ]
          }
        ]
      },

      /* ───────────────────────── PART 4 ───────────────────────── */
      {
        id: "L1-S4",
        part: 4,
        title: "Urban heat islands",
        context: "A lecture in an environmental science course about urban heat islands and green roofs.",
        audio: null,
        script: [
          { speaker: "Lecturer", voice: "f2", text: "Good afternoon. Today I'm going to talk about a phenomenon that's becoming increasingly important as more and more of the world's population moves into cities: the urban heat island. Put simply, an urban heat island is a city, or part of a city, that is significantly warmer than the rural areas around it. On a calm summer night, the difference can be several degrees, and this has real consequences for the people who live there." },
          { speaker: "Lecturer", voice: "f2", text: "So what causes it? Well, let's start with the surfaces of the city. Dark surfaces, such as asphalt roads and roofs, absorb a great deal of the sun's energy during the day. But it isn't only the colour that matters. Materials like concrete store this heat and then release it slowly during the night, which is why cities often fail to cool down after sunset.", q: [31] },
          { speaker: "Lecturer", voice: "f2", text: "A second factor is the lack of vegetation. In the countryside, plants release water vapour through their leaves, and this evaporation has a cooling effect – a bit like sweating does for the human body. In the centre of a city, there is simply far less vegetation, so this natural cooling is reduced.", q: [32] },
          { speaker: "Lecturer", voice: "f2", text: "Thirdly, cities generate a lot of heat themselves. Many people assume that traffic is the biggest source, and vehicles certainly contribute, as do air-conditioning units, which pump hot air out onto the street. But in many cities the largest contribution actually comes from factories, particularly in older industrial districts.", q: [33] },
          { speaker: "Lecturer", voice: "f2", text: "Now, what are the effects? The most obvious one is economic. When temperatures rise, people turn up their air conditioning, and this leads to a sharp increase in the demand for electricity during the summer months – sometimes enough to cause power cuts.", q: [34] },
          { speaker: "Lecturer", voice: "f2", text: "Air quality is also affected. Higher temperatures speed up the chemical reactions that produce ozone at ground level. Ozone is useful high up in the atmosphere, of course, but near the ground it's a pollutant that irritates the lungs.", q: [35] },
          { speaker: "Lecturer", voice: "f2", text: "And then there's health. During heatwaves, death rates in cities rise noticeably. Young children are affected, of course, but research shows that by far the group at greatest risk is elderly people, especially those who live alone.", q: [36] },
          { speaker: "Lecturer", voice: "f2", text: "So, what can be done? One of the most promising solutions is the green roof – that is, a roof that is partly or completely covered with plants. I'd like to briefly take you through how one is installed, because the process is rather more complicated than you might think." },
          { speaker: "Lecturer", voice: "f2", text: "First, the existing roof has to be inspected by an engineer to make sure it can carry the extra weight, which can be considerable once everything is wet." },
          { speaker: "Lecturer", voice: "f2", text: "Next, a waterproof membrane is laid over the whole surface. This is essential, as it stops water from getting into the building below.", q: [37] },
          { speaker: "Lecturer", voice: "f2", text: "On top of that goes a drainage layer. Some designs use plastic panels, but the most common choice is a layer of gravel, which allows excess rainwater to run off.", q: [38] },
          { speaker: "Lecturer", voice: "f2", text: "Then a growing medium is spread over the top. This is not ordinary garden soil, which would be far too heavy, but a specially designed lightweight mixture." },
          { speaker: "Lecturer", voice: "f2", text: "After that comes the planting. You might expect grass to be used, but grass needs a lot of watering. Instead, designers usually choose succulents, which store water in their leaves and can survive long dry periods.", q: [39] },
          { speaker: "Lecturer", voice: "f2", text: "Finally, once the roof is established, it needs very little maintenance. It should be checked twice a year, mainly to remove weeds, which can damage the waterproof layer with their roots.", q: [40] },
          { speaker: "Lecturer", voice: "f2", text: "Green roofs don't only cool the building and the air around it; they also absorb rainwater and provide habitats for insects and birds. In the next lecture, we'll look at some other solutions, including reflective 'cool roofs' and the role of urban parks." }
        ],
        groups: [
          {
            type: "note",
            kind: "gap",
            range: [31, 36],
            instruction: "Complete the notes below. Write ONE WORD ONLY for each answer.",
            wordLimit: "ONE WORD ONLY",
            title: "Urban heat islands",
            content:
              `<h4>Urban Heat Islands</h4>
<p>Definition: a city that is significantly warmer than the surrounding rural areas</p>
<h5>Causes</h5>
<ul>
  <li>dark surfaces absorb the sun's energy; materials such as {{31}} release heat slowly at night</li>
  <li>a lack of {{32}} means less cooling through evaporation</li>
  <li>heat produced by vehicles, air-conditioning units and {{33}}</li>
</ul>
<h5>Effects</h5>
<ul>
  <li>greater demand for {{34}} in summer</li>
  <li>poorer air quality – more ground-level {{35}}</li>
  <li>greatest health risk during heatwaves is to {{36}} people</li>
</ul>`,
            answers: {
              "31": ["concrete"],
              "32": ["vegetation"],
              "33": ["factories"],
              "34": ["electricity"],
              "35": ["ozone"],
              "36": ["elderly"]
            },
            explain: {
              "31": "'Materials like concrete store this heat and then release it slowly during the night' → concrete (asphalt được nhắc đến như bề mặt tối hấp thụ nhiệt, không phải vật liệu tỏa nhiệt chậm).",
              "32": "'A second factor is the lack of vegetation ... so this natural cooling is reduced' → vegetation",
              "33": "Bẫy: 'Many people assume that traffic is the biggest source' — vehicles và air-conditioning đã có sẵn trong ghi chú; ý còn lại: 'the largest contribution actually comes from factories' → factories",
              "34": "'this leads to a sharp increase in the demand for electricity during the summer months' → electricity",
              "35": "'Higher temperatures speed up the chemical reactions that produce ozone at ground level' → ozone",
              "36": "Bẫy: 'Young children are affected, of course' nhưng 'by far the group at greatest risk is elderly people' → elderly"
            }
          },
          {
            type: "flow",
            kind: "gap",
            range: [37, 40],
            instruction: "Complete the flow-chart below. Write ONE WORD ONLY for each answer.",
            wordLimit: "ONE WORD ONLY",
            title: "Installing a green roof",
            content:
              `<h4>Installing a green roof</h4>
<div class="q-flow">
  <div class="q-flow-box">An engineer inspects the roof to check it can support the extra weight</div>
  <div class="q-flow-arrow">↓</div>
  <div class="q-flow-box">A waterproof {{37}} is laid over the whole surface</div>
  <div class="q-flow-arrow">↓</div>
  <div class="q-flow-box">A drainage layer is added – usually made of {{38}}</div>
  <div class="q-flow-arrow">↓</div>
  <div class="q-flow-box">A lightweight growing medium (not garden soil) is spread on top</div>
  <div class="q-flow-arrow">↓</div>
  <div class="q-flow-box">Plants such as {{39}} are used because they store water</div>
  <div class="q-flow-arrow">↓</div>
  <div class="q-flow-box">The roof is checked twice a year to remove {{40}}</div>
</div>`,
            answers: {
              "37": ["membrane"],
              "38": ["gravel"],
              "39": ["succulents"],
              "40": ["weeds"]
            },
            explain: {
              "37": "'Next, a waterproof membrane is laid over the whole surface' → membrane",
              "38": "Bẫy: 'Some designs use plastic panels, but the most common choice is a layer of gravel' → gravel",
              "39": "Bẫy: 'You might expect grass to be used, but grass needs a lot of watering. Instead, designers usually choose succulents' → succulents",
              "40": "'It should be checked twice a year, mainly to remove weeds' → weeds"
            }
          }
        ]
      }
    ]
  };

  var root = (window.IELTS = window.IELTS || {});
  root.data = root.data || {};
  root.data.listeningTests = root.data.listeningTests || [];
  root.data.listeningTests.push(test);
})();
