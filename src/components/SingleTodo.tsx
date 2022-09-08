import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdFileDownloadDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  index: number
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDone = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, isDone: true } : t)))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id && t))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(todos.map((t) => (t.id === id ? { ...t, todo: editTodo } : t)))
    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className='todos__single'
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className='todos__single--text'
            />
          ) : todo.isDone ? (
            <s className='todos__single--text'>{todo.todo}</s>
          ) : (
            <span className='todos__single--text'>{todo.todo}</span>
          )}

          <div>
            <span
              className='icon'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit)
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className='icon' onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className='icon' onClick={() => handleDone(todo.id)}>
              <MdFileDownloadDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
