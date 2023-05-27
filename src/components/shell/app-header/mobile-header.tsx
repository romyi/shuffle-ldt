import { Logo } from "@components/ui-containers";
import { Header, Image, Container, Group, createStyles } from "@mantine/core";
import Moscow from "/moscow.svg";

const headerClasses = createStyles({
  root: {
    background:
      "linear-gradient(180deg, #FFFFFF 40.16%, rgba(255, 255, 255, 0) 666.39%);",
  },
});

export const MobileHeader = () => {
  const { classes } = headerClasses();
  return (
    <Header classNames={{ root: classes.root }} withBorder={false} height={100}>
      <Container>
        <Group noWrap spacing="63px" position="apart" align="top">
          <Logo />
          <Image width={28} src={Moscow} />
        </Group>
      </Container>
    </Header>
  );
};
