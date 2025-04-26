import { Link } from "react-router-dom"
import shoocard from "../../assets/images/crossover.webp"
import shoocard2 from "../../assets/images/currybg.webp"
import shoocard3 from "../../assets/images/holiday-defense.webp"
import shoocard4 from "../../assets/images/pass.webp"
import "./bento.css"

const Title1 = () => {
  return (
    <h1 className="font-light w-1/2 text-white text-4xl md:text-5xl absolute lg:text-6xl mb-8 top-2/3">
      <strong className="font-bold">
        CHOOSE YOUR
        <br />
        TOPIC
      </strong>
      <span className="block mt-2">to focus on</span>
    </h1>
  )
}

const Bentobox = ({ routine }) => {
  return (
    <div className="w-screen sm:px-6 lg:px-20">
      <Title1 />
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
   
        <Link to="shooting" className="mb-4 md:mb-0">
          <div className="bg-gray-800 rounded-lg overflow-hidden h-48 md:h-1/2 w-full">
            <div className="group relative block h-full">
              <img
                src={shoocard2 || "/placeholder.svg"}
                alt="Shooting"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/30 hover:bg-none"></div>
              <h3 className="absolute top-4 left-4 text-2xl font-bold text-white z-10">SHOOTING</h3>
            </div>
          </div>
        </Link>

      
        <div className="mobile-stack flex flex-col space-y-4">
          <Link to="defense">
            <div className="group relative block h-48 bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={shoocard3 || "/placeholder.svg"}
                alt="Defense"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/30 hover:bg-none"></div>
              <h3 className="absolute top-4 left-4 text-2xl font-bold text-white z-10">DEFENSE</h3>
            </div>
          </Link>

          <Link to="crossover">
            <div className="group relative block h-48 bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={shoocard || "/placeholder.svg"}
                alt="Crossover"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/30 hover:bg-none"></div>
              <h3 className="absolute top-4 left-4 text-2xl font-bold text-white z-10">CROSSOVER</h3>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-4 sub-mobile-stack">
            <Link to="passing">
              <div className="group relative block h-48 bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={shoocard4 || "/placeholder.svg"}
                  alt="Passing"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/30 hover:bg-none"></div>
                <h3 className="absolute top-4 left-4 text-2xl font-bold text-white z-10">PASSING</h3>
              </div>
            </Link>

        {/*   
       <Link to="custom"> 
              <div className="group relative block bg-cover h-48 bg-gray-800 rounded-lg bg-[url('https://static.vecteezy.com/system/resources/previews/034/978/267/non_2x/basketball-blackboard-with-chalk-game-strategy-coach-plan-white-lines-on-board-training-education-illustration-vector.jpg')] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/30 hover:bg-none "></div>
                <h3 className="absolute top-4 left-4 text-2xl font-bold text-white z-10">
                  {routine ? routine.name : "CREATE YOUR OWN"}
                </h3>
                {!routine && (
                  <h4 className="absolute top-12 left-4 text-sm font-normal text-white">
                    You don't have any custom routine yet!
                  </h4>
                )}
              </div>
            </Link> Waiting*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bentobox

