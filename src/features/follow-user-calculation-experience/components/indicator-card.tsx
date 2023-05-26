import { Card, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Calculation } from "@tyles/calculation";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useCalculationMatch } from "../hooks";

type IndicatorCardProps = {
  url: string;
  showOn: Array<Partial<keyof Calculation>> | null;
  contentOn: Array<Partial<keyof Calculation>>;
  placeholder: string;
  children: React.ReactNode;
};

export const IndicatorCard: React.FC<IndicatorCardProps> = ({
  url,
  showOn,
  contentOn,
  children,
  placeholder,
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
            miw={200}
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
              <Title order={4}>{placeholder}</Title>
            ) : (
              <Stack align={"center"}>
                <Text ta="center" color={"dimmed"}>
                  Следующий шаг
                </Text>
                <IconPlus size={36} />
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
