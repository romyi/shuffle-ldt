import { Header, Flex, Image, Text } from "@mantine/core";
import Moscow from "/moscow.svg";

export const MobileHeader = () => {
  return (
    <Header withBorder={false} height={80}>
      <Flex p="md" justify={"left"} align={"center"} gap={"lg"}>
        <Image width={28} src={Moscow} />
        <Text size={"10px"} color="dimmed" maw={"200px"}>
          Департамент инвестиционной и промышленной политики города Москвы
        </Text>
      </Flex>
    </Header>
  );
};
