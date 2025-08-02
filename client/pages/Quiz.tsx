import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Which of the following is the most reliable way to verify if an email is legitimate?",
    options: [
      "Check the sender's email address",
      "Look for spelling and grammar errors",
      "Contact the sender through an independent, trusted method",
      "Check if the email contains attachments",
    ],
    correct: 2,
    explanation:
      "The most reliable way is to independently verify through official channels, not relying on information in the potentially malicious email itself.",
  },
  {
    id: 2,
    question: "What should you do if you receive an urgent security alert?",
    options: [
      "Click the link immediately to secure your account",
      "Forward it to your IT department",
      "Verify independently before taking any action",
      "Delete it immediately",
    ],
    correct: 2,
    explanation:
      "Always verify security alerts through official channels before taking action. Urgency is often a red flag in phishing attempts.",
  },
  {
    id: 3,
    question: "Which URL is most likely to be legitimate for Bank of America?",
    options: [
      "https://bankofamerica-secure.com",
      "https://www.bankofamerica.com",
      "https://secure-boa.net",
      "https://bankofamerica.org",
    ],
    correct: 1,
    explanation:
      "The official domain is bankofamerica.com. Be wary of domains that add extra words or use different TLDs.",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                <CardDescription>
                  Here's how you performed on the phishing detection quiz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {score}/{questions.length}
                  </div>
                  <p className="text-gray-600">
                    {score === questions.length
                      ? "Perfect! You're well-prepared to spot phishing attacks."
                      : score >= questions.length * 0.7
                        ? "Good job! You have solid phishing detection skills."
                        : "Keep learning! Review the explanations to improve your skills."}
                  </p>
                </div>

                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        {answers[index] === question.correct ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            {question.question}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Correct answer:</strong>{" "}
                            {question.options[question.correct]}
                          </p>
                          <p className="text-sm text-gray-600">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button onClick={resetQuiz} className="flex-1">
                    Retake Quiz
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link to="/">Return Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phishing Detection Quiz</CardTitle>
                  <CardDescription>
                    Test your knowledge of phishing detection
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  {currentQuestion + 1} of {questions.length}
                </Badge>
              </div>
              <Progress value={progress} className="mt-4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedAnswer === index
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedAnswer === index
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                          }`}
                        />
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="w-full"
              >
                {currentQuestion < questions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
