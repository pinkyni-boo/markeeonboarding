'use client';

import React, { useState } from 'react';
import { OnboardingSubmission } from '@/types/onboarding';
import { NotebookPen, Send } from 'lucide-react';
import { format } from 'date-fns';

export const InternalNotes = ({ submission }: { submission: OnboardingSubmission }) => {
  const [notes, setNotes] = useState(submission.admin_meta?.notes || []);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now().toString(),
      author: 'Bạn', // Mock current user
      content: newNote.trim(),
      createdAt: new Date().toISOString()
    };

    const newNotes = [note, ...notes];
    
    // Optimistic update
    setNotes(newNotes);
    setNewNote('');

    try {
      await fetch(`/api/admin/onboarding/${submission.id}/meta`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_meta: { notes: newNotes }
        }),
      });
    } catch (e) {
      console.error(e);
      // Revert if failed
      setNotes(notes);
      alert('Không thể lưu ghi chú.');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <NotebookPen className="w-5 h-5 text-slate-600" />
        Ghi chú nội bộ
      </h3>
      
      <div className="mb-6">
        <textarea 
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Thêm ghi chú mới..."
          className="w-full min-h-[112px] border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
        />
        <div className="mt-3 flex justify-end">
          <button 
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 font-medium text-sm"
          >
            <Send className="w-4 h-4 shrink-0" />
            Thêm ghi chú
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-4">Chưa có ghi chú nào.</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-slate-800">{note.author}</span>
                <span className="text-xs text-slate-500">{format(new Date(note.createdAt), 'HH:mm · dd/MM')}</span>
              </div>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
