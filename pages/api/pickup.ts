import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const gpt3 = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, tokenLength = 400, temperature } = req.body;

  if (!prompt) {
    return res
      .status(405)
      .json({ error: true, message: "No input prompt found" });
  }

  try {
    const response = await gpt3.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: temperature,
      max_tokens: tokenLength,
    });
    const text = response.data.choices[0].text;

    res.status(200).json({ success: true, text: text });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
}
