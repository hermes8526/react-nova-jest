import axios from "axios";

const config =
{
	validateStatus: (status) => status < 500,
};

if (process.env.REACT_APP_EXODUS_ENDPOINT)
{
	config.baseURL = process.env.REACT_APP_EXODUS_ENDPOINT;
}

export default axios.create(config);
