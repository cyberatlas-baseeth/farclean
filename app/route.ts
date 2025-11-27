import { NextResponse } from "next/server";


export function GET() {
return NextResponse.json({ status: "ok", message: "Farcaster Mini App root route" });
}
```ts
import { Frame } from '@farcaster/frame';


export const GET = async () => {
return Frame({
title: 'Unfollow Back Mini App',
image: `${process.env.APP_URL}/frame.png`,
text: 'Seni takip etmeyenleri bul ve istersen unfollow et',
buttons: [
{ label: 'Başla', action: 'post', target: '/check' }
]
});
};
