import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/onboarding/repository';
import { OnboardingSubmission } from '@/types/onboarding';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || '';
    const product = searchParams.get('product') || '';
    const assignedTo = searchParams.get('assignedTo') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    
    // Default sort by date desc
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const allSubmissions = await getSubmissions();

    // Calculate Summary before filtering (or after filtering? Usually summary is global or based on some base filter)
    // The requirement says: "summary gồm: total, new, reviewing, waitingCustomer, inProgress, completed"
    const summary = {
      total: allSubmissions.length,
      new: allSubmissions.filter(s => s.status === 'new').length,
      reviewing: allSubmissions.filter(s => s.status === 'reviewing').length,
      waitingCustomer: allSubmissions.filter(s => s.status === 'waiting_customer').length,
      inProgress: allSubmissions.filter(s => s.status === 'in_progress').length,
      completed: allSubmissions.filter(s => s.status === 'completed').length,
    };

    // Filter
    let filtered = allSubmissions.filter(s => {
      // 1. Search (Company name, contact name, email)
      if (search) {
        const companyName = (s.data.company?.name || '').toLowerCase();
        const contactName = (s.data.company?.contactName || '').toLowerCase();
        const email = (s.data.company?.email || '').toLowerCase();
        const idMatch = s.id.toLowerCase().includes(search);
        
        if (!companyName.includes(search) && !contactName.includes(search) && !email.includes(search) && !idMatch) {
          return false;
        }
      }

      // 2. Status
      if (status && s.status !== status) return false;

      // 3. Product
      if (product && !s.data.selectedProducts?.includes(product)) return false;

      // 4. AssignedTo
      if (assignedTo) {
        if (assignedTo === 'unassigned') {
          if (s.admin_meta?.assignee) return false;
        } else {
          if (s.admin_meta?.assignee !== assignedTo) return false;
        }
      }

      // 5. Date Range
      if (dateFrom || dateTo) {
        const d = new Date(s.createdAt).getTime();
        if (dateFrom && d < new Date(dateFrom).getTime()) return false;
        if (dateTo && d > new Date(dateTo).getTime() + 86400000) return false; // end of day
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let valA: any = a[sortBy as keyof OnboardingSubmission];
      let valB: any = b[sortBy as keyof OnboardingSubmission];
      
      if (sortBy === 'createdAt') {
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
      } else if (sortBy === 'company') {
        valA = a.data.company?.name || '';
        valB = b.data.company?.name || '';
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    let paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

    // Map assignee ID to Name
    const { getMembers } = await import('@/lib/admin/members-repository');
    const members = await getMembers();
    paginatedItems = paginatedItems.map(item => {
      if (item.admin_meta?.assignee) {
        const m = members.find(m => m.id === item.admin_meta?.assignee);
        if (m) {
          return {
            ...item,
            admin_meta: {
              ...item.admin_meta,
              assigneeName: m.fullName
            }
          };
        }
      }
      return item;
    });

    return NextResponse.json({
      items: paginatedItems,
      total,
      page,
      pageSize,
      totalPages,
      summary
    });

  } catch (error) {
    console.error('List API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
