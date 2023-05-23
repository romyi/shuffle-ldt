import { Container, MultiSelect, Switch, Tabs } from "@mantine/core";
import { IconApi, IconDashboard } from "@tabler/icons-react";

export const Profile = () => {
  return (
    <Container size={"xl"}>
      <Tabs>
        <Tabs.List>
          <Tabs.Tab value="common" icon={<IconApi />}>
            Общие
          </Tabs.Tab>
          <Tabs.Tab value="specifig" icon={<IconDashboard />}>
            Специальные
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Switch
        styles={{ body: { alignItems: "center" } }}
        size={"md"}
        label="Подсказки"
        description="Помогаем освоиться в интерфейсе"
      />
      <MultiSelect
        searchable
        labelProps={{
          size: "md",
          mb: "xs",
        }}
        size={"md"}
        label="Оборудование"
        data={["Маслобойка", "Барабан", "Фрезер"]}
      />
    </Container>
  );
};
