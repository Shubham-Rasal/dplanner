import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import EditorCanvasIconHelper from "./icon-helper";
import { AppTypes } from "@/lib/types";
// import { toast } from 'sonner'
// import { onFlowPublish } from '../_actions/workflow-connections'

type Props = {
  name: string;
  description: string;
  id: string;
  publish: boolean | null;
  apps: AppTypes[];
};

const Workflow = ({ description, id, name, publish, apps }: Props) => {
  const onPublishFlow = async (event: any) => {
    // const response = await onFlowPublish(
    //   id,
    //   event.target.ariaChecked === 'false'
    // )
    // if (response) toast.message(response)
  };

  return (
    <Card className="flex w-full items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <Link href={`/workflows/editor/${id}`}>
          <div className="flex flex-row gap-2">
            {apps.map((app) => (
              <EditorCanvasIconHelper type={app} key={app} />
            ))}
          </div>
          <div className="">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </Link>
      </CardHeader>
      <div className="flex flex-col items-center gap-2 p-4">
        <Label htmlFor="airplane-mode" className="text-muted-foreground">
          {publish! ? "On" : "Off"}
        </Label>
        <Switch
          id="airplane-mode"
          // onClick={onPublishFlow}
          defaultChecked={publish!}
        />
      </div>
    </Card>
  );
};

export default Workflow;
