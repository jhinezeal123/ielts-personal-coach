/* Feedback channel (SPEC §12). Fill in your own Telegram bot token + chat id.
 *
 * Cách thiết lập (người bảo trì, làm một lần):
 *   1. Mở Telegram, nhắn @BotFather → /newbot → đặt tên → nhận token dạng "123456789:AA...".
 *   2. Nhắn một tin bất kỳ cho bot vừa tạo (bấm Start) từ tài khoản sẽ nhận góp ý.
 *   3. Mở https://api.telegram.org/bot<TOKEN>/getUpdates trong trình duyệt → lấy số ở
 *      "message" → "chat" → "id" (message.chat.id). Đó là telegramChatId.
 *   4. Điền hai giá trị bên dưới, commit và push lên main để mọi máy đều nhận được
 *      (nếu chỉ sửa trên máy mà không commit, tự động cập nhật sẽ bỏ qua vì thư mục app "có thay đổi").
 *
 * CẢNH BÁO: repo công khai, nên token này AI CŨNG ĐỌC ĐƯỢC. Chỉ dùng một bot riêng cho việc
 * nhận góp ý (không dùng chung với việc khác). Nếu bị lạm dụng (spam), vào @BotFather →
 * /revoke để thu hồi token, rồi điền token mới vào đây.
 *
 * Để trống = chưa cấu hình: trang Góp ý sẽ báo và khoá nút gửi.
 */
window.IELTS_FEEDBACK = { telegramBotToken: "8759277580:AAGi_Rwq5nsGQDhIHLdhTV2bZHsI-Ks4LH0", telegramChatId: "6825456625" };
