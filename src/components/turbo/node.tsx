import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { UpdateDrawer } from "../drawer-demo";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";
import { CheckCircle } from "lucide-react";

export type TurboNodeData = {
  type: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  date: Date;
  time: string;
  description: string;
  goal: string;
  attachable: boolean;
};

const TurboNode = (props: NodeProps<TurboNodeData>) => {
  const { data } = props;
  return (
    <>
      <div className="">
       test
      </div>
    </>
  );
};

export default memo(TurboNode);
