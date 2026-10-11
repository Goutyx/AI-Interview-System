import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsArrowRight,
  BsCheckCircleFill,
} from "react-icons/bs";

import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AuthModel from "../components/AuthModel";

import evalImg from "../assets/ai-ans.png";
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

import Footer from "../components/Footer";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    if (!userData) {
      setShowAuth(true);
      return;
    }

    navigate(path);
  };

  const steps = [
    {
      icon: <BsRobot size={23} />,
      step: "STEP 01",
      title: "Choose Your Role",
      desc: "Select your target role and experience level so the interview can match your preparation needs.",
    },
    {
      icon: <BsMic size={23} />,
      step: "STEP 02",
      title: "Take the Interview",
      desc: "Have a realistic voice-based interview with dynamic questions and intelligent follow-ups.",
    },
    {
      icon: <BsClock size={23} />,
      step: "STEP 03",
      title: "Get Your Analysis",
      desc: "Receive detailed feedback, scores and actionable insights to improve your next attempt.",
    },
  ];

  const capabilities = [
    {
      image: evalImg,
      icon: <BsBarChart size={20} />,
      title: "AI Answer Evaluation",
      desc: "Analyze communication, technical accuracy, confidence and answer quality with instant AI feedback.",
    },
    {
      image: resumeImg,
      icon: <BsFileEarmarkText size={20} />,
      title: "Resume-Based Interviews",
      desc: "Practice questions around your projects, skills and experience using your own resume.",
    },
    {
      image: pdfImg,
      icon: <BsFileEarmarkText size={20} />,
      title: "Detailed Interview Reports",
      desc: "Get a clear breakdown of your strengths, weaknesses and areas that need improvement.",
    },
    {
      image: analyticsImg,
      icon: <BsBarChart size={20} />,
      title: "Progress & Analytics",
      desc: "Track your interview history and understand how your performance improves over time.",
    },
  ];



  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 flex flex-col overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <main className="flex-1">
        <section className="relative px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          {/* Background Glow */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-200/30 blur-[130px] rounded-full" />

            <div className="absolute top-[350px] left-[-200px] w-[350px] h-[350px] bg-indigo-100/30 blur-[100px] rounded-full" />

            <div className="absolute top-[500px] right-[-200px] w-[350px] h-[350px] bg-violet-100/30 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-7"
            >
              <div className="bg-white border border-gray-200 shadow-sm text-gray-700 text-sm px-4 py-2 rounded-full flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-100 text-violet-600">
                  <HiSparkles size={13} />
                </span>

                AI-Powered Interview Coach
              </div>
            </motion.div>

            {/* Hero Content */}
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08]"
              >
                Practice Interviews.
                <br />

                <br />

                <span className="text-gray-400">Get Hired.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-gray-500 mt-7 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
              >
                Simulate realistic technical and HR interviews with an AI
                interviewer that adapts to your answers and gives you
                actionable feedback.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="flex flex-wrap justify-center gap-3 mt-9"
              >
                <motion.button
                  onClick={() => handleProtectedNavigation("/interview")}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-black text-white px-7 py-3.5 rounded-full shadow-lg shadow-black/10 flex items-center gap-2 font-medium transition"
                >
                  Start Mock Interview
                  <BsArrowRight size={17} />
                </motion.button>

                <motion.button
                  onClick={() => handleProtectedNavigation("/history")}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border border-gray-200 text-gray-800 px-7 py-3.5 rounded-full hover:bg-gray-50 transition font-medium"
                >
                  View My History
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-7 text-sm text-gray-500"
              >
                <span className="flex items-center gap-1.5">
                  <BsCheckCircleFill className="text-violet-500" />
                  AI Feedback
                </span>

                <span className="flex items-center gap-1.5">
                  <BsCheckCircleFill className="text-violet-500" />
                  Role-Based Practice
                </span>

                <span className="flex items-center gap-1.5">
                  <BsCheckCircleFill className="text-violet-500" />
                  Performance Analytics
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="px-6 pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest text-violet-600 mb-3">
                HOW IT WORKS
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                From preparation to performance
              </h2>

              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                A simple three-step process to help you prepare for your next
                interview.
              </p>
            </div>

            <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-16 left-[18%] right-[18%] border-t border-dashed border-gray-300 -z-0" />

              {steps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative z-10 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 text-violet-600 flex items-center justify-center mb-7">
                    {item.icon}
                  </div>

                  <div className="text-xs text-violet-600 font-semibold tracking-widest mb-2">
                    {item.step}
                  </div>

                  <h3 className="font-semibold text-xl mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI CAPABILITIES */}
        <section className="px-6 py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest text-violet-600 mb-3">
                POWERFUL FEATURES
              </p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-semibold tracking-tight"
              >
                Everything you need to{" "}
                <span className="text-violet-600">ace your interview</span>
              </motion.h2>

              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Practice smarter with tools designed to help you understand
                exactly where you can improve.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {capabilities.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="group bg-[#fafafa] border border-gray-200/80 rounded-3xl p-7 md:p-8 hover:shadow-xl hover:bg-white transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Product Preview */}
                    <div className="w-full md:w-1/2">
                      <div className="relative bg-white rounded-2xl border border-gray-200 p-3 shadow-sm group-hover:shadow-md transition">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto object-contain max-h-60 rounded-xl"
                        />

                        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-lg">
                          {item.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2">
                      <div className="bg-violet-50 text-violet-600 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                        {item.icon}
                      </div>

                      <h3 className="font-semibold text-xl mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="flex items-center gap-2 text-violet-600 text-sm font-medium mt-5">
                        Explore feature
                        <BsArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2rem] bg-black text-white px-8 py-16 md:px-16 md:py-20 text-center"
            >
              {/* CTA Glow */}
              <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/30 blur-[100px] rounded-full" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 mb-6">
                  <HiSparkles className="text-violet-400" />
                  Prepare smarter with PrepWise
                </div>

                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto leading-tight">
                  Ready for your next interview?
                </h2>

                <p className="text-gray-400 max-w-xl mx-auto mt-5 leading-relaxed">
                  Practice today and walk into your real interview with
                  confidence.
                </p>

                <motion.button
                  onClick={() => handleProtectedNavigation("/interview")}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 bg-white text-black px-7 py-3.5 rounded-full font-medium inline-flex items-center gap-2 shadow-xl"
                >
                  Start Your First Interview
                  <BsArrowRight size={17} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* AUTH MODAL */}
      {showAuth && (
        <AuthModel onClose={() => setShowAuth(false)} />
      )}

      <Footer />
    </div>
  );
}

export default Home;
