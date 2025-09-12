document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    const user = tg.initDataUnsafe.user;

    let score = 0;
    let currentQuestion = 0;
    let questions = [];

    // Загружаем вопросы из questions.json
    fetch('questions.json')
        .then(res => res.json())
        .then(data => {
            questions = data;
            loadQuestion();
        })
        .catch(error => {
            console.error('Ошибка загрузки вопросов:', error);
            alert('Не удалось загрузить вопросы. Попробуйте позже.');
        });

    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            document.getElementById('score').textContent = score;
            document.getElementById('gameEnd').style.display = 'block';
            return;
        }
        const q = questions[currentQuestion];
        document.getElementById('question-text').textContent = q.question;
        const options = document.getElementById('options');
        options.innerHTML = '';
        q.options.forEach((opt, index) => {
            const div = document.createElement('div');
            div.className = 'opt';
            div.textContent = opt;
            div.onclick = () => checkAnswer(index === q.correct);
            options.appendChild(div);
        });
    }

    function checkAnswer(isCorrect) {
        score += isCorrect ? 10 : 0;
        currentQuestion++;
        loadQuestion();
    }

    // Кнопка "Получить постер"
    document.getElementById('getPosterBtn').addEventListener('click', () => {
        if (user) {
            tg.sendData(JSON.stringify({
                action: 'get_poster',
                score: score,
                user_id: user.id,
                name: user.first_name || user.username || 'Аноним'
            }));
            tg.close();
        } else {
            alert('Ошибка: данные пользователя не найдены');
        }
    });
});
