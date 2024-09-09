import {
  Environment,
  IndependencyLevel,
  PetAge,
  PetEnergy,
  PetSize,
} from '@prisma/client'
import { z } from 'zod'

export const createPetRequest = z.object({
  name: z.string(),
  about: z.string(),
  age: z.enum([PetAge.BABY, PetAge.YOUNG, PetAge.ADULT, PetAge.SENIOR]),
  size: z.enum([PetSize.SMALL, PetSize.MEDIUM, PetSize.LARGE]),
  energy: z.enum([PetEnergy.LOW, PetEnergy.MEDIUM, PetEnergy.HIGH]),
  independencyLevel: z.enum([
    IndependencyLevel.LOW,
    IndependencyLevel.MEDIUM,
    IndependencyLevel.HIGH,
  ]),
  environment: z.enum([Environment.APARTMENT, Environment.HOUSE]),
  requests: z.array(z.string()).nullable(),
})

export type CreatePetRequest = z.infer<typeof createPetRequest>
