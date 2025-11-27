import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export default async function handler(req, res) {
  const { untrustedData } = req.body;
  const fid = untrustedData.fid;

  const followingRes = await client.fetchUserFollowing(fid, { limit: 150 });
  const followersRes = await client.fetchUserFollowers(fid, { limit: 1000 });
  const followerSet = new Set(followersRes.users.map(u => u.fid));
  
  let unfollowedCount = 0;
  for (const user of followingRes.users) {
    if (unfollowedCount >= 25) break;
    if (!followerSet.has(user.fid)) {
      try {
        await client.unfollowUser(fid, user.fid);
        unfollowedCount++;
      } catch (e) {}
    }
  }

  const message = unfollowedCount > 0 
    ? `✅ Unfollowed ${unfollowedCount} people!` 
    : `🤷 No one was unfollowed`;

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://i.imgur.com/8Qm1vOa.png" />
  <meta property="fc:frame:button:1" content="${message}" />
  <meta property="fc:frame:button:2" content="🔄 Scan Again" />
  <meta property="fc:frame:button:2:action" content="post" />
  <meta property="fc:frame:button:2:target" content="https://farclean.vercel.app/api/start" />
</head>
</html>
  `);
}
