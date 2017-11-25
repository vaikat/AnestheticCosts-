<?php
	session_start();
	
	require_once('authenticate.php');
	require_once('database.php');
	
	$drugs = $db->query("SELECT * FROM drug");
	$currentDrug = $drugs->fetch_row();
	$response = array();
	
	while($currentDrug) {
		$id = $currentDrug[0];
		$name = $currentDrug[1];
		$isInhalable = $currentDrug[2];
		$category = $currentDrug[3];
		$extraInfo;
		
		if($isInhalable) {
			$inhalable = $db->query("SELECT * FROM inhalable WHERE drug_id =" . $id)->fetch_row();
			$extraInfo = array('costPerMl' => $inhalable[1], 'constant' => $inhalable[2]);
		} else {
			$nonInhalable = $db->query("SELECT * FROM non_inhalable WHERE drug_id =" . $id)->fetch_row();
			$extraInfo = array('unitCost' => $nonInhalable[1]);
		}
		
		$drug = array('id' => $id, 'name' => $name, 'isInhalable' => $isInhalable, 'category' => $category);
		$drug += $extraInfo;
		array_push($response, $drug);
		$currentDrug = $drugs->fetch_row();
	}
	
	header("Content-type:application/json");
	print(json_encode($response));
	exit();
?>
