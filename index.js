require("dotenv").config();
const express = require("express");
const request = require("request");
const app = express();

const port = process.env.PORT;


app.get("/posts", async (req, res) => {
    try {
      let newArr = [];
  
      request(
        {
          url: "https://jsonplaceholder.typicode.com/posts",
          json: true,
        },
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            const allPostData = body;
  
            allPostData.forEach(function (obj) {
              const postID = obj.id;
              const postTitle = obj.title;
              const postBody = obj.body;
  
              request(
                {
                  url: `https://jsonplaceholder.typicode.com/posts/${postID}/comments`,
                  json: true,
                },
                (error, response, body) => {
                  if (!error && response.statusCode == 200) {
                    const commentNumber = body.length;
  
                    newObj = {
                      post_id: postID,
                      post_title: postTitle,
                      post_body: postBody,
                      total_number_of_comments: commentNumber,
                    };
  
                    newArr.push(newObj);
                  } else {
                    throw "Something went wrong!";
                  }
  
                  if (allPostData.length === newArr.length) {
                    res.json(newArr);
                  }
                }
              );
            });
          } else {
            throw "Something went wrong!";
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });


app.get("/", (req, res) => {
    res.send("Assessment by TribeHired");
  });
  
  app.listen(port, () => {
    console.log(`Server Connected to ${port}`);
  });