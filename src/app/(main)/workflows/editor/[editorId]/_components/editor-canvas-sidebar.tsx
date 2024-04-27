"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NumberInput } from "@tremor/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useFlowStore, useWorkflowStore } from "@/components/turbo/store";
import { Node } from "reactflow";
import { Loader2, TwitterIcon } from "lucide-react";
import EditorCanvasIconHelper from "../../../_components/icon-helper";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

const EditorCanvasSidebar = () => {
  const { apps, workflowId, name, desc } = useWorkflowStore();
  const [contributions, setContributions] = React.useState([3]);
  const [leetcode, setLeetcode] = React.useState([3]);

  return (
    <aside>
      <Tabs
        defaultValue="apps"
        className="h-screen w-full overflow-scroll pb-12"
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
          <div className="px-2 py-4 text-start text-xl font-bold">{name}</div>
          <div className="flex flex-col gap-3">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Github</CardTitle>
                <CardDescription>
                  Update the settings for your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-muted-foreground flex justify-between p-2 w-full"
                      >
                        <span className="text-muted-foreground">
                          {contributions}
                        </span>
                        Daily Contribution Count
                      </Label>
                      <Slider
                        defaultValue={[3]}
                        max={10}
                        min={1}
                        step={1}
                        value={contributions}
                        onValueChange={(value) => setContributions(value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Leetcode</CardTitle>
                <CardDescription>
                  Update the settings for your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-muted-foreground flex justify-between p-2 w-full"
                      >
                        <span className="text-muted-foreground">
                          {leetcode}
                        </span>
                        Daily Problem Solved
                      </Label>
                      <Slider
                        defaultValue={[3]}
                        max={10}
                        min={1}
                        step={1}
                        value={leetcode}
                        onValueChange={(value) => setLeetcode(value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Leetcode</CardTitle>
                <CardDescription>
                  Update the settings for your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-muted-foreground flex justify-between p-2 w-full"
                      >
                        This is the Tweet that will be sent
                      </Label>
                      <Textarea placeholder="Type your message here." />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSidebar;
