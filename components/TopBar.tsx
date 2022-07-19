import { Flex, Text } from '@chakra-ui/layout';

const TopBar = () => (
  <Flex
    w="100%"
    flexDirection="row"
    alignContent="center"
    p="8px 16px"
    justifyContent="center"
    bg="#091932"
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
  </Flex>
);

export default TopBar;
