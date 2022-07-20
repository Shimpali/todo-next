import axios from 'axios';
import { useEffect, useState } from 'react';
import { default as Todos } from './Todos';

const fetchTodos = async () => {
  const response = await axios.get('/api/todos');
  return response.data;
};

type TodosContainerProps = {
  refreshTodoToken: string;
};

const TodosContainer: React.FC<TodosContainerProps> = ({
  refreshTodoToken
}) => {
  const [todos, setTodos] = useState([]);
  const [completeTodoToken, setCompleteTodoToken] = useState('');

  useEffect(() => {
    fetchTodos().then(todos => setTodos(todos));
  }, [refreshTodoToken, completeTodoToken]);

  const onTodoBlur = async (todoId: string, newTitle: string) => {
    axios.put(`/api/todo/${todoId}`, { title: newTitle });
  };

  const onTodoCompleteToggle = async (todoId: string, isCompleted: boolean) => {
    axios
      .put(`/api/todo/${todoId}`, { isCompleted })
      .finally(() => setCompleteTodoToken(Math.random().toString()));
  };

  const onTodoDelete = async (todoId: string) => {
    axios
      .delete(`/api/todo/${todoId}`)
      .finally(() => setCompleteTodoToken(Math.random().toString()));
  };

  return (
    <>
      <Todos
        todos={todos}
        onTodoBlur={onTodoBlur}
        onTodoCompleteToggle={onTodoCompleteToggle}
        onTodoDelete={onTodoDelete}
      />
    </>
  );
};

export default TodosContainer;
