import { Frame } from '@farcaster/frame';


export const GET = async () => {
return Frame({
title: 'Unfollow Back Mini App',
image: `${process.env.APP_URL}/frame.png`,
text: 'Find users who do not follow you back and optionally unfollow them',
buttons: [
{ label: 'Start', action: 'post', target: '/check' }
]
});
};
