import { Button, Center, Container, Flex, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { CreateToDo, TodosContainer, TopBar } from '../components';
import styles from '../styles/ToDoPage.module.css';

import { UserSession } from './api/auth/[...nextauth]';

const ToDoPage = ({ session }: { session: UserSession }) => {
  const [refreshTodoToken, setRefreshTodoToken] = useState<string>('');

  return (
    <div className={styles.container}>
      <TopBar />
      <Container py="64px">
        <Center>
          <Flex flexDirection="column">
            <Text mb="24px">👋 Hello {session?.user?.name}</Text>

            <CreateToDo
              onTodoCreated={() =>
                setRefreshTodoToken(Math.random().toString())
              }
            />
            <TodosContainer refreshTodoToken={refreshTodoToken} />
          </Flex>
        </Center>
      </Container>
    </div>
  );
};

export default ToDoPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      session
    }
  };
};
