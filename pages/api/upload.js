export default async function handler(req, res) {
  try {
    const { private_key, data, content_type } = req.body;

    if (!private_key || !data || !content_type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    import('bundlr-network-client').then(async ({ default: Bundlr }) => {
      const Buffer = (await import('buffer')).Buffer;
      const bundlr = new Bundlr("https://node1.bundlr.network", "matic", private_key, {
        providerUrl: "https://polygon-rpc.com"
      });

      await bundlr.ready();

      const buffer = Buffer.from(data, 'base64');
      const tx = bundlr.createTransaction(buffer, { tags: [{ name: "Content-Type", value: content_type }] });
      await tx.sign();
      const result = await tx.upload();

      res.status(200).json({
        message: "Upload success",
        arweaveUrl: `https://arweave.net/${tx.id}`
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.toString() });
  }
}
