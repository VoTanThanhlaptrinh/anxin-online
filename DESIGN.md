# Beggr™ — Design & Content Decisions

Tài liệu tổng hợp những gì đã chốt cho website "ăn xin online" (Beggr™). Nội dung trang bằng **tiếng Anh**, nhắm **thị trường Mỹ/quốc tế**.

## 1. Tổng quan

| Hạng mục | Quyết định |
|---|---|
| Mục tiêu | Landing page một trang, vui, dễ đọc; cuối trang hiện QR PayPal để xin tiền |
| Công nghệ | HTML + CSS + JS thuần, không framework, không bước build |
| Concept | **Beg-as-a-Service**: nhại landing page startup SaaS (pricing, traction, testimonial, FAQ) |
| Tông giọng | Tự giễu, thành thật; hài nhẹ, dễ thương, không gây áp lực |
| Nhân vật | **Pip the Raccoon** 🦝 — mascot hư cấu, "Founder & CEO of Beggr™" |
| Cách kể chuyện | 6 chương cuộn dọc, mỗi chương một dải màu pastel, hiện dần khi cuộn |
| Thanh toán | QR PayPal **tĩnh** (người dùng tự nhập số tiền), kèm link paypal.me |

## 2. Cấu trúc file

```
anxin-web/
├─ index.html            Toàn bộ nội dung + SVG mascot
├─ css/style.css         Design system, section, mood, responsive
├─ js/main.js            Reveal, count-up, share, mood engine
├─ data/donations.json   Số tiền donate của tháng hiện tại (sửa tay)
├─ assets/
│  ├─ favicon.svg        Icon 🦝
│  └─ paypal-qr.png      (CHƯA CÓ — bạn thêm vào)
└─ DESIGN.md             Tài liệu này
```

## 3. Design system

### Màu: pastel theo từng chương
Mỗi section là một dải full-width có màu nền riêng, giống lật từng trang truyện. Card trắng bo góc 24px đặt trên nền màu.

| Section | Nền |
|---|---|
| Hero | Lavender `#EDE7FF` + blob tím/hồng mờ (đổi theo mood, xem mục 5) |
| As not seen on | Kem `#FFF9F0` |
| Problem | Đào `#FFE4D6` |
| Chapter 1 — Garage | Mint `#D9F7E8` |
| Chapter 2 — Lemonade | Bơ vàng `#FFF3C4` |
| Chapter 3 — Pivot | Xanh trời `#DCEBFF` |
| Chapter 4 — Series A | Hồng `#FFE0EC` |
| Chapter 5 — Burn rate | Cam nhạt `#FFE8CC` |
| Chapter 6 — Today | Tím nhạt `#E9E3FF` |
| Traction | Xanh ngọc `#D4F4F4` |
| Pricing / Testimonials / FAQ | Kem `#FFF9F0`, card pricing mỗi loại một màu nhấn |
| The Ask (QR) | Gradient `#6D5DFC` → `#EC4899` → `#FB923C`, chữ trắng |
| Footer | Tím than `#1E1B3A` |

- Chữ chính `#1E1B3A`, chữ phụ `#5B5675`.
- Nút chính: gradient tím `#6D5DFC` → hồng `#EC4899`.
- Toàn bộ màu là CSS variables trong `:root` của `css/style.css`.

### Typography
- **Heading:** Space Grotesk (variable, 300–700)
- **Body:** Inter (variable, 100–900)
- Tải từ **jsDelivr CDN** (`@fontsource-variable/*@5.3.0`, bộ Latin, woff2), có `preload` + `preconnect`, `font-display: swap`. Không dùng Google Fonts.

### Hình khối & chuyển động
- Bo góc 16–24px, shadow mềm, badge dạng pill, nút nâng nhẹ khi hover.
- Container tối đa 1120px, mobile-first; lưới 3 cột xếp dọc dưới 900px, 4 cột → 2 → 1.
- Scroll-reveal bằng `IntersectionObserver`, số đếm chạy ở section Traction.
- Tôn trọng `prefers-reduced-motion` (tắt animation, hiện nội dung ngay).

## 4. Nội dung từng section (tiếng Anh)

1. **Navbar (sticky):** `🦝 Beggr™` · Story · Pricing · FAQ · nút **Give** (cuộn tới QR).
2. **Hero:** badge *"Now in public beta (since birth)"*; H1 *"Disrupting the begging industry. One stranger at a time."*; chú thích *"*We can't afford AI."*; CTA **Fund the dream →** / **Read the pitch deck**; dải `0 investors · 100% vibes · 1 raccoon · ∞ gratitude`; bên phải là Pip + dashboard giả.
3. **As not seen on:** TrashCrunch · The Bin Street Journal · Snack Overflow · The Daily Dumpster (tên hư cấu).
4. **The Problem:** *"Every startup solves a problem. Here's mine."* — Rent 🏠 / Wallet 👛 / Me 🦝.
5. **The Pitch Deck (6 chương):**
   1. The Garage Era 🗑️
   2. Searching for Product-Market Fit 🍋
   3. The Pivot 🔄
   4. Series A (for Absolutely Nothing) 💼
   5. Burn Rate 🔥 (biểu đồ thanh: noodles 41% · Wi-Fi 30% · snacks 29%)
   6. Today 🦝 → dẫn xuống phần xin tiền
6. **Traction:** `$ raised this month` (lấy từ dữ liệu thật) · 47 weeks of ramen · 3 friends who replied "lol" · 1 mom "not mad, just disappointed".
7. **Pricing** *"Simple, honest pricing."*: Starter "The Coffee" **$3** · Pro "The Pizza" **$10** (badge *Most Pitied*) · Enterprise "The Angel Investor" **$25+**. Mọi nút cuộn tới phần QR.
8. **Testimonials (giả):** Mom ★★★ · Landlord ★ · A kind stranger ★★★★★.
9. **FAQ (`<details>`):** Is this a scam? · What do I get? · Where does the money go? · Tax-deductible? · Refund?
10. **The Ask (QR PayPal):** *"You read this far. That's more than any investor ever did."*; ảnh QR + nút **Open PayPal →** + **Share Beggr** (Web Share API, dự phòng copy link + toast).
11. **Footer:** ghi rõ không phải công ty thật, Pip là nhân vật hư cấu, donate là quà tặng tự nguyện, không kèm hàng hóa/dịch vụ (giữ đúng tông "thành thật").

## 5. Tính năng: tâm trạng của Pip

Pip đổi mặt, nền hero và lời thoại theo **tổng tiền donate trong tháng dương lịch hiện tại**.

| Donate trong tháng | Mood | Biểu hiện |
|---|---|---|
| < $500 | **Buồn nhưng dễ thương** (mặc định) | Mắt ngấn nước, nước mắt rơi, nền hero xanh dịu, lắc lư chậm |
| $500 – dưới $2,000 | **Vui vẻ** | Mắt cười, má hồng, nền lavender/hồng |
| ≥ $2,000 | **Cực kỳ hạnh phúc** | Mắt ngôi sao, miệng cười toe, nảy lên, confetti, nền vàng |

- Mốc nằm ở hằng số `HAPPY_AT` / `ECSTATIC_AT` trong `js/main.js`; đúng $500 tính là vui, đúng $2,000 tính là cực kỳ hạnh phúc.
- Dashboard hiện số tiền tháng này, thanh tiến độ tới các mốc và câu gợi ý ("$500 more to make Pip smile"). Con số ở Traction dùng cùng nguồn.
- Mood được đặt qua `html[data-mood="sad|happy|ecstatic"]`; CSS đổi toàn bộ giao diện theo thuộc tính này.
- Xem thử mood khác: thêm `?amount=750` hoặc `?amount=2400` vào URL (chỉ đổi giao diện trên máy người mở).

### Nguồn số liệu (hiện tại)
`data/donations.json` — sửa tay:

```json
{ "month": "2026-11", "amount": 0, "currency": "USD" }
```

- Nếu `month` không khớp tháng hiện tại, trang coi là tháng mới và tính lại từ **$0**.
- Lỗi tải file hoặc mở bằng `file://` → mặc định $0 (Pip buồn).
- **Trạng thái đã chốt:** giữ Pip ở mức "hơi buồn dễ thương" cho đến khi tích hợp được API lấy tổng tiền. Khi đó chỉ cần thay hàm `loadDonations()` trong `js/main.js`, phần còn lại giữ nguyên.

## 6. Việc còn lại

- [ ] Thêm ảnh QR PayPal tại `assets/paypal-qr.png`.
- [ ] Thay `https://paypal.me/YOUR_NAME` trong `index.html` bằng link thật.
- [ ] Chọn và mua tên miền (đang nghiêng về `feedpip.com`; các phương án khác: `begwithpip.com`, `pipneedsnoodles.com`, `sparechangepip.com`), sau đó cập nhật `og:url`, link chia sẻ.
- [ ] Tích hợp API/nguồn dữ liệu thật cho tổng donate hằng tháng.
- [ ] Cân nhắc tự host font trong `assets/fonts/` để bỏ phụ thuộc CDN.
- [ ] Thêm ảnh `og:image` để link chia sẻ có hình xem trước.
- [ ] Xem lại bố cục bong bóng thoại của Pip trên desktop và mobile bằng mắt.

## 7. Hosting & cache

- **Đã chốt:** chuyển từ GitHub Pages sang **Cloudflare Pages** (miễn phí, deploy từ repo GitHub). Lý do: GitHub Pages luôn gửi `Cache-Control: max-age=600` và không cho cấu hình, nên Pingdom chấm D ở mục "Add Expires headers".
- File `_headers` quy định cache (Cloudflare Pages/Netlify đọc file này, GitHub Pages bỏ qua):
  - `/css/*`, `/js/*`, `/assets/*`: cache 1 năm, `immutable`.
  - `/`, `/index.html`, `/data/*`: `no-cache` (luôn kiểm tra bản mới, để mood của Pip cập nhật đúng).
- **Quy tắc khi sửa file:** vì CSS/JS/favicon được cache 1 năm, mỗi lần sửa `css/style.css`, `js/main.js` hoặc `assets/favicon.svg` phải **đổi số `?v=` tương ứng trong `index.html`** (hiện là `20261107`), nếu không người đã truy cập sẽ thấy bản cũ.
- Cấu hình Cloudflare Pages: kết nối repo, **không** cần build command, thư mục output là thư mục gốc (`/`).
- Lưu ý: Cloudflare Pages phục vụ cả thư mục gốc, nên `DESIGN.md` cũng truy cập được công khai ở `/DESIGN.md`.

- [ ] Tạo project Cloudflare Pages và trỏ tên miền vào đó.
