import { Card, CardContent, CardHeader, Stack, Typography, Checkbox } from "@mui/material";
import { KanbanListProps, KanbanItemProps } from "../../types/Kanban.interface";
import { Droppable, Draggable, TypeId } from "react-beautiful-dnd";
import CardAddition from "./CardAddition";

const ITEM_DROPPABLE_TYPE: TypeId = "item";

export function KanbanItem({ card, index }: KanbanItemProps) {
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center"
              {...provided.dragHandleProps}
            >
              <Checkbox />
              <Typography variant="h6">{card.content}</Typography>
            </Stack>
          </CardContent>
        </Card >)}
    </Draggable>
  );
}

export function KanbanList({ cards, column, index, handleAddition }: KanbanListProps) {
  return (
    <Draggable draggableId={`column-${column.id}`} index={index}>
      {(provided) => (
        <Card variant="outlined" sx={{ bgcolor: 'grey.200', width: 300, height: 'fit-content' }}
          ref={provided.innerRef}
          {...provided.draggableProps} {...provided.dragHandleProps}
        >
          <CardHeader title={column.title} sx={{ bgcolor: '#042344', color: 'white'}} />
          <Droppable droppableId={String(column.id)} direction='vertical' type={ITEM_DROPPABLE_TYPE}>
            {(provided) => (
              <CardContent {...provided.droppableProps}
              >
                <Stack spacing={2} ref={provided.innerRef}>
                  {cards.map((card, idx) => (
                    <KanbanItem key={card.id} card={card} index={idx} />
                  ))}
                  {provided.placeholder}
                </Stack>
                <CardAddition columnId={column.id} handleAddition={handleAddition} />
              </CardContent>
            )}
          </Droppable>
        </Card>
      )}
    </Draggable>
  );
}
