export const mascotMessages: Record<string, string> = {
  welcome: 'Chào bạn! Mình là trợ lý Markee 👋 Chỉ mất khoảng 3 phút để hoàn tất thôi!',
  company: 'Hãy nhập thông tin cơ bản của doanh nghiệp để mình chuẩn bị hồ sơ triển khai nhé!',
  products: 'Chọn dịch vụ bạn muốn Markee đồng hành cùng doanh nghiệp nha!',
  staffing: 'Cho mình biết ai sẽ là người sử dụng hệ thống để mình cấp quyền phù hợp!',
  channels: 'Chọn những kênh bạn muốn tích hợp để Markee kết nối nhanh hơn!',
  chatDetails: 'Điền chi tiết kênh chat giúp đội ngũ kết nối chính xác nhé!',
  salesDetails: 'Thông tin kênh bán hàng giúp Markee đồng bộ dữ liệu chuẩn xác!',
  adsDetails: 'Chi tiết kênh quảng cáo giúp mình tối ưu chiến dịch cho bạn!',
  schedule: 'Chọn thời gian triển khai phù hợp với doanh nghiệp nhé!',
  review: 'Sắp xong rồi! Kiểm tra lại thông tin trước khi gửi nha.',
};

export const defaultMascotMessage = 'Mình luôn ở đây nếu bạn cần giúp đỡ 😊';

export const getMascotMessage = (stepId?: string): string =>
  (stepId && mascotMessages[stepId]) || defaultMascotMessage;
