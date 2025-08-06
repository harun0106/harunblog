<?php
header('Content-Type: application/json');

// Cloudflare Turnstile doğrulama
$secretKey = "0x4AAAAAAABjX4..."; // Cloudflare secret key
$token = $_POST['cf-turnstile-response'];
$ip = $_SERVER['REMOTE_ADDR'];

$url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
$data = [
    'secret' => $secretKey,
    'response' => $token,
    'remoteip' => $ip
];

$options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$outcome = json_decode($result, true);

if (!$outcome['success']) {
    echo json_encode(['success' => false, 'message' => 'Robot doğrulama başarısız']);
    exit;
}

// Form verilerini al
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$phonePrefix = filter_var($_POST['phone-prefix'], FILTER_SANITIZE_STRING);
$phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

// E-posta ayarları
$to = "sizinemail@example.com"; // Kendi emailiniz
$subject = "Yeni İletişim Formu Mesajı: $name";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// E-posta içeriği
$emailContent = "
<h2>Yeni İletişim Formu Mesajı</h2>
<p><strong>Adı:</strong> $name</p>
<p><strong>E-posta:</strong> $email</p>
<p><strong>Telefon:</strong> $phonePrefix $phone</p>
<p><strong>Mesaj:</strong></p>
<p>$message</p>
<p><small>Bu mesaj iletişim formu aracılığıyla gönderilmiştir.</small></p>
";

// E-posta gönderimi
$mailSent = mail($to, $subject, $emailContent, $headers);

if ($mailSent) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'E-posta gönderilemedi']);
}
?>