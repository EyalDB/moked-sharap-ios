// Call History Record
export interface CallRecord {
  id: string;
  timestamp: number;
  contactName: string;
  contactNumber: string;
}

// App Settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  enableVibration: boolean;
}

// Service Info
export interface ServiceInfo {
  name: string;
  phone: string;
  description: string;
  hours: string;
  address?: string;
  services: string[];
}
