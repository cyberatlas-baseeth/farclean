import { FramesResponse } from "frames.js/server";

export async function POST(req: Request) {
  const body = await req.json();
  const list = body?.users ?? [];

  if (!list.length) {
    return FramesResponse({
      image: `<div>No users to unfollow.</div>`,
      buttons: [
        { label: "Home", action: "post", target: "/" }
      ]
    });
  }

  return FramesResponse({
    image: `<div>Unfollowed ${list.length} users.</div>`,
    buttons: [
      { label: "Home", action: "post", target: "/" }
    ]
  });
}
