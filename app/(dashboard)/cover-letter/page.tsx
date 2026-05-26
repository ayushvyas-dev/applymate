'use client';

import { Button } from '@/components/ui/button';
import { useCompletion } from '@ai-sdk/react';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function CoverLetterGenerator() {
  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/cover-letter',
    streamProtocol: 'text',
  });

  async function handleGenerate() {
    await complete('');
  }

  return (
    // <div className=' flex-1 w-full h-full  border rounded-md'>
    //   <div className='flex h-full'>
    //     <div className='w-[40%] h-full flex flex-col p-4 border-r'>
    //       <Button className='w-[60%]'>Select Job</Button>
    //       <Button className='w-[60%]'>Select Resume</Button>

    //       <Button className='w-[60%]'>Choose Tone</Button>
    //       <ToggleGroup variant='outline' type='single'>
    //         <ToggleGroupItem value='bold' aria-label='Toggle bold'>
    //           Professional
    //         </ToggleGroupItem>
    //         <ToggleGroupItem value='italic' aria-label='Toggle italic'>
    //           Enthusiastic
    //         </ToggleGroupItem>
    //         <ToggleGroupItem
    //           value='strikethrough'
    //           aria-label='Toggle strikethrough'
    //         >
    //           Confident
    //         </ToggleGroupItem>
    //         <ToggleGroupItem value='' aria-label='Toggle strikethrough'>
    //           Friendly
    //         </ToggleGroupItem>
    //       </ToggleGroup>
    //       <Button className='w-[60%]'>Choose Length</Button>
    //       <ToggleGroup variant='outline' type='single'>
    //         <ToggleGroupItem value='bold' aria-label='Toggle bold'>
    //           Short
    //         </ToggleGroupItem>
    //         <ToggleGroupItem value='italic' aria-label='Toggle italic'>
    //           Medium
    //         </ToggleGroupItem>
    //         <ToggleGroupItem
    //           value='strikethrough'
    //           aria-label='Toggle strikethrough'
    //         >
    //           Long
    //         </ToggleGroupItem>
    //       </ToggleGroup>
    //       <Button className='w-[60%]'>Additional Instructions(Optional)</Button>
    //       <Button className='w-[60%]' onClick={handleGenerate}>
    //         Generate
    //       </Button>
    //       <div className='whitespace-pre-wrap rounded-md border p-4'>
    //         {completion}
    //       </div>
    //       <p>1</p>
    //     </div>
    //     <div className='w-[60%] h-full p-2'>
    //       <div>Generate to view</div>
    //     </div>
    //   </div>
    // </div>

    <div className='flex flex-col gap-6 max-w-3xl mx-auto p-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold '>Cover Letter Generator</h2>

        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className='bg-indigo-500 hover:bg-indigo-600'
        >
          {isLoading ? 'Crafting...' : 'Start AI Generation'}
        </Button>
      </div>

      {error && (
        <div className='text-rose-500 text-sm font-medium'>
          Error: {error.message}
        </div>
      )}

      {/* 3. The Output Area */}
      <Card className=' border-zinc-800 min-h-[400px]'>
        <CardContent className='p-6'>
          <ScrollArea className='h-full'>
            {completion ? (
              // The text will automatically type out here in real-time
              <div className='whitespace-pre-wrap  leading-relaxed'>
                {completion}
              </div>
            ) : (
              <div className=' flex items-center justify-center h-[350px]'>
                Your AI-generated cover letter will appear here...
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
