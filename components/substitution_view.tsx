import { Substitution } from "gyloh-webuntis-api";
import React from "react";

export interface SubstitutionViewProps<T> {
	value: T | Substitution<T>;
	children: (current?: T, subst?: T) => React.ReactElement;
}

function isSubstitution<T>(val: any): val is Substitution<T> {
	return typeof val === "object" && "current" in val &&  "subst" in val;
}

function SubstitutionView<T>({ value, children }: SubstitutionViewProps<T>): React.ReactElement {
	if(isSubstitution(value)) return children(value.current || undefined, value.subst || undefined);
	return children(value);
}

export default SubstitutionView;