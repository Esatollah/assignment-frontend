import { Box, Stack, Button } from "@mui/material";
import { useState } from "react";
import INITIAL_MOCK_DATA from "./db/mockData";
import { KanbanData } from "../types/Kanban.interface";
import { KanbanList } from "./components/KanbanElements";
import { DragDropContext, DropResult, Droppable, TypeId } from "react-beautiful-dnd";
import ColumnAddition from "./components/ColumnAddition";

const INITIAL_STATE: KanbanData = {
  "cards": {
  },
  "columns": {
  },

  "columnOrder": []
}
const COLUMN_DROPPABLE_TYPE: TypeId = "column";

//use INITIAL_MOCK_DATA for testing
const initialData = INITIAL_STATE;
    

export function Kanban() {

  const [data, setData] = useState<KanbanData>(initialData);

  const onDragEnd = (result: DropResult) => {
    const {destination, source, draggableId, type} = result;

    if (!destination) {
      return;
    }
     
     // reorder columns
    if (type === COLUMN_DROPPABLE_TYPE) {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, `${draggableId}`);
      setData(prevData => {
        const newData = {
        ...prevData,
        columnOrder: newColumnOrder
        }
        return newData;
      });
      return;
    }

    if (destination.droppableId === source.droppableId 
        && destination.index === source.index) {
        return;
    }

    const startingColumns = data.columns[`column-${source.droppableId}`];
    const finishingColumns = data.columns[`column-${destination.droppableId}`];

    //reorder tasks/cards within the same column
    if (startingColumns === finishingColumns) {
      const newCardIds = Array.from(startingColumns.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, Number(draggableId));

      const newColumn = {
        ...startingColumns,
        cardIds: newCardIds,
      };

      setData(previousData => ({
        ...previousData,
        columns: {
          ...previousData.columns,
          [`column-${newColumn.id}`]: newColumn,
        },
      }))
      return;
    }

    //move tasks/cards to another column
    const startCardIds = Array.from(startingColumns.cardIds);
    startCardIds.splice(source.index, 1);
    const newStartColumn = {
      ...startingColumns,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishingColumns.cardIds);
    finishCardIds.splice(destination.index, 0, Number(draggableId));
    const newFinishColumn = {
      ...finishingColumns,
      cardIds: finishCardIds,
    };

    setData(previousData => ({
      ...previousData,
      columns: {
      ...previousData.columns,
      [`column-${newStartColumn.id}`]: newStartColumn,
      [`column-${newFinishColumn.id}`]: newFinishColumn,
      },
    }))
  }

  const handleCardAddition = (columnId: number, content: string) => {

    const currentIds: number[] = [];
    const currentCards = data.cards;
    for (var key in currentCards) {
      currentIds.push(currentCards[key].id);
    };
    const newMaxId = currentIds.length === 0 ? 1 : Math.max(...currentIds) + 1;

    const newCard = {
      id: newMaxId,
      content: content,
    };

    const newTaskIds = data.columns[`column-${columnId}`].cardIds;
    newTaskIds.push(newMaxId);
    const newColumn = {
      ...data.columns[`column-${columnId}`],
      cardIds: newTaskIds,
    };

    setData(previousData => {
      const newData = {
      ...previousData,
      cards: {...previousData.cards, [`card-${newMaxId}`]: newCard},
      columns: {
        ...previousData.columns,
        [`column-${newColumn.id}`]: newColumn,
      },
    }
    return newData;
    })
  }

  const handleColumnAddition = (content: string) => {
    const currentIds: number[] = [];
    const currentColumns = data.columns;
    for (var key in currentColumns) {
      currentIds.push(currentColumns[key].id);
    };
    const newMaxId = currentIds.length === 0 ? 1 : Math.max(...currentIds) + 1;

    const newColumn = {
      id: newMaxId,
      title: content,
      cardIds: [],
    };

    const newColumnOrder = data.columnOrder;
    newColumnOrder.push(`column-${newMaxId}`);

    setData(previousData => {
      const newData = {
      ...previousData,
      columns: {...previousData.columns, [`column-${newMaxId}`]: newColumn},
      columnOrder: newColumnOrder,
    }
    return newData;
    })
  }
    

  const orderedKanbanLists = 
    data.columnOrder.map((columnId, idx) => {
      const column = data.columns[columnId];
      const cards = column?.cardIds.map((cardId) => data.cards[`card-${cardId}`]);
      return (
        <KanbanList key={column?.id} 
        column={column} cards={cards} index={idx} handleAddition={handleCardAddition} />
      );
    }) 


  return (
      <Box sx={{paddingBottom: 4}}>
        <DragDropContext onDragEnd={onDragEnd}>
         <Droppable droppableId="KanbanLists" direction="horizontal" type={COLUMN_DROPPABLE_TYPE}>
            {(provided) => (
              <Stack spacing={2} margin={5} direction="row"
              ref={provided.innerRef}
                {...provided.droppableProps}
                >
                {
                  orderedKanbanLists
                }
                {provided.placeholder}
                <ColumnAddition handleAddition={handleColumnAddition} />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
  );
}

export default Kanban;
