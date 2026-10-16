(function () {
  "use strict";
  // Listening Practice Test 2 — original material written for practice (not a real exam paper).
  // Owner: LD2. Schema: SPEC §6.1 / §6.3.
  var W = window.IELTS = window.IELTS || {};
  W.data = W.data || {};
  W.data.listeningTests = W.data.listeningTests || [];

  var reserveMap = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" role="img" aria-label="Plan of Ashcombe Wetland Reserve with locations A to H" font-family="Nunito, Arial, sans-serif">',
    '<rect x="0" y="0" width="600" height="400" fill="#f7faf7" stroke="#9aa79a"/>',
    '<text x="300" y="24" text-anchor="middle" font-size="16" font-weight="700" fill="#2f3b2f">Ashcombe Wetland Reserve</text>',
    // north arrow
    '<g transform="translate(565,40)"><line x1="0" y1="18" x2="0" y2="-10" stroke="#2f3b2f" stroke-width="2"/><polygon points="0,-16 -6,-4 6,-4" fill="#2f3b2f"/><text x="0" y="32" text-anchor="middle" font-size="12" fill="#2f3b2f">N</text></g>',
    // woodland
    '<rect x="18" y="48" width="125" height="190" rx="18" fill="#dcebd6" stroke="#8fb184"/>',
    '<text x="80" y="140" text-anchor="middle" font-size="13" fill="#3d5a35">Woodland</text>',
    // reed beds
    '<rect x="478" y="110" width="104" height="190" rx="18" fill="#e9efd2" stroke="#b5bf86"/>',
    '<text x="530" y="250" text-anchor="middle" font-size="13" fill="#5f6631">Reed beds</text>',
    // path loop
    '<rect x="160" y="70" width="305" height="240" rx="40" fill="none" stroke="#c7a978" stroke-width="7"/>',
    '<line x1="300" y1="310" x2="300" y2="332" stroke="#c7a978" stroke-width="7"/>',
    '<line x1="160" y1="300" x2="200" y2="335" stroke="#c7a978" stroke-width="5"/>',
    // lake + island
    '<ellipse cx="312" cy="190" rx="128" ry="82" fill="#cfe4f3" stroke="#7aa6c6" stroke-width="2"/>',
    '<text x="312" y="150" text-anchor="middle" font-size="14" fill="#2f5b7a">Main Lake</text>',
    '<ellipse cx="312" cy="200" rx="30" ry="16" fill="#e2efd9" stroke="#8fb184"/>',
    // platform into lake (east)
    '<rect x="432" y="193" width="33" height="12" fill="#c7a978"/>',
    // car park, visitor centre, house
    '<rect x="18" y="322" width="125" height="62" fill="#e7e7e7" stroke="#9a9a9a"/>',
    '<text x="80" y="358" text-anchor="middle" font-size="13" fill="#444">Car park</text>',
    '<rect x="240" y="332" width="120" height="52" fill="#fff6e3" stroke="#b08a4c" stroke-width="2"/>',
    '<text x="300" y="356" text-anchor="middle" font-size="13" font-weight="700" fill="#5a4318">Visitor Centre</text>',
    '<text x="300" y="374" text-anchor="middle" font-size="11" fill="#5a4318">(you are here)</text>',
    '<text x="300" y="396" text-anchor="middle" font-size="11" fill="#444">Main entrance</text>',
    '<rect x="515" y="335" width="44" height="34" fill="#f1f1f1" stroke="#9a9a9a"/>',
    // letters
    '<g font-size="15" font-weight="700" text-anchor="middle" fill="#ffffff">',
    '<circle cx="196" cy="350" r="13" fill="#1f4e79"/><text x="196" y="355">A</text>',
    '<circle cx="160" cy="190" r="13" fill="#1f4e79"/><text x="160" y="195">B</text>',
    '<circle cx="190" cy="84" r="13" fill="#1f4e79"/><text x="190" y="89">C</text>',
    '<circle cx="452" cy="74" r="13" fill="#1f4e79"/><text x="452" y="79">D</text>',
    '<circle cx="448" cy="226" r="13" fill="#1f4e79"/><text x="448" y="231">E</text>',
    '<circle cx="537" cy="352" r="13" fill="#1f4e79"/><text x="537" y="357">F</text>',
    '<circle cx="312" cy="200" r="13" fill="#1f4e79"/><text x="312" y="205">G</text>',
    '<circle cx="412" cy="350" r="13" fill="#1f4e79"/><text x="412" y="355">H</text>',
    '</g>',
    '</svg>'
  ].join("");

  W.data.listeningTests.push({
    id: "L2",
    title: "Practice Test 2",
    source: "Biên soạn cho luyện tập (không phải đề thi thật)",
    sections: [
      /* ------------------------------------------------------------------ PART 1 */
      {
        id: "L2-S1",
        part: 1,
        title: "Harbour View Lettings – flat rental enquiry",
        context: "A telephone conversation between a letting agent and a student who is looking for a flat to rent.",
        audio: null,
        script: [
          { speaker: "Agent", voice: "m", text: "Good morning, Harbour View Lettings, Tom speaking. How can I help you?", q: [] },
          { speaker: "Sofia", voice: "f", text: "Oh, hello. I'm a student and I'm moving to the city next month, so I'm looking for a one-bedroom flat to rent. I saw a few on your website.", q: [] },
          { speaker: "Agent", voice: "m", text: "Great, we've got quite a lot available at the moment. Let me just take a few details first, and then we can go through some options. Could I have your name, please?", q: [] },
          { speaker: "Sofia", voice: "f", text: "Yes, it's Sofia Kowalska.", q: [] },
          { speaker: "Agent", voice: "m", text: "Is that Sofia with an F or with P-H?", q: [] },
          { speaker: "Sofia", voice: "f", text: "With an F. And the surname is Kowalska, K-O-W-A-L-S-K-A.", q: [1] },
          { speaker: "Agent", voice: "m", text: "K-O-W-A-L-S-K-A. Thank you. And what's your current address?", q: [1] },
          { speaker: "Sofia", voice: "f", text: "At the moment I'm living at Flat 3, 52 Brackley Road, in Northampton. That's Brackley, B-R-A-C-K-L-E-Y.", q: [2] },
          { speaker: "Agent", voice: "m", text: "Lovely. And when are you hoping to move in?", q: [] },
          { speaker: "Sofia", voice: "f", text: "Well, I was originally planning to come on the 1st of September, but my course doesn't actually start until later in the month, so I'd rather move in on 14th September.", q: [3] },
          { speaker: "Agent", voice: "m", text: "The fourteenth. That's fine, most of our flats are available from the start of the month anyway. Now, what sort of budget do you have in mind?", q: [] },
          { speaker: "Sofia", voice: "f", text: "I was hoping to pay around £650 a month, but I know that's probably not realistic in the city centre. My absolute maximum would be £700.", q: [4] },
          { speaker: "Agent", voice: "m", text: "OK, so £700 a month. Is that including bills or excluding them?", q: [4] },
          { speaker: "Sofia", voice: "f", text: "Excluding, I suppose. I can pay the bills separately.", q: [] },
          { speaker: "Agent", voice: "m", text: "Right. Well, I've got three flats that might suit you. The first one is at 27 Mill Lane. It's a ground-floor flat and the rent is £640 a month.", q: [] },
          { speaker: "Sofia", voice: "f", text: "That sounds reasonable. What's it like?", q: [] },
          { speaker: "Agent", voice: "m", text: "It's quite small, but the nice thing is that it has its own garden. It's not a big one, but you could sit outside in the summer. There's no balcony, of course, as it's on the ground floor.", q: [5] },
          { speaker: "Sofia", voice: "f", text: "Oh, I'd love a garden. Is there any problem with it?", q: [] },
          { speaker: "Agent", voice: "m", text: "Well, I should be honest with you. It's right behind a supermarket, and the delivery lorries arrive very early in the morning, sometimes at about five o'clock, so it can be quite noisy.", q: [6] },
          { speaker: "Sofia", voice: "f", text: "Hmm, I'm a light sleeper, so that might be difficult. What's the second one?", q: [] },
          { speaker: "Agent", voice: "m", text: "The second is Flat B, 9 Carlton Street. It was advertised at £720 a month, but the landlord has just reduced it to £685, so it's within your budget now.", q: [7] },
          { speaker: "Sofia", voice: "f", text: "Oh good. And what are its good points?", q: [] },
          { speaker: "Agent", voice: "m", text: "It's on the top floor of an old building, and from the living room you get a wonderful view of the river. Some people say you can see the cathedral too, but honestly, the trees block most of that.", q: [8] },
          { speaker: "Sofia", voice: "f", text: "That sounds lovely. And the negative side?", q: [] },
          { speaker: "Agent", voice: "m", text: "The main disadvantage is that there isn't a lift, and the flat is on the fourth floor, so you'd have to carry your shopping up a lot of stairs.", q: [9] },
          { speaker: "Sofia", voice: "f", text: "Well, I suppose that would keep me fit! And the third one?", q: [] },
          { speaker: "Agent", voice: "m", text: "The third one is 14 Orchard Close. That's the cheapest, at £595 a month. It's a bit further out, about forty minutes from the centre by bus.", q: [] },
          { speaker: "Sofia", voice: "f", text: "And is anything included in the rent?", q: [] },
          { speaker: "Agent", voice: "m", text: "Yes. The water bill isn't included, but the heating is, which is a real advantage in winter, because heating can be very expensive here.", q: [10] },
          { speaker: "Sofia", voice: "f", text: "That's useful to know. Could I arrange to see the first two this week?", q: [] },
          { speaker: "Agent", voice: "m", text: "Of course. How about Thursday afternoon? I could meet you at Mill Lane at two o'clock and then drive you over to Carlton Street.", q: [] },
          { speaker: "Sofia", voice: "f", text: "Thursday is perfect. I'll come down on the train in the morning.", q: [] },
          { speaker: "Agent", voice: "m", text: "Great. I'll send you a confirmation by email with both addresses and my mobile number, just in case you get lost.", q: [] },
          { speaker: "Sofia", voice: "f", text: "Thank you so much. See you on Thursday, then.", q: [] }
        ],
        groups: [
          {
            type: "form",
            kind: "gap",
            range: [1, 4],
            instruction: "Questions 1–4. Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.",
            title: "Harbour View Lettings – Tenant Enquiry Form",
            wordLimit: "ONE WORD AND/OR A NUMBER",
            content:
              '<div class="q-flow">' +
              '<p><em>Example:</em> Type of property: <strong>one-bedroom flat</strong></p>' +
              '<p>Name: Sofia {{1}}</p>' +
              '<p>Current address: Flat 3, 52 {{2}} Road, Northampton</p>' +
              '<p>Preferred moving date: {{3}}</p>' +
              '<p>Maximum rent: £{{4}} per month (excluding bills)</p>' +
              '</div>',
            answers: {
              "1": ["Kowalska"],
              "2": ["Brackley"],
              "3": ["14th September", "14 September", "September 14", "September 14th", "14 Sept", "14th Sept", "14/9", "14.9"],
              "4": ["700"]
            },
            explain: {
              "1": "Sofia đánh vần: 'the surname is Kowalska, K-O-W-A-L-S-K-A' → đáp án Kowalska (phải viết đúng chính tả).",
              "2": "'Flat 3, 52 Brackley Road... That's Brackley, B-R-A-C-K-L-E-Y' → đáp án Brackley. Số 52 đã có sẵn trong form.",
              "3": "Bẫy: 'originally planning to come on the 1st of September' – sau đó đổi ý: 'I'd rather move in on 14th September' → đáp án 14th September.",
              "4": "Bẫy: 'hoping to pay around £650' (chỉ là mong muốn). Mức tối đa: 'My absolute maximum would be £700' → đáp án 700."
            }
          },
          {
            type: "table",
            kind: "gap",
            range: [5, 10],
            instruction: "Questions 5–10. Complete the table below. Write ONE WORD AND/OR A NUMBER for each answer.",
            title: "Flats available",
            wordLimit: "ONE WORD AND/OR A NUMBER",
            content:
              '<table class="q-table">' +
              '<thead><tr><th>Address</th><th>Rent per month</th><th>Advantages</th><th>Disadvantages</th></tr></thead>' +
              '<tbody>' +
              '<tr><td>27 Mill Lane</td><td>£640</td><td>has its own {{5}}</td><td>delivery lorries for a {{6}} arrive early in the morning</td></tr>' +
              '<tr><td>Flat B, 9 Carlton Street</td><td>£{{7}}</td><td>view of the {{8}}</td><td>no {{9}} (flat is on the fourth floor)</td></tr>' +
              '<tr><td>14 Orchard Close</td><td>£595</td><td>{{10}} is included in the rent</td><td>40 minutes from the centre by bus</td></tr>' +
              '</tbody></table>',
            answers: {
              "5": ["garden"],
              "6": ["supermarket"],
              "7": ["685"],
              "8": ["river"],
              "9": ["lift", "elevator"],
              "10": ["heating"]
            },
            explain: {
              "5": "'the nice thing is that it has its own garden' → garden. Bẫy: 'There's no balcony' – căn hộ không có ban công.",
              "6": "'It's right behind a supermarket, and the delivery lorries arrive very early in the morning' → supermarket.",
              "7": "Bẫy: 'It was advertised at £720' – giá cũ. Giá hiện tại: 'the landlord has just reduced it to £685' → 685.",
              "8": "'you get a wonderful view of the river' → river. Bẫy: 'you can see the cathedral too, but honestly, the trees block most of that' → không chọn cathedral.",
              "9": "'there isn't a lift, and the flat is on the fourth floor' → lift (chấp nhận elevator).",
              "10": "Bẫy: 'The water bill isn't included' – nước KHÔNG bao gồm. 'but the heating is' (included) → heating."
            }
          }
        ]
      },

      /* ------------------------------------------------------------------ PART 2 */
      {
        id: "L2-S2",
        part: 2,
        title: "Ashcombe Wetland Reserve – welcome talk for new volunteers",
        context: "A volunteer coordinator gives a welcome talk to a group of new volunteers at a nature reserve.",
        audio: null,
        script: [
          { speaker: "Coordinator", voice: "m", text: "Good morning, everyone, and welcome to Ashcombe Wetland Reserve. My name's Daniel Hughes and I'm the volunteer coordinator here. Thank you all for giving up your time to join us. I'm going to start by explaining where everything is on the reserve, then I'll tell you about the work you'll be doing, and finally I'll give you some practical information.", q: [] },
          { speaker: "Coordinator", voice: "m", text: "If you look at the plan in your welcome pack, you'll see that we're in the visitor centre at the bottom, next to the main entrance. The car park is just to the left of the visitor centre as you look at the plan, and the large lake is right in the middle of the reserve.", q: [] },
          { speaker: "Coordinator", voice: "m", text: "So, when you leave the visitor centre by the side door, turn left, and the first building you'll come to, just beside the car park, is the tool store. That's where you'll collect your gloves, litter pickers and so on at the start of each shift.", q: [11] },
          { speaker: "Coordinator", voice: "m", text: "From the tool store, a path goes north along the western side of the lake. Where the woodland begins, on your left, you'll see a large old oak tree with a bench underneath it. In the past we used to meet in the car park, but it got far too busy, so now that oak tree is our volunteers' meeting point. Please be there by nine o'clock every morning.", q: [12] },
          { speaker: "Coordinator", voice: "m", text: "If you carry on along the path, it curves round the top of the lake. Some visitors expect to find the bird hide on the island in the middle of the lake, but the island is actually closed to the public, because that's where we've put the nesting rafts. The main bird hide is at the north-western corner of the lake, just where the path starts to bend towards the east, and it looks south across the water.", q: [13] },
          { speaker: "Coordinator", voice: "m", text: "Keep following the path east along the northern edge and, right at the far end, in a fenced corner, you'll find our beehives. They're quite safe, but please don't go inside the fence without one of our beekeepers.", q: [14] },
          { speaker: "Coordinator", voice: "m", text: "The path then turns south and runs down the eastern side of the lake, beside the reed beds. About halfway along, there's a wooden platform that goes out over the water. That's the pond-dipping platform, and it's very popular with school groups.", q: [15] },
          { speaker: "Coordinator", voice: "m", text: "Finally, the path brings you back towards the visitor centre. Just before you reach it, so to the right of the visitor centre if you're looking at the plan, there's the picnic area, with tables and a few barbecue stands. The building you can see in the bottom right-hand corner is the warden's house. That's private, so please don't send visitors there.", q: [16] },
          { speaker: "Coordinator", voice: "m", text: "Now, let me tell you about the work you'll be doing. Many of you have asked whether you'll be guiding school groups. That's something we'd love you to do eventually, but it's only possible once you've completed our training course, which usually happens in your third month. Similarly, our bird counts are carried out by experienced volunteers, and any fence repairs are done by professional contractors.", q: [17, 18] },
          { speaker: "Coordinator", voice: "m", text: "So in your first month, you'll mainly be clearing litter from the paths, which is a bigger job than it sounds, and you'll also take turns at the entrance gate, recording visitor numbers. We need those figures for our funding applications, so they're really important.", q: [17, 18] },
          { speaker: "Coordinator", voice: "m", text: "A few practical points. On your first day, you don't need to bring gloves, as we provide those, and the café gives every volunteer a free lunch, so there's no need to bring any food either. What you must bring, though, is a pair of waterproof boots, because some of the paths get extremely muddy.", q: [19] },
          { speaker: "Coordinator", voice: "m", text: "And finally, a little thank-you. Until last year, volunteers received a discount in our shop, but we've changed that. Now, anyone who completes fifty hours of volunteering in their first year will receive a free annual membership of the reserve, which also covers your family.", q: [20] },
          { speaker: "Coordinator", voice: "m", text: "We also hold a volunteers' dinner every December, which is open to everyone, however many hours you've done. Right, are there any questions before we head outside?", q: [20] }
        ],
        groups: [
          {
            type: "map",
            kind: "match",
            range: [11, 16],
            instruction: "Questions 11–16. Label the plan below. Write the correct letter, A–H, next to Questions 11–16.",
            optionsTitle: "Locations on the plan",
            image: reserveMap,
            options: [
              { key: "A", text: "Location A" }, { key: "B", text: "Location B" }, { key: "C", text: "Location C" }, { key: "D", text: "Location D" },
              { key: "E", text: "Location E" }, { key: "F", text: "Location F" }, { key: "G", text: "Location G" }, { key: "H", text: "Location H" }
            ],
            questions: [
              { n: 11, text: "Tool store", answer: "A", explain: "'leave the visitor centre by the side door, turn left, and the first building you'll come to, just beside the car park, is the tool store' → A (giữa Visitor Centre và Car park)." },
              { n: 12, text: "Volunteers' meeting point", answer: "B", explain: "Bẫy: 'In the past we used to meet in the car park' – không còn đúng. 'Where the woodland begins... a large old oak tree... now that oak tree is our volunteers' meeting point' → B (cạnh Woodland, phía tây hồ)." },
              { n: 13, text: "Bird hide", answer: "C", explain: "Bẫy: 'Some visitors expect to find the bird hide on the island' (G) – nhưng đảo đóng cửa. 'The main bird hide is at the north-western corner of the lake' → C." },
              { n: 14, text: "Beehives", answer: "D", explain: "'Keep following the path east along the northern edge and, right at the far end, in a fenced corner, you'll find our beehives' → D (góc đông bắc)." },
              { n: 15, text: "Pond-dipping platform", answer: "E", explain: "'down the eastern side of the lake, beside the reed beds. About halfway along, there's a wooden platform... That's the pond-dipping platform' → E." },
              { n: 16, text: "Picnic area", answer: "H", explain: "'to the right of the visitor centre if you're looking at the plan, there's the picnic area' → H. Bẫy: 'the bottom right-hand corner is the warden's house' (F) – không phải khu picnic." }
            ]
          },
          {
            type: "mcq-multi",
            kind: "multi",
            range: [17, 18],
            instruction: "Questions 17 and 18. Choose TWO letters, A–E.",
            questions: [
              {
                ns: [17, 18],
                text: "Which TWO tasks will new volunteers do during their first month?",
                options: ["A guiding school groups", "B clearing litter from the paths", "C counting birds", "D repairing fences", "E recording visitor numbers"],
                answer: ["B", "E"],
                explain: "'in your first month, you'll mainly be clearing litter from the paths... and you'll also take turns at the entrance gate, recording visitor numbers' → B, E. Bẫy: guiding school groups chỉ làm sau khoá đào tạo 'in your third month' (A); 'bird counts are carried out by experienced volunteers' (C); 'fence repairs are done by professional contractors' (D)."
              }
            ]
          },
          {
            type: "mcq",
            kind: "mcq",
            range: [19, 20],
            instruction: "Questions 19 and 20. Choose the correct letter, A, B or C.",
            questions: [
              {
                n: 19,
                text: "What must volunteers bring on their first day?",
                options: ["A waterproof boots", "B gloves", "C a packed lunch"],
                answer: "A",
                explain: "'What you must bring, though, is a pair of waterproof boots' → A. Bẫy: 'you don't need to bring gloves, as we provide those' (B) và 'the café gives every volunteer a free lunch' (C)."
              },
              {
                n: 20,
                text: "Volunteers who complete fifty hours in their first year will receive",
                options: ["A a free annual membership.", "B a discount in the shop.", "C an invitation to a dinner."],
                answer: "A",
                explain: "'anyone who completes fifty hours... will receive a free annual membership of the reserve' → A. Bẫy: 'Until last year, volunteers received a discount in our shop' (B – đã bỏ); bữa tối 'open to everyone, however many hours you've done' (C – không phụ thuộc 50 giờ)."
              }
            ]
          }
        ]
      },

      /* ------------------------------------------------------------------ PART 3 */
      {
        id: "L2-S3",
        part: 3,
        title: "Research project – food waste in the university canteen",
        context: "Two students, Emma and Josh, discuss their research project on food waste with their tutor, Dr Grant.",
        audio: null,
        script: [
          { speaker: "Dr Grant", voice: "m2", text: "Come in, Emma, Josh. Have a seat. So, you wanted to talk about your project on food waste in the university canteen. How's it going?", q: [] },
          { speaker: "Emma", voice: "f", text: "Quite well, thanks. We've done most of the background reading now.", q: [] },
          { speaker: "Dr Grant", voice: "m2", text: "Good. Remind me why you chose this topic. Was it the canteen manager who approached you?", q: [] },
          { speaker: "Josh", voice: "m", text: "A lot of people assume that, but no. We only contacted her after we'd already decided.", q: [21] },
          { speaker: "Emma", voice: "f", text: "It really came out of the assignment we did last term on supply chains. We kept reading about how much food is thrown away at the very end of the chain, and we wanted to see what happens on our own campus.", q: [21] },
          { speaker: "Dr Grant", voice: "m2", text: "That makes sense. And you ran a survey, didn't you?", q: [] },
          { speaker: "Josh", voice: "m", text: "Yes. We were worried we wouldn't get enough responses, but in the end over two hundred students filled it in, so numbers weren't a problem at all.", q: [22] },
          { speaker: "Emma", voice: "f", text: "The trouble was that a lot of people misunderstood the question about portion sizes. Some thought we meant how much they ate, and others thought we meant how much they were served, so the answers were confusing and we can't really use them.", q: [22] },
          { speaker: "Dr Grant", voice: "m2", text: "That happens more often than you'd think. Well, I don't think another survey is the answer. You could try interviewing the kitchen staff, but they're extremely busy at lunchtime. What I'd suggest is that you weigh the waste yourselves. Collect what's left on the plates for a few days and measure it. That would give you some hard data.", q: [23] },
          { speaker: "Josh", voice: "m", text: "That's a good idea. The manager said she could give us some space behind the kitchen.", q: [] },
          { speaker: "Dr Grant", voice: "m2", text: "Excellent. Now, you mentioned in your email that you'd come up with some possible measures to reduce the waste.", q: [] },
          { speaker: "Emma", voice: "f", text: "Yes, we've got a list. The first is offering smaller portions at a lower price. We wondered about trying it out for a week first, but after talking to the manager, we don't think that's necessary. It's simply the best idea we've got. It saves students money and it cuts waste.", q: [24] },
          { speaker: "Dr Grant", voice: "m2", text: "I agree, that sounds very promising. What else?", q: [] },
          { speaker: "Josh", voice: "m", text: "Removing the trays. Research shows that when people don't have a tray, they take less food.", q: [] },
          { speaker: "Emma", voice: "f", text: "But I really think students would be against it. People carry drinks, desserts, cutlery... there'd be complaints straight away.", q: [25] },
          { speaker: "Josh", voice: "m", text: "Yeah, I have to admit you're right. It wouldn't be popular at all.", q: [25] },
          { speaker: "Dr Grant", voice: "m2", text: "And the third?", q: [] },
          { speaker: "Josh", voice: "m", text: "Showing the weekly waste figures on a big digital screen near the entrance, so that people can see the impact of what they leave.", q: [] },
          { speaker: "Emma", voice: "f", text: "We liked that, but when we asked about the price, a screen like that would cost far more than the canteen could ever afford. Posters would be cheaper, but they're not nearly as eye-catching.", q: [26] },
          { speaker: "Dr Grant", voice: "m2", text: "Mm, budgets are always tight. Next?", q: [] },
          { speaker: "Emma", voice: "f", text: "Giving leftover food to a local charity. The café in the library already does that, so we assumed the canteen could just start doing it too.", q: [] },
          { speaker: "Josh", voice: "m", text: "But it turns out that because of food safety rules, the canteen would need official permission from the university first, and that could take months.", q: [27] },
          { speaker: "Dr Grant", voice: "m2", text: "Yes, the university is very careful about that. And the last one?", q: [] },
          { speaker: "Josh", voice: "m", text: "Composting the food scraps. We were going to suggest it, but then we found out that the grounds team already collect all the scraps and compost them for the gardens.", q: [28] },
          { speaker: "Emma", voice: "f", text: "So we'll just mention it in the report as something that's working well.", q: [28] },
          { speaker: "Dr Grant", voice: "m2", text: "Good. Now, about the report itself. When you present your weighing results, you should definitely include a graph. A line graph would be best, to show how the amount of waste changes from week to week.", q: [29] },
          { speaker: "Emma", voice: "f", text: "OK. And what about the length? I thought it was five thousand words.", q: [30] },
          { speaker: "Dr Grant", voice: "m2", text: "It used to be, but the department has reduced it this year. The maximum is now 3,000 words, not including the appendices.", q: [30] },
          { speaker: "Josh", voice: "m", text: "That's a relief!", q: [] },
          { speaker: "Dr Grant", voice: "m2", text: "Well, it means you'll have to be concise. Let's meet again in two weeks, once you've got your first set of figures.", q: [] }
        ],
        groups: [
          {
            type: "mcq",
            kind: "mcq",
            range: [21, 23],
            instruction: "Questions 21–23. Choose the correct letter, A, B or C.",
            questions: [
              {
                n: 21,
                text: "Why did Emma and Josh choose food waste as their topic?",
                options: ["A The canteen manager asked them for help.", "B They had seen a news report about it.", "C It was connected to an earlier assignment."],
                answer: "C",
                explain: "Bẫy: 'Was it the canteen manager who approached you?' – Josh: 'no. We only contacted her after we'd already decided' (A sai). Emma: 'It really came out of the assignment we did last term on supply chains' → C."
              },
              {
                n: 22,
                text: "What was the main problem with their first survey?",
                options: ["A Too few students responded.", "B One question was misunderstood.", "C It was carried out at the wrong time of day."],
                answer: "B",
                explain: "Bẫy: 'We were worried we wouldn't get enough responses, but... over two hundred students filled it in' (A sai). 'a lot of people misunderstood the question about portion sizes' → B."
              },
              {
                n: 23,
                text: "What does Dr Grant suggest they do next?",
                options: ["A weigh the waste themselves", "B interview the kitchen staff", "C carry out a second survey"],
                answer: "A",
                explain: "'I don't think another survey is the answer' (C sai); 'You could try interviewing the kitchen staff, but they're extremely busy' (B bị gạt). 'What I'd suggest is that you weigh the waste yourselves' → A."
              }
            ]
          },
          {
            type: "matching",
            kind: "match",
            range: [24, 28],
            instruction: "Questions 24–28. What do the students decide about each of the following measures? Choose FIVE answers from the box and write the correct letter, A–G, next to Questions 24–28.",
            optionsTitle: "Decisions",
            options: [
              { key: "A", text: "It is already being done." },
              { key: "B", text: "It would cost too much." },
              { key: "C", text: "Students would probably object to it." },
              { key: "D", text: "It should be tested for a week first." },
              { key: "E", text: "It needs permission from the university." },
              { key: "F", text: "It would only work at lunchtime." },
              { key: "G", text: "It is the most promising idea." }
            ],
            questions: [
              { n: 24, text: "offering smaller portions at a lower price", answer: "G", explain: "Bẫy: 'We wondered about trying it out for a week first, but... we don't think that's necessary' (D bị loại). 'It's simply the best idea we've got' → G." },
              { n: 25, text: "removing trays", answer: "C", explain: "'I really think students would be against it... there'd be complaints straight away' – Josh đồng ý 'It wouldn't be popular at all' → C." },
              { n: 26, text: "displaying weekly waste figures on a screen", answer: "B", explain: "'a screen like that would cost far more than the canteen could ever afford' → B." },
              { n: 27, text: "giving leftover food to a charity", answer: "E", explain: "Bẫy: 'The café in the library already does that' – là quán café thư viện, không phải canteen (A sai). 'the canteen would need official permission from the university first' → E." },
              { n: 28, text: "composting food scraps", answer: "A", explain: "'the grounds team already collect all the scraps and compost them for the gardens' → A (đã được làm rồi)." }
            ]
          },
          {
            type: "sentence",
            kind: "gap",
            range: [29, 30],
            instruction: "Questions 29 and 30. Complete the sentences below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
            wordLimit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
            content:
              '<div class="q-flow">' +
              '<p>Dr Grant recommends including a {{29}} to show how the amount of waste changes each week.</p>' +
              '<p>The maximum length of the report is {{30}} words, not including the appendices.</p>' +
              '</div>',
            answers: {
              "29": ["graph", "line graph"],
              "30": ["3,000", "3000", "three thousand"]
            },
            explain: {
              "29": "'you should definitely include a graph. A line graph would be best, to show how the amount of waste changes from week to week' → graph / line graph.",
              "30": "Bẫy: Emma nói 'I thought it was five thousand words' – Dr Grant sửa: 'It used to be... The maximum is now 3,000 words' → 3,000."
            }
          }
        ]
      },

      /* ------------------------------------------------------------------ PART 4 */
      {
        id: "L2-S4",
        part: 4,
        title: "Biomimicry in architecture",
        context: "A lecture in an architecture and design course about learning from nature.",
        audio: null,
        script: [
          { speaker: "Lecturer", voice: "f2", text: "Good afternoon. In today's lecture, I'm going to look at biomimicry in architecture, that is, the practice of designing buildings and products by imitating solutions found in the natural world. The term was popularised by the biologist Janine Benyus in 1997, but of course people have been borrowing ideas from nature for much longer than that.", q: [] },
          { speaker: "Lecturer", voice: "f2", text: "Let me start with what is probably the most famous example: the termite mound. In parts of Africa, termites build enormous mounds out of soil, some of them several metres high. What's remarkable is that, although the air outside can be above forty degrees during the day and fall dramatically at night, the inside of the mound stays at an almost constant temperature. The termites need this, because they farm a type of fungus that will only grow in very stable conditions.", q: [31] },
          { speaker: "Lecturer", voice: "f2", text: "So how do they manage it? The mound works rather like a pair of lungs. Fresh air is drawn in through small openings near the base of the mound, it circulates through a network of tunnels, and warm, stale air rises and escapes through vents at the top.", q: [32] },
          { speaker: "Lecturer", voice: "f2", text: "In the 1990s, the architect Mick Pearce applied these principles to the Eastgate Centre, a large office and shopping complex in Harare, Zimbabwe. The building has no conventional air-conditioning. Instead, at night, fans draw cool air into the building, and this cool air is stored in the thick concrete floors. Many people assume it's the walls that do this job, but in fact it's the floors that act as the main heat store.", q: [33] },
          { speaker: "Lecturer", voice: "f2", text: "During the day, as the building warms up, the warm air rises and is pushed out through a row of tall chimneys on the roof.", q: [34] },
          { speaker: "Lecturer", voice: "f2", text: "The result is impressive. The Eastgate Centre uses only about ten percent of the energy that a conventional building of the same size would need. It also saved the owners a great deal of money during construction, because they didn't have to install an expensive cooling system.", q: [35] },
          { speaker: "Lecturer", voice: "f2", text: "Now let's turn to some other examples. The leaf of the lotus plant has a fascinating property. Although the plant grows in muddy water, its leaves always look perfectly clean. Under a microscope, scientists discovered that the surface is covered in tiny bumps coated with wax. When it rains, the water forms droplets that roll off the leaf, carrying any dirt away with them. This lotus effect has been copied to create self-cleaning paints and glass for buildings, which reduce the need for maintenance.", q: [36] },
          { speaker: "Lecturer", voice: "f2", text: "My next example comes from transport rather than buildings, but it illustrates the idea well. In the 1990s, Japan's bullet trains had a problem. When a train travelled through a tunnel at high speed, it pushed a wave of air ahead of it, and when it came out of the tunnel, there was a loud boom, which disturbed people living nearby.", q: [37] },
          { speaker: "Lecturer", voice: "f2", text: "One of the engineers, Eiji Nakatsu, was a keen birdwatcher, and he thought about the kingfisher, a bird that dives from the air into water with hardly a splash. The train's nose was redesigned to imitate the long, narrow shape of the kingfisher's beak.", q: [] },
          { speaker: "Lecturer", voice: "f2", text: "Not only was the new train quieter, but it also travelled faster. And because the trains are electric, we're obviously not talking about fuel here, but its electricity consumption fell by fifteen percent.", q: [38] },
          { speaker: "Lecturer", voice: "f2", text: "So, with so many successes, why isn't biomimicry used everywhere? Well, there are several challenges. Some critics argue that natural solutions don't always work at the scale of a building. But in my view, the main drawback at the moment is simply cost. Developing and testing new materials based on natural structures is expensive, and many construction companies are unwilling to take the financial risk.", q: [39] },
          { speaker: "Lecturer", voice: "f2", text: "There's also a problem of communication. Architects are already used to working closely with engineers, but to make real progress, they also need to work with biologists, who understand how natural systems actually function. Some universities are now creating joint courses for exactly this reason.", q: [40] },
          { speaker: "Lecturer", voice: "f2", text: "In the next lecture, we'll look at how these ideas are being applied to whole cities, rather than individual buildings.", q: [] }
        ],
        groups: [
          {
            type: "summary",
            kind: "gap",
            range: [31, 35],
            instruction: "Questions 31–35. Complete the summary below. Write ONE WORD ONLY for each answer.",
            title: "Learning from termites",
            wordLimit: "ONE WORD ONLY",
            content:
              '<div class="q-flow">' +
              '<p>Termite mounds in Africa keep an almost constant {{31}} inside, even when conditions outside change dramatically. ' +
              'Fresh air enters through small openings near the {{32}} of the mound, and warm air escapes through vents at the top.</p>' +
              '<p>The architect Mick Pearce used the same principles in the Eastgate Centre in Harare. At night, cool air is stored in the building\'s thick concrete {{33}}. ' +
              'During the day, warm air leaves through tall {{34}} on the roof. As a result, the building needs only about ten percent of the {{35}} used by a conventional building of the same size.</p>' +
              '</div>',
            answers: {
              "31": ["temperature"],
              "32": ["base"],
              "33": ["floors", "floor"],
              "34": ["chimneys"],
              "35": ["energy"]
            },
            explain: {
              "31": "'the inside of the mound stays at an almost constant temperature' → temperature.",
              "32": "'Fresh air is drawn in through small openings near the base of the mound' → base.",
              "33": "'this cool air is stored in the thick concrete floors' – bẫy: 'Many people assume it's the walls... but in fact it's the floors' → floors (không phải walls).",
              "34": "'the warm air rises and is pushed out through a row of tall chimneys on the roof' → chimneys.",
              "35": "'uses only about ten percent of the energy that a conventional building of the same size would need' → energy."
            }
          },
          {
            type: "note",
            kind: "gap",
            range: [36, 38],
            instruction: "Questions 36–38. Complete the notes below. Write ONE WORD ONLY for each answer.",
            title: "Other examples of biomimicry",
            wordLimit: "ONE WORD ONLY",
            content:
              '<div class="q-flow">' +
              '<p><strong>Lotus leaf</strong></p>' +
              '<ul><li>surface has tiny bumps coated with wax</li>' +
              '<li>water droplets roll off and carry {{36}} away</li>' +
              '<li>copied in self-cleaning paints and glass</li></ul>' +
              '<p><strong>Kingfisher and the bullet train</strong></p>' +
              '<ul><li>old train caused a loud {{37}} when leaving tunnels</li>' +
              '<li>nose redesigned to copy the shape of the bird\'s beak</li>' +
              '<li>new train: quieter, faster and used 15% less {{38}}</li></ul>' +
              '</div>',
            answers: {
              "36": ["dirt"],
              "37": ["boom"],
              "38": ["electricity"]
            },
            explain: {
              "36": "'the water forms droplets that roll off the leaf, carrying any dirt away with them' → dirt.",
              "37": "'when it came out of the tunnel, there was a loud boom' → boom.",
              "38": "Bẫy: 'we're obviously not talking about fuel here' (không phải fuel). 'its electricity consumption fell by fifteen percent' → electricity."
            }
          },
          {
            type: "short",
            kind: "gap",
            range: [39, 40],
            instruction: "Questions 39 and 40. Answer the questions below. Write NO MORE THAN TWO WORDS for each answer.",
            wordLimit: "NO MORE THAN TWO WORDS",
            content:
              '<div class="q-flow">' +
              '<p>What does the lecturer consider to be the main drawback of biomimicry at present? {{39}}</p>' +
              '<p>Which specialists does the lecturer say architects now need to work with? {{40}}</p>' +
              '</div>',
            answers: {
              "39": ["cost", "costs", "the cost", "high cost", "high costs"],
              "40": ["biologists", "biologist"]
            },
            explain: {
              "39": "Bẫy: 'Some critics argue that natural solutions don't always work at the scale of a building' – đó là ý kiến của người khác. Quan điểm giảng viên: 'in my view, the main drawback at the moment is simply cost' → cost.",
              "40": "Bẫy: 'Architects are already used to working closely with engineers' (đã làm rồi). 'they also need to work with biologists' → biologists."
            }
          }
        ]
      }
    ]
  });
})();
