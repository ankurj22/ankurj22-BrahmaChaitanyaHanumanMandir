import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const MASTER_PASSWORD = process.env.UPDATE_PASSWORD; // Set this in Vercel Settings

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all items from the "inventory" key in Redis
    const data = await redis.get('inventory') || [];
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { password, updatedList } = req.body;

    // Security Check: Only update if password matches
    if (password !== MASTER_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Save the new list to Redis
    await redis.set('inventory', updatedList);
    return res.status(200).json({ success: true });
  }
}
