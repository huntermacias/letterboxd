// pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    const openai = new OpenAI({ apiKey: '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' });

    try {
		console.log('prompt', prompt)
      const response = await openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: prompt,
        max_tokens: 50,
      });
      if (response && response.choices) {
        res.status(200).json
(response.choices);
} else {
throw new Error('Invalid response format from OpenAI');
}
} catch (error) {
console.error('OpenAI API Error:', error);
res.status(500).json({ message: 'Error in OpenAI request', error: error });
}
} else {
res.setHeader('Allow', ['POST']);
res.status(405).end(`Method ${req.method} Not Allowed`);
}
}