import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialColumns = {
  todo: {
    name: 'To Do',
    items: [
      { id: '1', content: 'Write specs' },
      { id: '2', content: 'Plan design' },
    ],
  },
  inProgress: {
    name: 'In Progress',
    items: [
      { id: '3', content: 'Develop UI' },
    ],
  },
  done: {
    name: 'Done',
    items: [
      { id: '4', content: 'Initial setup' },
    ],
  },
};

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('todo');

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];

    const [movedItem] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destCol,
        items: destItems,
      },
    });
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newId = Date.now().toString();
    setColumns({
      ...columns,
      [selectedColumn]: {
        ...columns[selectedColumn],
        items: [...columns[selectedColumn].items, { id: newId, content: newTask }],
      },
    });
    setNewTask('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>

      <div className="flex gap-4 mb-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
          className="p-2 border rounded"
        />
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(columns).map((colKey) => (
            <option key={colKey} value={colKey}>
              {columns[colKey].name}
            </option>
          ))}
        </select>
        <button onClick={addTask} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(columns).map(([colId, col]) => (
            <div key={colId} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-3">{col.name}</h2>
              <Droppable droppableId={colId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[100px] space-y-2"
                  >
                    {col.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 bg-gray-100 dark:bg-gray-700 rounded shadow"
                            style={{
                              ...provided.draggableProps.style, // ✅ this enables dragging animation!
                              backgroundColor: snapshot.isDragging ? '#cbd5e1' : '',
                            }}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;