var latitude
var longitude
uuidArray =[];
var sessionId = ""
sessionCookie = getCookie("sessionid")

function populateStart(){
    document.getElementById('main').innerHTML = `
    <div class="index-firstcontainer"></div>
        <div class="indexmaintitle firstindexmain">
            <div class="indexmaintitleItem letterone">
                T
            </div>
            <div class="indexmaintitleItem letterTwo">
                R
            </div>
            <div class="indexmaintitleItem letterThree">
                E
            </div>
            <div class="indexmaintitleItem letterfour">
                A
            </div>
            <div class="indexmaintitleItem letterone">
                S
            </div>
            <div class="indexmaintitleItem letterTwo">
                U 
            </div>
            <div class="indexmaintitleItem letterThree">
                R 
            </div>
            <div class="indexmaintitleItem letterfour">
                E 
            </div>
        </div>
        <div class="indexmaintitle">
            <div class="indexmaintitleItem letterone">
                H
            </div>
            <div class="indexmaintitleItem letterThree ">
                U
            </div>
            <div class="indexmaintitleItem letterfour">
                N
            </div>
            <div class="indexmaintitleItem letterTwo">
                T
            </div>
        </div>
        <div class="index-infobox">
            <a href="./help.html" class="indexinfo-btn">
                <div class="circletwo circle"></div>
                <div class="info-btncontent">
                  <h4 class="indexinfobtn-text">Help</h4>
                  <img class="indexinfobtn-imgtwo" src="./images/question-mark.svg" alt="">
                </div>
            </a>
            <a href="./about.html" class="indexinfo-btn">
                <div class="circleone circle"></div>
                <div class="info-btncontent">
                    <h4 class="indexinfobtn-text">About</h4>
                    <img class="indexinfobtn-imgone" src="./images/idea.svg" alt="">
                </div>
              </a>
        </div>
        <div class="get-startedbeforebtn">
            <img src="./images/reimg.png" alt="" class="reimg">
            <a onclick=populateList() class="get-startedbtn">Let's get started!</a>
        </div>
        <div id="outer-circle">
          <div id="inner-circle">
          </div>
        </div>
        <!-- video start -->
        <video class="indexvideocontainer" width="320" height="240" controls>
            <source src="./images/video3.MOV" type=video/mp4>
        </video>
        <!-- video end -->
        <div class="container , indexinfoContainer , indexinfo">
            <h3 class="start-title">Ahoy pirates!</h3>
            <p class="start-info">
                  welcome to the Team 6 Treasure Hunt!
            </p>
            <p class="start-info">
                If you have questions, select the 'Help' menu. When you are ready , click the button to get started!
            </p>
        </div>`;
}



function populateList(){
    fetch("https://codecyprus.org/th/api/list").then(function(response){
        return response.json();
    }).then(function(obj){
        console.log(obj)
        console.log(obj.treasureHunts[0].name);
        console.log(obj.treasureHunts[0].endsOn);
        


        document.getElementById('main').innerHTML = `<div class="container listinfo-container">
            <h2 class="listpageinfo">
                First select a treasure to hunt!
            </h2>
        </div>
        <div class="list" id='list'>

            <a href="./index.html" class="button-one">back</a>
        </div>`;
        for(let i = 0;i < 3; i++){
            endDate = new Date(obj.treasureHunts[i].endsOn);
            uuidArray[i] = obj.treasureHunts[i].uuid;
            console.log(uuidArray[i]);
            document.getElementById('list').innerHTML +=`
            <a onclick=namePage(${i}) class="listItem" id="${i}" >
                <div class="listItemLeft">
                    <h2 class="listItemTitle">${obj.treasureHunts[i].name}</h2>
                    <h3 class="listItemInfo">Ends on: ${endDate}</h3>
                </div>
                <div class="listItemRight">
                    <img class="listplay" src="./images/play.svg" alt="play">
                </div>
            </a>`
        }
    })

}

function getCookie(sessionid) {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(sessionid == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}



function namePage(index){
    console.log(uuidArray[index])
    
    console.log(sessionCookie)
    if (sessionCookie == null || sessionCookie == ""){
        
        document.getElementById('main').innerHTML = `
    <div class="index-firstcontainer"></div>
        <div class="index-infobox">
        </div>
        
      
        <div class="container , startinfo background-gr">
            <p class="start-info">
                Ahoy,we are looking for the 'Sample treasure hunt' treasure, Now tell us you team's names and emails and we are ready to go!
            </p>
        </div>
        <div class="container startform-container">
            <form action="" class="startform">
                <label for="teamname">player name</label>
                <input type="text" name="player" required id="teamname" class="startforminput">
                <a id="submitBtn" class="button-one" onclick=start(${index}) >Submit</a>
            </form>
        </div>
        <a href="./index.html" class="button-one">back</a>`;
    }else{
        console.log("cookie:"+sessionCookie)
        questions(sessionCookie)
    }
    
}

function start(index){
    var id = uuidArray[index]
    var name = document.getElementById("teamname");
    
    
    if (name.value == ""){
        alert("Name is requred");
    } else{
        var apiLink = "https://codecyprus.org/th/api/start?"
        apiLink = apiLink + "player=" + name.value + "&app=sample-app&treasure-hunt-id=" + id;
        console.log(apiLink)
        fetch(apiLink).then(function(response){
            return response.json();
        }).then(function(obj){
            if (obj.status == "OK"){
                console.log(obj.status)
                sessionId = obj.session
                console.log(sessionId)
                //set session cookie
                document.cookie = "sessionid="+ sessionId
                //CALL API Question
                questions(sessionId)
            }else{
                alert(obj.errorMessages)
            }
        })
    }
    console.log(name.value);
}




function questions(sessionId){
    session = sessionId
    if(session == ""){
        session = sessionCookie
    }
    console.log("sessc "+session)
    console.log(sessionCookie)
    questionApi = "https://codecyprus.org/th/api/question?session=" + session
    fetch(questionApi).then(function(response){
        return response.json();
    }).then(function(obj){
        console.log(obj)
        if(obj.completed == true){
            alert("You finished!")
            document.cookie = "sessionid=" + ""
            leaderboard()
        }
        else if((obj.questionType == "INTEGER" || obj.questionType == "TEXT" || obj.questionType == "NUMERIC" )&&( obj.canBeSkipped == true)){
            if(obj.requiresLocation == true){
                getLocation()
            }
            document.getElementById("main").innerHTML=`
        
        <div class="container , questioncontainer">
            <!-- question text -->
            <p class="questiontext">
                ${obj.questionText}
            </p>
        </div>
        <div class="container , answerbox">
            
            <h3 class="answerboxtitle">Answer</h3>
            <!-- text form -->
            <form action="" class="answerformText" >
                <input type="text" required class="answerforminputtext" id="answer">
                <a class="button-one" id="submitBtn" onclick=answerInt()>Submit</a>
                <a class="button-one skip-btn" onclick=skip() >Skip</a>
            </form>

        </div>`
        } else if((obj.questionType == "INTEGER" || obj.questionType == "TEXT" || obj.questionType == "NUMERIC" )&&( obj.canBeSkipped == false)){
            if(obj.requiresLocation == true){
                getLocation()
            }
            document.getElementById("main").innerHTML=`
        
        <div class="container , questioncontainer">
            <!-- question text -->
            <p class="questiontext">
                ${obj.questionText}
            </p>
        </div>
        <div class="container , answerbox">
            
            <h3 class="answerboxtitle">Answer</h3>
            <!-- text form -->
            <form action="" class="answerformText" >
                <input type="text" required class="answerforminputtext" id="answer">
                <a class="button-one" id="submitBtn" onclick=answerInt()>Submit</a>
            </form>

        </div>`
        }
        else if((obj.questionType == "BOOLEAN")&& (obj.canBeSkipped = true)){
            if(obj.requiresLocation == true){
                getLocation()
            }
            document.getElementById("main").innerHTML=`
            <div class="container , questioncontainer">
            <!-- question text -->
            <p class="questiontext">
                ${obj.questionText}
            </p>
        </div>
        <div class="container , answerbox">
            
            <h3 class="answerboxtitle">Answer</h3>
            <!-- TrueAndFalse form -->
            <form action="" class="answerformMultipleChoice" >
                <div class="formitemMc">
                    <div class="checkbox-group required ">
                        <div class="checkbox-item">
                            <label for="answerTrue" >True</label>
                            <input type="radio" name="answerformMC" required id="answerTrue" value="true" class="answerformA">
                        </div>
                        <div class="checkbox-item">
                            <label for="answerFalse" >False</label>
                            <input type="radio" name="answerformMC" id="answerFalse" value="false" class="answerformB">
                        </div>
                    </div>
                </div>
                <a class="button-one" id="submitBtn" onclick=answerBool()>Submit</a>
                <a class="button-one skip-btn" onclick=skip() >Skip</a>
            </form>

        </div>`
        }
        else if((obj.questionType == "BOOLEAN")&& (obj.canBeSkipped = false)){
            if(obj.requiresLocation == true){
                getLocation()
            }
            document.getElementById("main").innerHTML=`
            <div class="container , questioncontainer">
            <!-- question text -->
            <p class="questiontext">
                ${obj.questionText}
            </p>
        </div>
        <div class="container , answerbox">
            
            <h3 class="answerboxtitle">Answer</h3>
            <!-- TrueAndFalse form -->
            <form action="" class="answerformMultipleChoice" >
                <div class="formitemMc">
                    <div class="checkbox-group required ">
                        <div class="checkbox-item">
                            <label for="answerTrue" >True</label>
                            <input type="radio" name="answerformMC" required id="answerTrue" value="true" class="answerformA">
                        </div>
                        <div class="checkbox-item">
                            <label for="answerFalse" >False</label>
                            <input type="radio" name="answerformMC" id="answerFalse" value="false" class="answerformB">
                        </div>
                    </div>
                </div>
                <a class="button-one" id="submitBtn" onclick=answerBool()>Submit</a>
                
            </form>

        </div>`
        }
        else if ((obj.questionType == "MCQ")&&(obj.canBeSkipped = true)){
            if(obj.requiresLocation == true){
                getLocation()
            }
            document.getElementById("main").innerHTML=`
            <div class="container , questioncontainer">
            <!-- question text -->
            <p class="questiontext">
                ${obj.questionText} 
            </p>
        </div>
        <div class="container , answerbox">
            
            <h3 class="answerboxtitle">Answer</h3>
            <form action="" class="answerformMultipleChoice" >
                <!-- MultipleChoice -->
                <div class="formitemMc">
                    <div class="checkbox-group required ">
                        <div class="checkbox-item"> 
                            <label for="answerformA" >A)</label>
                            <input type="radio" name="answerformMC" required id="answerformA" value="answerformA" class="answerformA">
                        </div>
                        <div class="checkbox-item">
                            <label for="answerformB" >B)</label>
                            <input type="radio" name="answerformMC" id="answerformB" value="answerformB" class="answerformB">
                        </div>
                        <div class="checkbox-item">
                            <label for="answerformC" >C)</label>
                            <input type="radio" name="answerformMC" id="answerformC" value="answerformC" class="answerformC">
                        </div>
                        <div class="checkbox-item">
                            <label for="answerformD" >D)</label>
                            <input type="radio" name="answerformMC" id="answerformD" value="answerformD" class="answerformD">
                        </div>
                    </div>
                </div>
                <a class="button-one" id="submitBtn" onclick=answerMCQ()>Submit</a>
                <a class="button-one skip-btn" onclick=skip() >Skip</a>
            </form>
        </div>`
        }
        else if ((obj.questionType == "MCQ")&&(obj.canBeSkipped = false)){
            if(obj.requiresLocation == true){
                getLocation()
            }
            document.getElementById("main").innerHTML=`
            <div class="container , questioncontainer">
            <!-- question text -->
            <p class="questiontext">
                ${obj.questionText} 
            </p>
        </div>
        <div class="container , answerbox">
            
            <h3 class="answerboxtitle">Answer</h3>
            <form action="" class="answerformMultipleChoice" >
                <!-- MultipleChoice -->
                <div class="formitemMc">
                    <div class="checkbox-group required ">
                        <div class="checkbox-item"> 
                            <label for="answerformA" >A)</label>
                            <input type="radio" name="answerformMC" required id="answerformA" value="answerformA" class="answerformA">
                        </div>
                        <div class="checkbox-item">
                            <label for="answerformB" >B)</label>
                            <input type="radio" name="answerformMC" id="answerformB" value="answerformB" class="answerformB">
                        </div>
                        <div class="checkbox-item">
                            <label for="answerformC" >C)</label>
                            <input type="radio" name="answerformMC" id="answerformC" value="answerformC" class="answerformC">
                        </div>
                        <div class="checkbox-item">
                            <label for="answerformD" >D)</label>
                            <input type="radio" name="answerformMC" id="answerformD" value="answerformD" class="answerformD">
                        </div>
                    </div>
                </div>
                <a class="button-one" id="submitBtn" onclick=answerMCQ()>Submit</a>
                
            </form>
        </div>`
        }

    })
    
}




function answerInt(){
    session = sessionId
    if(session == ""){
        session = sessionCookie
    }
    answer = document.getElementById("answer")
    console.log(session)
    answerApi = "https://codecyprus.org/th/api/answer?session=" + session + "&answer=" + answer.value
    fetch(answerApi).then(function(response){
        return response.json();
    }).then(function(obj){
        console.log(obj)
        if(obj.correct == true){//if answer is correct
            alert(obj.message)
        }else if(obj.correct == false){//if answer is wrong
            alert(obj.message)
        }
        questions(sessionId)
    })
}

function answerBool(){
    session = sessionId
    if(session == ""){
        session = sessionCookie
    }
    console.log("It worked")
    if (document.getElementById('answerTrue').checked){
        answer = "true"
    }else if (document.getElementById('answerFalse').checked){
        answer = "false"
    }
    answerApi = "https://codecyprus.org/th/api/answer?session=" + session + "&answer=" + answer
    fetch(answerApi).then(function(response){
        return response.json();
    }).then(function(obj){
        console.log(obj)
        if(obj.correct == true){//if answer is correct
            alert(obj.message)
        }else if(obj.correct == false){//if answer is wrong
            alert(obj.message)
        }
        questions(sessionId)
    })
}

function answerMCQ(){
    session = sessionId
    if(session == ""){
        session = sessionCookie
    }
    console.log("It worked")
    if (document.getElementById('answerformA').checked){
        answer = "A"
    }else if (document.getElementById('answerformB').checked){
        answer = "B"
    }else if (document.getElementById('answerformC').checked){
        answer = "C"
    }else if (document.getElementById('answerformD').checked){
        answer = "D"
    }
    answerApi = "https://codecyprus.org/th/api/answer?session=" + session + "&answer=" + answer
    fetch(answerApi).then(function(response){
        return response.json();
    }).then(function(obj){
        console.log(obj)
        if(obj.correct == true){//if answer is correct
            alert(obj.message)
        }else if(obj.correct == false){//if answer is wrong
            alert(obj.message)
        }
        questions(sessionId)
    })
}




function skip(){
    session = sessionId
    if(session == ""){
        session = sessionCookie
    }
    answerApi = "https://codecyprus.org/th/api/skip?session=" + session 
    fetch(answerApi).then(function(response){
        return response.json();
    }).then(function(obj){
        console.log(obj)
        if(obj.correct == true){//if answer is correct
            alert(obj.message)
        }else if(obj.correct == false){//if answer is wrong
            alert(obj.message)
        }
        questions(sessionId)
    })

}

function leaderboard(){

    session = sessionId
    if(session == ""){
        session = sessionCookie
    }
    answerApi = "https://codecyprus.org/th/api/leaderboard?session=" + session + "&sorted&limit=10"
            fetch(answerApi).then(function(response){
                return response.json();
            }).then(function(obj){
                console.log(session)
                console.log(obj)
                if(obj.leaderboard.length >= 5){
                    document.getElementById("main").innerHTML=`
                    <div class="index-firstcontainer"></div>
            <div class="index-infobox">
            </div>
            <div class="scoreboard-imgtitle">
                <div class="circletwo circle"></div>
                <div class="scoreboard-imgtitlecontent">
                  <img class="scoreboardfirstimg" src="./images/scoreb-star.svg" alt="">
                  <h1 class="scoreboardtitle">
                      Scoreboard
                  </h1>
                </div>
            </div>
    
            <div class="scoreboard">
                
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal1.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <img class="crownicon" src="./images/crown.svg" alt="">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[0].player}</h2>
                        <h3 class="scoreboardItemInfo ">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[0].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal2.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[1].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[1].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal3.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[2].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[2].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <h3 class="scorebordItem-medal">4</h3>
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[3].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[3].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <h3 class="scorebordItem-medal">5</h3>
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[4].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[4].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                
            </div>
            <a href="./index.html" class="button-one">back</a>
                    
                    `
                } else if(obj.leaderboard.length = 4){
                    document.getElementById("main").innerHTML=`
                    <div class="index-firstcontainer"></div>
            <div class="index-infobox">
            </div>
            <div class="scoreboard-imgtitle">
                <div class="circletwo circle"></div>
                <div class="scoreboard-imgtitlecontent">
                  <img class="scoreboardfirstimg" src="./images/scoreb-star.svg" alt="">
                  <h1 class="scoreboardtitle">
                      Scoreboard
                  </h1>
                </div>
            </div>
    
            <div class="scoreboard">
                
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal1.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <img class="crownicon" src="./images/crown.svg" alt="">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[0].player}</h2>
                        <h3 class="scoreboardItemInfo ">
                           
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[0].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal2.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[1].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[1].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal3.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[2].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[2].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <h3 class="scorebordItem-medal">4</h3>
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[3].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[3].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                
            </div>
                    
                    `
                }else if(obj.leaderboard.length = 3){
                    document.getElementById("main").innerHTML=`
                    <div class="index-firstcontainer"></div>
            <div class="index-infobox">
            </div>
            <div class="scoreboard-imgtitle">
                <div class="circletwo circle"></div>
                <div class="scoreboard-imgtitlecontent">
                  <img class="scoreboardfirstimg" src="./images/scoreb-star.svg" alt="">
                  <h1 class="scoreboardtitle">
                      Scoreboard
                  </h1>
                </div>
            </div>
    
            <div class="scoreboard">
                
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal1.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <img class="crownicon" src="./images/crown.svg" alt="">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[0].player}</h2>
                        <h3 class="scoreboardItemInfo ">
                           
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[0].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal2.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[1].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[1].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal3.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[2].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[2].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
            </div>
                    
                    `
                }else if(obj.leaderboard.length = 2){
                    document.getElementById("main").innerHTML=`
                    <div class="index-firstcontainer"></div>
            <div class="index-infobox">
            </div>
            <div class="scoreboard-imgtitle">
                <div class="circletwo circle"></div>
                <div class="scoreboard-imgtitlecontent">
                  <img class="scoreboardfirstimg" src="./images/scoreb-star.svg" alt="">
                  <h1 class="scoreboardtitle">
                      Scoreboard
                  </h1>
                </div>
            </div>
    
            <div class="scoreboard">
                
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal1.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <img class="crownicon" src="./images/crown.svg" alt="">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[0].player}</h2>
                        <h3 class="scoreboardItemInfo ">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[0].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal2.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[1].player}</h2>
                        <h3 class="scoreboardItemInfo">
                            
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[1].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
                
            </div>
                    
                    `
                }else if(obj.leaderboard.length = 1){
                    document.getElementById("main").innerHTML=`
                    <div class="index-firstcontainer"></div>
            <div class="index-infobox">
            </div>
            <div class="scoreboard-imgtitle">
                <div class="circletwo circle"></div>
                <div class="scoreboard-imgtitlecontent">
                  <img class="scoreboardfirstimg" src="./images/scoreb-star.svg" alt="">
                  <h1 class="scoreboardtitle">
                      Scoreboard
                  </h1>
                </div>
            </div>
    
            <div class="scoreboard">
                
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal1.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <img class="crownicon" src="./images/crown.svg" alt="">
                        <h2 class="scoreboardItemTitle">${obj.leaderboard[0].player}</h2>
                        <h3 class="scoreboardItemInfo ">
                          
                        </h3>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            ${obj.leaderboard[0].score}
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
            </div>
                    
                    `
                }else{
                    document.getElementById("main").innerHTML=`
                    <div class="index-firstcontainer"></div>
            <div class="index-infobox">
            </div>
            <div class="scoreboard-imgtitle">
                <div class="circletwo circle"></div>
                <div class="scoreboard-imgtitlecontent">
                  <img class="scoreboardfirstimg" src="./images/scoreb-star.svg" alt="">
                  <h1 class="scoreboardtitle">
                      Scoreboard
                  </h1>
                </div>
            </div>
    
            <div class="scoreboard">
                
                <div class="scoreboardItem">
                    <div class="scoreboardItemLeft">
                        <img class="scorebordItem-medal" src="./images/medal1.svg" alt="medal">
                    </div>
                    <div class="scoreboardItemMid">
                        <img class="crownicon" src="./images/crown.svg" alt="">
                        <h2 class="scoreboardItemTitle">Nobody finished yet</h2>
                    </div>
                    <div class="scoreboardItemRight">
                        <h3 class="scoreboardItemNumber">
                            <span>Pts</span>
                        </h3>
                    </div>
                </div>
            </div>
                    
                    `
                }
               
               
            })
}

function getLocation(){
    session = sessionId
    if(session == ""){
        session = sessionCookie
    }
    const successCallback = (position)=>{
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        console.log(latitude)
        console.log(longitude)
        answerApi = "https://codecyprus.org/th/api/location?session=" + session + "&latitude=" + latitude + "&longitude=" + longitude
        fetch(answerApi).then(function(response){
            return response.json();
        }).then(function(obj){
            console.log(session)
            console.log(obj)
            
        })
    }
    const errorCallback = (error)=>{
        console.error(error)
    }
    navigator.geolocation.getCurrentPosition(successCallback,errorCallback)
    
}