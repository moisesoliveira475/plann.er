import type { FastifyInstance } from "fastify";
import { ClintError } from "./errors/client-error";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if(error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Invalid input',
      errors: error.flatten().fieldErrors
    })
  }
  if (error instanceof ClintError) {
    return reply.status(400).send({
      message: error.message
    })
  }
  return reply.status(500).send({ message: 'internal server error' })
}