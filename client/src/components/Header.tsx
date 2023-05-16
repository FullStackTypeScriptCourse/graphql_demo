import LoggedIn from "./LoggedIn";
import NavItem from "./NavItem";
import { useAuth } from "../hooks/AuthContext.js";
import Logo from "./Logo";
import { faCheck, faHome, faPenToSquare, faChartLine, faUser, faUsers, faTasks } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
// import Button from "./basic/Button.js";

function Header({ toggleModal }: { toggleModal: () => void }) {
    const { state, autoLogin } = useAuth();

    useEffect(() => {
        autoLogin(); // check if user is logged in (a valid token exists in local storage)
    }, []);
    return ( <>
            <nav className="w-full flex h-[50px] justify-end items-center gap-6 px-4 bg-slate-900">
                <Logo />
                <NavItem
                    // allowedRoles={["admin", "user"]}
                    route={"/"}
                    icon={faHome}
                    label={"Home"}
                />
                {state.loggedIn && (<>
                <NavItem
                    allowedRoles={["admin"]}
                    route={"/admin/create/user"}
                    icon={faUser}
                    label={"create user"}
                />
                <NavItem
                    allowedRoles={["admin"]}
                    route={"/admin/create/task"}
                    icon={faTasks}
                    label={"create task"}
                />
                <NavItem
                    allowedRoles={["admin"]}
                    route={"/admin/view/users"}
                    icon={faUsers}
                    label={"view users"}
                />
                <NavItem
                    allowedRoles={["admin"]}
                    route={"/admin/view/tasks"}
                    icon={faTasks}
                    label={"view tasks"}
                />
                <NavItem
                    allowedRoles={["user"]}
                    route={"/user/view/tasks"}
                    icon={faTasks}
                    label={"view tasks"}
                />
                <NavItem
                    allowedRoles={["user"]}
                    route={"/user/submit/task"}
                    icon={faCheck}
                    label={"submit task"}
                />
                <NavItem
                    allowedRoles={["user"]}
                    route={"/user"}
                    icon={faChartLine}
                    label={"see your stats"}
                    end // stops showing active border on nav item when subroutes are active.
                />
                 <LoggedIn />
                </>)}
                {
                    !state.loggedIn && 
                <span onClick={toggleModal} >
                
                    <NavItem
                        // allowedRoles={["user"]}
                        route={"/user/login"}
                        icon={faPenToSquare}
                        label={"login"}
                    /></span>
                }
            </nav>
            <Outlet />
        </>
    );
}

export default Header;
