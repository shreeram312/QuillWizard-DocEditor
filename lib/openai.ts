import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

export async function openAI(description: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "I need to help writing about the description I provided,suggest me some ideas for my story unfolding or resume writing ",
      },
      {
        role: "user",
        content: JSON.stringify({
          description: [description],
        }),
      },
    ],
  });

  const messagecontent = response.choices[0].message?.content;
  if (messagecontent) {
    return messagecontent;
  }
}
