export interface Habit {
    id: string;
  
    title: string;
  
    category: string;
  
    completed: boolean;
  
    streak: number;
  
    color?: string;
  
    reminder_time?: string;
  
    target_days?: number;
  
    archived?: boolean;
  
    created_at?: string;
  }