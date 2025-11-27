import fetch from 'node-fetch';


export class NeynarClient {
apiKey: string;
base = 'https://api.neynar.com/v2/farcaster';


constructor(apiKey: string){
this.apiKey = apiKey;
}


async request(path: string, opts: any = {}){
const res = await fetch(`${this.base}${path}`, {
...opts,
headers: {
'Authorization': `Bearer ${this.apiKey}`,
'Content-Type': 'application/json',
...(opts.headers || {})
}
});
return res.json();
}


async fetchFollowing(fid: number, token?: string){
return this.request(`/user/following?fid=${fid}&limit=10000`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
}


async fetchFollowers(fid: number, token?: string){
return this.request(`/user/followers?fid=${fid}&limit=10000`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
}


async unfollow(followerFid: number, followeeFid: number, token?: string){
const body = { follower_fid: followerFid, followee_fid: followeeFid };
return this.request('/user/unfollow', { method: 'POST', body: JSON.stringify(body), headers: token ? { Authorization: `Bearer ${token}` } : {} });
}


async exchangeCode(code: string){
const resp = await fetch(`https://app.neynar.com/oauth/token`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ code, grant_type: 'authorization_code', client_id: process.env.NEYNAR_CLIENT_ID })
});
return resp.json();
}
}
