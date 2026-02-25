import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { Award, Package, TrendingUp } from "lucide-react";

function Profile() {
  return (
    <div>
      <Navbar />
      <main className="my-7 flex flex-col gap-16 justify-center items-center ">
        <h1 className="text-3xl font-semibold">Welcome, Saransh</h1>
        <div className="flex justify-between w-full px-16 gap-6">
          <div className="flex w-full justify-start items-center gap-6 border border-gray-500/50 px-5 py-5 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-green-700/10 flex justify-center items-center">
              <Package className="w-7 h-7 text-green-800" />
            </div>
            <div>
              <div className="text-gray-500">Total Purchase</div>
              <div className="text-xl font-semibold">6</div>
            </div>
          </div>

          <div className="flex justify-start items-center gap-6 w-full border border-gray-500/50 p-5 rounded-xl ">
            <div className="w-14 h-14 rounded-full bg-green-700/10 flex justify-center items-center">
              <TrendingUp className="w-7 h-7 text-green-800" />
            </div>
            <div>
              <div className="text-gray-500">Total Spent</div>
              <div className="text-xl font-semibold">$43.99</div>
            </div>
          </div>

          <div className="flex justify-start items-center gap-6 w-full border border-gray-500/50 p-5 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-green-700/10 flex justify-center items-center">
              <Award className="w-7 h-7 text-green-800" />
            </div>
            <div>
              <div className="text-gray-500">Avg Eco Score</div>
              <div className="text-xl font-semibold">A+</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
