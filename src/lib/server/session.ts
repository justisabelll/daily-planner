import redis from '$lib/server/redis';
import { randomBytes } from 'crypto';
import type { Cookies } from '@sveltejs/kit';

interface Session {
	user: string;
	timestamp: string;
}

const SESSION_COOKIE_NAME = 'session_id';
const SESSION_EXPIRY = 60 * 60 * 24 * 30; // 30 days

const createSession = async (cookies: Cookies) => {
	const sessionId = randomBytes(16).toString('hex');
	const user = randomBytes(16).toString('hex');
	const timestamp = Date.now().toString();

	// hm set is a hash map set
	await redis.hmset(sessionId, { user, timestamp });
	await redis.expire(sessionId, SESSION_EXPIRY);

	cookies.set(SESSION_COOKIE_NAME, sessionId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: SESSION_EXPIRY,
		path: '/'
	});

	return { sessionId, user, timestamp };
};

export const getSession = async (cookies: Cookies) => {
	const sessionId = cookies.get(SESSION_COOKIE_NAME);

	if (!sessionId) {
		return createSession(cookies);
	}

	const session = (await redis.hgetall(sessionId)) as unknown as Session;
	const user = session.user;
	const timestamp = session.timestamp;

	if (!user || !timestamp) {
		return createSession(cookies);
	}

	await redis.expire(sessionId!, SESSION_EXPIRY);

	return { user, timestamp };
};

export const updateSession = async (cookies: Cookies, { data }: { data: Session }) => {
	const sessionId = cookies.get(SESSION_COOKIE_NAME);

	if (!sessionId) {
		return createSession(cookies);
	}

	await redis.hset(sessionId, data);
	await redis.expire(sessionId, SESSION_EXPIRY);
};
