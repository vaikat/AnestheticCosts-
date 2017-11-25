<?php
	$db = new mysqli('', '', '', '');
			
	if($db->connect_error) {
    	die("Connection failed: " . $db->connect_error);
	}
?>
