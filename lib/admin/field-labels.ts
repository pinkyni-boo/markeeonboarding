export const fieldLabels: Record<string, string> = {
  // Common
  adminName: 'Người giữ quyền Admin',
  managerName: 'Người quản lý',
  hasAdminAccess: 'Đã có quyền Admin',
  phone: 'Số điện thoại',
  link: 'Liên kết',
  
  // Facebook
  pageName: 'Tên Fanpage',
  pageLink: 'Link Fanpage',
  
  // Instagram
  accountName: 'Tên tài khoản',
  accountLink: 'Link tài khoản',
  linkedToFacebook: 'Đã liên kết Facebook',
  
  // Zalo
  oaName: 'Tên Zalo OA',
  oaId: 'Zalo OA ID',
  adminPhone: 'SĐT Admin',
  mainUser: 'Người dùng chính',
  accountId: 'Account ID',
  
  // Telegram / Whatsapp
  botOrGroupName: 'Tên Bot / Nhóm',
  businessName: 'Tên doanh nghiệp',
  
  // Website
  domain: 'Tên miền (Domain)',
  platform: 'Nền tảng (Platform)',
  hasApi: 'Có hỗ trợ API',
  
  // E-commerce
  shopName: 'Tên Gian hàng',
  shopLink: 'Link Gian hàng',
  shopId: 'Shop ID',
  sellerId: 'Seller ID',
  
  // POS/ERP
  softwareName: 'Tên phần mềm',
  provider: 'Nhà cung cấp',
  version: 'Phiên bản',
  
  // Ads
  bmName: 'Tên Business Manager',
  bmId: 'Business Manager ID',
  adAccountName: 'Tên tài khoản QC',
  adAccountId: 'ID tài khoản QC',
  customerId: 'Customer ID',
  advertiserId: 'Advertiser ID',

  // Select values translation
  yes: 'Có',
  no: 'Không',
  undecided: 'Chưa quyết định',
};

export const getFieldLabel = (key: string): string => {
  return fieldLabels[key] || key;
};
