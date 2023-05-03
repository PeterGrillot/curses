import React from "react";
import _ from "@curses/lodash";

type Props = {
	error: string | null;
};

const Error = ({ error }: Props) => {
	return <p>{error ?? "Seeett"}</p>;
};

export default Error;
