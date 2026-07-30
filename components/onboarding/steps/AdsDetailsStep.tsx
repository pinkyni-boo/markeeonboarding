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

export const AdsDetailsStep: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext<OnboardingFormValues>();
  const selectedAds = watch('productData.markeeChat.channels.ads') || [];
  const errs = errors.productData?.markeeChat?.channelDetails?.ads;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-2">Chi tiết Kênh Quảng cáo <span className="text-sm font-normal text-slate-500">(Không bắt buộc)</span></h2>
      <p className="text-text-muted mb-8">Vui lòng cung cấp thêm thông tin cho các kênh bạn đã chọn, hoặc để trống và bổ sung sau.</p>
      
      {selectedAds.includes('metaAds') && (
        <CardWrapper title="Meta Ads (Facebook/Instagram)">
          <FormField label="Tên Business Manager" required {...register('productData.markeeChat.channelDetails.ads.metaAds.bmName')} error={errs?.metaAds?.bmName?.message} />
          <FormField label="Business Manager ID" required {...register('productData.markeeChat.channelDetails.ads.metaAds.bmId')} error={errs?.metaAds?.bmId?.message} />
          <FormField label="Tên tài khoản quảng cáo" required {...register('productData.markeeChat.channelDetails.ads.metaAds.adAccountName')} error={errs?.metaAds?.adAccountName?.message} />
          <FormField label="Ad Account ID" required {...register('productData.markeeChat.channelDetails.ads.metaAds.adAccountId')} error={errs?.metaAds?.adAccountId?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.ads.metaAds.managerName')} error={errs?.metaAds?.managerName?.message} />
          </div>
        </CardWrapper>
      )}

      {selectedAds.includes('googleAds') && (
        <CardWrapper title="Google Ads">
          <FormField label="Tên tài khoản" required {...register('productData.markeeChat.channelDetails.ads.googleAds.accountName')} error={errs?.googleAds?.accountName?.message} />
          <FormField label="Customer ID" required {...register('productData.markeeChat.channelDetails.ads.googleAds.customerId')} error={errs?.googleAds?.customerId?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.ads.googleAds.managerName')} error={errs?.googleAds?.managerName?.message} />
          </div>
        </CardWrapper>
      )}

      {selectedAds.includes('tiktokAds') && (
        <CardWrapper title="TikTok Ads">
          <FormField label="Tên tài khoản quảng cáo" required {...register('productData.markeeChat.channelDetails.ads.tiktokAds.accountName')} error={errs?.tiktokAds?.accountName?.message} />
          <FormField label="Advertiser ID" required {...register('productData.markeeChat.channelDetails.ads.tiktokAds.advertiserId')} error={errs?.tiktokAds?.advertiserId?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.ads.tiktokAds.managerName')} error={errs?.tiktokAds?.managerName?.message} />
          </div>
        </CardWrapper>
      )}

      {selectedAds.includes('shopeeAds') && (
        <CardWrapper title="Shopee Ads">
          <FormField label="Tên Shop" required {...register('productData.markeeChat.channelDetails.ads.shopeeAds.shopName')} error={errs?.shopeeAds?.shopName?.message} />
          <FormField label="Shop ID" required {...register('productData.markeeChat.channelDetails.ads.shopeeAds.shopId')} error={errs?.shopeeAds?.shopId?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản lý quảng cáo" {...register('productData.markeeChat.channelDetails.ads.shopeeAds.managerName')} error={errs?.shopeeAds?.managerName?.message} />
          </div>
        </CardWrapper>
      )}

      {selectedAds.includes('zaloAds') && (
        <CardWrapper title="Zalo Ads">
          <FormField label="Tên tài khoản" required {...register('productData.markeeChat.channelDetails.ads.zaloAds.accountName')} error={errs?.zaloAds?.accountName?.message} />
          <FormField label="Account ID" required {...register('productData.markeeChat.channelDetails.ads.zaloAds.accountId')} error={errs?.zaloAds?.accountId?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.ads.zaloAds.managerName')} error={errs?.zaloAds?.managerName?.message} />
          </div>
        </CardWrapper>
      )}
    </div>
  );
};
