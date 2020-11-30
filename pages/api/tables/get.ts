import { GylohWebUntis } from "gyloh-webuntis-api";
import { NextApiHandler } from "next";
import { apiError, apiRawResponse, apiResponse, jsonEncodeTable, requireMethods, requireQueryArg, runMiddleware } from "../../../src/util/api_util";
import Cors from "cors";

const legalMethods = ["GET", "HEAD"];

const cors = Cors({
	methods: legalMethods
});

const handler: NextApiHandler = async (req, res) => {
	res.setHeader("Content-Type", "application/json");

	try {
		await runMiddleware(req, res, cors);
	} catch(e) {
		res.status(500).end(apiError("CORS process failed"));
	}

	if(!requireMethods(req, res, legalMethods)) return;
	const dateStr = requireQueryArg(req, res, "date");
	if(!dateStr) return;
	const date = new Date(dateStr);
	if(!date) return res.status(400).end(apiError("Argument 'date' is of invalid format"));

	const table = await GylohWebUntis.getTable(date);
	if(!table) return res.status(200).end(apiResponse(null));
	return res.status(200).end(apiRawResponse(jsonEncodeTable(table)));
}

export default handler;