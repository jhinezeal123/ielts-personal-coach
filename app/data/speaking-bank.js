/*
 * IELTS Coach — Speaking bank (owner: S)
 * Sets window.IELTS.data.speaking. Pure data: no core calls at load time.
 *
 * Schema
 * IELTS.data.speaking = {
 *   forecast: { period, updated: "YYYY-MM", note },      // label for the forecast set (app-compiled, not real exam questions)
 *   guides: {                                             // Vietnamese answer-structure guides (HTML allowed)
 *     part1|part2|part3: {
 *       title, duration, summary,
 *       structure: [ { step, desc } ],                      // answer framework, in order
 *       timing: [ "..." ],                                  // timing tips
 *       dos: [ "..." ], donts: [ "..." ]
 *     }
 *   },
 *   topics: [ {
 *     id: "sp-01", title (English), titleVi, tag: "forecast"|"evergreen",
 *     topic: one of SPEC §6.6 TOPICS,
 *     part1: { name, questions: [ { q, sample } x4–5 ] },
 *     part2: { cue: "Describe ...", bullets: ["You should say:", 4 points incl. "and explain ..."],
 *              notes: ["keyword notes for 1-minute prep"], sample },   // sample 250–320 words, paragraphs separated by "\n\n"
 *     part3: [ { q, sample } x3–4 ]
 *   } x20 ]
 * }
 *
 * Phrase markup inside every sample: [[phrase|nghĩa tiếng Việt]]
 *   → rendered as <span class="phrase">phrase</span> <span class="gloss">(nghĩa tiếng Việt)</span>
 *   3–7 markers per sample. Phrase text must not contain "|" or "]]".
 */
(function () {
  "use strict";
  var IELTS = (window.IELTS = window.IELTS || {});
  IELTS.data = IELTS.data || {};

  var forecast = {
    period: "Tháng 9 – Tháng 12/2026",
    updated: "2026-10",
    note: "Bộ đề dự đoán do app biên soạn dựa trên các chủ đề thường xuất hiện — tham khảo để luyện tập, không phải đề thi thật được xác nhận."
  };

  var guides = {
    part1: {
      title: "Part 1 — Giới thiệu & phỏng vấn",
      duration: "4–5 phút · 2–3 chủ đề quen thuộc · mỗi câu trả lời khoảng 15–30 giây (2–4 câu)",
      summary: "Giám khảo hỏi về bản thân, công việc/học tập, nơi ở và vài chủ đề đời thường. Mục tiêu là trả lời <b>thẳng, tự nhiên và có mở rộng</b> — không cụt lủn kiểu “Yes, I do.”, cũng không biến thành bài nói dài.",
      structure: [
        { step: "Answer", desc: "Trả lời thẳng ngay câu đầu: <i>Yes, quite a lot actually… / Not really, to be honest… / It depends…</i>" },
        { step: "Reason", desc: "Giải thích vì sao bằng 1 câu: <i>mainly because… / the thing is…</i>" },
        { step: "Example / Detail", desc: "Thêm một chi tiết cụ thể: thói quen, ví dụ cá nhân, hoặc so sánh quá khứ – hiện tại (<i>When I was a kid… but now…</i>)." }
      ],
      timing: [
        "Mỗi câu 2–4 câu nói là vừa; giám khảo sẽ chuyển câu nếu bạn nói quá dài.",
        "Ngập ngừng tự nhiên được phép — dùng <i>Well… / Let me think…</i> thay vì im lặng."
      ],
      dos: [
        "Dùng thì đúng theo câu hỏi (Do you…? → hiện tại; Did you… as a child? → quá khứ).",
        "Paraphrase từ khoá trong câu hỏi thay vì lặp lại y nguyên.",
        "Nói về trải nghiệm thật của bạn — chi tiết thật nghe tự nhiên hơn."
      ],
      donts: [
        "Không học thuộc nguyên câu trả lời mẫu — giám khảo nhận ra ngữ điệu “đọc bài”.",
        "Không chêm thành ngữ sáo rỗng (raining cats and dogs, piece of cake…).",
        "Không hỏi lại giám khảo ý kiến của họ."
      ]
    },
    part2: {
      title: "Part 2 — Cue card (bài nói dài)",
      duration: "3–4 phút · 1 phút chuẩn bị + nói 1–2 phút (giám khảo dừng ở 2:00)",
      summary: "Bạn nhận một cue card với 3–4 gạch đầu dòng. Hãy coi đó là <b>một câu chuyện có mở – thân – kết</b>, kể trôi chảy trong gần trọn 2 phút. Phần <i>“and explain…”</i> là nơi thể hiện từ vựng và cảm xúc, nên dành thời gian nhiều nhất.",
      structure: [
        { step: "1 phút ghi chú", desc: "Chỉ ghi keyword theo từng gạch đầu dòng (5–8 từ khoá), kèm 1–2 cụm từ hay muốn dùng. Không viết câu hoàn chỉnh." },
        { step: "Mở bài (10–15s)", desc: "Giới thiệu thẳng đối tượng: <i>I'd like to talk about…</i> + 1 chi tiết bối cảnh." },
        { step: "Kể chuyện (60–80s)", desc: "Đi theo trình tự thời gian: bối cảnh → diễn biến → chi tiết giác quan/cảm xúc. Dùng từ nối kể chuyện: <i>At first… Then… At one point… In the end…</i>" },
        { step: "Kiểm soát thì", desc: "Chuyện đã qua dùng quá khứ đơn/tiếp diễn/hoàn thành (<i>I'd been planning…</i>); nhận xét hiện tại dùng hiện tại (<i>Looking back, I think…</i>)." },
        { step: "Explain (30–40s)", desc: "Giải thích lý do/cảm xúc, có thể nêu bài học hoặc so sánh hiện tại — đây là phần ăn điểm Lexical Resource nhất." }
      ],
      timing: [
        "Mục tiêu nói ít nhất 1:40 — nếu hết ý, thêm ví dụ, so sánh, hoặc cảm nghĩ hiện tại.",
        "Nếu giám khảo cắt lời ở 2:00 là chuyện bình thường, không bị trừ điểm."
      ],
      dos: [
        "Kể chuyện cụ thể (một lần, một người, một nơi) thay vì nói chung chung.",
        "Thêm chi tiết nhỏ (âm thanh, mùi, câu ai đó đã nói) để câu chuyện sống động.",
        "Liếc ghi chú để giữ mạch, rồi nhìn giám khảo khi nói."
      ],
      donts: [
        "Không đọc lại nguyên các gạch đầu dòng như một danh sách.",
        "Không dừng ở 1 phút rồi im lặng chờ.",
        "Không đổi chủ đề sang câu chuyện đã học thuộc nhưng không khớp đề."
      ]
    },
    part3: {
      title: "Part 3 — Thảo luận mở rộng",
      duration: "4–5 phút · câu hỏi trừu tượng mở rộng từ chủ đề Part 2 · mỗi câu 40–60 giây",
      summary: "Câu hỏi chuyển từ <b>trải nghiệm cá nhân sang xã hội</b>: so sánh, nguyên nhân, dự đoán, đánh giá. Giám khảo muốn thấy bạn lập luận, cân nhắc hai mặt và dùng cấu trúc phức tạp một cách tự nhiên.",
      structure: [
        { step: "Opinion", desc: "Nêu quan điểm rõ ràng: <i>I'd argue that… / On the whole, I think…</i>" },
        { step: "Reason", desc: "Giải thích bằng 1–2 lý do có logic: <i>The main reason is… / Part of it is…</i>" },
        { step: "Example", desc: "Ví dụ cụ thể về Việt Nam, thành phố của bạn, hoặc xu hướng chung: <i>In Vietnam, for instance…</i>" },
        { step: "Contrast / Speculation", desc: "Cân nhắc mặt kia hoặc dự đoán: <i>That said… / On the other hand… / I suspect that in the future…</i>" }
      ],
      timing: [
        "40–60 giây/câu; câu hỏi khó thì mua thời gian: <i>That's an interesting question — I've never really thought about it, but…</i>",
        "Không cần đúng “sự thật”, chỉ cần lập luận hợp lý."
      ],
      dos: [
        "Nói về “people/society” thay vì chỉ kể chuyện bản thân.",
        "Dùng câu điều kiện, mệnh đề quan hệ, bị động một cách tự nhiên.",
        "Thể hiện mức độ chắc chắn: <i>probably, I doubt, it's likely that…</i>"
      ],
      donts: [
        "Không trả lời một câu rồi dừng — luôn có lý do và ví dụ.",
        "Không liệt kê “Firstly, secondly, thirdly” như văn viết.",
        "Không né câu hỏi bằng “I don't know” mà không giải thích."
      ]
    }
  };

  var topics = [];

  /* ---------------------------------------------------------------- FORECAST */

  topics.push({
    id: "sp-01", title: "A person who helps others", titleVi: "Người hay giúp đỡ người khác",
    tag: "forecast", topic: "society",
    part1: {
      name: "Neighbours",
      questions: [
        { q: "Do you know your neighbours well?",
          sample: "Not as well as I'd like, to be honest. I live in an apartment block in Hanoi, and most people are [[out and about|ra ngoài, bận đi lại]] all day, so we mostly just [[exchange a few words|trao đổi vài câu]] in the lift. That said, there's an elderly couple next door I've [[got to know|dần quen biết]] quite well, because they often ask me to help with their phone." },
        { q: "How often do you see your neighbours?",
          sample: "Pretty much every day, though usually only [[in passing|thoáng qua]]. We [[bump into each other|tình cờ gặp nhau]] by the lift or in the car park. At weekends it's a bit different, because families hang out downstairs while their kids play, so that's when we actually [[have a proper chat|trò chuyện đàng hoàng]]." },
        { q: "Have your neighbours ever helped you?",
          sample: "Yes, quite a few times actually. The one that [[springs to mind|chợt nghĩ đến ngay]] is when I [[locked myself out|bị khoá ngoài (quên chìa trong nhà)]] last year. My neighbour let me wait in her flat while I called a locksmith. It was only a [[small gesture|cử chỉ nhỏ]], but it [[meant a lot to me|có ý nghĩa lớn với tôi]]." },
        { q: "Do you think neighbours are as close as they used to be?",
          sample: "Not really, especially in big cities. When my parents were young, people [[popped round|ghé qua chơi]] to each other's houses all the time and kids grew up together. These days we're all [[glued to our screens|dán mắt vào màn hình]] and tend to [[keep ourselves to ourselves|sống khép kín, ít giao du]], so that sense of community has faded a little." }
      ]
    },
    part2: {
      cue: "Describe a person you know who often helps others.",
      bullets: ["You should say:", "who this person is", "how you know him or her", "what kind of help he or she gives", "and explain why you think this person likes helping others"],
      notes: ["aunt Lan – retired nurse", "the 'go-to' person on her street", "free blood-pressure checks, lifts to hospital", "pandemic: grocery deliveries", "why: grew up poor, neighbours paid school fees", "her kindness spreads"],
      sample: [
        "The person I'd like to talk about is my aunt Lan, my mum's older sister. She was a nurse for nearly thirty years, and although she retired a couple of years ago, she's probably busier now than when she was working.",
        "I've known her all my life, of course, but I've only really [[come to appreciate|dần trân trọng, nhận ra giá trị]] what she does since I moved closer to her neighbourhood for university. She's basically the [[go-to person|người ai cũng tìm đến]] on her street. If a child has a fever in the middle of the night, the parents knock on her door. If an elderly neighbour needs to get to hospital, she'll drive them there and wait with them for hours.",
        "The help she gives is mostly practical. She checks people's blood pressure for free, explains prescriptions that busy doctors rushed through, and during the pandemic she organised a little group that delivered groceries to families who were self-isolating. She never [[makes a fuss about|làm to chuyện, kể lể về]] it, though — you only find out from other people.",
        "As for why she does it, I think it [[goes back to|bắt nguồn từ]] her childhood. Her family was quite poor, and she's often told me that the neighbours [[chipped in|góp tiền, góp sức]] to pay her school fees. So in a way, she feels she's [[paying it forward|đền đáp bằng cách giúp lại người khác]]. I also think she simply enjoys feeling useful.",
        "What strikes me most is that her kindness seems to [[rub off on|lan sang, ảnh hưởng đến]] the people around her. A few younger neighbours have started doing similar things, and honestly, she's made me want to be more generous with my own time."
      ].join("\n\n")
    },
    part3: [
      { q: "Why do some people enjoy helping others more than others do?",
        sample: "I think it's partly personality and partly upbringing. Some people are naturally more empathetic — they [[pick up on|nhận ra, để ý thấy]] other people's feelings very quickly. But I'd argue the way you're raised matters even more. If your parents [[set an example|làm gương]] by volunteering or looking after relatives, helping becomes [[second nature|thói quen tự nhiên như bản năng]]. On the other hand, people under a lot of financial pressure may simply not have the time or energy, which isn't the same as being selfish." },
      { q: "Should schools teach children to help others?",
        sample: "Definitely, although I'm not sure it can be taught [[in the usual sense|theo nghĩa thông thường]]. You can't just give a lecture on kindness and expect results. What works better, I think, is [[hands-on|thực hành, trực tiếp làm]] experience — community projects, or older students mentoring younger ones. That way children see [[first-hand|tận mắt, trực tiếp]] the difference they can make. The risk is that if it's compulsory and graded, it becomes [[a box-ticking exercise|việc làm cho có, chiếu lệ]] rather than something kids genuinely care about." },
      { q: "Do you think people today are less willing to help strangers than in the past?",
        sample: "It's tempting to say yes, but I'm not convinced. People are certainly more cautious, especially in cities where you hear stories about scams, so they might [[think twice|cân nhắc kỹ]] before stopping to help someone. However, technology has opened up new ways of helping. Crowdfunding campaigns, for instance, can raise huge amounts for a stranger's medical bills [[within days|chỉ trong vài ngày]]. So rather than becoming less generous, I'd say people now help [[from a distance|từ xa]] more than face to face." }
    ]
  });

  topics.push({
    id: "sp-02", title: "A time you were very busy", titleVi: "Khoảng thời gian rất bận rộn",
    tag: "forecast", topic: "work",
    part1: {
      name: "Being busy",
      questions: [
        { q: "Are you usually busy?",
          sample: "Most days, yes. I'm in my final year at university and I also do some part-time tutoring, so I'm [[juggling|xoay xở cùng lúc nhiều việc]] quite a lot. Weekdays are pretty [[packed|kín lịch]], but I try to keep Sundays free so I don't [[burn out|kiệt sức]]." },
        { q: "What do you do when you feel too busy?",
          sample: "The first thing I do is write everything down, because when it's all in my head it feels much worse than it actually is. Then I [[prioritise|sắp xếp thứ tự ưu tiên]] — I work out what genuinely has to be done today and what [[can wait|chưa gấp, để sau được]]. And sometimes I just say no to things, which I had to [[learn the hard way|học được qua trải nghiệm đắt giá]]." },
        { q: "Do you prefer being busy or having free time?",
          sample: "A bit of both, really. If I have nothing to do for too long, I [[get restless|thấy bồn chồn]] and end up scrolling on my phone all day. A moderately busy schedule [[keeps me on my toes|giữ cho tôi luôn tỉnh táo, năng động]]. But when I'm [[snowed under|ngập đầu trong công việc]] for weeks, I start to [[crave|thèm, khao khát]] a lazy weekend." },
        { q: "Were you busier as a child than you are now?",
          sample: "Definitely not. As a kid, my life [[revolved around|xoay quanh]] school and playing with my cousins. I did have extra classes in the evening, which was pretty normal in Vietnam, but I never had to worry about bills or deadlines. [[Looking back|Nhìn lại]], I had no idea [[how easy I had it|mình từng sướng đến mức nào]]." }
      ]
    },
    part2: {
      cue: "Describe a time when you were very busy.",
      bullets: ["You should say:", "when it was", "what you had to do", "how you managed your time", "and explain how you felt about being so busy"],
      notes: ["last December", "3 exams in 5 days + 2 IELTS students", "cousin's wedding – invitations, decorations", "whiteboard plan, 25-min blocks, no social media", "felt: exhausted → proud", "lesson: ask for help sooner"],
      sample: [
        "I'm going to talk about last December, which was probably the most [[hectic|tất bật, bận rộn]] month I've ever had.",
        "There were three things going on at once. First, I had end-of-term exams — three of them [[crammed into|dồn vào, nhồi vào]] five days. On top of that, two of the students I tutor were about to take IELTS, so they wanted extra lessons. And then, to [[top it all off|thêm vào đó nữa (cái cuối cùng)]], my cousin was getting married, and since I'm good at design, I'd promised to make the invitations and help decorate.",
        "To be honest, for the first few days I didn't manage my time well at all. Then I sat down and planned every single day on a whiteboard. I worked in short, focused blocks of about twenty-five minutes, deleted social media from my phone for a while, and did the wedding jobs late at night, when I was too tired to revise anyway. I also moved a couple of tutoring sessions online, which saved me hours of travelling. My students didn't mind at all, which was a real relief.",
        "As for how I felt, it was a mixture. At the time I was exhausted and pretty irritable — my family will [[vouch for|xác nhận, làm chứng cho]] that. But once it was over, I felt genuinely proud, because I'd done well in my exams, both students got the scores they needed, and the wedding looked beautiful.",
        "[[The main lesson I took away|Bài học chính tôi rút ra]] was that I should [[reach out for help|chủ động nhờ giúp đỡ]] sooner. I tried to do everything myself, when my sister would happily have helped if I'd asked."
      ].join("\n\n")
    },
    part3: [
      { q: "Why do people today seem busier than in the past?",
        sample: "I think a big part of it is technology. In the past, when you left the office, work stayed there. Now, because everyone has a smartphone, work emails [[follow you home|theo bạn về tận nhà]], so the line between work and personal life has [[blurred|trở nên mờ nhạt]]. There's also more pressure to [[keep up with|theo kịp]] other people — taking extra courses, side jobs and so on — partly because social media makes it look as if everyone else is constantly achieving something." },
      { q: "Is it good for children to have very busy schedules?",
        sample: "Up to a point. Activities like music or sport teach discipline and help kids find out what they're good at. But I think many parents [[go overboard|làm quá đà]]. Some children in Vietnam have extra classes almost every evening, and they [[miss out on|bỏ lỡ]] free, unstructured play, which is actually crucial for creativity. Kids need time to be bored, [[strange as it sounds|nghe thì lạ nhưng]]." },
      { q: "How can companies help employees who are overworked?",
        sample: "The most effective thing is probably flexible working — letting people choose their hours or work from home a couple of days a week. That gives them more [[breathing space|khoảng thở]]. Managers could also be more realistic about deadlines rather than expecting staff to be available [[around the clock|suốt ngày đêm]]. Some countries have even introduced a 'right to disconnect' law, and I think that's [[a step in the right direction|một bước đi đúng hướng]], although it would be hard to enforce everywhere." }
    ]
  });

  topics.push({
    id: "sp-03", title: "A useful app", titleVi: "Một ứng dụng hữu ích",
    tag: "forecast", topic: "technology",
    part1: {
      name: "Mobile phones & apps",
      questions: [
        { q: "What apps do you use most often?",
          sample: "Probably Zalo, a messaging app that almost everyone in Vietnam uses to [[keep in touch|giữ liên lạc]], even for work. Apart from that, I use a banking app several times a day, because hardly anyone carries cash [[these days|ngày nay]]. And I [[can't live without|không thể thiếu]] Google Maps when I'm in a part of the city I don't know." },
        { q: "Have you ever deleted an app? Why?",
          sample: "Yes, I deleted TikTok last year. I realised I was spending around two hours a day on it without even noticing — it's [[incredibly addictive|gây nghiện kinh khủng]]. I'd open it 'just for five minutes' and then [[lose track of time|quên mất thời gian]] completely. Since deleting it, I've [[got a lot more done|làm được nhiều việc hơn hẳn]] in the evenings." },
        { q: "Do you prefer using apps or websites?",
          sample: "For most things, apps, because they're quicker and [[more user-friendly|dễ sử dụng hơn]] on a phone. That said, for anything that involves comparing lots of information, like booking a hotel, I'd [[rather|thích hơn]] use a laptop, since I can [[have several tabs open|mở nhiều tab cùng lúc]]." },
        { q: "Would you like to create an app in the future?",
          sample: "It'd be nice, although I don't have the technical skills at the moment. If I could, I'd make something to help Vietnamese students find [[study buddies|bạn học cùng]] for exams like IELTS. Lots of people [[struggle to|gặp khó khăn trong việc]] stay motivated on their own, and practising speaking with a partner [[makes a huge difference|tạo ra khác biệt lớn]]." }
      ]
    },
    part2: {
      cue: "Describe an app that you find very useful.",
      bullets: ["You should say:", "what the app is", "how you found out about it", "what you use it for", "and explain why you find it so useful"],
      notes: ["Anki – flashcard app", "friend at uni, 2nd year", "IELTS vocab, 20 mins on the bus", "spaced repetition – card just before you forget", "fits dead time, weak spots", "downside: dull design, settings"],
      sample: [
        "The app I'd like to describe is Anki, which is a flashcard app for memorising things — vocabulary, formulas, anything really.",
        "I first heard about it in my second year at university. A friend of mine had an amazing memory for English words, and when I asked her what her secret was, she showed me this rather old-fashioned-looking app on her phone. I downloaded it that evening, and I've used it almost every day since.",
        "At the moment I mainly use it for IELTS vocabulary. Whenever I [[come across|tình cờ bắt gặp]] a useful expression in a podcast or an article, I add it to a card with an example sentence. Then I review my cards for about twenty minutes on the bus to university, so it's a great way to [[make use of|tận dụng]] time that would otherwise be wasted.",
        "The reason it's so useful is that it's based on something called spaced repetition. Basically, the app [[keeps track of|theo dõi]] which words you find difficult and shows you each card just before you're likely to forget it. So instead of [[going over|ôn lại]] the whole list again and again, you focus on your weak spots. I was sceptical at first, but after a few months I noticed I was using these words in conversation without having to think.",
        "If I had to criticise it, I'd say the design is pretty dull, and it takes a while to [[get the hang of|quen tay, nắm được cách dùng]] the settings. But honestly, that's [[a small price to pay|cái giá nhỏ, đáng chấp nhận]]. It's probably done more for my vocabulary than any textbook I've bought, and it's free on most devices, which is [[a real bonus|một điểm cộng thật sự]]."
      ].join("\n\n")
    },
    part3: [
      { q: "Why are some apps so addictive?",
        sample: "Mainly because they're designed to be. Tech companies employ psychologists to work out what keeps us scrolling — endless feeds and notifications that give you a little [[rush of excitement|cảm giác phấn khích chớp nhoáng]]. The rewards are unpredictable, a bit like a slot machine, so you keep checking [[just in case|phòng khi]] something interesting has appeared. Their business model depends on our attention, so it's not really a [[level playing field|sân chơi cân bằng]] between users and these companies." },
      { q: "Do you think older people find it hard to use apps?",
        sample: "Some do, but I think it's less about age and more about [[exposure|mức độ tiếp xúc]]. My grandmother, for example, picked up video calling very quickly during the pandemic because she wanted to see her grandchildren. Where older people struggle is when apps are cluttered or the text is tiny. If designers [[kept them in mind|lưu tâm đến họ]], with bigger buttons and simpler menus, I'm sure far more elderly people would [[get on board|tham gia, chấp nhận dùng]]." },
      { q: "Will apps replace traditional services such as banks and shops?",
        sample: "To a large extent, they already have. In Vietnam, most young people [[do their banking|giao dịch ngân hàng]] entirely through apps, and delivery apps have changed how people eat. Having said that, I don't think physical places will [[disappear altogether|biến mất hoàn toàn]]. People still want face-to-face advice for big decisions like a mortgage, and shopping is partly a social activity. I imagine apps will handle routine things while branches focus on [[personal service|dịch vụ cá nhân hoá]]." }
    ]
  });

  topics.push({
    id: "sp-04", title: "A place in your city you like", titleVi: "Một nơi bạn thích trong thành phố",
    tag: "forecast", topic: "urban",
    part1: {
      name: "Your city & going out",
      questions: [
        { q: "Do you like the city you live in?",
          sample: "On the whole, yes. Hanoi can be [[chaotic|hỗn loạn]] — the traffic and the pollution are hard to ignore — but it has so much character, and the food is fantastic. I suppose it's one of those places you [[complain about|phàn nàn về]] all the time but [[miss terribly|nhớ da diết]] when you leave." },
        { q: "Where do you usually go when you go out?",
          sample: "Usually a café, to be honest. Café culture is [[a big thing|rất thịnh hành]] in Vietnam, so meeting friends normally means sitting somewhere over coffee for a couple of hours. If we [[fancy|muốn, thích]] something more active, we might go for a walk around West Lake in the evening, once it's [[cooled down|dịu mát]] a bit." },
        { q: "Is there anything you would like to change about your city?",
          sample: "I'd love there to be more green space. A lot of old gardens have [[given way to|nhường chỗ cho]] apartment blocks and shopping centres. I'd also improve public transport — the new metro lines are a good start, but most people still rely on motorbikes, which [[adds to|làm tăng thêm]] the congestion. Ideally, Hanoi would be more [[pedestrian-friendly|thân thiện với người đi bộ]] as well." },
        { q: "Do you think your city is a good place for young people?",
          sample: "I'd say so. There are plenty of universities and job opportunities, especially in tech, and young people have lots of [[options for entertainment|lựa chọn giải trí]], from live music to street food. The downside is that rent has [[shot up|tăng vọt]] recently, so a lot of graduates [[struggle to make ends meet|chật vật xoay xở chi tiêu]] at first." }
      ]
    },
    part2: {
      cue: "Describe a place in your city where you like to spend your free time.",
      bullets: ["You should say:", "where it is", "how often you go there", "what you do there", "and explain why you like spending time there"],
      notes: ["café-bookshop, side street, Old Quarter", "found by chance – rainstorm", "every Saturday morning", "borrow books, study, chat with owner (retired teacher)", "quiet, old French building, plants", "personal – owner remembers my order"],
      sample: [
        "I'd like to talk about a little café-bookshop in the Old Quarter of Hanoi. It's [[tucked away|nằm khuất, ẩn mình]] down a narrow side street, so most tourists walk straight past it without noticing.",
        "I discovered it [[by chance|tình cờ]] about two years ago, when I was trying to escape a sudden downpour. Since then, I've gone there almost every Saturday morning — it's become a bit of a ritual for me.",
        "The place is on the second floor of an old French colonial building, and it's full of second-hand books in Vietnamese and English. You can borrow any book while you're there, so I usually order a coconut coffee, pick something random off the shelves and [[lose myself in|đắm chìm vào]] it for a couple of hours. Sometimes I study, and the owner, a retired literature teacher, often comes over for a chat. She's [[introduced me to|giới thiệu cho tôi biết đến]] some brilliant writers I'd never have found on my own.",
        "The main reason I love it is that it's an [[oasis of calm|ốc đảo yên bình]] in a very noisy city. Downstairs the traffic never stops, but once you climb the stairs, all you can hear is soft jazz and the fan turning. There are plants everywhere, and the light coming through the old wooden shutters is beautiful.",
        "I think it also [[appeals to me|hấp dẫn tôi]] because it feels personal. Big chain cafés are comfortable, but they all look the same. Here, the owner remembers my order and asks how my exams are going. It sounds a bit sentimental, but it genuinely feels like a [[home away from home|ngôi nhà thứ hai]]."
      ].join("\n\n")
    },
    part3: [
      { q: "What kinds of public places are popular with young people in your country?",
        sample: "Cafés, without a doubt. They're [[affordable|vừa túi tiền]], you can stay for hours, and many of them have a strong identity — some are designed for studying, others for taking photos. Shopping malls are popular too, partly because they're air-conditioned, which [[counts for a lot|rất đáng giá]] in a Vietnamese summer. Recently, pedestrian streets that close to traffic at weekends have really [[taken off|trở nên thịnh hành]] as well." },
      { q: "Should cities spend more money on public spaces such as parks?",
        sample: "I strongly believe they should. Parks aren't a luxury — they have real benefits for both physical and mental health. They give people somewhere to exercise and simply [[get some fresh air|hít thở không khí trong lành]], which matters even more for people living in small flats. The problem is that land in city centres is [[extremely valuable|cực kỳ đắt giá]], so there's always pressure to build on it. Governments need to [[take a long-term view|nhìn xa trông rộng]], because once a green space is gone, you rarely get it back." },
      { q: "How have city centres changed in recent years?",
        sample: "In Hanoi, the centre has become much more commercial. Lots of family-run shops have been replaced by international brands and [[chain stores|chuỗi cửa hàng]]. On the positive side, there's been a real effort to preserve historic areas and make them more [[walkable|dễ đi bộ]]. I'd guess that in future, centres will focus more on experiences — food, culture, events — because people can buy almost anything online. Shops that offer nothing but products will probably [[struggle to survive|chật vật để tồn tại]]." }
    ]
  });

  topics.push({
    id: "sp-05", title: "A skill learned online", titleVi: "Một kỹ năng học được trên mạng",
    tag: "forecast", topic: "education",
    part1: {
      name: "Online learning",
      questions: [
        { q: "Have you ever taken an online course?",
          sample: "Yes, several. The most recent one was a course on data analysis in Excel, which I did through Coursera. It was [[self-paced|tự học theo tốc độ riêng]], so I could [[fit it around|sắp xếp xen vào]] my classes. It was really practical, and it's [[come in handy|hoá ra hữu ích]] for my university projects." },
        { q: "Do you prefer learning online or in a classroom?",
          sample: "It depends on what I'm learning. For technical skills, online is great, because I can pause the video and [[rewind|tua lại]] as many times as I need. But for languages, I much prefer a classroom, because I need [[real-time|tức thì, trực tiếp]] interaction and someone to [[pick up on|nhận ra]] my mistakes straight away." },
        { q: "What are the disadvantages of learning online?",
          sample: "The biggest one for me is motivation. When there's no teacher [[keeping an eye on|để mắt đến]] you, it's very easy to put things off. I've signed up for quite a few courses that I never finished, [[I'm ashamed to say|nói ra thì xấu hổ]]. Also, staring at a screen for hours is tiring, and you [[miss out on|bỏ lỡ]] the social side of studying." },
        { q: "Do you think online learning will become more popular in the future?",
          sample: "I'm fairly sure it will, especially for adults who need to [[upskill|nâng cao kỹ năng]] while they're working, because it's cheaper and more flexible. But I don't think it'll replace schools for children, since school isn't just about [[acquiring knowledge|tiếp thu kiến thức]] — it's where kids learn to [[get along with|hoà hợp với]] other people." }
      ]
    },
    part2: {
      cue: "Describe a skill you learned from the internet.",
      bullets: ["You should say:", "what the skill is", "how you learned it", "how long it took you to learn it", "and explain how you feel about this skill"],
      notes: ["video editing", "started: family trip to Da Lat, video for grandparents", "YouTube tutorials → professional software", "trial and error, online forums", "~3 months for basics, still learning", "proud, creative outlet, maybe income"],
      sample: [
        "A skill I learned entirely from the internet is video editing. Before I started, I had no idea how editing software worked, but now I'm reasonably confident with it.",
        "It all started about eighteen months ago, when my family went on a trip to Da Lat. I'd filmed loads of clips on my phone, and I wanted to turn them into a short video for my grandparents. I found a beginner's tutorial on YouTube, and I was [[hooked|bị cuốn hút, mê]] almost immediately. After that I watched dozens of videos, starting with simple phone apps and later [[moving on to|chuyển sang]] more professional software.",
        "My approach was mostly [[trial and error|thử và sai]]. I'd watch a tutorial, try to copy the technique on my own footage, get it wrong, and then go back and watch it again. Whenever I got stuck, I'd post a question on a forum, and people were surprisingly helpful. It took me roughly three months to [[get to grips with|nắm vững, làm chủ]] the basics — cutting, adding music, colour correction — but I'm still learning new things all the time.",
        "I feel really proud of it, partly because I learned it [[off my own bat|tự mình chủ động, không ai bảo]], without paying for a course. It's also become a creative outlet; when I'm stressed about exams, an evening of editing helps me [[switch off|thư giãn, tạm gác mọi thứ]]. These days I edit videos for my university's music club, and a couple of people have even offered to pay me for small projects. So something that began as a hobby could actually [[turn into|trở thành]] a source of income, which I never expected."
      ].join("\n\n")
    },
    part3: [
      { q: "What skills do you think are most important for young people today?",
        sample: "Apart from the obvious ones like digital literacy and English, I'd say adaptability is crucial. The job market is changing so fast that many of the jobs young people will do [[don't even exist yet|thậm chí còn chưa tồn tại]]. So the ability to learn quickly matters more than any single skill. Communication is [[underrated|bị đánh giá thấp]] too — you can be brilliant technically, but if you can't [[get your ideas across|truyền đạt ý tưởng]], it holds you back." },
      { q: "Is it better to learn skills from the internet or from a teacher?",
        sample: "Both have their strengths. The internet is unbeatable for [[breadth|độ phong phú, bề rộng]] — you can learn almost anything for free, at any time. But a good teacher gives you something a video can't: personalised feedback. They can spot bad habits [[before they set in|trước khi chúng thành thói quen]]. I think the ideal is to combine the two — use online resources for the basics and then get an expert to [[fine-tune|tinh chỉnh]] your technique." },
      { q: "How can people tell whether information online is reliable?",
        sample: "It's getting harder, honestly, especially with AI-generated content. A good [[rule of thumb|nguyên tắc chung theo kinh nghiệm]] is to check who's behind the information — a recognised organisation or an anonymous account? It's also worth [[cross-checking|đối chiếu chéo]] with a few different sources. And if something seems [[too good to be true|tốt đến mức khó tin]], it usually is. Schools should teach this explicitly, because many people simply [[take things at face value|tin ngay vào vẻ bề ngoài]]." }
    ]
  });

  topics.push({
    id: "sp-06", title: "A noisy place", titleVi: "Một nơi ồn ào",
    tag: "forecast", topic: "health",
    part1: {
      name: "Noise",
      questions: [
        { q: "Do you mind noise?",
          sample: "It depends on the kind of noise. I can [[tune out|lờ đi, không để tâm]] traffic quite easily, because I grew up with it in Hanoi. But sudden noises, like drilling from a construction site, really [[get on my nerves|làm tôi bực mình]]. And I [[can't stand|không chịu nổi]] it when someone nearby is having a loud phone conversation." },
        { q: "What kinds of noise do you hear where you live?",
          sample: "Mostly motorbikes and car horns — they're pretty much [[constant|liên tục]] from early morning until late at night. My building is also next to a market, so from about five a.m. you can hear vendors [[setting up their stalls|dọn hàng, bày sạp]]. Oh, and karaoke! Some of my neighbours love singing at weekends, [[whether you like it or not|dù bạn có thích hay không]]." },
        { q: "Do you think cities are noisier now than in the past?",
          sample: "In Vietnam, definitely. There are [[far more|nhiều hơn hẳn]] vehicles than twenty years ago, and construction is [[going on everywhere|diễn ra khắp nơi]]. On the other hand, electric motorbikes are becoming more common, and they're much quieter, so things may [[take a turn for the better|chuyển biến tốt lên]] in the next decade." },
        { q: "Do you prefer a quiet or a lively place?",
          sample: "For studying or sleeping, quiet, obviously. But I wouldn't want to live somewhere [[completely silent|hoàn toàn tĩnh lặng]] — I spent a week in the countryside once and found it a bit [[eerie|rờn rợn]] at night. I suppose I like a place with a [[gentle buzz|chút nhộn nhịp vừa phải]] — lively enough to feel alive, but where I can still [[hear myself think|đủ yên để suy nghĩ]]." }
      ]
    },
    part2: {
      cue: "Describe a time when you were in a noisy place.",
      bullets: ["You should say:", "where you were", "when you were there", "what caused the noise", "and explain how you felt about being there"],
      notes: ["Lunar New Year's Eve, Hoan Kiem Lake", "with 3 cousins", "crowds, horns, live stages, fireworks", "got separated – texting, hand signals", "overwhelmed → won over, togetherness", "ears ringing – once is enough"],
      sample: [
        "I'd like to describe Lunar New Year's Eve a couple of years ago, when I went to watch the fireworks near Hoan Kiem Lake in the centre of Hanoi.",
        "I went with three of my cousins. We'd heard it would be crowded, but nothing prepared us for how loud it was. By about ten o'clock, the streets around the lake were [[packed with|chật kín]] people, and there were motorbikes everywhere, horns [[blaring|inh ỏi]]. Several stages had been set up with live music, and each one seemed to be competing to be the loudest. Then at midnight the fireworks started, and the noise was [[deafening|điếc tai]] — you could feel each explosion in your chest.",
        "At one point we got separated, and trying to find each other was almost comical. Phone calls were useless because we couldn't hear a word, so we ended up texting and using hand signals once we spotted each other.",
        "As for how I felt, it was a bit of a [[rollercoaster|cảm xúc lên xuống thất thường]]. For the first hour I felt quite overwhelmed — I'm not a big fan of crowds, and the constant noise made me tense. But once the fireworks began, the atmosphere [[won me over|chinh phục tôi]]. Everyone was cheering and wishing strangers a happy new year, and there was an incredible sense of togetherness.",
        "Looking back, I'm glad I went, because it's one of those experiences you should have at least once. But when we finally got home at two in the morning, my ears were ringing and I [[craved|thèm khát]] silence. So it was a great night, but I'd say [[once is enough|một lần là đủ]] for me."
      ].join("\n\n")
    },
    part3: [
      { q: "How does noise pollution affect people's health?",
        sample: "More than most people realise. The obvious effect is on sleep — if you're woken up repeatedly by traffic, it [[takes its toll|gây hại dần dần]] over time, and that affects your concentration and mood. There's also research linking long-term exposure to loud noise with stress and even heart problems. And people who work in noisy environments, like construction workers, are [[at risk of|có nguy cơ bị]] [[hearing loss|mất thính lực]] if they don't wear proper protection." },
      { q: "What can governments do to reduce noise in cities?",
        sample: "There are quite a few options. They could [[crack down on|mạnh tay xử lý]] unnecessary horn use, which is a huge problem in Vietnam. Building regulations could require better soundproofing in new apartments, and construction work could be [[restricted to|giới hạn trong]] certain hours. In the longer term, encouraging electric vehicles and planting trees along busy roads would help too. The difficulty is enforcement — rules [[on paper|trên giấy tờ]] don't mean much if nobody follows them." },
      { q: "Do you think people in the future will live in quieter environments?",
        sample: "I'm [[cautiously optimistic|lạc quan một cách thận trọng]]. Electric vehicles are much quieter, and as they replace petrol bikes and cars, cities could become noticeably calmer. On the other hand, cities are getting denser, with more people [[squeezed into|chen chúc trong]] smaller spaces, so noise from neighbours might get worse. My guess is that overall levels will drop, but real quiet will become something of a [[luxury|thứ xa xỉ]] — people will pay [[a premium|giá cao hơn]] for peaceful homes." }
    ]
  });

  topics.push({
    id: "sp-07", title: "A park or garden you enjoy", titleVi: "Công viên hoặc khu vườn bạn yêu thích",
    tag: "forecast", topic: "environment",
    part1: {
      name: "Plants",
      questions: [
        { q: "Do you have any plants at home?",
          sample: "Yes, a few. I've got a small balcony with some herbs — basil, mint and lemongrass — which [[come in handy|rất tiện, có ích]] for cooking. Inside, I have a peace lily on my desk, mainly because I read that it's [[hard to kill|khó chết, dễ trồng]], and I'm [[not exactly|không hẳn là]] known for my gardening skills." },
        { q: "Did you grow plants when you were a child?",
          sample: "Not really myself, but my grandmother had a vegetable garden in her village, and I used to help her in the summer holidays. I remember [[pulling up weeds|nhổ cỏ dại]] and watering the morning glory. At the time I thought it was a [[chore|việc vặt nhàm chán]], but now I [[look back on|nhìn lại, hồi tưởng]] it quite fondly." },
        { q: "Do you think plants make people happier?",
          sample: "I'd say so. Even one plant on your desk makes a room feel more [[alive|có sức sống]]. There's also something [[therapeutic|chữa lành, giúp thư giãn]] about looking after a plant — it forces you to slow down. I've noticed that when I spend ten minutes watering my herbs in the morning, I [[feel more grounded|thấy bình tâm, vững vàng hơn]] for the rest of the day." },
        { q: "What plants are popular in your country?",
          sample: "The lotus is probably the most iconic — it's often called the national flower and it [[symbolises|tượng trưng cho]] purity. Around Tet, peach blossom in the north and yellow apricot blossom in the south are [[a must|thứ không thể thiếu]] in most homes. And in cities, people are really into succulents and bonsai at the moment, partly because they [[take up|chiếm]] so little space." }
      ]
    },
    part2: {
      cue: "Describe a park or garden you enjoy visiting.",
      bullets: ["You should say:", "where it is", "what it looks like", "what you do there", "and explain why you enjoy visiting it"],
      notes: ["Hanoi Botanical Garden (Bach Thao)", "behind Presidential Palace – central but peaceful", "huge old trees, lake + island, small hill", "jog 2–3 mornings a week; watch tai chi, badminton", "shade, free, memories with dad", "wish: better upkeep, more parks"],
      sample: [
        "The place I'd like to talk about is the Hanoi Botanical Garden, which locals call Bach Thao. It's right behind the Presidential Palace, so it's quite central, yet it feels [[miles away from|tách biệt hẳn khỏi]] the busy streets around it.",
        "It isn't a fancy garden with neat flower beds — it's more like a small forest. There are enormous old trees, some of which must be over a hundred years old, a lake with a little island in the middle, and a small hill you can climb. In the early morning there's often a light mist over the water, which makes it look quite magical.",
        "I usually go there two or three mornings a week to jog. The path around the lake is about a kilometre, so I do a few laps and then sit on a bench to [[catch my breath|lấy lại hơi]]. What I love is watching everyone else: older people doing tai chi, groups playing badminton, students sketching the trees. It's a real [[cross-section of|lát cắt đại diện cho]] Hanoi life.",
        "There are a few reasons I enjoy it so much. It's one of the few places in the city where you can find proper shade and fairly clean air, and it's free, so it's open to everyone. But the main reason is sentimental. My dad used to take me there on Sunday mornings when I was little, and we'd feed the fish together, so whenever I'm there, it [[brings back|gợi lại]] those memories.",
        "My only complaint is that it's a bit [[run-down|xuống cấp]] in places. I really wish the city would look after it better and create more parks like it, because it's [[a breath of fresh air|một luồng gió mát lành]], literally and figuratively."
      ].join("\n\n")
    },
    part3: [
      { q: "Why do people like spending time in parks?",
        sample: "I think it's a kind of [[escape|sự thoát ly]] from the pressure of urban life. Most of us spend our days indoors, staring at screens, so being surrounded by trees has a calming effect. Parks are also social spaces — they're where families gather, where old people meet friends, and where kids [[let off steam|xả năng lượng]]. And crucially, they're free, which makes them one of the few places where people from [[all walks of life|mọi tầng lớp xã hội]] mix together." },
      { q: "Should every home have a garden?",
        sample: "It would be wonderful, but it's not realistic in big cities, where land is so expensive. Most people in Hanoi live in apartments or narrow tube houses. What's more achievable is [[shared green spaces|không gian xanh chung]] — rooftop gardens on apartment blocks, or community gardens where residents [[grow their own vegetables|tự trồng rau]]. Those also bring neighbours together, which is [[an added benefit|một lợi ích cộng thêm]]." },
      { q: "How can cities become greener?",
        sample: "There are a few approaches. One is to protect the green spaces we already have, rather than building on them. Another is to make greenery part of new developments from the start — for example, requiring a certain amount of [[tree cover|độ che phủ cây xanh]] in every project. Singapore is a great example; it has [[integrated|lồng ghép]] plants into its skyscrapers. Smaller steps help too, like planting trees along roads, which provide shade and [[soak up|hấp thụ]] pollution." }
    ]
  });

  topics.push({
    id: "sp-08", title: "A time you shared something", titleVi: "Lần bạn chia sẻ điều gì đó với người khác",
    tag: "forecast", topic: "culture",
    part1: {
      name: "Sharing",
      questions: [
        { q: "Did your parents teach you to share when you were a child?",
          sample: "Yes, constantly! I have a younger brother, so sharing was [[non-negotiable|bắt buộc, không bàn cãi]] in our house — toys, snacks, even the TV remote. My mum's rule was that whoever cut the cake had to let the other person [[pick first|chọn trước]]. It sounds trivial, but it was a clever way to teach fairness, and [[it stuck with me|điều đó in sâu trong tôi]]." },
        { q: "What kinds of things do you like to share with others?",
          sample: "Food, mostly. In Vietnam, meals are almost always shared — the dishes go in the middle and everyone [[helps themselves|tự lấy đồ ăn]], so eating alone feels a bit [[odd|kỳ kỳ]]. I also like sharing recommendations, like books or podcasts. There's something satisfying about [[turning someone on to|khiến ai đó biết và mê]] something they end up loving." },
        { q: "Is there anything you would not share?",
          sample: "Personal things like my toothbrush, obviously! And I'm a bit [[protective of|giữ gìn kỹ]] my books, because people tend to return them with the corners folded, or not at all. I'm also careful about what I share online — I [[keep my accounts private|để tài khoản ở chế độ riêng tư]] and [[think twice|nghĩ kỹ]] before posting anything personal." },
        { q: "Do you think it's good for children to share?",
          sample: "Absolutely. Sharing teaches empathy — it makes children consider how someone else feels. That said, I don't think kids should be [[forced to|bị ép phải]] share everything all the time; they also need things that are theirs. It's about finding [[a healthy balance|sự cân bằng lành mạnh]] between generosity and [[setting boundaries|đặt ra giới hạn]]." }
      ]
    },
    part2: {
      cue: "Describe a time when you shared something with others.",
      bullets: ["You should say:", "what you shared", "who you shared it with", "why you shared it", "and explain how you felt about sharing it"],
      notes: ["my IELTS notes, vocab lists, corrected essays", "English club members (~30)", "younger members overwhelmed; a senior once helped me", "shared folder + group chat link", "nervous → thank-you messages, others added files", "explaining = learning more"],
      sample: [
        "I'd like to talk about the time I shared all my IELTS study materials with the members of my university's English club.",
        "This was about six months ago. I'd been preparing for the test for nearly a year, and I'd built up a huge collection of resources — vocabulary lists organised by topic, notes on common speaking questions, and essays that had been corrected by a tutor. It was all [[scattered across|nằm rải rác khắp]] different notebooks and files.",
        "One evening at the club, a few younger members were saying how [[overwhelmed|choáng ngợp]] they felt, because there's so much material online and they didn't know where to start. I remembered feeling exactly the same, and I also remembered that a senior student had once lent me her notes, which really [[helped me out|giúp tôi rất nhiều]]. So I spent a weekend tidying everything up, put it into a shared folder, and sent the link to the club's group chat.",
        "I have to admit I felt nervous before sending it. My notes weren't perfect, and I worried people might [[pick holes in|bới lỗi, chê bai]] them. But the response was really positive. Lots of people thanked me, and a couple even added their own materials, so the folder kept growing.",
        "What surprised me most was how much I [[got out of it|thu được từ việc đó]] myself. People asked me about grammar points in my notes, and explaining things made me understand them much more deeply. So although I thought I was doing others a favour, it turned out to be [[mutually beneficial|đôi bên cùng có lợi]]. Sharing what you know doesn't make you lose anything — [[if anything|thậm chí ngược lại]], you gain more."
      ].join("\n\n")
    },
    part3: [
      { q: "Why are some people more willing to share than others?",
        sample: "Part of it is personality, but upbringing plays a big role. If you grow up in a large family, sharing becomes a habit because there's no alternative. Culture matters as well — in Vietnam there's a strong [[collective mindset|tư duy tập thể]], so sharing food or helping relatives is expected. People who have experienced [[hardship|khó khăn, gian khổ]] can go either way: some become extremely generous because they know what it's like to [[go without|chịu thiếu thốn]], while others become more cautious." },
      { q: "What do you think about the 'sharing economy', such as ride-hailing apps?",
        sample: "Overall, I think it's been positive. Apps like Grab have made transport cheaper and more convenient, and they've given people a [[flexible way to earn|cách kiếm tiền linh hoạt]] extra income. But there are downsides. Drivers often have no job security or insurance, and they're [[at the mercy of|phụ thuộc hoàn toàn vào]] the company's algorithm. So the concept is great, but it needs proper regulation to make sure workers aren't [[exploited|bị bóc lột]]." },
      { q: "Is it a good idea to share personal information online?",
        sample: "I'd be careful. Sharing photos with friends is harmless enough, but people often [[overshare|chia sẻ quá đà]] without thinking — their location, their children's school, even ID details. That information can be [[misused|bị lạm dụng]] by scammers or companies. Once something is online, it's very hard to [[take it back|rút lại]], so my rule is: don't post anything you wouldn't be comfortable with a stranger seeing." }
    ]
  });

  topics.push({
    id: "sp-09", title: "A historical building", titleVi: "Một công trình lịch sử",
    tag: "forecast", topic: "history",
    part1: {
      name: "History",
      questions: [
        { q: "Did you like studying history at school?",
          sample: "Honestly, not much. It was mostly about memorising dates and names for exams, which [[put me off|làm tôi mất hứng]] the subject for years. It's only since leaving school that I've [[developed a real interest in|nảy sinh hứng thú thật sự với]] it, mainly through podcasts and documentaries that [[bring the stories to life|làm câu chuyện trở nên sống động]]." },
        { q: "Do you like visiting museums?",
          sample: "I do, especially smaller museums that focus on one thing. The Women's Museum in Hanoi is a [[hidden gem|viên ngọc ẩn (nơi hay mà ít người biết)]], for example. I'm less keen on huge museums where you [[wander around|đi lang thang]] for hours and end up with [[information overload|quá tải thông tin]]." },
        { q: "Which period of history would you like to learn more about?",
          sample: "I'd love to know more about everyday life in ancient Vietnam — not wars and kings, but how [[ordinary people|người dân bình thường]] lived, what they ate and how they [[made a living|kiếm sống]]. History lessons tend to [[gloss over|lướt qua, bỏ qua]] that side of things, but I find it fascinating to imagine a normal day a thousand years ago." },
        { q: "Do you think history is important?",
          sample: "Very much so. Understanding history helps us [[make sense of|hiểu được]] why the world is the way it is — why certain countries have tensions, for instance. It can also stop us from [[repeating the same mistakes|lặp lại sai lầm cũ]]. And on a personal level, knowing your family's history gives you a [[sense of identity|ý thức về bản sắc]]." }
      ]
    },
    part2: {
      cue: "Describe a historical building you have visited.",
      bullets: ["You should say:", "what the building is", "where it is", "what you learned about it", "and explain how you felt when you visited it"],
      notes: ["Temple of Literature (Van Mieu), Hanoi", "built 1070, first national university", "school trip at 10 vs. visit last year with a foreign friend", "stone steles on turtles – scholars' names", "rubbing turtles' heads – off-limits now", "calm, pride, connection to the past"],
      sample: [
        "The building I'd like to describe is the Temple of Literature, or Van Mieu, in Hanoi. It's not a single building exactly, but a complex of courtyards, gates and pavilions, and it's one of the most important historical sites in Vietnam.",
        "It was built in 1070 to honour Confucius, and a few years later it became the country's first national university. I first went there on a school trip when I was about ten, but I was more interested in running around than listening to the guide. I went back last year with a friend from abroad, and this time I [[took it all in|cảm nhận, tiếp thu trọn vẹn]] properly.",
        "What I found most fascinating were the stone steles standing on the backs of stone turtles. Each one is [[engraved with|được khắc]] the names of scholars who passed the royal exams centuries ago. Apparently, students used to rub the turtles' heads for luck before exams, although that's [[off-limits|bị cấm]] now to protect them. I also learned that the exams were incredibly tough — only [[a handful of|một số ít]] candidates passed each time, which made my IELTS stress feel quite small!",
        "As for how I felt, it was a mixture of calm and pride. Even though it's right in the middle of the city, once you're inside, the noise seems to [[fade away|lắng dần, tan biến]], and you're surrounded by old trees and ponds. Standing in front of those steles, I felt a real [[connection to|sự kết nối với]] the past — these were people who valued education as much as Vietnamese families still do today.",
        "It's a place that [[gives you perspective|giúp bạn nhìn mọi thứ rộng hơn]], and I'd recommend it to anyone visiting Hanoi."
      ].join("\n\n")
    },
    part3: [
      { q: "Why is it important to preserve historical buildings?",
        sample: "They're a physical link to the past. You can read about history in books, but standing inside a building that's a thousand years old [[makes it tangible|khiến nó trở nên hữu hình]]. They also shape a city's identity — imagine Hanoi without its old temples and French villas; it would look like any other modern city. And there's an economic argument: heritage sites [[draw in|thu hút]] tourists, which creates jobs. Once they're gone, they're gone [[for good|mãi mãi]]." },
      { q: "Should the government or private companies pay to maintain historical sites?",
        sample: "I think it should mainly be the government's responsibility, because heritage belongs to everyone, not just to whoever can profit from it. If private companies take over, there's a risk they'll [[commercialise|thương mại hoá]] a site too much — turning a temple into a shopping area, for instance. That said, [[public-private partnerships|hợp tác công – tư]] can work well, as long as there are strict rules about [[what can and can't be changed|điều gì được và không được thay đổi]]." },
      { q: "Do you think modern buildings will be considered historical in the future?",
        sample: "Some of them, definitely — every historical building was modern once. The ones that [[stand the test of time|vượt qua thử thách của thời gian]] will probably be those with a distinctive design or a story behind them, something that captures the spirit of our era. Generic glass office towers, on the other hand, probably won't [[inspire much affection|khơi gợi nhiều tình cảm]]. Future generations might even see them as [[eyesores|thứ chướng mắt]]." }
    ]
  });

  topics.push({
    id: "sp-10", title: "A piece of good advice", titleVi: "Một lời khuyên hữu ích",
    tag: "forecast", topic: "family",
    part1: {
      name: "Asking for advice",
      questions: [
        { q: "Who do you usually ask for advice?",
          sample: "It depends on the problem. For anything to do with studying or careers, I usually [[turn to|tìm đến]] my older sister, because she's been through it all. For personal stuff, I talk to my best friend — she's a great listener and doesn't [[sugar-coat|nói giảm nói tránh, tô hồng]] things. My parents are lovely too, but they tend to [[worry too much|lo lắng thái quá]]." },
        { q: "Do you like giving advice to others?",
          sample: "I do, as long as people actually ask for it. I try not to [[stick my nose into|chõ mũi vào]] other people's business. When friends come to me, I prefer to ask questions and help them [[think things through|suy nghĩ thấu đáo]], because people are more likely to [[follow through|làm đến nơi đến chốn]] if they reach the decision themselves." },
        { q: "Have you ever received bad advice?",
          sample: "Yes — a relative once told me to choose my university major [[based purely on|chỉ dựa vào]] salary. I nearly did, but I [[had second thoughts|suy nghĩ lại, đổi ý]] at the last minute. I'm glad I [[went with my gut|làm theo trực giác]], because I'd have been miserable studying something I had no interest in." },
        { q: "Is it better to get advice from older or younger people?",
          sample: "Both, really, because they [[bring different things to the table|đóng góp những điều khác nhau]]. Older people have more life experience, so they're good for big decisions like careers or marriage. But younger people are often [[more in tune with|bắt nhịp tốt hơn với]] how things work today — technology, the job market, trends. Ideally, I'd [[get both perspectives|lắng nghe cả hai góc nhìn]]." }
      ]
    },
    part2: {
      cue: "Describe a piece of good advice you received from someone.",
      bullets: ["You should say:", "who gave you the advice", "what the advice was", "when you received it", "and explain why you think it was good advice"],
      notes: ["grandfather – retired maths teacher", "first year at uni, felt behind classmates", "social media highlights", "'Don't compare your chapter 1 with someone else's chapter 20'", "weekly progress journal", "still use it – band 8 in 2 months posts"],
      sample: [
        "The best advice I've ever received came from my grandfather, who was a maths teacher for most of his life. He doesn't give advice very often, which is perhaps why this piece [[stuck with me|đọng lại trong tôi]].",
        "It was during my first year at university. I'd moved to Hanoi from a smaller city, and I felt like I was [[lagging behind|tụt lại phía sau]] everyone else. My classmates seemed more confident, their English was better, and on social media they all appeared to be doing internships and travelling. I went home for Tet feeling pretty [[down in the dumps|buồn chán, ủ rũ]], and my grandfather noticed.",
        "One evening over tea, he asked me what was wrong, and I explained. He listened, and then he said something like, 'Don't compare your first chapter with someone else's twentieth.' He meant that everyone starts from a different place, and that you only ever see the highlights of other people's lives, not the struggles behind them.",
        "I think it was good advice for several reasons. It was simple enough to remember whenever I started to feel inadequate, and it [[shifted my focus|chuyển trọng tâm của tôi]] from other people to my own progress. After that conversation, I started keeping a journal of what I'd learned each week, and seeing how far I'd come was [[a huge confidence boost|liều thuốc tự tin cực lớn]].",
        "Even now, I [[come back to|nghĩ lại về]] it all the time — for example, when I see people online claiming they got band 8 in two months. Instead of panicking, I remind myself that I don't know their story. It's advice that has helped me again and again, and I think that's what makes it [[stand out|nổi bật]]."
      ].join("\n\n")
    },
    part3: [
      { q: "Why do some people not like to take advice?",
        sample: "Some people see it as criticism — as if being given advice means they're not capable. Pride plays a part, especially for people in senior positions who feel they should [[have all the answers|biết mọi câu trả lời]]. And sometimes it's about how the advice is delivered. If someone is [[condescending|kẻ cả, coi thường]] or gives advice nobody asked for, people [[get defensive|phản ứng phòng thủ]], even if the advice itself is sound." },
      { q: "Do you think people rely too much on the internet for advice?",
        sample: "To some extent, yes. It's very convenient — you can find advice on anything from cooking to mental health in seconds. The danger is that a lot of it comes from people with [[no real expertise|không có chuyên môn thực sự]], and algorithms tend to show you what's popular, not what's accurate. For serious matters like health or legal problems, it's [[risky|rủi ro]] to rely on forums instead of a professional. The internet should be [[a starting point|điểm khởi đầu]], not the final word." },
      { q: "Is the advice parents give their children still relevant today?",
        sample: "Some of it is [[timeless|không bao giờ cũ]] — being honest, working hard, treating people with respect. Those values never [[go out of date|lỗi thời]]. But practical advice can be [[outdated|lạc hậu]]. Many Vietnamese parents still push their children towards 'safe' careers like banking or medicine, even though the job market has changed enormously. So young people need to [[take what's useful|chọn lọc điều hữu ích]] and respectfully question the rest." }
    ]
  });

  topics.push({
    id: "sp-11", title: "A time you had to wait", titleVi: "Lần bạn phải chờ đợi lâu",
    tag: "forecast", topic: "travel",
    part1: {
      name: "Patience & waiting",
      questions: [
        { q: "Are you a patient person?",
          sample: "It depends on the situation. With people, I'm fairly patient — I used to tutor kids, and that [[teaches you patience|rèn cho bạn tính kiên nhẫn]] very quickly. But with technology, [[I'm hopeless|tôi hết thuốc chữa]]. If a website takes more than a few seconds to load, I [[lose my patience|mất kiên nhẫn]] straight away." },
        { q: "What do you usually do while you're waiting?",
          sample: "[[Nine times out of ten|Hầu như lúc nào cũng]] I'm on my phone, I'm afraid — reading the news or listening to a podcast. I try to [[make productive use of|tận dụng hiệu quả]] waiting time, like reviewing vocabulary. But sometimes I just [[people-watch|ngắm người qua lại]], which can be surprisingly entertaining." },
        { q: "Do you mind waiting in queues?",
          sample: "I don't love it, but I don't [[make a fuss|làm ầm lên]] either. What really [[winds me up|làm tôi bực mình]] is when people [[jump the queue|chen hàng]] — unfortunately, that still happens quite a lot, especially at busy places like hospitals." },
        { q: "Is it harder to wait now than in the past?",
          sample: "I think so. We've got used to [[instant gratification|sự thoả mãn tức thì]] — fast delivery, instant messages, streaming without adverts — so when something takes time, it feels unbearable. My parents' generation had to wait weeks for a letter, so they [[developed far more patience|rèn được kiên nhẫn hơn hẳn]] than we have. I suspect our [[attention spans|khả năng tập trung]] are suffering as a result." }
      ]
    },
    part2: {
      cue: "Describe a time when you had to wait a long time for something.",
      bullets: ["You should say:", "what you were waiting for", "where you were", "how long you waited", "and explain how you felt while you were waiting"],
      notes: ["flight Hanoi → HCMC, cousin's graduation next morning", "Noi Bai Airport, typhoon", "1h → 2h → 4h → 7h delay", "phone dying, 40-min queue for food voucher", "elderly couple – fruit, cards", "lesson: beyond your control"],
      sample: [
        "I'm going to talk about the time my flight was delayed for nearly seven hours at Noi Bai Airport in Hanoi.",
        "It was last September, and I was flying to Ho Chi Minh City for my cousin's graduation ceremony the following morning. I'd [[timed everything perfectly|canh giờ mọi thứ hoàn hảo]], or so I thought. But when I got to the airport, the screens showed that my flight was delayed because of a typhoon approaching the coast.",
        "At first, the delay was only an hour, so I wasn't too worried. Then it became two hours, then four, and eventually seven. There was very little information from the airline — staff just kept saying we had to wait for the weather to clear. [[To make matters worse|Tệ hơn nữa là]], my phone battery was running low and every charging point was taken. At one stage the airline handed out food vouchers, so I [[queued up|xếp hàng]] for forty minutes for a rather sad sandwich.",
        "As for how I felt, I was incredibly frustrated for the first few hours. I kept refreshing the flight status and [[picturing|hình dung]] myself missing the ceremony. But then an elderly couple sitting next to me offered me some fruit, and we ended up chatting and playing cards for ages. They told me about their travels, and I completely [[lost track of time|quên mất thời gian]].",
        "In the end, the plane took off late that evening and I made it to the graduation, although I was exhausted. Looking back, it taught me that some things are simply [[beyond your control|nằm ngoài tầm kiểm soát của bạn]], and getting stressed doesn't make the plane arrive any faster. [[It's not the end of the world|Chẳng phải tận thế đâu]], after all."
      ].join("\n\n")
    },
    part3: [
      { q: "In what situations do people usually have to wait?",
        sample: "Bureaucracy is probably the classic example — waiting at government offices to get documents processed. Hospitals are another, particularly public ones in big cities, where people sometimes queue for hours to see a doctor. And then there's [[everyday stuff|chuyện thường ngày]] like traffic jams, which in Hanoi can [[eat up|ngốn mất]] an hour of your day. Technology has [[cut down on|giảm bớt]] some of this, though — many government services can now be done online." },
      { q: "Why do some people find it hard to be patient?",
        sample: "I think modern life has a lot to do with it. Everything is designed to be fast, so our expectations have changed. Stress is another factor — if you're already [[under pressure|chịu áp lực]], a small delay can feel like [[the last straw|giọt nước tràn ly]]. Personality matters too; some people are just naturally more [[laid-back|thoải mái, điềm tĩnh]] than others." },
      { q: "Should businesses do more to reduce waiting times for customers?",
        sample: "Definitely, because waiting is one of the main reasons people [[take their business elsewhere|chuyển sang dùng dịch vụ nơi khác]]. Simple things like online booking or showing estimated waiting times make a big difference — people are much more tolerant when they know [[what to expect|điều gì sẽ diễn ra]]. However, I don't think speed should come [[at the expense of|đánh đổi bằng]] quality. I'd rather wait a bit longer at a restaurant if the food is freshly made." }
    ]
  });

  topics.push({
    id: "sp-12", title: "A sports event you watched", titleVi: "Một sự kiện thể thao bạn đã xem",
    tag: "forecast", topic: "sport",
    part1: {
      name: "Sport",
      questions: [
        { q: "Do you like playing sport?",
          sample: "I do, though I'm more of a casual player than a serious athlete. I play badminton with friends twice a week, mainly to [[stay in shape|giữ dáng, giữ sức khoẻ]] and [[blow off steam|xả stress]] after studying. I've never been very [[competitive|thích ganh đua]] — I'm happy as long as the game is fun." },
        { q: "What sports are popular in your country?",
          sample: "Football, [[by a mile|hơn hẳn, bỏ xa]]. When the national team plays, the whole country [[comes to a standstill|như ngừng mọi hoạt động]], and if they win, people pour onto the streets to celebrate. Badminton and volleyball are popular too, and recently pickleball has [[taken the country by storm|gây sốt khắp cả nước]], especially among office workers." },
        { q: "Did you do much sport at school?",
          sample: "Not as much as I should have. PE lessons were twice a week, but they weren't [[taken very seriously|được coi trọng lắm]] — academic subjects always [[came first|được ưu tiên hàng đầu]]. I did join the school volleyball team for a year, which I loved, but I had to [[give it up|bỏ]] when my exams were coming up." },
        { q: "Do you prefer watching sport or playing it?",
          sample: "Playing, definitely. Watching can be exciting, especially big tournaments, but I [[get restless|thấy bồn chồn]] sitting through a whole match on TV. When I play, I'm completely [[in the moment|tập trung trọn vẹn vào hiện tại]] and [[forget about everything else|quên hết mọi thứ khác]], which is exactly what I need after a long day." }
      ]
    },
    part2: {
      cue: "Describe a sports event you watched.",
      bullets: ["You should say:", "what the event was", "where you watched it", "who you watched it with", "and explain how you felt about watching it"],
      notes: ["Southeast Asian football final – Vietnam vs Thailand", "giant screen outside a café near uni", "~10 classmates + hundreds of strangers", "red shirts, flags, a drum", "tense → goal → strangers hugging", "streets after the whistle – sense of unity"],
      sample: [
        "I'd like to talk about the final of the Southeast Asian football championship, when Vietnam played Thailand. I watched it with a big group of friends a while ago.",
        "We didn't have tickets, so we watched it on a giant screen that a café near our university had set up on the pavement. There must have been a couple of hundred people there by kick-off — students, office workers, families with small kids — and almost everyone was wearing red or had a flag painted on their cheek. Someone had even brought a drum, so the atmosphere was [[electric|sôi động, bùng nổ]] long before the match started.",
        "I went with about ten classmates. Most of us aren't huge football fans, but a final against Thailand is different — it's a [[fierce rivalry|cuộc đối đầu kình địch]], so even people who don't follow football [[get swept up in|bị cuốn vào]] it.",
        "The match itself was incredibly tense. Thailand are a strong side, and for long stretches I could barely watch. Every time they attacked, the crowd went quiet and people were [[on the edge of their seats|ngồi không yên vì hồi hộp]]. When Vietnam scored, the place exploded — strangers were hugging each other and the drummer went wild.",
        "What I remember most, though, is what happened after the final whistle. Thousands of people poured onto the streets on motorbikes, waving flags and honking until well after midnight. Normally I'd find that noise unbearable, but that night I was [[right in the thick of it|ở ngay giữa tâm điểm]].",
        "I think it was so memorable because of the [[sense of unity|cảm giác đoàn kết]]. For a few hours, it didn't matter who you were — everyone was on the same side, and that's [[something I'll treasure|điều tôi sẽ luôn trân trọng]]."
      ].join("\n\n")
    },
    part3: [
      { q: "Why do people enjoy watching sports events?",
        sample: "I think it's mostly about emotion and belonging. Sport is one of the few forms of entertainment where [[nobody knows the outcome|không ai biết trước kết quả]], so there's genuine suspense. Supporting a team also gives people a sense of identity — you're part of something bigger than yourself. And for many people, watching a match is an [[excuse to get together|cái cớ để tụ họp]] with friends and family. That shared experience [[creates a bond|tạo nên sự gắn kết]]." },
      { q: "Do you think professional athletes are paid too much?",
        sample: "In some cases, yes. When a top footballer earns more in a week than a nurse earns in ten years, it does seem [[out of proportion|không cân xứng]]. On the other hand, their careers are very short, and they [[generate enormous revenue|tạo ra doanh thu khổng lồ]] for clubs through tickets and broadcasting rights. I think the bigger issue is that athletes in less popular sports often [[struggle to get by|chật vật để sống]], even when they compete internationally." },
      { q: "Does hosting a big sports event benefit a country?",
        sample: "It can, but the benefits are often exaggerated. Hosting the Olympics or a World Cup [[puts a country on the map|đưa đất nước lên bản đồ thế giới]], boosts tourism and can lead to better infrastructure. But the costs are huge, and some countries end up with expensive stadiums that are barely used afterwards — so-called [[white elephants|công trình tốn kém mà vô dụng]]. It really depends on whether there's a [[long-term plan|kế hoạch dài hạn]] for the facilities once the event is over." }
    ]
  });

  /* --------------------------------------------------------------- EVERGREEN */

  topics.push({
    id: "sp-13", title: "Work or study", titleVi: "Công việc hoặc học tập",
    tag: "evergreen", topic: "work",
    part1: {
      name: "Work or study",
      questions: [
        { q: "Do you work or are you a student?",
          sample: "I'm a student at the moment. I'm in my final year at a university in Hanoi, [[majoring in|học chuyên ngành]] business administration. I also do a bit of part-time work as an English tutor, which [[helps me cover|giúp tôi trang trải]] my living costs and gives me some [[hands-on experience|kinh nghiệm thực tế]] of teaching." },
        { q: "Why did you choose that subject?",
          sample: "Partly because I've always been interested in how companies work — why some succeed and others [[go under|phá sản]]. But I'll be honest, my parents also [[had a say in it|có tiếng nói trong chuyện đó]]. They felt business would [[open more doors|mở ra nhiều cơ hội hơn]] than the arts subjects I was considering. So far, I don't regret it." },
        { q: "What do you like most about your studies?",
          sample: "I really enjoy the group projects, which might surprise people, because many students hate them. We often work on [[real-life case studies|tình huống thực tế]] of Vietnamese companies, and it's exciting to [[come up with|nghĩ ra]] solutions together. I've learned a lot about [[bouncing ideas off|trao đổi ý tưởng với]] other people." },
        { q: "What would you like to do after you graduate?",
          sample: "Ideally, I'd like to work in marketing for an international company, perhaps in Singapore for a few years to [[broaden my horizons|mở rộng tầm nhìn]]. Eventually, though, I'd like to come back and [[set up|thành lập]] my own business, maybe something in education. But I'm [[keeping my options open|để ngỏ các lựa chọn]] for now." }
      ]
    },
    part2: {
      cue: "Describe a job you would like to do in the future.",
      bullets: ["You should say:", "what the job is", "how you found out about it", "what skills you would need", "and explain why you would like to do this job"],
      notes: ["UX researcher – how people use apps/websites", "summer internship at a start-up", "sat in on user tests – eye-opening", "skills: interviewing, listening, data, English", "psychology + business; accessible tech for elderly", "plan: portfolio, specialised course"],
      sample: [
        "The job I'd really like to do in the future is UX researcher. UX stands for user experience, and basically, it's the person who finds out how people actually use a product, like an app or a website, and what frustrates them about it.",
        "I only found out this job existed about a year ago. I was doing a summer internship at a small tech start-up, and they [[brought in|mời về, thuê về]] a researcher to test their new app. I [[sat in on|ngồi dự]] some of her sessions, where she watched real customers trying to complete simple tasks. It was [[eye-opening|mở mang tầm mắt]] — things that seemed obvious to the developers completely confused ordinary users.",
        "To do the job well, you need a mix of skills. You have to be good at interviewing people and, more importantly, at listening without steering them towards an answer. You also need to be comfortable with data, because you have to analyse patterns and present your findings convincingly. And since many companies work internationally, strong English is essential.",
        "The main reason it appeals to me is that it [[brings together|kết hợp]] two things I'm passionate about: psychology and business. I've always been curious about why people behave the way they do, and in this job that curiosity would actually be useful. I also like the idea that my work could make technology [[more accessible|dễ tiếp cận hơn]] — for example, making banking apps easier for elderly people.",
        "Of course, it's a competitive field, so I know I need to [[build up|xây dựng dần]] a portfolio and probably take a specialised course after I graduate. But it's the first time I've felt genuinely excited about a career, so I'm determined to [[give it a shot|thử sức]]."
      ].join("\n\n")
    },
    part3: [
      { q: "What factors do people consider when choosing a job?",
        sample: "Salary is usually the first thing, especially for young people who want to [[support their families|phụ giúp gia đình]]. But increasingly, people care about other things too — work-life balance, chances of promotion, and whether the company's values [[align with|phù hợp với]] their own. I've noticed that many people my age would happily [[take a pay cut|chấp nhận giảm lương]] for a job that lets them work remotely or that feels meaningful." },
      { q: "Is it better to stay in one job for a long time or to change jobs often?",
        sample: "There are pros and cons to both. Staying in one place lets you build deep expertise and strong relationships, and in some industries loyalty is [[rewarded|được đền đáp]]. But changing jobs every few years can help you learn faster and often leads to bigger pay rises. Personally, I think it makes sense to [[move around|thay đổi chỗ làm]] early in your career to find out what suits you, and then [[settle down|ổn định]] once you've found the right fit." },
      { q: "How will technology change the way people work in the future?",
        sample: "I think AI will take over a lot of [[routine tasks|công việc lặp đi lặp lại]] — data entry, basic customer service, even some writing. That's worrying for people in those roles, but it could also free us up to focus on more creative and interpersonal work. We'll probably see more remote and flexible working as well. The key challenge will be [[retraining|đào tạo lại]] workers so that nobody gets [[left behind|bị bỏ lại phía sau]]." }
    ]
  });

  topics.push({
    id: "sp-14", title: "Hometown", titleVi: "Quê hương",
    tag: "evergreen", topic: "urban",
    part1: {
      name: "Hometown",
      questions: [
        { q: "Where is your hometown?",
          sample: "I'm from Nam Dinh, a city about ninety kilometres south of Hanoi. It's [[best known for|nổi tiếng nhất với]] its textile factories and, among food lovers, for its beef noodle soup. It's a [[laid-back|thư thái, chậm rãi]] sort of place compared to Hanoi, and the [[pace of life|nhịp sống]] is much slower." },
        { q: "What do you like most about your hometown?",
          sample: "The people, I think. It's the kind of place where everyone [[knows everyone|ai cũng biết nhau]], so when I go back, I can't walk down the street without someone asking about my studies. It can feel [[a bit nosy|hơi tọc mạch]] at times, but it [[gives you a sense of belonging|cho bạn cảm giác thuộc về]] that you don't really get in a big city." },
        { q: "Has your hometown changed much since you were a child?",
          sample: "Quite a lot, yes. There are far more cars now, and lots of the old one-storey houses have been [[knocked down|phá bỏ]] to make way for taller buildings. There's even a big shopping mall, which would have been [[unthinkable|không thể tưởng tượng nổi]] when I was little. Some changes are positive, but I do [[feel a bit nostalgic|thấy hơi hoài niệm]] for how it used to be." },
        { q: "Would you like to live in your hometown in the future?",
          sample: "Maybe later on, but not [[at this stage of my life|ở giai đoạn này của cuộc đời]]. Most of the jobs in my field are [[concentrated in|tập trung ở]] Hanoi or Ho Chi Minh City. I can imagine moving back when I'm older, especially if I have children, because it's safer and less polluted — it's a good place to [[put down roots|an cư lập nghiệp]]." }
      ]
    },
    part2: {
      cue: "Describe a place in your hometown that has changed a lot.",
      bullets: ["You should say:", "what the place is", "what it used to be like", "how it has changed", "and explain how you feel about these changes"],
      notes: ["central lake area, Nam Dinh", "before: murky water, rubbish, crowded old market", "with grandma, holding hands in narrow aisles", "renovation: walking path, benches, music, market moved", "pros: clean, families, town pride", "cons: lost character, small vendors gone"],
      sample: [
        "I'd like to talk about the area around the central lake in my hometown, Nam Dinh, which has changed almost [[beyond recognition|đến mức không nhận ra]] over the last ten years or so.",
        "When I was a child, the lake was pretty neglected. The water was murky, there was rubbish along the banks, and on one side there was an old covered market that was always crowded, noisy and a bit chaotic. My grandmother used to take me there to buy vegetables, and I remember [[squeezing through|len lỏi qua]] the narrow aisles, holding her hand so I wouldn't get lost.",
        "A few years ago, the local government launched a big renovation project. The lake was cleaned up, the banks were paved, and they built a wide walking path all the way round, with benches and trees. In the evenings there's music and coloured lights, and it's become the place where everyone goes to exercise or [[hang out|đi chơi, tụ tập]]. The old market was moved to a modern building a little further away.",
        "My feelings about it are quite mixed. On the one hand, it's [[undeniably|không thể phủ nhận]] an improvement. It's cleaner and safer, and it's lovely to see older people dancing and kids riding their bikes. It's given the town a sense of pride.",
        "On the other hand, I feel something has been lost. The old market had so much character, and many of the small vendors who worked there couldn't afford the rent in the new building, so they simply disappeared. Whenever I walk around the lake now, I [[can't help feeling|không khỏi cảm thấy]] a little nostalgic. I suppose that's the [[price of progress|cái giá của sự phát triển]]."
      ].join("\n\n")
    },
    part3: [
      { q: "Why do many young people leave their hometowns?",
        sample: "Mainly for opportunities — better universities, better-paid jobs and a more exciting lifestyle. In Vietnam, the gap between the big cities and the provinces is still quite large, so ambitious young people often feel they have to [[move away|chuyển đi xa]] to [[get ahead|tiến thân]]. There's also a social element: some want to escape the expectations and [[close scrutiny|sự soi xét kỹ lưỡng]] of a small community, where everyone knows your business." },
      { q: "What can be done to encourage people to stay in smaller towns?",
        sample: "The most important thing is jobs. If the government [[offered incentives|đưa ra ưu đãi]] for companies to open offices and factories in smaller cities, young people wouldn't feel forced to leave. Better infrastructure helps too — fast internet makes remote work possible. And investing in good schools and hospitals would attract young families. It's about [[narrowing the gap|thu hẹp khoảng cách]] so that staying doesn't feel like [[settling for less|chấp nhận điều kém hơn]]." },
      { q: "Is it important to preserve the traditional character of towns?",
        sample: "I think so, though it has to be balanced against people's need for modern living conditions. The traditional character — old buildings, local markets, festivals — is what makes each town unique. If every town has the same malls and apartment blocks, they become [[interchangeable|na ná nhau, như thay thế được cho nhau]]. Ideally, development should [[build on|phát huy dựa trên]] what's already there rather than [[wiping it out|xoá sổ nó]]." }
    ]
  });

  topics.push({
    id: "sp-15", title: "Accommodation", titleVi: "Nơi ở",
    tag: "evergreen", topic: "family",
    part1: {
      name: "Home & accommodation",
      questions: [
        { q: "Do you live in a house or an apartment?",
          sample: "I live in a small rented apartment in Hanoi, which I share with a friend from university. It's on the eighth floor, so we get a decent view, but the lift [[breaks down|hỏng]] every now and then, which is [[a real pain|thật phiền toái]]. My family home in my hometown is a traditional tube house — [[long and narrow|dài và hẹp]], with four floors." },
        { q: "Which room do you like most in your home?",
          sample: "Probably my bedroom, simply because it's the only space that's [[entirely mine|hoàn toàn của riêng tôi]]. I've decorated it with photos and plants, and I've set up a little desk by the window where I study. It's where I [[recharge|nạp lại năng lượng]] after a busy day. If I could change one thing, I'd make it bigger — at the moment there's [[barely enough room to move|chật đến mức khó xoay xở]]." },
        { q: "What would you like to change about your home?",
          sample: "I'd love a proper balcony — ours is tiny and basically just used for drying clothes. I'd also [[soundproof|cách âm]] the windows, because the traffic can be quite intrusive at night. And [[if money were no object|nếu tiền không thành vấn đề]], I'd [[knock through|đập thông]] the wall between the kitchen and living room to make it more [[open-plan|không gian mở]]." },
        { q: "Do most people in your country rent or buy their homes?",
          sample: "Traditionally, owning a home has been [[a top priority|ưu tiên hàng đầu]] in Vietnam — it's seen as a sign of stability, and parents often help their children buy one. But in big cities, prices have [[gone through the roof|tăng chóng mặt]], so more and more young people rent, at least for the first few years. Attitudes are slowly changing, but there's still a lot of [[social pressure|áp lực xã hội]] to own property." }
      ]
    },
    part2: {
      cue: "Describe your ideal home.",
      bullets: ["You should say:", "where it would be", "what it would look like", "who you would live with", "and explain why this would be your ideal home"],
      notes: ["outskirts of Da Nang – near the sea, 15 min to centre", "2 storeys, big windows, wooden floors, minimalist", "open-plan kitchen, home office, reading nook, rooftop garden", "partner + a dog + room for parents", "balance city and nature, wind down", "motivation to work towards"],
      sample: [
        "My ideal home would be a house on the outskirts of Da Nang, close enough to the beach that I could hear the sea at night, but only fifteen minutes from the city centre, so I wouldn't feel [[cut off|bị cô lập]].",
        "It wouldn't need to be huge. I'm imagining a two-storey house with large windows to let in [[plenty of natural light|nhiều ánh sáng tự nhiên]], wooden floors and a simple, minimalist design. Downstairs there'd be an open-plan kitchen and living area, because cooking and eating together is a big part of my life. Upstairs I'd want a small home office and a cosy [[reading nook|góc đọc sách]] by a window. My real dream, though, is a rooftop garden where I could grow herbs and have breakfast in the morning.",
        "As for who I'd live with, hopefully a partner, and definitely a dog — I've always wanted one but never had the space. I'd also like a spare room so my parents could come and stay for long periods. In Vietnamese culture it's common to look after your parents as they get older, and I'd want them to [[feel at home|cảm thấy như ở nhà]] there.",
        "The reason this would be my ideal home is that it [[strikes a balance between|cân bằng được giữa]] city life and nature. I've lived in busy, noisy places for most of my life, and I'd love to be able to [[wind down|thả lỏng, thư giãn]] somewhere peaceful at the end of the day, without giving up the convenience of the city.",
        "Whether I'll ever be able to afford it is another question! But having a clear picture of it definitely [[keeps me motivated|giữ cho tôi có động lực]]."
      ].join("\n\n")
    },
    part3: [
      { q: "Why is it difficult for young people to buy a home nowadays?",
        sample: "The main reason is that property prices have risen much faster than salaries, especially in major cities. A young graduate in Hanoi might have to save for decades just to [[afford a deposit|đủ tiền trả trước]]. Speculation [[plays a part|đóng một phần vai trò]] too — many apartments are bought as investments and [[left empty|bỏ trống]], which pushes prices up further. Without help from their families, owning a home is becoming [[out of reach|ngoài tầm với]] for many young people." },
      { q: "What are the advantages of living in an apartment compared with a house?",
        sample: "Apartments are usually more affordable and more secure, with guards and cameras. Many modern buildings also have [[shared facilities|tiện ích chung]] like gyms and swimming pools, which most people could never afford in a private house. The downside is space and privacy — you're [[sharing walls|ở sát vách]] with your neighbours, so noise can be an issue, and there's usually no garden. For young people or small families, though, I think the [[pros outweigh the cons|ưu điểm nhiều hơn nhược điểm]]." },
      { q: "How do you think homes will be different in the future?",
        sample: "I imagine they'll be smaller, especially in cities, but much smarter, with lighting, air-conditioning and security controlled by voice or apps. There'll also be a big focus on sustainability — solar panels, better insulation and so on — because energy costs [[keep rising|liên tục tăng]]. And with more people working from home, a dedicated workspace might become [[a standard feature|một tiện ích tiêu chuẩn]] rather than [[a luxury|thứ xa xỉ]]." }
    ]
  });

  topics.push({
    id: "sp-16", title: "Reading", titleVi: "Đọc sách",
    tag: "evergreen", topic: "media",
    part1: {
      name: "Reading",
      questions: [
        { q: "Do you like reading?",
          sample: "Yes, I'd call myself a [[keen reader|người mê đọc sách]], although I don't read as much as I'd like. I mostly read non-fiction — psychology and history — but every now and then I'll [[get hooked on|bị cuốn vào]] a novel and finish it in a couple of days. It's my favourite way to [[unwind|thư giãn]] before bed." },
        { q: "Do you prefer paper books or e-books?",
          sample: "Paper books, definitely, though e-books are more practical. I love the feel of a real book, and I find I [[absorb information|tiếp thu thông tin]] better on paper. That said, I always have a few e-books on my phone for when I'm [[on the move|đang di chuyển]], because it's much easier than [[lugging around|tha lôi, mang vác]] a stack of books." },
        { q: "What did you read when you were a child?",
          sample: "Mostly comics, I have to admit — Doraemon and Detective Conan were hugely popular when I was growing up. My parents thought comics were a [[waste of time|lãng phí thời gian]], but looking back, they [[sparked|khơi dậy]] my love of reading. I [[graduated to|chuyển dần lên]] proper novels when I was about twelve." },
        { q: "Do you think people read less than before?",
          sample: "People probably read fewer books, but I'd argue we read more overall — just in [[bite-sized chunks|từng mẩu nhỏ]], like social media posts and news articles. The problem is that this kind of reading is quite shallow. It's harder to [[concentrate for long stretches|tập trung trong thời gian dài]], so getting through a whole book can feel like [[hard work|việc vất vả]] for many people now." }
      ]
    },
    part2: {
      cue: "Describe a book you have read that you found interesting.",
      bullets: ["You should say:", "what the book is", "when you read it", "what it is about", "and explain why you found it interesting"],
      notes: ["Sapiens – Yuval Noah Harari", "2nd year uni; Vietnamese then English", "3 revolutions: cognitive, agricultural, scientific", "big idea: shared stories – money, nations", "accessible, funny style", "criticism: oversimplifies – still worth it"],
      sample: [
        "The book I'd like to talk about is Sapiens by Yuval Noah Harari. It's a non-fiction book that tells the story of humankind, from the earliest humans right up to the present day.",
        "I read it in my second year at university. A friend recommended it, and I started with the Vietnamese translation, but I enjoyed it so much that I later [[got hold of|kiếm được]] the English version to read again and pick up some vocabulary.",
        "The book is [[structured around|được xây dựng xoay quanh]] a few major turning points — what the author calls the Cognitive Revolution, when humans developed complex language, then the Agricultural Revolution, and finally the Scientific Revolution. Rather than just listing events, he asks big questions, like why humans came to dominate the planet and whether we're actually happier than our ancestors were.",
        "What I found most interesting was his idea that humans can cooperate in huge numbers because we believe in [[shared stories|những câu chuyện chung]]. Things like money, nations and companies only exist because millions of people agree that they do. That idea really [[blew my mind|khiến tôi kinh ngạc]], and I've never looked at a banknote in quite the same way since! I also liked his style. He explains complicated ideas in a really [[accessible|dễ hiểu, dễ tiếp cận]] way, with lots of humour, so it never felt like a textbook.",
        "Having said that, I know some historians criticise the book for [[oversimplifying|đơn giản hoá quá mức]] things, and after reading a few reviews, I can see their point. But even so, it's a great book for getting people interested in history, and it [[made me think|khiến tôi suy ngẫm]] more than almost anything else I've read."
      ].join("\n\n")
    },
    part3: [
      { q: "Why do some people prefer reading to watching films?",
        sample: "Reading gives you more freedom to use your imagination. When you read a novel, you decide what the characters look and sound like, whereas a film [[hands you|đưa sẵn cho bạn]] someone else's interpretation. Books can also go much deeper into a character's thoughts, which films often struggle to [[convey|truyền tải]]. And some people enjoy controlling the pace — you can stop and [[reflect on|suy ngẫm về]] a passage, which you can't really do in a cinema." },
      { q: "How can parents encourage children to read more?",
        sample: "The most effective way is probably to [[lead by example|làm gương]]. If children see their parents reading regularly, they're much more likely to see it as a normal, enjoyable activity. Reading aloud to young kids is important too, as is letting them choose what they read, even if it's comics. Forcing children to read 'serious' books can [[backfire|phản tác dụng]] and make reading feel like homework. The goal is to make it [[a pleasure rather than a chore|niềm vui chứ không phải nghĩa vụ]]." },
      { q: "Will printed books disappear in the future?",
        sample: "I doubt it. People predicted the death of the printed book when e-readers first came out, but sales of physical books have [[held up|giữ vững]] surprisingly well. I think printed books will become more of a [[niche|ngách, dành cho nhóm riêng]] product — something people buy as a gift or for books they really love — while everyday reading moves to screens. There's something about paper that many readers aren't willing to [[give up|từ bỏ]]." }
    ]
  });

  topics.push({
    id: "sp-17", title: "Music", titleVi: "Âm nhạc",
    tag: "evergreen", topic: "culture",
    part1: {
      name: "Music",
      questions: [
        { q: "What kind of music do you like?",
          sample: "I have quite [[eclectic|đa dạng, pha trộn nhiều gu]] taste, to be honest. I listen to a lot of indie pop, but I also love Vietnamese ballads from the nineties, because my parents used to play them in the car. When I'm studying, I [[stick to|chỉ dùng, trung thành với]] instrumental music like lo-fi or classical, because lyrics [[distract me|làm tôi xao nhãng]]." },
        { q: "How often do you listen to music?",
          sample: "Pretty much every day. I put my headphones on as soon as I leave the house — it makes [[the commute|quãng đường đi học/đi làm hằng ngày]] much [[more bearable|dễ chịu đựng hơn]]. I also have music on [[in the background|làm nền]] when I'm cooking or cleaning. The only time I don't listen to anything is when I'm trying to sleep." },
        { q: "Did you learn to play a musical instrument as a child?",
          sample: "I had piano lessons for a couple of years when I was about eight, but I [[wasn't very disciplined|không kỷ luật lắm]] about practising, so I gave up. It's one of my [[biggest regrets|điều hối tiếc lớn nhất]], actually. I've been thinking about [[taking it up again|học lại]], maybe with the guitar this time, because it's more portable." },
        { q: "Has the way people listen to music changed?",
          sample: "Completely. When I was a kid, people bought CDs or downloaded songs, often illegally. Now almost everyone uses streaming services, so you have [[millions of songs at your fingertips|hàng triệu bài hát ngay trong tầm tay]]. The downside is that people rarely listen to whole albums any more — we tend to [[skip|bỏ qua, chuyển bài]] a song after a few seconds if it doesn't [[grab us|thu hút ta]] immediately." }
      ]
    },
    part2: {
      cue: "Describe a song or piece of music that is special to you.",
      bullets: ["You should say:", "what the song is", "when you first heard it", "what it is about", "and explain why it is special to you"],
      notes: ["'Diễm xưa' – Trịnh Công Sơn (1960s)", "dad's cassette tapes, rainy afternoons, age 7–8", "rain in Hue, a woman passing by, longing", "Khánh Ly's low, husky voice", "reminds me of dad; homesick in Hanoi", "taught me lyrics = poetry"],
      sample: [
        "The song I'd like to talk about is 'Diễm xưa' by Trịnh Công Sơn, who's probably Vietnam's most famous songwriter. It was written in the 1960s, so it's much older than me, but almost every Vietnamese person knows it.",
        "I first heard it when I was about seven or eight. My dad had a collection of old cassette tapes, and on rainy afternoons he'd play them while he was doing paperwork at home. I didn't understand the lyrics at the time, but I remember being [[struck by|ấn tượng mạnh bởi]] the melody — it was slow and quite [[melancholy|u buồn, sầu lắng]], and it seemed to suit the sound of the rain outside perfectly.",
        "The song is about rain in the city of Hue and a woman the songwriter used to see walking past. The lyrics are very poetic and a little mysterious; they're about longing, and the feeling that beautiful moments [[slip away|trôi tuột đi]] too quickly. The most famous version is sung by Khánh Ly, whose low, slightly husky voice gives it a real [[haunting quality|nét day dứt, ám ảnh]].",
        "There are two reasons it's special to me. The first is that it reminds me of my dad and those quiet afternoons at home. When I moved to Hanoi for university and [[felt homesick|nhớ nhà]], I'd sometimes play it on my phone, and it instantly made me feel closer to my family.",
        "The second reason is that it [[opened my eyes to|giúp tôi nhận ra]] how powerful lyrics can be. As I got older and understood the words properly, I realised how beautifully written they are, almost like poetry. It made me appreciate Vietnamese music and literature far more than I did as a teenager, when I only listened to K-pop!"
      ].join("\n\n")
    },
    part3: [
      { q: "Why do people from different generations often have different tastes in music?",
        sample: "Music is closely tied to identity, and people tend to [[form their tastes|hình thành gu]] in their teenage years. So whatever was popular when you were sixteen often stays 'your' music for life. Technology plays a role too — each generation discovered music differently, from radio to cassettes to TikTok. And sometimes young people deliberately choose music their parents dislike, as a way of [[asserting their independence|khẳng định sự độc lập]]. It's almost [[a rite of passage|một nghi thức trưởng thành]]." },
      { q: "Should music be a compulsory subject at school?",
        sample: "I think it should, at least in primary school. Learning music develops concentration, memory and teamwork, and some research suggests it can even [[boost|thúc đẩy]] performance in other subjects. It's also a great outlet for children who aren't especially [[academically inclined|thiên về học thuật]]. In Vietnam, music lessons are often [[squeezed out|bị lấn át, bị gạt ra]] by exam subjects, which I think is a shame." },
      { q: "How has technology affected the music industry?",
        sample: "Enormously. On the positive side, it's [[lowered the barriers|hạ thấp rào cản]] for new artists — anyone can record a song in their bedroom and upload it, and if it goes viral, they can become famous overnight. On the other hand, streaming services pay artists very little per play, so it's hard for most musicians to [[make a living|kiếm sống]]. And with algorithms recommending similar songs, there's a risk that music becomes more [[homogeneous|đồng nhất, na ná nhau]]." }
    ]
  });

  topics.push({
    id: "sp-18", title: "Weather", titleVi: "Thời tiết",
    tag: "evergreen", topic: "environment",
    part1: {
      name: "Weather",
      questions: [
        { q: "What's the weather like where you live?",
          sample: "Hanoi has four fairly distinct seasons, which surprises people who imagine Vietnam is tropical all year round. Summer is [[scorching|nóng như thiêu đốt]] and humid, while winter can be surprisingly cold and damp. My favourite time is autumn — the air is [[crisp|mát lạnh, trong trẻo]] and dry, and the streets smell of milk flowers. It's [[without doubt|chắc chắn]] the best season." },
        { q: "What kind of weather do you like most?",
          sample: "I love cool, sunny days — around twenty degrees with clear skies. That kind of weather [[puts me in a good mood|khiến tôi vui vẻ]] and makes me want to get outside. I'm not a fan of the [[hot, sticky|nóng ẩm, nhớp nháp]] weather we get in summer, when you [[break into a sweat|toát mồ hôi]] the moment you step outside." },
        { q: "Does the weather affect your mood?",
          sample: "Definitely. During the long grey spells in late winter, when it drizzles for weeks, I [[feel quite sluggish|thấy khá uể oải]] and find it hard to get motivated. As soon as the sun comes out, my energy [[picks up|khá lên]]. Apparently that's quite common, and some people even suffer from a kind of [[seasonal depression|trầm cảm theo mùa]]." },
        { q: "Has the weather in your country changed in recent years?",
          sample: "I think so, and it's quite worrying. Summers seem to be getting hotter, with more [[heatwaves|đợt nắng nóng]], and storms in the central region are becoming more [[severe|dữ dội]]. My grandparents often say the seasons used to be [[more predictable|dễ đoán hơn]]; now it can be cold one day and hot the next." }
      ]
    },
    part2: {
      cue: "Describe a time when the weather affected your plans.",
      bullets: ["You should say:", "when it happened", "what you had planned to do", "what the weather was like", "and explain how you felt about it"],
      notes: ["2 summers ago, Ha Long Bay, 5 school friends", "plan: overnight cruise, kayaking in caves", "storm changed direction – boats banned", "stuck in hotel 2 days; seafood, karaoke", "disappointed → fondest memories", "lesson: be flexible"],
      sample: [
        "I'd like to talk about a trip to Ha Long Bay a couple of summers ago, when the weather completely [[threw our plans into chaos|làm kế hoạch đảo lộn hoàn toàn]].",
        "There were five of us, all close friends from high school, and we'd been planning the trip for months. The highlight was supposed to be an overnight cruise around the bay, with kayaking through the caves and sleeping on the boat. We'd [[splashed out on|chi mạnh tay cho]] a fairly nice cruise, so we were really looking forward to it.",
        "The day before we left, we noticed a tropical storm developing out at sea, but the forecast suggested it would miss us. Unfortunately, it changed direction. By the time we arrived, the sky was dark grey, the wind was howling, and the authorities had banned all boats from leaving the harbour. Our cruise was cancelled, and we were stuck in a small hotel while it poured with rain for two days.",
        "At first I was really disappointed, because we'd been so excited. But we decided to [[make the best of it|tận dụng tối đa hoàn cảnh]]. Whenever the rain [[eased off|ngớt, dịu đi]], we explored the town, and we found an amazing local seafood restaurant. We also spent one evening at a karaoke place, singing terribly until midnight. Strangely enough, those are some of my [[fondest memories|kỷ niệm đẹp nhất]] of that summer.",
        "Looking back, it taught me to be more flexible. Plans don't always work out, especially when nature is involved, and sometimes the unplanned moments [[turn out to be|hoá ra lại là]] the best ones. We did go back and do the cruise the following year, but honestly, the stormy trip is the one we still [[laugh about|cười khi nhắc lại]] whenever we meet up."
      ].join("\n\n")
    },
    part3: [
      { q: "How does the weather affect people's lifestyles in your country?",
        sample: "Quite significantly. In the south, where it's hot all year, a lot of social life happens outdoors in the evening, when it's cooler — people sit on tiny plastic stools on the pavement drinking iced coffee. In the north, the cold winters mean people [[stay in|ở nhà]] more and eat warming dishes like hotpot. Farming depends heavily on the weather, so in rural areas the seasons [[dictate|chi phối, quyết định]] when people plant and harvest. And typhoons are a constant threat in the central region, so people there are very [[resilient|kiên cường]]." },
      { q: "Do you think weather forecasts are reliable?",
        sample: "They've improved a lot, thanks to satellites and better computer models. For the next day or two, they're usually [[spot on|chính xác hoàn toàn]]. Beyond about a week, though, I take them [[with a pinch of salt|bán tín bán nghi]], because weather systems are so complex. In Vietnam, typhoon forecasting is especially important, and I think the warnings have [[saved countless lives|cứu sống vô số người]] in recent years." },
      { q: "What can individuals do to tackle climate change?",
        sample: "Individually, our impact is small, but collectively it [[adds up|cộng dồn lại thành đáng kể]]. People can cut down on energy use, take public transport and eat less red meat, which has a surprisingly large [[carbon footprint|lượng khí thải carbon]]. But I'd argue the most powerful thing individuals can do is [[put pressure on|gây áp lực lên]] governments and companies, through how they vote and what they buy. Real change requires action [[on a large scale|trên quy mô lớn]]." }
    ]
  });

  topics.push({
    id: "sp-19", title: "Technology", titleVi: "Công nghệ",
    tag: "evergreen", topic: "technology",
    part1: {
      name: "Computers & the internet",
      questions: [
        { q: "How often do you use a computer?",
          sample: "Every single day, mostly for university work — writing reports, doing research and attending online classes. I'd say I spend at least five hours a day at a screen, which [[isn't great for|không tốt cho]] my eyes. I try to [[take regular breaks|nghỉ giải lao thường xuyên]], but when a deadline is [[looming|đang cận kề]], I tend to forget." },
        { q: "What do you mainly use the internet for?",
          sample: "Studying, communicating and — I'll admit — a fair amount of entertainment. I [[look things up|tra cứu]] constantly, watch lectures and practise English with podcasts. In the evenings, I [[unwind|thư giãn]] with YouTube or a series on Netflix. Honestly, I can't imagine how people [[got by|xoay xở được]] without it." },
        { q: "Do you think you spend too much time online?",
          sample: "Probably, yes. My phone shows my average screen time, and the number is [[a bit alarming|hơi đáng báo động]]. A lot of it is [[mindless scrolling|lướt điện thoại vô thức]] rather than anything useful. I've started leaving my phone in another room when I study, and that [[makes a real difference|tạo khác biệt rõ rệt]]." },
        { q: "Did you use computers when you were a child?",
          sample: "Not much, compared to kids today. We got a family computer when I was about ten, and it was [[painfully slow|chậm kinh khủng]]. I mainly played simple games on it, and my parents [[strictly limited|giới hạn nghiêm ngặt]] my time. Nowadays toddlers can use tablets before they can talk, which I find [[quite concerning|khá đáng lo ngại]]." }
      ]
    },
    part2: {
      cue: "Describe a piece of technology that you find difficult to use.",
      bullets: ["You should say:", "what it is", "when you started using it", "why it is difficult to use", "and explain how you feel about it"],
      notes: ["'smart' washing machine in my flat", "landlord replaced old one last year", "icon-only buttons, app keeps crashing, 20 programmes", "shrank my wool sweater; random error code", "100-page manual, videos → use 2–3 basic programmes", "frustrated – over-engineered; buy basic model"],
      sample: [
        "The piece of technology I find surprisingly difficult to use is the washing machine in my apartment. It sounds ridiculous, I know, but [[bear with me|hãy nghe tôi kể đã]].",
        "Last year, our landlord replaced the old machine with a brand-new 'smart' one. On paper, it's very impressive. It connects to an app on your phone, it supposedly measures how dirty your clothes are, and it has around twenty different programmes. The problem is that it's far more complicated than it needs to be.",
        "For a start, the buttons are just icons, with no words, and some of them are honestly [[impossible to decipher|không thể giải mã nổi]]. To use the more advanced features, you have to connect it to Wi-Fi through the app, which kept [[crashing|bị treo, bị sập]] on my phone. The first time I used it, I chose what I thought was a gentle cycle, and my favourite wool sweater came out two sizes smaller. Another time, it stopped halfway through and displayed an error code that meant nothing to me.",
        "I did try to [[get to the bottom of it|tìm ra tận gốc vấn đề]]. I downloaded the manual, which was over a hundred pages long, and watched a few videos online. Eventually I worked out two or three basic programmes, and now I [[stick to those|chỉ dùng mấy chế độ đó]] and ignore everything else.",
        "How do I feel about it? Mostly frustrated. I think it's a good example of technology being [[over-engineered|thiết kế phức tạp thừa thãi]]. A washing machine should be simple — you put clothes in, press a button, and they come out clean. Adding features nobody uses just [[makes life harder|làm cuộc sống khó khăn hơn]]. If I ever buy my own, I'll choose the most basic model I can find!"
      ].join("\n\n")
    },
    part3: [
      { q: "Why do some people find it difficult to keep up with new technology?",
        sample: "Technology changes so quickly that even young people struggle sometimes — every update moves buttons around or adds features you have to learn. For older people, there's often a lack of confidence; they're afraid of [[pressing the wrong button|bấm nhầm nút]] and breaking something, or of being scammed. Some people simply don't see the benefit, so they have [[little incentive|ít động lực]] to learn. Designers could do much more to make products [[intuitive|trực quan, dễ dùng]]." },
      { q: "Has technology made our lives better or worse?",
        sample: "Overall better, I think, but it's [[a double-edged sword|con dao hai lưỡi]]. Medical technology has saved millions of lives, and the internet has made information available to almost everyone. However, it's also created new problems — phone addiction, the spread of misinformation, and a feeling that we're always [[on call|luôn phải trực, sẵn sàng]] for work. The challenge is learning to use technology [[on our own terms|theo cách của chính mình]] rather than letting it control us." },
      { q: "What technology do you think will change our lives the most in the future?",
        sample: "Artificial intelligence, without a doubt. It's already [[transforming|làm thay đổi sâu sắc]] how we search for information, write and even create art. In future, it could revolutionise healthcare, for example by spotting diseases earlier than human doctors can. But it also [[raises serious questions|đặt ra những câu hỏi nghiêm túc]] about jobs and privacy. I think the way governments regulate it will [[make or break|quyết định thành bại]] whether it benefits society as a whole." }
    ]
  });

  topics.push({
    id: "sp-20", title: "Food", titleVi: "Ẩm thực",
    tag: "evergreen", topic: "food",
    part1: {
      name: "Food & cooking",
      questions: [
        { q: "What's your favourite food?",
          sample: "[[That's a tough one|Câu này khó đấy]], but I'd probably say bun cha — grilled pork with rice noodles and herbs in a slightly sweet dipping sauce. It's [[a Hanoi speciality|đặc sản Hà Nội]], and there's a little place near my flat that [[does it brilliantly|làm món đó cực ngon]]. The smell of pork grilling over charcoal is [[irresistible|không thể cưỡng lại]], especially around lunchtime." },
        { q: "Do you like cooking?",
          sample: "I do, although I'm not particularly skilled. I can [[whip up|nấu nhanh]] a few simple dishes, like fried rice or a basic soup, but anything complicated is [[beyond me|vượt quá khả năng của tôi]]. I find cooking quite relaxing after a long day, and it's much cheaper and healthier than [[eating out|ăn ngoài]] all the time." },
        { q: "Did you eat different food when you were a child?",
          sample: "Not very different, but I was a much [[fussier eater|người kén ăn hơn]] back then. I refused to eat bitter melon, which my mum cooked all the time, and now I actually love it — I think your taste [[matures|thay đổi, trưởng thành]] as you get older. Also, there wasn't much foreign food around, whereas now I can [[get my hands on|kiếm được]] pizza or sushi on almost every street." },
        { q: "Do you think people eat more healthily now than in the past?",
          sample: "It's a mixed picture. People are more aware of nutrition, and there are plenty of salad bars in big cities. But at the same time, fast food and [[sugary drinks|đồ uống có đường]] are more popular than ever, especially with young people. Busy lifestyles mean many people [[grab whatever's convenient|vớ lấy thứ gì tiện nhất]] instead of cooking. So knowledge has improved, but habits [[haven't necessarily followed|chưa hẳn đã theo kịp]]." }
      ]
    },
    part2: {
      cue: "Describe a memorable meal you had with friends or family.",
      bullets: ["You should say:", "when and where it was", "who you were with", "what you ate", "and explain why it was memorable"],
      notes: ["grandma's 80th birthday, family home in Nam Dinh", "30+ relatives, 3–4 generations", "cooked together – washing herbs, rolling spring rolls", "chicken, sticky rice, spring rolls, grandma's crab noodle soup", "her speech – people welled up", "last gathering before cousin emigrated"],
      sample: [
        "The meal I'd like to talk about was my grandmother's eightieth birthday celebration, which took place at my family home in Nam Dinh about two years ago.",
        "In Vietnam, an eightieth birthday is [[a really big deal|chuyện vô cùng hệ trọng]], so relatives came from all over the country — there must have been more than thirty of us, from great-aunts in their nineties to babies only a few months old. It was the first time in years that the whole extended family had been [[under one roof|dưới cùng một mái nhà]].",
        "What made it special was that we cooked everything ourselves. The preparation started the day before, and the kitchen was [[a hive of activity|nhộn nhịp, tấp nập]]. The older women were in charge of the main dishes, while my cousins and I washed herbs and rolled spring rolls — mine were [[a bit of a mess|hơi lộn xộn]], to be honest. The final spread was incredible: boiled chicken, sticky rice, spring rolls, and my grandmother's famous crab noodle soup, which she insisted on making herself.",
        "During the meal, she gave a short speech. She talked about the hardships she'd been through as a young woman and said that seeing all of us together was the best present she could have asked for. Quite a few people [[welled up|rưng rưng nước mắt]], including me.",
        "There are a couple of reasons it's so memorable. It was a rare chance to [[reconnect with|kết nối lại với]] relatives I hardly ever see, and one of my cousins emigrated to Australia a few months later, so it turned out to be the last time we were all together. It reminded me that food is really about [[bringing people together|gắn kết mọi người]]."
      ].join("\n\n")
    },
    part3: [
      { q: "How have eating habits changed in your country in recent years?",
        sample: "There have been big changes, especially in cities. Food delivery apps have [[exploded in popularity|bùng nổ về độ phổ biến]], so a lot of young people rarely cook. Fast food and bubble tea are everywhere, and families eat together less often because people work longer hours. On the positive side, there's growing interest in [[organic produce|nông sản hữu cơ]] and [[plant-based|thuần thực vật]] diets, partly because of [[food safety concerns|lo ngại về an toàn thực phẩm]]." },
      { q: "Why is food an important part of culture?",
        sample: "Food carries a lot of history. The dishes a country eats reflect its geography, its climate and even its past — Vietnamese bánh mì, for example, is a direct result of French influence. Food is also central to celebrations; at Tet, certain dishes are [[essential|không thể thiếu]], and making them together is a way of [[passing down|truyền lại]] traditions from one generation to the next. When people live abroad, cooking food from home is often how they [[stay connected to|giữ kết nối với]] their roots." },
      { q: "Should the government do more to encourage healthy eating?",
        sample: "I think it has a role to play, although it shouldn't be too [[heavy-handed|áp đặt, mạnh tay]]. Taxes on sugary drinks have worked quite well in some countries, and clearer food labelling would help people make [[informed choices|lựa chọn có hiểu biết]]. Schools are particularly important — providing nutritious lunches and teaching children about food could shape habits for life. But ultimately, people need to take [[personal responsibility|trách nhiệm cá nhân]] for what they eat." }
    ]
  });

  IELTS.data.speaking = {
    forecast: forecast,
    guides: guides,
    topics: topics
  };
})();
