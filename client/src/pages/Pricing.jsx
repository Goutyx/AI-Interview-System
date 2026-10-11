import React, { useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch();

  const plans = [
    {
      id: "free",
      name: "Free",
      pricing: "₹0",
      credits: 100,
      description:
        "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      pricing: "₹100",
      credits: 150,
      description:
        "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      pricing: "₹500",
      credits: 650,
      description:
        "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const amount =
        plan.id === "basic"
          ? 100
          : plan.id === "pro"
          ? 500
          : 0;

      const result = await axios.post(
        `${ServerUrl}/api/payment/order`,
        {
          planId: plan.id,
          amount: amount,
          credits: plan.credits,
        },
        {
          withCredentials: true,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "Interview.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          try {
            const verifypay = await axios.post(
              ServerUrl + "/api/payment/verify",
              response,
              {
                withCredentials: true,
              }
            );

            dispatch(setUserData(verifypay.data.user));

            alert("Payment Successful! Credits added!");
            navigate("/");
          } catch (error) {
            console.log(error);
            alert("Payment verification failed.");
          }
        },

        theme: {
          color: "#8b5cf6",
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK is not loaded");
      }

      const rzp = new window.Razorpay(options);

      rzp.open();

      setLoadingPlan(null);
    } catch (error) {
      console.log(error);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#090510] text-white px-6 py-12 md:py-16 relative overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Main purple glow */}
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-violet-700/30 via-purple-600/30 to-indigo-600/30 blur-[140px] rounded-full" />

        {/* Left glow */}
        <div className="absolute top-[350px] left-[-250px] w-[450px] h-[450px] bg-violet-700/20 blur-[130px] rounded-full" />

        {/* Right glow */}
        <div className="absolute top-[500px] right-[-250px] w-[450px] h-[450px] bg-indigo-700/20 blur-[130px] rounded-full" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-700/20 blur-[150px] rounded-full" />
      </div>

      {/* ================= HEADER ================= */}

      <div className="max-w-6xl mx-auto mb-14 relative z-10">

        <div className="flex items-start gap-4">

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="mt-2 p-3.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-md transition"
          >
            <FaArrowLeft />
          </motion.button>

          {/* Heading */}
          <div className="text-center w-full pr-10">

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/50" />

              PrepWise Pricing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight"
            >
              Choose Your{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Plan
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-gray-400 mt-4 text-base md:text-lg"
            >
              Flexible pricing to match your interview preparation goals.
            </motion.p>

          </div>
        </div>
      </div>

      {/* ================= PRICING CARDS ================= */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto relative z-10">

        {plans.map((plan, index) => {

          const isSelected = selectedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={!plan.default ? { y: -8 } : {}}
              onClick={() =>
                !plan.default && setSelectedPlan(plan.id)
              }
              className={`
                relative rounded-3xl p-8 transition-all duration-300
                border backdrop-blur-xl overflow-hidden
                ${
                  isSelected
                    ? "border-violet-500/70 bg-gradient-to-b from-violet-950/60 via-purple-950/40 to-[#10091c] shadow-2xl shadow-violet-900/30"
                    : "border-white/10 bg-white/[0.035] hover:border-violet-500/40 hover:bg-white/[0.055] hover:shadow-2xl hover:shadow-violet-950/20"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >

              {/* Selected card glow */}
              {isSelected && (
                <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[300px] h-[250px] bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 text-white text-xs px-4 py-1.5 rounded-full shadow-lg shadow-violet-500/20">
                  {plan.badge}
                </div>
              )}

              {/* Default badge */}
              {plan.default && (
                <div className="absolute top-6 right-6 bg-white/10 border border-white/10 text-gray-300 text-xs px-4 py-1.5 rounded-full">
                  Default
                </div>
              )}

              {/* Plan name */}
              <h3 className="relative text-xl font-semibold text-white">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="relative mt-6">

                <span
                  className={`
                    text-4xl font-bold
                    ${
                      isSelected
                        ? "bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                        : "text-white"
                    }
                  `}
                >
                  {plan.pricing}
                </span>

                <p className="text-gray-500 mt-2">
                  {plan.credits} Credits
                </p>

              </div>

              {/* Description */}
              <p className="relative text-gray-400 mt-5 text-sm leading-relaxed min-h-[45px]">
                {plan.description}
              </p>

              {/* Divider */}
              <div className="border-t border-white/10 mt-7 pt-6">

                {/* Features */}
                <div className="space-y-4 text-left">

                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0">
                        <FaCheckCircle
                          className={`
                            text-sm
                            ${
                              isSelected
                                ? "text-violet-400"
                                : "text-gray-500"
                            }
                          `}
                        />
                      </div>

                      <span className="text-gray-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>
              </div>

              {/* Button */}
              {!plan.default && (
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!isSelected) {
                      setSelectedPlan(plan.id);
                    } else {
                      handlePayment(plan);
                    }
                  }}
                  className={`
                    relative w-full mt-8 py-3.5 rounded-xl
                    font-semibold transition-all duration-300
                    ${
                      isSelected
                        ? "bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-500/40 hover:scale-[1.01]"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-violet-500/30"
                    }
                  `}
                >
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                    ? "Proceed to Pay"
                    : "Select Plan"}
                </button>
              )}

              {/* Free plan indicator */}
              {plan.default && (
                <div className="mt-8 w-full py-3.5 rounded-xl text-center bg-white/5 border border-white/10 text-gray-400 text-sm">
                  Current Plan
                </div>
              )}

            </motion.div>
          );
        })}
      </div>

      {/* ================= BOTTOM CTA ================= */}

      <section className="max-w-6xl mx-auto mt-20 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#160b27] via-[#10091c] to-[#0c0715] border border-white/10 px-8 py-12 md:px-16 md:py-14 text-center"
        >

          {/* CTA glow */}
          <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-violet-600/25 via-purple-500/25 to-indigo-500/25 blur-[100px] rounded-full" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 mb-5">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400 shadow-lg shadow-violet-500/50" />

              Prepare smarter with PrepWise
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Ready for your next interview?
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto mt-4 leading-relaxed">
              Practice today and walk into your real interview with
              confidence.
            </p>

            <motion.button
              onClick={() => navigate("/interview")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-7 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 text-white px-7 py-3.5 rounded-full font-medium inline-flex items-center gap-2 shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 transition"
            >
              Start Your First Interview
            </motion.button>

          </div>
        </motion.div>

      </section>

    </div>
  );
}

export default Pricing;
