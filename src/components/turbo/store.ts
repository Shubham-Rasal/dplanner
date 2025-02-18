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
import * as z from "zod";
import { v4 } from "uuid";
import { useCallback } from "react";
import {
  EditorCanvasCardType,
  EditorCanvasTypes,
  EditorNodeType,
} from "@/lib/types";
import { EditorCanvasDefaultCardTypes } from "@/lib/constant";

export interface RFState {
  nodes: Node<EditorCanvasCardType>[];
  edges: Edge[];
  selectedNode: EditorNodeType;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  // onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
  createNode: (data: EditorCanvasCardType) => void;
  deleteNode: (nodeId: string) => void;
  setSelectedNode: (node: EditorNodeType) => void;
}

export const useFlowStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: "1",
      type: "Trigger",
      position: { x: 1000, y: 0 },
      data: {
        completed: false,
        current: false,
        description: "This is desc",
        metadata: {},
        title: "This is a title",
        type: "Trigger",
      },
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

  selectedNode: {
    data: {
      completed: false,
      current: false,
      description: "",
      metadata: {},
      title: "",
      type: "Trigger",
    },
    id: "21jkd34rj-dj34",
    position: { x: 1000, y: 0 },
    type: "Trigger",
  },

  setSelectedNode: (node: EditorNodeType) => {
    set({
      selectedNode: node,
    });
  },

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
    console.log(data);

    const target = event.target as HTMLElement;

    const boundingRect = target.getBoundingClientRect();

    const position: XYPosition = {
      x: event.clientX - boundingRect.x,
      y: event.clientY - boundingRect.y,
    };

    const { type, description } =
      EditorCanvasDefaultCardTypes[data as EditorCanvasTypes];

    const newNode: EditorNodeType = {
      id: v4(),
      position: position,
      type: "Trigger",
      data: {
        completed: false,
        current: false,
        description,
        metadata: {},
        title: data,
        type: data as EditorCanvasTypes,
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

  deleteNode: (nodeId: string) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
    });
  },

  
  createNode: (data: EditorCanvasCardType) => {
    const { description } = EditorCanvasDefaultCardTypes[data.type];

    const newNode: EditorNodeType = {
      id: v4(),
      position: { x: 0, y: 0 },
      data: {
        completed: false,
        current: false,
        description,
        metadata: {},
        title: data.type,
        type: data.type,
      },

      type: data.type,
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
