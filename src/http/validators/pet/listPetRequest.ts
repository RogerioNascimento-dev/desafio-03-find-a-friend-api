import { z } from 'zod'

export const listPetRequest = z.object({
  city: z.string(),
})
export type ListPetRequest = z.infer<typeof listPetRequest>
