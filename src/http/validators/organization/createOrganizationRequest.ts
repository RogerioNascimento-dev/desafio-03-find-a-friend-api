import z from 'zod'

export const createOrganizationRequest = z.object({
  name: z.string().min(3).max(255),
  zipCode: z.string(),
  street: z.string().nullable(),
  email: z.string().email(),
  password: z.string().min(6),
  whatsapp: z.string(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export type CreateOrganizationRequest = z.infer<
  typeof createOrganizationRequest
>
