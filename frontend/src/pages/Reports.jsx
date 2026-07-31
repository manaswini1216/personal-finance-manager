import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Reports() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);

    try {
      const response = await api.get(
        `/api/transactions/summary/${user.id}`
      );

      setReport(response.data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">

      {loading && (
        <LoadingOverlay text="Loading Report..." />
      )}

      <div className="bg-blue shadow-sm">

        <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Financial Report
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
          >
            Dashboard
          </button>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {report && (

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-gray-500">
                Total Income
              </h2>

              <p className="text-3xl font-bold text-green-600 mt-4">
                ₹{report.totalIncome}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-gray-500">
                Total Expense
              </h2>

              <p className="text-3xl font-bold text-red-600 mt-4">
                ₹{report.totalExpense}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-gray-500">
                Current Balance
              </h2>

              <p className="text-3xl font-bold text-blue-600 mt-4">
                ₹{report.balance}
              </p>
            </div>

          </div>

        )}

      </div>

    </div>
  );
}