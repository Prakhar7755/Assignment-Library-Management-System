export default function Navbar() {
  return (
    <div className="navbar bg-base-300 shadow-sm flex justify-between">
      <a className="btn btn-ghost text-xl">Library Management App</a>

      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          window.location.reload();
        }}
        className="bg-red-700 hover:bg-red-400 text-white px-4 py-2 rounded-md font-medium transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}
