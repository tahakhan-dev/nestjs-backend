import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import helmet from 'helmet';


/**
 * ReferrerPolicyMiddleware
 * 
 * This middleware sets the `Referrer-Policy` HTTP header to control how much referrer information
 * is included with requests made from your web application. By using Helmet's `referrerPolicy`,
 * this middleware ensures that only the specified referrer policy is applied to enhance privacy
 * and security.
 * 
 * Purpose:
 * - To protect user privacy by restricting the amount of referrer information shared with external websites.
 * - To comply with security best practices by controlling the `Referer` header.
 * 
 * Key Features:
 * 1. Configures the `Referrer-Policy` header to enforce the desired referrer-sharing behavior.
 * 2. Ensures that sensitive referrer information is not exposed unnecessarily.
 * 3. Seamlessly integrates with the NestJS middleware lifecycle.
 * 
 * Example Referrer-Policy Header:
 * `Referrer-Policy: same-origin`
 * 
 * Workflow:
 * 1. Helmet applies the `Referrer-Policy` header with the specified policy.
 * 2. Middleware ensures the header is included in every HTTP response.
 * 3. Passes control to the next middleware or route handler in the chain.
 
 */

@Injectable()
export class ReferrerPolicyMiddleware implements NestMiddleware {
    /**
     * Constructs the ReferrerPolicyMiddleware instance.
     */
    constructor(
    ) { }

    /**
    * Middleware function to set the `Referrer-Policy` HTTP header using Helmet.
    * 
    * @param {Request} req - The incoming HTTP request object.
    * @param {Response} res - The outgoing HTTP response object.
    * @param {NextFunction} next - A callback to pass control to the next middleware or handler.
    */
    use(req: any, res: Response, next: () => void) {
        try {
            // Apply the Referrer-Policy header using Helmet
            helmet.referrerPolicy({ policy: 'same-origin' })(req, res, () => {
                // Pass control to the next middleware or handler
                next();
            });
        } catch (error) {
            console.error(error, "ReferrerPolicyMiddleware Error");
        }
    }
}
