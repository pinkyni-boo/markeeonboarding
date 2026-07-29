import fs from 'fs';
import path from 'path';
import { Member } from '@/types/member';

const dataFile = path.join(process.cwd(), 'data', 'members.json');

// Helper to init file if not exists
const initData = () => {
  if (!fs.existsSync(dataFile)) {
    // Add some mock data for testing
    const mockData: Member[] = [
      {
        id: 'member_1',
        fullName: 'Nguyễn Văn Admin',
        email: 'admin@markee.vn',
        role: 'admin',
        department: 'dev',
        status: 'active',
        canReceiveOnboarding: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'member_2',
        fullName: 'Trần Thị Sales',
        email: 'sales@markee.vn',
        role: 'sales',
        department: 'sales',
        status: 'active',
        canReceiveOnboarding: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
    fs.writeFileSync(dataFile, JSON.stringify(mockData, null, 2), 'utf-8');
  }
};

export const getMembers = async (): Promise<Member[]> => {
  initData();
  const fileContent = fs.readFileSync(dataFile, 'utf-8');
  try {
    return JSON.parse(fileContent) as Member[];
  } catch (e) {
    return [];
  }
};

export const saveMembers = async (members: Member[]): Promise<void> => {
  fs.writeFileSync(dataFile, JSON.stringify(members, null, 2), 'utf-8');
};

export const getMemberById = async (id: string): Promise<Member | undefined> => {
  const members = await getMembers();
  return members.find(m => m.id === id);
};

export const createMember = async (member: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Promise<Member> => {
  const members = await getMembers();
  const newMember: Member = {
    ...member,
    id: `member_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  members.push(newMember);
  await saveMembers(members);
  return newMember;
};

export const updateMember = async (id: string, updates: Partial<Member>): Promise<Member | undefined> => {
  const members = await getMembers();
  const index = members.findIndex(m => m.id === id);
  if (index === -1) return undefined;
  
  members[index] = {
    ...members[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await saveMembers(members);
  return members[index];
};

export const deleteMember = async (id: string): Promise<boolean> => {
  const members = await getMembers();
  const index = members.findIndex(m => m.id === id);
  if (index === -1) return false;
  
  members.splice(index, 1);
  await saveMembers(members);
  return true;
};
