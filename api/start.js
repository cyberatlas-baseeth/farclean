import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { untrustedData } = req.body;
  const fid = untrustedData.fid;

  // Fetch who the user is following
  const followingRes = await client.fetchUserFollowing(fid, { limit: 1000 });
  const following = followingRes.users.map(u => u.fid);

  // Fetch the user's followers
  const followersRes = await client.fetchUserFollowers(fid, { limit: 1000 });
  const followers = followersRes.users.map(u => u.fid);

  // Find non-followers
  const nonFollowers = following.filter(f => !followers.includes(f));

  // Show max 25
  const limited = nonFollowers.slice(0, 25);

  let imageUrl = `https://farclean.vercel.app/api/og?count=${nonFollowers.length}&listed=${limited.length}`; // For OG image (optional)

  res.setHeader("Content-Type", "text/html");
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${imageUrl}" />
  <meta property="fc:frame:button:1" content="🗑️ ${limited.length > 0 ? 'Unfollow 25 people' : 'All accounts are mutual! 🎉'}" />
  ${limited.length > 0 ? `
  <meta property="fc:frame:button:1:action" content="post" />
  <meta property="fc:frame:button:1:target" content="https://farclean.vercel.app/api/unfollow" />
  <meta property="fc:frame:button:2" content="🔄 Refresh" />
  <meta property="fc:frame:button:2:action" content="post" />
  ` : ''}
</head>
<body>
  <h1>${nonFollowers.length} people don't follow you back</h1>
  <p>${limited.length > nonFollowers.length ? `${nonFollowers.length - limited.length} more people exist...` : ''}</p>
</body>
</html>
  `);
}
