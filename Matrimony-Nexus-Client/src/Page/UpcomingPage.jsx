import toast from "react-hot-toast";

const UpcomingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500">
      <div className="text-center text-white p-8 bg-white bg-opacity-10 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-4">
          Something Exciting is Coming Soon!
        </h1>
        <p className="text-lg mb-6">
          We are working hard to bring you a fantastic experience. Stay tuned
          for updates!
        </p>
        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-white text-pink-500 font-semibold rounded-lg shadow-md hover:bg-pink-100 transition-all"
            onClick={() => toast("Thank you for your patience!")}
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPage;
