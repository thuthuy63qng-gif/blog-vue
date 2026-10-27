# My Blog

Ứng dụng blog về âm nhạc và văn hóa giải trí, xây dựng bằng Vue 3. Giao diện được thiết kế cho laptop và máy tính; thiết bị có màn hình dưới 1024 CSS px sẽ nhận thông báo phù hợp.

## Chức năng

- Đăng ký, đăng nhập, đăng xuất và chỉnh sửa hồ sơ.
- Đăng bài với tiêu đề, nội dung và hình ảnh tùy chọn; chủ bài có thể sửa và xóa bài viết.
- Người dùng đã đăng nhập có thể bình luận; mỗi bình luận hiển thị người gửi, nội dung và thời gian đăng.
- Quản lý hồ sơ gồm tên, email, mật khẩu và ảnh đại diện.
- Vue Router bảo vệ các trang đăng bài, quản lý bài viết và hồ sơ.
- Tìm kiếm bài viết, lọc chủ đề, sắp xếp và phân trang danh sách.
- Trang chi tiết hiển thị thời gian đọc và bài viết cùng chủ đề.
- Trang chủ có mục bài viết nổi bật, ưu tiên bài được bình luận nhiều.
- Người dùng có thể sửa hoặc xóa bình luận của mình.
- Ảnh dự phòng cục bộ tại `public/blog-placeholder.svg` khi ảnh bài viết không tải được.

## Công nghệ

- Vue 3
- Vue Router
- Bootstrap 5
- Vite
- `localStorage` cho dữ liệu tài khoản, bài viết và bình luận

## Chạy trên máy

Cần cài Node.js và npm. Trong thư mục dự án, chạy:

```sh
npm install
npm run dev
```

Tạo bản production và xem thử bản build:

```sh
npm run build
npm run preview
```

## Dữ liệu và giới hạn

Đây là dự án frontend demo, chưa kết nối máy chủ hoặc cơ sở dữ liệu. Dữ liệu chỉ tồn tại trong `localStorage` của trình duyệt hiện tại và không đồng bộ qua thiết bị khác. Mật khẩu demo cũng được lưu ở phía trình duyệt; không dùng mật khẩu thật hoặc dữ liệu cá nhân nhạy cảm.

## Ảnh

Một số ảnh bài mẫu được tải từ Unsplash, Kenh14, YAN, Afamily, Tiền Phong, Imgur, Spotify và Thể thao & Văn hóa. Trang chi tiết liên kết đến máy chủ lưu ảnh để người đọc nhận biết nơi ảnh được tải. Liên kết máy chủ không xác nhận tác giả hoặc giấy phép của ảnh; hãy kiểm tra quyền sử dụng và bổ sung ghi công chính xác trước khi xuất bản. Các ảnh `den-vau.jpg`, `my-tam.jpg` và `son-tung.jpg` nằm trong `src/assets/`.
