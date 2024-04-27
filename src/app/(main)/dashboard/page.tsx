"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Content,
  availableSchedule,
  formatTime,
  tableHeadings,
} from "@/lib/utils/tweets";
import Image from "next/image";

const DashboardPage = () => {
  type User = {
    name: string;
    username: string;
  };

  const [user, setUser] = useState<User>();

  const sendAuthRequest = useCallback(async (code: string | null) => {
    try {
      const request = await fetch("/api/twitter", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      console.log("RES >>>", response);
      const { access_token } = response;
      const { name, username } = response.data;
      setUser({ name, username });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.href);
    const code = params.get("code");
    sendAuthRequest(code);
  }, [sendAuthRequest]);

  const [yourSchedule, updateYourSchedule] = useState(availableSchedule);

  //👇🏻 add scheduled post
  const handleAddPost = (id: number, time: number) => {
    console.log({ id, time });
  };

  //👇🏻 delete scheduled post
  const handleDeletePost = (
    e: React.MouseEvent<HTMLParagraphElement>,
    content: Content,
    time: number
  ) => {
    e.stopPropagation();
    if (content.day !== undefined) {
      console.log({ time, content });
    }
  };

  return (
    <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl border-muted-foreground/20 overflow-scroll ">
      <div className="flex flex-col gap-4 relative">
        <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
          Dashboard Page {user?.name}
          {/* <Image
            className="inline-flex"
            src="/unkey.svg"
            width={200}
            height={200}
            alt="Card 01"
          /> */}
        </h1>
      </div>
      <div className=" p-8">
        <div className="h-[80vh] w-full overflow-y-scroll">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {tableHeadings.map((day, index) => (
                  <th
                    key={index}
                    className="bg-slate-700 p-4 text-lg font-bold"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {yourSchedule.map((item, index) => (
                <tr key={index}>
                  <td className="bg-slate-700 text-lg font-bold">
                    {formatTime(item.time)}
                  </td>
                  {item.schedule.map((sch, id) => (
                    <td
                      key={id}
                      onClick={() => handleAddPost(id, item.time)}
                      className="cursor-pointer"
                    >
                      {sch.map((content, ind: number) => (
                        <div
                          key={ind}
                          onClick={(e) =>
                            handleDeletePost(e, content, item.time)
                          }
                          className={`p-3 ${
                            content.published ? "bg-pink-500" : "bg-green-600"
                          }  mb-2 cursor-pointer rounded-md text-xs`}
                        >
                          <p className="mb-2 text-gray-700">
                            {content.minutes === 0
                              ? "o'clock"
                              : `at ${content.minutes} minutes past`}
                          </p>
                          <p className=" text-white">{content.content}</p>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
