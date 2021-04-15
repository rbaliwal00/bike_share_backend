var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'blogs'
});

connection.connect(function(err){
	if(err) throw err;

	console.log('Connected..');
});



var users = [
	{
		email : 'abc@gmail.com', password : 'password'
	}
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome to the backend server");
});

router.post('/signup', function(req,res, next){
	console.log(req.body);
	var sql = "insert into user_table values(null, '"+ req.body.name + "','"+ req.body.email + "', "+ req.body.password + ")";
	connection.query(sql, function (err) {
  		if (err) throw err;
		res.status(200).send({
			message: "Successful signup"
		})
	});
	connection.end();
});

router.post('/login', function(req,res){
	const {email, password} = req.body;
	connection.query('SELECT * FROM user_table WHERE email = ?',[email], async(error, results)=>{
		if(results[0].email == req.body.email){
			if(results[0].password == req.body.password){
				res.status(200).send({
					message: "Successful login"
				})
			}else{
				res.status(200).send({
					message: "incorrect password"
				})
			}
		}else{
			res.status(200).send({
				message: "user not found"
			})
		}
	})
	
});


module.exports = router;
