import React from "react";
import { NavLink } from "react-router-dom";


const Header= ()=>{
    return(
        <div>
            <div className="flex flex-row justify-between py-5 px-30 font-light text-3xl ">
                <NavLink to="/">
                    <div>
                        Anikzzzy
                    </div>
                </NavLink>

                <div className="flex flex-row gap-3 font-extralight text-lg">
                    <NavLink to="/">
                        <div>Home</div>
                    </NavLink>
                    <NavLink to="/signup">
                        <div>Signup</div>
                    </NavLink>

                    <NavLink to="/signup">
                        <div>Signin</div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default Header;