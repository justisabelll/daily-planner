// import { dev } from '$app/environment';

interface RateLimitOptions {
	maxRequests: number;
	windowMs: number;
}

const defaultOptions: RateLimitOptions = {
	maxRequests: 50,
	windowMs: 60 * 1000 // 1 minute
};

const ipMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(ip: string, options: RateLimitOptions = defaultOptions) {
	// if (dev) {
	// 	return { success: true, remaining: Infinity };
	// }

	const now = Date.now();
	const record = ipMap.get(ip);

	if (!record || now > record.resetTime) {
		ipMap.set(ip, { count: 1, resetTime: now + options.windowMs });
		return { success: true, remaining: options.maxRequests - 1 };
	}

	if (record.count >= options.maxRequests) {
		return { success: false, remaining: 0 };
	}

	record.count++;
	return { success: true, remaining: options.maxRequests - record.count };
}

export function createRateLimiter(options: RateLimitOptions = defaultOptions) {
	return (ip: string) => rateLimit(ip, options);
}

/**
 * How this rate limiter works:
 *
 * 1. The rate limiter uses a Map (ipMap) to store rate limit information for each IP address.
 *
 * 2. When a request comes in, the rateLimit function is called with the IP address.
 *
 * 3. If there's no record for the IP or the current time is past the reset time:
 *    - A new record is created with a count of 1 and a new reset time.
 *    - The request is allowed.
 *
 * 4. If there's an existing record:
 *    - If the count has reached the maximum allowed requests, the request is denied.
 *    - Otherwise, the count is incremented and the request is allowed.
 *
 * 5. The function returns an object indicating whether the request was successful
 *    and how many requests remain for the current window.
 *
 * 6. The createRateLimiter function allows creating a rate limiter with custom options.
 *
 * 7. The exported rateLimiter is a pre-configured instance using the default options.
 *
 * Note: There's commented-out code for bypassing the rate limit in development mode.
 */
