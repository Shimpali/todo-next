import { Todo } from '.prisma/client';
import { DeleteIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, Heading, IconButton, Input } from '@chakra-ui/react';

type TodosProps = {
  todos: Todo[];
  onTodoBlur: (todoId: string, newTitle: string) => Promise<void>;
  onTodoCompleteToggle: (todoId: string, isCompleted: boolean) => Promise<void>;
  onTodoDelete: (todoId: string) => Promise<void>;
};

const Todos: React.FC<TodosProps> = ({
  todos,
  onTodoBlur,
  onTodoCompleteToggle,
  onTodoDelete
}) => {
  return (
    <>
      <Heading size="md" mb="16px" mt="24px">
        Todos
      </Heading>
      {todos?.length &&
        todos.map(todo => (
          <Flex key={todo.id} my="4px" role="group" w={'100%'}>
            <Input
              defaultValue={todo.title}
              variant="unstyled"
              readOnly={todo.isCompleted}
              textDecoration={todo.isCompleted ? 'line-through' : 'none'}
              color={todo.isCompleted ? 'gray.500' : 'gray.200'}
              onBlur={event => {
                if (todo.title === event.target.value) {
                  return;
                }
                onTodoBlur(todo.id, event.target.value);
              }}
            />
            <Checkbox
              colorScheme="gray.900"
              isChecked={todo.isCompleted}
              onChange={e => onTodoCompleteToggle(todo.id, e.target.checked)}
            />
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete todo"
              variant="ghost"
              colorScheme="red"
              size="sm"
              onClick={() => onTodoDelete(todo.id)}
              ml="8px"
              opacity={0}
              visibility={todo?.isCompleted ? 'hidden' : 'visible'}
            />
          </Flex>
        ))}
    </>
  );
};

export default Todos;
