import { useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page not found / Cinebite";
  }, []);

  return (
    <main className="max-w-[1800px] flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <section className="text-center">
        <img className="mx-auto h-48 w-48" src="/err.png" alt="404" />
        <Link
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          to="/"
        >
          Go back to home
        </Link>
      </section>
    </main>
  );
};

export default PageNotFound;
