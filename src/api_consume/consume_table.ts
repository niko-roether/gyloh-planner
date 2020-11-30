import { TimeTable } from "gyloh-webuntis-api";
import { SERVER } from "../config";

const API_BASE = SERVER + "/api/tables"

function parseTable(data: any): TimeTable {
	return new TimeTable({
		...data,
		date: new Date(data.date),
	});
}

async function getCurrentTables(num: number): Promise<TimeTable[] | null> {
	const res = await fetch(API_BASE + `/current?num=${num}`).then(res => {
		if(res.status != 200) return null;
		return res.json()
	});
	if(res.error) throw new Error(res.error);
	const data = res.data;
	if(data == null) return null;
	return data.map((d: any) => parseTable(d));
}

export {
	getCurrentTables
}