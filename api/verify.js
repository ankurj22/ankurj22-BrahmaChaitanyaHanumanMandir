const MASTER_PASSWORD = process.env.UPDATE_PASSWORD;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { password } = req.body;
  if (password === MASTER_PASSWORD) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
}
