import { getFrameHtmlResponse } from "frames.js";

export async function POST(req: Request) {
  const body = await req.json();
  const fid = body?.untrustedData?.fid;

  if (!fid) {
    return new Response(
      getFrameHtmlResponse({
        image: `<div>Please open this frame in Warpcast.</div>`,
        buttons: []
      }),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return new Response(
    getFrameHtmlResponse({
      image: `<div>Action completed successfully.</div>`,
      buttons: [
        { label: "Home", action: "post", target: "/" }
      ]
    }),
    { headers: { "Content-Type": "text/html" } }
  );
}
