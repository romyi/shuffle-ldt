import { Badge, Card } from "@mantine/core";
import { Calculation } from "@tyles/calculation";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useReveal } from "../hooks";

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
  const show = useReveal(showOn);
  const renderChild = useReveal(contentOn);
  const navigate = useNavigate();
  if (show) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 400 }}
          transition={{ duration: 0.6 }}
          animate={{ y: matched?.pathname ? 10 : 0 }}
          exit={{ y: 400 }}
        >
          <Card
            h={120}
            shadow={"sm"}
            radius="md"
            p="sm"
            onClick={() => navigate(url)}
          >
            {renderChild ? (
              children
            ) : (
              <Badge color={"dark"}>{placeholder}</Badge>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    );
  } else return null;
};
