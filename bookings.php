<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = db();

try {
  if ($method === 'GET') {
    // GET /api/bookings.php?status=Pending|Confirmed|Cancelled|All
    $status = $_GET['status'] ?? 'All';
    if ($status === 'All') {
      $stmt = $pdo->query("SELECT * FROM bookings ORDER BY date DESC, time DESC, id DESC");
    } else {
      $stmt = $pdo->prepare("SELECT * FROM bookings WHERE status = ? ORDER BY date DESC, time DESC, id DESC");
      $stmt->execute([$status]);
    }
    json_out(['ok'=>true, 'rows'=>$stmt->fetchAll()]);
  }

  if ($method === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'create') {
      $name  = trim($_POST['name'] ?? '');
      $phone = trim($_POST['phone'] ?? '');
      $email = trim($_POST['email'] ?? '') ?: null;
      $date  = $_POST['date'] ?? '';
      $time  = $_POST['time'] ?? '';
      $party = (int)($_POST['party'] ?? 0);
      $note  = trim($_POST['note'] ?? '') ?: null;

      if ($name==='' || $phone==='' || $date==='' || $time==='' || $party<=0) {
        json_out(['ok'=>false,'error'=>'Missing required fields'], 400);
      }

      $stmt = $pdo->prepare(
        "INSERT INTO bookings (name,phone,email,date,time,party,note) VALUES (?,?,?,?,?,?,?)"
      );
      $stmt->execute([$name,$phone,$email,$date,$time,$party,$note]);
      json_out(['ok'=>true, 'id'=>$pdo->lastInsertId()]);
    }

    // ... inside POST handler
if ($action === 'confirm') {
  $id = (int)($_POST['id'] ?? 0);
  if ($id <= 0) json_out(['ok'=>false,'error'=>'Invalid id'], 400);
  $pdo->prepare("UPDATE bookings SET status='Confirmed' WHERE id=?")->execute([$id]);
  json_out(['ok'=>true]);
}

if ($action === 'delete') {
  $id = (int)($_POST['id'] ?? 0);
  if ($id <= 0) json_out(['ok'=>false,'error'=>'Invalid id'], 400);
  $pdo->prepare("DELETE FROM bookings WHERE id=?")->execute([$id]);
  json_out(['ok'=>true]);
}


    json_out(['ok'=>false,'error'=>'Unknown action'], 400);
  }

  json_out(['ok'=>false,'error'=>'Method not allowed'], 405);

} catch (Throwable $e) {
  json_out(['ok'=>false, 'error'=>$e->getMessage()], 500);
}
