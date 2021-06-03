import { TimeTable } from "gyloh-webuntis-api";
import { SERVER } from "../config";

const API_BASE = SERVER + "/api/tables"

function parseTable(data: any): TimeTable {
	return new TimeTable({
		...data,
		date: new Date(data.date),
	});
}

function handleResponse<T>(res: any): T {
	if(!res) throw new Error("A communication error occured");
	if(res.error) throw new Error(`Request failed: ${res.error}`);
	if(!res.data) throw new Error("Keine Tabelle für diesen Tag gefunden.");
	return res.data as T;
}

async function getCurrentTables(num: number): Promise<TimeTable[] | null> {
	const res = await fetch(API_BASE + `/current?num=${num}`).then(res => res.json());
	const data = handleResponse<any[]>(res);
	return data.map((d: any) => parseTable(d));
}

async function getTable(date: Date | string | number) {
	if(!(date instanceof Date)) date = new Date(date);
	const res = await fetch(API_BASE + `/get?date=${date.getTime()}`).then(res => res.json());
	return parseTable(handleResponse(res));
}

export {
	getCurrentTables,
	getTable
}