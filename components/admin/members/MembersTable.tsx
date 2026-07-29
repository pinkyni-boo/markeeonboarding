import React from 'react';
import { Member } from '@/types/member';
import { MoreHorizontal, Edit, Lock, Unlock, Trash2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface MembersTableProps {
  members: Member[];
  isLoading: boolean;
  onEdit: (m: Member) => void;
  onRefresh: () => void;
}

export const MembersTable = ({ members, isLoading, onEdit, onRefresh }: MembersTableProps) => {
  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Đang tải dữ liệu...</div>;
  }

  if (members.length === 0) {
    return <div className="p-8 text-center text-slate-500">Không tìm thấy thành viên nào.</div>;
  }

  return (
    <div className="overflow-x-auto min-h-[180px]">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-5 py-4 font-semibold">Thành viên</th>
            <th className="px-5 py-4 font-semibold">Vai trò / Phòng ban</th>
            <th className="px-5 py-4 font-semibold">Trạng thái</th>
            <th className="px-5 py-4 font-semibold text-center">Phân công OB</th>
            <th className="px-5 py-4 font-semibold">Ngày tham gia</th>
            <th className="px-5 py-4 font-semibold text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {members.map(member => (
            <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {member.avatarUrl ? (
                      <img src={member.avatarUrl} alt={member.fullName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      member.fullName.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{member.fullName}</div>
                    <div className="text-xs text-slate-500">{member.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 w-fit capitalize">
                    {member.role}
                  </span>
                  <span className="text-xs text-slate-500 uppercase">{member.department}</span>
                </div>
              </td>
              <td className="px-5 py-4">
                {member.status === 'active' ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Đang hoạt động
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Đã khóa
                  </span>
                )}
              </td>
              <td className="px-5 py-4 text-center">
                {member.canReceiveOnboarding ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                ) : (
                  <span className="text-slate-300">-</span>
                )}
              </td>
              <td className="px-5 py-4 text-slate-600">
                {format(new Date(member.createdAt), 'dd/MM/yyyy')}
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(member)}
                    className="p-1.5 text-slate-400 hover:text-primary hover:bg-red-50 rounded transition-colors"
                    title="Sửa"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {/* Delete or Lock button could go here */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
