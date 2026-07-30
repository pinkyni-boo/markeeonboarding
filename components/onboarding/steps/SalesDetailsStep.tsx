import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../FormField';
import { OnboardingFormValues } from '@/lib/onboarding/schema';

const CardWrapper: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white border border-border-color rounded-2xl p-5 mb-6 shadow-sm">
    <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-border-color flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-primary" />
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

export const SalesDetailsStep: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext<OnboardingFormValues>();
  const selectedSales = watch('productData.markeeChat.channels.sales') || [];
  const errs = errors.productData?.markeeChat?.channelDetails?.sales;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-2">Chi tiết Kênh Bán hàng <span className="text-sm font-normal text-slate-500">(Không bắt buộc)</span></h2>
      <p className="text-text-muted mb-8">Vui lòng cung cấp thêm thông tin cho các kênh bạn đã chọn, hoặc để trống và bổ sung sau.</p>
      
      {selectedSales.includes('shopee') && (
        <CardWrapper title="Shopee">
          <FormField label="Tên Shop" required {...register('productData.markeeChat.channelDetails.sales.shopee.shopName')} error={errs?.shopee?.shopName?.message} />
          <FormField label="Link Shop" required {...register('productData.markeeChat.channelDetails.sales.shopee.shopLink')} error={errs?.shopee?.shopLink?.message} />
          <FormField label="Shop ID" required {...register('productData.markeeChat.channelDetails.sales.shopee.shopId')} error={errs?.shopee?.shopId?.message} />
          <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.sales.shopee.managerName')} error={errs?.shopee?.managerName?.message} />
        </CardWrapper>
      )}

      {selectedSales.includes('tiktokShop') && (
        <CardWrapper title="TikTok Shop">
          <FormField label="Tên Shop" required {...register('productData.markeeChat.channelDetails.sales.tiktokShop.shopName')} error={errs?.tiktokShop?.shopName?.message} />
          <FormField label="Link Shop" required {...register('productData.markeeChat.channelDetails.sales.tiktokShop.shopLink')} error={errs?.tiktokShop?.shopLink?.message} />
          <FormField label="Shop ID" required {...register('productData.markeeChat.channelDetails.sales.tiktokShop.shopId')} error={errs?.tiktokShop?.shopId?.message} />
          <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.sales.tiktokShop.managerName')} error={errs?.tiktokShop?.managerName?.message} />
        </CardWrapper>
      )}

      {selectedSales.includes('lazada') && (
        <CardWrapper title="Lazada">
          <FormField label="Tên Shop" required {...register('productData.markeeChat.channelDetails.sales.lazada.shopName')} error={errs?.lazada?.shopName?.message} />
          <FormField label="Link Shop" required {...register('productData.markeeChat.channelDetails.sales.lazada.shopLink')} error={errs?.lazada?.shopLink?.message} />
          <FormField label="Seller ID" required {...register('productData.markeeChat.channelDetails.sales.lazada.sellerId')} error={errs?.lazada?.sellerId?.message} />
          <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.sales.lazada.managerName')} error={errs?.lazada?.managerName?.message} />
        </CardWrapper>
      )}

      {selectedSales.includes('ecommerceWebsite') && (
        <CardWrapper title="Website Bán Hàng">
          <FormField label="Domain" required {...register('productData.markeeChat.channelDetails.sales.ecommerceWebsite.domain')} error={errs?.ecommerceWebsite?.domain?.message} />
          <FormField label="Nền tảng / CMS (VD: Haravan, Shopify)" required {...register('productData.markeeChat.channelDetails.sales.ecommerceWebsite.platform')} error={errs?.ecommerceWebsite?.platform?.message} />
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">Có API kết nối không?</label>
            <select className={`w-full px-4 py-2.5 rounded-xl border bg-white ${errs?.ecommerceWebsite?.hasApi ? 'border-red-500 focus:ring-red-500/10' : 'border-slate-300'}`} {...register('productData.markeeChat.channelDetails.sales.ecommerceWebsite.hasApi')}>
              <option value="">Chọn...</option>
              <option value="yes">Có</option>
              <option value="no">Không</option>
              <option value="undecided">Chưa xác định</option>
            </select>
            {errs?.ecommerceWebsite?.hasApi?.message && (
              <p className="mt-2 text-sm text-red-500">{errs.ecommerceWebsite.hasApi.message}</p>
            )}
          </div>
          <FormField label="Người quản trị" {...register('productData.markeeChat.channelDetails.sales.ecommerceWebsite.adminName')} error={errs?.ecommerceWebsite?.adminName?.message} />
        </CardWrapper>
      )}

      {selectedSales.includes('pos') && (
        <CardWrapper title="Phần mềm POS">
          <FormField label="Tên phần mềm POS" required {...register('productData.markeeChat.channelDetails.sales.pos.softwareName')} error={errs?.pos?.softwareName?.message} />
          <FormField label="Nhà cung cấp" required {...register('productData.markeeChat.channelDetails.sales.pos.provider')} error={errs?.pos?.provider?.message} />
          <FormField label="Phiên bản đang dùng" {...register('productData.markeeChat.channelDetails.sales.pos.version')} error={errs?.pos?.version?.message} />
          <FormField label="Người phụ trách" {...register('productData.markeeChat.channelDetails.sales.pos.managerName')} error={errs?.pos?.managerName?.message} />
        </CardWrapper>
      )}

      {selectedSales.includes('erp') && (
        <CardWrapper title="Hệ thống ERP">
          <FormField label="Tên hệ thống ERP" required {...register('productData.markeeChat.channelDetails.sales.erp.softwareName')} error={errs?.erp?.softwareName?.message} />
          <FormField label="Nhà cung cấp" required {...register('productData.markeeChat.channelDetails.sales.erp.provider')} error={errs?.erp?.provider?.message} />
          <FormField label="Phiên bản đang dùng" {...register('productData.markeeChat.channelDetails.sales.erp.version')} error={errs?.erp?.version?.message} />
          <FormField label="Người phụ trách" {...register('productData.markeeChat.channelDetails.sales.erp.managerName')} error={errs?.erp?.managerName?.message} />
        </CardWrapper>
      )}
    </div>
  );
};
