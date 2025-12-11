import { NextRequest } from "next/server";
import { createFrames } from "frames.js/next";
import { Button } from "frames.js";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const apiKey = process.env.NEYNAR_API_KEY!;
const signer = process.env.SIGNER_UUID!;
const client = new NeynarAPIClient(apiKey);

const frames = createFrames();

export const POST = frames(async (ctx: any) => {
  const list = ctx.state?.list || [];

  if (!list.length) {
    return {
      image: <div>No users to unfollow.</div>,
      buttons: [<Button action="post" target="/">Home</Button>]
    };
  }

  const batch = 50;

  for (let i = 0; i < list.length; i += batch) {
    const slice = list.slice(i, i + batch);
    await client.unfollowUserBulk(signer, slice);
  }

  return {
    image: <div style={{ fontSize: 40 }}>Done. Unfollowed {list.length} users.</div>,
    buttons: [<Button action="post" target="/">Home</Button>]
  };
});
