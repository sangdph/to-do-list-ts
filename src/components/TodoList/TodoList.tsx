import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import { Todo } from '../../@types/todo.type'
import styles from './todoList.module.scss'
import { useEffect, useState } from 'react'
interface HandleNewTodos {
  (todos: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const doneTodos = todos.filter((todo) => todo.done)
  const notdoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])
  const addTodo = (name: string) => {
    const handler = (todoObj: Todo[]) => {
      return [...todoObj, todo]
    }
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  const startCurrentTodo = (id: string) => {
    const currentTodo = todos.find((itemTodo: Todo) => itemTodo.id === id)
    if (currentTodo) {
      setCurrentTodo(currentTodo)
    }
  }

  const editTodo = (name: string) => {
    // setTodos(
    //   todos.map((item: Todo) => {
    //     if (item.id === id) return { ...item, name: name }
    //     return item
    //   })
    // )

    console.log('hahahahaha')
    setCurrentTodo((pre) => {
      if (pre) {
        return {
          ...pre,
          name: name
        }
      }
      return null
    })
  }

  const finishEditTodo = (id: string, name: string) => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((item: Todo) => {
        if (item.id === id) return { ...item, name: name }
        return item
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    syncReactToLocal(handler)
  }
  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    }
    setTodos(handler)

    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.filter((todo) => todo.id !== id)
    }
    if (currentTodo) {
      setCurrentTodo(null)
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }
  console.log(todos)
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          todos={notdoneTodos}
          handleDoneTodo={handleDoneTodo}
          startCurrentTodo={startCurrentTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startCurrentTodo={startCurrentTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
