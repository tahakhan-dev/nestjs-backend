import { Injectable, NestMiddleware } from '@nestjs/common';
import * as compression from 'compression';

/**
 * CompressionMiddleware
 * This middleware integrates the `compression` library to compress HTTP responses.
 * It is typically used to reduce the size of response payloads, improve network performance,
 * and optimize bandwidth usage by enabling compression techniques such as Gzip or Deflate.
 *
 * Usage:
 * - Attach this middleware to specific routes or apply it globally in the application.
 * - The `compression` library automatically determines the best compression method based on
 *   the client's capabilities and content type of the response.
 *
 * Key Features:
 * 1. Automatically compresses responses based on the `Accept-Encoding` header.
 * 2. Enhances performance by reducing the size of response payloads.
 * 3. Seamlessly integrates with the NestJS middleware lifecycle.
 *
 * Example Workflow:
 * - Request: Client sends an HTTP request with the `Accept-Encoding: gzip` header.
 * - Middleware: Compresses the response using Gzip if supported by the client.
 * - Response: Sends back the compressed response to the client.
 *
 * Error Handling:
 * - If compression fails, an error is logged.
 * - Integration with Kafka (commented out in this example) can send error information to a topic for monitoring.
 *
 * @class CompressionMiddleware
 */
@Injectable()
export class CompressionMiddleware implements NestMiddleware {
    /**
     * Constructs the CompressionMiddleware instance.
     *
     * @constructor
     */
    constructor(
        // Inject KafkaService or other dependencies as needed
        // @Inject(KafkaService) private readonly kafkaService: KafkaService,
    ) { }

    /**
     * Middleware function to compress HTTP responses.
     * 
     * @param {any} req - The incoming HTTP request object.
     * @param {any} res - The outgoing HTTP response object.
     * @param {() => void} next - The callback to pass control to the next middleware or handler.
     */
    use(req: any, res: any, next: () => void): void {
        try {
            // Invoke the `compression` middleware to handle response compression
            compression()(req, res, next);
        } catch (error) {
            console.error('CompressionMiddleware Error:', error);
        }
    }
}
