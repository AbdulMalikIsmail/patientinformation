<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, X-Token, x-token,X-SELECT,mode');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);
$headers = getallheaders();

$json = file_get_contents('php://input');
$obj = json_decode($json,true);



$firstname = $obj['firstname'];
$lastname = $obj['lastname'];
$age = $obj['age'];
$dob = $obj['dob'];
$phone = $obj['phone'];
$additionalInfo = $obj['additionalInfo'];
$gender = $obj['gender'];




$query = "insert into patienttable values ('$firstname','$lastname','$age','$gender','$phone','$additionalInfo','$dob','')";


$requestJSON = json_encode($request[0]);
// connect to the mysql database
$link = mysqli_connect('localhost', 'root', '', 'patientinformation');
mysqli_set_charset($link,'utf8');
 
// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;
   
// escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',@array_keys($input));
$values = @array_map(function ($value) use ($link) {
  if ($value===null) return null;
  return mysqli_real_escape_string($link,(string)$value);
},array_values($input));
 
// build the SET part of the SQL command
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.@$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}
// echo json_encode($set);
 
//echo $requestJSON;die;

if($headers && array_key_exists('X-SELECT',$headers)){
 // $sql = "insert into patienttable set $set";
  $sql = $dataArrayString;
}
else {
  //$sql = $dataArrayString;
  $sql = "select * from patienttable ".($key?" WHERE id=$key":'');
}

// excecute SQL statement
if($method == 'POST'){
  $sql = $query;
}



$result = mysqli_query($link,$sql);
if (!$result) {
  http_response_code(404);
  die(mysqli_error());
}
 
// print results, insert id or affected row count
if ($method == 'GET') {
  if (!$key) echo '[';
  for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$key) echo ']';
}
//  elseif ($method == 'POST') {
//   echo mysqli_insert_id($link);
// } else {
//   echo mysqli_affected_rows($link);
// }
 
// close mysql connection
mysqli_close($link);