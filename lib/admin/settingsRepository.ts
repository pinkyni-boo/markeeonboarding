import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const FORM_SETTINGS_FILE = path.join(DATA_DIR, 'form-settings.json');

const ensureFileExists = (filePath: string, defaultData: any) => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

const defaultSystemSettings = {
  systemName: 'Markee Onboarding',
  displayName: 'Admin Portal',
  supportEmail: 'support@markee.vn',
  supportPhone: '1900 xxxx',
  contactLink: 'https://markee.vn/contact',
  defaultStatus: 'new',
  defaultPriority: 'normal',
  warningDays: 3,
  allowDraft: true,
  introDuration: 5,
  autoSave: true,
  emailNotifications: true,
};

const defaultFormSettings = {
  'markee_chat': {
    isActive: true,
    title: 'Đăng ký Markee Chat',
    description: 'Vui lòng cung cấp thông tin để chúng tôi tích hợp giải pháp Chatbot.',
    steps: 3,
    fields: 15,
    lastUpdated: new Date().toISOString()
  },
  'markee_seeding': {
    isActive: false,
    title: 'Đăng ký Markee Seeding',
    description: 'Chưa cấu hình',
    steps: 0,
    fields: 0,
    lastUpdated: null
  },
  'markee_app': {
    isActive: false,
    title: 'Đăng ký Markee App',
    description: 'Chưa cấu hình',
    steps: 0,
    fields: 0,
    lastUpdated: null
  }
};

export const getSystemSettings = () => {
  ensureFileExists(SETTINGS_FILE, defaultSystemSettings);
  const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
  return JSON.parse(content || '{}');
};

export const updateSystemSettings = (updates: any) => {
  const current = getSystemSettings();
  const next = { ...current, ...updates };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(next, null, 2));
  return next;
};

export const getFormSettings = () => {
  ensureFileExists(FORM_SETTINGS_FILE, defaultFormSettings);
  const content = fs.readFileSync(FORM_SETTINGS_FILE, 'utf-8');
  return JSON.parse(content || '{}');
};

export const updateFormSettings = (product: string, updates: any) => {
  const current = getFormSettings();
  if (!current[product]) {
    current[product] = { ...defaultFormSettings[product as keyof typeof defaultFormSettings] };
  }
  current[product] = {
    ...current[product],
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(FORM_SETTINGS_FILE, JSON.stringify(current, null, 2));
  return current;
};
