import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { code } = await req.json();

  try {
    const tokenResponse = await fetchUserToken(code);
    const accessToken = tokenResponse.access_token;
    if (accessToken) {
      const userDataResponse = await fetchUserData(accessToken);
      const userCredentials = { ...tokenResponse, ...userDataResponse };
      return NextResponse.json(userCredentials);
    }

    return NextResponse.json({ error: "No access token" });
  } catch (err) {
    return NextResponse.json({ error: "An error occurred" });
  }
}

const BasicAuthToken = Buffer.from(
  `${process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!}:${process.env
    .TWITTER_CLIENT_SECRET!}`,
  "utf8"
).toString("base64");

const twitterOauthTokenParams = {
  client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!,
  //👇🏻 according to the code_challenge provided on the client
  code_verifier: "8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA",
  redirect_uri: `http://www.localhost:3000/dashboard`,
  grant_type: "authorization_code",
};

//gets user access token
const fetchUserToken = async (code: string) => {
  console.log(twitterOauthTokenParams, BasicAuthToken, code);
  try {
    const formatData = new URLSearchParams({
      ...twitterOauthTokenParams,
      code,
    });
    const getTokenRequest = await fetch(
      "https://api.twitter.com/2/oauth2/token",
      {
        method: "POST",
        body: formatData.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${BasicAuthToken}`,
        },
      }
    );
    const getTokenResponse = await getTokenRequest.json();
    console.log("TOKEN >>>", getTokenResponse);
    return getTokenResponse;
  } catch (err) {
    console.error("Error fetching token", err);
    return null;
  }
};

//gets user's data from the access token
const fetchUserData = async (accessToken: string) => {
  try {
    const getUserRequest = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const getUserProfile = await getUserRequest.json();
    return getUserProfile;
  } catch (err) {
    return null;
  }
};
