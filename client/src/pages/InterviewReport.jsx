import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import Step3Report from "../components/Step3Report";
import { useState, useEffect } from "react";

function InterviewReport() {
    const { id } = useParams();
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const result = await axios.get(
                    ServerUrl + "/api/interview/report/" + id,
                    { withCredentials: true }
                );

                console.log(result.data);
                setReport(result.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchReport();
    }, [id]);

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
                    <p className="text-gray-500 text-sm mt-2">
                        Preparing your interview performance report
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#090510] via-[#10081c] to-[#160d2b] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-violet-600/15 via-purple-500/15 to-indigo-500/15 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-180px] left-[-150px] w-[450px] h-[450px] bg-violet-600/10 blur-[130px] rounded-full" />
                <div className="absolute top-[250px] right-[-180px] w-[450px] h-[450px] bg-indigo-600/10 blur-[130px] rounded-full" />
            </div>
            <div className="relative z-10">
                <Step3Report report={report} />
            </div>
        </div>
    );
}

export default InterviewReport;
