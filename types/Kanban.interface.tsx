export interface KanbanTask {
  id: number;
  content: string;
}

export interface KanbanColumn {
  id: number;
  title: string;
  taskIds: number[];
}

export interface KanbanData {
  tasks: {
    [key: string]: KanbanTask;
  };
  columns: {
    [key: string]: KanbanColumn;
  };
  columnOrder: string[];
}

export interface KanbanListProps {
  tasks: KanbanTask[];
  column: KanbanColumn;
  index: number;
  handleAddition: (columnId: number, content: string) => void;
}

export interface KanbanItemProps {
  task: KanbanTask;
  index: number;
}


export default KanbanData;
