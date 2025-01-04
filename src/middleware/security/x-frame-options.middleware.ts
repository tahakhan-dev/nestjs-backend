import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import helmet from 'helmet';

/**
 * XFrameOptionsMiddleware
 * 
 * This middleware sets the `X-Frame-Options` HTTP header to protect web applications
 * from clickjacking attacks. By using Helmet's `frameguard` feature, this middleware
 * ensures that the application cannot be embedded in a `<frame>` or `<iframe>` by unauthorized
 * domains, thus enhancing security.
 * 
 * Purpose:
 * - To prevent clickjacking attacks by controlling which domains can embed the application in a frame.
 * - To enforce a restrictive frame embedding policy using the `X-Frame-Options` header.
 * 
 * Key Features:
 * 1. Configures the `X-Frame-Options` header to `sameorigin` by default, allowing only same-origin frames.
 * 2. Protects against malicious sites attempting to embed the application in a frame.
 * 3. Seamlessly integrates with the NestJS middleware lifecycle.
 * 
 * Example X-Frame-Options Header:
 * `X-Frame-Options: SAMEORIGIN`
 * 
 * Workflow:
 * 1. Helmet applies the `X-Frame-Options` header to all HTTP responses.
 * 2. Middleware ensures the header is included in every HTTP response.
 * 3. Passes control to the next middleware or route handler in the chain.
 */

@Injectable()
export class XFrameOptionsMiddleware implements NestMiddleware {
    /**
         * Constructs the XFrameOptionsMiddleware instance.
         */
    constructor(
        // Optionally inject services such as KafkaService for logging or monitoring
        // @Inject(KafkaService) private readonly kafkaService: KafkaService,
    ) { }

    /**
     * Middleware function to set the `X-Frame-Options` header using Helmet.
     * 
     * @param {any} req - The incoming HTTP request object.
     * @param {Response} res - The outgoing HTTP response object.
     * @param {() => void} next - A callback to pass control to the next middleware or handler.
     */
    use(req: any, res: Response, next: () => void) {
        try {
            // Set the X-Frame-Options header to SAMEORIGIN using Helmet's frameguard
            helmet({ frameguard: { action: 'sameorigin' } })(req, res, () => {
                // Pass control to the next middleware or handler
                next();
            });
        } catch (error) {
            console.error('XFrameOptionsMiddleware Error:', error);
        }
    }
}