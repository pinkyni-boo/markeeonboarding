import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên doanh nghiệp'),
  brand: z.string().optional(),
  contactName: z.string().min(1, 'Vui lòng nhập người liên hệ'),
  email: z.string().email('Email không đúng định dạng').min(1, 'Vui lòng nhập email'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại'),
  website: z.string().optional(),
});

export const staffMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Vui lòng nhập họ tên'),
  email: z.string().email('Email không đúng định dạng').optional().or(z.literal('')),
  role: z.string().min(1, 'Vui lòng chọn vai trò'),
  product: z.string().optional(),
  channels: z.string().optional(),
});

export const staffingSchema = z.array(staffMemberSchema);

export const channelsSchema = z.object({
  chat: z.array(z.string()).optional(),
  sales: z.array(z.string()).optional(),
  ads: z.array(z.string()).optional(),
});

export const channelDetailsSchema = z.object({
  chat: z.object({
    facebookMessenger: z.object({
      pageName: z.string().optional(),
      pageLink: z.string().optional(),
      adminName: z.string().optional(),
      hasAdminAccess: z.enum(['yes', 'no', 'undecided', '']).transform(v => v === '' ? undefined : (v as 'yes' | 'no' | 'undecided')).optional(),
    }).optional(),
    instagram: z.object({
      accountName: z.string().optional(),
      accountLink: z.string().optional(),
      linkedToFacebook: z.enum(['yes', 'no', 'undecided', '']).transform(v => v === '' ? undefined : (v as 'yes' | 'no' | 'undecided')).optional(),
      managerName: z.string().optional(),
    }).optional(),
    zaloOA: z.object({
      oaName: z.string().optional(),
      oaId: z.string().optional(),
      adminName: z.string().optional(),
      adminPhone: z.string().optional(),
    }).optional(),
    zaloPersonal: z.object({
      accountName: z.string().optional(),
      phone: z.string().optional(),
      mainUser: z.string().optional(),
    }).optional(),
    telegram: z.object({
      botOrGroupName: z.string().optional(),
      link: z.string().optional(),
      adminName: z.string().optional(),
    }).optional(),
    whatsapp: z.object({
      businessName: z.string().optional(),
      phone: z.string().optional(),
      adminName: z.string().optional(),
    }).optional(),
    websiteLiveChat: z.object({
      domain: z.string().optional(),
      platform: z.string().optional(),
      adminName: z.string().optional(),
    }).optional(),
    airbnb: z.object({
      accountName: z.string().optional(),
      link: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
  }).optional(),
  
  sales: z.object({
    shopee: z.object({
      shopName: z.string().optional(),
      shopLink: z.string().optional(),
      shopId: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
    tiktokShop: z.object({
      shopName: z.string().optional(),
      shopLink: z.string().optional(),
      shopId: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
    lazada: z.object({
      shopName: z.string().optional(),
      shopLink: z.string().optional(),
      sellerId: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
    ecommerceWebsite: z.object({
      domain: z.string().optional(),
      platform: z.string().optional(),
      hasApi: z.enum(['yes', 'no', 'undecided', '']).transform(v => v === '' ? undefined : (v as 'yes' | 'no' | 'undecided')).optional(),
      adminName: z.string().optional(),
    }).optional(),
    pos: z.object({
      softwareName: z.string().optional(),
      provider: z.string().optional(),
      version: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
    erp: z.object({
      softwareName: z.string().optional(),
      provider: z.string().optional(),
      version: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
  }).optional(),
  
  ads: z.object({
    metaAds: z.object({
      bmName: z.string().optional(),
      bmId: z.string().optional(),
      adAccountName: z.string().optional(),
      adAccountId: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
    googleAds: z.object({
      accountName: z.string().optional(),
      customerId: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
    tiktokAds: z.object({
      accountName: z.string().optional(),
      advertiserId: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
    shopeeAds: z.object({
      shopName: z.string().optional(),
      shopId: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
    zaloAds: z.object({
      accountName: z.string().optional(),
      accountId: z.string().optional(),
      managerName: z.string().optional(),
    }).optional(),
  }).optional(),
});

export const markeeChatSchema = z.object({
  channels: channelsSchema.optional(),
  channelDetails: channelDetailsSchema.optional(),
});

export const markeeSeedingSchema = z.object({
  version: z.number().default(1),
  data: z.record(z.string(), z.any()).optional(),
});

export const markeeAppSchema = z.object({
  version: z.number().default(1),
  data: z.record(z.string(), z.any()).optional(),
});

export const productDataSchema = z.object({
  markeeChat: markeeChatSchema.optional(),
  markeeSeeding: markeeSeedingSchema.optional(),
  markeeApp: markeeAppSchema.optional(),
});

export const scheduleSchema = z.object({
  supportMethods: z.array(z.string()).optional(),
  preferredDate: z.string().optional(),
  preferredTimeSlot: z.string().optional(),
  specificTime: z.string().optional(),
  participants: z.string().optional(),
  note: z.string().optional(),
}).refine(data => {
  if (data.preferredTimeSlot === 'specific' && !data.specificTime) return false;
  return true;
}, {
  message: 'Vui lòng nhập giờ cụ thể',
  path: ['specificTime']
});

export const onboardingFormSchema = z.object({
  company: companySchema,
  selectedProducts: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất một sản phẩm'),
  productData: productDataSchema.optional(),
  staff: staffingSchema.optional(),
  deploymentSchedule: scheduleSchema.optional(),
  additionalNotes: z.string().optional(),
  
  // review.confirmed is still used during client validation before submit, but usually stripped when saving
  review: z.object({
    confirmed: z.boolean().refine(val => val === true, {
      message: 'Vui lòng xác nhận thông tin trước khi gửi',
    }),
  }).optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;
