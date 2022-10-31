export interface Task {
  id: number;
  name: string;
  deadline: string;
  priority: string;
  description: string;
  tags: string[];
  done: boolean;
}
