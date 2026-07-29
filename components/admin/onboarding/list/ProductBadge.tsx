import React from 'react';

export const ProductBadge = ({ product }: { product: string }) => {
  const getLabel = (p: string) => {
    if (p === 'markeeChat') return 'Markee Chat';
    if (p === 'markeeSeeding') return 'Markee Seeding';
    if (p === 'markeeApp') return 'Markee App';
    return p;
  };

  return (
    <span className="inline-block px-2.5 py-1 text-xs font-medium bg-red-50 text-primary border border-red-100 rounded-md whitespace-nowrap">
      {getLabel(product)}
    </span>
  );
};
