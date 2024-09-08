import {
  Environment,
  IndependencyLevel,
  PetAge,
  PetEnergy,
  PetSize,
} from '@prisma/client'
import { z } from 'zod'

export const listPetRequest = z
  .object({
    age: z.enum([PetAge.BABY, PetAge.YOUNG, PetAge.ADULT, PetAge.SENIOR]),
    size: z.enum([PetSize.SMALL, PetSize.MEDIUM, PetSize.LARGE]),
    energy: z.enum([PetEnergy.LOW, PetEnergy.MEDIUM, PetEnergy.HIGH]),
    independency_level: z.enum([
      IndependencyLevel.LOW,
      IndependencyLevel.MEDIUM,
      IndependencyLevel.HIGH,
    ]),
    environment: z.enum([Environment.APARTMENT, Environment.HOUSE]),
  })
  .partial()

export const listPetParamRequest = z.object({
  city: z.string(),
})

export type ListPetRequest = z.infer<typeof listPetRequest>
export type ListPetParamRequest = z.infer<typeof listPetParamRequest>
