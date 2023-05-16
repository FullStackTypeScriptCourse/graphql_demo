import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import {Role} from "../types";

interface NavItemProps {
	label: string;
	icon: FontAwesomeIconProps["icon"];
	route: string;
	end?: boolean;
	allowedRoles?: Role[];
    onClick?: () => void;
}

function NavItem({ label, icon, route, end, allowedRoles }: NavItemProps) {
	const { hasAccessRights } = useAuth();
	const auth = !allowedRoles || hasAccessRights(allowedRoles);

	return auth ? (
		<NavLink
			end={end}
			className={(active) =>
				`${
					active.isActive ? "border-b-2" : ""
				} flex text-amber-400 justify-center h-fit items-center gap-2 p-1 transition-all`
			}
			to={route}
		>
			<FontAwesomeIcon className="m-0 p-0" icon={icon} />
			<p className="m-0 p-0">{label}</p>
		</NavLink>
	) 
    : (
		<></>
	);
}

export type { NavItemProps };
export default NavItem;
