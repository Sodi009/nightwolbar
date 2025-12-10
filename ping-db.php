<?php
require_once __DIR__.'/db.php';
try {
  $pdo = db();
  $n = $pdo->query("SELECT COUNT(*) FROM bookings")->fetchColumn();
  echo "db ok, bookings=".$n;
} catch (Throwable $e) {
  http_response_code(500);
  echo "db error: ".$e->getMessage();
}
