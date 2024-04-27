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

import { EditorCanvasDefaultCards } from "@/lib/constant";

export interface RFState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  // onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
  deleteNode: (nodeId: string) => void;
}

export const useFlowStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: "1",
      type: "TurboNode",
      position: { x: 200, y: 300 },
      data: {
        description: "This is desc",
        title: "This is a title",
        type: "Twitter",
      },
    },
    {
      id: "2",
      type: "TurboNode",
      position: { x: 300, y: 300 },
      data: {
        description: "This is desc",
        title: "This is a title",
        type: "Twitter",
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

  // selectedNode: {
  //   data: {
  //     completed: false,
  //     current: false,
  //     description: "",
  //     metadata: {},
  //     title: "",
  //     type: "Twitter",
  //   },
  //   id: "21jkd34rj-dj34",
  //   position: { x: 1000, y: 0 },
  //   type: "Trigger",
  // },

  // setSelectedNode: (node: EditorNodeType) => {
  //   set({
  //     selectedNode: node,
  //   });
  // },

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
    const data = event.dataTransfer.getData("application/json");

    //get bounding rect
    console.log(JSON.parse(data));

    const { nodeType, cardValue} = JSON.parse(data);
    console.log(cardValue, nodeType)
    //type cardVAlue to EditorCanvasCardType

    const target = event.target as HTMLElement;

    const boundingRect = target.getBoundingClientRect();

    const position: XYPosition = {
      x: event.clientX - boundingRect.x,
      y: event.clientY - boundingRect.y,
    };

    const newNode: Node= {
      id: v4(),
      position: position,
      type: "TurboNode",
      data: {
        description: cardValue.description,
        title: nodeType,
        type: cardValue.type,
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

  // createNode: (data: EditorCanvasCardType) => {
  //   const { description } = EditorCanvasDefaultCards[data.type];

  //   const newNode: EditorNodeType = {
  //     id: v4(),
  //     position: { x: 0, y: 0 },
  //     data: {
  //       description,
  //       title: data.title,
  //       type: data.type,
  //     },

  //     type: "TurboNode",
  //   };

  //   set({
  //     nodes: [...get().nodes, newNode],
  //   });
  // },

  deleteEdge: (edgeId: string) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== edgeId),
    });
  },
}));
