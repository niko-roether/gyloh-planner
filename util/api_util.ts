import Cors from "cors";
import { TimeTable } from "gyloh-webuntis-api";
import { NextApiRequest, NextApiResponse } from "next";

function apiResponse(data: any) {
	return JSON.stringify({data})
}

function apiError(error: any) {
	return JSON.stringify({error})
}

export type Middleware<R> = (req: any, res: any, callback: (result: R) => void) => void;

async function runMiddleware<R>(req: NextApiRequest, res: NextApiResponse, middleware: Middleware<R>): Promise<R> {
	return new Promise<R>((resv, rej) => {
		middleware(req, res, (result) => {
			if(result instanceof Error) rej(result);
			resv(result);
		})
	})
}

function requireMethods(req: NextApiRequest, res: NextApiResponse, methods: string[]): boolean {
	if(!req.method || !methods.includes(req.method)) {
		res.status(405).end(apiError("Invalid method"));
		return false;
	}
	return true;
}

function requireQueryArg(req: NextApiRequest, res: NextApiResponse, arg: string, allowArray = false): string | null {
	let val = req.query[arg];
	if(!val) {
		res.status(400).end(apiError(`Must provide query argument '${arg}'`));
		return null;
	}
	if(!allowArray && (typeof val !== "string" && val.length > 1)) {
		res.status(400).end(apiError(`Must not provide more than one value for argument '${arg}'`));
		return null;
	}
	if(typeof val !== "string") val = val[0];
	return val;

}

function jsonEncodeTable(table: TimeTable) {
	return JSON.stringify({
		...table,
		date: table.date.toISOString().split("T")[0],
	})
}

function apiRawResponse(res: string) {
	return `{"data":${res}}`;
}


export {
	apiResponse,
	apiError,
	runMiddleware,
	requireMethods,
	requireQueryArg,
	apiRawResponse,
	jsonEncodeTable
}