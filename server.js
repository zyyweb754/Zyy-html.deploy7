import express from 'express';
import qrisDinamis from 'qris-dinamis';

const app = express();
app.use(express.static("."));
app.use(express.json());

// Endpoint untuk buat QRIS dinamis
app.post("/api/qris", async (req, res) => {
  try {
    const { amount } = req.body;
    const qrisStatis = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214758392711572990303UMI51440014ID.CO.QRIS.WWW0215ID20243553748910303UMI5204541153033605802ID5929TOKO AFIQ STOREZ 01 OK21063336006JEPARA61055946362070703A016304C1A7";

    // hasilkan QRIS dinamis base64
    const result = await qrisDinamis.makeFile(qrisStatis, {
      nominal: amount.toString(),
      base64: true,
    });

    res.json({ status: "success", qris_base64: result });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));