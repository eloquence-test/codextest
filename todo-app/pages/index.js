import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Home() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetch('/api/todos').then(res => res.json()).then(setItems);
  }, []);

  const addItem = async () => {
    if (!title) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) })
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setTitle('');
    setTags('');
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
    for (let i=0; i<reordered.length; i++) {
      const it = reordered[i];
      await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...it, position: i })
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>To-Do List</h1>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task" />
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tag1,tag2" />
      <button onClick={addItem}>Add</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((it, index) => (
                <Draggable key={it.id} draggableId={String(it.id)} index={index}>
                  {(prov) => (
                    <li ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                      {it.title} [{it.tags.join(', ')}]
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
