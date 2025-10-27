export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  try {
    const { amount } = req.body;
    const qris_statis = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214758392711572990303UMI51440014ID.CO.QRIS.WWW0215ID20243553748910303UMI5204541153033605802ID5929TOKO AFIQ STOREZ 01 OK21063336006JEPARA61055946362070703A016304C1A7";

    if (!amount) {
      return res.status(400).json({ status: "error", message: "Jumlah tidak valid" });
    }

    const response = await fetch("https://qrisku.my.id/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, qris_statis })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message || "Gagal menghubungi server QRIS"
    });
  }
}