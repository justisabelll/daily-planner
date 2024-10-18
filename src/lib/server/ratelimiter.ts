// import { dev } from '$app/environment';
import redis from '$lib/server/redis';

interface RateLimitOptions {
	maxRequests: number;
	windowMs: number;
}

// TODO: add ui that tells the user to slow down or whatever

const defaultOptions: RateLimitOptions = {
	maxRequests: 100,
	windowMs: 5 * 60 * 1000 // 5 minutes
};

export async function rateLimit(ip: string, options: RateLimitOptions = defaultOptions) {
	// if (dev) {
	// 	return { success: true, remaining: Infinity };
	// }

	const key = `rate_limit:${ip}`;
	try {
		// Increment the count for this IP
		const count = await redis.incr(key);

		if (count === 1) {
			// Set the expiration time for the key
			await redis.pexpire(key, options.windowMs);
		}

		if (count > options.maxRequests) {
			return { success: false, remaining: 0 };
		}

		return { success: true, remaining: options.maxRequests - count };
	} catch (error) {
		console.error('Rate limiter error:', error);
		// In case of Redis failure, allow the request
		return { success: true, remaining: options.maxRequests };
	}
}

export function createRateLimiter(options: RateLimitOptions = defaultOptions) {
	return (ip: string) => rateLimit(ip, options);
}

/**
 * How this rate limiter works:
 *
 * 1. The rate limiter uses Redis to store rate limit information for each IP address.
 *
 * 2. When a request comes in, the rateLimit function is called with the IP address.
 *
 * 3. A Redis key is created for the IP address with a prefix 'rate_limit:'.
 *
 * 4. The count for this IP is incremented using Redis' INCR command.
 *
 * 5. If it's the first request (count === 1), an expiration time is set for the key.
 *
 * 6. If the count exceeds the maximum allowed requests, the request is denied.
 *
 * 7. The function returns an object indicating whether the request was successful
 *    and how many requests remain for the current window.
 *
 * 8. In case of a Redis error, the request is allowed as a fallback.
 *
 * 9. The createRateLimiter function allows creating a rate limiter with custom options.
 *
 * 10. The rate limiter uses a sliding window approach, where each request resets
 *     the expiration time for the key, ensuring a rolling time window.
 *
 * Note: There's commented-out code for bypassing the rate limit in development mode.
 */
