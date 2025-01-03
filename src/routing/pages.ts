import { lazy } from "react";

// Private routes
export const Home = lazy(() => import("#/pages/Home"));
export const Login = lazy(() => import("#/pages/auth/Login"));
export const Register = lazy(() => import("#/pages/auth/Register"));
export const SpotifyCallback = lazy(() => import("#/pages/auth/SpotifyCallback"));
export const GoogleCallback = lazy(() => import("#/pages/auth/GoogleCallback"));

// Public routes
export const UserSettings = lazy(() => import("#/pages/user/UserSettings"));
export const Create = lazy(() => import("#/pages/party/Create"));
export const Join = lazy(() => import("#/pages/party/Join"));
export const Party = lazy(() => import("#/pages/party/Party"));
export const PartyQueue = lazy(() => import("#/pages/party/PartyQueue"));
export const PartyHistory = lazy(() => import("#/pages/party/PartyHistory"));
export const GeneralError = lazy(() => import("#/pages/error/GeneralError"));
