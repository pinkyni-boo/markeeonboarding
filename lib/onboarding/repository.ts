import fs from 'fs';
import path from 'path';
import { OnboardingSubmission } from '../../types/onboarding';
import { supabase } from '../supabase';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

const hasSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const ensureDataFileExists = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
};

export const saveSubmission = async (submission: OnboardingSubmission): Promise<void> => {
  let supabaseSuccess = false;
  
  if (hasSupabase) {
    try {
      const { error } = await supabase
        .from('onboarding_submissions')
        .insert([
          {
            id: submission.id,
            data: submission.data,
            status: submission.status,
            product_statuses: submission.productStatuses || {},
            created_at: submission.createdAt,
            updated_at: submission.updatedAt,
          }
        ]);
        
      if (error) {
        console.error('Supabase insert error (falling back to local):', error);
      } else {
        supabaseSuccess = true;
      }
    } catch (e) {
      console.error('Supabase connection error (falling back to local):', e);
    }
  } 
  
  // Best-effort local backup. Read-only filesystems (e.g. Vercel) will fail here;
  // that must not fail the request when Supabase already has the record.
  try {
    ensureDataFileExists();
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const submissions: OnboardingSubmission[] = JSON.parse(fileContent || '[]');

    // Prevent duplicates
    const existingIdx = submissions.findIndex(s => s.id === submission.id);
    if (existingIdx !== -1) {
      submissions[existingIdx] = submission;
    } else {
      submissions.push(submission);
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
  } catch (e) {
    if (!supabaseSuccess) throw e;
    console.error('Local backup write failed (Supabase already succeeded):', e);
  }
};

export const getSubmissions = async (): Promise<OnboardingSubmission[]> => {
  let submissions: OnboardingSubmission[] = [];

  // Read from local JSON fallback first if it exists
  if (fs.existsSync(DATA_FILE)) {
    try {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
      const localSubmissions = JSON.parse(fileContent || '[]');
      if (Array.isArray(localSubmissions)) {
        submissions = [...localSubmissions];
      }
    } catch (e) {
      console.error('Failed to read local submissions', e);
    }
  }

  // Then fetch from Supabase if available
  if (hasSupabase) {
    const { data, error } = await supabase
      .from('onboarding_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const sbSubmissions: OnboardingSubmission[] = data.map((row: any) => ({
        id: row.id,
        data: row.data,
        status: row.status,
        productStatuses: row.product_statuses,
        admin_meta: row.admin_meta || {},
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
      
      // Combine avoiding duplicates (prefer newest by updatedAt)
      const sbMap = new Map(sbSubmissions.map(s => [s.id, s]));
      submissions = submissions.map(localSub => {
        const sbSub = sbMap.get(localSub.id);
        if (sbSub) {
          sbMap.delete(localSub.id);
          const localTime = new Date(localSub.updatedAt || localSub.createdAt || 0).getTime();
          const sbTime = new Date(sbSub.updatedAt || sbSub.createdAt || 0).getTime();
          return localTime > sbTime ? localSub : sbSub;
        }
        return localSub;
      });
      submissions.push(...sbMap.values());
    } else if (error) {
      console.error('Supabase fetch error:', JSON.stringify(error, null, 2));
    }
  }

  return submissions;
};

export const updateSubmission = async (id: string, updates: Partial<OnboardingSubmission>): Promise<void> => {
  let supabaseSuccess = false;

  if (hasSupabase) {
    try {
      const { error } = await supabase
        .from('onboarding_submissions')
        .update({
          ...(updates.status ? { status: updates.status } : {}),
          ...(updates.admin_meta ? { admin_meta: updates.admin_meta } : {}),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
        
      if (error) {
        console.error('Supabase update error (falling back to local):', error);
      } else {
        supabaseSuccess = true;
      }
    } catch (e) {
      console.error('Supabase connection error (falling back to local):', e);
    }
  } 

  // Fetch from the combined source so we don't fail if it's only in Supabase
  let allSubmissions = await getSubmissions();
  const existing = allSubmissions.find(s => s.id === id);

  if (!existing) {
    console.error('Local update failed: Submission not found in any storage.');
    if (!supabaseSuccess) throw new Error('Submission not found in any storage.');
    return;
  }

  // Best-effort local backup; must not fail the request if Supabase already succeeded.
  try {
    ensureDataFileExists();

    // Deep merge admin_meta if present
    const newAdminMeta = updates.admin_meta
      ? { ...(existing.admin_meta || {}), ...updates.admin_meta }
      : existing.admin_meta;

    const updatedSubmission = {
      ...existing,
      ...updates,
      admin_meta: newAdminMeta,
      updatedAt: new Date().toISOString()
    };

    // Read local file just to write back the merged result
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const localSubmissions: OnboardingSubmission[] = JSON.parse(fileContent || '[]');

    const index = localSubmissions.findIndex(s => s.id === id);
    if (index !== -1) {
      localSubmissions[index] = updatedSubmission;
    } else {
      localSubmissions.push(updatedSubmission);
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(localSubmissions, null, 2));
  } catch (e) {
    if (!supabaseSuccess) throw e;
    console.error('Local backup write failed (Supabase already succeeded):', e);
  }
};

export const deleteSubmission = async (id: string): Promise<void> => {
  let supabaseSuccess = false;

  if (hasSupabase) {
    try {
      const { error } = await supabase
        .from('onboarding_submissions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error (falling back to local):', error);
      } else {
        supabaseSuccess = true;
      }
    } catch (e) {
      console.error('Supabase connection error (falling back to local):', e);
    }
  }

  // Best-effort local backup; must not fail the request if Supabase already succeeded.
  try {
    ensureDataFileExists();
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const localSubmissions: OnboardingSubmission[] = JSON.parse(fileContent || '[]');

    const filtered = localSubmissions.filter(s => s.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
  } catch (e) {
    if (!supabaseSuccess) throw e;
    console.error('Local backup write failed (Supabase already succeeded):', e);
  }
};
