export interface Task {
  id: number;
  title: string;
  category: string;
  dueDate: string;
  repeat: string;
  price: number | null;
  note: string | null;
  createdAt: string;
}

export interface PaymentHistoryItem {
  id: number;
  taskId: number | null;
  title: string;
  category: string;
  price: number | null;
  paidAt: string;
  originalDueDate: string | null;
  repeat: string | null;
  note: string | null;
}
