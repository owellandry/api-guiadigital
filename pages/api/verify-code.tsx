// pages/api/verify-code.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const codeStorage = new Map(); // Usa la misma instancia que en /request-code

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, code } = req.body;
        const storedCode = codeStorage.get(email);

        if (storedCode === code) {
            codeStorage.delete(email); // Elimina el código después de la verificación
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false });
        }
    } else {
        res.status(405).end(); // Método no permitido
    }
}
