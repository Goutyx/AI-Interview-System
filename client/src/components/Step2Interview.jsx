import React, { useEffect } from "react";
import { motion } from "motion/react";
import maleVideo from "../assets/videos/male-ai.mp4";
import feMaleVideo from "../assets/videos/female-ai.mp4";
import Timer from "./Timer";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { BsArrowRight } from "react-icons/bs";

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitles] = useState("");

  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];

  // ================= VOICE SETUP =================

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      if (!voices.length) return;

      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource =
    voiceGender === "male" ? maleVideo : feMaleVideo;

  // ================= SPEECH =================

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();

        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }

        setIsAIPlaying(false);

        if (!isMicOn) {
          startMic();
        }

        setTimeout(() => {
          setSubtitles("");
          resolve();
        }, 300);
      };

      setSubtitles(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  // ================= INTRO / QUESTION SPEECH =================

  useEffect(() => {
    if (!selectedVoice) {
      return;
    }

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));

        if (currentIndex === questions.length - 1) {
          await speakText(
            "Alright, this one might be a bit more challenging."
          );
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }
    };

    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  // ================= TIMER =================

  useEffect(() => {
    if (isIntroPhase) {
      return;
    }

    if (!currentQuestion) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex]);

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);

  // ================= SPEECH RECOGNITION =================

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  // ================= MICROPHONE =================

  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch {}
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }

    setIsMicOn(!isMicOn);
  };

  // ================= SUBMIT ANSWER =================

  const submitAnswer = async () => {
    if (isSubmitting) {
      return;
    }

    stopMic();
    setIsSubmitting(true);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        {
          withCredentials: true,
        }
      );

      setFeedback(result.data.feedback);

      speakText(result.data.feedback);

      setIsSubmitting(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setIsSubmitting(false);
    }
  };

  // ================= NEXT QUESTION =================

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);

    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);
  };

  // ================= FINISH INTERVIEW =================

  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/finish",
        {
          interviewId,
        },
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      onFinish(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= AUTO SUBMIT =================

  useEffect(() => {
    if (isIntroPhase) return;

    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer();
    }
  }, [timeLeft]);

  // ================= CLEANUP =================

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-indigo-400/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-200px] left-[-150px] w-[400px] h-[400px] bg-violet-400/10 blur-[120px] rounded-full" />

        <div className="absolute top-[300px] right-[-150px] w-[400px] h-[400px] bg-indigo-400/10 blur-[120px] rounded-full" />

      </div>

      {/* ================= MAIN CONTAINER ================= */}

      <div className="w-full max-w-[1400px] min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden relative z-10">

        {/* ================= LEFT SECTION ================= */}

        <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">

          {/* AI VIDEO */}

          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-violet-100">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* ================= SUBTITLES ================= */}

          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md bg-violet-50 border border-violet-200 rounded-xl p-4 shadow-sm"
            >
              <p className="text-violet-800 text-sm sm:text-base font-medium text-center leading-relaxed">
                {subtitle}
              </p>
            </motion.div>
          )}

          {/* ================= TIMER CARD ================= */}

          <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5">

            <div className="flex justify-between items-center">

              <span className="text-sm text-gray-500">
                Interview Status
              </span>

              {isAIPlaying && (
                <span className="text-sm font-bold bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  AI Speaking
                </span>
              )}

            </div>

            <div className="h-px bg-gray-200" />

            {/* TIMER */}

            <div className="flex justify-center">
              <Timer
                timeLeft={timeLeft}
                totalTime={currentQuestion?.timeLimit || 60}
              />
            </div>

            <div className="h-px bg-gray-200" />

            {/* QUESTIONS COUNT */}

            <div className="grid grid-cols-2 gap-6 text-center">

              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  {currentIndex + 1}
                </span>

                <span className="text-xs text-gray-400">
                  {" "}
                  Current Questions
                </span>
              </div>

              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  {questions.length}
                </span>

                <span className="text-xs text-gray-400">
                  {" "}
                  Total Questions
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative">

          {/* HEADING */}

          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-6">
            AI Smart Interview
          </h2>

          {/* ================= QUESTION ================= */}

          {!isIntroPhase && (
            <div className="relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">

              <p className="text-xs sm:text-sm text-gray-400 mb-2">
                Question {currentIndex + 1} of {questions.length}
              </p>

              <div className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
                {currentQuestion?.question}
              </div>

            </div>
          )}

          {/* ================= ANSWER BOX ================= */}

          <textarea
            placeholder="Type your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-300 transition text-gray-800"
          />

          {/* ================= ACTION BUTTONS ================= */}

          {!feedback ? (
            <div className="flex items-center gap-4 mt-6">

              {/* MICROPHONE */}

              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.03 }}
                className={`
                  w-12 h-12 sm:w-14 sm:h-14
                  flex items-center justify-center
                  rounded-full
                  text-white
                  shadow-lg
                  transition
                  ${
                    isMicOn
                      ? "bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 shadow-violet-500/30"
                      : "bg-black"
                  }
                `}
              >
                {isMicOn ? (
                  <FaMicrophone size={20} />
                ) : (
                  <FaMicrophoneSlash size={20} />
                )}
              </motion.button>

              {/* SUBMIT */}

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.01 }}
                className="flex-1 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:opacity-95 transition font-semibold disabled:bg-gray-500"
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>

            </div>
          ) : (

            /* ================= FEEDBACK ================= */

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-violet-50 border border-violet-200 p-5 rounded-2xl shadow-sm"
            >

              <p className="text-violet-800 font-medium mb-4 leading-relaxed">
                {feedback}
              </p>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 text-white py-3 rounded-xl shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 hover:opacity-95 transition flex items-center justify-center gap-1 font-semibold"
              >
                Next Question
                <BsArrowRight size={18} />
              </button>

            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Step2Interview;
