import { Card } from "@mantine/core";
import { Calculation } from "@tyles/calculation";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useCalculationMatch } from "../hooks";

type IndicatorCardProps = {
  url: string;
  showOn: Array<Partial<keyof Calculation>> | null;
  contentOn: Array<Partial<keyof Calculation>>;
  children?: ReactNode;
  invite: ReactNode;
};

export const IndicatorCard: React.FC<IndicatorCardProps> = ({
  url,
  showOn,
  contentOn,
  children,
  invite,
}) => {
  const matched = useMatch(url);
  const show = useCalculationMatch(showOn);
  const renderChild = useCalculationMatch(contentOn);
  const navigate = useNavigate();
  if (show) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ translateY: 400 }}
          transition={{ duration: 0.6 }}
          animate={{ translateY: 0 }}
          exit={{ translateY: 400 }}
        >
          <Card
            sx={{ overflow: "visible" }} // for advanced ux animations
            miw={200}
            withBorder={Boolean(matched?.pathname)}
            h={140}
            shadow={matched?.pathname ? "xl" : "xs"}
            radius="md"
            padding={"md"}
            onClick={() => navigate(url)}
          >
            {renderChild ? children : invite}
          </Card>
        </motion.div>
      </AnimatePresence>
    );
  } else {
    return null;
  }
};
