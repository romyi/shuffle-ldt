import { Button, Card, Stack, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Calculation } from "@tyles/calculation";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useCalculationMatch } from "../hooks";

type IndicatorCardProps = {
  url: string;
  showOn: Array<Partial<keyof Calculation>> | null;
  contentOn: Array<Partial<keyof Calculation>>;
  children: React.ReactNode;
  follower?: string;
};

export const IndicatorCard: React.FC<IndicatorCardProps> = ({
  url,
  showOn,
  contentOn,
  children,
  follower,
}) => {
  const matched = useMatch(url);
  const show = useCalculationMatch(showOn);
  const renderChild = useCalculationMatch(contentOn);
  const navigate = useNavigate();
  if (show) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 400 }}
          transition={{ duration: 0.6 }}
          animate={{ y: 0 }}
          exit={{ y: 400 }}
        >
          <Card
            miw={180}
            withBorder={Boolean(matched?.pathname)}
            h={140}
            shadow={matched?.pathname ? "xl" : "xs"}
            radius="md"
            padding={"md"}
            onClick={() => navigate(url)}
          >
            {renderChild ? (
              children
            ) : matched ? (
              <Stack align={"center"}>
                <Button
                  leftIcon={<IconInfoCircle />}
                  color={"gray"}
                  size="xs"
                  mt="36px"
                  variant={"outline"}
                >
                  Справка
                </Button>
              </Stack>
            ) : (
              <Stack align={"center"}>
                <Text ta="center" size="xs">
                  {follower}
                </Text>

                <Button color={"cyan"} size="xs" variant={"outline"}>
                  Перейти
                </Button>
              </Stack>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    );
  } else {
    return null;
  }
};
