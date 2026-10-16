/* Reading Practice Test 2 (RD2) — original content written for practice, not a real exam paper. */
(function () {
  "use strict";

  var DIAGRAM_SVG = [
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 380' role='img' aria-label='Cross-section of a leafcutter ant nest' style='max-width:100%;height:auto;font-family:Nunito,system-ui,sans-serif'>",
    "<defs><marker id='r2arr' viewBox='0 0 10 10' refX='5' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0,0 L10,5 L0,10 z' fill='#1F2A3D'/></marker></defs>",
    "<rect x='0' y='0' width='600' height='120' fill='#F4EFE4'/>",
    "<rect x='0' y='120' width='600' height='260' fill='#E8DCC4'/>",
    "<path d='M140,120 Q300,40 460,120 Z' fill='#D9C7A3' stroke='#8A6F4A' stroke-width='2'/>",
    "<line x1='0' y1='120' x2='600' y2='120' stroke='#8A6F4A' stroke-width='2'/>",
    "<text x='300' y='108' text-anchor='middle' font-size='12' fill='#4A5568'>mound of loose soil</text>",
    "<line x1='300' y1='70' x2='300' y2='22' stroke='#1F2A3D' stroke-width='2' marker-end='url(#r2arr)'/>",
    "<text x='312' y='30' font-size='12' fill='#1F2A3D'>stale air escapes</text>",
    "<line x1='170' y1='70' x2='178' y2='108' stroke='#1F2A3D' stroke-width='2' marker-end='url(#r2arr)'/>",
    "<line x1='430' y1='70' x2='422' y2='108' stroke='#1F2A3D' stroke-width='2' marker-end='url(#r2arr)'/>",
    "<circle cx='150' cy='58' r='13' fill='#FFFFFF' stroke='#1F2A3D' stroke-width='2'/><text x='150' y='63' text-anchor='middle' font-size='13' font-weight='700' fill='#1F2A3D'>10</text>",
    "<path d='M300,95 L300,190 M300,190 L200,200 M300,190 L410,205 M300,190 L300,300' stroke='#8A6F4A' stroke-width='6' fill='none' stroke-linecap='round'/>",
    "<ellipse cx='185' cy='205' rx='48' ry='26' fill='#F7F1E3' stroke='#8A6F4A' stroke-width='2'/>",
    "<ellipse cx='425' cy='210' rx='48' ry='26' fill='#F7F1E3' stroke='#8A6F4A' stroke-width='2'/>",
    "<circle cx='185' cy='205' r='13' fill='#FFFFFF' stroke='#1F2A3D' stroke-width='2'/><text x='185' y='210' text-anchor='middle' font-size='13' font-weight='700' fill='#1F2A3D'>11</text>",
    "<text x='425' y='214' text-anchor='middle' font-size='11' fill='#4A5568'>(size of a football)</text>",
    "<ellipse cx='300' cy='320' rx='62' ry='28' fill='#CDBB98' stroke='#8A6F4A' stroke-width='2'/>",
    "<circle cx='300' cy='320' r='13' fill='#FFFFFF' stroke='#1F2A3D' stroke-width='2'/><text x='300' y='325' text-anchor='middle' font-size='13' font-weight='700' fill='#1F2A3D'>12</text>",
    "<text x='380' y='350' font-size='11' fill='#4A5568'>spent fungus and dead ants</text>",
    "<circle cx='340' cy='255' r='13' fill='#FFFFFF' stroke='#1F2A3D' stroke-width='2'/><text x='340' y='260' text-anchor='middle' font-size='13' font-weight='700' fill='#1F2A3D'>13</text>",
    "<line x1='40' y1='120' x2='40' y2='345' stroke='#1F2A3D' stroke-width='1.5' marker-start='url(#r2arr)' marker-end='url(#r2arr)'/>",
    "<text x='50' y='240' font-size='12' fill='#1F2A3D'>up to 8 m</text>",
    "</svg>"
  ].join("");

  var test = {
    id: "R2",
    title: "Practice Test 2",
    source: "Biên soạn cho luyện tập (không phải đề thi thật)",
    passages: [
      /* ------------------------------------------------------------------ */
      /* PASSAGE 1 — animals                                                  */
      /* ------------------------------------------------------------------ */
      {
        id: "R2-P1",
        part: 1,
        title: "The Farmers Beneath the Forest Floor",
        topic: "animals",
        intro: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
        paragraphs: [
          { label: "", text: "Long before humans planted their first crops, a group of insects in the tropical Americas had already mastered agriculture. Leafcutter ants, which belong to the genera Atta and Acromyrmex, do not eat the leaves they carry. Instead, they use the fresh vegetation as a growing medium for a fungus, which in turn becomes the colony's only source of food. This partnership, which biologists estimate began some 50 million years ago, is one of the most sophisticated examples of mutual dependence in the natural world, and it has turned these ants into the dominant herbivores of many Central and South American forests." },
          { label: "", text: "A mature leafcutter colony is a remarkable feat of organisation. A single nest may house more than five million individuals, all of them the offspring of one queen, who can live for over a decade and lay tens of thousands of eggs a day. The workers are divided into distinct castes according to their size. The largest, known as soldiers, have powerful jaws and defend the nest against intruders such as army ants. Medium-sized foragers travel out along cleared trails to cut leaves, while the smallest workers, called minims, remain inside, tending the fungus and caring for the young. Some minims also ride on the leaf fragments that foragers carry home, apparently to protect their larger sisters from parasitic flies that attempt to lay eggs on them." },
          { label: "", text: "The foraging trails themselves are an engineering achievement. Workers clear them of debris so thoroughly that they resemble miniature highways, and in large colonies they can extend more than 200 metres from the nest. Along these routes the ants lay down chemical signals called pheromones, which guide other foragers towards productive trees. A forager can carry a leaf fragment weighing up to 20 times its own body mass, cutting it with a vibrating motion of its jaws that works rather like an electric knife. Researchers have found that colonies are surprisingly selective: rather than stripping a single tree bare, they spread their harvesting across many plants, a strategy that may prevent any one species from building up chemical defences against them." },
          { label: "", text: "The real work, however, takes place underground. When leaf fragments reach the nest, they are passed to smaller workers, who clean them, chew them into a pulp and fertilise them with their own droppings. This pulp is then added to the fungus garden, a spongy structure housed in a chamber roughly the size of a football. A large nest may contain several hundred such chambers, connected by a network of tunnels that descend as far as eight metres below the surface. Above ground, the nest is marked by a broad mound of loose soil excavated by the workers, which in the case of Atta colonies can cover an area of 50 square metres. Openings in the centre of the mound allow stale, carbon-dioxide-rich air to escape, while fresh air is drawn in through holes on the outer edges, a form of passive ventilation powered by the wind blowing across the surface." },
          { label: "", text: "Disposing of waste is just as important as producing food. Spent fungus material and dead ants are carried to dedicated refuse chambers, which are usually located deeper than the gardens, or, in some species, dumped on piles outside the nest. The workers who handle this waste are typically older ants near the end of their lives, and they are strictly prevented from returning to the gardens. This separation appears to reduce the risk of spreading disease, since the refuse is rich in harmful microbes." },
          { label: "", text: "The fungus the ants cultivate is not found growing wild; it depends entirely on them for its survival. In return, it produces small swollen tips called gongylidia, which are rich in sugars and fats and are fed to the larvae. Like human farmers, however, the ants must deal with pests. A parasitic mould known as Escovopsis can invade the gardens and destroy them within days. To combat it, the ants carry colonies of bacteria on their bodies that produce antibiotics capable of suppressing the mould. A study led by entomologist Dr Rosa Ventimiglia at the Instituto Tropical de Belém also reported that workers groom infected areas and physically remove contaminated material, combining what she called 'chemical and manual weeding'." },
          { label: "", text: "The ecological impact of leafcutter ants is enormous. A single large colony can harvest as much vegetation in a year as a cow, and the ants are responsible for moving vast quantities of soil, which improves its aeration and distributes nutrients. In agricultural areas, though, they are regarded as serious pests, causing millions of dollars of damage to citrus and eucalyptus plantations each year. Farmers have traditionally relied on chemical insecticides, but these are increasingly restricted. Some scientists now argue that a better understanding of the ants' own disease-control methods could inspire new, more environmentally friendly approaches to crop protection, both for controlling the ants themselves and for agriculture more widely." }
        ],
        groups: [
          {
            type: "tfng",
            kind: "tfng",
            variant: "tfng",
            range: [1, 6],
            instruction: "Do the following statements agree with the information given in Reading Passage 1? Write <b>TRUE</b> if the statement agrees with the information, <b>FALSE</b> if the statement contradicts the information, <b>NOT GIVEN</b> if there is no information on this.",
            questions: [
              { n: 1, text: "Leafcutter ants feed directly on the leaves they collect.", answer: "FALSE",
                explain: "Đoạn 1: 'Leafcutter ants ... do not eat the leaves they carry. Instead, they use the fresh vegetation as a growing medium for a fungus' → kiến không ăn lá mà dùng lá để trồng nấm, mâu thuẫn với câu hỏi → FALSE." },
              { n: 2, text: "A leafcutter queen may live for more than ten years.", answer: "TRUE",
                explain: "Đoạn 2: 'one queen, who can live for over a decade' → 'over a decade' = hơn mười năm → TRUE." },
              { n: 3, text: "Minims that ride on leaf fragments always succeed in keeping parasitic flies away.", answer: "NOT GIVEN",
                explain: "Đoạn 2 chỉ nói minims cưỡi trên lá 'apparently to protect their larger sisters from parasitic flies' (có vẻ là để bảo vệ). Bài không nói việc này có luôn thành công hay không → NOT GIVEN." },
              { n: 4, text: "Leafcutter colonies tend to collect leaves from many different plants rather than from a single tree.", answer: "TRUE",
                explain: "Đoạn 3: 'rather than stripping a single tree bare, they spread their harvesting across many plants' → đúng như câu hỏi → TRUE." },
              { n: 5, text: "Leafcutter ants are more active at night than during the day.", answer: "NOT GIVEN",
                explain: "Bài đọc không hề nhắc đến thời gian hoạt động (ngày hay đêm) của kiến. Đoạn 3 chỉ mô tả đường mòn, pheromone và cách cắt lá → NOT GIVEN." },
              { n: 6, text: "Ants that work with waste are later moved to work in the fungus gardens.", answer: "FALSE",
                explain: "Đoạn 5: 'The workers who handle this waste ... are strictly prevented from returning to the gardens' → kiến xử lý rác bị cấm quay lại vườn nấm, trái ngược với câu hỏi → FALSE." }
            ]
          },
          {
            type: "note",
            kind: "gap",
            range: [7, 9],
            instruction: "Complete the table below. Choose <b>NO MORE THAN TWO WORDS</b> from the passage for each answer.",
            title: "Leafcutter worker castes",
            wordLimit: "NO MORE THAN TWO WORDS",
            content: "<table class='q-table'><thead><tr><th>Caste</th><th>Relative size</th><th>Main role</th></tr></thead><tbody>" +
              "<tr><td>Soldiers</td><td>largest</td><td>defend the nest against intruders, e.g. {{7}}</td></tr>" +
              "<tr><td>Foragers</td><td>medium</td><td>cut leaves using a vibrating motion of the jaws, similar to an electric {{8}}</td></tr>" +
              "<tr><td>Minims</td><td>smallest</td><td>tend the fungus and care for the young; some ride on leaves to protect foragers from parasitic {{9}}</td></tr>" +
              "</tbody></table>",
            answers: {
              "7": ["army ants"],
              "8": ["knife"],
              "9": ["flies"]
            },
            explain: {
              "7": "Đoạn 2: 'The largest, known as soldiers, have powerful jaws and defend the nest against intruders such as army ants' → army ants.",
              "8": "Đoạn 3: 'cutting it with a vibrating motion of its jaws that works rather like an electric knife' → knife.",
              "9": "Đoạn 2: 'Some minims also ride on the leaf fragments ... to protect their larger sisters from parasitic flies' → flies."
            }
          },
          {
            type: "diagram",
            kind: "gap",
            range: [10, 13],
            instruction: "Label the diagram below. Choose <b>NO MORE THAN TWO WORDS</b> from the passage for each answer.",
            title: "Cross-section of a leafcutter ant nest",
            wordLimit: "NO MORE THAN TWO WORDS",
            image: DIAGRAM_SVG,
            content: "<p><b>10</b> &nbsp;{{10}} is drawn in through holes on the outer edges of the mound</p>" +
              "<p><b>11</b> &nbsp;the {{11}} garden — a spongy structure where the leaf pulp is added</p>" +
              "<p><b>12</b> &nbsp;{{12}} chamber, usually located deeper than the gardens</p>" +
              "<p><b>13</b> &nbsp;a network of {{13}} connecting the chambers</p>",
            answers: {
              "10": ["fresh air"],
              "11": ["fungus"],
              "12": ["refuse"],
              "13": ["tunnels"]
            },
            explain: {
              "10": "Đoạn 4: 'fresh air is drawn in through holes on the outer edges' → fresh air (khí cũ thoát ra ở giữa gò, khí sạch vào ở mép).",
              "11": "Đoạn 4: 'This pulp is then added to the fungus garden, a spongy structure housed in a chamber roughly the size of a football' → fungus.",
              "12": "Đoạn 5: 'Spent fungus material and dead ants are carried to dedicated refuse chambers, which are usually located deeper than the gardens' → refuse.",
              "13": "Đoạn 4: 'several hundred such chambers, connected by a network of tunnels that descend as far as eight metres below the surface' → tunnels."
            }
          }
        ],
        vocab: [
          { id: "sophisticated", word: "sophisticated", ipa: "/səˈfɪstɪkeɪtɪd/", pos: "adj.", band: "7.0", vi: "tinh vi, phức tạp", example: "The museum uses a sophisticated system to control humidity around its oldest paintings.", topic: "animals" },
          { id: "mutual-dependence", word: "mutual dependence", ipa: "/ˈmjuːtʃuəl dɪˈpendəns/", pos: "collocation", band: "7.5+", vi: "sự phụ thuộc lẫn nhau", example: "Bees and flowering plants have evolved a relationship of mutual dependence.", topic: "animals" },
          { id: "herbivore", word: "herbivore", ipa: "/ˈhɜːbɪvɔː/", pos: "n.", band: "7.0", vi: "động vật ăn cỏ", example: "Large herbivores such as elephants shape the landscape by knocking down trees.", topic: "animals" },
          { id: "feat", word: "feat", ipa: "/fiːt/", pos: "n.", band: "7.0", vi: "kỳ công, thành tích đáng nể", example: "Crossing the desert on foot in just ten days was an extraordinary feat.", topic: "animals" },
          { id: "offspring", word: "offspring", ipa: "/ˈɒfsprɪŋ/", pos: "n.", band: "6.5", vi: "con cái, thế hệ con", example: "Female turtles leave their offspring to hatch alone on the beach.", topic: "animals" },
          { id: "intruder", word: "intruder", ipa: "/ɪnˈtruːdə/", pos: "n.", band: "7.0", vi: "kẻ xâm nhập", example: "The geese made a loud noise to warn the farm of an intruder.", topic: "animals" },
          { id: "forager", word: "forager", ipa: "/ˈfɒrɪdʒə/", pos: "n.", band: "7.5+", vi: "cá thể đi kiếm ăn", example: "Honeybee foragers may fly several kilometres in search of nectar.", topic: "animals" },
          { id: "parasitic", word: "parasitic", ipa: "/ˌpærəˈsɪtɪk/", pos: "adj.", band: "7.0", vi: "ký sinh", example: "Some parasitic worms can survive inside their host for many years.", topic: "animals" },
          { id: "debris", word: "debris", ipa: "/ˈdebriː/", pos: "n.", band: "7.0", vi: "mảnh vụn, rác vụn", example: "Volunteers spent the morning clearing debris from the river bank after the storm.", topic: "animals" },
          { id: "selective", word: "selective", ipa: "/sɪˈlektɪv/", pos: "adj.", band: "6.5", vi: "có chọn lọc, kén chọn", example: "Pandas are highly selective eaters, feeding almost entirely on bamboo.", topic: "animals" },
          { id: "excavate", word: "excavate", ipa: "/ˈekskəveɪt/", pos: "v.", band: "7.5+", vi: "đào (đất), khai quật", example: "Rabbits excavate complex burrows with several entrances.", topic: "animals" },
          { id: "passive-ventilation", word: "passive ventilation", ipa: "/ˈpæsɪv ˌventɪˈleɪʃn/", pos: "collocation", band: "7.5+", vi: "thông gió thụ động (không dùng máy)", example: "The architect relied on passive ventilation to keep the school cool without air conditioning.", topic: "animals" },
          { id: "dispose-of", word: "dispose of", ipa: "/dɪˈspəʊz ɒv/", pos: "phr.", band: "7.0", vi: "xử lý, vứt bỏ", example: "Hospitals must dispose of used needles in special containers.", topic: "animals" },
          { id: "cultivate", word: "cultivate", ipa: "/ˈkʌltɪveɪt/", pos: "v.", band: "7.0", vi: "trồng trọt, nuôi cấy", example: "Farmers in the region have cultivated rice on these terraces for centuries.", topic: "animals" },
          { id: "suppress", word: "suppress", ipa: "/səˈpres/", pos: "v.", band: "7.0", vi: "ức chế, kìm hãm", example: "Certain plants release chemicals that suppress the growth of nearby weeds.", topic: "animals" },
          { id: "aeration", word: "aeration", ipa: "/eəˈreɪʃn/", pos: "n.", band: "8.0+", vi: "sự thông khí (cho đất, nước)", example: "Earthworms improve the aeration of garden soil by creating small channels.", topic: "animals" },
          { id: "environmentally-friendly", word: "environmentally friendly", ipa: "/ɪnˌvaɪrənˈmentəli ˈfrendli/", pos: "collocation", band: "6.5", vi: "thân thiện với môi trường", example: "The company switched to environmentally friendly packaging made from recycled card.", topic: "animals" }
        ]
      },

      /* ------------------------------------------------------------------ */
      /* PASSAGE 2 — education                                                */
      /* ------------------------------------------------------------------ */
      {
        id: "R2-P2",
        part: 2,
        title: "The Case for Handwriting in a Digital Classroom",
        topic: "education",
        intro: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
        paragraphs: [
          { label: "A", text: "Across much of the developed world, the pencil is in retreat. In many primary schools, children now spend more time tapping on tablets than forming letters on paper, and several education authorities have reduced or removed the requirement to teach joined-up handwriting. The reasoning is straightforward: adults increasingly write with keyboards, so school time might be better spent on digital skills. The shift has been accelerated by the spread of inexpensive devices and by the pressure on teachers to cover an ever-expanding curriculum within the same number of hours. Yet a growing body of research suggests that abandoning handwriting may carry hidden costs for the way children learn to read, remember and think." },
          { label: "B", text: "Some of the most striking evidence comes from studies of brain activity. Dr Helena Marsh, a cognitive neuroscientist at the University of Northfield, used imaging techniques to monitor five-year-olds who had been taught letters in one of three ways: by tracing them, by typing them, or by writing them freehand. Only the freehand group showed heightened activity in the regions of the brain associated with reading in adults. Marsh argues that the 'messiness' of early handwriting is in fact beneficial: because each attempt to form a letter looks slightly different, the child is forced to recognise the underlying shape rather than a single fixed image, which strengthens letter recognition. In her view, producing a letter from memory, stroke by stroke, links the motor system to the visual system in a way that pressing a key does not." },
          { label: "C", text: "Handwriting also appears to affect memory. In a widely cited experiment, Professor Tomasz Wieczorek of the Baltic Institute of Education asked university students to take notes during a lecture, either by hand or on a laptop. When tested a week later, those who had written by hand performed significantly better on conceptual questions, although the two groups recalled factual details equally well. The difference was most pronounced among students who had little prior knowledge of the subject. Wieczorek's explanation is that typists tend to transcribe lectures word for word, while handwriters, who cannot keep pace with the speaker, are obliged to summarise and rephrase. This extra mental effort, he suggests, is what helps information to stick." },
          { label: "D", text: "Not everyone accepts these conclusions. Dr Aiko Fujimura, an educational technologist, points out that many of the laptop studies were conducted with students who had received no training in effective digital note-taking. When her own team taught participants to paraphrase rather than transcribe, the advantage of handwriting largely disappeared. For Fujimura, the lesson is not that keyboards are harmful, but that the strategy matters more than the tool. She adds that digital notes have practical advantages that laboratory studies rarely measure: they can be searched, shared and reorganised with ease. Fujimura further warns that an overemphasis on neat handwriting can disadvantage children with conditions such as dyspraxia, for whom typing may be a liberating alternative." },
          { label: "E", text: "There is also the question of speed and fluency. Research led by Dr Samuel Okafor at Lakeshore College followed more than 600 children from the age of six to eleven, assessing them every year with the same writing tasks so that individual progress could be tracked in detail. He found that pupils whose handwriting was slow and laborious at age seven tended to produce shorter and less sophisticated compositions in later years, regardless of whether those compositions were handwritten or typed. Okafor concludes that when the physical act of writing demands too much attention, little capacity is left for planning and organising ideas. Crucially, he found that just ten minutes of daily handwriting practice was enough to close the gap for most pupils within a single school year." },
          { label: "F", text: "Cursive, or joined-up writing, is a particular battleground. Supporters claim that its continuous strokes help children to see words as whole units and to write more quickly. Professor Lena Brandt, a historian of education, is sceptical. Her analysis of curriculum records shows that cursive was originally promoted in the nineteenth century not for any cognitive benefit but because it reduced the number of times a writer needed to lift a dip pen, thereby limiting ink blots. 'We should be careful,' she writes, 'not to defend a practice simply because it is traditional.' Nevertheless, Brandt accepts that some fluent, legible style should be taught, whether joined or not." },
          { label: "G", text: "What, then, should schools do? Most researchers now favour a balanced approach in which handwriting is taught thoroughly in the early years, when it appears to support reading and spelling, while keyboard skills are introduced gradually from around the age of eight. Several education systems have already moved in this direction, making cursive optional while continuing to require clear printed handwriting alongside formal typing lessons. As one primary head teacher put it, the aim is not to choose between the pen and the keyboard, but to ensure that children are comfortable with both. Teachers, however, warn that such plans will succeed only if they are given sufficient time and training to deliver them." }
        ],
        groups: [
          {
            type: "info",
            kind: "match",
            range: [14, 18],
            instruction: "Reading Passage 2 has seven paragraphs, <b>A–G</b>. Which paragraph contains the following information? <b>NB</b> You may use any letter more than once.",
            allowReuse: true,
            options: [
              { key: "A", text: "Paragraph A" },
              { key: "B", text: "Paragraph B" },
              { key: "C", text: "Paragraph C" },
              { key: "D", text: "Paragraph D" },
              { key: "E", text: "Paragraph E" },
              { key: "F", text: "Paragraph F" },
              { key: "G", text: "Paragraph G" }
            ],
            questions: [
              { n: 14, text: "a historical reason for the introduction of a particular writing style", answer: "F",
                explain: "Đoạn F: 'cursive was originally promoted in the nineteenth century ... because it reduced the number of times a writer needed to lift a dip pen, thereby limiting ink blots' → lý do lịch sử cho kiểu chữ viết liền → F." },
              { n: 15, text: "a reference to a group of children for whom typing might be particularly helpful", answer: "D",
                explain: "Đoạn D: 'children with conditions such as dyspraxia, for whom typing may be a liberating alternative' → nhóm trẻ được lợi khi gõ phím → D." },
              { n: 16, text: "a description of a study that followed the same children over several years", answer: "E",
                explain: "Đoạn E: 'Research led by Dr Samuel Okafor ... followed more than 600 children from the age of six to eleven' → nghiên cứu theo dõi dài hạn → E." },
              { n: 17, text: "a suggestion about the age at which keyboard skills should be introduced", answer: "G",
                explain: "Đoạn G: 'keyboard skills are introduced gradually from around the age of eight' → độ tuổi bắt đầu dạy gõ phím → G." },
              { n: 18, text: "an explanation of why inconsistency in children's early letters can be useful", answer: "B",
                explain: "Đoạn B: 'because each attempt to form a letter looks slightly different, the child is forced to recognise the underlying shape ... which strengthens letter recognition' → sự 'lộn xộn' (không đồng đều) có lợi → B." }
            ]
          },
          {
            type: "features",
            kind: "match",
            range: [19, 23],
            instruction: "Look at the following statements (Questions 19–23) and the list of researchers below. Match each statement with the correct researcher, <b>A–E</b>.",
            optionsTitle: "List of Researchers",
            options: [
              { key: "A", text: "Helena Marsh" },
              { key: "B", text: "Tomasz Wieczorek" },
              { key: "C", text: "Aiko Fujimura" },
              { key: "D", text: "Samuel Okafor" },
              { key: "E", text: "Lena Brandt" }
            ],
            questions: [
              { n: 19, text: "Training in a particular technique can remove the benefit of writing by hand.", answer: "C",
                explain: "Đoạn D: 'When her own team taught participants to paraphrase rather than transcribe, the advantage of handwriting largely disappeared' → Fujimura → C." },
              { n: 20, text: "Having to condense information while taking notes helps learners to remember ideas.", answer: "B",
                explain: "Đoạn C: 'handwriters ... are obliged to summarise and rephrase. This extra mental effort, he suggests, is what helps information to stick' → Wieczorek → B." },
              { n: 21, text: "Difficulty with the physical process of writing limits a child's ability to structure ideas.", answer: "D",
                explain: "Đoạn E: 'Okafor concludes that when the physical act of writing demands too much attention, little capacity is left for planning and organising ideas' → D." },
              { n: 22, text: "A teaching practice should not be kept merely because it has a long history.", answer: "E",
                explain: "Đoạn F: Brandt viết 'We should be careful ... not to defend a practice simply because it is traditional' → E." },
              { n: 23, text: "Writing letters freehand activates the same brain areas that experienced readers use.", answer: "A",
                explain: "Đoạn B: 'Only the freehand group showed heightened activity in the regions of the brain associated with reading in adults' (nghiên cứu của Marsh) → A." }
            ]
          },
          {
            type: "short",
            kind: "gap",
            range: [24, 26],
            instruction: "Answer the questions below. Choose <b>NO MORE THAN THREE WORDS</b> from the passage for each answer.",
            wordLimit: "NO MORE THAN THREE WORDS",
            content: "<p><b>24</b> &nbsp;Apart from writing by hand, what did students in Wieczorek's experiment use to take notes? {{24}}</p>" +
              "<p><b>25</b> &nbsp;On which kind of questions did the handwriting group perform better? {{25}}</p>" +
              "<p><b>26</b> &nbsp;How much daily handwriting practice did Okafor find was enough to close the gap? {{26}}</p>",
            answers: {
              "24": ["a laptop", "laptop", "laptops"],
              "25": ["conceptual questions", "conceptual"],
              "26": ["ten minutes", "10 minutes", "just ten minutes"]
            },
            explain: {
              "24": "Đoạn C: 'asked university students to take notes during a lecture, either by hand or on a laptop' → a laptop.",
              "25": "Đoạn C: 'those who had written by hand performed significantly better on conceptual questions' → conceptual questions.",
              "26": "Đoạn E: 'just ten minutes of daily handwriting practice was enough to close the gap for most pupils' → ten minutes."
            }
          }
        ],
        vocab: [
          { id: "in-retreat", word: "in retreat", ipa: "/ɪn rɪˈtriːt/", pos: "phr.", band: "7.5+", vi: "đang thoái lui, mất dần vị thế", example: "Printed newspapers have been in retreat since most readers moved online.", topic: "education" },
          { id: "hidden-costs", word: "hidden costs", ipa: "/ˈhɪdn kɒsts/", pos: "collocation", band: "7.0", vi: "chi phí ẩn, cái giá không thấy ngay", example: "Studying abroad can involve hidden costs such as visa fees and health insurance.", topic: "education" },
          { id: "striking", word: "striking", ipa: "/ˈstraɪkɪŋ/", pos: "adj.", band: "7.0", vi: "nổi bật, đáng chú ý", example: "There is a striking difference between the results of the two schools.", topic: "education" },
          { id: "heightened", word: "heightened", ipa: "/ˈhaɪtnd/", pos: "adj.", band: "7.5+", vi: "tăng cao, được nâng lên", example: "Exam season often brings heightened levels of stress among teenagers.", topic: "education" },
          { id: "underlying", word: "underlying", ipa: "/ˌʌndəˈlaɪɪŋ/", pos: "adj.", band: "7.0", vi: "cơ bản, tiềm ẩn bên dưới", example: "Good teachers try to identify the underlying cause of a student's poor marks.", topic: "education" },
          { id: "widely-cited", word: "widely cited", ipa: "/ˈwaɪdli ˈsaɪtɪd/", pos: "collocation", band: "7.5+", vi: "được trích dẫn rộng rãi", example: "Her widely cited paper changed how universities assess group projects.", topic: "education" },
          { id: "conceptual", word: "conceptual", ipa: "/kənˈseptʃuəl/", pos: "adj.", band: "7.5+", vi: "thuộc về khái niệm", example: "Students need a conceptual understanding of fractions, not just memorised rules.", topic: "education" },
          { id: "transcribe", word: "transcribe", ipa: "/trænˈskraɪb/", pos: "v.", band: "7.0", vi: "chép lại, ghi lại nguyên văn", example: "The researcher transcribed every interview before analysing the data.", topic: "education" },
          { id: "paraphrase", word: "paraphrase", ipa: "/ˈpærəfreɪz/", pos: "v.", band: "7.0", vi: "diễn đạt lại bằng lời khác", example: "In the exam, try to paraphrase the question rather than copy it.", topic: "education" },
          { id: "overemphasis", word: "overemphasis", ipa: "/ˌəʊvərˈemfəsɪs/", pos: "n.", band: "8.0+", vi: "sự quá chú trọng", example: "Critics blame an overemphasis on testing for the decline in creative subjects.", topic: "education" },
          { id: "liberating", word: "liberating", ipa: "/ˈlɪbəreɪtɪŋ/", pos: "adj.", band: "7.5+", vi: "mang tính giải phóng, giúp thấy tự do", example: "Many adult learners find online courses liberating because they can study at their own pace.", topic: "education" },
          { id: "laborious", word: "laborious", ipa: "/ləˈbɔːriəs/", pos: "adj.", band: "7.5+", vi: "tốn công sức, chậm chạp nặng nhọc", example: "Checking every reference by hand was a laborious process.", topic: "education" },
          { id: "close-the-gap", word: "close the gap", ipa: "/kləʊz ðə ɡæp/", pos: "collocation", band: "7.0", vi: "thu hẹp khoảng cách", example: "Free tutoring programmes aim to close the gap between rich and poor pupils.", topic: "education" },
          { id: "battleground", word: "battleground", ipa: "/ˈbætlɡraʊnd/", pos: "n.", band: "7.5+", vi: "vấn đề gây tranh cãi gay gắt", example: "Homework policy has become a battleground between parents and schools.", topic: "education" },
          { id: "sceptical", word: "sceptical", ipa: "/ˈskeptɪkl/", pos: "adj.", band: "7.0", vi: "hoài nghi", example: "Some teachers remain sceptical about the value of educational games.", topic: "education" },
          { id: "legible", word: "legible", ipa: "/ˈledʒəbl/", pos: "adj.", band: "7.5+", vi: "(chữ viết) dễ đọc, rõ ràng", example: "Make sure your answers are legible, or the examiner may not be able to mark them.", topic: "education" },
          { id: "balanced-approach", word: "balanced approach", ipa: "/ˈbælənst əˈprəʊtʃ/", pos: "collocation", band: "6.5", vi: "cách tiếp cận cân bằng", example: "A balanced approach to screen time combines digital learning with outdoor play.", topic: "education" }
        ]
      },

      /* ------------------------------------------------------------------ */
      /* PASSAGE 3 — economy                                                  */
      /* ------------------------------------------------------------------ */
      {
        id: "R2-P3",
        part: 3,
        title: "The Lost Economics of Repair",
        topic: "economy",
        intro: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
        paragraphs: [
          { label: "A", text: "For most of human history, repairing broken objects was simply common sense. Shoes were resoled, radios were rewired and clothes were darned until they could be mended no longer. Entire trades, from cobblers to television repairers, made a modest living from extending the life of everyday possessions. In the space of two generations, however, this habit has largely disappeared from wealthy economies. When a smartphone screen cracks or a washing machine fails, the typical response is to replace rather than repair. Economists have generally explained this shift in terms of relative prices: as manufacturing has become cheaper and labour more expensive, the cost of fixing an item has risen relative to the cost of buying a new one. Yet this explanation, while not wrong, is incomplete, and a closer look suggests that the decline of repair is as much a product of design and policy as of market forces." },
          { label: "B", text: "Consider the way many modern products are assembled. Components that were once screwed together are now frequently glued, making them almost impossible to separate without damage. Batteries are sealed inside casings, specialised screws require tools that are not sold to the public, and replacement parts may be unavailable or priced so high that repair makes little sense. Manufacturers insist that these choices reflect legitimate priorities, such as making devices thinner, lighter and more water-resistant. Critics counter that they also have the convenient effect of shortening product lifespans and channelling consumers back to the shop. The truth probably lies somewhere in between, but it is difficult to deny that the interests of producers and consumers diverge here. Repair, in other words, is not merely becoming less economical; in many cases it is being designed out of products altogether." },
          { label: "C", text: "What the price tag does not capture is the wider cost of this throwaway model. Electronic waste is now one of the fastest-growing waste streams in the world, and only a modest fraction of it is formally recycled. Much of the environmental damage associated with a device, moreover, occurs before it ever reaches the consumer, during the extraction of raw materials and the energy-intensive manufacturing process. For a typical smartphone, the bulk of its lifetime carbon emissions is generated in the factory rather than in the hands of its owner. In economic terms, these are externalities: costs borne by society as a whole rather than by the buyer or the seller. Because they are excluded from market prices, new goods appear cheaper than they really are, and repair appears correspondingly less attractive. Extending the working life of products, even by a few years, would therefore deliver benefits that never show up on a shop receipt." },
          { label: "D", text: "Recognising this, a number of governments have begun to intervene. So-called right-to-repair legislation, which has been introduced in several jurisdictions, typically requires manufacturers to make spare parts, tools and repair manuals available to independent repairers and consumers for a set number of years after a product is sold. Some regulators have gone further, proposing repairability scores that must be displayed at the point of sale, much as energy-efficiency ratings are today. Early evidence from one such scheme, analysed by economist Dr Ines Carvalho of the Lisbon Centre for Consumer Policy, suggests that the scores influence purchasing decisions, and that manufacturers respond by redesigning products to achieve higher ratings. Such findings, if confirmed, suggest that relatively modest regulation can alter the incentives facing producers." },
          { label: "E", text: "Not all economists are persuaded that such measures will reverse the trend. One objection is that requiring manufacturers to stock spare parts for many years imposes costs that will inevitably be passed on to consumers in the form of higher prices. Another is that consumer preferences, rather than corporate strategy, are the main driver of replacement: many people upgrade their phones not because the old ones are broken but because they want the latest features. If so, making repair easier will do little to alter behaviour. There is some truth in both points, but neither is decisive. The first assumes that higher upfront prices are necessarily a bad thing, when in fact a more durable product may be cheaper over its lifetime; the second overlooks the substantial number of goods, from kettles to laptops, that are discarded simply because they have stopped working." },
          { label: "F", text: "Perhaps the most compelling argument for repair, however, is not environmental but economic in a broader sense. Repair is labour-intensive and inherently local: a broken laptop cannot be sent across the world to be fixed as cheaply as a new one can be shipped from a factory. A revival of repair could therefore support skilled employment in communities that have lost manufacturing jobs, while keeping money circulating within local economies. Unlike many green policies, therefore, repair offers benefits that are felt directly by the people it asks to change their habits. Volunteer-run repair cafés, where residents bring broken items to be fixed by experienced volunteers, have spread rapidly in recent years, and although their economic impact is small, they play an important role in rebuilding the skills and confidence on which a culture of repair depends. Whether policymakers can turn this grassroots enthusiasm into a lasting shift in economic behaviour remains to be seen, but the case for trying is strong." }
        ],
        groups: [
          {
            type: "headings",
            kind: "match",
            range: [27, 32],
            instruction: "Reading Passage 3 has six paragraphs, <b>A–F</b>. Choose the correct heading for each paragraph from the list of headings below.",
            optionsTitle: "List of Headings",
            options: [
              { key: "i", text: "A partial explanation for a change in behaviour" },
              { key: "ii", text: "Design decisions that make repair harder" },
              { key: "iii", text: "Costs that are left out of the price" },
              { key: "iv", text: "Official action to support repair" },
              { key: "v", text: "Answering the doubts of the critics" },
              { key: "vi", text: "Benefits for local jobs and communities" },
              { key: "vii", text: "The rising cost of recycling electronic goods" },
              { key: "viii", text: "How households first learned to mend their possessions" },
              { key: "ix", text: "A comparison of repair rates in different countries" }
            ],
            questions: [
              { n: 27, text: "Paragraph A", answer: "i",
                explain: "Đoạn A trình bày cách giải thích bằng giá tương đối rồi kết luận 'this explanation, while not wrong, is incomplete' → lời giải thích chỉ đúng một phần cho sự thay đổi thói quen (bỏ sửa chữa) → i." },
              { n: 28, text: "Paragraph B", answer: "ii",
                explain: "Đoạn B: 'Components that were once screwed together are now frequently glued ... Batteries are sealed inside casings, specialised screws require tools that are not sold to the public' → các quyết định thiết kế khiến việc sửa khó hơn → ii." },
              { n: 29, text: "Paragraph C", answer: "iii",
                explain: "Đoạn C: 'What the price tag does not capture is the wider cost ...' và 'these are externalities ... Because they are excluded from market prices' → chi phí không nằm trong giá → iii. (Bẫy: vii nói về chi phí tái chế tăng — bài chỉ nói 'only a modest fraction of it is formally recycled', không nói chi phí tái chế.)" },
              { n: 30, text: "Paragraph D", answer: "iv",
                explain: "Đoạn D: 'a number of governments have begun to intervene. So-called right-to-repair legislation ...' → hành động chính thức của chính phủ hỗ trợ sửa chữa → iv." },
              { n: 31, text: "Paragraph E", answer: "v",
                explain: "Đoạn E nêu hai phản biện ('One objection is ... Another is ...') rồi trả lời: 'There is some truth in both points, but neither is decisive' → đáp lại nghi ngờ của giới phê bình → v." },
              { n: 32, text: "Paragraph F", answer: "vi",
                explain: "Đoạn F: 'A revival of repair could therefore support skilled employment in communities ... while keeping money circulating within local economies' → lợi ích cho việc làm và cộng đồng địa phương → vi." }
            ]
          },
          {
            type: "ynng",
            kind: "tfng",
            variant: "ynng",
            range: [33, 35],
            instruction: "Do the following statements agree with the claims of the writer in Reading Passage 3? Write <b>YES</b> if the statement agrees with the claims of the writer, <b>NO</b> if the statement contradicts the claims of the writer, <b>NOT GIVEN</b> if it is impossible to say what the writer thinks about this.",
            questions: [
              { n: 33, text: "The traditional economic explanation for the decline of repair is entirely mistaken.", answer: "NO",
                explain: "Đoạn A: tác giả viết 'this explanation, while not wrong, is incomplete' → tác giả cho rằng nó không sai mà chỉ chưa đầy đủ, trái với 'entirely mistaken' → NO." },
              { n: 34, text: "A product that costs more to buy may turn out to be less expensive in the long run.", answer: "YES",
                explain: "Đoạn E: 'higher upfront prices ... when in fact a more durable product may be cheaper over its lifetime' → khớp với quan điểm tác giả → YES." },
              { n: 35, text: "Governments should provide financial support to volunteer-run repair cafés.", answer: "NOT GIVEN",
                explain: "Đoạn F chỉ nói repair cafés 'have spread rapidly' và 'their economic impact is small' nhưng có vai trò xây dựng kỹ năng. Tác giả không hề bàn đến việc chính phủ có nên tài trợ cho chúng hay không → NOT GIVEN." }
            ]
          },
          {
            type: "summary",
            kind: "gap",
            range: [36, 38],
            instruction: "Complete the summary using the list of words, <b>A–H</b>, below.",
            title: "Government action on repair",
            wordLimit: "ONE LETTER",
            wordBank: ["A manuals", "B warranties", "C energy efficiency", "D water resistance", "E redesign", "F advertise", "G recycle", "H labour"],
            content: "<p>Several jurisdictions now have laws requiring manufacturers to provide independent repairers and consumers with spare parts, tools and {{36}} for a fixed period after a sale. Some regulators also want shops to display a score showing how easy a product is to repair, modelled on existing ratings for {{37}}. Early research suggests that such scores affect what people buy and encourage manufacturers to {{38}} their products in order to obtain a better rating.</p>",
            answers: {
              "36": ["A"],
              "37": ["C"],
              "38": ["E"]
            },
            explain: {
              "36": "Đoạn D: 'requires manufacturers to make spare parts, tools and repair manuals available to independent repairers and consumers' → manuals → A.",
              "37": "Đoạn D: 'repairability scores that must be displayed at the point of sale, much as energy-efficiency ratings are today' → energy efficiency → C.",
              "38": "Đoạn D: 'manufacturers respond by redesigning products to achieve higher ratings' → redesign → E."
            }
          },
          {
            type: "mcq-multi",
            kind: "multi",
            range: [39, 40],
            instruction: "Choose <b>TWO</b> letters, <b>A–E</b>.",
            questions: [
              { ns: [39, 40], text: "Which TWO objections to right-to-repair measures does the writer mention?",
                options: [
                  "A Requirements to keep spare parts may lead to higher prices.",
                  "B Independent repairers are often poorly trained.",
                  "C Many products are replaced for reasons other than breakdown.",
                  "D Repairability scores are difficult to calculate fairly.",
                  "E Repair work is likely to move to countries with cheaper labour."
                ],
                answer: ["A", "C"],
                explain: "Đoạn E: 'One objection is that requiring manufacturers to stock spare parts for many years imposes costs that will inevitably be passed on to consumers in the form of higher prices' → A; 'Another is that ... many people upgrade their phones not because the old ones are broken but because they want the latest features' → C. B, D không được nhắc; E trái với đoạn F ('Repair is labour-intensive and inherently local')." }
            ]
          }
        ],
        vocab: [
          { id: "relative-prices", word: "relative prices", ipa: "/ˈrelətɪv ˈpraɪsɪz/", pos: "collocation", band: "7.5+", vi: "giá tương đối (so sánh giữa các hàng hoá)", example: "Changes in relative prices encouraged families to buy frozen food instead of fresh vegetables.", topic: "economy" },
          { id: "market-forces", word: "market forces", ipa: "/ˈmɑːkɪt ˈfɔːsɪz/", pos: "collocation", band: "7.0", vi: "các lực lượng thị trường (cung – cầu)", example: "Some argue that housing should not be left entirely to market forces.", topic: "economy" },
          { id: "legitimate", word: "legitimate", ipa: "/lɪˈdʒɪtɪmət/", pos: "adj.", band: "7.0", vi: "chính đáng, hợp lý", example: "Customers have a legitimate reason to complain if a product breaks within a month.", topic: "economy" },
          { id: "diverge", word: "diverge", ipa: "/daɪˈvɜːdʒ/", pos: "v.", band: "8.0+", vi: "khác biệt, rẽ theo hướng khác nhau", example: "The two economists' forecasts diverge sharply on the future of interest rates.", topic: "economy" },
          { id: "throwaway", word: "throwaway", ipa: "/ˈθrəʊəweɪ/", pos: "adj.", band: "7.0", vi: "dùng xong rồi vứt", example: "Campaigners want to end our throwaway culture of single-use cups.", topic: "economy" },
          { id: "waste-stream", word: "waste stream", ipa: "/ˈweɪst striːm/", pos: "collocation", band: "8.0+", vi: "dòng chất thải", example: "Food packaging makes up a large part of the household waste stream.", topic: "economy" },
          { id: "energy-intensive", word: "energy-intensive", ipa: "/ˈenədʒi ɪnˈtensɪv/", pos: "adj.", band: "7.5+", vi: "tiêu tốn nhiều năng lượng", example: "Steel production is one of the most energy-intensive industries.", topic: "economy" },
          { id: "externality", word: "externality", ipa: "/ˌekstɜːˈnæləti/", pos: "n.", band: "8.0+", vi: "ngoại ứng (chi phí/lợi ích ảnh hưởng bên thứ ba)", example: "Air pollution from traffic is a classic example of a negative externality.", topic: "economy" },
          { id: "jurisdiction", word: "jurisdiction", ipa: "/ˌdʒʊərɪsˈdɪkʃn/", pos: "n.", band: "8.0+", vi: "vùng tài phán, khu vực có thẩm quyền pháp lý", example: "Tax rules vary considerably from one jurisdiction to another.", topic: "economy" },
          { id: "point-of-sale", word: "point of sale", ipa: "/ˌpɔɪnt əv ˈseɪl/", pos: "phr.", band: "7.5+", vi: "điểm bán hàng, nơi thanh toán", example: "Nutrition information should be clearly visible at the point of sale.", topic: "economy" },
          { id: "inevitably", word: "inevitably", ipa: "/ɪnˈevɪtəbli/", pos: "adv.", band: "7.0", vi: "chắc chắn, không thể tránh khỏi", example: "Rising fuel costs will inevitably push up the price of air travel.", topic: "economy" },
          { id: "upfront", word: "upfront", ipa: "/ˌʌpˈfrʌnt/", pos: "adj.", band: "7.5+", vi: "(chi phí) trả trước, ban đầu", example: "Solar panels have a high upfront cost but save money over time.", topic: "economy" },
          { id: "decisive", word: "decisive", ipa: "/dɪˈsaɪsɪv/", pos: "adj.", band: "7.0", vi: "mang tính quyết định", example: "Price was the decisive factor in their choice of supplier.", topic: "economy" },
          { id: "discard", word: "discard", ipa: "/dɪˈskɑːd/", pos: "v.", band: "7.0", vi: "vứt bỏ, loại bỏ", example: "Millions of mobile phones are discarded every year while still working.", topic: "economy" },
          { id: "compelling", word: "compelling", ipa: "/kəmˈpelɪŋ/", pos: "adj.", band: "7.0", vi: "thuyết phục, hấp dẫn", example: "The report makes a compelling case for investing in public transport.", topic: "economy" },
          { id: "labour-intensive", word: "labour-intensive", ipa: "/ˌleɪbər ɪnˈtensɪv/", pos: "adj.", band: "7.5+", vi: "cần nhiều nhân công", example: "Tea picking remains a labour-intensive job in most producing countries.", topic: "economy" },
          { id: "grassroots", word: "grassroots", ipa: "/ˌɡrɑːsˈruːts/", pos: "adj.", band: "7.5+", vi: "từ cơ sở, xuất phát từ người dân", example: "The recycling scheme began as a grassroots campaign run by local parents.", topic: "economy" }
        ]
      }
    ]
  };

  window.IELTS.data.readingTests.push(test);
})();
