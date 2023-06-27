const express = require('express');
const router = express.Router();
const con=require('./config');
const mysql=require('mysql');
router.get("/longest-duration-movies",(req,res)=>{
       con.query("SELECT `tconst`, `primaryTitle`, `runtimeMinutes`, `genres` FROM `movies` ORDER BY `movies`.`runtimeMinutes` DESC LIMIT 10",(err,result)=>{
              res.send(result);
                console.log(result);
       })
});


router.post("/new-movie",(req,res)=>{
       console.log(req.body);
       let tconst=req.body.tconst;
       let titleType=req.body.titleType;
       let primaryTitle=req.body.primaryTitle;
       let runtimeMinutes=req.body.runtimeMinutes;
       let genres=req.body.genres;
       console.log(tconst,titleType,primaryTitle,runtimeMinutes,genres);
       con.query("INSERT INTO `movies`(`tconst`, `titleType`, `primaryTitle`, `runtimeMinutes`, `genres`) VALUES ('"+tconst+"','"+titleType+"','"+primaryTitle+"','"+runtimeMinutes+"','"+genres+"')",(err,result)=>{

              if(!err)
              {
                     console.log("Data Inserted");
                     res.send({result:"Success"});
              }
       })
});


router.get("/top-rated-movies",(req,res)=>{
       con.query("SELECT ratings.tconst,movies.primaryTitle,movies.genres,ratings.averageRating FROM ratings INNER JOIN movies ON averageRating > 6.0;",(err,result)=>{
              res.send(result);
                console.log(result);
       })
});

router.get("/genre-movies-with-subtotals",(req,res)=>{
       con.query("SELECT m.genres, COUNT(*) AS totalMovies, SUM(r.numVotes) AS totalNumVotes FROM movies AS m JOIN ratings AS r ON m.tconst = r.tconst GROUP BY m.genres;",(err,result)=>{
              res.send(result);
                console.log(result);
       })
});



router.get("/update-runtime-minutes",(req,res)=>{
       const query = `
    SELECT m.genres, COUNT(*) AS totalMovies, SUM(r.numVotes) AS totalNumVotes
    FROM movies AS m
    JOIN ratings AS r ON m.tconst = r.tconst
    GROUP BY m.genres;
  `;
  con.query(query,(err,result)=>{
       res.send(result);
  })
});





module.exports = router;