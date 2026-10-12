import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../App";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

function InterviewHistory() {
    const [interviews, setInterviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(
                    ServerUrl + "/api/interview/get-interview",
                    { withCredentials: true }
                );
                setInterviews(result.data);
            } catch (error) {
                console.log(error);
            }
        };

        getMyInterviews();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#090510] via-[#10081c] to-[#160d2b] py-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-indigo-500/20 blur-[120px] rounded-full" />

                <div className="absolute bottom-[-180px] left-[-150px] w-[450px] h-[450px] bg-violet-600/15 blur-[130px] rounded-full" />

                <div className="absolute top-[250px] right-[-180px] w-[450px] h-[450px] bg-indigo-600/15 blur-[130px] rounded-full" />
            </div>

            <div className="w-[90%] lg:w-[70%] mx-auto relative z-10">

                <div className="mb-10 flex items-center gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="p-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-lg hover:bg-white/15 hover:shadow-violet-500/20 transition"
                    >
                        <FaArrowLeft className="text-violet-300" />
                    </button>

                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                            Interview History
                        </h1>

                        <p className="text-gray-400 mt-1">
                            Track your past interviews and performance reports
                        </p>
                    </div>
                </div>

                {interviews.length === 0 ? (
                    <div className="bg-white/[0.06] border border-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-xl text-center">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center">
                            <FaArrowLeft className="text-violet-400 rotate-180" />
                        </div>

                        <p className="text-gray-400">
                            No interviews found. Start your first interview.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">

                        {interviews.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className="group bg-white/[0.06] border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-violet-500/20 hover:border-violet-500/30 hover:bg-white/[0.08] transition duration-300 cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    <div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition">
                                            {item.role}
                                        </h3>

                                        <p className="text-gray-400 text-sm mt-1">
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-2">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-6">

                                        <div className="text-right">
                                            <p className="text-xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                                {item.finalScore || 0}/10
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Overall Score
                                            </p>
                                        </div>

                                        <span
                                            className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                                                item.status === "completed"
                                                    ? "bg-violet-500/10 text-violet-300 border-violet-500/20"
                                                    : "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}

export default InterviewHistory;
