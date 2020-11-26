import { NextApiHandler } from "next";
import { GylohWebUntis } from "gyloh-webuntis-api";

const handler: NextApiHandler = async (req, res) => {
	const end = (code: number) => {
		res.statusCode = code;
		res.end();
	}
	if(req.method !== "GET") return end(405);
	const numStr = req.query["num"];
	if(!numStr || typeof numStr !== "string") return end(400);
	const num = Number.parseInt(numStr);
	if(num === NaN) return end(400);

	const plans = await GylohWebUntis.getCurrentTables(num);
	
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify(plans));
}

export default handler;