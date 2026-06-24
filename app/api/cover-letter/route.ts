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

// example for resume-matcher if streamed

// import { groqModel } from '@/lib/ai/models';
// import { resumeMatcherPrompt } from '@/lib/ai/prompts';
// import { streamText } from 'ai';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { title, description, resumeText } = body;
//     const result = await streamText({
//       model: groqModel,
//       prompt: resumeMatcherPrompt({ title, description, resumeText }),
//     });

//     return result.toTextStreamResponse();
//   } catch (error) {
//     console.log(error);
//     return Response.json({ error: 'Resume match failed' }, { status: 500 });
//   }
// }
