"use client";
import {
  EditorCanvasCardType,
  EditorCanvasTypes,
  EditorNodeType,
} from "@/lib/types";

// import { useNodeConnections } from "@/providers/connections-provider";
// import { useEditor } from "@/providers/editor-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { EditorCanvasDefaultCardTypes } from "@/lib/constant";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {
//   fetchBotSlackChannels,
//   onConnections,
//   onDragStart,
// } from "@/lib/editor-utils";
// import EditorCanvasIconHelper from "./editor-canvas-card-icon-hepler";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { TurboNodeData } from "@/components/turbo/node";
import { useFlowStore } from "@/components/turbo/store";
import EditorCanvasIconHelper from "../../../_components/editor-canvas-card-icon-hepler";
import { Node } from "reactflow";
// import RenderConnectionAccordion from "./render-connection-accordion";
// import RenderOutputAccordion from "./render-output-accordian";
// import { useFuzzieStore } from "@/store";

type Props = {
  nodes: Node<EditorCanvasCardType>[];
};

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { selectedNode } = useFlowStore();
  // console.log(selectedNode);
  // const { nodeConnection } = useNodeConnections();
  // const { googleFile, setSlackChannels } = useFuzzieStore();
  // useEffect(() => {
  //   if (state) {
  //     onConnections(nodeConnection, state, googleFile);
  //   }
  // }, [state]);

  // useEffect(() => {
  //   if (nodeConnection.slackNode.slackAccessToken) {
  //     fetchBotSlackChannels(
  //       nodeConnection.slackNode.slackAccessToken,
  //       setSlackChannels
  //     );
  //   }
  // }, [nodeConnection]);

  const onDragStart = (event: any, nodeType: EditorCanvasCardType["type"]) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    console.log(nodeType);
  };

  return (
    <aside>
      <Tabs
        defaultValue="actions"
        className="h-screen w-full overflow-scroll pb-24"
      >
        <TabsList className="bg-transparent w-full p-8">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="actions" className="flex flex-col gap-4 p-4">
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === "Trigger") ||
                (nodes.length && cardType.type === "Action")
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as EditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="settings" className="-mt-6">
          <div className="px-2 py-4 text-center text-xl font-bold">
            {selectedNode.data.title}
          </div>
         <div className="">Input</div>
         <div className="">Actions</div>
         <div className="">Output</div>
         <button>Delete</button>
         <button>Save</button>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSidebar;
