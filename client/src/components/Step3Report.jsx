import React from "react";
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Step1SetUp({ onStart }) {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;

    setAnalyzing(true);

    const formdata = new FormData();
    formdata.append("resume", resumeFile);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/resume",
        formdata,
        { withCredentials: true }
      );

      console.log(result.data);

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/generate-questions",
        {
          role,
          experience,
          mode,
          resumeText,
          projects,
          skills,
        },
        { withCredentials: true }
      );

      console.log(result.data);

      if (userData) {
        dispatch(
          setUserData({
            ...userData,
            credits: result.data.creditsLeft,
          })
        );
      }

      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090510] via-[#10081c] to-[#160d2b] px-4 py-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-indigo-500/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-180px] left-[-150px] w-[450px] h-[450px] bg-violet-600/15 blur-[130px] rounded-full" />

        <div className="absolute top-[200px] right-[-180px] w-[450px] h-[450px] bg-indigo-600/15 blur-[130px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden relative z-10">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-8 md:p-12 flex flex-col justify-center overflow-hidden"
        >
          <div className="absolute top-[-160px] right-[-120px] w-[350px] h-[350px] bg-white/10 blur-[90px] rounded-full" />

          <div className="absolute bottom-[-180px] left-[-120px] w-[350px] h-[350px] bg-indigo-950/30 blur-[100px] rounded-full" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white/90 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white/50" />
              AI-Powered Interview
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Start Your
              <br />
              <span className="text-white/90">AI Interview</span>
            </h2>

            <p className="text-violet-100 mb-10 leading-relaxed max-w-md">
              Practise real interview scenarios powered by AI. Improve
              communication, technical skills, and confidence before your
              actual interview.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: <FaUserTie className="text-violet-600 text-xl" />,
                  text: "Choose Role & Experience",
                },
                {
                  icon: (
                    <FaMicrophoneAlt className="text-violet-600 text-xl" />
                  ),
                  text: "Smart Voice Interview",
                },
                {
                  icon: <FaChartLine className="text-violet-600 text-xl" />,
                  text: "Performance Analytics",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="flex items-center gap-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg cursor-pointer border border-white/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                    {item.icon}
                  </div>

                  <span className="text-gray-800 font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-8 md:p-12 bg-[#faf9fc]"
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full text-xs font-medium text-violet-700 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Interview Setup
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Interview Set-up
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Configure your interview and get ready to practice.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <FaUserTie className="absolute top-4 left-4 text-violet-500" />

              <input
                type="text"
                placeholder="Enter Role"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 outline-none transition text-gray-800 placeholder:text-gray-400 shadow-sm"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            <div className="relative">
              <FaBriefcase className="absolute top-4 left-4 text-violet-500" />

              <input
                type="text"
                placeholder="Enter Experience (e.g. 2 years)"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 outline-none transition text-gray-800 placeholder:text-gray-400 shadow-sm"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 outline-none transition text-gray-700 shadow-sm cursor-pointer"
            >
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>

            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  document.getElementById("resumeUpload").click()
                }
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-50/60 transition bg-white"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                  <FaFileUpload className="text-2xl text-violet-600" />
                </div>

                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <p className="text-gray-600 font-medium">
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload resume (Optional)"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  PDF format recommended
                </p>

                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 text-white px-5 py-2.5 rounded-lg hover:opacity-95 transition shadow-md shadow-violet-500/20 font-medium"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-violet-50/70 border border-violet-100 rounded-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Resume Analysis Result
                  </h3>

                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 flex items-center justify-center text-white text-sm">
                    ✓
                  </div>
                </div>

                {projects.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">
                      Projects:
                    </p>

                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-2">
                      Skills:
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-800 border border-violet-200 px-3 py-1 rounded-full text-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{
                scale: !role || !experience || loading ? 1 : 1.02,
              }}
              whileTap={{
                scale: !role || !experience || loading ? 1 : 0.97,
              }}
              className="w-full bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-500 text-white py-3.5 rounded-full text-lg font-semibold transition duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 disabled:cursor-not-allowed"
            >
              {loading ? "Starting..." : "Start Interview"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step1SetUp;
