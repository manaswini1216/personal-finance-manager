export default function LoadingOverlay({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]">

      <div className="bg-white rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center">

        <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        <h2 className="mt-6 text-xl font-semibold">
          {text}
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          Loading...
        </p>

      </div>

    </div>
  );
}