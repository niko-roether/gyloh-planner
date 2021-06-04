import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import SubstitutionView from "../components/substitution_view";
import { TimeTableEntryFields } from "../components/time_table_view";

export interface TimeTableEntryFieldsForClass {
	class: string,
	fields: TimeTableEntryFields[]
}

export interface TimeTableViewEntryProps {
	fieldsForClass: TimeTableEntryFieldsForClass;
}

function infoMessageCombine(info: string, message: string) {
	if(info !== "" && message !== "") return `${info}; ${message}`;
	if(info !== "") return info;
	return message;
}

function tableToEntryFields(table: TimeTable) {
	const entryFields: TimeTableEntryFieldsForClass[] = [];

	table.affectedClasses.forEach(
		affectedClass => {
			entryFields.push({
				class: affectedClass.longName,
				fields: table.entries
					.filter(entry => entry.classes.some(cls => cls.shortName === affectedClass.shortName))
					.map((entry, i) => ({
						lesson: entry.lesson,
						subject: entry.subject.longName,
						teacher: <SubstitutionView value={entry.teacher} current={c => c} subst={p => p} key={i} />,
						room: (
							<span>
								{entry.rooms.map((room, i) => (
									<React.Fragment key={i}>
										<SubstitutionView value={room} current={c => c?.longName} subst={s => s?.longName} />
										{i !== entry.rooms.length - 1 && <span>, </span>}
									</React.Fragment>
								))}
							</span>
						),
						info: infoMessageCombine(entry.info, entry.message)
					}))
			});
		}
	);

	entryFields.sort((a, b) => a.class.localeCompare(b.class, "de-DE", {numeric: true}));

	return entryFields;
}

export {
	tableToEntryFields
}