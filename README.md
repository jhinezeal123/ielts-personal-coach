# IELTS Coach

Sổ tay luyện thi IELTS Academic cho một người học: kế hoạch học mỗi ngày, Listening, Reading, Writing, Speaking, từ vựng ôn theo lịch, sổ lỗi và lịch học. App chạy hoàn toàn trong trình duyệt (Chrome/Edge), mở thẳng file `app/index.html`, không cần server, không cần tài khoản.

- Hướng dẫn sử dụng: [app/HUONG-DAN.md](app/HUONG-DAN.md)
- Nội dung và nguồn bài: [app/NOI-DUNG.md](app/NOI-DUNG.md)

## Cài trên máy mới

**Cách 1 — một dòng lệnh (khuyên dùng).** Mở **PowerShell** (bấm Start, gõ `PowerShell`, Enter) rồi dán:

```powershell
irm https://raw.githubusercontent.com/jhinezeal123/ielts-personal-coach/main/scripts/setup.ps1 | iex
```

Script sẽ:

1. Cài Git for Windows bằng `winget` nếu máy chưa có (có thể hiện hộp thoại xin quyền, bấm **Yes**).
2. Tải app vào `Documents\IELTS Coach` (nếu đã cài rồi thì chỉ cập nhật).
3. Bật tự động cập nhật và chạy lần đầu (tải luôn các gói bài học mới).
4. Tạo lối tắt **IELTS Coach** trên Desktop và Start Menu.

Chạy lại bao nhiêu lần cũng an toàn. Muốn cài vào thư mục khác:

```powershell
& ([scriptblock]::Create((irm https://raw.githubusercontent.com/jhinezeal123/ielts-personal-coach/main/scripts/setup.ps1))) -InstallDir "D:\IELTS Coach"
```

**Cách 2 — tải ZIP.** Trên GitHub bấm **Code → Download ZIP**, giải nén, rồi bấm đúp `scripts\cai-dat-may-moi.cmd`. Script làm đúng các bước như Cách 1 (bản ZIP chỉ dùng để chạy cài đặt; app thật được cài vào `Documents\IELTS Coach` để tự cập nhật được). Xong có thể xoá thư mục ZIP.

**Cách 3 — thủ công (đã có Git).**

```powershell
git clone https://github.com/jhinezeal123/ielts-personal-coach.git "$env:USERPROFILE\Documents\IELTS Coach"
```

Sau đó bấm đúp `scripts\cai-dat-tu-dong-cap-nhat.cmd` và mở `app\index.html` bằng Chrome hoặc Edge.

## Cập nhật hoạt động thế nào

Có hai kênh, đều chạy tự động mỗi ngày lúc **07:00** và mỗi lần đăng nhập Windows (máy tắt lúc 07:00 thì chạy bù):

- **Tính năng mới** đi theo bản phát hành (GitHub Release `vX.Y.Z`). Updater chỉ fast-forward thư mục app, không bao giờ ghi đè hay xoá thay đổi của bạn.
- **Bài học mới** (gói nội dung, bài nghe có audio thật) đi qua kênh nội dung, không cần chờ bản phát hành. Gói bài và file audio được tải về `app/content-packs/` trên máy bạn.

Muốn cập nhật ngay: bấm đúp `scripts\cap-nhat-ngay.cmd`, rồi tải lại trang app (F5). Chi tiết: mục 8 của [HUONG-DAN.md](app/HUONG-DAN.md).

## Chuyển dữ liệu giữa các máy

Dữ liệu học (tiến độ, bài làm, ghi âm Speaking, lịch học) nằm trong **trình duyệt** của từng máy, theo từng hồ sơ trình duyệt — không đồng bộ lên mạng.

1. Máy cũ: mở app → **Cài đặt → Sao lưu & khôi phục → Tải bản sao lưu** (tệp `.json`).
2. Máy mới: cài app như trên, mở app → **Cài đặt → Sao lưu & khôi phục → Khôi phục từ tệp…** → chọn tệp `.json`.
3. Từ đó luôn mở app bằng **cùng một trình duyệt**.

## Dành cho người bảo trì

- **Đăng bài học mới (không cần release):** thêm/sửa `content/packs/<id>.js` (tăng `version` khi sửa), chạy `node scripts/build-content-manifest.mjs`, rồi `node scripts/check-content.mjs`, commit và push lên `main`. Không tag, không release. Xem mục "Publishing new lessons" trong [content/CONTRACT.md](content/CONTRACT.md).
- **Phát hành tính năng mới:** sửa số phiên bản trong `app/version.js`, commit, push, rồi `gh release create vX.Y.Z` (tag phải trùng `version.js`). Xem [app/SPEC.md](app/SPEC.md) §9.
- File `index.html` ở thư mục gốc là bản nguyên mẫu đầu tiên, giữ nguyên để tham khảo; app thật nằm trong `app/`.
