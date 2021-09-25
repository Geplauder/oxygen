import React from "react";
import { Redirect, Route } from "react-router";
import { selectToken } from "../features/login/loginSlice";
import { useAppSelector } from "./hooks";

export function AuthenticatedRoute({ children, path }: { children: React.ReactNode, path: string }): JSX.Element {
    const token = useAppSelector(selectToken);
    return (
        <Route path={path} render={({ location }) => token ? (children) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />)}
        />
    );
}