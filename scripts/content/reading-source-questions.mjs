import {gaps,truth,matches,choices,paragraphOptions} from './helpers.mjs';

export function sourceQuestions(p) {
  const specs = nasa[p.id] || classic[p.id];
  if (!specs) throw new Error('Missing questions for '+p.id);
  return specs(p);
}
const nasa = {
'R5-P1': p => [
  truth(p,'tfng',1,[
    ['Mercury is smaller than Earth’s Moon.','F','only slightly larger'],
    ['Venus has a higher temperature than Mercury.','T','that title belongs to nearby Venus'],
    ['The first spacecraft to reach Mercury was built in Europe.','N','', 'Bài không nêu nơi chế tạo tàu vũ trụ đầu tiên tới Mercury.'],
    ['Mercury completes an orbit faster than any other planet.','T','faster than any other planet'],
    ['Mercury’s axis is strongly tilted away from the upright position.','F','nearly perfectly upright']]),
  gaps(p,'note',[[6,'Time for one rotation: ___ Earth days','59','one rotation every 59 Earth days'],[7,'Length of a full solar day: ___ Earth days','176','equals 176 Earth days'],[8,'The planet has a central core and a rocky ___.','mantle','a rocky mantle'],[9,'The core contains ___ material.','metallic','large metallic core']],'Mercury’s movement and structure'),
  gaps(p,'short',[[10,'What shape is used to describe the orbit? ___','egg-shaped','egg-shaped orbit'],[11,'What surface features are produced by collisions? ___','impact craters','many impact craters'],[12,'What colour would most of the surface appear? ___','greyish-brown','appear greyish-brown'],[13,'What are the bright streaks called? ___','crater rays','called "crater rays']])],
'R6-P1': p => [
  truth(p,'tfng',1,[
    ['Venus rotates in the same direction as most planets.','F','opposite direction from most planets'],
    ['The surface temperature is sufficient to melt lead.','T','hot enough to melt lead'],
    ['Every surface feature on Venus is named after a woman.','F','Most features on Venus are named for women'],
    ['Researchers have confirmed living organisms in the clouds.','F','None of these findings provide compelling evidence'],
    ['Early Venera probes were more expensive to build than later ones.','N','','Không nêu hoặc so sánh chi phí chế tạo các tàu Venera.']]),
  gaps(p,'note',[[6,'Pressure at the surface: about ___ times Earth’s sea-level pressure','93','about 93 times'],[7,'The unexplained dark streaks absorb ___ radiation.','ultraviolet','absorbing ultraviolet radiation'],[8,'One possible explanation involves the chemical ___.','iron chloride','called iron chloride'],[9,'Sulfur linkages might give microbes a protective ___.','coating','a kind of coating']],'Venus’ atmosphere'),
  gaps(p,'short',[[10,'How many minutes does sunlight take to reach Venus? ___','six','about six minutes',['6']],[11,'Which planet spends more time near Earth than Venus does? ___','Mercury','Mercury, the innermost planet'],[12,'What instrument is mentioned alongside binoculars? ___','telescope','binoculars or a telescope'],[13,'How long is the complete cycle of Venus’ phases, in days? ___','584','takes 584 days']])],
'R7-P1': p => [
  truth(p,'tfng',1,[
    ['Mars has a thick atmosphere today.','F','a very thin atmosphere'],
    ['Evidence suggests ancient Mars was wetter than it is today.','T','much wetter and warmer'],
    ['The planet’s reddish appearance is connected with iron.','T','iron minerals in the Martian dirt oxidize'],
    ['Mars has four moons.','F','Mars has two small moons'],
    ['Exactly five rovers are currently operating on Mars.','N','','Bài nhắc rovers nhưng không cho biết tổng số rover đang hoạt động.']]),
  gaps(p,'note',[[6,'Sunlight reaches Mars after ___ minutes.','13','takes sunlight 13 minutes'],[7,'The term for Martian days is ___.','sols','Martian days are called sols'],[8,'Seasons vary in length because the orbit is ___.','elliptical','elliptical, egg-shaped orbit'],[9,'The moon with the smoother appearance is ___.','Deimos','Deimos is covered in loose dirt']],'Time and moons'),
  gaps(p,'short',[[10,'Which moon is gradually approaching Mars? ___','Phobos','Phobos, the innermost'],[11,'What could form if the inner moon breaks apart? ___','dusty ring','create a dusty ring'],[12,'Which material surrounds the core? ___','rocky mantle','a rocky mantle'],[13,'What is the Martian soil called in the passage? ___','regolith','regolith (Martian']])],
'R8-P1': p => [
  truth(p,'tfng',1,[
    ['Jupiter takes longer than every other planet to rotate.','F','shortest day in the solar system'],
    ['The Great Red Spot is a storm.','T','a giant storm bigger than Earth'],
    ['All of Jupiter’s moons were discovered in 1610.','F','The four largest moons'],
    ['The rings were an unexpected discovery.','T','rings were a surprise'],
    ['Galileo cost more than any earlier spacecraft sent to Jupiter.','N','','Không nêu hoặc so sánh chi phí tàu Galileo.']]),
  gaps(p,'note',[[6,'Dark stripes are known as ___.','belts','stripes are called belts'],[7,'The light bands are known as ___.','zones','lighter bands are called zones'],[8,'The moon with the greatest volcanic activity is ___.','Io','Io is the most volcanically active'],[9,'The largest moon is ___.','Ganymede','Ganymede is the largest moon']],'Clouds and satellites'),
  gaps(p,'short',[[10,'What is the main liquid in Jupiter’s deep ocean? ___','hydrogen','hydrogen instead of water'],[11,'Which moon is the destination of Europa Clipper? ___','Europa','frozen crust of Europa'],[12,'What pushes electrons off hydrogen atoms at great depth? ___','pressure','the pressure becomes so great'],[13,'How many Earth years does one orbit take, approximately? ___','12','about 12 Earth years',['twelve']]])],
'R9-P1': p => [
  truth(p,'tfng',1,[
    ['Saturn is the only planet with rings.','F','Saturn is not the only planet to have rings'],
    ['Saturn could be seen before telescopes were invented.','T','unaided human eye'],
    ['The rings all orbit at an identical speed.','F','each ring orbits at a different speed'],
    ['Saturn’s axial tilt allows it to have seasons.','T','Saturn experiences seasons'],
    ['Saturn was first photographed from a spacecraft in 1969.','N','','Không nêu năm đầu tiên chụp Saturn từ tàu vũ trụ.']]),
  gaps(p,'note',[[6,'One day on Saturn lasts ___ hours.','10.7','only 10.7 hours'],[7,'Most ring particles consist of ice and ___.','rock','chunks of ice and rock'],[8,'The gap between Rings A and B is the ___.','Cassini Division','called the Cassini Division'],[9,'The planet’s average ___ is lower than water’s.','density','average density that is less than water']],'Saturn and its rings'),
  gaps(p,'short',[[10,'Which moon has methane lakes? ___','Titan','methane lakes on smoggy Titan'],[11,'Which moon produces jets of water? ___','Enceladus','jets of water that spray from Saturn\'s moon Enceladus'],[12,'Which is the outermost ring in the sequence ending after G? ___','E','finally, the E ring'],[13,'Name one of the two main gases in Saturn. ___','hydrogen','hydrogen and helium',['helium']]])],
'R10-P1': p => [
  truth(p,'tfng',1,[
    ['Humans saw the far side of the Moon before 1959.','F','didn\'t see the lunar far side until'],
    ['The far side of the Moon is permanently without sunlight.','F','different parts are in sunlight or darkness'],
    ['The Moon turns once during each orbit around Earth.','T','rotating at the same rate'],
    ['Evidence of native lunar organisms has been found.','F','no evidence to suggest it has its own living things'],
    ['The first astronauts on the Moon stayed there for three days.','N','','Bài không nêu thời gian lưu lại của nhóm phi hành gia đầu tiên.']]),
  gaps(p,'note',[[6,'Most water ice is concentrated in dark craters at the ___.','poles','craters at the poles'],[7,'When the near side is fully lit, the phase is a ___.','full moon','During a "full moon'],[8,'The iron-rich inner core is ___.','solid','solid, iron-rich inner core'],[9,'Powder and rocky debris at the surface are called lunar ___.','regolith','called the lunar regolith']],'Lunar features'),
  gaps(p,'short',[[10,'What is the Latin name from which “lunar” comes? ___','Luna','Moon was called Luna'],[11,'What are the lighter areas called? ___','highlands','known as the highlands'],[12,'What filled the dark impact basins? ___','lava','filled with lava'],[13,'What is the fractured bedrock below the surface debris called? ___','megaregolith','referred to as the megaregolith']])],
'R11-P1': p => [
  truth(p,'tfng',1,[
    ['The statistical estimate suggests there are more stars than planets in our galaxy.','F','more planets than stars'],
    ['51 Pegasi b took about four days to orbit its star.','T','a four-day orbit'],
    ['Kepler waited for reductions in the light from stars.','T','tiny dips in the amount of light'],
    ['A directly captured single pixel reveals detailed surface features.','F','won\'t be enough to reveal surface features'],
    ['51 Pegasi b has a moon larger than Earth.','N','','Bài không mô tả vệ tinh của 51 Pegasi b.']]),
  gaps(p,'note',[[6,'Stellar wobbling reveals changes in radial ___.','velocity','radial velocity'],[7,'Planets crossing in front of stars are found using the ___ method.','transit','transit method'],[8,'A spectrum’s bands help identify which ___ are present.','molecules','which molecules are present'],[9,'Gravity may warp and bend ___.','starlight','warp and bend starlight']],'Methods of detection'),
  gaps(p,'short',[[10,'For how many years did Kepler stare at the patch of sky? ___','four','four years',['4']],[11,'What ordinary object is used to explain a rainbow spectrum? ___','prism','Think of a prism'],[12,'Which telescope detected helium and water vapour in atmospheres? ___','Hubble','Hubble Space Telescope has detected'],[13,'What developing technology is named at the end? ___','coronagraph','the coronagraph']])],
'R12-P1': p => [
  truth(p,'tfng',1,[
    ['All stars have the same life span.','F','ranging from a few million to trillions'],
    ['Cold molecular clouds can form dense clumps.','T','creating high-density pockets'],
    ['Main sequence is the shortest stage of stellar life.','F','the longest phase'],
    ['Massive stars consume their fuel more quickly.','T','burn fuel at a higher rate'],
    ['The earliest recorded supernova was observed in Asia.','N','','Không nêu nơi quan sát supernova sớm nhất được ghi lại.']]),
  gaps(p,'note',[[6,'A baby star is called a ___.','protostar','a protostar'],[7,'Fusion initially changes hydrogen into ___.','helium','form helium'],[8,'The remnant of a low-mass star is a white ___.','dwarf','a white dwarf'],[9,'A massive star may explode as a ___.','supernova','called a supernova']],'Stellar evolution'),
  gaps(p,'short',[[10,'What force causes a gas clump to collapse? ___','gravity','gravity causes'],[11,'Which element is produced by the fusion of silicon? ___','iron','silicon fuses into iron'],[12,'What travels outward before a supernova? ___','shock wave','a shock wave'],[13,'Give one possible dense remnant of a high-mass star. ___','neutron star','either a neutron star or a black hole',['black hole']]])]
};

const headingEvidence={
 'R5-P2':[['With a lamp you take a little oil','Đoạn mô tả cách bố trí và đốt đèn dầu.'],['how is it that this solid substance','Các câu hỏi tập trung vào nghịch lý nhiên liệu rắn di chuyển tới ngọn lửa.'],['a good deal of wind','Giảng viên loại tác động của gió để quan sát ngọn lửa ổn định.'],['By the use of this lamp-glass','Chụp kính giữ lửa đều; đoạn sau giải thích cốc sáp được hình thành.']],
 'R6-P2':[['division of labour amongst the persons','Ví dụ làm cung, nhà, thuyền minh họa phân công theo nghề từ sớm.'],['greater profit of his labour','Động lực ban đầu là lợi ích cá nhân, chưa phải ý định tăng của cải chung.'],['Of the time required for learning','Đoạn mở phần phân tích các lợi thế, bắt đầu bằng thời gian học nghề.'],['confined to one operation','Chỉ học một thao tác giúp giảm thời gian đầu chưa tạo lợi ích.']],
 'R7-P2':[['a state of perplexity, hesitation, doubt','Hai thành phần là nghi vấn và hoạt động tìm thêm bằng chứng.'],['no matter how slight and commonplace','Một thay đổi nhỏ đời thường vẫn có thể tạo ra vấn đề cần giải thích.'],['an act of research or inquiry','Nhìn lên trời cũng là nghiên cứu nếu dùng để kiểm tra lời giải thích.'],['a branching of the roads','Sau mục tiêu xác nhận hoặc bác bỏ, tác giả chuyển sang ví dụ chọn đường.']],
 'R8-P2':[['a vast deluge of molten rocks','Dung nham xóa nhiều đặc điểm địa hình trước giai đoạn băng hà.'],['sculpturing the range anew','Băng hà xói mòn và tái tạo dãy núi.'],['over all the world wherever glaciers exist','Tác giả liệt kê các vùng khác để cho thấy quá trình vẫn tiếp diễn rộng rãi.'],['broke up into a series of glaciers','Khối băng rút lên cao và chia thành các nhánh nhỏ.']],
 'R9-P2':[['an old Italian woman','Hình ảnh người phụ nữ xe sợi khơi nguồn ý tưởng bảo tàng.'],['build a bridge between European and American experiences','Đề xuất giáo dục nhằm nối trải nghiệm của cha mẹ nhập cư và con cái.'],['gave me the clue that was needed','Nghề thủ công là manh mối giúp kết nối lao động nhà máy với di sản gia đình.'],['many talks with Dr. Dewey','Đoạn đưa cơ sở giáo dục và những người tham gia phát triển ý tưởng.']],
 'R10-P2':[['more favorable, not only to thought, but to serious reading','Nơi ở được mô tả là thuận lợi cho suy nghĩ và đọc sâu.'],['Incessant labor with my hands','Công việc dựng nhà, trồng đậu khiến dự định đọc phải chờ.'],['laboriously seek the meaning of each word and line','Tiếp cận văn học anh hùng đòi hỏi nỗ lực giải nghĩa.'],['some words of an ancient language','Tác giả bảo vệ giá trị lâu dài của việc học ngôn ngữ và tác phẩm cổ.']],
 'R11-P2':[['only plain brown ware','Sản phẩm chủ yếu thô sơ, cho thấy điểm xuất phát thấp của nghề gốm.'],['came from Delft in Holland','Đoạn nói về nguồn nhập khẩu và loại đồ trắng nội địa còn chưa đạt.'],['it had become completely changed','Wedgwood biến nghề gốm thành một ngành thương mại và nghệ thuật phát triển.'],['when only eleven years old','Gia đình và việc vào làm từ nhỏ giải thích khởi đầu nghề nghiệp.']],
 'R12-P2':[['species are not numerous','Ít loài nhưng số cá thể của từng loài rất lớn.'],['Of toads and frogs there are none','Tác giả ngạc nhiên vì không thấy ếch nhái dù môi trường có vẻ phù hợp.'],['introduce frogs into Mauritius','Các ghi chép lịch sử khiến ông nghi ngờ ếch tại Mauritius là loài được đưa vào.'],['eggs of lizards','Giả thuyết vận chuyển trứng giải thích khác biệt, rồi bài chuyển sang rùa.']]
};
const headingDistractors={
 'R5-P2':['How candle colour changes heat','Methods for manufacturing decorative candles'],
 'R6-P2':['Why high wages improve every trade','Replacing apprentices with machinery'],
 'R7-P2':['The emotional value of imagining a story','A lesson about map-making standards'],
 'R8-P2':['Earthquakes as the main sculptors','Plants that survive volcanic eruptions'],
 'R9-P2':['Replacing crafts with imported machines','The financial failure of a museum'],
 'R10-P2':['Reading solely for immediate practical gain','The decline of every European language'],
 'R11-P2':['The disappearance of imported ceramics','An expensive international exhibition'],
 'R12-P2':['The introduction of lizards by settlers','The classification of island birds']
};
const headingOrders=[[1,4,0,3,5,2],[3,2,4,1,0,5],[5,0,3,4,2,1],[2,1,5,0,4,3],[4,3,1,5,2,0],[0,5,2,1,3,4],[3,0,4,2,5,1],[1,2,0,5,3,4]];
function classicSet(p, titles, info, sentence, mcq) {
  const order=headingOrders[Number(p.id.match(/\d+/)[0])-5], labels=['i','ii','iii','iv','v','vi'];
  const allTitles=titles.concat(headingDistractors[p.id]);
  const keys=titles.map((_,i)=>labels[order.indexOf(i)]);
  const options=order.map((index,i)=>[labels[i],allTitles[index]]);
  return [matches(p,'headings',14,options,titles.map((_,i)=>['Paragraph '+'ABCD'[i],keys[i],...headingEvidence[p.id][i]]),'Choose the correct heading for paragraphs A–D. There are more headings than paragraphs.'),
    matches(p,'info',18,paragraphOptions,info.map(([text,quote])=>[text,p.paragraphs.find(x=>x.text.includes(quote)).label,quote]),'Which paragraph contains the following information? You may use a letter more than once.',true),
    gaps(p,'sentence',sentence.map((row,i)=>[21+i,...row])),choices(p,24,mcq)];
}
const classic = {
'R5-P2': p=>classicSet(p,
  ['How a lamp behaves','A puzzle about solid fuel','Removing a distracting influence','A glass shield and the formation of a cup'],
  [['An explanation involving the same force that holds worlds together','same force of gravity'],['An unusual fuel that can hold liquid within itself','Irish bogwood'],['A preference for performance rather than appearance','best acting thing']],
  [['Air keeps the exterior of the candle ___.','cool','exterior of the candle cool'],['A current from only one side makes the cup ___.','lop-sided','cup would be lop-sided'],['An upward projection of wax is described as a little ___.','pillar','forms a little pillar']],
  [['Why does the lecturer place glass around the candle?',['To make the wax melt faster','To obtain a steady flame for observation','To increase the amount of fuel'],'B','you have a steady flame'],['What makes an attractive candle burn badly in this example?',['The age of its materials','The colour of its flame','An irregular stream of air and an imperfect cup'],'C','irregularity of the stream of air'],['Why can a small wax pillar resist melting?',['More air reaches and cools it','It has a separate wick','It is made of a different substance'],'A','air gets better round it']]),
'R6-P2': p=>classicSet(p,
  ['Early specialisation in different trades','Individual gain before collective prosperity','Introducing the analysis and the cost of learning','A shorter route through an apprenticeship'],
  [['A prediction that easier access to a skill can reduce pay','wages will soon fall'],['An explanation of why changing activity is initially inefficient','renders every change slow'],['A comparison between physical and mental changes of activity','change of mental exertion']],
  [['Learning each new process wastes some raw ___.','material','raw material'],['Restricting workers to single processes can reduce the price of ___.','production','price of production'],['Moving between different ___ also consumes time.','tools','Change of tools']],
  [['Why did early individuals restrict themselves to one trade, according to Babbage?',['They expected greater personal returns','They were obeying a national plan','They wanted to teach every trade'],'A','greater profit of his labour'],['What does the author intend to add to earlier discussions?',['An account of advertising','Something previous writers have omitted','An argument against all machinery'],'B','what appears to me to have been omitted'],['Why might employers offer shorter apprenticeships?',['Training would require more trades','Every apprentice would receive identical pay','Competition and faster useful work would alter the terms'],'C','if there be any competition amongst the masters']]),
'R7-P2': p=>classicSet(p,
  ['Two components of reflective activity','An ordinary interruption becomes a problem','Everyday looking as an act of research','Testing a belief and facing a choice of roads'],
  [['Two possible ways of choosing when the route is unknown','trusting to luck for the outcome'],['A physical action used as a metaphor for seeking perspective','we metaphorically climb a tree'],['A statement that a question directs the course of ideas','sets up an end and holds the current']],
  [['A traveler must use observation and also consult his ___.','memory','cudgel his memory'],['A map or ___ can provide the facts the traveler needs.','signboard','signboard or a map'],['The author says a ___ is the guiding factor in reflection.','perplexity','solution of a perplexity']],
  [['Why does the author describe looking at the sky as inquiry?',['It requires expensive instruments','It always proves a forecast correct','It checks an explanation against observations'],'C','discover if this suggested explanation held good'],['What normally calls reflection into action?',['An obstacle or an unresolved uncertainty','The absence of any possible question','An activity proceeding without difficulty'],'A','Difficulty or obstruction'],['How is each suggested conclusion assessed?',['By how emotionally pleasing it is','By its relevance to the problem','By the social status of its author'],'B','pertinence to the problem in hand']]),
'R8-P2': p=>classicSet(p,
  ['A volcanic landscape before the ice','Glaciers remake the mountains','A continuing process seen beyond California','The retreat and fragmentation of the ice'],
  [['Plants and animals colonising newly exposed ground','Pine-trees marched up'],['A description of the mountains before glaciation as comparatively simple','one vast wave of stone'],['An estimate of the depth of rock removed','more than a mile in average depth']],
  [['Young rivers ran in channels abandoned by ___.','glaciers','abandoned channels of the glaciers'],['Glaciers are described as closely compacted ___.','snow-crystals','closely compacted snow-crystals'],['The glaciers created large beds of ___.','soil','making vast beds of soil']],
  [['Which contrast especially interests Muir?',['Rock colour versus the price of land','Small fragile agents versus the scale of their work','Forests in cities versus forests in gardens'],'B','agents so fragile and small'],['How does Muir characterise the pace of the change?',['Instantaneous on a human scale','Completed in one winter','Slow when judged by human measures of time'],'C','slow, as we count time'],['What followed the receding ice?',['The spread of plants and animals','A permanent absence of soil','The disappearance of every river'],'A','Plants and animals, biding their time']]),
'R9-P2': p=>classicSet(p,
  ['A spinning woman inspires a museum','A need to connect two generations','An old craft offers an educational clue','An educational argument and its supporters'],
  [['The regular evening on which demonstrations took place','every Saturday evening'],['A description of craftspeople from several national backgrounds','a Syrian woman'],['A comparison between the historical transitions of weaving and sewing','application of steam to sewing']],
  [['Four spinning methods and three spindle variations made a sequence of ___ examples.','seven','these seven into historic sequence'],['The woman intended to knit ___ for her goddaughter.','stockings','a pair of stockings'],['The audience member who compared industrial transitions was a Russian ___.','tailor','a Russian tailor']],
  [['What was a central aim of the museum?',['To replace every modern factory','To sell imported textiles','To help children understand their parents’ inherited skills'],'C','through their own parents and grandparents'],['How were old methods displayed?',['In a historical sequence connected to factory spinning','In order of the demonstrators’ income','As unrelated curiosities without explanation'],'A','connect the whole with the present method'],['What comfort might industrial history offer workers?',['Proof that difficult adjustments never happen','Recognition of similar earlier transitions and possible action','A promise that all work will disappear immediately'],'B','readjustment may be shortened and alleviated']]),
'R10-P2': p=>classicSet(p,
  ['A location favourable to serious reading','Manual labour delays a reading ambition','The effort required to approach heroic literature','The enduring value of ancient languages'],
  [['An explicit comparison between reading and demanding physical training','training such as the athletes'],['A distinction between ordinary speech and literary expression','a reserved and select expression'],['A description of renewed access to ancient works','learning revived']],
  [['The book kept on the writer’s table was Homer’s ___.','Iliad','Homer’s Iliad'],['The writer had to finish a house and ___ beans.','hoe','beans to hoe'],['Books should be read as deliberately as they were ___.','written','as they were written']],
  [['What does Thoreau say about numerous modern translations?',['They eliminate every difficulty in reading classics','They have done little to close the distance to ancient authors','They make classical languages worthless'],'B','done little to bring us nearer'],['Why is knowing a spoken language insufficient?',['Literary works may employ a distinct, developed language','Written works contain no ideas','Every great book must be read aloud'],'A','memorable interval between the spoken and the written language'],['How does he regard replacing classics with practical studies?',['As the only reasonable educational reform','As something that has already happened everywhere','As inconsistent with the adventurous student’s continuing interest'],'C','adventurous student will always study classics']]),
'R11-P2': p=>classicSet(p,
  ['The limitations of early English pottery','Foreign supply and imperfect local alternatives','Wedgwood’s transformation of a trade','A childhood introduction to pottery work'],
  [['An interpretation of how disability redirected a craftsman’s attention','It sent his mind inwards'],['The qualities targeted in an improved product','shape, colour, glaze, and durability'],['An observation about a material changing colour when heated','became white after exposure']],
  [['Wedgwood began working as a ___ for his brother.','thrower','as a “thrower”'],['He opened his own business at Burslem in ___.','1759','year 1759'],['To deepen his understanding, he studied ___.','chemistry','study of chemistry']],
  [['What does the earlier “white ware” show about local manufacture?',['It was imperfect despite its name','It was imported only from Delft','It was always pure white'],'A','not white, but of a dirty cream colour'],['How does Smiles represent Wedgwood’s influence?',['As restricted to his own income','As damaging to national commerce','As extending beyond pottery into habits of industry'],'C','influence the public activity in all directions'],['What led towards a new white mixture?',['Copying an advertised formula without testing','Observing and reflecting on heated silica-containing earth','Avoiding experiments with clay'],'B','observed and pondered on']]),
'R12-P2': p=>classicSet(p,
  ['A small variety but large numbers of reptiles','The unexpected absence of frogs','A possible island exception examined historically','A hypothesis about transport and a turn to tortoises'],
  [['A physical feature used to distinguish male and female tortoises','greater length of its tail'],['Food associated with the driest habitats','feed chiefly on the succulent cactus'],['Routes to water helping humans find springs','Spaniards by following them up']],
  [['The protective quality of lizard eggs comes from ___ shells.','calcareous','protected by calcareous shells'],['In higher damp areas, tortoises eat leaves, berries and ___.','lichen','filamentous lichen'],['According to residents, animals may remain near water for three or four ___.','days','three or four days']],
  [['Why is the presence of frogs on Mauritius not decisive for Darwin?',['He thinks the island has no water','He doubts they were originally native there','He has never read about the island'],'B','whether this frog is an aboriginal'],['Where does the passage locate springs?',['On all islands at the coastline','Only in the lowest dry districts','At considerable height in the central areas of larger islands'],'C','larger islands alone possess springs'],['What may explain the frequency of visits to water?',['The nature of the animals’ food','The number of human spectators','A single timetable followed by every animal'],'A','according to the nature of the food']])
};
export {classic};
