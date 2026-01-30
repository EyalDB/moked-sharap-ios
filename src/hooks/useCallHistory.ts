import { useLocalStorage } from './useLocalStorage';
import { CallRecord } from '@/types';

const STORAGE_KEY = 'moked_sharap_call_history';
const MAX_HISTORY_ITEMS = 100;

export function useCallHistory() {
  const [history, setHistory] = useLocalStorage<CallRecord[]>(STORAGE_KEY, []);

  // Add a new call record
  const addCall = (contactName: string, contactNumber: string) => {
    const newRecord: CallRecord = {
      id: `call_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      timestamp: Date.now(),
      contactName,
      contactNumber,
    };

    setHistory(prev => {
      const updated = [newRecord, ...prev];
      // Keep only the last MAX_HISTORY_ITEMS
      return updated.slice(0, MAX_HISTORY_ITEMS);
    });

    return newRecord;
  };

  // Delete a specific call record
  const deleteCall = (id: string) => {
    setHistory(prev => prev.filter(record => record.id !== id));
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
  };

  // Get calls grouped by date
  const getCallsByDate = () => {
    const groups: { [date: string]: CallRecord[] } = {};

    history.forEach(record => {
      const date = new Date(record.timestamp).toLocaleDateString('he-IL');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(record);
    });

    return groups;
  };

  return {
    history,
    addCall,
    deleteCall,
    clearHistory,
    getCallsByDate,
    totalCalls: history.length,
  };
}
