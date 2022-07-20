import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';

type CreateToDoProps = {
  onTodoCreated: () => void;
};

const CreateToDo: React.FC<CreateToDoProps> = ({ onTodoCreated }) => {
  const [title, setTitle] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onCreate = () => {
    setLoading(true);
    axios
      .post('/api/todo', {
        title
      })
      .then(() => {
        onTodoCreated();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Flex flexDirection="column" py="16px">
      <Heading size="md" mb="20px">
        Create Todo
      </Heading>
      <Flex>
        <Input
          placeholder="Something to do..."
          onChange={e => setTitle(e.target.value)}
        />
        <IconButton
          icon={<AddIcon />}
          variant="solid"
          color="#172331"
          aria-label="Create todo"
          ml="4px"
          onClick={onCreate}
          isLoading={isLoading}
        />
      </Flex>
    </Flex>
  );
};

export default CreateToDo;
