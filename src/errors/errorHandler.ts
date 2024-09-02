import { AxiosError } from 'axios'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { env } from '~/env'

interface ErrorHandler {
  [key: string]: (reply: FastifyReply, error: Error) => void
}

export function ErrorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  const errorHandles: ErrorHandler = {
    ZodError: handlerZodError,
    AxiosError: handlerAxiosError,
    InvalidZipCodeError: handlerInvalidZipCodeError,
    EmailAlreadyExistsError: handlerEmailAlreadyExistsError,
  }

  const handler = errorHandles[error.constructor.name]

  if (handler) return handler(reply, error)

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here should log to ann external tool like DataDog / NewRelix / Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
}

function handlerZodError(reply: FastifyReply, error: Error) {
  const zodError = error as ZodError
  reply
    .status(422)
    .send({ message: 'Validation error.', issues: zodError.format() })
}

function handlerAxiosError(reply: FastifyReply, error: Error) {
  const axiosError = error as AxiosError
  reply.status(axiosError.status ?? 500).send({ message: error.message })
}
function handlerInvalidZipCodeError(reply: FastifyReply, error: Error) {
  reply.status(400).send({ message: error.message })
}
function handlerEmailAlreadyExistsError(reply: FastifyReply, error: Error) {
  reply.status(400).send({ message: error.message })
}
