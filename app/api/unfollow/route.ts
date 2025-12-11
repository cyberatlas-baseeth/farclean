import { getFrameHtmlResponse } from "frames.js";

export async function POST(req: Request) {
  const body = await req.json();
  const list = body?.users ?? [];

  if (!list.length) {
    return new Response(
      getFrameHtmlResponse({
        image: `<div>No users to unfollow.</div>`,
        buttons: [
          { label: "Home", action: "post", target: "/" }
        ]
      }),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return new Response(
    getFrameHtmlResponse({
      image: `<div>Unfollowed ${list.length} users.</div>`,
      buttons: [
        { label: "Home", action: "post", target: "/" }
      ]
    }),
    { headers: { "Content-Type": "text/html" } }
  );
}
