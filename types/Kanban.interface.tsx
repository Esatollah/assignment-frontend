export interface KanbanCard {
  id: number;
  content: string;
}

export interface KanbanColumn {
  id: number;
  title: string;
  cardIds: number[];
}

export interface KanbanData {
  cards: {
    [key: string]: KanbanCard;
  };
  columns: {
    [key: string]: KanbanColumn;
  };
  columnOrder: string[];
}

export interface KanbanListProps {
  cards: KanbanCard[];
  column: KanbanColumn;
  index: number;
  handleAddition: (columnId: number, content: string) => void;
}

export interface KanbanItemProps {
  card: KanbanCard;
  index: number;
}


export default KanbanData;
