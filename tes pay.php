<?php
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Ambil data dari request
$input = json_decode(file_get_contents("php://input"), true);
$amount = isset($input['amount']) ? $input['amount'] : null;

// QRIS statis milik kamu
$qris_statis = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214758392711572990303UMI51440014ID.CO.QRIS.WWW0215ID20243553748910303UMI5204541153033605802ID5929TOKO AFIQ STOREZ 01 OK21063336006JEPARA61055946362070703A016304C1A7";

// Validasi input
if (!$amount || !$qris_statis) {
    echo json_encode(["status" => "error", "message" => "Jumlah tidak valid"]);
    exit;
}

// Panggil API QRIS Dinamis
$url = "https://qrisku.my.id/api";
$data = [
    "amount" => $amount,
    "qris_statis" => $qris_statis
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // biar nggak ngegantung
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(["status" => "error", "message" => "cURL error: " . curl_error($ch)]);
    curl_close($ch);
    exit;
}

// Cek status HTTP
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if (!$response) {
    echo json_encode([
        "status" => "error",
        "message" => "Tidak ada respon dari server API.",
        "http_code" => $httpCode
    ]);
    exit;
}

echo $response;
?>