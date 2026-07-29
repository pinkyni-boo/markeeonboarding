import { Home, Users, UserCog, UserCheck, Settings, BarChart, FileText, ClipboardList, LogOut } from 'lucide-react';

export const ADMIN_NAVIGATION = [
  {
    group: 'Tổng quan',
    items: [
      {
        name: 'Tổng quan',
        href: '/admin',
        icon: Home,
        disabled: false,
      }
    ]
  },
  {
    group: 'Yêu cầu Onboarding',
    items: [
      {
        name: 'Tất cả yêu cầu',
        href: '/admin/onboarding',
        icon: ClipboardList,
        disabled: false,
      }
    ]
  },
  {
    group: 'Quản lý nhân sự',
    items: [
      {
        name: 'Quản lý thành viên',
        href: '/admin/members',
        icon: UserCog,
        disabled: false,
      },
      {
        name: 'Phân công triển khai',
        href: '/admin/assignments',
        icon: UserCheck,
        disabled: false,
      }
    ]
  },
  {
    group: 'Báo cáo',
    items: [
      {
        name: 'Báo cáo tổng quan',
        href: '/admin/reports',
        icon: BarChart,
        disabled: false,
      },
      {
        name: 'Báo cáo chi tiết',
        href: '/admin/reports/detail',
        icon: FileText,
        disabled: false,
      }
    ]
  },
  {
    group: 'Cài đặt',
    items: [
      {
        name: 'Cài đặt hệ thống',
        href: '/admin/settings/system',
        icon: Settings,
        disabled: false,
      },
      {
        name: 'Cài đặt biểu mẫu',
        href: '/admin/settings/forms',
        icon: ClipboardList,
        disabled: false,
      }
    ]
  }
];
