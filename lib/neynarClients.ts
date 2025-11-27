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
const url = `/user/following?fid=${fid}&limit=10000`;
return this.request(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
}


async fetchFollowers(fid: number, token?: string){
const url = `/user/followers?fid=${fid}&limit=10000`;
return this.request(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
}


async unfollow(followerFid: number, followeeFid: number, token?: string){
const body = { follower_fid: followerFid, followee_fid: followeeFid };
return this.request('/user/unfollow', { method: 'POST', body: JSON.stringify(body), headers: token ? { Authorization: `Bearer ${token}` } : {} });
}
}
