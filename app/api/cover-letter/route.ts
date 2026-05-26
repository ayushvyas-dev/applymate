import { groqModel } from '@/lib/ai/models';
import { streamText } from 'ai';
import { buildCoverLetterPrompt } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  try {
    // const body = await req.json();

    const result = streamText({
      model: groqModel,
      prompt: buildCoverLetterPrompt(),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Cover letter generation failed' },
      { status: 500 },
    );
  }
}
