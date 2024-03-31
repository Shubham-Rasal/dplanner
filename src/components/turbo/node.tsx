import React, { memo, ReactNode, useMemo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { UpdateDrawer } from "../drawer-demo";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";
import { Badge, CheckCircle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import clsx from "clsx";
import EditorCanvasIconHelper from "@/app/(main)/workflows/_components/editor-canvas-card-icon-hepler";

export type TurboNodeData = {
  type: "trigger" | "action";
  time: string;
  title: string;
  description: string;
};

const TurboNode = (props: NodeProps<TurboNodeData>) => {
  const { data } = props;
  const logo = useMemo(() => {
    return <EditorCanvasIconHelper type="Google Drive" />
  }, [])
  return (
    <>
      <Handle
        position={Position.Top}
        type="target"
        className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800 z-10"
      />
      <Card
        // onClick={(e) => {
        //   e.stopPropagation();
        //   const val = state.editor.elements.find((n) => n.id === nodeId);
        //   if (val)
        //     dispatch({
        //       type: "SELECTED_ELEMENT",
        //       payload: {
        //         element: val,
        //       },
        //     });
        // }}
        className="relative max-w-[400px] dark:border-muted-foreground/70"
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <div>{logo}</div>
          <div>
            <CardTitle className="text-md">{data.title}</CardTitle>
            <CardDescription>
              <p className="text-xs text-muted-foreground/50">
                <b className="text-muted-foreground/80">ID: </b>
                34
              </p>
              <p>{data.description}</p>
            </CardDescription>
          </div>
        </CardHeader>
        <Badge className="absolute right-2 top-2">{data.type} sdfasd</Badge>
        <div className="absolute left-3 top-4 h-3 w-3 rounded-full bg-green-500">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        </div>
      </Card>
      <Handle
        className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800"
        type="source"
        position={Position.Bottom}
        id="a"
      />
    </>
  );
};

export default memo(TurboNode);
