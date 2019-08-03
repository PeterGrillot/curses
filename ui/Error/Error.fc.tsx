import React from 'react';
import _ from 'lodash';

type Props = {
	error: any;
};

const Error = (props: Props) => {
	return <p>{_.get(props, 'error.message', "Somthin' goof'd")}</p>;
};

export default Error;
