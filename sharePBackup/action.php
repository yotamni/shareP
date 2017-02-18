<?php
	
	include('DB.php');
	
	if($_POST['method']=="test"){
	$query  = "select address,name from tbl_user_217 where id=123";
		$result = mysqli_query($connection, $query);
		
		if(!$result){
			die("DB connection faild.");
		}
			while($row = mysqli_fetch_assoc($result)) {
				echo $row["address"] ."#" .$row["name"];
			}
	}
	
	if($_POST["method"]=="getFavorits"){
		
		$query = "select address from tbl_favorits_217 where id=" .$_POST["user"];
		$result = mysqli_query($connection, $query);
		if(!$result){
			die("DB connection faild.");
		}
		while($row = mysqli_fetch_assoc($result)) {
			echo "<section class=addressBox>" .$row["address"] ."<img src=images/location.png></section>";
		}
	}
	
	if($_POST["method"]=="getTimeLine"){
		$query = "select details,month,day,sum from tbl_event_217 where id =" .$_POST["id"] ." order by month DESC,day DESC";
		$result = mysqli_query($connection, $query);
		
		if(!$result){
			die("DB connection faild.");
		}
		echo "<table>";
		while($row = mysqli_fetch_assoc($result)) {
			if($row["month"]<10)
			{
				$row["month"] = "0" .$row["month"];
			}
			if($row["day"]<10)
			{
				$row["day"] = "0" .$row["day"];
			}
				echo "<tr><td>" .$row["day"] ."-".$row["month"] ."</td><td><span class='glyphicon glyphicon-map-marker' aria-hidden='true'></span> | " .$row["details"] ." | <b>&#8362; ".$row["sum"]."</b></td></tr>";
			}
		echo "</table>";	
	}
	
	if($_POST["method"]=="getAvailableParking"){
		$query = "select tbl_user_217.lat,tbl_user_217.lng from tbl_user_217 where tbl_user_217.id in(select oner_id from tbl_available_parking_217 where available=1)";
		$result = mysqli_query($connection, $query);

		if(!$result){
			die("DB connection faild.");
		}
		while($row = mysqli_fetch_assoc($result)) {
				echo $row["lat"] ."#".$row["lng"] ."#";
			}	
	}
	
	if($_POST["method"]=="parkingMatch"){
		$query = "UPDATE tbl_available_parking_217
		SET available=0,
		rent_id=" .$_POST["id"]." WHERE oner_id=123";
		$result = mysqli_query($connection, $query);

		if(!$result){
			die("DB connection faild.");
		}
		$query1 ="INSERT INTO tbl_event_217 (`row_id` ,`id` ,`details` ,`sum` ,`month` ,`day`)
				  VALUES (NULL , '123', 'Your parking was rented'," .$_POST["sum"]."," .$_POST["month"] ."," .$_POST["day"]."),
				  (NULL ," .$_POST["id"] .", 'You rent a parking'," .$_POST["sum"]."," .$_POST["month"] ."," .$_POST["day"].")"; 
		$result = mysqli_query($connection, $query1);

		if(!$result){
			die("DB connection2 faild.");
		}
		
		$query2 = "update tbl_user_217 set usege_number = usege_number+1 where id=123 or id=333";
		$result = mysqli_query($connection, $query2);

		if(!$result){
			die("DB connection3 faild.");
		}
		echo "success";
		
	}
	
	if($_POST['method']=="getUserUsegeNumber"){
		$query  = "select usege_number from tbl_user_217 where id=123";
		$result = mysqli_query($connection, $query);
		
		
		if(!$result){
			die("DB connection faild.");
		}
		while($row = mysqli_fetch_assoc($result)) {
				echo $row["usege_number"];
			}
		
	}
		
	if($_POST['method']=="publishParking"){
		$query = "INSERT INTO tbl_available_parking_217(
				`available` ,`oner_id` ,`rent_id` ,`day` ,`month` ,`from_hour` ,`to_hour`)
				VALUES ('1'," .$_POST["onerId"] .", NULL ," .$_POST["day"] ."," .$_POST["month"] ."," .$_POST["fromHour"] ."," .$_POST["toHour"] .")";
		$result = mysqli_query($connection, $query);
		
		if(!$result){
			die("DB connection faild.");
		}
		echo "success";
	}	
			
		mysqli_free_result($result);
		mysqli_close($connection);
		
?>