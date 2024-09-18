import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
}
