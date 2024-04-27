"use client";
// import { Builder } from "@/components/turbo/builder";
import TurboBuilder from "@/components/turbo/builder";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorCanvasSidebar from "./editor-canvas-sidebar";
import { useEdgesState, useNodesState } from "reactflow";
import { useFlowStore, useWorkflowStore } from "@/components/turbo/store";

export function Canvas() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel defaultSize={70}>
          <TurboBuilder />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <EditorCanvasSidebar />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
