<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['id'])) {
    require '../db_conn.php';

    $id = $_POST['id'];

    $stmt = $conn->prepare("DELETE FROM todos WHERE id=?");
    $res = $stmt->execute([$id]);

    if ($res) {
        echo 'Success';
    } else {
        echo 'Error: Could not delete item';
    }

    $conn = null;
} else {
    header("Location: ../index.php?mess=error");
    exit();
}
?>
