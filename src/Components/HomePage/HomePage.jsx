import { Link } from "react-router-dom"
import AppNav from "../AppNav/AppNav"

const HomePage = () => {
    return (
        <div className="home">
            <AppNav />
            <main className="homepage">

                <section>
                    <h1>
                        You travel the world.
                        <br />
                        WorldWise keeps track of your adventures.
                    </h1>
                    <h2>
                        A world map that tracks your footsteps into every city you can think
                        of. Never forget your wonderful experiences, and show your friends how
                        you have wandered the world.
                    </h2>

                    <button id="home-btn">
                        <Link to="/Login">
                            Start Tracking Now
                        </Link>
                    </button>
                </section>
            </main>
        </div>
    )
}

export default HomePage
