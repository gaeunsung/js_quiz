
        // 퀴즈정보를 담는 객체 생성
        const quizInfo = [
            {   
                answerNum: "1",
            answerAsk: "다음 중 float 을 해제하는 방법으로 적절한 것을 고르세요.",
                answerChoice: {
                    1: "Float 된 요소에 display:inline-block 속성을 부여한다.",
                    2: "Float 된 요소의 부모요소에 clear:both 속성을 부여한다.",
                    3: "Float 된 요소의 다음 형제요소에 overflow:hidden 속성을 부여한다.",
                    4: "Float 된 요소의 부모요소에 overflow:hidden 속성을 부여한다.",
                },
            answerResult: "4",
            },
            {   
            answerNum: "2",
            answerAsk: "다음 중 css 선택자 우선순위(가중치)가 올바른 것을 고르세요",
                answerChoice: {
                    1: "!important > ID 선택자 > class 선택자 > 가상 요소 선택자",
                    2: "Inline 스타일 > !important > 가상클래스 선택자 > class 선택자",
                    3: "가상 요소 선택자 > class 선택자 > 가상클래스 선택자 > 요소선택자",
                    4: "ID 선택자 > 가상클래스 선택자 > 요소 선택자 > 가상 요소 선택자",
                },
            answerResult: "1",
            },
            {   
            answerNum: "3",
            answerAsk: "하이퍼링크된 링크에 밑줄을 지울려면?",
                answerChoice: {
                    1: "a{text-decoration:none;}",
                    2: "a{text-decoration:no-underline;}",
                    3: "a{decoration:none;}",
                    4: "a{underline:none;}",
                },
            answerResult: "1",
            },
            {   
            answerNum: "4",
            answerAsk: "CSS는 무엇의 약자인가요?",
                answerChoice: {
                    1: "Cascading Style Sheets",
                    2: "Computer Style Sheets",
                    3: "Color Style Sheets",
                    4: "Creative Style Sheets",
                },
            answerResult: "1",
            },
            {   
            answerNum: "5",
            answerAsk: "CSS의 올바른 syntax는?",
                answerChoice: {
                    1: "body:color=black;",
                    2: "body{color:black;}",
                    3: "{body;color-black;}",
                    4: "{body:color=black;}",
                },
            answerResult: "2",
            },
            {   
            answerNum: "6",
            answerAsk: "CSS에서의 주석처리로 올바른 문법은?",
                answerChoice: {
                    1: "//주석입니다//",
                    2: "//==주석입니다==//",
                    3: "/*주석입니다*/",
                    4: "== 주석입니다 ==",
                },
            answerResult: "3",
            },
            {   
            answerNum: "7",
            answerAsk: "CSS에서 font의 사이즈를 조절하는 속성은?",
                answerChoice: {
                    1: "text-style",
                    2: "text-size",
                    3: "font-style",
                    4: "font-size",
                },
            answerResult: "4",
            }
        ];

      
       
       
        //선택자 
        const timerDiv = document.querySelector("span.timer"); // 타이머를 보여줄 장소 
        let time = 180; // 타이머의 시간을 3분으로 지정 
        



        const quiz_area = document.querySelector("div.quiz_area");
        const quizNextBtn = document.querySelector("button.nextBtn"); // 다음버튼 
        const quizPreBtn = document.querySelector("button.preBtn");  // 이전버튼
        const showAnswerBtn = document.querySelector("button.showAnswerBtn"); //제출버튼
        const tryAgainBtn = document.querySelector("button.tryAgainBtn");
        let currentSlide = 0; // 문제번호를 담당할 index
        const resultArea = document.querySelector("div.showResult"); // 결과표시공간
       
        //타이머 설정 5분으로 지정 300 header> div.timer
        const timer = function() {
            if(time < 0){
                alert("시험 시간이 종료되었습니다");
                quizNextBtn.style.display = "none";
                clearInterval(setTimer);
                showResult();
            }
            else{
                let minute;
                let second;

                minute =Math.floor(time/60);
                if(minute < 10) {
                    minute = "0"+minute;
                }
               
                second = time % 60;
                if(second < 10){
                    second ="0"+second;
                }

                timerDiv.innerHTML = `${minute}:${second}`;

                time--;
            }
        };// end of timer function()

        const setTimer = setInterval(timer, 1000);
        // 퀴즈의정보를 보이기 
        function showQuiz() {
               
            let output = [];
            quizInfo.forEach((currentQuestion, quizNum) => {
                const answers = [];// 답안들을 담을 배열을 생성 
                for(item in currentQuestion.answerChoice){ // 사지선답을
                    answers.push(`<label for="${quizNum}${item}">
                                    <input type="radio" name="answerNum${quizNum}" value="${item}" id="${quizNum}${item}"/>
                                    ${item} : ${currentQuestion.answerChoice[item]}
                                </label>`);
                }// end of for 
                output.push(`
                    <div class="slide">
                    <div class="question">QUIZ ${quizNum+1} . ${currentQuestion.answerAsk}</div>
                    <div class="answer">${answers.join('</br>')}</div>
                    <p class="progress">문제 수: ${quizNum + 1}/${quizInfo.length} </p>
                    </div>`);
                    
                
            });
            quiz_area.innerHTML = output.join('</br>');
        }// end of showQuiz

       

        // 정답보여주기 
        function showResult() {
            //const answerList = quiz_area.querySelectorAll("div.answer"); // 사지선답의 리스트
            // 맞춘 정답의 갯수
            let correctCNT = 0;
            let resultIndex = [];
            quizInfo.forEach( (item, index) => {
                //const eachAnswer = answerList[index]; // 각각의 답안들 
                //const selectedAnswer = `input[name="answerNum${index}"]:checked`; // 체크된값
                let isCheckAnswer = false;
                const radio_length = document.getElementsByName(`answerNum${index}`).length;
               
                for(var i=0; i<`${radio_length}`; i++) {
                    if( document.getElementsByName(`answerNum${index}`)[i].checked ) {
                        isCheckAnswer = true;
                        break;
                    }  
                }// end of for----------------------
               
                let userAnswer;
                if(isCheckAnswer) { // 답을 선택한 경우 
                    userAnswer = document.querySelector(`input[name="answerNum${index}"]:checked`).value;  
                    if( userAnswer == item.answerResult ) {
                        correctCNT++;
                        resultIndex.push('O');
                        
                    }
                    else{
                        resultIndex.push('X');
                    }                                                                // :checked 는 라디오(또는 체크박스)중에 선택되어진 것을 말한다.   
                }
                else {  // 답을 선택하지 않은 경우
                    resultIndex.push('선택안함'); 
                }

                
              
            }); // end of  forEach
            //console.log(resultIndex);
            // 결과보여주기 
            showAnswerBtn.style.display = 'none';
            quizPreBtn.style.display = 'none';
            tryAgainBtn.style.display = '';
            resultArea.innerHTML = `<hr><span class="resultTitle" >정답결과 </span>
            <h3 style="color:#333;">${quizInfo.length}문제 중  ${correctCNT}개 맞추셨습니다.</h3>`;
            resultIndex.forEach(function(item,index){
                resultArea.innerHTML += `${index+1}번: ${item} \n`;
            });   
            
        }

     

       //slide 
       function showSlide(n){
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide === 0){
            quizPreBtn.style.display = 'none';
        }else{
            quizPreBtn.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1){
            quizNextBtn.style.display = 'none';
            showAnswerBtn.style.display = 'inline-block';
        }else{
            quizNextBtn.style.display = 'inline-block';
            showAnswerBtn.style.display = 'none';
                if(document.getElementById('retry')){
                        document.getElementById('retry').style.display = 'none';
                    }
            
        }
    }
        
        timer();
        function showNextSlide(){  showSlide(currentSlide+1); }
        function showPreviousSlide(){ showSlide(currentSlide-1); }
       //함수 호출 
        showQuiz();
        const slides = document.querySelectorAll('.slide');
        showSlide(currentSlide);
        quizPreBtn.addEventListener('click',showPreviousSlide);
        quizNextBtn.addEventListener('click',showNextSlide);
        showAnswerBtn.addEventListener('click',showResult);   
        
