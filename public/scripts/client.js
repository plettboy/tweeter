/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

  //add an event listener for the form(step2) link it with this function so that on submit the data




//insert
$(document).ready(function() {

  //on submit of the button
  const onsubmit = function(event) {
    event.preventDefault();
  const form = $(this)
  const data = form.serialize();
  console.log(data)
  let dataLength = data.replace("text=", "").length;

  
  if (data !== "text=" && dataLength <= 140) {
  
  //this is the info that we want to post to our server
  $.ajax({ url: '/tweets', method: 'POST', data: data })
  //refresh promise that when the submit is successful, refreshes and add the tweet.
  .then( ()=> {
    loadTweets();
  })
  } else {
    alert('invalid message')
  }
}
  


//   $("#tweet-text").on('input', (event) => {
//     //use jQuery to target the counter class
//      const counter = $(".counter")
// //assign currentCount to the event character length, through the DOM
//     let currentCount = event.target.value.length;
//     let totalChars = 140;
//     let charInvalid = totalChars - currentCount;
//     if (charInvalid == 140 || charInvalid === null) {
//       alert("invalid entry");
//     }

//   })
  //use ajax
  

  //add an event listener for the form(step1)
  $('#tweeter-form').on('submit', onsubmit)
  //this is basis of the new tweet we are generating
const createTweetElement = function (tweet) {
  const newTweet = `<br><article class="tweetContainer">
        <div class="profile">
        <div>
        <img src="${tweet.user.avatars}">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;${tweet.user.name}</p>
        </div>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;${tweet.user.handle}</p>
        </div>
        <p class="message">${tweet.content.text}</p>
        <footer>
          <p class="date">${timeago.format(tweet.created_at)}</p>
          <div class="iconlist">
            <p class="iconflag">
              <i class="fa-solid fa-flag"></i>&nbsp;&nbsp;&nbsp;
            </p>
            <p class="iconrefresh"><i class="fa-solid fa-retweet"></i>&nbsp;&nbsp;&nbsp;
            </p>
            <p class="iconheart">
              <i class="fa-solid fa-heart"></i>
            </p>
          </div>
        </footer>
      </article>`
      //Give this string to Jquery
      return $(newTweet)
}

//This function can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
const renderTweets = function(tweets) {
  $('#tweets-container').empty()
  for (let tweet of tweets) {
   let renderTweet = createTweetElement(tweet) 
   $('#tweets-container').prepend(renderTweet)
  }
};

const loadTweets = function() {
  console.log('test1')
  $.ajax({
    url: '/tweets',
    method: "GET",
    success: function(res) {
      renderTweets(res);
    }
  }
  )
}

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet);

loadTweets();
}
)

