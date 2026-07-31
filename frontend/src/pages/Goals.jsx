import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import api from "../services/api";
export default function Goals() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

const [goalName, setGoalName] = useState("");
const [targetAmount, setTargetAmount] = useState("");
const [savedAmount, setSavedAmount] = useState("");
const [editingId, setEditingId] = useState(null);
const [loading, setLoading] = useState(false);
  useEffect(() => {
  fetchGoals();
}, []);

const fetchGoals = async () => {

  setLoading(true);

  try {

    const response = await api.get(`/api/goals/${user.id}`);

    setGoals(response.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};
const saveGoal = async () => {
  setLoading(true);
  try {

    const data = {
      goalName,
      targetAmount: Number(targetAmount),
      savedAmount: Number(savedAmount),
    };

    if (editingId) {

      await api.put(
        `/api/goals/${editingId}`,
        data
      );

    } else {

      await api.post(
        `/api/goals/${user.id}`,
        data
      );

    }

    setShowModal(false);

    setEditingId(null);

    setGoalName("");
    setTargetAmount("");
    setSavedAmount("");

    fetchGoals();

  } catch (error) {
    console.log(error);
    alert("Operation Failed");
  }finally {

    setLoading(false);

  }
};
const editGoal = (goal) => {
  setEditingId(goal.id);

  setGoalName(goal.goalName);
  setTargetAmount(goal.targetAmount);
  setSavedAmount(goal.savedAmount);

  setShowModal(true);
};
const deleteGoal = async (id) => {

  if (!window.confirm("Delete this goal?")) return;

  setLoading(true);

  try {

    await api.delete(`/api/goals/${id}`);

    fetchGoals();

  } catch (error) {

    console.log(error);
    alert("Failed to delete goal");

  } finally {

    setLoading(false);

  }
};
  return (
    <div className="min-h-screen bg-blue-50">
      {loading && (
  <LoadingOverlay text="Please wait..." />
)}
      <div className="bg-blue shadow-sm">

        <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Savings Goals
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

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Your Goals
          </h2>

          <button
onClick={() => {
  setEditingId(null);

  setGoalName("");
  setTargetAmount("");
  setSavedAmount("");

  setShowModal(true);
}}  className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-800 transition"
>
  + New Goal
</button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="text-left px-6 py-4">
                  Goal
                </th>

                <th className="text-left px-6 py-4">
                  Target
                </th>

                <th className="text-left px-6 py-4">
                  Saved
                </th>

                <th className="text-center px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
  {goals.length === 0 ? (
    <tr>
      <td
        colSpan="4"
        className="text-center py-12 text-gray-500"
      >
        No goals yet.
      </td>
    </tr>
  ) : (
    goals.map((goal) => (
      <tr
        key={goal.id}
        className="border-t hover:bg-gray-50"
      >
        <td className="px-6 py-4">
          {goal.goalName}
        </td>

        <td className="px-6 py-4">
          ₹{goal.targetAmount}
        </td>

        <td className="px-6 py-4">
          ₹{goal.savedAmount}
        </td>

        <td className="px-6 py-4 text-center">

          <button
  onClick={() => editGoal(goal)}
  className="text-blue-600 hover:underline mr-4 cursor-pointer"
>
  Edit
</button>

          <button
  onClick={() => deleteGoal(goal.id)}
  className="text-red-600 hover:underline cursor-pointer"
>
  Delete
</button>

        </td>

      </tr>
    ))
  )}
</tbody>

          </table>

        </div>

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

    <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

      <h2 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Goal" : "New Goal"}
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="number"
          placeholder="Saved Amount"
          value={savedAmount}
          onChange={(e) => setSavedAmount(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        />

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setShowModal(false)}
          className="border px-5 py-2 rounded-lg cursor-pointer"
        >
          Cancel
        </button>

        <button
  onClick={saveGoal}
  disabled={loading}
  className="bg-black text-white px-6 py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Saving..." : "Save"}
</button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}

