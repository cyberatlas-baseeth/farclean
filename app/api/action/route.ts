import { FramesResponse } from "frames.js/server";

export async function POST(req: Request) {
  const body = await req.json();
  const fid = body?.untrustedData?.fid;

  if (!fid) {
    return FramesResponse({
      image: `<div>Please open this frame in Warpcast.</div>`,
      buttons: []
    });
  }

  return FramesResponse({
    image: `<div>Action completed successfully.</div>`,
    buttons: [
      { label: "Home", action: "post", target: "/" }
    ]
  });
}
