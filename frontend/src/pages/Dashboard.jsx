import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import api from "../services/api";
export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");
const [type, setType] = useState("INCOME");
const [transactionDate, setTransactionDate] = useState("");
const [editingId, setEditingId] = useState(null);
const [loading, setLoading] = useState(false);
  useEffect(() => {
  fetchTransactions();
}, []);
const saveTransaction = async () => {
  setLoading(true);
  try {

    const data = {
      title,
      amount: Number(amount),
      category,
      type,
      transactionDate,
    };

    if (editingId) {

      await api.put(
        `/api/transactions/${editingId}`,
        data
      );

    } else {

      await api.post(
        `/api/transactions/${user.id}`,
        data
      );

    }

    setShowModal(false);

    setEditingId(null);

    setTitle("");
    setAmount("");
    setCategory("");
    setType("INCOME");
    setTransactionDate("");

    fetchTransactions();

  } catch (error) {
    console.log(error);
    alert("Operation Failed");
  }finally {
    setLoading(false);
}
};
const deleteTransaction = async (id) => {
  setLoading(true);
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/api/transactions/${id}`);

    fetchTransactions();

  } catch (error) {
    console.log(error);
    alert("Failed to delete transaction");
  }
  finally {
    setLoading(false);
}
};
const editTransaction = (transaction) => {

  setEditingId(transaction.id);

  setTitle(transaction.title);
  setAmount(transaction.amount);
  setCategory(transaction.category);
  setType(transaction.type);
  setTransactionDate(transaction.transactionDate);

  setShowModal(true);
};
const fetchTransactions = async () => {
  setLoading(true);

  try {
    const response = await api.get(
      `/api/transactions/${user.id}`
    );

    setTransactions(response.data);

  } catch (error) {
    console.log(error);

  } finally {

    setLoading(false);

  }
};
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {loading && (
  <LoadingOverlay text="Please wait..." />
)}

      {/* Navbar */}
      <div className="bg-blue shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-black">
              Personal Finance Manager
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome, {user?.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Transactions
          </h2>

          <button
  onClick={() => {
  setEditingId(null);

  setTitle("");
  setAmount("");
  setCategory("");
  setType("INCOME");
  setTransactionDate("");

  setShowModal(true);
}}
  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition cursor-pointer"
>
  + New Transaction
</button>

        </div>

        {/* Transaction Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="text-left px-6 py-4">Title</th>

                <th className="text-left px-6 py-4">Category</th>

                <th className="text-left px-6 py-4">Type</th>

                <th className="text-left px-6 py-4">Amount</th>

                <th className="text-left px-6 py-4">Date</th>

                <th className="text-center px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
  {transactions.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        className="text-center py-12 text-gray-500"
      >
        No transactions yet.
      </td>
    </tr>
  ) : (
    transactions.map((transaction) => (
      <tr
        key={transaction.id}
        className="border-t hover:bg-gray-50"
      >
        <td className="px-6 py-4">
          {transaction.title}
        </td>

        <td className="px-6 py-4">
          {transaction.category}
        </td>

        <td className="px-6 py-4">
          {transaction.type}
        </td>

        <td className="px-6 py-4">
          ₹{transaction.amount}
        </td>

        <td className="px-6 py-4">
          {transaction.transactionDate}
        </td>

        <td className="px-6 py-4 text-center">

          <button
  onClick={() => editTransaction(transaction)}
  className="text-blue-600 hover:underline mr-4 cursor-pointer"
>
  Edit
</button>

          <button
  onClick={() => deleteTransaction(transaction.id)}
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

        {/* Bottom Buttons */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <button
  onClick={() => navigate("/goals")}
  className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition text-left"
>
  <h3 className="bg-white font-bold rounded-xl shadow p-8 hover:shadow-lg transition text-left cursor-pointer">
    Manage Goals
  </h3>

  <p className="text-gray-500">
    Create, update and delete savings goals.
  </p>
</button>

          <button
  onClick={() => navigate("/reports")}
  className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition text-left"
>
  <h3 className="bg-white font-bold rounded-xl shadow p-8 hover:shadow-lg transition text-left cursor-pointer">
    Financial Report
  </h3>

  <p className="text-gray-500">
    View your income, expenses and balance.
  </p>
</button>
        </div>

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
  {editingId ? "Edit Transaction" : "New Transaction"}
</h2>

      <div className="space-y-4">

        <input
  type="text"
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full border rounded-lg px-4 py-3"
/>

        <input
  type="number"
  placeholder="Amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  className="w-full border rounded-lg px-4 py-3"
/>

        <input
  type="text"
  placeholder="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border rounded-lg px-4 py-3"
/>

        <select
  value={type}
  onChange={(e) => setType(e.target.value)}
  className="w-full border rounded-lg px-4 py-3"
>
  <option value="INCOME">INCOME</option>
  <option value="EXPENSE">EXPENSE</option>
</select>

        <input
  type="date"
  value={transactionDate}
  onChange={(e) => setTransactionDate(e.target.value)}
  className="w-full border rounded-lg px-4 py-3"
/>
      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setShowModal(false)}
          className="px-5 py-2 rounded-lg border cursor-pointer"
        >
          Cancel
        </button>

        <button
  onClick={saveTransaction}
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

