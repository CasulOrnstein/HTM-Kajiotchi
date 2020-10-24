var http = require('http');
var url = require('url');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
const { networkInterfaces } = require('os');


var db = new sqlite3.Database('databse.sqlite');

let tasks = [
  { 
    ID: 1,
    TaskName: "Take out bins",
    TaskDescription: "Take both recycling and general waste bins outside",
    RepeatIntervalDays: 3,
    StartDate: new Date('2020-10-20'),
    CompletionDate: null
  }, { 
    ID: 2,
    TaskName: "Clean bathroom",
    TaskDescription: "Wipe down bath, toilet and sink.",
    RepeatIntervalDays: 7,
    StartDate: new Date('2020-10-20'),
    CompletionDate: null
  }, { 
    ID: 3,
    TaskName: "Change bedsheets",
    TaskDescription: "Change bedsheets and wash old set.",
    RepeatIntervalDays: 14,
    StartDate: new Date('2020-10-13'),
    CompletionDate: null
  }, { 
    ID: 4,
    TaskName: "Wash dishes",
    TaskDescription: "Wash all dishes from the day.",
    RepeatIntervalDays: 1,
    StartDate: new Date('2020-10-22'),
    CompletionDate: null
  }, { 
    ID: 5,
    TaskName: "Clean oven",
    TaskDescription: "Clean inside of oven.",
    RepeatIntervalDays: 30,
    StartDate: new Date('2020-9-20'),
    CompletionDate: null
  }
]

http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Request-Method', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
    var request = req.url;


    if(request == '/users/87/tasks') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(tasks));
      return res.end("");
    }
    if(request == '/users/87/schedule') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify([{
            task_name: "Change bedsheets",
            task_description: "Change bedsheets to a fresh set",
            repeat_interval_days: 14,
            scheduled_task_id: 1
        }]));
      return res.end("");
    }
    if(request == '/users/87/pet') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({
          name: "Bobo",
          colour: "#8C1478",
          birthday: new Date('2020-10-01')
        }));
      return res.end("");
    }
    if(request == '/users/87/pet/happiness') {
      let overdueList = tasks.map(task => {
        const diffTime = Math.abs(new Date() - new Date(task.StartDate));
        const daysSinceStart = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const overdue =  daysSinceStart - task.RepeatIntervalDays
        if(task.CompletionDate != null) {
          return overdue < 0 ? (overdue * 3) : 0
        }
        return overdue < 0 ? 0 : overdue * overdue
      })

      let happiness = 10 - (overdueList.reduce((acc,curr) => acc + curr) * 2)

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(happiness));
      return res.end("");
    }
    if(request.includes('/complete')) {
      let taskID = request.split('/')[4]
      taskIndex = tasks.findIndex(task => task.ID == taskID)
      newTask = tasks[taskIndex]
      newTask.CompletionDate = new Date()
      tasks[taskIndex] = newTask
      res.writeHead(204);
      return res.end("");
    }

    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("404 Not Found");


  /*res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt);*/
}).listen(5000);