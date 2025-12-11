import { createFrames } from "frames.js/next";
import { Button } from "frames.js";

const frames = createFrames();

export const metadata = {
  title: "Unfollow Mini App"
};

export default frames(async () => {
  return {
    image: (
      <div style={{ fontSize: 48, display: "flex", justifyContent: "center", alignItems: "center" }}>
        Unfollow Non-Mutuals
      </div>
    ),
    buttons: [
      <Button action="post" target="/api/action">Start</Button>
    ]
  };
});
