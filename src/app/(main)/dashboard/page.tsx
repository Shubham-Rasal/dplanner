"use client";
import React, { useCallback, useEffect, useState } from "react";

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
    </div>
  );
};

export default DashboardPage;
