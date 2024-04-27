"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { EditorCanvasDefaultCards } from "@/lib/constant";

import { useFlowStore, useWorkflowStore } from "@/components/turbo/store";
import { Node } from "reactflow";
import { Loader2, TwitterIcon } from "lucide-react";
import EditorCanvasIconHelper from "../../../_components/icon-helper";

const EditorCanvasSidebar = () => {
  const { apps, workflowId, name, desc } = useWorkflowStore();

  return (
    <aside>
      <Tabs
        defaultValue="apps"
        className="h-screen w-full overflow-scroll pb-24"
      >
        <TabsList className="bg-transparent w-full p-8">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="apps">Apps</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="apps" className="flex flex-col gap-4 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect required apps</CardTitle>
              <CardDescription>
                Connect the required apps to start building your workflow.
              </CardDescription>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Apps required: </h4>
                <div className="grid gap-6">
                  {apps.map((app) => (
                    <div
                      className="flex items-center justify-between space-x-4"
                      key={app}
                    >
                      <div className="flex items-center justify-around space-x-4 w-full">
                        <div className="flex items-center space-x-4">
                          <Avatar className="flex items-center justify-center border p-2">
                            <EditorCanvasIconHelper type={app} />
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">
                              {app}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Use {app} events in your workflow
                            </p>
                          </div>
                        </div>
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="-mt-6">
          <div className="px-2 py-4 text-center text-xl font-bold">{name}</div>
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
