import type { NextApiRequest, NextApiResponse } from 'next';

const businesses = [
    { id: 1, name: 'Business 1' },
    { id: 2, name: 'Business 2' },
    { id: 3, name: 'Business 3' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(businesses);
}
