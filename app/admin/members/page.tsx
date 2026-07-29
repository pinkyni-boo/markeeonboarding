import { Metadata } from 'next';
import MembersClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Quản lý thành viên | Markee Admin',
  description: 'Quản lý nhân sự nội bộ và phân quyền',
};

export default function MembersPage() {
  return <MembersClientPage />;
}
