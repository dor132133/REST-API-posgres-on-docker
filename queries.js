
var promise = require('bluebird');
var options = {
    promiseLib: promise
}
var pgp = require('pg-promise')(options);


var connectString = 'postgres://dor:123@postgres:5432/postgres';//changed and set postgres container-name: postgres
var db = pgp(connectString);
  
  //get all name's persons by certain age
  function getPersonsByAge(req,res,next){
      const age = parseInt(req.params.age);
      db.any("select name from persons where age ='"+age+"'")
      .then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL persons age ' + age
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  //add person to db
  function addPerson(req,res,next){
      db.none('insert into persons(name,age) values(${name},${age})',req.body)
      .then(()=>{
          res.status(201)
          .json({
              status : 'success',
              message:'retrieved add a person'
          });
      })
      .catch((err)=>{
          console.log(err);
          return next(err);
      });
  }
  
  module.exports = {
      getPersonsByAge : getPersonsByAge,
      addPerson : addPerson,
  };

