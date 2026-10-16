/* IELTS Coach — Vocabulary bank (owner: V)
 * Pushes Word objects into window.IELTS.data.vocab.words (SPEC §6.5):
 *   { id, word, ipa, pos, band, vi, example, topic }
 * - id: lowercase, spaces → "-", only [a-z0-9-] (same rule as IELTS.wordId)
 * - ipa: British English, wrapped in slashes
 * - band: editorial label ("band tham khảo"), not a certified IELTS score
 * Source rows are authored per topic, then interleaved round-robin across the
 * 20 TOPICS so that consecutive daily sets mix topics.
 * Data only: no core function is called at load time.
 */
(function () {
  "use strict";

  var root = (window.IELTS = window.IELTS || {});
  root.data = root.data || {};
  root.data.vocab = root.data.vocab || { words: [] };
  if (!Array.isArray(root.data.vocab.words)) root.data.vocab.words = [];

  // Row format: [word, ipa, pos, band, vi, example]
  var BANK = {
    education: [
      ["curriculum", "/kəˈrɪkjələm/", "n.", "6.5", "chương trình giảng dạy", "Many argue that the school curriculum should include practical life skills such as financial literacy."],
      ["rote learning", "/ˌrəʊt ˈlɜːnɪŋ/", "collocation", "7.0", "học vẹt, học thuộc lòng máy móc", "Rote learning may help students pass exams, but it rarely fosters genuine understanding."],
      ["bridge the gap", "/ˌbrɪdʒ ðə ˈɡæp/", "phr.", "7.0", "thu hẹp khoảng cách", "Free online courses can help bridge the gap between rural and urban students."],
      ["tertiary education", "/ˌtɜːʃəri ˌedʒuˈkeɪʃn/", "collocation", "7.0", "giáo dục bậc cao (đại học, cao đẳng)", "Governments should make tertiary education affordable for students from low-income families."],
      ["literacy", "/ˈlɪtərəsi/", "n.", "6.5", "khả năng đọc viết", "Adult literacy programmes have transformed the lives of many people in developing countries."],
      ["well-rounded", "/ˌwelˈraʊndɪd/", "adj.", "7.0", "phát triển toàn diện", "Extracurricular activities help children become well-rounded individuals."],
      ["critical thinking", "/ˌkrɪtɪkl ˈθɪŋkɪŋ/", "collocation", "6.5", "tư duy phản biện", "Schools should place more emphasis on critical thinking rather than memorisation."],
      ["academic performance", "/ˌækəˌdemɪk pəˈfɔːməns/", "collocation", "6.5", "kết quả học tập", "Lack of sleep can have a negative effect on students' academic performance."],
      ["vocational training", "/vəʊˌkeɪʃənl ˈtreɪnɪŋ/", "collocation", "7.0", "đào tạo nghề", "Vocational training equips young people with the skills that employers actually need."],
      ["compulsory", "/kəmˈpʌlsəri/", "adj.", "6.5", "bắt buộc", "In my view, learning a foreign language should be compulsory at primary school."],
      ["cultivate", "/ˈkʌltɪveɪt/", "v.", "7.5+", "nuôi dưỡng, trau dồi", "Teachers play a vital role in cultivating a love of reading in children."],
      ["pedagogy", "/ˈpedəɡɒdʒi/", "n.", "8.0+", "phương pháp sư phạm", "Modern pedagogy encourages students to learn through collaboration and inquiry."],
      ["drop out of school", "/ˌdrɒp ˈaʊt əv ˌskuːl/", "phr.", "6.5", "bỏ học", "Financial pressure forces some teenagers to drop out of school and find work."]
    ],
    technology: [
      ["cutting-edge", "/ˌkʌtɪŋ ˈedʒ/", "adj.", "7.0", "tiên tiến nhất, hiện đại nhất", "The company invests heavily in cutting-edge research to stay ahead of its rivals."],
      ["automation", "/ˌɔːtəˈmeɪʃn/", "n.", "6.5", "sự tự động hoá", "Automation is likely to replace many routine jobs in manufacturing."],
      ["obsolete", "/ˈɒbsəliːt/", "adj.", "7.0", "lỗi thời, không còn dùng", "Many traditional skills have become obsolete in the digital age."],
      ["a double-edged sword", "/ə ˌdʌbl ˌedʒd ˈsɔːd/", "phr.", "7.5+", "con dao hai lưỡi", "Social media is a double-edged sword: it connects people but also spreads misinformation."],
      ["digital literacy", "/ˌdɪdʒɪtl ˈlɪtərəsi/", "collocation", "7.0", "kỹ năng số, hiểu biết công nghệ số", "Digital literacy is now as essential as reading and writing."],
      ["innovation", "/ˌɪnəˈveɪʃn/", "n.", "6.5", "sự đổi mới, cải tiến", "Technological innovation has dramatically improved the quality of healthcare."],
      ["be addicted to", "/bi əˈdɪktɪd tə/", "phr.", "6.5", "nghiện (cái gì)", "Many teenagers are addicted to their smartphones and struggle to concentrate in class."],
      ["data privacy", "/ˌdeɪtə ˈprɪvəsi/", "collocation", "7.0", "quyền riêng tư dữ liệu", "Tech giants must be held responsible for protecting users' data privacy."],
      ["revolutionise", "/ˌrevəˈluːʃənaɪz/", "v.", "7.0", "cách mạng hoá, thay đổi hoàn toàn", "Artificial intelligence could revolutionise the way doctors diagnose diseases."],
      ["user-friendly", "/ˌjuːzə ˈfrendli/", "adj.", "6.5", "dễ sử dụng", "The app is so user-friendly that even elderly people can use it with ease."],
      ["widen the digital divide", "/ˌwaɪdn ðə ˌdɪdʒɪtl dɪˈvaɪd/", "collocation", "7.5+", "nới rộng khoảng cách số", "If schools rely entirely on online learning, they may widen the digital divide."],
      ["ubiquitous", "/juːˈbɪkwɪtəs/", "adj.", "8.0+", "có mặt ở khắp nơi", "Smartphones have become ubiquitous, even in remote villages."]
    ],
    environment: [
      ["mitigate", "/ˈmɪtɪɡeɪt/", "v.", "7.0", "giảm nhẹ, hạn chế (tác hại)", "Governments must act quickly to mitigate the effects of climate change."],
      ["carbon footprint", "/ˌkɑːbən ˈfʊtprɪnt/", "collocation", "6.5", "lượng khí thải carbon (của một người, tổ chức)", "Cycling to work is a simple way to reduce your carbon footprint."],
      ["biodiversity", "/ˌbaɪəʊdaɪˈvɜːsəti/", "n.", "7.0", "đa dạng sinh học", "Deforestation is one of the greatest threats to biodiversity."],
      ["pose a threat to", "/ˌpəʊz ə ˈθret tə/", "phr.", "7.0", "gây ra mối đe doạ cho", "Plastic waste poses a serious threat to marine life."],
      ["sustainable", "/səˈsteɪnəbl/", "adj.", "6.5", "bền vững", "We need to find more sustainable ways of producing food."],
      ["deforestation", "/ˌdiːˌfɒrɪˈsteɪʃn/", "n.", "6.5", "nạn phá rừng", "Large-scale deforestation has led to soil erosion and flooding."],
      ["irreversible", "/ˌɪrɪˈvɜːsəbl/", "adj.", "7.5+", "không thể đảo ngược", "Some scientists warn that the damage to coral reefs may be irreversible."],
      ["greenhouse gas emissions", "/ˌɡriːnhaʊs ˈɡæs ɪˌmɪʃnz/", "collocation", "6.5", "khí thải nhà kính", "Developed countries should take the lead in cutting greenhouse gas emissions."],
      ["depletion", "/dɪˈpliːʃn/", "n.", "7.5+", "sự cạn kiệt", "The rapid depletion of natural resources is a major concern for future generations."],
      ["take a toll on", "/ˌteɪk ə ˈtəʊl ɒn/", "phr.", "7.5+", "gây tổn hại cho", "Intensive farming has taken a heavy toll on the environment."],
      ["eco-friendly", "/ˌiːkəʊ ˈfrendli/", "adj.", "6.5", "thân thiện với môi trường", "Consumers are increasingly choosing eco-friendly products, even when they cost more."],
      ["curb", "/kɜːb/", "v.", "7.0", "kiềm chế, hạn chế", "Stricter laws are needed to curb air pollution in big cities."]
    ],
    health: [
      ["a sedentary lifestyle", "/ə ˌsedntri ˈlaɪfstaɪl/", "collocation", "7.0", "lối sống ít vận động", "A sedentary lifestyle is one of the main causes of obesity."],
      ["obesity", "/əʊˈbiːsəti/", "n.", "6.5", "bệnh béo phì", "Childhood obesity has risen sharply in many developed countries."],
      ["preventive medicine", "/prɪˌventɪv ˈmedsn/", "collocation", "7.5+", "y học dự phòng", "Investing in preventive medicine is far cheaper than treating diseases later."],
      ["life expectancy", "/ˈlaɪf ɪkˌspektənsi/", "collocation", "6.5", "tuổi thọ trung bình", "Life expectancy has increased thanks to better nutrition and healthcare."],
      ["detrimental", "/ˌdetrɪˈmentl/", "adj.", "7.0", "có hại, gây tổn hại", "Excessive screen time can be detrimental to children's eyesight."],
      ["well-being", "/ˈwel biːɪŋ/", "n.", "6.5", "sức khoẻ, sự khoẻ mạnh và hạnh phúc", "Regular exercise benefits both physical and mental well-being."],
      ["be prone to", "/bi ˈprəʊn tə/", "phr.", "7.0", "dễ bị, có xu hướng mắc", "Office workers who sit all day are prone to back problems."],
      ["chronic", "/ˈkrɒnɪk/", "adj.", "7.0", "mãn tính, kéo dài", "Chronic diseases such as diabetes place a heavy burden on health services."],
      ["alleviate", "/əˈliːvieɪt/", "v.", "7.5+", "làm giảm bớt, xoa dịu", "Meditation can help alleviate stress and anxiety."],
      ["healthcare system", "/ˈhelθkeə ˌsɪstəm/", "collocation", "6.5", "hệ thống y tế", "A free public healthcare system ensures that everyone can access treatment."],
      ["mental health", "/ˌmentl ˈhelθ/", "collocation", "6.5", "sức khoẻ tinh thần", "Employers should take their staff's mental health more seriously."],
      ["susceptible to", "/səˈseptəbl tə/", "phr.", "7.5+", "dễ mắc, dễ bị ảnh hưởng bởi", "The elderly are more susceptible to infections during the winter months."]
    ],
    work: [
      ["work-life balance", "/ˌwɜːk ˈlaɪf ˌbæləns/", "collocation", "6.5", "cân bằng công việc và cuộc sống", "Flexible hours help employees achieve a better work-life balance."],
      ["job satisfaction", "/ˈdʒɒb ˌsætɪsˌfækʃn/", "collocation", "6.5", "sự hài lòng trong công việc", "For many people, job satisfaction matters more than a high salary."],
      ["remote working", "/rɪˌməʊt ˈwɜːkɪŋ/", "collocation", "6.5", "làm việc từ xa", "Remote working saves commuting time but can lead to feelings of isolation."],
      ["lucrative", "/ˈluːkrətɪv/", "adj.", "7.0", "sinh lời, béo bở", "Many graduates are drawn to lucrative careers in finance and law."],
      ["climb the career ladder", "/ˌklaɪm ðə kəˈrɪə ˌlædə/", "phr.", "7.0", "thăng tiến trong sự nghiệp", "Some employees sacrifice their free time in order to climb the career ladder."],
      ["burnout", "/ˈbɜːnaʊt/", "n.", "7.0", "tình trạng kiệt sức (vì công việc)", "Long working hours without proper breaks often lead to burnout."],
      ["productivity", "/ˌprɒdʌkˈtɪvəti/", "n.", "6.5", "năng suất", "Studies suggest that a four-day week can actually increase productivity."],
      ["transferable skills", "/trænsˌfɜːrəbl ˈskɪlz/", "collocation", "7.0", "kỹ năng có thể chuyển đổi (dùng được ở nhiều nghề)", "Communication and teamwork are transferable skills valued in every industry."],
      ["incentive", "/ɪnˈsentɪv/", "n.", "7.0", "động lực, sự khuyến khích", "Bonuses provide a strong incentive for staff to work harder."],
      ["entrepreneur", "/ˌɒntrəprəˈnɜː/", "n.", "6.5", "doanh nhân, người khởi nghiệp", "Young entrepreneurs often struggle to secure funding for their start-ups."],
      ["job security", "/ˈdʒɒb sɪˌkjʊərəti/", "collocation", "6.5", "sự ổn định việc làm", "Older generations valued job security above almost everything else."],
      ["meticulous", "/məˈtɪkjələs/", "adj.", "8.0+", "tỉ mỉ, kỹ lưỡng", "Accountants need to be meticulous because small errors can be extremely costly."]
    ],
    society: [
      ["social cohesion", "/ˌsəʊʃl kəʊˈhiːʒn/", "collocation", "7.5+", "sự gắn kết xã hội", "Community festivals can strengthen social cohesion in diverse neighbourhoods."],
      ["inequality", "/ˌɪnɪˈkwɒləti/", "n.", "6.5", "sự bất bình đẳng", "Income inequality has widened in many countries over the past few decades."],
      ["marginalised", "/ˈmɑːdʒɪnəlaɪzd/", "adj.", "7.5+", "bị gạt ra ngoài lề xã hội", "Governments should do more to support marginalised groups."],
      ["ageing population", "/ˌeɪdʒɪŋ ˌpɒpjuˈleɪʃn/", "collocation", "7.0", "dân số già hoá", "An ageing population places increasing pressure on pension systems."],
      ["discrimination", "/dɪˌskrɪmɪˈneɪʃn/", "n.", "6.5", "sự phân biệt đối xử", "Laws against discrimination in the workplace must be strictly enforced."],
      ["the gap between rich and poor", "/ðə ˈɡæp bɪˌtwiːn ˌrɪtʃ ən ˈpɔː/", "phr.", "6.5", "khoảng cách giàu nghèo", "Progressive taxation can help narrow the gap between rich and poor."],
      ["volunteer", "/ˌvɒlənˈtɪə/", "v.", "6.5", "làm tình nguyện", "Students who volunteer in their communities develop empathy and a sense of responsibility."],
      ["a sense of belonging", "/ə ˌsens əv bɪˈlɒŋɪŋ/", "collocation", "7.0", "cảm giác được thuộc về (một cộng đồng)", "Team sports give young people a sense of belonging."],
      ["stereotype", "/ˈsteriətaɪp/", "n.", "7.0", "định kiến, khuôn mẫu rập khuôn", "The media often reinforces gender stereotypes."],
      ["integrate into", "/ˈɪntɪɡreɪt ˌɪntə/", "phr.", "7.0", "hoà nhập vào", "Free language classes help immigrants integrate into their new communities."],
      ["welfare", "/ˈwelfeə/", "n.", "7.0", "phúc lợi xã hội", "A strong welfare system protects the most vulnerable members of society."],
      ["altruistic", "/ˌæltruˈɪstɪk/", "adj.", "8.0+", "vị tha, không vụ lợi", "Not all charitable donations are purely altruistic; some are made mainly for publicity."]
    ],
    urban: [
      ["urbanisation", "/ˌɜːbənaɪˈzeɪʃn/", "n.", "7.0", "quá trình đô thị hoá", "Rapid urbanisation has put enormous strain on public services."],
      ["infrastructure", "/ˈɪnfrəstrʌktʃə/", "n.", "6.5", "cơ sở hạ tầng", "Investment in public infrastructure creates jobs and boosts the economy."],
      ["traffic congestion", "/ˈtræfɪk kənˌdʒestʃən/", "collocation", "6.5", "tình trạng tắc nghẽn giao thông", "Building more roads rarely solves the problem of traffic congestion."],
      ["overcrowded", "/ˌəʊvəˈkraʊdɪd/", "adj.", "6.5", "quá đông đúc", "Overcrowded cities often suffer from poor air quality and high living costs."],
      ["green spaces", "/ˌɡriːn ˈspeɪsɪz/", "collocation", "6.5", "không gian xanh (công viên, vườn)", "Urban planners should set aside more land for parks and green spaces."],
      ["public transport", "/ˌpʌblɪk ˈtrænspɔːt/", "collocation", "6.5", "giao thông công cộng", "An efficient public transport system encourages people to leave their cars at home."],
      ["urban sprawl", "/ˌɜːbən ˈsprɔːl/", "collocation", "7.5+", "sự mở rộng đô thị tràn lan", "Urban sprawl destroys farmland and increases dependence on private cars."],
      ["affordable housing", "/əˌfɔːdəbl ˈhaʊzɪŋ/", "collocation", "7.0", "nhà ở giá phải chăng", "The lack of affordable housing forces young people to live far from their workplaces."],
      ["pedestrianise", "/pəˈdestriənaɪz/", "v.", "7.5+", "biến (khu phố) thành phố đi bộ", "Several European cities have pedestrianised their historic centres."],
      ["amenities", "/əˈmiːnətiz/", "n.", "7.0", "tiện ích (công cộng)", "Rural areas often lack basic amenities such as hospitals and libraries."],
      ["densely populated", "/ˌdensli ˈpɒpjuleɪtɪd/", "collocation", "7.0", "đông dân cư", "Hong Kong is one of the most densely populated places on earth."],
      ["gentrification", "/ˌdʒentrɪfɪˈkeɪʃn/", "n.", "8.0+", "quá trình \"quý tộc hoá\" khu dân cư (giá nhà tăng, dân gốc bị đẩy đi)", "Gentrification can push long-term residents out of their own neighbourhoods."]
    ],
    culture: [
      ["cultural heritage", "/ˌkʌltʃərəl ˈherɪtɪdʒ/", "collocation", "6.5", "di sản văn hoá", "Governments have a duty to preserve their country's cultural heritage."],
      ["globalisation", "/ˌɡləʊbəlaɪˈzeɪʃn/", "n.", "6.5", "toàn cầu hoá", "Globalisation has made Western films and music available almost everywhere."],
      ["cultural identity", "/ˌkʌltʃərəl aɪˈdentəti/", "collocation", "7.0", "bản sắc văn hoá", "Speaking one's native language is an important part of cultural identity."],
      ["homogenisation", "/həˌmɒdʒənaɪˈzeɪʃn/", "n.", "8.0+", "sự đồng nhất hoá", "Some fear that global brands are leading to the homogenisation of culture."],
      ["preserve", "/prɪˈzɜːv/", "v.", "6.5", "bảo tồn, gìn giữ", "Museums help preserve traditional crafts for future generations."],
      ["custom", "/ˈkʌstəm/", "n.", "6.5", "phong tục, tập quán", "Visitors should respect local customs when travelling abroad."],
      ["diverse", "/daɪˈvɜːs/", "adj.", "6.5", "đa dạng", "London is one of the most culturally diverse cities in the world."],
      ["die out", "/ˌdaɪ ˈaʊt/", "phr.", "7.0", "mai một, biến mất dần", "Many minority languages are in danger of dying out."],
      ["assimilate", "/əˈsɪmɪleɪt/", "v.", "7.5+", "đồng hoá, hoà nhập", "Immigrants should not be forced to assimilate completely into the dominant culture."],
      ["the performing arts", "/ðə pəˌfɔːmɪŋ ˈɑːts/", "collocation", "7.0", "nghệ thuật biểu diễn", "Public funding for the performing arts is often the first to be cut."],
      ["intangible", "/ɪnˈtændʒəbl/", "adj.", "7.5+", "vô hình, phi vật thể", "Traditional music is an important part of a nation's intangible heritage."],
      ["pass down", "/ˌpɑːs ˈdaʊn/", "phr.", "6.5", "truyền lại (cho thế hệ sau)", "These recipes have been passed down from generation to generation."]
    ],
    science: [
      ["breakthrough", "/ˈbreɪkθruː/", "n.", "6.5", "bước đột phá", "The discovery of penicillin was a major medical breakthrough."],
      ["conduct research", "/kənˌdʌkt rɪˈsɜːtʃ/", "collocation", "6.5", "tiến hành nghiên cứu", "Universities need adequate funding to conduct research."],
      ["empirical", "/ɪmˈpɪrɪkl/", "adj.", "7.5+", "dựa trên thực nghiệm", "There is little empirical evidence to support this claim."],
      ["hypothesis", "/haɪˈpɒθəsɪs/", "n.", "7.0", "giả thuyết", "The experiment was designed to test the hypothesis that sleep improves memory."],
      ["ethical concerns", "/ˌeθɪkl kənˈsɜːnz/", "collocation", "7.0", "những lo ngại về đạo đức", "Genetic engineering raises serious ethical concerns."],
      ["genetic modification", "/dʒəˌnetɪk ˌmɒdɪfɪˈkeɪʃn/", "collocation", "7.0", "biến đổi gen", "Genetic modification could help crops survive long periods of drought."],
      ["groundbreaking", "/ˈɡraʊndbreɪkɪŋ/", "adj.", "7.0", "mang tính đột phá, tiên phong", "Her groundbreaking work on DNA transformed the field of biology."],
      ["space exploration", "/ˈspeɪs ˌekspləˌreɪʃn/", "collocation", "6.5", "thám hiểm không gian", "Some argue that money spent on space exploration should be used to fight poverty instead."],
      ["advancement", "/ədˈvɑːnsmənt/", "n.", "6.5", "sự tiến bộ, phát triển", "Scientific advancement has raised living standards around the world."],
      ["unprecedented", "/ʌnˈpresɪdentɪd/", "adj.", "7.5+", "chưa từng có tiền lệ", "We are living in an era of unprecedented technological change."],
      ["shed light on", "/ˌʃed ˈlaɪt ɒn/", "phr.", "7.5+", "làm sáng tỏ", "New research has shed light on the causes of Alzheimer's disease."],
      ["replicate", "/ˈreplɪkeɪt/", "v.", "8.0+", "lặp lại (thí nghiệm) cho cùng kết quả", "Results must be replicated by independent teams before they are widely accepted."]
    ],
    media: [
      ["misinformation", "/ˌmɪsɪnfəˈmeɪʃn/", "n.", "7.0", "thông tin sai lệch", "Social media platforms should do more to stop the spread of misinformation."],
      ["mass media", "/ˌmæs ˈmiːdiə/", "collocation", "6.5", "phương tiện truyền thông đại chúng", "The mass media has a powerful influence on what young people consider normal."],
      ["sensationalism", "/senˈseɪʃənəlɪzəm/", "n.", "8.0+", "lối đưa tin giật gân", "Tabloid newspapers are often criticised for their sensationalism."],
      ["invasion of privacy", "/ɪnˌveɪʒn əv ˈprɪvəsi/", "collocation", "7.0", "sự xâm phạm quyền riêng tư", "Photographing celebrities' children without permission is an invasion of privacy."],
      ["censorship", "/ˈsensəʃɪp/", "n.", "7.0", "sự kiểm duyệt", "Strict censorship prevents citizens from accessing independent news."],
      ["go viral", "/ˌɡəʊ ˈvaɪrəl/", "phr.", "6.5", "lan truyền nhanh trên mạng", "A single video can go viral within hours and reach millions of viewers."],
      ["biased", "/ˈbaɪəst/", "adj.", "6.5", "thiên vị, thiếu khách quan", "Readers should be aware that some news outlets are politically biased."],
      ["shape public opinion", "/ˌʃeɪp ˌpʌblɪk əˈpɪnjən/", "collocation", "7.0", "định hướng dư luận", "Television news still plays a key role in shaping public opinion."],
      ["target audience", "/ˌtɑːɡɪt ˈɔːdiəns/", "collocation", "6.5", "đối tượng khán giả mục tiêu", "Advertisers design their campaigns carefully to appeal to their target audience."],
      ["credible", "/ˈkredəbl/", "adj.", "7.0", "đáng tin cậy", "It is important to get news from credible sources."],
      ["coverage", "/ˈkʌvərɪdʒ/", "n.", "7.0", "sự đưa tin (của báo chí)", "The election received extensive media coverage around the world."],
      ["manipulate", "/məˈnɪpjuleɪt/", "v.", "7.0", "thao túng, lôi kéo", "Some advertisements manipulate consumers into buying things they do not need."]
    ],
    travel: [
      ["mass tourism", "/ˌmæs ˈtʊərɪzəm/", "collocation", "7.0", "du lịch đại trà", "Mass tourism can damage fragile ecosystems and historic sites."],
      ["broaden one's horizons", "/ˌbrɔːdn wʌnz həˈraɪznz/", "phr.", "6.5", "mở rộng tầm hiểu biết", "Travelling abroad broadens your horizons and challenges your assumptions."],
      ["ecotourism", "/ˈiːkəʊˌtʊərɪzəm/", "n.", "7.0", "du lịch sinh thái", "Ecotourism can provide income for local communities while protecting nature."],
      ["destination", "/ˌdestɪˈneɪʃn/", "n.", "6.5", "điểm đến", "Vietnam has become a popular destination for backpackers."],
      ["off the beaten track", "/ˌɒf ðə ˌbiːtn ˈtræk/", "phr.", "7.5+", "ở nơi hẻo lánh, ít người lui tới", "I prefer visiting places off the beaten track rather than crowded resorts."],
      ["culture shock", "/ˈkʌltʃə ʃɒk/", "collocation", "6.5", "sốc văn hoá", "International students often experience culture shock in their first few months abroad."],
      ["itinerary", "/aɪˈtɪnərəri/", "n.", "7.0", "lịch trình chuyến đi", "Our itinerary included three days in Hanoi and two in Ha Long Bay."],
      ["breathtaking", "/ˈbreθteɪkɪŋ/", "adj.", "6.5", "đẹp ngoạn mục", "The view from the top of the mountain was absolutely breathtaking."],
      ["tourist trap", "/ˈtʊərɪst træp/", "collocation", "7.0", "nơi \"bẫy\" khách du lịch (đắt, kém chất lượng)", "The restaurant next to the cathedral turned out to be a tourist trap."],
      ["influx", "/ˈɪnflʌks/", "n.", "7.5+", "dòng người (hoặc vật) đổ vào ồ ạt", "The sudden influx of tourists has pushed up rents for local residents."],
      ["long-haul flight", "/ˌlɒŋ hɔːl ˈflaɪt/", "collocation", "7.0", "chuyến bay đường dài", "A single long-haul flight can produce more emissions than a year of driving."],
      ["wanderlust", "/ˈwɒndəlʌst/", "n.", "8.0+", "niềm khao khát xê dịch", "Her wanderlust has taken her to more than forty countries."]
    ],
    crime: [
      ["deterrent", "/dɪˈterənt/", "n.", "7.0", "biện pháp răn đe", "Many people believe that harsh punishments act as a deterrent to crime."],
      ["rehabilitation", "/ˌriːəˌbɪlɪˈteɪʃn/", "n.", "7.0", "sự cải tạo, phục hồi", "Prisons should focus on rehabilitation rather than punishment alone."],
      ["juvenile delinquency", "/ˌdʒuːvənaɪl dɪˈlɪŋkwənsi/", "collocation", "8.0+", "tình trạng phạm pháp ở tuổi vị thành niên", "Poverty and family breakdown are often linked to juvenile delinquency."],
      ["commit a crime", "/kəˌmɪt ə ˈkraɪm/", "collocation", "6.5", "phạm tội", "People who commit a crime out of desperation deserve a second chance."],
      ["reoffend", "/ˌriːəˈfend/", "v.", "7.5+", "tái phạm", "Prisoners who receive an education are less likely to reoffend after release."],
      ["law enforcement", "/ˈlɔː ɪnˌfɔːsmənt/", "collocation", "7.0", "việc thực thi pháp luật; lực lượng thực thi pháp luật", "Law enforcement agencies are using AI to predict where crimes may occur."],
      ["a custodial sentence", "/ə kʌˌstəʊdiəl ˈsentəns/", "collocation", "8.0+", "án tù giam", "For minor offences, community service may be more effective than a custodial sentence."],
      ["offender", "/əˈfendə/", "n.", "6.5", "người phạm tội", "Young offenders should be kept separate from adult criminals."],
      ["crack down on", "/ˌkræk ˈdaʊn ɒn/", "phr.", "7.0", "trấn áp, xử lý mạnh tay", "The police have promised to crack down on drink-driving."],
      ["surveillance", "/səˈveɪləns/", "n.", "7.0", "sự giám sát", "CCTV surveillance has helped reduce crime in many city centres."],
      ["petty crime", "/ˌpeti ˈkraɪm/", "collocation", "7.0", "tội phạm vặt", "Petty crime such as pickpocketing is common in crowded tourist areas."],
      ["root cause", "/ˈruːt kɔːz/", "collocation", "7.0", "nguyên nhân gốc rễ", "To reduce crime, we must tackle its root causes, such as poverty and unemployment."]
    ],
    government: [
      ["legislation", "/ˌledʒɪsˈleɪʃn/", "n.", "7.0", "luật pháp; việc lập pháp", "New legislation has been introduced to protect consumers' rights."],
      ["allocate funds", "/ˌæləkeɪt ˈfʌndz/", "collocation", "7.0", "phân bổ ngân sách", "The government should allocate more funds to public healthcare."],
      ["impose", "/ɪmˈpəʊz/", "v.", "7.0", "áp đặt (thuế, luật lệ)", "Some countries impose heavy taxes on sugary drinks."],
      ["public spending", "/ˌpʌblɪk ˈspendɪŋ/", "collocation", "6.5", "chi tiêu công", "Cuts in public spending often hit the poorest hardest."],
      ["regulate", "/ˈreɡjuleɪt/", "v.", "6.5", "điều tiết, quản lý bằng quy định", "Governments must regulate the use of personal data by tech companies."],
      ["subsidise", "/ˈsʌbsɪdaɪz/", "v.", "7.0", "trợ cấp, bao cấp", "The state should subsidise public transport to make it more affordable."],
      ["a top priority", "/ə ˌtɒp praɪˈɒrəti/", "collocation", "6.5", "ưu tiên hàng đầu", "Tackling climate change should be a top priority for every government."],
      ["accountable", "/əˈkaʊntəbl/", "adj.", "7.5+", "phải chịu trách nhiệm", "Politicians must be held accountable for their decisions."],
      ["intervene", "/ˌɪntəˈviːn/", "v.", "7.0", "can thiệp", "The government had to intervene to stabilise food prices."],
      ["bureaucracy", "/bjʊəˈrɒkrəsi/", "n.", "7.5+", "bộ máy quan liêu; thủ tục hành chính rườm rà", "Excessive bureaucracy discourages people from starting new businesses."],
      ["taxpayers' money", "/ˌtækspeɪəz ˈmʌni/", "collocation", "7.0", "tiền thuế của người dân", "Building a new stadium would be a waste of taxpayers' money."],
      ["enact", "/ɪˈnækt/", "v.", "8.0+", "ban hành (luật)", "Parliament enacted a law banning single-use plastics."]
    ],
    family: [
      ["nuclear family", "/ˌnjuːkliə ˈfæməli/", "collocation", "6.5", "gia đình hạt nhân (bố mẹ và con cái)", "The nuclear family has largely replaced the extended family in urban areas."],
      ["extended family", "/ɪkˌstendɪd ˈfæməli/", "collocation", "6.5", "đại gia đình (nhiều thế hệ)", "In Vietnam, it is common for extended families to live under one roof."],
      ["upbringing", "/ˈʌpbrɪŋɪŋ/", "n.", "7.0", "sự nuôi dạy, giáo dưỡng", "A child's upbringing has a lasting impact on their personality."],
      ["generation gap", "/ˌdʒenəˈreɪʃn ɡæp/", "collocation", "6.5", "khoảng cách thế hệ", "Technology has widened the generation gap between parents and teenagers."],
      ["sibling", "/ˈsɪblɪŋ/", "n.", "6.5", "anh chị em ruột", "Growing up with siblings teaches children how to share and compromise."],
      ["role model", "/ˈrəʊl ˌmɒdl/", "collocation", "6.5", "hình mẫu, tấm gương", "Parents are the most important role models for young children."],
      ["bring up", "/ˌbrɪŋ ˈʌp/", "phr.", "6.5", "nuôi nấng, nuôi dạy", "It is becoming increasingly expensive to bring up children in big cities."],
      ["dual-income household", "/ˌdjuːəl ˌɪnkʌm ˈhaʊshəʊld/", "collocation", "7.5+", "gia đình có hai nguồn thu nhập (cả vợ và chồng đi làm)", "In dual-income households, grandparents often help with childcare."],
      ["nurture", "/ˈnɜːtʃə/", "v.", "7.0", "nuôi dưỡng, vun đắp", "Parents should nurture their children's natural curiosity."],
      ["close-knit", "/ˌkləʊs ˈnɪt/", "adj.", "7.0", "gắn bó khăng khít", "I grew up in a close-knit family where we ate dinner together every night."],
      ["spend quality time with", "/ˌspend ˌkwɒləti ˈtaɪm wɪð/", "phr.", "6.5", "dành thời gian ý nghĩa bên (ai)", "Busy parents should make an effort to spend quality time with their children."],
      ["filial piety", "/ˌfɪliəl ˈpaɪəti/", "collocation", "8.0+", "lòng hiếu thảo", "Filial piety remains a core value in many Asian cultures."]
    ],
    economy: [
      ["economic growth", "/ˌiːkəˌnɒmɪk ˈɡrəʊθ/", "collocation", "6.5", "tăng trưởng kinh tế", "Tourism has been a major driver of economic growth in the region."],
      ["recession", "/rɪˈseʃn/", "n.", "7.0", "suy thoái kinh tế", "Millions of people lost their jobs during the last global recession."],
      ["unemployment rate", "/ˌʌnɪmˈplɔɪmənt ˌreɪt/", "collocation", "6.5", "tỉ lệ thất nghiệp", "The youth unemployment rate remains stubbornly high in some regions."],
      ["consumerism", "/kənˈsjuːmərɪzəm/", "n.", "7.5+", "chủ nghĩa tiêu dùng", "Consumerism encourages people to buy things they do not really need."],
      ["cost of living", "/ˌkɒst əv ˈlɪvɪŋ/", "collocation", "6.5", "chi phí sinh hoạt", "The rising cost of living is making it harder for young families to save."],
      ["inflation", "/ɪnˈfleɪʃn/", "n.", "6.5", "lạm phát", "High inflation reduces the purchasing power of ordinary workers."],
      ["boost the economy", "/ˌbuːst ði ɪˈkɒnəmi/", "phr.", "6.5", "thúc đẩy nền kinh tế", "Hosting the Olympics can boost the economy through tourism and investment."],
      ["disposable income", "/dɪˌspəʊzəbl ˈɪnkʌm/", "collocation", "7.5+", "thu nhập khả dụng (sau thuế, chi phí thiết yếu)", "As disposable income rises, people spend more on leisure and travel."],
      ["thrive", "/θraɪv/", "v.", "7.0", "phát triển mạnh, thịnh vượng", "Small businesses thrive when taxes are low and regulations are simple."],
      ["poverty line", "/ˈpɒvəti laɪn/", "collocation", "7.0", "chuẩn nghèo", "Millions of people around the world still live below the poverty line."],
      ["fluctuate", "/ˈflʌktʃueɪt/", "v.", "7.0", "dao động, lên xuống thất thường", "Oil prices fluctuate depending on global demand."],
      ["stagnation", "/stæɡˈneɪʃn/", "n.", "8.0+", "sự trì trệ", "Years of economic stagnation have left many young people without prospects."]
    ],
    food: [
      ["processed food", "/ˌprəʊsest ˈfuːd/", "collocation", "6.5", "thực phẩm chế biến sẵn", "Processed food is often high in salt, sugar and unhealthy fats."],
      ["nutritious", "/njuˈtrɪʃəs/", "adj.", "6.5", "bổ dưỡng", "Schools should provide free nutritious meals for all pupils."],
      ["a balanced diet", "/ə ˌbælənst ˈdaɪət/", "collocation", "6.5", "chế độ ăn uống cân bằng", "A balanced diet rich in fruit and vegetables is essential for good health."],
      ["food security", "/ˈfuːd sɪˌkjʊərəti/", "collocation", "7.5+", "an ninh lương thực", "Climate change is a growing threat to global food security."],
      ["organic produce", "/ɔːˌɡænɪk ˈprɒdjuːs/", "collocation", "7.0", "nông sản hữu cơ", "Organic produce is more expensive but is grown without chemical pesticides."],
      ["fast food", "/ˌfɑːst ˈfuːd/", "collocation", "6.5", "đồ ăn nhanh", "The popularity of fast food has contributed to rising obesity rates."],
      ["staple food", "/ˌsteɪpl ˈfuːd/", "collocation", "7.0", "lương thực chính", "Rice is the staple food in most Asian countries."],
      ["cuisine", "/kwɪˈziːn/", "n.", "6.5", "ẩm thực", "Vietnamese cuisine is famous for its fresh herbs and balanced flavours."],
      ["food waste", "/ˈfuːd weɪst/", "collocation", "6.5", "sự lãng phí thực phẩm", "Supermarkets should donate unsold products to reduce food waste."],
      ["cut down on", "/ˌkʌt ˈdaʊn ɒn/", "phr.", "6.5", "cắt giảm (lượng dùng)", "Doctors advise patients to cut down on sugar and salt."],
      ["additive", "/ˈædətɪv/", "n.", "7.0", "chất phụ gia", "Many snacks contain artificial additives that may harm children's health."],
      ["malnutrition", "/ˌmælnjuˈtrɪʃn/", "n.", "7.0", "tình trạng suy dinh dưỡng", "Malnutrition remains a serious problem in parts of the developing world."],
      ["palatable", "/ˈpælətəbl/", "adj.", "8.0+", "ngon miệng; dễ chấp nhận", "Chefs are finding creative ways to make vegetables more palatable to children."]
    ],
    sport: [
      ["physical fitness", "/ˌfɪzɪkl ˈfɪtnəs/", "collocation", "6.5", "thể lực, sự khoẻ mạnh về thể chất", "Regular sport improves both physical fitness and concentration."],
      ["competitive", "/kəmˈpetətɪv/", "adj.", "6.5", "mang tính cạnh tranh, thi đấu", "Competitive sports teach children how to cope with failure."],
      ["team spirit", "/ˌtiːm ˈspɪrɪt/", "collocation", "6.5", "tinh thần đồng đội", "Playing football helps young people develop team spirit."],
      ["performance-enhancing drugs", "/pəˌfɔːməns ɪnˌhɑːnsɪŋ ˈdrʌɡz/", "collocation", "7.5+", "chất kích thích tăng thành tích (doping)", "Athletes caught using performance-enhancing drugs should be banned for life."],
      ["spectator", "/spekˈteɪtə/", "n.", "7.0", "khán giả (xem thi đấu)", "The stadium can hold more than eighty thousand spectators."],
      ["take up", "/ˌteɪk ˈʌp/", "phr.", "6.5", "bắt đầu tập (một môn, sở thích)", "I took up swimming last year to improve my health."],
      ["sportsmanship", "/ˈspɔːtsmənʃɪp/", "n.", "7.0", "tinh thần thể thao, tính fair-play", "Good sportsmanship means respecting your opponents, whether you win or lose."],
      ["stay in shape", "/ˌsteɪ ɪn ˈʃeɪp/", "phr.", "6.5", "giữ vóc dáng, giữ sức khoẻ", "Many office workers go to the gym after work to stay in shape."],
      ["grassroots sport", "/ˌɡrɑːsruːts ˈspɔːt/", "collocation", "7.5+", "thể thao phong trào, thể thao cơ sở", "More funding should go to grassroots sport rather than elite athletes."],
      ["exorbitant salaries", "/ɪɡˌzɔːbɪtənt ˈsæləriz/", "collocation", "8.0+", "mức lương cao ngất ngưởng", "Many people believe that footballers' exorbitant salaries cannot be justified."],
      ["endurance", "/ɪnˈdjʊərəns/", "n.", "7.0", "sức bền, sự bền bỉ", "Marathon running requires great endurance and mental strength."],
      ["host a sporting event", "/ˌhəʊst ə ˈspɔːtɪŋ ɪˌvent/", "phr.", "7.0", "đăng cai một sự kiện thể thao", "Hosting an international sporting event can improve a country's global image."]
    ],
    history: [
      ["historical site", "/hɪˌstɒrɪkl ˈsaɪt/", "collocation", "6.5", "di tích lịch sử", "Historical sites should be protected from overdevelopment."],
      ["ancestor", "/ˈænsestə/", "n.", "6.5", "tổ tiên", "Studying history helps us understand how our ancestors lived."],
      ["artefact", "/ˈɑːtɪfækt/", "n.", "7.0", "hiện vật, đồ tạo tác", "The museum displays artefacts dating back thousands of years."],
      ["commemorate", "/kəˈmeməreɪt/", "v.", "7.5+", "tưởng niệm, kỷ niệm", "A monument was built to commemorate those who died in the war."],
      ["learn from the mistakes of the past", "/ˌlɜːn frəm ðə mɪˈsteɪks əv ðə ˈpɑːst/", "phr.", "6.5", "rút kinh nghiệm từ sai lầm trong quá khứ", "Studying history enables societies to learn from the mistakes of the past."],
      ["restoration", "/ˌrestəˈreɪʃn/", "n.", "7.0", "sự trùng tu, phục hồi", "The restoration of the ancient citadel took more than ten years."],
      ["era", "/ˈɪərə/", "n.", "6.5", "kỷ nguyên, thời đại", "The invention of the printing press marked the beginning of a new era."],
      ["heritage site", "/ˈherɪtɪdʒ saɪt/", "collocation", "7.0", "khu di sản", "Ha Long Bay was recognised as a World Heritage Site in 1994."],
      ["antiquity", "/ænˈtɪkwəti/", "n.", "8.0+", "thời cổ đại", "Some of these temples have survived since antiquity."],
      ["outdated", "/ˌaʊtˈdeɪtɪd/", "adj.", "6.5", "lỗi thời, cũ kỹ", "Some argue that history lessons based on memorising dates are outdated."],
      ["in retrospect", "/ɪn ˈretrəspekt/", "phr.", "7.5+", "khi nhìn lại", "In retrospect, the decision to demolish the old market was a mistake."],
      ["chronological", "/ˌkrɒnəˈlɒdʒɪkl/", "adj.", "7.0", "theo trình tự thời gian", "The exhibition presents historical events in chronological order."]
    ],
    animals: [
      ["endangered species", "/ɪnˌdeɪndʒəd ˈspiːʃiːz/", "collocation", "6.5", "loài có nguy cơ tuyệt chủng", "Stricter laws are needed to protect endangered species from poachers."],
      ["habitat", "/ˈhæbɪtæt/", "n.", "6.5", "môi trường sống (tự nhiên)", "Many animals are losing their natural habitat to farming and logging."],
      ["poaching", "/ˈpəʊtʃɪŋ/", "n.", "7.0", "nạn săn trộm", "Poaching has pushed the rhino population close to collapse."],
      ["extinction", "/ɪkˈstɪŋkʃn/", "n.", "6.5", "sự tuyệt chủng", "Hundreds of species face extinction because of human activity."],
      ["animal testing", "/ˌænɪml ˈtestɪŋ/", "collocation", "6.5", "thử nghiệm trên động vật", "Animal testing for cosmetics has been banned in many countries."],
      ["captivity", "/kæpˈtɪvəti/", "n.", "7.0", "tình trạng bị nuôi nhốt", "Critics argue that keeping wild animals in captivity is cruel."],
      ["conservation", "/ˌkɒnsəˈveɪʃn/", "n.", "6.5", "sự bảo tồn", "Zoos can play an important role in wildlife conservation."],
      ["on the verge of extinction", "/ɒn ðə ˌvɜːdʒ əv ɪkˈstɪŋkʃn/", "phr.", "7.5+", "bên bờ vực tuyệt chủng", "The Javan rhino is on the verge of extinction, with fewer than eighty left in the wild."],
      ["animal welfare", "/ˌænɪml ˈwelfeə/", "collocation", "7.0", "quyền lợi, phúc lợi động vật", "Consumers are paying more attention to animal welfare when buying meat and eggs."],
      ["ecosystem", "/ˈiːkəʊsɪstəm/", "n.", "6.5", "hệ sinh thái", "The loss of a single species can disrupt an entire ecosystem."],
      ["domesticated", "/dəˈmestɪkeɪtɪd/", "adj.", "7.5+", "đã được thuần hoá", "Dogs were among the first animals to be domesticated by humans."],
      ["inhumane", "/ˌɪnhjuːˈmeɪn/", "adj.", "7.0", "vô nhân đạo, tàn nhẫn", "Keeping hens in tiny cages is widely regarded as inhumane."]
    ],
    energy: [
      ["renewable energy", "/rɪˌnjuːəbl ˈenədʒi/", "collocation", "6.5", "năng lượng tái tạo", "Investing in renewable energy creates jobs and reduces pollution."],
      ["fossil fuels", "/ˈfɒsl ˌfjuːəlz/", "collocation", "6.5", "nhiên liệu hoá thạch", "Burning fossil fuels is the main cause of global warming."],
      ["solar panel", "/ˌsəʊlə ˈpænl/", "collocation", "6.5", "tấm pin năng lượng mặt trời", "More households are installing solar panels to cut their electricity bills."],
      ["energy consumption", "/ˈenədʒi kənˌsʌmpʃn/", "collocation", "6.5", "mức tiêu thụ năng lượng", "Energy consumption tends to rise as countries become wealthier."],
      ["phase out", "/ˌfeɪz ˈaʊt/", "phr.", "7.5+", "loại bỏ dần dần", "Many countries plan to phase out coal power by 2040."],
      ["finite", "/ˈfaɪnaɪt/", "adj.", "7.0", "có hạn", "Oil and gas are finite resources that will eventually run out."],
      ["nuclear power", "/ˌnjuːkliə ˈpaʊə/", "collocation", "6.5", "điện hạt nhân", "Nuclear power produces little carbon but raises serious safety concerns."],
      ["energy-efficient", "/ˌenədʒi ɪˈfɪʃnt/", "adj.", "7.0", "tiết kiệm năng lượng", "Energy-efficient appliances may cost more but save money in the long run."],
      ["harness", "/ˈhɑːnɪs/", "v.", "7.5+", "khai thác, tận dụng (nguồn năng lượng)", "Coastal countries can harness the power of wind and waves."],
      ["alternative sources of energy", "/ɔːlˌtɜːnətɪv ˌsɔːsɪz əv ˈenədʒi/", "phr.", "7.0", "các nguồn năng lượng thay thế", "Governments should fund research into alternative sources of energy."],
      ["power outage", "/ˈpaʊər ˌaʊtɪdʒ/", "collocation", "7.0", "sự cố mất điện", "Extreme heatwaves have caused widespread power outages."],
      ["carbon neutral", "/ˌkɑːbən ˈnjuːtrəl/", "adj.", "8.0+", "trung hoà carbon", "The city aims to become carbon neutral by 2050."]
    ]
  };

  var TOPICS = ["education", "technology", "environment", "health", "work", "society", "urban", "culture", "science",
    "media", "travel", "crime", "government", "family", "economy", "food", "sport", "history", "animals", "energy"];

  // Same rule as IELTS.wordId: lowercase, trim, spaces -> "-", strip non [a-z0-9-]
  function makeId(word) {
    return String(word).toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  var target = root.data.vocab.words;
  var seen = {};
  for (var s = 0; s < target.length; s++) { if (target[s] && target[s].id) seen[target[s].id] = true; }

  var maxLen = 0;
  TOPICS.forEach(function (t) { if (BANK[t] && BANK[t].length > maxLen) maxLen = BANK[t].length; });

  // Round-robin interleave: consecutive daily sets mix different topics
  for (var i = 0; i < maxLen; i++) {
    for (var k = 0; k < TOPICS.length; k++) {
      var topic = TOPICS[k];
      var row = BANK[topic] && BANK[topic][i];
      if (!row) continue;
      var id = makeId(row[0]);
      if (seen[id]) continue;
      seen[id] = true;
      target.push({
        id: id,
        word: row[0],
        ipa: row[1],
        pos: row[2],
        band: row[3],
        vi: row[4],
        example: row[5],
        topic: topic
      });
    }
  }
})();
