/**
 * Configuration Validation Schema
 * 
 * This module defines a Joi schema for validating environment variables required by the application.
 * The schema ensures that all necessary configuration values are present and adhere to the expected data types.
 * 
 * Usage:
 * This schema is used during application startup to validate the environment variables.
 * If any required variable is missing or invalid, the application will not start, ensuring a consistent configuration state.
 */

import * as Joi from 'joi';

export const configValidationSchema = Joi.object({

  PORT: Joi?.number()?.required(),
  APP_VERSION: Joi?.string()?.required(),

  DB_USER: Joi?.string()?.required(),
  DB_PASSWORD: Joi?.string()?.required(),
  DB_HOST: Joi?.string()?.required(),
  DB_DATABASE: Joi?.string()?.required(),
  DB_TYPE: Joi?.string()?.required(),
  DB_PORT: Joi?.number()?.required(),
  POOL_SIZE: Joi?.number()?.required(),
  ENABLE_AUTOMATIC_CREATION: Joi?.boolean()?.required(),
  AUTO_LOAD_ENTITIES: Joi?.boolean()?.required(),
  ENABLE_LOGGING: Joi?.boolean()?.required(),





});
