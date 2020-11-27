import { TimeTable } from "gyloh-webuntis-api";
import { server } from "../config";

const API_BASE = server + "/api/tables"

function parseTable(data: any): TimeTable {
	return new TimeTable({
		date: new Date(data.date),
		lastUpdate: data.lastUpdate,
		affectedClasses: data.affectedClasses,
		messages: data.messages,
		entries: data.entries
	});
}

async function getCurrentTables(num: number): Promise<TimeTable[]> {
	const data = await fetch(API_BASE + `/current?num=${num}`).then(res => res.json());
	return data.map((d: any) => parseTable(d));
}

export {
	getCurrentTables
}