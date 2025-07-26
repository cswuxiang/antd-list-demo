export interface ListItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  tags: string[];
  createdAt: string;
}