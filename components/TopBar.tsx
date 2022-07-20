import { Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';

const TopBar = () => {
  const { status } = useSession();

  return (
    <Flex
      w="100%"
      flexDirection="row"
      alignContent="center"
      p="8px 16px"
      justifyContent="center"
      bg="#172331"
    >
      <Flex
        w={['100%', '100%', '100%', '90ch']}
        flexDirection="row"
        alignContent="center"
      >
        <Text
          fontSize="32px"
          fontWeight="bold"
          lineHeight="42px"
          color="#eef2f7"
          flexGrow={1}
        >
          ToDo App
        </Text>
      </Flex>
      {status === 'authenticated' && (
        <Flex marginLeft="82px">
          <Button
            variant="solid"
            bg="#eef2f7"
            color="#172331"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default TopBar;
