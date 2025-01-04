import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import helmet from 'helmet';

/**
 * ContentSecurityPolicyMiddleware
 * This middleware sets the Content Security Policy (CSP) for HTTP responses to enhance security.
 * The CSP helps mitigate XSS (Cross-Site Scripting) and data injection attacks by specifying
 * approved sources for content such as scripts, styles, and images.
 *
 * Usage:
 * - Attach this middleware to routes or apply it globally to enforce CSP headers.
 * - Configure `cspOptions` to define the specific policies for your application.
 *
 * Key Features:
 * 1. Defines default security directives using Helmet's `contentSecurityPolicy`.
 * 2. Configures sources for scripts, styles, and images to align with security requirements.
 * 3. Seamlessly integrates into the NestJS middleware lifecycle.
 *
 * Example CSP Header:
 * Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; ...
 *
 * Workflow:
 * 1. Defines CSP directives using the `cspOptions` object.
 * 2. Helmet sets the `Content-Security-Policy` header in the HTTP response.
 * 3. Passes control to the next middleware or handler in the chain.

 * @class ContentSecurityPolicyMiddleware
 */
@Injectable()
export class ContentSecurityPolicyMiddleware implements NestMiddleware {
    /**
     * Constructs the ContentSecurityPolicyMiddleware instance.
     *
     * @constructor
     */
    constructor() {}

    /**
     * Middleware function to apply Content Security Policy headers.
     * 
     * @param {any} req - The incoming HTTP request object.
     * @param {Response} res - The outgoing HTTP response object.
     * @param {() => void} next - The callback to pass control to the next middleware or handler.
     */
    use(req: any, res: Response, next: () => void): void {
        try {
            // Define the desired CSP policies
            const cspOptions = {
                directives: {
                    defaultSrc: ["'self'"], // Allow only same-origin requests by default
                    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts and eval
                    styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
                    imgSrc: ["'self'"], // Allow images from same-origin
                },
            };

            // Set the Content-Security-Policy header using Helmet
            helmet.contentSecurityPolicy(cspOptions)(req, res, () => {
                // Pass control to the next middleware or route handler
                next();
            });
        } catch (error) {
            // Log errors if setting the CSP header fails
            console.error('ContentSecurityPolicyMiddleware Error:', error);
        }
    }
}
