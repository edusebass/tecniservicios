import Navbar from "../components/NavBar";
const HomePage = () => {
  return (
    <>
    <Navbar />
        <div className="flex items-center justify-center h-screen">
            <strong 
                className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white 
                focus:outline-none focus:shadow-outline"
                >
                BIENVENIDO
            </strong>
        </div>
    </>
  );
}

export default HomePage;
