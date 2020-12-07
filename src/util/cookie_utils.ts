import React from "react";

const COOKIE_INDEFINITE = 378691200000;

function setCookie(name: string, value: string, duration: number, path: string = location?.pathname || "/"): void {
	if(!document) return;
	document.cookie = `${name}=${value}; expires=${new Date(Date.now() + duration)}; path=${path}; SameSite=Strict`
}

function getCookie(name: string): string | null {
	if(!document) return null;
	const regex = new RegExp(`${name}+=([a-zA-Z0-9_\\- ]+)(?=;|$)`);
	const res = regex.exec(document.cookie);
	return res ? res[1] : "";
}

function useCookie(name: string): string | null {
	const [value, setValue] = React.useState<string | null>(null);

	React.useEffect(() => {
		setValue(getCookie(name));
	})

	return value;
}

export {
	setCookie,
	getCookie,
	useCookie,
	COOKIE_INDEFINITE
}