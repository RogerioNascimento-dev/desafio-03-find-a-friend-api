import { z } from 'zod'

export const detailPetRequest = z.object({
  petId: z.string(),
})

export type DetailPetRequest = z.infer<typeof detailPetRequest>
