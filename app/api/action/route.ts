import { NextRequest } from "next/server";
import { createFrames } from "frames.js/next";
import { Button } from "frames.js";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const apiKey = process.env.NEYNAR_API_KEY!;
const client = new NeynarAPIClient(apiKey);

const frames = createFrames();

export const POST = frames(async (ctx: any) => {
  const fid = ctx.message?.requesterFid;

  if (!fid) {
    return {
      image: <div>Please open this frame in Warpcast.</div>,
      buttons: []
    };
  }

  const followers = await client.fetchUserFollowers(fid);
  const following = await client.fetchUserFollowing(fid);

  const followerSet = new Set(followers.map(f => f.fid));
  const nonMutual = following.filter(f => !followerSet.has(f.fid));

  return {
    image: (
      <div style={{ fontSize: 40 }}>
        Found {nonMutual.length} non-mutual accounts.
      </div>
    ),
    buttons: [
      <Button action="post" target="/api/unfollow">Unfollow All</Button>,
      <Button action="post" target="/">Cancel</Button>
    ],
    state: { list: nonMutual.map(x => x.fid) }
  };
});
