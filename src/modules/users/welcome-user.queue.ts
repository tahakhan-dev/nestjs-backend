import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Job } from 'bullmq';


/**
 * WelcomeUserQueue
 *
 * This class is responsible for processing jobs in the `welcome-user` queue. It
 * extends the `WorkerHost` from BullMQ to handle job processing and lifecycle events.
 * It includes methods for processing jobs, handling successful completions, and
 * handling job failures.
 */

@Processor('welcome-user')
export class WelcomeUserQueue extends WorkerHost {
    private readonly logger = new Logger(WelcomeUserQueue.name);

    constructor() {
        super();
    }


    /**
    * Process Job
    *
    * Handles the processing of jobs in the `welcome-user` queue. Ensures the integrity
    * of job data, generates a welcome message, and logs the results.
    *
    * @param {Job<any>} job - The BullMQ job containing the user data.
    * @returns {Promise<any>} - Resolves with job processing details on success.
    *
    * @throws {InternalServerErrorException} - If the job data is invalid.
    */
    async process(job: Job<any>): Promise<any> {
        try {
            // Ensure job data integrity
            if (!job.data?.metadata?.user?.name) {
                throw new InternalServerErrorException(`Invalid job data for job ${job.id}`);
            }

            const welcomeMessage = `Welcome to the platform, ${job.data.metadata.user.name}!`;
            this.logger.log(`Job ${job.id} processed successfully with message: ${welcomeMessage}`);

            return { jobId: job.id, message: welcomeMessage };
        } catch (error) {
            this.logger.error(`Error during job processing ${job.id}: ${error.message}`, error.stack);

            // Throwing the error ensures BullMQ handles retries if configured
            throw error;
        }
    }

    /**
       * Job Completion Event Handler
       *
       * Handles the `completed` event triggered when a job is successfully processed.
       *
       * @param {Job} job - The job that was completed.
       * @param {any} result - The result of the job processing.
       */
    @OnWorkerEvent('completed')
    async onCompleted(job: Job, result: any) {
        try {
            this.logger.log(`Job ${job.id} completed successfully with result: ${JSON.stringify(result)}`);
        } catch (error) {
            this.logger.error(`Error during job completion event for job ${job.id}: ${error.message}`, error.stack);
        }
    }

    /**
       * Job Failure Event Handler
       *
       * Handles the `failed` event triggered when a job fails to process.
       *
       * @param {Job} job - The job that failed.
       * @param {Error} error - The error that caused the job to fail.
       */
    @OnWorkerEvent('failed')
    async onFailed(job: Job, error: Error) {
        try {
            this.logger.error(`Job ${job.id} failed with error: ${error.message}`, error.stack);
        } catch (eventError) {
            this.logger.error(`Error during job failure event for job ${job.id}: ${eventError.message}`, eventError.stack);
        }
    }
}
