import { NextApiHandler } from "next";
import { GylohWebUntis } from "gyloh-webuntis-api";
import { apiError, apiRawResponse, jsonEncodeTable, requireMethods, requireQueryArg, runMiddleware } from "../../../src/util/api_util";
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
	const numStr = requireQueryArg(req, res, "num");
	if(!numStr) return;
	const num = Number.parseInt(numStr);
	if(num === NaN) return res.status(400).end(apiError("Argument 'num' must be a number"));

	const tables = await GylohWebUntis.getCurrentTables(num);
	res.status(200).end(apiRawResponse(`[${tables.map(table => table ? jsonEncodeTable(table) : "null").join(",")}]`));
}

export default handler;