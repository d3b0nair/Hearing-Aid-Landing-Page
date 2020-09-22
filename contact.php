<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $time = $_POST['time'];
    $comment = $_POST['comment'];

    $message = "$name, \n Хоче що би ви йому передзвонили на $phone, $time годину. \n $comment $email";
    $subject = "Слухсервіс: клієнт $name.";
    $to = "your@email.com ";
    mail($to, $subject, $message);
?>
