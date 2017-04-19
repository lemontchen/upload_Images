<?php

$uploaddir = 'uploads/';
$uploadfile = $uploaddir. time() . $_FILES['file']['name'];
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
    echo '/'.$uploadfile;
} else {
    echo '';
}

?>