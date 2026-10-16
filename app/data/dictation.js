(function () {
  "use strict";
  // Dictation lessons (SPEC §6.4). Owner: LD2.
  // Typing convention: years are written as digits (e.g. 1661); every other number is written in words.
  var W = window.IELTS = window.IELTS || {};
  W.data = W.data || {};
  W.data.dictation = W.data.dictation || [];

  var lessons = [
    /* ------------------------------------------------------------ EASY */
    {
      id: "D01", title: "My Morning Routine", level: "easy", topic: "family", voice: "f",
      sentences: [
        "I usually wake up at half past six.",
        "First, I open the window and drink a glass of water.",
        "Then I take a quick shower and get dressed.",
        "My mother makes breakfast for the whole family.",
        "We often have eggs, bread and fresh fruit.",
        "My younger brother is always the last one at the table.",
        "After breakfast, I check my bag and find my keys.",
        "I leave the house at about a quarter past seven.",
        "The bus stop is only five minutes from my home.",
        "I like to read a short book on the bus."
      ]
    },
    {
      id: "D02", title: "A Trip to the Market", level: "easy", topic: "food", voice: "m",
      sentences: [
        "Every Saturday, I go to the market near my house.",
        "It opens early in the morning and closes at noon.",
        "I always bring my own shopping bags.",
        "First, I buy vegetables from an old farmer.",
        "His tomatoes are cheap and very sweet.",
        "Next, I stop at the bakery for a loaf of bread.",
        "The baker knows my name and always says hello.",
        "Sometimes I buy flowers for my kitchen table.",
        "The market is busy, but people are friendly.",
        "When my bags are full, I walk home slowly."
      ]
    },
    {
      id: "D03", title: "Meeting a New Neighbour", level: "easy", topic: "society", voice: "f2",
      sentences: [
        "Last week, a young couple moved into the flat next door.",
        "I saw them carrying boxes up the stairs.",
        "They looked tired, so I offered to help.",
        "Their names are Anna and David.",
        "They have just moved here from another city.",
        "Anna works at the hospital, and David is a teacher.",
        "After we finished, they invited me in for a cup of tea.",
        "We talked about the shops and parks in our area.",
        "I gave them the number of a good taxi company.",
        "I think we are going to be good friends."
      ]
    },
    {
      id: "D04", title: "A Rainy Weekend", level: "easy", topic: "culture", voice: "m2",
      sentences: [
        "We wanted to go to the beach on Saturday.",
        "Unfortunately, it rained all day.",
        "My sister suggested a visit to the city museum instead.",
        "We took an umbrella and caught the bus into town.",
        "The museum was warm, quiet and free to enter.",
        "We spent an hour looking at old maps and photos.",
        "Then we had lunch in the small café on the top floor.",
        "In the afternoon, we watched a film at the cinema.",
        "By the evening, the rain had finally stopped.",
        "It was not the weekend we planned, but it was fun."
      ]
    },

    /* ------------------------------------------------------------ MEDIUM */
    {
      id: "D05", title: "Booking a Hotel Room", level: "medium", topic: "travel", voice: "f",
      sentences: [
        "Good afternoon, I'd like to book a double room for three nights, please.",
        "We're planning to arrive on Friday the twelfth of July.",
        "Could you tell me how much a room with a sea view costs?",
        "The standard rate is ninety-five pounds per night, including breakfast.",
        "A room without a view is fifteen pounds cheaper.",
        "I think we'll take the sea view, as it's a special occasion.",
        "Is there a car park at the hotel, or should we park on the street?",
        "Guests can use our underground car park for five pounds a day.",
        "Could I have your surname and a contact number, please?",
        "We'll need a deposit of fifty pounds to confirm the booking.",
        "Check-in is from two o'clock, and check-out is before eleven.",
        "You'll receive a confirmation email within the next hour."
      ]
    },
    {
      id: "D06", title: "Directions to the Library", level: "medium", topic: "urban", voice: "m",
      sentences: [
        "Excuse me, could you tell me how to get to the central library?",
        "Of course, it's about ten minutes from here on foot.",
        "Go straight along this road until you reach the traffic lights.",
        "Turn left at the lights, and you'll see a large church on your right.",
        "Walk past the church and take the second turning on the left.",
        "That's Market Street, which has a lot of small shops.",
        "The library is at the end of the street, opposite the post office.",
        "It's a modern glass building, so you can't miss it.",
        "If you don't want to walk, you can take the number twelve bus.",
        "Get off at the third stop, outside the town hall.",
        "The library is open until eight o'clock on weekdays.",
        "On Sundays, it closes early, at four in the afternoon."
      ]
    },
    {
      id: "D07", title: "Enrolling in a Language Course", level: "medium", topic: "education", voice: "f2",
      sentences: [
        "Hello, I'm calling about the evening Spanish course for beginners.",
        "Classes take place on Tuesdays and Thursdays from seven until nine.",
        "The course lasts for ten weeks and starts at the beginning of October.",
        "The total fee is two hundred and forty pounds.",
        "Students and people over sixty can get a twenty percent discount.",
        "All the books are included, but you'll need to buy your own dictionary.",
        "Each class has a maximum of twelve students.",
        "The lessons are held in room fourteen, on the first floor of the main building.",
        "Before the course begins, you'll take a short online test.",
        "This helps the teacher understand your level.",
        "You can pay by card over the phone or in person at reception.",
        "Please remember to bring a photo for your student card."
      ]
    },
    {
      id: "D08", title: "Reporting a Lost Bag", level: "medium", topic: "crime", voice: "m2",
      sentences: [
        "I'd like to report a bag that I left on the train this morning.",
        "I was travelling on the eight fifteen service from the city centre.",
        "I got off at the airport station and forgot my bag on the luggage rack.",
        "It's a small black backpack with a red stripe on the front.",
        "Inside, there's a laptop, a blue notebook and a pair of glasses.",
        "My name and email address are written on a label inside the front pocket.",
        "Has anything like that been handed in today?",
        "Not yet, but items are usually sent to this office by the evening.",
        "Could you fill in this form with a description and your phone number?",
        "We'll contact you as soon as the bag arrives.",
        "There's a small fee of three pounds when you collect lost property.",
        "We keep items for one month before they are given to charity."
      ]
    },

    /* ------------------------------------------------------------ HARD */
    {
      id: "D09", title: "Urban Heat Islands", level: "hard", topic: "urban", voice: "f",
      sentences: [
        "Cities are often several degrees warmer than the countryside that surrounds them.",
        "This effect, which is known as the urban heat island, has been studied for decades.",
        "It occurs mainly because materials such as concrete and asphalt absorb heat during the day.",
        "At night, these surfaces slowly release the stored heat back into the air.",
        "Tall buildings also trap warm air and reduce the movement of wind through the streets.",
        "In addition, heat produced by traffic, factories and air-conditioning units adds to the problem.",
        "Higher temperatures can be dangerous, particularly for elderly people and young children.",
        "They also increase the demand for electricity, which in turn leads to more pollution.",
        "One of the most effective solutions is to plant more trees along roads and in public spaces.",
        "Trees provide shade and cool the air as water evaporates from their leaves.",
        "Some cities are also encouraging green roofs, which are covered with plants rather than tiles.",
        "Others are painting roofs and pavements in light colours that reflect sunlight.",
        "Researchers believe that combining these approaches could reduce summer temperatures significantly."
      ]
    },
    {
      id: "D10", title: "The History of Paper Money", level: "hard", topic: "history", voice: "m",
      sentences: [
        "For thousands of years, people paid for goods with coins made from valuable metals.",
        "However, carrying large amounts of metal over long distances was both heavy and dangerous.",
        "In China, merchants began using paper receipts instead, which could be exchanged for coins later.",
        "By the eleventh century, the Chinese government had started printing official paper notes.",
        "European travellers who visited China were astonished that paper could be used as money.",
        "In Europe, the idea developed more slowly, largely because people did not trust it.",
        "The first European banknotes were issued by a bank in Sweden in 1661.",
        "Their value depended entirely on the public's confidence that the bank could pay out real silver.",
        "When banks printed too many notes, this confidence collapsed and prices rose rapidly.",
        "For this reason, many governments later linked their currencies to a fixed amount of gold.",
        "This system was gradually abandoned during the twentieth century.",
        "Today, most money exists only as numbers in electronic accounts rather than as physical notes."
      ]
    },
    {
      id: "D11", title: "Sleep and Memory", level: "hard", topic: "health", voice: "f2",
      sentences: [
        "Scientists have long suspected that sleep plays an important role in learning.",
        "Recent studies suggest that the brain uses sleep to strengthen memories formed during the day.",
        "In one experiment, volunteers were asked to learn a list of unfamiliar words in the evening.",
        "Half of the group then slept normally, while the other half stayed awake all night.",
        "The following day, those who had slept remembered far more of the words.",
        "Researchers believe that, during deep sleep, information is transferred to long-term memory.",
        "This process appears to be disrupted when people sleep for fewer than six hours.",
        "Lack of sleep also makes it harder to concentrate, which affects the ability to learn new material.",
        "Interestingly, short naps in the early afternoon seem to produce similar benefits.",
        "However, napping for too long can leave people feeling more tired than before.",
        "Many students stay up late before exams in the hope of studying more.",
        "The evidence suggests that a good night's sleep may be a far more effective strategy."
      ]
    },
    {
      id: "D12", title: "Coral Reef Restoration", level: "hard", topic: "environment", voice: "m2",
      sentences: [
        "Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all marine species.",
        "Unfortunately, reefs around the world are being damaged at an alarming rate.",
        "The main cause is rising sea temperatures, which force corals to expel the tiny algae that live inside them.",
        "Without these algae, the corals lose their colour and eventually starve, a process known as bleaching.",
        "Pollution from farms and coastal development also reduces the quality of the water.",
        "In response, marine biologists have developed several methods of restoring damaged reefs.",
        "One approach involves growing small pieces of coral in underwater nurseries.",
        "Once they are large enough, divers attach them carefully to the original reef.",
        "Scientists are also searching for types of coral that can tolerate higher temperatures.",
        "These heat-resistant corals could be used to make restored reefs more likely to survive.",
        "Nevertheless, experts warn that restoration alone cannot save the world's reefs.",
        "Unless global emissions are reduced, the conditions that cause bleaching will continue to get worse."
      ]
    }
  ];

  for (var i = 0; i < lessons.length; i++) W.data.dictation.push(lessons[i]);
})();
