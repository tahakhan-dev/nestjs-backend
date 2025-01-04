import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * XssProtectionMiddleware
 * 
 * This middleware sets the `X-XSS-Protection` HTTP header to enable the browser's built-in XSS filter.
 * The header instructs the browser to block rendering of pages when potential cross-site scripting (XSS) 
 * attacks are detected, providing an additional layer of security against malicious scripts.
 * 
 * Purpose:
 * - To mitigate the risk of XSS attacks by enabling the browser's XSS protection mechanism.
 * - To ensure that potentially harmful content is blocked rather than rendered.
 * 
 * Key Features:
 * 1. Sets the `X-XSS-Protection` header to `1; mode=block`, enabling the XSS filter and blocking the page if an attack is detected.
 * 2. Enhances security by utilizing the browser's built-in protections.
 * 3. Seamlessly integrates into the NestJS middleware lifecycle.
 * 
 * Example X-XSS-Protection Header:
 * `X-XSS-Protection: 1; mode=block`
 * 
 * Workflow:
 * 1. The middleware applies the `X-XSS-Protection` header to all HTTP responses.
 * 2. Ensures the browser blocks potentially harmful scripts instead of rendering them.
 * 3. Passes control to the next middleware or route handler in the chain.
 */

@Injectable()
export class XssProtectionMiddleware implements NestMiddleware {
  /**
   * Constructs the XssProtectionMiddleware instance.
   */
  constructor(
  ) { }
  /**
   * Middleware function to set the `X-XSS-Protection` HTTP header.
   * 
   * @param {Request} req - The incoming HTTP request object.
   * @param {Response} res - The outgoing HTTP response object.
   * @param {NextFunction} next - A callback to pass control to the next middleware or handler.
   */
  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Set the X-XSS-Protection header to enable XSS filtering and block pages on attack detection
      res.setHeader('X-XSS-Protection', '1; mode=block');
      // Pass control to the next middleware or handler
      next();
    } catch (error) {
      // Log any errors that occur
      console.error('XssProtectionMiddleware Error:', error);
    }
  }
}