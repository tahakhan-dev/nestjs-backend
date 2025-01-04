import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import helmet from 'helmet';

/**
 * XContentTypeOptionsMiddleware
 * 
 * This middleware sets the `X-Content-Type-Options` HTTP header to prevent MIME type sniffing by browsers.
 * MIME type sniffing can lead to security vulnerabilities, such as Cross-Site Scripting (XSS) or 
 * content injection attacks, where browsers execute content in unintended ways.
 * 
 * Purpose:
 * - To enforce the `Content-Type` header and ensure browsers respect the declared MIME type.
 * - To reduce the risk of executing malicious or unintended scripts.
 * 
 * Key Features:
 * 1. Sets the `X-Content-Type-Options` header to `nosniff` using Helmet.
 * 2. Ensures that browsers do not attempt to infer MIME types for responses.
 * 3. Provides an additional layer of security for web applications.
 * 
 * Example Use Case:
 * A web application serving JavaScript files wants to prevent browsers from treating non-JavaScript files 
 * as scripts in case of incorrect MIME types, enhancing security.
 * 
 * Workflow:
 * 1. Helmet applies the `X-Content-Type-Options` header to all HTTP responses.
 * 2. Middleware ensures the header is included in the response headers.
 * 3. Passes control to the next middleware or route handler in the chain.

 */


@Injectable()
export class XContentTypeOptionsMiddleware implements NestMiddleware {
  /**
   * Constructs the XContentTypeOptionsMiddleware instance.
   */

  constructor(
  ) { }
  /**
 * Middleware function to set the `X-Content-Type-Options` header using Helmet.
 * 
 * @param {Request} req - The incoming HTTP request object.
 * @param {Response} res - The outgoing HTTP response object.
 * @param {NextFunction} next - A callback to pass control to the next middleware or handler.
 */

  use(req: any, res: Response, next: () => void) {
    try {
      // Apply the X-Content-Type-Options header using Helmet
      helmet.contentSecurityPolicy({
        directives: {
          'default-src': ["'self'"],
        },
      })(req, res, () => {
        // Call the next middleware in the chain
        next();
      });
    } catch (error) {
      console.error(error, 'XContentTypeOptionsMiddleware Error');
    }
  }
}
