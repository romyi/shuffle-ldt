import { Button, Card, Stack, Text } from "@mantine/core";
import { Calculation } from "@tyles/calculation";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useCalculationMatch } from "../hooks";

type IndicatorCardProps = {
  url: string;
  showOn: Array<Partial<keyof Calculation>> | null;
  contentOn: Array<Partial<keyof Calculation>>;
  placeholder?: ReactNode;
  children: React.ReactNode;
  follower?: string;
};

export const IndicatorCard: React.FC<IndicatorCardProps> = ({
  url,
  showOn,
  contentOn,
  children,
  placeholder,
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
              placeholder || null
            ) : (
              <Stack align={"left"}>
                <Button radius={"md"} size={"sm"} color="cyan">
                  Следующий шаг
                </Button>
                <Text color={"dimmed"}>{follower}</Text>
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
