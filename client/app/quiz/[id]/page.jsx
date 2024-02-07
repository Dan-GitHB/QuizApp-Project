'use client'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useCountdownTimer } from 'use-countdown-timer'
import Style from '../../../public/styles/quizPage.css'

const TestPages = ({ params }) => {
  const id = params.id
  const [questions, setQuestions] = useState(null)
  const [quiz, setQuiz] = useState(null)

  const [timeQuiz, setTimeQuiz] = useState(null)
  const [minutes, setMinutes] = useState(null)
  const [seconds, setSeconds] = useState(null)

  useEffect(() => {
    if (quiz && quiz.time) {
      setTimeQuiz(quiz.time * 60)
    }
  }, [quiz])

  //Indexul intrebari curente la care suntem
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  //Raspunsul ales de user la o intrebare
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  //Daca raspunsul este checked adica apasat sau nu din cele 3, daca da ii dam o clasa css
  const [answerChecked, setAnswerChecked] = useState(null)

  //Stocam fiecare raspuns ce la ales userul la fiecare intrebare
  const [userAnswer, setUserAnswer] = useState([])

  //Calculam ce medie de rasp corecte are userul
  const [calcMedia, setCalcMedia] = useState(0)
  const media = questions && Math.floor((calcMedia / questions.length) * 100)

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/quiz/`, {
        params: {
          id: id,
        },
      })
      setQuiz(response.data)
    } catch (error) {
      console.error('Error fetching quiz data:', error)
    }
  }

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/questions/`, {
        params: {
          id: id,
        },
      })
      setQuestions(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const questionsLength = questions && questions.length
  const currentQuestion = questions && questions[currentQuestionIndex]

  const handleAnswerSelection = (index) => {
    event.preventDefault()
    setAnswerChecked(index)

    setSelectedAnswer(event.target.value)
  }

  const handleNextQuestion = () => {
    event.preventDefault()

    if (currentQuestion.correctAnswer === selectedAnswer) {
      setCalcMedia((prevCorectResp) => prevCorectResp + 1)
    }

    if (selectedAnswer !== null) {
      setSelectedAnswer(null)
      setAnswerChecked(null)

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setUserAnswer((prevAnswer) => [...prevAnswer, selectedAnswer])
    } else {
      console.log(
        'Selectează un răspuns înainte de a trece la următoarea întrebare.'
      )
    }
  }

  useEffect(() => {
    fetchQuiz()
    fetchQuestions()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeQuiz > 0 && timeQuiz !== null) {
        setTimeQuiz((prevTime) => prevTime - 1)
        setMinutes(Math.floor(timeQuiz / 60))
        setSeconds(timeQuiz % 60)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timeQuiz])

  return (
    <div>
      <a href='/' className='home-link'>
        <i className='fa-solid fa-house home'></i>
      </a>
      {timeQuiz &&
      timeQuiz > 0 &&
      currentQuestion &&
      currentQuestionIndex + 1 <= questionsLength ? (
        <div className='quiz-question-parent'>
          <div className='question-control'>
            <button
              className='go-prv-question'
              onClick={() => {
                if (currentQuestionIndex >= 1) {
                  userAnswer.pop()

                  setCurrentQuestionIndex((prevIndex) => prevIndex + -1)
                }
              }}
            >
              <i className='fa-solid fa-arrow-left'></i>
              Previous
            </button>

            <span className='question-num'>
              {`
          ${currentQuestionIndex + 1}/${questions && questions.length}

        `}
            </span>
            <span className='quiz-time'>
              {minutes && minutes >= 10
                ? minutes
                : minutes && minutes.toString().padStart(2, '0')}
              :
              {seconds && seconds >= 10
                ? seconds
                : seconds && seconds.toString().padStart(2, '0')}
            </span>
          </div>

          <div className='quiz-question-display'>
            <p className='question'>
              {currentQuestion && currentQuestion.questionQuiz}
            </p>
          </div>

          <div className='quiz-answers-display'>
            <form>
              <ul>
                {currentQuestion &&
                  currentQuestion.answers.map((answer, index) => (
                    <li
                      className={`answer ${
                        answerChecked === index ? 'active' : ''
                      }`}
                      key={answer.id}
                    >
                      <div>
                        <label
                          htmlFor={`answer${answer.id}`}
                          className={`answer-text`}
                        >
                          {answer.text}
                        </label>
                        <input
                          type='radio'
                          id={`answer${answer.id}`}
                          name='answer'
                          value={answer.text}
                          className={`${
                            answerChecked === index ? 'active' : ''
                          }`}
                          onClick={() => handleAnswerSelection(index)}
                          // onChange={() => handleAnswerSelection(index)}
                          checked={answerChecked === index}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
              <button className='btn' onClick={() => handleNextQuestion()}>
                Next
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className='page-results'>
          <div className='page-results-heading'>
            <h1>{quiz && quiz.titleQuiz} Quiz</h1>
          </div>

          <div className='pass-or-no-quiz'>
            <p>
              You answered {media}% of the questions correctly!
              {quiz && media >= quiz.scoreToPass ? (
                <span className='pass'> You pass the quiz</span>
              ) : (
                <span className='failed'> You failed the quiz </span>
              )}
            </p>
          </div>

          {questions &&
            questions.map((question, index) => (
              <div className='display-each-result' key={question.id}>
                {index > 0 ? <hr className='hr' /> : null}
                <p className='result-question'>
                  Intrebare: {question.questionQuiz}
                </p>

                <p
                  className={`${
                    userAnswer[index] === question.correctAnswer
                      ? 'correct-answer'
                      : 'incorrect-answer'
                  }`}
                >
                  {userAnswer.length === 0 || userAnswer[index] === undefined
                    ? 'Nu ai reușit să răspunzi la întrebare'
                    : `Răspunsul tău: ${userAnswer[index]}`}
                </p>

                {question.correctAnswer !== userAnswer[index] ? (
                  <p className='correct-answer-result'>
                    Raspunsul Corect: {question.correctAnswer}
                  </p>
                ) : null}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default TestPages
