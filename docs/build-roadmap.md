# Roadmap build IELTS Personal Coach

Ngày lập: 05/10/2026. Phạm vi đã xác nhận: **app local cá nhân, IELTS Academic**.

Tài liệu này là kế hoạch triển khai và nghiệm thu. Các tính năng dưới đây chưa được triển khai trong phiên làm việc này. Các ngưỡng phân tích, số lượng nội dung và thời lượng là đề xuất để chốt phạm vi với khách hàng.

## 1. Đích đến và bản hiện tại

Người học mở app trên máy Windows → xem kế hoạch hôm nay → luyện tập và nộp bài → xem kết quả, lỗi và từ cần học → hôm sau nhận kế hoạch mới và lịch ôn đúng hạn. Toàn bộ quá trình phải lưu được sau khi đóng app và có thể sao lưu, khôi phục.

Bản hiện tại (`index.html`) là prototype giao diện: có Dashboard, Roadmap, Today, bốn kỹ năng, Vocabulary, Error Log và Settings. Dữ liệu lưu trong localStorage; chưa có hệ thống đề, đáp án, bài nộp và lịch học hoàn chỉnh. Listening/Reading sinh điểm ngẫu nhiên; Writing trả hướng dẫn cố định; Speaking có nút timer nhưng chưa có xử lý timer; streak đang là số cố định. Các phần này chưa thể dùng làm bằng chứng hoàn thành luồng học thật.

Phần **Roadmap trong app** giữ giao diện và tính năng hiện có. Roadmap build trong tài liệu này là kế hoạch phát triển sản phẩm.

Môi trường bàn giao: app web chạy local ở một địa chỉ cố định, mở bằng Chrome/Edge. Gói bàn giao có launcher hoặc lệnh chạy được tài liệu hóa; máy không cần tài khoản dịch vụ để học với kho nội dung đã tải. Nguồn forecast mới được cập nhật bằng gói nội dung có nguồn và ngày cập nhật.

## 2. Các quy tắc dùng chung cần chốt trước khi code

### 2.1. Ngày học, điểm danh và thời gian

- Ngày học dùng múi giờ `Asia/Ho_Chi_Minh`, bắt đầu **06:00** và kết thúc trước 06:00 hôm sau, bất kể múi giờ cài trên máy.
- Ví dụ: 05:59 ngày 06/10 thuộc ngày học 05/10; 06:00 ngày 06/10 thuộc ngày học 06/10.
- Nếu app đang đóng lúc 06:00, lần mở tiếp theo tự chuyển sang ngày học hiện tại. App local không cần chạy nền để cập nhật trạng thái ngày.
- Nếu app đang mở, kiểm tra mốc ngày khi qua 06:00 và khi quay lại tab. Bài đang làm giữ đề, đáp án, bản nháp và phiên bản nội dung của nó.
- Điểm danh tối đa một lần/ngày học. Streak tính các ngày học liên tiếp đã điểm danh; ngày bỏ học không tự được điểm danh.
- Thời gian học là thời gian người dùng thực sự bật phiên học. Có Start/Pause/Finish; mở trang không tự tăng thời gian. Hai phiên chồng nhau không được cộng hai lần.
- Phiên chạy qua 06:00 chia số phút vào hai ngày học. Số bài nộp thuộc ngày học tại thời điểm nộp.
- `Days to exam` tính theo ngày lịch ở Việt Nam, không âm, tách với khái niệm ngày học bắt đầu lúc 06:00.

### 2.2. Kế hoạch 250 phút và task chưa hoàn thành

- Tổng ngân sách mỗi ngày: **250 phút** cho Listening, Reading, Writing, Speaking, Vocabulary.
- Khi chưa đủ dữ liệu phân tích: 50 phút/phần. Bài được chọn phải phù hợp khung thời gian; có thể gồm luyện tập và xem lại lỗi.
- Task chưa hoàn thành giữ ID, ngày tạo, nội dung và thời gian còn lại. Hoàn thành không bị reset về chưa làm.
- Task tồn được ưu tiên đưa vào 250 phút ngày sau; task mới chỉ được thêm vào phần ngân sách còn lại. Các task chưa xếp vừa vẫn nằm trong backlog, có thể xem lại.
- Không cộng 250 phút task mới vào toàn bộ task tồn. Không nhân bản task mỗi lần mở app hay mỗi lần qua ngày.
- Khi khối lượng của một bài liền mạch lớn hơn khung dự kiến, phân bổ lại trong tổng 250 phút; không cắt một full test đang làm để ép bằng thời lượng dự kiến.
- Trong MVP 7, số phút thay đổi theo khoảng cách tới aim, dữ liệu lỗi, độ ổn định và bài đến hạn. Đề xuất giữ tối thiểu 20 phút/phần, tối đa 90 phút/phần.

### 2.3. Điểm, band và phân tích điểm yếu

- Hồ sơ có band hiện tại, aim overall, aim từng kỹ năng, ngày thi và nguồn/ngày đánh giá.
- Khi chưa có dữ liệu kiểm chứng, cho phép nhập band tự đánh giá hoặc band giáo viên chấm. Thiếu band thì hiển thị chưa đủ dữ liệu, không thay bằng 0.
- Estimated overall hiển thị nguồn dữ liệu của bốn kỹ năng. Quy tắc overall theo cách hiển thị IELTS là trung bình bốn band và làm tròn tới 0.5; đây vẫn là ước tính của app. [IELTS scoring](https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail).
- Một passage/section lẻ chỉ có số câu đúng và accuracy. Không lấy tỷ lệ của bài lẻ rồi tự tuyên bố đó là band của cả kỹ năng.
- Full Listening/Reading có thể đưa ra band tham khảo theo bảng của bộ đề; bảng phải có nguồn và phiên bản. Chỉ cập nhật band hồ sơ khi người dùng xác nhận kết quả phù hợp.
- Writing/Speaking có điểm do người dùng nhập từ đánh giá thủ công/giáo viên. Chưa có chấm bài thật thì trạng thái là chưa chấm, không tự sinh điểm.
- Mỗi dạng bài hiển thị số câu đã làm, số đúng/sai và accuracy. Đề xuất chỉ gắn nhãn yếu/tốt sau tối thiểu 20 câu ở 3 bộ bài khác nhau trong 30 ngày học; trước đó ghi chưa đủ dữ liệu.
- Đề xuất phân loại: dưới 70% cần ưu tiên; 70–90% đang cải thiện; trên 90% tốt. Đây là quy tắc sản phẩm, không phải chuẩn chấm IELTS.
- Điều kiện giảm thời gian Listening: trên 90% ở ít nhất 5 lượt làm đầu tiên với nội dung khác nhau, trải trên ít nhất 3 ngày học trong 14 ngày gần nhất và tổng ít nhất 50 câu. Làm lại cùng đề không tạo thêm bằng chứng ổn định.
- Các bài luyện có gợi ý, dictation và thi mô phỏng có chế độ riêng; kết quả không trộn để suy ra độ sẵn sàng thi.

### 2.4. Nội dung mới và cập nhật theo ngày

- Mỗi ngày học có một gói đề xuất: bài Reading, Listening, Writing Task 1/2, topic Speaking và từ vựng. Gói đó ổn định trong ngày.
- 06:00 đổi gói đề xuất; không đổi đề đang làm hoặc đề của bài nộp cũ.
- Kho nội dung có thể nhập bằng gói dữ liệu gồm đề, đáp án, giải thích, audio/hình, từ vựng và thông tin nguồn. Khi import thất bại, dữ liệu cũ vẫn dùng được.
- Đổi nội dung được đề xuất mỗi ngày và cập nhật kho forecast là hai hoạt động có lịch riêng. Forecast/đề được thuật lại cần có nguồn, kỳ áp dụng, ngày nhập và nhãn phân biệt với đề luyện tự biên soạn.
- Luồng local mặc định: nhập gói forecast mới → kiểm tra dữ liệu → cập nhật kho → các ngày tiếp theo chọn từ kho mới. Nếu muốn tự tải từ Internet, cần chốt nguồn được phép truy cập và định dạng tích hợp trước khi báo giá phần đó.
- Nội dung dùng để nghiệm thu phải có đủ asset, đáp án và giải thích; không nghiệm thu bằng nhãn đề trống hoặc điểm giả.

### 2.5. Từ vựng và lịch ôn

- Thứ tự hiển thị: **từ tiếng Anh → IPA → loại từ → band tham khảo → nghĩa tiếng Việt → câu ví dụ**. Collocation có thể lưu cùng schema.
- Band của từ là nhãn biên tập phục vụ học tập, không phải điểm IELTS được chứng nhận cho một từ. Nhãn này cần người biên soạn rà soát; CEFR cũng không ánh xạ một-một sang IELTS. [IELTS và CEFR](https://ielts.org/organisations/ielts-for-organisations/compare-ielts/ielts-and-the-cefr).
- Trạng thái: cần học → cần ôn → đã học. Bấm đã học lần đầu chuyển từ sang cần ôn, không chuyển ngay sang đã học hoàn tất.
- Đề xuất hiểu chu kỳ là khoảng cách sau mỗi lần ôn thành công: **1 → 2 → 5 → 7 → 14 → 30 ngày**. “Một tháng” được quy ước là 30 ngày để tính nhất quán.
- Ví dụ học ngày 05/10/2026 và ôn đúng hạn, các lượt đến hạn là 06/10, 08/10, 13/10, 20/10, 03/11 và 03/12. Sau lượt cuối thành công mới vào đã học.
- Mỗi hạn bắt đầu lúc 06:00 của ngày học tương ứng. Ôn trễ vẫn giữ từ quá hạn; lần thành công kế tiếp tính từ ngày thực sự ôn.
- Quên từ: quay về khoảng 1 ngày, giữ lịch sử sai. Ôn xem trước chưa đến hạn không tự đẩy tiến độ; thao tác lặp không tạo hai lượt thành công.
- Khi nhiều từ quá hạn, ưu tiên ôn trước từ mới; những từ chưa ôn được vẫn giữ nguyên trong hàng đợi.

### 2.6. Lỗi và tuần kiểm tra lại

- Bảng đúng 5 cột: **lỗi lặp lại | ví dụ của mình | vì sao sai | cách sửa | tuần kiểm tra lại**.
- Skill, dạng bài, số lần lặp và bài gốc lưu trong dữ liệu, hiển thị bằng nhãn/bộ lọc mà không thêm cột chính.
- Lần đầu ghi lỗi: hẹn sau 7 ngày học. Gặp lại trước ngày hẹn tăng số lần và lưu ví dụ mới, không đẩy hạn kiểm tra xa hơn.
- Ngày đến hạn: người học làm lại câu tương đương, sửa câu Writing hoặc nộp đoạn Speaking phù hợp. Đạt thì đóng lượt kiểm tra; chưa đạt thì hẹn thêm 7 ngày.
- Với câu trắc nghiệm, app có thể nêu căn cứ đáp án từ lời giải; kết luận về lý do cá nhân mắc lỗi được người học xác nhận hoặc chỉnh lại.

## 3. Trình tự các phiên bản

Mỗi phiên bản kế thừa phiên bản trước và hoàn thành một hành trình người học có thể tự dùng. Công việc tách code, lưu trữ hay tạo schema thuộc bên trong phiên bản, không gọi riêng là MVP.

| Phiên bản | Hành trình sử dụng sau bàn giao | Ngày công dev dự kiến |
|---|---|---:|
| MVP 1 | Thiết lập hồ sơ → điểm danh → học theo kế hoạch → ghi/nộp hoạt động → xem dashboard hôm nay/hôm sau | 6–8 |
| MVP 2 | Làm Reading passage/full → xem chấm đáp án và dạng yếu → lưu từ của bài → xem lại bài nộp | 8–12 |
| MVP 3 | Làm Listening section/full/dictation → xem chấm đáp án và dạng yếu → xem lại bài nộp | 10–14 |
| MVP 4 | Chọn Writing Task 1/2 → đọc hướng dẫn → viết/lưu nháp/nộp → tự đánh giá và ghi lỗi | 7–10 |
| MVP 5 | Chọn topic Speaking → học câu trả lời/cụm từ → luyện ba part → ghi âm/nộp/nghe lại | 6–9 |
| MVP 6 | Học vocab trong ngày → ôn đủ chu kỳ → áp dụng theo ngữ cảnh → chuyển sang đã học | 5–8 |
| MVP 7 | Nhận kế hoạch theo dữ liệu thật → học đủ năm phần → ôn lỗi tuần → ngày sau cập nhật chính xác | 6–9 |

Ước lượng: **48–70 ngày công**, thêm 2–3 ngày đầu chốt dữ liệu và một lát cắt tích hợp thật, rồi dự phòng khoảng 20%: **12–18 tuần** với một dev làm toàn thời gian. Kho nội dung phải có sẵn hoặc được biên soạn/rà soát song song; thời gian viết đề, thu âm và rà soát chuyên môn không nằm trong 48–70 ngày dev. Đây là ước lượng kế hoạch, không phải cam kết ngày giao.

### MVP 1 — Quản lý một ngày học thật

**Phạm vi**

- Hồ sơ: band hiện tại từng kỹ năng, aim overall, aim từng kỹ năng, ngày thi.
- Dashboard theo thứ tự: estimated overall và aims + days to exam + streak → lịch điểm danh và thống kê ngày → four-skill profile → lịch sử nộp bài.
- Bỏ Exam readiness. Four-skill profile có band, aim và mảng cần cải thiện; giai đoạn này cho nhập điểm yếu thủ công và ghi rõ nguồn.
- Bảng ngày có 6 cột: ngày/tháng/năm, Reading, Listening, Writing, Speaking, tổng thời gian học. Cột Writing hiển thị riêng Task 1/Task 2. Tổng phút bao gồm Vocabulary.
- Today's plan có mặc định 50 phút mỗi phần; timer, hoàn thành task, backlog và reset 06:00.
- Cho ghi hoạt động đã học ngoài app/nộp bài thủ công bằng ghi chú hoặc bài viết. Bài thực hành tích hợp trong app được bổ sung từ MVP 2 trở đi.
- Lịch sử lọc theo skill, ngày và riêng Writing Task 1/Task 2; mở được nội dung của lần nộp thủ công.
- Error Log nhập tay theo 5 cột, số lần lặp và hạn +7 ngày.
- Lưu local, xuất/nhập bản sao lưu, giữ dữ liệu sau đóng app. Có luồng kiểm tra và nhập dữ liệu legacy nếu người dùng từng dùng bản cũ.

**Công việc build theo thứ tự**

1. Ghi nhận hành vi hiện tại của điều hướng, Roadmap và lưu trạng thái; tách phần lưu dữ liệu/ngày học/hiển thị ở mức cần thiết.
2. Tạo dữ liệu hồ sơ, attendance, daily plan, task, submission, study session và error; thống kê lấy từ các bản ghi này.
3. Làm luồng hồ sơ → điểm danh → timer → hoàn thành/nộp thủ công → dashboard.
4. Thêm chuyển ngày, backlog, backup/restore và kiểm chứng ranh giới ngày.

**Tiêu chí bàn giao**

- **M1-01:** Lưu aim overall 7.5 và bốn aim khác nhau; đóng/mở lại app vẫn giữ, Dashboard hiển thị đúng.
- **M1-02:** Dashboard có đúng các khối đã yêu cầu và không còn Exam readiness; Roadmap giữ giao diện và chức năng cũ.
- **M1-03:** Ghi một Reading, một Listening, một Writing Task 1, hai Task 2 và một Speaking: thống kê/lịch sử đúng số lượng, không cộng lặp. Vocabulary có thời gian nhưng không làm tăng số bài của bốn kỹ năng.
- **M1-04:** Điểm danh lặp cùng ngày không tăng streak; thử các ngày liên tiếp và bỏ một ngày cho kết quả đúng quy tắc.
- **M1-05:** Kế hoạch mới có tổng 250 phút. Chuyển 05:59 → 06:00 tạo ngày mới đúng một lần; task tồn không mất hoặc bị nhân bản; task đã xong giữ trạng thái.
- **M1-06:** Đóng app qua vài ngày rồi mở lại: không tự ghi thêm phiên học/điểm danh, backlog còn đủ.
- **M1-07:** Xuất dữ liệu → khôi phục vào hồ sơ trình duyệt trống: hồ sơ, task, bài nộp, phút học và lỗi khớp. Dữ liệu sai định dạng bị từ chối trước khi ghi.

**Bàn giao sử dụng:** gói app local, hướng dẫn chạy/sao lưu, hồ sơ trống và một bản dữ liệu demo tách biệt để diễn tập nghiệm thu. Bản này đã dùng được để quản lý học hàng ngày.

### MVP 2 — Reading thật và lọc từ sau bài

**Phạm vi**

- Hai lựa chọn: passage lẻ từ một full test; full Academic Reading gồm ba passage, 40 câu, 60 phút. Bài lẻ có thời lượng luyện cấu hình riêng. [IELTS Academic Reading](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading).
- Giao diện mô phỏng thi trên máy: passage và câu hỏi cạnh nhau, cuộn riêng, timer, số câu, đánh dấu xem lại, lưu đáp án và nộp bài.
- Hỗ trợ các nhóm câu hỏi: multiple choice; True/False/Not Given; Yes/No/Not Given; matching information; headings; features; sentence endings; sentence completion; summary/note/table/flow-chart completion; diagram labels; short answers.
- Chấm theo đáp án và biến thể được bộ đề khai báo; áp dụng giới hạn từ. Kết quả có đáp án người học, đáp án đúng và đoạn dẫn chứng.
- Phân tích theo question type và gợi ý luyện tiếp dạng yếu, phân biệt dữ liệu ít với điểm yếu đã có bằng chứng.
- Sau nộp, gợi ý từ/collocation trong passage bằng từ vựng đã biên tập kèm đề; người dùng có thể chọn thêm từ trong bài. Lưu vào danh sách cần học, chưa chạy chu kỳ ôn đầy đủ trước MVP 6.
- Các thông tin IPA, loại từ, band tham khảo, nghĩa Việt, ví dụ do gói nội dung/từ điển local cung cấp; từ chưa có thông tin được đánh dấu cần bổ sung.

**Kho nội dung đề xuất để nghiệm thu:** 2 full tests / 6 passage, tổng 80 câu; tối thiểu 2 câu có đáp án và giải thích ở mỗi nhóm câu hỏi được hỗ trợ. Các passage được dùng nguyên vẹn ở chế độ lẻ.

**Tiêu chí bàn giao**

- **M2-01:** Làm một passage và một full test từ đầu đến nộp; đối chiếu bộ đáp án chuẩn cho số đúng/sai chính xác.
- **M2-02:** Hết giờ tự chốt bài; refresh không cấp lại toàn bộ thời gian và không mất đáp án đã lưu.
- **M2-03:** Lời giải nêu được vị trí dẫn chứng. Các bài kiểm tra chấm điểm bao gồm giới hạn từ, biến thể đáp án hợp lệ và đáp án gần đúng nhưng sai.
- **M2-04:** Kết quả được ghi đúng một lần vào history, thống kê ngày và phân tích dạng bài; full test không bị tính thành full + ba passage nộp riêng.
- **M2-05:** Sau nộp bài, danh sách từ xuất hiện đúng thứ tự sáu trường; thêm một từ hai lần không tạo hai mục học cùng nghĩa/loại từ.
- **M2-06:** Chưa làm đủ dữ liệu thì không khẳng định một dạng là mạnh/yếu; làm lại cùng đề được đánh dấu và không thổi phồng dữ liệu chẩn đoán.
- **M2-07:** Người dùng tự nhập một gói Reading hợp lệ vào kho và mở được bài mới; gói hỏng không làm mất kho cũ.

**Phụ thuộc:** kho passage, câu hỏi, đáp án, lời giải và từ vựng được rà soát. Chỉ có passage mà không có đáp án/giải thích chưa đủ để nghiệm thu.

### MVP 3 — Listening section, full test và dictation

**Phạm vi**

- Đổi cách gọi “câu lẻ” thành **section lẻ** để khớp nhu cầu: một section nguyên vẹn lấy từ full test.
- Full Listening gồm bốn section, mỗi section 10 câu; chế độ thi nghe một lần, chế độ luyện có điều khiển học tập riêng. [IELTS Listening](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening).
- Hỗ trợ multiple choice, matching, plan/map/diagram labelling, completion (form/note/table/flow chart/summary), sentence completion và short answers.
- Question type và loại lỗi được tách riêng: spelling, số, số ít/số nhiều, distractor, bỏ lỡ thông tin.
- UI mô phỏng thi: audio, timer/tiến trình, điều hướng câu, đánh dấu và nộp; kết quả có transcript và vị trí audio làm căn cứ đáp án.
- Dictation: nghe đoạn ngắn → gõ → kiểm tra từ thiếu/sai/thừa → sửa → nghe/đọc lại. Có lặp đoạn và tốc độ ở chế độ luyện; không dùng điểm dictation làm band Listening. Luồng tham khảo [DailyDictation](https://dailydictation.com/).
- Nộp bài cập nhật history, thời gian và phân tích dạng yếu/tốt bằng kết quả thật.

**Kho nội dung đề xuất để nghiệm thu:** 2 full tests / 8 section / 80 câu; đủ các nhóm dạng bài; 12 đoạn dictation có transcript và mốc cắt audio. Audio có thể phát hoàn toàn từ gói local.

**Tiêu chí bàn giao**

- **M3-01:** Hoàn thành section lẻ và full test với audio thật; chấm đáp án khớp bộ kết quả đã kiểm tra.
- **M3-02:** Chế độ thi không cho replay đoạn đã qua; chế độ luyện có replay. Transcript/đáp án không bị lộ trong bài thi chưa nộp.
- **M3-03:** Dictation chỉ ra đúng từ thiếu, thừa, sai; sau sửa đúng chuyển được sang đoạn kế tiếp, lưu tiến độ sau đóng app.
- **M3-04:** Thiếu/hỏng audio được phát hiện trước khi bắt đầu; reload vẫn giữ bài và tiến trình đã lưu, không tạo lần nộp mới ngoài ý muốn.
- **M3-05:** Phân tích riêng matching/map/completion… với số câu thật; lịch sử phân biệt section, full và dictation.
- **M3-06:** Nộp lại cùng thao tác không tăng số bài/phút học; bản sao lưu khôi phục được kết quả và tiến độ.

**Phụ thuộc:** file audio được phép sử dụng, transcript, đáp án và annotation. Định dạng câu hỏi map/diagram cần có hình thật để kiểm chứng renderer.

### MVP 4 — Writing Task 1/Task 2 có hướng dẫn và bài nộp

**Phạm vi**

- Hai khu vực và hai bộ lọc history: Task 1, Task 2.
- Task 1 gồm line chart, bar chart, pie chart, table, mixed charts, maps và process; mỗi dạng có outline, khung diễn đạt và giải thích cách chọn overview/chi tiết.
- Task 2 gồm opinion, discussion, advantages/disadvantages, problem/solution và two-part questions; có outline, cách phát triển ý và collocation liên quan.
- Chọn đề theo ngày học; có thể mở kho và lọc theo dạng/topic. Gói đề hôm nay đổi lúc 06:00, bài đang viết giữ nguyên đề.
- Màn viết có đề/hình, hướng dẫn, word count, timer, tự lưu nháp, nộp và mở lại bài cũ. Lần sửa/nộp lại liên kết với bản gốc.
- Tự kiểm tra bằng rubric bốn tiêu chí, nhập đánh giá/band có nguồn; đưa lỗi thực tế sang Error Log. Hướng dẫn được ghi là hướng dẫn, không giả làm đánh giá riêng cho bài viết.
- Mốc luyện: Task 1 tối thiểu 150 từ, khoảng 20 phút; Task 2 tối thiểu 250 từ, khoảng 40 phút. Khi có điểm cả hai task phù hợp, band Writing tham khảo áp dụng trọng số Task 2 gấp đôi Task 1. [IELTS Writing](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing).

**Kho nội dung đề xuất để nghiệm thu:** 28 đề Task 1 (4 đề mỗi nhóm), 30 đề Task 2 (6 đề mỗi nhóm). Mỗi đề có hướng dẫn; Task 1 có hình/dữ liệu đúng với nội dung đề.

**Tiêu chí bàn giao**

- **M4-01:** Với mỗi dạng Task 1, mở được đề, hình, outline, khung câu và giải thích; người dùng viết, lưu và nộp được.
- **M4-02:** Task 2 có đủ năm nhóm yêu cầu; nộp và sửa lại không ghi đè mất bản cũ.
- **M4-03:** Đóng/mở hoặc refresh giữ đề và nháp; qua 06:00 không thay prompt trong bài đang viết.
- **M4-04:** Dashboard và history tách đúng Task 1/Task 2, có ngày nộp, thời gian, nội dung và trạng thái chưa chấm/đã đánh giá.
- **M4-05:** Ghi một lỗi từ bài → hiện đúng năm cột → hẹn kiểm tra sau 7 ngày. Điểm/band chỉ thay đổi khi có đánh giá được lưu.
- **M4-06:** Một lịch nội dung thử nghiệm 14 ngày đổi đề đúng ngày, không sinh ngẫu nhiên lại mỗi lần tải trang.

**Phụ thuộc:** bộ đề Writing và hướng dẫn đã rà soát. Chấm AI theo bài là phạm vi bổ sung cần quyết định riêng về dịch vụ, độ tin cậy và chi phí; không cần cho luồng local này.

### MVP 5 — Speaking ba part, học theo topic và ghi âm local

**Phạm vi**

- Kho topic có Part 1, cue card Part 2 và câu hỏi đào sâu Part 3.
- Hướng dẫn cấu trúc trả lời, ví dụ trả lời phù hợp, collocation/cụm diễn đạt tự nhiên.
- Cụm từ trong câu trả lời được in đỏ và có nghĩa Việt trong ngoặc ngay cạnh; có danh sách cụm từ riêng để xem và đưa vào hàng đợi học.
- Luyện Part 2 với 1 phút chuẩn bị và 2 phút nói; Part 1/3 có ghi âm câu trả lời theo câu hoặc lượt luyện.
- Ghi âm bằng micro local, nghe lại, tự đánh giá theo tiêu chí và nộp audio; có thể nhập bản ghi âm đã có khi micro không dùng được.
- Topic theo ngày học; nhập gói forecast/đề được thuật lại, lọc theo kỳ, nguồn và ngày cập nhật. Bộ luyện tự biên soạn có nhãn riêng.

**Kho nội dung đề xuất để nghiệm thu:** 20 bộ topic đủ ba part, mỗi bộ tối thiểu 4 câu Part 1, một cue card Part 2 và 3 câu Part 3; có hướng dẫn và cụm từ. Một gói forecast có nguồn được chọn là đầu vào kiểm tra luồng import thực tế.

**Tiêu chí bàn giao**

- **M5-01:** Chọn một topic → học hướng dẫn/cụm từ → luyện đủ ba part → nộp và nghe lại audio từ history.
- **M5-02:** Cụm được đánh dấu có nghĩa Việt cạnh bên và trong danh sách riêng; không đánh dấu đỏ cả đoạn hoặc bỏ nghĩa.
- **M5-03:** Timer Part 2 chạy đủ chuẩn bị/nói; ghi âm không mất khi chuyển trang; từ chối quyền micro có thông báo và đường nhập audio thay thế.
- **M5-04:** File audio vẫn nghe được sau đóng app; backup/restore bao gồm audio, không chỉ metadata.
- **M5-05:** Nhập gói forecast mới làm xuất hiện topic có nguồn/kỳ/ngày cập nhật mới, không thay câu hỏi của bài nộp cũ.
- **M5-06:** Speaking có band/điểm yếu do đánh giá có nguồn; độ dài câu trả lời không tự được coi là band cao.

**Phụ thuộc:** nguồn forecast/đề thuật lại được khách hàng chọn và gói dữ liệu cụ thể. Trước khi có đầu vào này, chỉ có thể nghiệm thu luyện topic và chức năng import; chưa thể kết luận kho forecast đã cập nhật đúng nguồn khách muốn.

### MVP 6 — Vocabulary hằng ngày và chu kỳ ôn hoàn chỉnh

**Phạm vi**

- Ba mục: từ hôm nay/cần học, cần ôn, đã học; mỗi mục giữ thứ tự sáu trường.
- Đề xuất 8 từ mới/ngày khi chưa có backlog ôn quá lớn; hàng đợi nhận từ Reading, Speaking hoặc nhập tay.
- Thẻ học: xem/nghe nếu có audio → tự kiểm tra nghĩa/ngữ cảnh → đánh dấu đã học → tạo hạn ôn.
- Chạy đủ chu kỳ 1, 2, 5, 7, 14, 30 ngày; xử lý nhớ/quên, ôn trễ, từ trùng và lịch sử từng lần.
- Từ có liên kết tới passage/câu trả lời/bài viết chứa nó. Bộ từ mới trong ngày ổn định đến 06:00 hôm sau; không làm lại hàng đợi ôn từ đầu mỗi ngày.
- Thời gian học Vocabulary được tính vào tổng phút Dashboard.

**Kho nội dung đề xuất để nghiệm thu:** tối thiểu 200 từ/cụm có đủ sáu trường, gồm 112 từ cho 14 bộ học ngày. Những bộ này được liên kết sang bài Reading và Writing trong MVP 7.

**Tiêu chí bàn giao**

- **M6-01:** Học từ hôm nay xong → từ vào cần ôn và có hạn +1 ngày; không vào đã học hoàn tất ngay.
- **M6-02:** Kiểm chứng chuỗi ngày 06/10 → 08/10 → 13/10 → 20/10 → 03/11 → 03/12 cho từ học ngày 05/10/2026, bằng clock kiểm thử có kiểm soát.
- **M6-03:** Ôn thành công lượt cuối mới chuyển đã học; quên ở một lượt quay về +1 ngày và giữ lịch sử.
- **M6-04:** Đóng app qua hạn rồi mở: từ quá hạn còn trong cần ôn. Bấm kết quả hai lần không bỏ qua một mốc.
- **M6-05:** Nhập cùng từ cùng nghĩa/loại từ từ hai nguồn không nhân bản lịch ôn; thông tin nguồn vẫn được giữ.
- **M6-06:** Qua 06:00 đổi từ mới nhưng không mất lịch ôn, không tự coi các từ chưa làm là đã học. Backup/restore giữ đúng hạn và trạng thái.

### MVP 7 — Kế hoạch thích ứng và vòng học tích hợp

**Phạm vi**

- Thay phân bổ mặc định bằng dữ liệu thật: band gap, dạng yếu, độ ổn định và bài/từ/lỗi đến hạn.
- Gợi ý cụ thể: Listening matching còn yếu → section có matching; Reading matching headings yếu → passage phù hợp; Writing thiếu overview → Task 1 kèm hướng dẫn overview.
- Mỗi phân bổ có lý do ngắn gọn và đủ năm phần, tổng đúng 250 phút. Thay đổi áp dụng vào ngày học kế tiếp; bài đang làm giữ ổn định.
- Ví dụ khi Listening đủ điều kiện ổn định, Writing yếu: Listening 30, Reading 50, Writing 80, Speaking 60, Vocabulary 30 = 250 phút. Đây là một ca nghiệm thu, không phải lịch cố định cho mọi hồ sơ.
- Task tồn và các lượt ôn đến hạn được ưu tiên trong ngân sách. Nếu không xếp hết, hiện rõ phần backlog còn lại và vẫn giữ dữ liệu.
- Error Log tạo lượt kiểm tra sau một tuần; trả lời/sửa/nộp lại để xác nhận còn sai hay đã cải thiện. Các lỗi từ Listening/Reading có căn cứ đáp án; Writing/Speaking có mục người học xác nhận.
- Dashboard four-skill profile nêu band, aim, mảng yếu, dữ liệu hỗ trợ và bài gợi ý; history chứa bài nộp thật của cả bốn kỹ năng, Writing tách hai task.
- Nội dung liên kết theo ngày: từ mới thực sự có trong passage Reading được đề xuất; Writing cùng chủ đề cung cấp collocation/ý gợi mở để dùng tự nhiên. Không bắt nhét toàn bộ từ vào bài viết.
- Đóng gói 14 ngày học và mở rộng kho nội dung theo số lượng đã chốt; xử lý dữ liệu cũ, lỗi import và lưu trữ audio khi sắp hết dung lượng.

**Kho nội dung khởi động đề xuất cho bản hoàn chỉnh:**

| Mảng | Mức tối thiểu đề xuất |
|---|---|
| Reading | 6 full tests / 18 passage, bao phủ các nhóm dạng bài |
| Listening | 6 full tests / 24 section, 30 đoạn dictation |
| Writing | 28 Task 1 + 30 Task 2 có hướng dẫn |
| Speaking | 20 bộ topic đủ ba part, một gói forecast có nguồn |
| Vocabulary | 200 từ/cụm đã rà soát; 14 bộ học ngày |
| Gói học theo ngày | 14 gói liên kết Reading, Writing, Speaking, Listening và vocab |

Số lượng này biến yêu cầu “kho đề nhiều, đa dạng” thành phạm vi đo được. Khi kho không còn đề mới phù hợp, app ghi rõ bài đề xuất là ôn lại và cho nhập gói mới.

**Tiêu chí bàn giao**

- **M7-01:** Hồ sơ chưa có bằng chứng đủ mạnh nhận mặc định 50 × 5. Hồ sơ có Listening ổn định >90% và Writing yếu nhận ít thời gian Listening hơn, nhiều thời gian Writing hơn; tổng vẫn 250 và có lý do.
- **M7-02:** Một lượt Listening cao đơn lẻ hoặc nhiều lượt làm lại cùng đề không kích hoạt giảm thời gian. Khi dữ liệu gần đây xấu đi, phân bổ ngày tiếp theo phục hồi mức ưu tiên phù hợp.
- **M7-03:** Task cũ + task mới + lịch ôn không tạo kế hoạch vượt 250; task chưa được xếp vẫn xem được và không mất sau nhiều ngày.
- **M7-04:** Một lỗi ghi ngày 05/10 được kiểm tra lại ngày học 12/10; ghi thêm ví dụ ngày 08/10 không đẩy hạn sang 15/10. Chưa đạt ở lượt kiểm tra thì có hạn mới +7 ngày.
- **M7-05:** Với 14 gói ngày, mỗi từ mới có vị trí dẫn chứng trong passage; phần Writing có gợi ý dùng tối thiểu 3 từ/cụm cùng chủ đề. Người học viết rồi lưu bài sử dụng các cụm đó được.
- **M7-06:** Diễn tập đủ hành trình: điểm danh → xem kế hoạch → làm Reading/Listening → viết Task 1/2 → ghi âm Speaking → học/ôn vocab → kiểm tra lỗi tuần → xem thống kê → qua 06:00 nhận ngày mới.
- **M7-07:** Dashboard, history, profile, error review và vocab đọc cùng kết quả nộp bài; không có các số tổng độc lập bị lệch khi sửa/khôi phục dữ liệu.
- **M7-08:** Đóng/mở, refresh, qua 06:00, đổi tháng/năm, đổi múi giờ máy, nhập backup và gặp lỗi lưu audio không làm mất hoặc ghi trùng bài. Khi không lưu được, app báo rõ và giữ nội dung để người dùng xuất cứu dữ liệu.
- **M7-09:** Chạy trên máy người dùng theo tài liệu bàn giao và thực hiện luồng chính không cần dev chỉnh code hoặc dữ liệu thủ công.

## 4. Thiết kế theo pattern-design

Giữ HTML/CSS đang có, tách JavaScript thành module theo trách nhiệm. Có thể tiếp tục dùng giao diện hiện tại; lựa chọn framework không phải một MVP hay điều kiện tạo giá trị học.

| Module | Trách nhiệm chính | Ranh giới cần giữ |
|---|---|---|
| StudyClock | Ngày học, mốc 06:00, hạn ôn | Toàn bộ module khác dùng cùng clock; UI không tự tính ngày riêng |
| Profile | Band, aims, exam date, nguồn đánh giá | Không tự tăng band từ timer hoặc thao tác nộp |
| ContentLibrary | Đề, asset, lời giải, nguồn, phiên bản, gói ngày | Một bài nộp giữ đúng phiên bản đề đã làm |
| PracticeSession | Đáp án, nháp, audio, timer, trạng thái bài | Một lần nộp có ID duy nhất; gửi lặp không tạo thêm kết quả |
| Assessment | Chấm khách quan, rubric và đánh giá có nguồn | Listening/Reading khác Writing/Speaking; không gom vào hàm điểm giả chung |
| DailyPlanner | Ngân sách 250, phân bổ, task tồn, đề gợi ý | Không ghi trực tiếp HTML hoặc tự sửa đáp án/band |
| VocabularyReview | Sáu trường từ, trạng thái, lịch ôn | Một lịch ôn cho một mục từ/nghĩa; giữ đủ lịch sử |
| ErrorReview | Nhóm lỗi, ví dụ, cách sửa, hạn tuần | Phân biệt căn cứ đáp án và giải thích cá nhân |
| Reports | Dashboard, streak, thống kê, history | Tính từ bản ghi học/nộp thực tế; tránh lưu nhiều số tổng cạnh tranh |
| LocalData | IndexedDB, migration, backup/restore | Thao tác lưu liên quan dùng transaction; UI nhận kết quả thành công/thất bại rõ ràng |

IndexedDB phù hợp cho dữ liệu cấu trúc, nháp và audio; kho bài/asset có thể nằm trong gói app local. Dùng một địa chỉ local cố định để dữ liệu không bị chia sang origin khác mỗi lần chạy. Bản sao lưu chứa dữ liệu người dùng, manifest phiên bản nội dung và các audio tự ghi/đính kèm; asset đề có thể đóng gói hoặc tham chiếu tới đúng gói nội dung đã cung cấp.

Luồng nộp bài: session → assessment → lưu submission/kết quả trong transaction → đánh dấu task → Reports/Review đọc kết quả đã lưu. Nếu lưu thất bại, không báo nộp thành công và không tăng thống kê.

Các quy tắc tính ngày, chấm đáp án, ngân sách và lịch ôn là logic độc lập, có đầu vào/đầu ra rõ ràng để kiểm thử. UI phụ trách hiển thị và nhận thao tác. Chọn cấu trúc đơn giản đủ giải quyết các trách nhiệm này; thêm abstraction khi đã có điểm thay đổi cụ thể.

### Quy tắc thay đổi code bắt buộc

Theo skill pattern-design, mỗi lần cần tách cấu trúc để làm tính năng:

1. **Diff A — refactor tối thiểu:** giữ hành vi hiện có, kiểm chứng các unit test hiện có và luồng hồi quy liên quan. Bản hiện tại chưa có test, nên thiết lập kiểm tra có ý nghĩa cho điều hướng, Roadmap và dữ liệu cần giữ; không tuyên bố đã kiểm chứng khi chưa chạy.
2. **Diff B — tính năng mới:** chỉ bắt đầu sau khi diff A đã được kiểm chứng. Bổ sung các kiểm tra nghiệm thu của MVP tương ứng.
3. Giữ hai diff/commit riêng để review được; không squash cấu trúc và thay đổi hành vi thành cùng một diff. Giai đoạn refactor là công việc kỹ thuật trong MVP.

## 5. Công việc chuẩn bị trước MVP 1

Thực hiện trong khoảng 2–3 ngày, không coi là một MVP riêng:

1. Chốt các quy tắc đề xuất: chu kỳ vocab tính từ lần ôn trước, định nghĩa streak, xử lý task tồn trong 250 phút, ngưỡng dữ liệu và nguồn band.
2. Chọn một passage có đáp án/vocab, một section có audio/transcript, một Task 1 có hình và một topic Speaking có hướng dẫn. Kiểm tra lát cắt import → mở bài/asset → lưu hoạt động → khôi phục.
3. Chốt người chuẩn bị/rà soát kho nội dung và nguồn forecast. Ghi số lượng nội dung theo từng lần giao.
4. Ghi nhận trạng thái prototype và quy trình chạy local/backup sẽ bàn giao. Chốt địa chỉ local cố định.

Nếu thiếu audio, đáp án, nội dung Writing hoặc nguồn forecast, hoàn thành phần đã có đầu vào và báo chính xác luồng chưa nghiệm thu được; không dùng dữ liệu sinh ngẫu nhiên thay thế việc nghiệm thu.

## 6. Gói bàn giao và cách nghiệm thu mỗi MVP

Mỗi lần giao gồm:

- Bản app chạy local, source và tag phiên bản rõ ràng khi bước build được thực hiện.
- Hướng dẫn mở app, yêu cầu môi trường, thao tác chính, sao lưu và khôi phục.
- Gói nội dung tối thiểu của MVP kèm nguồn/phiên bản và dữ liệu demo tách với dữ liệu thật.
- Checklist các mã Mx-xx, kết quả thực sự đã kiểm chứng và hạn chế còn lại. Tính năng chưa kiểm chứng giữ trạng thái đó.
- Một buổi hoặc kịch bản nghiệm thu từ hồ sơ trống, sau đó thử dùng dữ liệu đã lưu để xác nhận nâng cấp không mất dữ liệu.

Một MVP được chấp nhận khi người dùng tự hoàn thành hành trình đã nêu, dữ liệu tồn tại sau mở lại, các tiêu chí của MVP đạt và tính năng đã bàn giao trước đó vẫn hoạt động. Số commit hoặc số màn hình không thay thế được bằng chứng sử dụng.

Nhóm kiểm tra ưu tiên: chấm đáp án, reset 06:00, budget/backlog, nộp bài lặp, lịch vocab, hạn lỗi tuần, migration/backup và audio. Mỗi MVP có ít nhất một luồng end-to-end của phần mới; mở rộng regression khi thay đổi phần lõi dùng chung.

## 7. Ma trận bao phủ yêu cầu

| Yêu cầu khách hàng | Có luồng dùng được lần đầu | Hoàn thiện tích hợp |
|---|---|---|
| Estimated overall, aim overall/4 skills, days to exam, streak; bỏ readiness | MVP 1 | MVP 7 dùng bằng chứng thực tế |
| Lịch điểm danh, bảng số bài ngày và tổng phút | MVP 1 | MVP 2–7 tự lấy dữ liệu bài làm |
| Four-skill profile, mảng yếu, band từng kỹ năng | MVP 1 nhập tay | MVP 2/3 phân tích khách quan; MVP 4/5 đánh giá; MVP 7 gợi ý |
| History bốn kỹ năng, Writing tách Task 1/2 | MVP 1 nộp thủ công | MVP 2–5 bài nộp thật |
| Roadmap giữ nguyên | MVP 1 và mọi phiên bản | Regression xuyên suốt |
| Plan 250 phút, đổi ngày 06:00, task tồn | MVP 1 | MVP 7 thích ứng theo dữ liệu |
| Listening section/full/dictation, dạng yếu/tốt | MVP 3 | MVP 7 mở rộng kho/gợi ý |
| Reading passage/full, dạng yếu/tốt, lọc từ | MVP 2 | MVP 6 lịch ôn; MVP 7 liên kết ngày |
| Writing T1/T2, đa dạng dạng, outline/template/hướng đi, đề ngày | MVP 4 | MVP 7 liên kết từ/ngày |
| Speaking topic ba part, cụm đỏ + nghĩa, forecast | MVP 5 | MVP 7 lịch ngày/phân bổ |
| Vocab sáu trường, từ hôm nay, chu kỳ 1/2/5/7/14/30 | MVP 6 | MVP 7 Reading/Writing dùng cùng bộ từ |
| Error Log năm cột, kiểm tra sau một tuần | MVP 1 nhập tay | MVP 4/5 lỗi theo bài; MVP 7 lượt kiểm tra tích hợp |

## 8. Phạm vi để báo giá bổ sung nếu phát sinh

Đăng nhập/đa người dùng, đồng bộ cloud, tự thu thập forecast từ nhiều website, chấm AI Writing/Speaking, hội thoại giọng nói AI và đóng gói thành desktop installer là các hạng mục riêng nếu khách hàng muốn thêm. Bản local trong roadmap này có thể hoàn thành vòng học đã yêu cầu với nội dung được nhập và đánh giá có nguồn.

Ưu tiên bắt đầu MVP 1, đồng thời chuẩn bị kho nội dung cho MVP 2/3. Việc xác thực đầu vào sớm giúp các MVP tiếp theo được bàn giao bằng bài học thật.
