"use client";
import React from "react";
import {
  Calendar,
  CircuitBoard,
  CodeIcon,
  Database,
  GitBranch,
  Github,
  HardDrive,
  Mail,
  MousePointerClickIcon,
  Plus,
  Slack,
  Timer,
  TwitterIcon,
  Webhook,
  Zap,
} from "lucide-react";

import { AppTypes } from "@/lib/types";

type Props = { type: AppTypes };

const EditorCanvasIconHelper = ({ type }: Props) => {
  switch (type) {
    // case "Email":
    //   return <Mail className="flex-shrink-0" size={30} />;
    // case "Condition":
    //   return <GitBranch className="flex-shrink-0" size={30} />;
    // case "AI":
    //   return <CircuitBoard className="flex-shrink-0" size={30} />;
    case "Slack":
      return <Slack className="flex-shrink-0" size={30} />;
    // case "Google Drive":
    //   return <HardDrive className="flex-shrink-0" size={30} />;
    case "Notion":
      return <Database className="flex-shrink-0" size={30} />;
    case "Github":
      return <Github className="flex-shrink-0" size={30} />;
    // case "Google Calendar":
    //   return <Calendar className="flex-shrink-0" size={30} />;
    case "Leetcode":
      return <CodeIcon className="flex-shrink-0" size={30} />;

    case "Twitter":
      return <TwitterIcon className="flex-shrink-0" size={30} />;

    default:
      return <Zap className="flex-shrink-0" size={30} />;
  }
};

export default EditorCanvasIconHelper;
