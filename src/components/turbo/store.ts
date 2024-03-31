import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
  addEdge,
  Connection,
  OnConnect,
  getBoundsOfRects,
} from "reactflow";
import { create } from "zustand";
import { TurboNodeData } from "./node";
import { GoalSchema } from "../update-goal";
import * as z from "zod";
import { v4 } from "uuid";
import { useCallback } from "react";

export interface RFState {
  nodes: Node<TurboNodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  updateNode: (nodeId: string, data: z.infer<typeof GoalSchema>) => void;
  createNode: (data: z.infer<typeof GoalSchema>) => void;
}

export const useFlowStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: {
        attachable: true,
        description: "what is the main goal?",
        goal: "complete the project",
        time: "12:00",
        date: new Date(),
        type: "daily",
      },
      type: "turbo",
    },
    {
      id: "2",
      position: { x: 250, y: 0 },
      data: {
        attachable: true,
        description: "what is the main goal?",
        goal: "complete the dsa project.",
        time: "12:00",
        date: new Date(),
        type: "daily",
      },
      type: "turbo",
    },
  ],

  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onDragOver: (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    console.log("over");
  },

  onDrop: (event: React.DragEvent<HTMLDivElement>) => {
    console.log("dropped");
    event.preventDefault();
    const data = event.dataTransfer.getData("application/reactflow");

    //get bounding rect
    console.log(event);

    const target = event.target as HTMLElement;

    const boundingRect = target.getBoundingClientRect();

    const position: XYPosition = {
      x: event.clientX - boundingRect.x,
      y: event.clientY - boundingRect.y,
    };
    const newNode: Node<TurboNodeData> = {
      id: v4(),
      position: position,
      type: "turbo",
      data: {
        attachable: true,
        description: "what is the main goal?",
        goal: "complete the dsa project.",
        time: "12:00",
        date: new Date(),
        type: "daily",
      },
    };

    set({
      nodes: [...get().nodes, newNode],
    });
  },

  onConnect: (connection: Connection) => {
    console.log(connection);

    const edge: Edge = {
      id: `${connection.source}-${connection.target}`,
      source: connection.source || "", // Ensure source is always a string
      target: connection.target || "", // Ensure target is always a string
      type: "turbo",
      animated: true,
    };

    set({
      edges: addEdge(edge, get().edges),
    });
  },

  updateNode: (nodeId: string, data: z.infer<typeof GoalSchema>) => {
    const nodes = get().nodes;
    const node = nodes.find((node) => node.id === nodeId);
    if (node) {
      node.data = data;
      set({ nodes: [...nodes] });
    }
  },
  createNode: (data: z.infer<typeof GoalSchema>) => {
    const newNode: Node<TurboNodeData> = {
      id: v4(),
      position: { x: 0, y: 0 },
      data: data,
      type: "turbo",
    };

    set({
      nodes: [...get().nodes, newNode],
    });
  },

  deleteEdge: (edgeId: string) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== edgeId),
    });
  },
}));
