function setCookie(name: string, value: string, duration: number, path: string = location?.pathname || "/",) {
	if(!document) throw Error("this function may only be executed on the client");
	document.cookie = `${name}=${value}; expires=${new Date(Date.now() + duration)}; path=${path}; SameSite=Strict`
}

function getCookie(name: string): string | null {
	if(!document) throw Error("this function may only be executed on the client");
	const regex = new RegExp(`${name}=(.+)(?:$|;)`);
	const res = regex.exec(document.cookie);
	return res ? res[1] : null;
}

export {
	setCookie,
	getCookie
}