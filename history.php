<?php
	session_start();
	
	require_once('authenticate.php');
	require_once('database.php');
	
	$username = $_SESSION['username'];
	$purchases = $db->query("SELECT * FROM purchase WHERE doctor_username = '" . $username . "'");
	$currentPurchase = $purchases->fetch_row();
	$response = array();
	
	while($currentPurchase) {
		$purchaseId = $currentPurchase[0];
		$dateTime = $currentPurchase[2];
		
		$inhalableOrders = $db->query("SELECT * FROM inhalable_order WHERE purchase_id = " . $purchaseId);
		$currentInhalableOrder = $inhalableOrders->fetch_row();
		
		while($currentInhalableOrder) {
			$drugId = $currentInhalableOrder[1];
			$drugName = $db->query("SELECT name FROM drug WHERE id = " . $drugId)->fetch_object()->name;
			$isInhalable = $db->query("SELECT is_inhalable FROM drug WHERE id = " . $drugId)->fetch_object()->is_inhalable;
			$category = $db->query("SELECT category FROM drug WHERE id = " . $drugId)->fetch_object()->category;
			$flowLitersPerMinute = $currentInhalableOrder[3];
			$inConcentrationPercent = $currentInhalableOrder[4];
			$numMinutes = $currentInhalableOrder[5];
			$cost = $currentInhalableOrder[6];
			
			$order = array('purchaseId' => $purchaseId, 'dateTime' => $dateTime, 'drugId' => $drugId, 'drugName' => $drugName, 'isInhalable' => $isInhalable, 'category' => $category, 'flowLitersPerMinute' => $flowLitersPerMinute, 'inConcentrationPercent' => $inConcentrationPercent, 'numMinutes' => $numMinutes, 'cost' => $cost);
			array_push($response, $order);
			$currentInhalableOrder = $inhalableOrders->fetch_row();
		}
		
		$nonInhalableOrders = $db->query("SELECT * FROM non_inhalable_order WHERE purchase_id = " . $purchaseId);
		$currentNonInhalableOrder = $nonInhalableOrders->fetch_row();
		
		while($currentNonInhalableOrder) {
			$drugId = $currentNonInhalableOrder[1];
			$drugName = $db->query("SELECT name FROM drug WHERE id = " . $drugId)->fetch_object()->name;
			$isInhalable = $db->query("SELECT is_inhalable FROM drug WHERE id = " . $drugId)->fetch_object()->is_inhalable;
			$category = $db->query("SELECT category FROM drug WHERE id = " . $drugId)->fetch_object()->category;
			$numUnits = $currentNonInhalableOrder[3];
			$cost = $currentNonInhalableOrder[4];
						
			$order = array('purchaseId' => $purchaseId, 'dateTime' => $dateTime, 'drugId' => $drugId, 'drugName' => $drugName, 'isInhalable' => $isInhalable, 'category' => $category, 'numUnits' => $numUnits, 'cost' => $cost);
			array_push($response, $order);
			$currentNonInhalableOrder = $nonInhalableOrders->fetch_row();
		}
		
		$currentPurchase = $purchases->fetch_row();
	}
	
	header("Content-type:application/json");
	print(json_encode($response));
	exit();
?>
