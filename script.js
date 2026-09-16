<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Warriors: 사냥과 약초 시험</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
        }

        body {
            background-color: #1a251b;
            color: #e8f0e6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .game-container {
            background-color: #243325;
            border: 2px solid #4a6b4c;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            padding: 30px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            text-align: center;
        }

        h1 {
            color: #85c488;
            font-size: 1.8rem;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }

        .subtitle {
            font-size: 0.95rem;
            color: #a3c2a5;
            margin-bottom: 25px;
        }

        .screen {
            display: none;
        }

        .screen.active {
            display: block;
        }

        /* 시작 화면 */
        .intro-text {
            line-height: 1.6;
            margin-bottom: 25px;
            color: #d1e0d2;
        }

        .btn {
            background-color: #3d6e40;
            color: #ffffff;
            border: none;
            padding: 12px 24px;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s;
            width: 100%;
            margin-top: 10px;
        }

        .btn:hover {
            background-color: #528e56;
        }

        /* 퀴즈 화면 */
        .progress-bar {
            font-size: 0.85rem;
            color: #85c488;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .question-box {
            background-color: #1b261c;
            border-left: 4px solid #85c488;
            padding: 15px;
            margin-bottom: 20px;
            text-align: left;
            border-radius: 0 6px 6px 0;
        }

        .question-category {
            font-size: 0.8rem;
            color: #e3a857;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .question-text {
            font-size: 1.1rem;
            line-height: 1.5;
        }

        .options-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .option-btn {
            background-color: #2d422e;
            color: #e8f0e6;
            border: 1px solid #4a6b4c;
            padding: 12px 15px;
            border-radius: 6px;
            text-align: left;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.2s;
        }

        .option-btn:hover {
            background-color: #3a543b;
            border-color: #85c488;
        }

        /* 결과 화면 */
        .result-title {
            font-size: 1.5rem;
            color: #e3a857;
            margin-bottom: 15px;
        }

        .score-display {
            font-size: 1.2rem;
            margin-bottom: 20px;
        }

        .rank-desc {
            background-color: #1b261c;
            padding: 15px;
            border-radius: 8px;
            line-height: 1.6;
            margin-bottom: 25px;
            text-align: left;
        }
    </style>
</head>
<body>

    <div class="game-container">
        <!-- 1. 시작 화면 -->
        <div id="start-screen" class="screen active">
            <h1>전사 부족의 시련</h1>
            <p class="subtitle">에린 헌터 《Warriors》 세계관 퀴즈</p>
            <p class="intro-text">
                바람이 나뭇잎을 흩날리는 숲속, 당신은 부족의 훈련병(Apprentice)으로서 첫 시험을 치르게 됩니다.<br><br>
                먹잇감을 사냥하는 기술과 부족원들을 치유할 약초 지식을 발휘하여, 훌륭한 <strong>전사(Warrior)</strong> 또는 <strong>치료사(Medicine Cat)</strong>로 인정받으세요!
            </p>
            <button class="btn" onclick="startGame()">시험 시작하기</button>
        </div>

        <!-- 2. 퀴즈 진행 화면 -->
        <div id="quiz-screen" class="screen">
            <div id="progress" class="progress-bar">문제 1 / 5</div>
            <div class="question-box">
                <div id="category" class="question-category">[카테고리]</div>
                <div id="question" class="question-text">질문 내용이 여기에 들어갑니다.</div>
            </div>
            <div id="options" class="options-container">
                <!-- 선택지 버튼들이 자바스크립트로 생성됨 -->
            </div>
        </div>

        <!-- 3. 결과 화면 -->
        <div id="result-screen" class="screen">
            <h2 class="result-title" id="result-rank">당신의 직책</h2>
            <p class="score-display">획득한 점수: <span id="final-score" style="color: #85c488; font-weight: bold;">0</span> / 50 점</p>
            <div class="rank-desc" id="rank-description">
                결과 설명이 들어갑니다.
            </div>
            <button class="btn" onclick="restartGame()">다시 도전하기</button>
        </div>
    </div>

    <script>
        // 퀴즈 데이터 (사냥 및 약초 수집 중심)
        const quizData = [
            {
                category: "약초 채집",
                question: "상처의 감염을 막고 독소(특히 쥐에 물렸을 때)를 억제하기 위해 사용하며, 매운 냄새가 나는 대표적인 약초는 무엇인가요?",
                options: ["금잔화 (Marigold)", "보리지 (Borage)", "처빌 (Chervil)", "톱풀 (Yarrow)"],
                correct: 0
            },
            {
                category: "사냥 기술",
                question: "바람족(WindClan)의 영역인 탁 트인 들판에서 토끼를 사냥할 때 가장 중요한 사냥 수칙은 무엇인가요?",
                options: [
                    "나무 위로 올라가 위에서 습격한다.",
                    "바람을 등지고(바람을 맞으며) 냄새를 덜 풍기도록 다가간다.",
                    "바람을 안고(바람을 등 뒤에 두고) 바람을 타서 덮친다.",
                    "물속에 숨어있다가 뛰어든다."
                ],
                correct: 1
            },
            {
                category: "약초 채집",
                question: "새끼를 낳은 어미고양이의 젖을 잘 돌게 하고, 열을 내리는 데 효과가 있는 파란 꽃을 피우는 약초는 무엇인가요?",
                options: ["개박하 (Catmint)", "보리지 (Borage)", "금잔화 (Marigold)", "데이지 (Daisy)"],
                correct: 1
            },
            {
                category: "사냥 규칙 (전사 규약)",
                question: "전사 규약(Warrior Code)에 따라 잡은 먹잇감(Fresh-kill)에 대한 옳은 행동은 무엇인가요?",
                options: [
                    "잡은 고양이가 그 자리에서 즉시 다 먹는다.",
                    "원로, 장로, 새끼, 퀸이 먼저 먹은 후에야 전사가 먹을 수 있다.",
                    "부족의 지도자만 혼자 독식한다.",
                    "다른 부족에게 선물로 모두 나눠준다."
                ],
                correct: 1
            },
            {
                category: "치명적인 위험",
                question: "치료사 고양이가 절대 고양이에게 먹여서는 안 되며, 조금만 먹어도 목숨을 잃는 붉은 열매(Deathberries)의 원래 이름은 무엇인가요?",
                options: ["주목 열매 (Yew berries)", "호랑가시나무 열매 (Holly berries)", "산사나무 열매 (Hawthorn berries)", "블랙베리 (Blackberries)"],
                correct: 0
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;

        // 게임 시작
        function startGame() {
            currentQuestionIndex = 0;
            score = 0;
            showScreen('quiz-screen');
            loadQuestion();
        }

        // 화면 전환 함수
        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById(screenId).classList.add('active');
        }

        // 문제 로드
        function loadQuestion() {
            const currentQuiz = quizData[currentQuestionIndex];
            
            document.getElementById('progress').innerText = `문제 ${currentQuestionIndex + 1} / ${quizData.length}`;
            document.getElementById('category').innerText = `[${currentQuiz.category}]`;
            document.getElementById('question').innerText = currentQuiz.question;

            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = '';

            currentQuiz.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.innerText = `${index + 1}. ${option}`;
                button.onclick = () => selectAnswer(index);
                optionsContainer.appendChild(button);
            });
        }

        // 정답 선택 처리
        function selectAnswer(selectedIndex) {
            const currentQuiz = quizData[currentQuestionIndex];
            
            if (selectedIndex === currentQuiz.correct) {
                score += 10;
            }

            currentQuestionIndex++;

            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }

        // 결과 화면
        function showResult() {
            showScreen('result-screen');
            document.getElementById('final-score').innerText = score;

            const rankTitle = document.getElementById('result-rank');
            const rankDesc = document.getElementById('rank-description');

            if (score === 50) {
                rankTitle.innerText = "🏆 위대한 부족의 위원회 / 치료사 대표";
                rankDesc.innerHTML = "<strong>별족(StarClan)의 축복이 함께합니다!</strong><br>당신은 사냥의 달인이자 약초의 모든 성질을 완벽히 이해하고 있습니다. 부족원 모두가 당신을 존경하며, 차기 지도자나 수석 치료사로 손색이 없습니다.";
            } else if (score >= 30) {
                rankTitle.innerText = "⚔️ 당당한 전사 (Warrior)";
                rankDesc.innerHTML = "<strong>훌륭합니다!</strong><br>부족을 먹여 살릴 만큼 훌륭한 사냥 기술을 갖추고 있으며 기본 약초 지식도 갖추었습니다. 조금만 더 수련하면 최고의 전사가 될 수 있습니다.";
            } else if (score >= 10) {
                rankTitle.innerText = "🐾 성실한 훈련병 (Apprentice)";
                rankDesc.innerHTML = "<strong>아직은 배울 것이 많습니다.</strong><br>사냥 중에 먹잇감을 놓치거나 약초를 헷갈릴 때가 있습니다. 스승(Mentor)을 따라 더 부지런히 훈련을 받으세요!";
            } else {
                rankTitle.innerText = "🐟 키티펫 (Kittypet - 두발쟁이의 반려동물)";
                rankDesc.innerHTML = "<strong>야생의 삶은 아직 무리인가 봅니다...</strong><br>숲의 법칙과 약초에 대해 아는 것이 거의 없습니다. 따뜻한 두발쟁이(사람)의 집으로 돌아가 사료를 먹는 것이 나을지도 모릅니다!";
            }
        }

        // 게임 재시작
        function restartGame() {
            showScreen('start-screen');
        }
    </script>
</body>
</html>
