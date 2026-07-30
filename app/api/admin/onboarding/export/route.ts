import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/onboarding/repository';
import { format } from 'date-fns';

export async function GET() {
  try {
    const submissions = await getSubmissions();
    
      // Create CSV header
    const headers = [
      'ID',
      'Ngày Gửi',
      'Trạng Thái',
      'Doanh Nghiệp',
      'Người Liên Hệ',
      'Kênh Liên Hệ',
      'Thông Tin Liên Hệ',
      'Email',
      'Số Điện Thoại',
      'Website',
      'Tổng Users',
      'Sản Phẩm Đăng Ký',
      'Kênh Chat',
      'Kênh Bán Hàng',
      'Kênh Quảng Cáo',
      'Chi Tiết Kênh'
    ];

    const rows = submissions.map(sub => {
      const data = sub.data;
      
      const formatArray = (arr: string[]) => arr?.length ? arr.join(', ') : '';
      
      // Flatten channel details for readability
      const flattenDetails = (details: Record<string, unknown> | undefined) => {
        if (!details) return '';
        const lines: string[] = [];
        for (const [platform, fields] of Object.entries(details)) {
          if (!fields) continue;
          const fieldEntries = Object.entries(fields as Record<string, unknown>)
            .filter(([_, v]) => v)
            .map(([k, v]) => `${k}: ${v}`);
          if (fieldEntries.length) {
            lines.push(`[${platform.toUpperCase()}] ${fieldEntries.join(' | ')}`);
          }
        }
        return lines.join(' \n ');
      };

      const chatDetails = flattenDetails(data.productData?.markeeChat?.channelDetails?.chat as Record<string, unknown>);
      const salesDetails = flattenDetails(data.productData?.markeeChat?.channelDetails?.sales as Record<string, unknown>);
      const adsDetails = flattenDetails(data.productData?.markeeChat?.channelDetails?.ads as Record<string, unknown>);

      const allDetails = [chatDetails, salesDetails, adsDetails].filter(Boolean).join(' \n\n ');

      return [
        sub.id,
        format(new Date(sub.createdAt), 'dd/MM/yyyy HH:mm'),
        sub.status,
        data.company?.name || '',
        data.company?.contactName || '',
        data.company?.contactChannel || '',
        data.company?.contactId || '',
        data.company?.email || '',
        data.company?.phone || '',
        data.company?.website || '',
        data.staff?.length || 0,
        formatArray(data.selectedProducts || []),
        formatArray(data.productData?.markeeChat?.channels?.chat || []),
        formatArray(data.productData?.markeeChat?.channels?.sales || []),
        formatArray(data.productData?.markeeChat?.channels?.ads || []),
        allDetails
      ].map(val => {
        // Escape quotes and wrap in quotes for CSV
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      });
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    // Add BOM for Excel UTF-8 support
    const bom = '\uFEFF';

    return new NextResponse(bom + csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="onboarding_submissions_${format(new Date(), 'yyyyMMdd')}.csv"`
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
