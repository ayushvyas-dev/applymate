import { groqModel } from '@/lib/ai/models';
import { generateText } from 'ai';
import { buildCoverLetterPrompt } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await generateText({
      model: groqModel,
      prompt: buildCoverLetterPrompt(body),
    });
    console.log(result.text);
    console.log(result.output);
    console.log(result.usage);
    return Response.json({
      success: true,
      status: 201,
      message: 'cover letter generated successfully',
      result: result.text,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Cover letter generation failed' },
      { status: 500 },
    );
  }
}
