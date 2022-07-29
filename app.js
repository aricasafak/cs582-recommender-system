require("dotenv").config();
var express = require("express");
const fs = require("fs");
const { PythonShell } = require('python-shell');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req,res,next){
  console.log("req.url",req.url);
  next();
});

const result = [];
const result2 = [];

// const result3=[];

pythonScript = "/code.py";
pythonScript2 = "/code2.py";

app.get("/", (req, res, next) => {
  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '', //If you are having python_test.py script in same folder, then it's optional.
    args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run('code.py', options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    fs.readFile('result.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.send(data)
    });
  });
});

// app.get("/", function (req, res) {
//   Python.execScript(__dirname + pythonScript, {
//     bin: "python3",
//     args: ["gautam", "john"],
//   })
//     .then(function (data) {
//       console.log("data" + data);
//       fs.readFile('result.txt', 'utf8', (err, result) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         console.log(result)
//         res.send(result);
//       });
//     })
//     .catch(function (err) {
//       console.log("Error", err);
//       res.send(err);

//     });
// });

// app.post("/", function (req, res) {
//   process.env["TITLE"] = req.body.title;

//   console.log("this is our env variable", process.env["TITLE"]);
//   Python.execScript(__dirname + pythonScript2, {
//     bin: "python",
//     args: [req.body.title],
//   })
//     .then(function (data) {
//       console.log("data" + data);
//       fs.createReadStream("./result2.csv")
//         .pipe(csvParser())
//         .on("data", (data) => {
//           result2.push(data);
//         })
//         .on("end", () => {
//           console.log(result2);
//           result2.push(data);
//           res.send(result2);
//         });
//     })
//     .catch(function (err) {
//       console.log("Error", err);
//       res.send(err);
//     });
// });

const server = app.listen(process.env.PORT, function (req, res) {
  console.log("Listening to port: " + server.address().port);
});
