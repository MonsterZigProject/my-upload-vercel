import { WebBundlr } from "@bundlr-network/client";
import { ethers } from "ethers";

export default async function handler(req, res) {
  try {
    const { private_key, data, content_type } = req.body || {};

    if (!private_key || !data) {
      return res.status(400).json({ error: "Missing private_key or data" });
    }

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
    const wallet = new ethers.Wallet(private_key, provider);
    const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", wallet);
    await bundlr.ready();

    const buffer = Buffer.from(data, "base64");

    const tx = await bundlr.upload(buffer, {
      tags: [
        { name: "Content-Type", value: content_type || "application/octet-stream" }
      ]
    });

    return res.status(200).json({ arweaveUrl: https://arweave.net/${tx.id} });

  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ error: "Upload failed", details: err.toString() });
  }
}