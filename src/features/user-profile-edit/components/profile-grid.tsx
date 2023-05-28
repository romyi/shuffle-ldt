import {
  Card,
  Group,
  Indicator,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconCheck, IconPencil } from "@tabler/icons-react";
import { useState } from "react";

export const ProfileGrid = () => {
  const [edit, setedit] = useState(false);
  return (
    <SimpleGrid>
      <Indicator>
        <Card shadow={"sm"} radius="sm" sx={{ cursor: "pointer" }}>
          <Group position="apart">
            <Stack spacing={"0"}>
              {edit && <NumberInput label="ИНН" placeholder="7776372637" />}
              {!edit && (
                <>
                  <Text size={"sm"}>ИНН</Text>
                  <Text color="dimmed">Заполнить</Text>
                </>
              )}
            </Stack>
            {edit && <IconCheck onClick={() => setedit(false)} />}
            {!edit && <IconPencil onClick={() => setedit(true)} />}
          </Group>
        </Card>
      </Indicator>
    </SimpleGrid>
  );
};
