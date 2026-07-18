export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  date: string;
  due: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
}
