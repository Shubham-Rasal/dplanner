import React, { memo, ReactNode, useMemo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";
import { Badge, CheckCircle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import clsx from "clsx";
import EditorCanvasIconHelper from "@/app/(main)/workflows/_components/editor-canvas-card-icon-hepler";
import { useFlowStore } from "./store";
import { EditorCanvasCardType, EditorNodeType } from "@/lib/types";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// export type TurboNodeData = {
//   type: "trigger" | "action";
//   time: string;
//   title: string;
//   description: string;
// };

const TurboNode = (props: NodeProps<EditorCanvasCardType>) => {
  const { data } = props;
  const { setSelectedNode, nodes, selectedNode, deleteNode } = useFlowStore();

  const logo = useMemo(() => {
    return <EditorCanvasIconHelper type="Google Drive" />;
  }, []);
  return (
    <>
      <Handle
        position={Position.Top}
        type="target"
        className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800 z-10"
      />
      <ContextMenu>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => deleteNode(props.id)}>
            Delete
          </ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem>
        </ContextMenuContent>

        <ContextMenuTrigger className="flex  items-center justify-center rounded-md border border-dashed text-sm">
          <Card
            onClick={() => {
              const nodeToSet = nodes.find((node) => node.id === props.id);
              const node = nodeToSet as EditorNodeType;
              setSelectedNode(node);
            }}
            className={`relative max-w-[400px] dark:border-muted-foreground/70`}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div>{logo}</div>
              <div>
                <CardTitle className="text-md">{data.title}</CardTitle>
                <CardDescription>
                  <p className="text-xs text-muted-foreground/50">
                    <b className="text-muted-foreground/80">ID: </b>
                    {props.id}
                  </p>
                  <p>{data.description}</p>
                </CardDescription>
              </div>
            </CardHeader>
            <Badge className="absolute right-2 top-2">
              {data.type} sdfjsdlkfjsldkjf
            </Badge>
            <div className="absolute left-3 top-4 h-3 w-3 rounded-full bg-green-500">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            </div>
          </Card>
        </ContextMenuTrigger>
      </ContextMenu>
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
