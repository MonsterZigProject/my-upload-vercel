export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log("BODY:", req.body);

  return res.status(200).json({ ok: true, body: req.body });
}
