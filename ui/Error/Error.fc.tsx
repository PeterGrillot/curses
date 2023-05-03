import React from "react";

type Props = {
	error: string | null;
};

const Error = ({ error }: Props) => {
	return <p>{error ?? "Seeett"}</p>;
};

export default Error;
