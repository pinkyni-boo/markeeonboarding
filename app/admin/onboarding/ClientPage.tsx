'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminOnboardingHeader } from '@/components/admin/onboarding/list/AdminOnboardingHeader';
import { OnboardingStats } from '@/components/admin/onboarding/list/OnboardingStats';
import { OnboardingFilters } from '@/components/admin/onboarding/list/OnboardingFilters';
import { OnboardingTable } from '@/components/admin/onboarding/list/OnboardingTable';
import { AdminPagination } from '@/components/admin/onboarding/list/AdminPagination';

export const ClientPage = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const [data, setData] = useState<any>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
    summary: { total: 0, new: 0, reviewing: 0, waitingCustomer: 0, inProgress: 0, completed: 0 }
  });
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    product: '',
    assignedTo: '',
    dateFrom: '',
    dateTo: '',
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.status) params.append('status', filters.status);
        if (filters.product) params.append('product', filters.product);
        if (filters.assignedTo) params.append('assignedTo', filters.assignedTo);
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        params.append('page', filters.page.toString());
        params.append('pageSize', filters.pageSize.toString());

        const res = await fetch(`/api/admin/onboarding?${params.toString()}`, {
          signal: controller.signal
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      } finally {
        setIsInitialLoading(false);
        setIsFetching(false);
        setIsRefreshing(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [filters]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setFilters(prev => ({ ...prev })); // Trigger re-fetch
  }, []);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to page 1 on filter change
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      search: '',
      status: '',
      product: '',
      assignedTo: '',
      dateFrom: '',
      dateTo: '',
      page: 1,
      pageSize: 10,
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setFilters(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      {!hideHeader && (
        <AdminOnboardingHeader 
          onRefresh={handleRefresh} 
          isRefreshing={isRefreshing} 
        />
      )}
      
      <OnboardingStats 
        summary={data.summary} 
        onFilterStatus={(status) => handleFilterChange('status', status)}
      />
      
      <OnboardingFilters 
        filters={filters} 
        onChange={handleFilterChange} 
        onReset={handleResetFilters} 
      />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <OnboardingTable 
          items={data.items} 
          isLoading={isInitialLoading}
          isFetching={isFetching}
          onRefresh={handleRefresh}
        />
        <AdminPagination 
          page={data.page} 
          pageSize={data.pageSize} 
          total={data.total} 
          totalPages={data.totalPages} 
          onChangePage={handlePageChange}
          onChangePageSize={handlePageSizeChange}
        />
      </div>
    </div>
  );
};
