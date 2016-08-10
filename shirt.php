<?php
session_start();

//declaring all variables at once.
// names are taken directly from JS and HTML files.
	$email = "";
	$fname = "";
	$lname = "";
	$phonenum = "";
	$size = "";
	$color = "";
	$quantity = 0;
	$status = "";
	$shipStreetAddr = "";
	$shipAptNo = "";
	$shipCity = "";
	$shipState = "";
	$shipZip = "";



//do not process following block if the Submit button was not clicked
if($_POST)
{
/* 	echo 'print $_POST array<br>';
	echo '<pre>'; print_r($_POST); echo '</pre>';
	echo '<hr>';
	echo 'access each key and value pair of the $_POST array<br>';
	foreach($_POST as $k=>$v)
	{
		echo $k.' '.$v.'<br>';
	}
		foreach($_REQUEST as $k=>$v)
	{
		echo $k.' '.$v.'<br>';
	}
	echo '<hr>'; */
	// set the session variables for the form values
	$email=$_POST['email'];
	$fname=$_POST['shipfirstname'];
	$lname=$_POST['shiplastname'];
	$phonenum=$_POST['phone'];
	$size=$_POST['size'];
	$color=$_POST['ktype'];
	$quantity=$_POST['quantity'];
	$shipStreetAddr=$_POST['shipaddress'];
	$shipAptNo=$_POST['shipAptUnit'];
	$shipCity=$_POST['shipcity'];
	$shipState=$_POST['shipaddr_state'];
	$shipZip=$_POST['shipaddr_zip'];
	$cost = ($quantity * 20);
	//print $total_amt;
	//
	$mysqli = new mysqli("localhost", "shirt", "shirt", "SGShirts");
	
	/* check connection */
	if ($mysqli->connect_errno) {
		printf("Connect failed: %s\n", $mysqli->connect_error);
		exit();
	}

	$query="insert into `CUSTOMERS` (`firstName`,`lastName`,`email`,`phone_num`) values('".$fname."','".$lname."','".$email."','".$phonenum."')";
	$mysqli->query($query);
	$custID = $mysqli->insert_id;
	
	if ($custID == 0) {
		/* Create a prepared statement */
		$stmt = $mysqli -> prepare("SELECT cust_id FROM CUSTOMERS WHERE email=?");
		/* Bind parameters */
		$stmt -> bind_param("s", $_POST['email']);
		/* Execute it */
		$stmt -> execute();
		/* Bind results */
		$stmt -> bind_result($result);
		/* Fetch the value */
		$stmt -> fetch();
		$custID = $result;
	
		
			// for some reason I need to reestablish the db connection...
		$mysqli = new mysqli("localhost", "shirt", "shirt", "SGShirts");
			/* check connection */
		if ($mysqli->connect_errno) {
			printf("Connect failed: %s\n", $mysqli->connect_error);
			exit();
		}

		// query SHIPPINGS table for duplicate data.
		/* Create a prepared statement */
		$stmt = $mysqli -> prepare("SELECT ship_id FROM SHIPPINGS WHERE street_addr=? AND apt_no=? AND city=? AND state=? and zip=?");
		/* Bind parameters */
		$stmt -> bind_param("sssss", $_POST['shipaddress'], $_POST['shipAptUnit'], $_POST['shipcity'], $_POST['shipaddr_state'], $_POST['shipaddr_zip']);
		/* Execute it */
		$stmt -> execute();
		/* Bind results */
		$stmt -> bind_result($result);
		/* Fetch the value */
		$stmt -> fetch();
		$shipID= $result;
				
				
			// for some reason I need to reestablish the db connection...
		$mysqli = new mysqli("localhost", "shirt", "shirt", "SGShirts");
			/* check connection */
		if ($mysqli->connect_errno) {
			printf("Connect failed: %s\n", $mysqli->connect_error);
			exit();
		}

		
		$query="insert into `ORDERS` (`cust_id`,`size`,`color`,`quantity`,`ship_id`,`cost`) values('".$custID."','".$size."','".$color."','".$quantity."','".$shipID."','".$cost."')";
		$mysqli->query($query);
		$orderID = $mysqli->insert_id;
	} else {
		$query="insert into `SHIPPINGS` (`cust_id`,`street_addr`,`apt_no`,`city`,`state`,`zip`) values('".$custID."','".$shipStreetAddr."','".$shipAptNo."','".$shipCity."','".$shipState."','".$shipZip."')";
		$mysqli->query($query);
		$shipID = $mysqli->insert_id;
		
		$query="insert into `ORDERS` (`cust_id`,`size`,`color`,`quantity`,`ship_id`,`cost`) values('".$custID."','".$size."','".$color."','".$quantity."','".$shipID."','".$cost."')";
		$mysqli->query($query);
		$orderID = $mysqli->insert_id;
	}
	
	


}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>LFC Jerseys Store</title>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="lfc.css" >
<script type="text/javascript" src="shirtorder.js"></script>
	</head>
<body>
<header>
	<h1>Your Online Order</h1>
</header>
<nav>
	<b>
		<a href="index.html">Home</a> 
		<a href="purchase.html">Store</a>
		<a href="contact.html">Contact</a>
	</b>
</nav>
<main>


	
<div id="receipt">
	<fieldset> <h2>Your Order</h2>
	<p>
	<?php echo "<b>Your order number is :</b> ".$orderID;?>
	<?php echo "<br>	<b>Your order will be shipped to:</b> <br>
		".$fname. " " .$lname."<br>
		".$shipStreetAddr. "<br>
		".$shipAptNo. "<br>
		".$shipCity. "<br>
		".$shipState. "<br>
		".$shipZip. "<br>";?>
	<?php echo "<b>Color:</b> ".$color;?><br>
	<?php echo "<b>Size:</b> ".$size;?><br>
	<?php echo "<b>Your credit card will be billed: </b>$".$cost;?><br>
	<?php echo "If you have any questions about your order, please contact us via email at: <a type='email' href='mailto:robotpotatoinc@gmail.com'>robotpotatoinc@gmail.com</a>";?>
	</p></fieldset>
</div>
</body>
</html>