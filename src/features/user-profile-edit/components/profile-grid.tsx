import {
  Card,
  Group,
  LoadingOverlay,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { keys, updateUser } from "@network/index";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@tyles/user";
import { useState } from "react";

const Field: React.FC<{
  field: string | undefined;
  label: string;
  attr: string;
  isNumber?: boolean;
}> = ({ field, label, attr, isNumber }) => {
  const client = useQueryClient();
  const [edit, setedit] = useState(false);
  const [value, setValue] = useState(isNumber ? 0 : field || "");
  const update = useMutation(updateUser, {
    onSettled: () =>
      client.invalidateQueries({ queryKey: keys.user.me().queryKey }),
  });
  return (
    <Card
      shadow={"sm"}
      radius="sm"
      sx={{ cursor: "pointer", position: "relative" }}
    >
      <LoadingOverlay visible={update.isLoading} />
      <Group position="apart">
        <Stack spacing={"16px"}>
          {edit &&
            (isNumber ? (
              <NumberInput label={label} onChange={setValue} placeholder="" />
            ) : (
              <TextInput
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                label={label}
              />
            ))}
          {!edit && (
            <>
              <Text size={"sm"}>{label}</Text>
              <Text color="dimmed">{field || "Заполнить"}</Text>
            </>
          )}
        </Stack>
        {edit && (
          <Group>
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
  return (
    <SimpleGrid>
      <Field label="Почта" field={data?.email} attr={"email"} />
      <Field label="ИНН" isNumber field={data?.taxId} attr={"taxId"} />
      <Field label="Имя" field={data?.name} attr={"name"} />
      <Field label="Фамилия" field={data?.surname} attr={"surname"} />
    </SimpleGrid>
  );
};
