import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class BullQueueService {
    private readonly logger = new Logger(BullQueueService.name);

    constructor(
        @InjectQueue('welcome-user') private readonly audioQueue: Queue,
    ) { }

     /**
     * Add a Job to the Queue
     *
     * This method adds a job to the `welcome-user` queue. It accepts a job name and 
     * associated data, handles retries, and ensures the job is removed on completion 
     * or failure to prevent cluttering the queue.
     *
     * @param {string} jobName - The name of the job to be added to the queue.
     * @param {any} data - The payload or data associated with the job.
     * @returns {Promise<string>} - Returns the ID of the added job upon successful addition.
     *
     * @throws {InternalServerErrorException} - Throws an exception in the event of:
     *   - Queue initialization issues
     *   - Connection failures
     *   - Unexpected errors during job addition
     */
    async addToQueue(jobName: string, data: any): Promise<string> {
        try {
            this.logger.log(`Adding job to queue: ${jobName}`, data);

            const job = await this.audioQueue.add(jobName, data, {
                removeOnComplete: true, // Automatically remove job on successful completion
                removeOnFail: true,    // Automatically remove job on failure
                attempts: 3,           // Retry the job up to 3 times on failure
            });

            this.logger.log(`Job added to queue successfully: ID ${job.id}`);
            return job.id;
        } catch (error) {
            this.logger.error('Failed to add job to queue:', error);

            // Handle specific BullMQ errors if applicable
            if (error.message.includes('Queue is not initialized')) {
                throw new InternalServerErrorException('Queue is not properly initialized. Please check the configuration.');
            }

            if (error.message.includes('Connection')) {
                throw new InternalServerErrorException('Failed to connect to the queue. Please check the connection settings.');
            }

            // For all other errors, throw a generic internal server error
            throw new InternalServerErrorException('An unexpected error occurred while adding the job to the queue.');
        }
    }
}
