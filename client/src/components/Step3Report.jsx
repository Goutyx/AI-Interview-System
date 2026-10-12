import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090510] via-[#10081c] to-[#160d2b] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-indigo-500/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-180px] left-[-150px] w-[450px] h-[450px] bg-violet-600/15 blur-[130px] rounded-full" />
          <div className="absolute top-[250px] right-[-180px] w-[450px] h-[450px] bg-indigo-600/15 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin mb-5" />
          <p className="text-lg font-medium bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Loading Report...
          </p>
        </div>
      </div>
    );
  }

  const navigate = useNavigate();

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(124, 58, 237);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
      align: "center",
    });

    currentY += 5;

    doc.setDrawColor(124, 58, 237);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 15;

    doc.setFillColor(245, 243, 255);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Final Score: ${finalScore}/10`,
      pageWidth / 2,
      currentY + 12,
      { align: "center" }
    );

    currentY += 30;

    doc.setFillColor(249, 247, 255);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");
    doc.setFontSize(12);

    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

    currentY += 45;

    let advice = "";

    if (finalScore >= 8) {
      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    autotable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },
      headStyles: {
        fillColor: [124, 58, 237],
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 55 },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: "auto" },
      },
      alternateRowStyles: {
        fillColor: [249, 247, 255],
      },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090510] via-[#10081c] to-[#160d2b] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-violet-600/15 via-purple-500/15 to-indigo-500/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-180px] left-[-150px] w-[450px] h-[450px] bg-violet-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-[250px] right-[-180px] w-[450px] h-[450px] bg-indigo-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10">
        <div className="mb-6 sm:mb-8 flex flex-col gap-4">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 sm:p-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-lg hover:bg-white/15 hover:shadow-violet-500/20 transition"
              >
                <FaArrowLeft className="text-violet-300 text-sm sm:text-base" />
              </button>

              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
                  Interview Analytics Dashboard
                </h1>
                <p className="text-gray-400 text-sm sm:text-base mt-1">
                  AI-Powered Performance Insights
                </p>
              </div>
            </div>

            <button
              onClick={downloadPDF}
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-400 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg shadow-violet-900/20 transition-all duration-300 font-semibold text-sm sm:text-base"
            >
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="space-y-6 mt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/[0.06] border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center"
            >
              <h3 className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Overall Performance
              </h3>

              <div className="relative w-20 h-36 sm:w-25 sm:h-25 mx-auto">
                <CircularProgressbar
                  value={percentage}
                  text={`${score}/10`}
                  styles={buildStyles({
                    textSize: "18px",
                    pathColor: "#8b5cf6",
                    textColor: "#c4b5fd",
                    trailColor: "rgba(255,255,255,0.1)",
                  })}
                />
              </div>

              <p className="text-gray-500 mt-3 text-xs sm:text-sm">
                Out of 10
              </p>

              <div className="mt-4">
                <p className="font-semibold text-white text-sm sm:text-base">
                  {performanceText}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {shortTagline}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/[0.06] border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-6">
                Skill Evaluation
              </h3>

              <div className="space-y-5">
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-sm sm:text-base">
                      <span className="text-gray-300">{s.label}</span>
                      <span className="font-semibold text-violet-400">
                        {s.value}
                      </span>
                    </div>

                    <div className="bg-white/10 h-2 sm:h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 h-full rounded-full"
                        style={{ width: `${s.value * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/[0.06] border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-4 sm:mb-6">
                Performance Trend
              </h3>

              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.08)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#9ca3af" }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    />
                    <YAxis
                      domain={[0, 10]}
                      tick={{ fill: "#9ca3af" }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#171022",
                        border: "1px solid rgba(139,92,246,0.3)",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#8b5cf6"
                      fill="rgba(139,92,246,0.2)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/[0.06] border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-6">
                Question Breakdown
              </h3>

              <div className="space-y-6">
                {questionWiseScore.map((q, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.04] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div>
                        <p className="text-xs text-violet-400">
                          Question {i + 1}
                        </p>

                        <p className="font-semibold text-white text-sm sm:text-base leading-relaxed mt-1">
                          {q.question || "Question not available"}
                        </p>
                      </div>

                      <div className="bg-violet-500/10 text-violet-300 border border-violet-500/20 px-3 py-1 rounded-full font-bold text-sm w-fit">
                        {q.score ?? 0}/10
                      </div>
                    </div>

                    <div className="bg-violet-500/[0.06] border border-violet-500/15 p-4 rounded-lg">
                      <p className="text-xs text-violet-400 font-semibold mb-1">
                        AI Feedback
                      </p>

                      <p className="text-sm text-gray-300 leading-relaxed">
                        {q.feedback && q.feedback.trim() !== ""
                          ? q.feedback
                          : "No feedback available for this question."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3Report;
