import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../img/logo.png";
import {
	Card,
	Logo,
	Form,
	Input,
	Button,
	Error,
} from "../components/AuthForms";
import axios from "axios";
import { useAuth } from "../context/auth";

function Signup(props) {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [name, setName] = useState("");
	const [email, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthTokens } = useAuth();
	const referer = props.location.state ? props.location.state.referer : "/";

	const postRegister = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/register", {
				name,
				email,
				password,
			})
			.then((result) => {
				if (result.status === 200) {
					setAuthTokens(result.data);
					setLoggedIn(true);
				} else {
					setIsError(true);
				}
			})
			.catch((e) => {
				setIsError(true);
			});
	};

	if (isLoggedIn) {
		return <Redirect to={referer} />;
	}

	return (
		<Card>
			<Logo src={logoImg} />
			<Form onSubmit={postRegister}>
				<Input
					type="text"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					placeholder="Name"
				/>
				<Input
					type="email"
					value={email}
					onChange={(e) => {
						setUserName(e.target.value);
					}}
					placeholder="email"
				/>
				<Input
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					placeholder="password"
				/>
				<Button type="submit">Sign Up</Button>
			</Form>
			<Link to="/login">Already have an account?</Link>
			{isError && (
				<Error>The username or password provided were incorrect!</Error>
			)}
		</Card>
	);
}

export default Signup;
