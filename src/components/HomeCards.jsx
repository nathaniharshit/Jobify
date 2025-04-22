import { Link } from "react-router-dom";

const HomeCards = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-8 rounded-xl bg-gray-200 mb-20">
      <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col items-start">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          For Candidates
        </h2>
        <p className="text-gray-700 mb-6">Here you can find your job </p>
        <Link
          to={"/jobs"}
          className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Find job
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-start">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">For companies</h2>
        <p className="text-gray-700 mb-6">Here Companies can add a job </p>
        <Link
          to={"/add-job"}
          className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Add job
        </Link>
      </div>
    </div>
  );
};

export default HomeCards;
