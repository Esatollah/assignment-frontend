import { Box, Stack, Button } from "@mui/material";
import { useState } from "react";
import INITIAL_DATA, {INITIAL_MOCK_DATA} from "./db/mockData";
import { KanbanData } from "../types/Kanban.interface";
import { KanbanList } from "./components/KanbanElements";
import { DragDropContext, DropResult, Droppable, TypeId } from "react-beautiful-dnd";
import ColumnAddition from "./components/ColumnAddition";


const initialData = INITIAL_MOCK_DATA;
const COLUMN_DROPPABLE_TYPE: TypeId = "column";
    

export function Kanban() {

  const [data, setData] = useState<KanbanData>(initialData);

  const onDragEnd = (result: DropResult) => {
    const {destination, source, draggableId, type} = result;

    if (!destination) {
      return;
    }
     
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

    if (startingColumns === finishingColumns) {
      const newTaskIds = Array.from(startingColumns.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, Number(draggableId));

      const newColumn = {
        ...startingColumns,
        taskIds: newTaskIds,
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

    const startTaskIds = Array.from(startingColumns.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startingColumns,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishingColumns.taskIds);
    finishTaskIds.splice(destination.index, 0, Number(draggableId));
    const newFinishColumn = {
      ...finishingColumns,
      taskIds: finishTaskIds,
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
    const currentTasks = data.tasks;
    for (var key in currentTasks) {
      currentIds.push(currentTasks[key].id);
    };
    const newMaxId = currentIds.length === 0 ? 1 : Math.max(...currentIds) + 1;

    const newTask = {
      id: newMaxId,
      content: content,
    };

    const newTaskIds = data.columns[`column-${columnId}`].taskIds;
    newTaskIds.push(newMaxId);
    const newColumn = {
      ...data.columns[`column-${columnId}`],
      taskIds: newTaskIds,
    };

    setData(previousData => {
      const newData = {
      ...previousData,
      tasks: {...previousData.tasks, [`task-${newMaxId}`]: newTask},
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
      taskIds: [],
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
      const tasks = column?.taskIds.map((taskId) => data.tasks[`task-${taskId}`]);
      return (
        <KanbanList key={column?.id} 
        column={column} tasks={tasks} index={idx} handleAddition={handleCardAddition} />
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
