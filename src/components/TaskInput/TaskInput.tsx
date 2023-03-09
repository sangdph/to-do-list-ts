import { useState } from 'react'
import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: (id: string, name: string) => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props

  const [name, setName] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setName((prev)=>event.target.value})
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo(currentTodo.id, currentTodo.name)
      setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }
  console.log('name', name)
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>Todo list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={handleChange}
        />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}
