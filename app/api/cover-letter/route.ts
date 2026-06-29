import { groqModel } from '@/lib/ai/models';
import { coverLetterPrompt } from '@/lib/ai/prompts';
import Job from '@/models/Job';
import Resume from '@/models/Resume';
import { streamText } from 'ai';

export async function POST(req: Request) {
    try {
        const body = JSON.parse(await req.text());
        console.log(body);
        const data = JSON.parse(body.prompt);
        console.log(data);

        const {
            jobId,
            resumeId,
            tone,
            length,
            additionalInstructions,
        } = data;

        // Basic validation
        if (!jobId || !resumeId) {
            return Response.json(
                {
                    error: 'Job and resume are required.',
                },
                { status: 400 }
            );
        }

        // Temperature based on tone
        const temperatureMap = {
            professional: 0.4,
            confident: 0.55,
            enthusiastic: 0.7,
        } as const;

        const temperature =
            temperatureMap[
            tone as keyof typeof temperatureMap
            ] ?? 0.4;

        // Token limits based on requested length
        const maxTokensMap = {
            short: 250,
            medium: 450,
            long: 650,
        } as const;

        const maxOutputTokens =
            maxTokensMap[
            length as keyof typeof maxTokensMap
            ] ?? 450;

        const job = await Job.findById(jobId)
            .select('description')
            .lean();

        const resume = await Resume.findById(resumeId)
            .select('structuredResume')
            .lean();
        const prompt = coverLetterPrompt({

            description: job.description,
            structuredResume: resume.structuredResume,
            tone,
            length,
            additionalInstructions
        })
        const result = streamText({
            model: groqModel,
            prompt,
            temperature,
            maxOutputTokens
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

