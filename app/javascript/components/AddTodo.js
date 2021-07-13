import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiSend } from 'react-icons/fi'

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1e90ff;
  color: #fff;
  text-align: center;
  cursor:pointer ;
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: default;
  `}
`

toast.configure()

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

function AddTodo(props) {
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false
  }

  const [todo, setTodo] = useState(initialTodoState)

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value })
  }

  const notify = () => {
    toast.success('Todoが作成できました', {
      position: 'bottom-center',
      hideProgressBar: true
    })
  }

  const saveTodo = () => {
    var data = {
      name: todo.name
    }

    axios.post('/api/v1/todos', data)
    .then(resp => {
      setTodo({
        id: resp.data.id,
        name: resp.name,
        is_completed: resp.data.is_completed
      })
      notify()
      props.history.push('/todos')
    })
    .catch(e => {
      console.log(e)
    })
  }
  return (
    <div>
      AddTodo
    </div>
  )
}

export default AddTodo
