'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
  description?: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  width?: string;
  placeholder?: string;
}

export const FilterSelect = ({ label, value, options, onChange, width = 'w-full', placeholder = 'Tất cả' }: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${width}`} ref={containerRef}>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full h-11 px-3 bg-white border rounded-xl text-sm transition-all focus:outline-none ${
          isOpen ? 'border-primary ring-2 ring-primary/10' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className="truncate pr-2 text-slate-700">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full min-w-[200px] mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1 max-h-60 overflow-y-auto">
          <button
            type="button"
            className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center justify-between group"
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
          >
            <span className={!value ? 'font-medium text-slate-900' : 'text-slate-600'}>
              {placeholder}
            </span>
            {!value && <Check className="w-4 h-4 text-primary shrink-0" />}
          </button>
          
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between group"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <div className="min-w-0 pr-2">
                  <div className={`text-sm truncate ${isSelected ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-xs text-slate-400 truncate mt-0.5">{option.description}</div>
                  )}
                </div>
                {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
