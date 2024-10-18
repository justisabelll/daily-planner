import { Redis } from 'ioredis';
import { REDIS_URL } from '$env/static/private';

if (!REDIS_URL) {
	throw new Error('REDIS_URL is not set');
}

const redis = new Redis(REDIS_URL);

export default redis;
