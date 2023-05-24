import { createStyles, TextInput } from "@mantine/core";

const inputClasses = createStyles({
  input: {
    border: "white",
    textAlign: "center",
  },
});

export const EmailFetch = () => {
  const { classes } = inputClasses();
  return (
    <TextInput
      size={"xl"}
      classNames={classes}
      placeholder="example@moscow.ru"
    />
  );
};
