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

export const ChatDetailsStep: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext<OnboardingFormValues>();
  const selectedChat = watch('productData.markeeChat.channels.chat') || [];
  const errs = errors.productData?.markeeChat?.channelDetails?.chat;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-2">Chi tiết Kênh Chat <span className="text-sm font-normal text-slate-500">(Không bắt buộc)</span></h2>
      <p className="text-text-muted mb-8">Vui lòng cung cấp thêm thông tin cho các kênh bạn đã chọn, hoặc để trống và bổ sung sau.</p>
      
      {selectedChat.includes('facebookMessenger') && (
        <CardWrapper title="Facebook Messenger">
          <FormField label="Tên Fanpage" required {...register('productData.markeeChat.channelDetails.chat.facebookMessenger.pageName')} error={errs?.facebookMessenger?.pageName?.message} />
          <FormField label="Link Fanpage" required {...register('productData.markeeChat.channelDetails.chat.facebookMessenger.pageLink')} error={errs?.facebookMessenger?.pageLink?.message} />
          <FormField label="Người giữ quyền Admin" {...register('productData.markeeChat.channelDetails.chat.facebookMessenger.adminName')} error={errs?.facebookMessenger?.adminName?.message} />
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">Hiện có quyền Admin hay không?</label>
            <select className={`w-full px-4 py-2.5 rounded-xl border bg-white ${errs?.facebookMessenger?.hasAdminAccess ? 'border-red-500 focus:ring-red-500/10' : 'border-slate-300'}`} {...register('productData.markeeChat.channelDetails.chat.facebookMessenger.hasAdminAccess')}>
              <option value="">Chọn...</option>
              <option value="yes">Có</option>
              <option value="no">Không</option>
              <option value="undecided">Chưa xác định</option>
            </select>
            {errs?.facebookMessenger?.hasAdminAccess?.message && (
              <p className="mt-2 text-sm text-red-500">{errs.facebookMessenger.hasAdminAccess.message}</p>
            )}
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('instagram') && (
        <CardWrapper title="Instagram">
          <FormField label="Tên tài khoản Instagram" required {...register('productData.markeeChat.channelDetails.chat.instagram.accountName')} error={errs?.instagram?.accountName?.message} />
          <FormField label="Link tài khoản" required {...register('productData.markeeChat.channelDetails.chat.instagram.accountLink')} error={errs?.instagram?.accountLink?.message} />
          <FormField label="Người quản lý tài khoản" {...register('productData.markeeChat.channelDetails.chat.instagram.managerName')} error={errs?.instagram?.managerName?.message} />
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">Đã liên kết với Fanpage chưa?</label>
            <select className={`w-full px-4 py-2.5 rounded-xl border bg-white ${errs?.instagram?.linkedToFacebook ? 'border-red-500 focus:ring-red-500/10' : 'border-slate-300'}`} {...register('productData.markeeChat.channelDetails.chat.instagram.linkedToFacebook')}>
              <option value="">Chọn...</option>
              <option value="yes">Có</option>
              <option value="no">Không</option>
              <option value="undecided">Chưa xác định</option>
            </select>
            {errs?.instagram?.linkedToFacebook?.message && (
              <p className="mt-2 text-sm text-red-500">{errs.instagram.linkedToFacebook.message}</p>
            )}
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('zaloOA') && (
        <CardWrapper title="Zalo OA">
          <FormField label="Tên Zalo OA" required {...register('productData.markeeChat.channelDetails.chat.zaloOA.oaName')} error={errs?.zaloOA?.oaName?.message} />
          <FormField label="OA ID" required {...register('productData.markeeChat.channelDetails.chat.zaloOA.oaId')} error={errs?.zaloOA?.oaId?.message} />
          <FormField label="Người quản trị" {...register('productData.markeeChat.channelDetails.chat.zaloOA.adminName')} error={errs?.zaloOA?.adminName?.message} />
          <FormField label="Số điện thoại quản trị" {...register('productData.markeeChat.channelDetails.chat.zaloOA.adminPhone')} error={errs?.zaloOA?.adminPhone?.message} />
        </CardWrapper>
      )}

      {selectedChat.includes('zaloPersonal') && (
        <CardWrapper title="Zalo Cá Nhân">
          <FormField label="Tên tài khoản" required {...register('productData.markeeChat.channelDetails.chat.zaloPersonal.accountName')} error={errs?.zaloPersonal?.accountName?.message} />
          <FormField label="Số điện thoại" required {...register('productData.markeeChat.channelDetails.chat.zaloPersonal.phone')} error={errs?.zaloPersonal?.phone?.message} />
          <div className="md:col-span-2">
            <FormField label="Người sử dụng chính" {...register('productData.markeeChat.channelDetails.chat.zaloPersonal.mainUser')} error={errs?.zaloPersonal?.mainUser?.message} />
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('telegram') && (
        <CardWrapper title="Telegram">
          <FormField label="Tên bot hoặc group" required {...register('productData.markeeChat.channelDetails.chat.telegram.botOrGroupName')} error={errs?.telegram?.botOrGroupName?.message} />
          <FormField label="Link bot hoặc group" required {...register('productData.markeeChat.channelDetails.chat.telegram.link')} error={errs?.telegram?.link?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản trị" {...register('productData.markeeChat.channelDetails.chat.telegram.adminName')} error={errs?.telegram?.adminName?.message} />
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('whatsapp') && (
        <CardWrapper title="WhatsApp">
          <FormField label="Tên tài khoản doanh nghiệp" required {...register('productData.markeeChat.channelDetails.chat.whatsapp.businessName')} error={errs?.whatsapp?.businessName?.message} />
          <FormField label="Số điện thoại" required {...register('productData.markeeChat.channelDetails.chat.whatsapp.phone')} error={errs?.whatsapp?.phone?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản trị" {...register('productData.markeeChat.channelDetails.chat.whatsapp.adminName')} error={errs?.whatsapp?.adminName?.message} />
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('websiteLiveChat') && (
        <CardWrapper title="Website Live Chat">
          <FormField label="Domain website" required {...register('productData.markeeChat.channelDetails.chat.websiteLiveChat.domain')} error={errs?.websiteLiveChat?.domain?.message} />
          <FormField label="Nền tảng website (VD: WordPress, Haravan...)" required {...register('productData.markeeChat.channelDetails.chat.websiteLiveChat.platform')} error={errs?.websiteLiveChat?.platform?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản trị website" {...register('productData.markeeChat.channelDetails.chat.websiteLiveChat.adminName')} error={errs?.websiteLiveChat?.adminName?.message} />
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('airbnb') && (
        <CardWrapper title="Airbnb">
          <FormField label="Tên tài khoản / cơ sở lưu trú" required {...register('productData.markeeChat.channelDetails.chat.airbnb.accountName')} error={errs?.airbnb?.accountName?.message} />
          <FormField label="Link trang Airbnb" required {...register('productData.markeeChat.channelDetails.chat.airbnb.link')} error={errs?.airbnb?.link?.message} />
          <div className="md:col-span-2">
            <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.chat.airbnb.managerName')} error={errs?.airbnb?.managerName?.message} />
          </div>
        </CardWrapper>
      )}
    </div>
  );
};
