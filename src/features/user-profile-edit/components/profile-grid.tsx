import { SMALL_SCREEN_EXTENT } from "@const";
import {
  Card,
  createStyles,
  Group,
  LoadingOverlay,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { keys, updateUser } from "@network/index";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@tyles/user";
import { useState } from "react";

const inputclasses = createStyles({
  label: {
    marginBottom: "12px",
  },
});

const Field: React.FC<{
  field: string | undefined;
  label: string;
  attr: string;
  isNumber?: boolean;
}> = ({ field, label, attr, isNumber }) => {
  const { classes } = inputclasses();
  const client = useQueryClient();
  const [edit, setedit] = useState(false);
  const [value, setValue] = useState(isNumber ? 0 : field || "");
  const update = useMutation(updateUser, {
    onSettled: () => {
      client.invalidateQueries({ queryKey: keys.user.me().queryKey });
      notifications.show({
        sx: { marginTop: "48px" },
        message: "Данные успешно обновлены",
        color: "pink",
        icon: <IconCheck size={16} stroke={1.5} />,
        autoClose: 4000,
      });
    },
  });
  return (
    <Card
      // shadow={"sm"}
      radius="sm"
      sx={{ cursor: "pointer", position: "relative" }}
    >
      <LoadingOverlay visible={update.isLoading} />
      <Group position="apart" align={"flex-end"} noWrap>
        <Stack sx={{ flexGrow: 1 }} spacing={"16px"}>
          {edit &&
            (isNumber ? (
              <NumberInput
                classNames={{ label: classes.label }}
                maxLength={12}
                label={label}
                onChange={setValue}
                placeholder=""
              />
            ) : (
              <TextInput
                value={value}
                classNames={{ label: classes.label }}
                onChange={(event) => setValue(event.currentTarget.value)}
                label={label}
              />
            ))}
          {!edit && (
            <>
              <Text size={"sm"}>{label}</Text>
              <Text maw="140px" truncate color="dimmed">
                {field || "Заполнить"}
              </Text>
            </>
          )}
        </Stack>
        {edit && (
          <Group noWrap>
            <IconCheck
              onClick={() => {
                update.mutate({ [attr]: value });
                setedit(false);
              }}
            />
            <IconX onClick={() => setedit(false)} />
          </Group>
        )}
        {!edit && (
          <IconPencil
            onClick={() => {
              setedit(true);
            }}
          />
        )}
      </Group>
    </Card>
  );
};

export const ProfileGrid: React.FC<{ data: User }> = ({ data }) => {
  const small = useMediaQuery(SMALL_SCREEN_EXTENT);
  return (
    <SimpleGrid
      spacing={"sm"}
      cols={small ? 1 : 2}
      mt="xl"
      sx={{ gridColumn: "1/3" }}
    >
      <Field label="Почта" field={data?.email} attr={"email"} />
      <Field label="ИНН" isNumber field={data?.taxId} attr={"taxId"} />
      <Field label="Имя" field={data?.name} attr={"name"} />
      <Field label="Фамилия" field={data?.surname} attr={"surname"} />
    </SimpleGrid>
  );
};
