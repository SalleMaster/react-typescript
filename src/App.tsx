import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { Todo } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

// let name: string
// let age: number | string
// let student: boolean
// let hobbies: string[]
// let role: [number, string]

// let printName: (name: string) => void // returns undefined
// let printName2: (name: string) => never // returns nothing

// interface Person {
//   name: string
//   age?: number
// }

// type Person = {
//   name: string
//   age?: number
// }

// let person: Person = {
//   name: 'Salle',
// }

// let lotsOfPeaple: Person[]

// let personName: unknown

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])

      setTodo('')
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    console.log(result)

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    let add
    let active = todos
    let complete = completedTodos
    // Source Logic
    if (source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    // Destination Logic
    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
