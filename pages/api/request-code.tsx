// pages/api/request-code.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer'; // Necesitarás instalar esta dependencia
import crypto from 'crypto'; // Para generar códigos

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const codeStorage = new Map(); // Para almacenar códigos temporalmente (en producción usa una base de datos)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;
        const code = crypto.randomInt(100000, 999999).toString(); // Código de 6 dígitos
        codeStorage.set(email, code);

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Verification Code',
                text: `Your verification code is ${code}`,
            });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false });
        }
    } else {
        res.status(405).end(); // Método no permitido
    }
}
