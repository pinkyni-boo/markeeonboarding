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

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-6">Thông tin kênh Chat</h2>
      
      {selectedChat.includes('facebookMessenger') && (
        <CardWrapper title="Facebook Messenger">
          <FormField label="Tên Fanpage" required {...register('productData.markeeChat.channelDetails.chat.facebookMessenger.pageName')} />
          <FormField label="Link Fanpage" required {...register('productData.markeeChat.channelDetails.chat.facebookMessenger.pageLink')} />
          <FormField label="Người giữ quyền Admin" {...register('productData.markeeChat.channelDetails.chat.facebookMessenger.adminName')} />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Hiện có quyền Admin hay không?</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white" {...register('productData.markeeChat.channelDetails.chat.facebookMessenger.hasAdminAccess')}>
              <option value="">Chọn...</option>
              <option value="yes">Có</option>
              <option value="no">Không</option>
              <option value="undecided">Chưa xác định</option>
            </select>
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('instagram') && (
        <CardWrapper title="Instagram">
          <FormField label="Tên tài khoản Instagram" required {...register('productData.markeeChat.channelDetails.chat.instagram.accountName')} />
          <FormField label="Link tài khoản" required {...register('productData.markeeChat.channelDetails.chat.instagram.accountLink')} />
          <FormField label="Người quản lý tài khoản" {...register('productData.markeeChat.channelDetails.chat.instagram.managerName')} />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Đã liên kết với Fanpage chưa?</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white" {...register('productData.markeeChat.channelDetails.chat.instagram.linkedToFacebook')}>
              <option value="">Chọn...</option>
              <option value="yes">Có</option>
              <option value="no">Không</option>
              <option value="undecided">Chưa xác định</option>
            </select>
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('zaloOA') && (
        <CardWrapper title="Zalo OA">
          <FormField label="Tên Zalo OA" required {...register('productData.markeeChat.channelDetails.chat.zaloOA.oaName')} />
          <FormField label="OA ID" required {...register('productData.markeeChat.channelDetails.chat.zaloOA.oaId')} />
          <FormField label="Người quản trị" {...register('productData.markeeChat.channelDetails.chat.zaloOA.adminName')} />
          <FormField label="Số điện thoại quản trị" {...register('productData.markeeChat.channelDetails.chat.zaloOA.adminPhone')} />
        </CardWrapper>
      )}

      {selectedChat.includes('zaloPersonal') && (
        <CardWrapper title="Zalo Cá Nhân">
          <FormField label="Tên tài khoản" required {...register('productData.markeeChat.channelDetails.chat.zaloPersonal.accountName')} />
          <FormField label="Số điện thoại" required {...register('productData.markeeChat.channelDetails.chat.zaloPersonal.phone')} />
          <div className="md:col-span-2">
            <FormField label="Người sử dụng chính" {...register('productData.markeeChat.channelDetails.chat.zaloPersonal.mainUser')} />
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('telegram') && (
        <CardWrapper title="Telegram">
          <FormField label="Tên bot hoặc group" required {...register('productData.markeeChat.channelDetails.chat.telegram.botOrGroupName')} />
          <FormField label="Link bot hoặc group" required {...register('productData.markeeChat.channelDetails.chat.telegram.link')} />
          <div className="md:col-span-2">
            <FormField label="Người quản trị" {...register('productData.markeeChat.channelDetails.chat.telegram.adminName')} />
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('whatsapp') && (
        <CardWrapper title="WhatsApp">
          <FormField label="Tên tài khoản doanh nghiệp" required {...register('productData.markeeChat.channelDetails.chat.whatsapp.businessName')} />
          <FormField label="Số điện thoại" required {...register('productData.markeeChat.channelDetails.chat.whatsapp.phone')} />
          <div className="md:col-span-2">
            <FormField label="Người quản trị" {...register('productData.markeeChat.channelDetails.chat.whatsapp.adminName')} />
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('websiteLiveChat') && (
        <CardWrapper title="Website Live Chat">
          <FormField label="Domain website" required {...register('productData.markeeChat.channelDetails.chat.websiteLiveChat.domain')} />
          <FormField label="Nền tảng website (VD: WordPress, Haravan...)" required {...register('productData.markeeChat.channelDetails.chat.websiteLiveChat.platform')} />
          <div className="md:col-span-2">
            <FormField label="Người quản trị website" {...register('productData.markeeChat.channelDetails.chat.websiteLiveChat.adminName')} />
          </div>
        </CardWrapper>
      )}

      {selectedChat.includes('airbnb') && (
        <CardWrapper title="Airbnb">
          <FormField label="Tên tài khoản / cơ sở lưu trú" required {...register('productData.markeeChat.channelDetails.chat.airbnb.accountName')} />
          <FormField label="Link trang Airbnb" required {...register('productData.markeeChat.channelDetails.chat.airbnb.link')} />
          <div className="md:col-span-2">
            <FormField label="Người quản lý" {...register('productData.markeeChat.channelDetails.chat.airbnb.managerName')} />
          </div>
        </CardWrapper>
      )}
    </div>
  );
};
