import OpenAI from 'openai';

export const generateMetadata = async (content) => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Generate title and 3-5 tags for this note. Respond in JSON format: 
        {"title": "...", "tags": [...]}\n\nContent: ${content.substring(0, 1000)}`
      }],
    });
    
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("AI Error:", error);
    return { title: "New Note", tags: [] };
  }
};