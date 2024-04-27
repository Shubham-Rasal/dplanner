"use server";
// import { Option } from '@/components/ui/multiple-selector'
import db from "@/lib/supabase/db";
import { getCurrentUserAction } from "@/lib/server-actions/auth-actions";
// import { auth, currentUser } from '@clerk/nextjs'

// export const getGoogleListener = async () => {
//   const { userId } = auth()

//   if (userId) {
//     const listener = await db.user.findUnique({
//       where: {
//         clerkId: userId,
//       },
//       select: {
//         googleResourceId: true,
//       },
//     })

//     if (listener) return listener
//   }
// }

// export const onFlowPublish = async (workflowId: string, state: boolean) => {
//   console.log(state);
//   const published = await db.workflows.update({
//     where: {
//       id: workflowId,
//     },
//     data: {
//       publish: state,
//     },
//   });

//   if (published.publish) return "Workflow published";
//   return "Workflow unpublished";
// };

// export const onCreateNodeTemplate = async (
//   content: string,
//   type: string,
//   workflowId: string,
//   channels?: Option[],
//   accessToken?: string,
//   notionDbId?: string
// ) => {
//   if (type === 'Discord') {
//     const response = await db.workflows.update({
//       where: {
//         id: workflowId,
//       },
//       data: {
//         discordTemplate: content,
//       },
//     })

//     if (response) {
//       return 'Discord template saved'
//     }
//   }
//   if (type === 'Slack') {
//     const response = await db.workflows.update({
//       where: {
//         id: workflowId,
//       },
//       data: {
//         slackTemplate: content,
//         slackAccessToken: accessToken,
//       },
//     })

//     if (response) {
//       const channelList = await db.workflows.findUnique({
//         where: {
//           id: workflowId,
//         },
//         select: {
//           slackChannels: true,
//         },
//       })

//       if (channelList) {
//         //remove duplicates before insert
//         const NonDuplicated = channelList.slackChannels.filter(
//           (channel) => channel !== channels![0].value
//         )

//         NonDuplicated!
//           .map((channel) => channel)
//           .forEach(async (channel) => {
//             await db.workflows.update({
//               where: {
//                 id: workflowId,
//               },
//               data: {
//                 slackChannels: {
//                   push: channel,
//                 },
//               },
//             })
//           })

//         return 'Slack template saved'
//       }
//       channels!
//         .map((channel) => channel.value)
//         .forEach(async (channel) => {
//           await db.workflows.update({
//             where: {
//               id: workflowId,
//             },
//             data: {
//               slackChannels: {
//                 push: channel,
//               },
//             },
//           })
//         })
//       return 'Slack template saved'
//     }
//   }

//   if (type === 'Notion') {
//     const response = await db.workflows.update({
//       where: {
//         id: workflowId,
//       },
//       data: {
//         notionTemplate: content,
//         notionAccessToken: accessToken,
//         notionDbId: notionDbId,
//       },
//     })

//     if (response) return 'Notion template saved'
//   }
// }

export const onGetWorkflows = async () => {
  const { data } = await getCurrentUserAction();
  // if (data.user) {
  //   const workflow = await db.workflows.findMany({
  //     where: {
  //       userId: data.user?.id,
  //     },
  //   });

  // if (workflow) return workflow;
  // }

  return [
    {
      name: "Twitter Accountability Bot",
      description:
        "Bot that checks your github and leetcode contributions, if you don't meet your daily goal, it tweets about it.",
      id: "1",
      apps: ["Github", "Leetcode", "Twitter"],
      publish: true,
    },
  ];
};

export const onCreateWorkflow = async (name: string, description: string) => {
  const user = await getCurrentUserAction();

  // if (user) {
  //   //create new workflow
  //   const workflow = await db.workflows.create({
  //     data: {
  //       userId: user.id,
  //       name,
  //       description,
  //     },
  //   })

  //   if (workflow) return { message: 'workflow created' }
  return { message: "Oops! try again" };
  // }
};

// export const onGetNodesEdges = async (flowId: string) => {
//   const nodesEdges = await db.workflows.findUnique({
//     where: {
//       id: flowId,
//     },
//     select: {
//       nodes: true,
//       edges: true,
//     },
//   })
//   if (nodesEdges?.nodes && nodesEdges?.edges) return nodesEdges
// }
