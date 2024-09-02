import fastify from 'fastify'
import { ErrorHandler } from '~/errors/errorHandler'
import { OrganizationRoute } from '~/routes/organizationRoute'

export const kernel = fastify()

kernel.register(new OrganizationRoute().register)
kernel.setErrorHandler(ErrorHandler)
