'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing smart exercise suggestions based on user input.
 *
 * It includes:
 * - smartExerciseSuggestion: An exported function that takes user input and returns exercise suggestions.
 * - SmartExerciseSuggestionInput: The input type for the smartExerciseSuggestion function.
 * - SmartExerciseSuggestionOutput: The output type for the smartExerciseSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartExerciseSuggestionInputSchema = z.object({
  userInput: z
    .string()
    .describe(
      'The user input containing conversation history and fitness goals.'
    ),
});
export type SmartExerciseSuggestionInput = z.infer<
  typeof SmartExerciseSuggestionInputSchema
>;

const SmartExerciseSuggestionOutputSchema = z.object({
  exerciseSuggestions: z
    .array(z.string())
    .describe('A list of relevant workout routines.'),
  reasoning: z
    .string()
    .describe(
      'Explanation of why those routines were suggested to the user.'
    ),
});
export type SmartExerciseSuggestionOutput = z.infer<
  typeof SmartExerciseSuggestionOutputSchema
>;

export async function smartExerciseSuggestion(
  input: SmartExerciseSuggestionInput
): Promise<SmartExerciseSuggestionOutput> {
  return smartExerciseSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartExerciseSuggestionPrompt',
  input: {schema: SmartExerciseSuggestionInputSchema},
  output: {schema: SmartExerciseSuggestionOutputSchema},
  prompt: `You are an AI fitness coach. Given the user's input, conversation history, and fitness goals, suggest relevant workout routines.

Consider the following exercises:
- Calisthenics
- Weight Training
- Cardio (Running, Swimming, Cycling)
- Yoga
- Pilates

User Input: {{{userInput}}}

Respond with a list of suggested workout routines, with a reasoning to why those routines were suggested to the user. Format the output as a JSON object.`,
});

const smartExerciseSuggestionFlow = ai.defineFlow(
  {
    name: 'smartExerciseSuggestionFlow',
    inputSchema: SmartExerciseSuggestionInputSchema,
    outputSchema: SmartExerciseSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
