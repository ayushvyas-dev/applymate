// lib/pdf/extractResumeText.ts

import { extractText, getDocumentProxy } from 'unpdf';

export async function extractResumeText(fileUrl: string) {
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();

    const document = await getDocumentProxy(
        new Uint8Array(arrayBuffer)
    );

    const { text } = await extractText(document, {
        mergePages: true,
    });

    return {
        resumeText: text.replace(/\s+/g, ' ').trim(),
        pageCount: document.numPages,
    };
}