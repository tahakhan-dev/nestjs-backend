import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import helmet from 'helmet';

/**
 * HttpStrictTransportSecurityMiddleware
 * This middleware sets the HTTP Strict Transport Security (HSTS) header for HTTP responses
 * to enforce secure connections to the server. HSTS ensures that browsers only connect
 * to the server over HTTPS and prevents man-in-the-middle attacks by enforcing encryption.
 *
 * Usage:
 * - Attach this middleware to routes or apply it globally to enforce HSTS across the application.
 * - Configurable options such as `maxAge` and `includeSubDomains` allow customization of the policy.
 *
 * Key Features:
 * 1. Enforces HTTPS connections by instructing the browser to reject HTTP requests.
 * 2. Prevents downgrade attacks and cookie hijacking by ensuring secure connections.
 * 3. Seamlessly integrates with the NestJS middleware lifecycle.
 *
 * Example HSTS Header:
 * Strict-Transport-Security: max-age=31536000; includeSubDomains
 *
 * Workflow:
 * 1. Configures HSTS policies using the `hstsOptions` object.
 * 2. Helmet sets the `Strict-Transport-Security` header in the HTTP response.
 * 3. Passes control to the next middleware or handler in the chain.
 *

 * @class HttpStrictTransportSecurityMiddleware
 */
@Injectable()
export class HttpStrictTransportSecurityMiddleware implements NestMiddleware {
  /**
   * Constructs the HttpStrictTransportSecurityMiddleware instance.
   *
   * @constructor
   */
  constructor() { }

  /**
   * Middleware function to apply HTTP Strict Transport Security (HSTS) headers.
   * 
   * @param {any} req - The incoming HTTP request object.
   * @param {Response} res - The outgoing HTTP response object.
   * @param {() => void} next - The callback to pass control to the next middleware or handler.
   */
  use(req: any, res: Response, next: () => void): void {
    try {
      // Define HSTS options
      const hstsOptions = {
        maxAge: 31536000, // Set max age to 1 year (in seconds)
        includeSubDomains: true, // Apply HSTS to all subdomains
      };

      // Set the Strict-Transport-Security header using Helmet
      helmet.hsts(hstsOptions)(req, res, () => {
        // Pass control to the next middleware or handler
        next();
      });
    } catch (error) {
      // Log errors if setting the HSTS header fails
      console.error('HttpStrictTransportSecurityMiddleware Error:', error);
    }
  }
}
