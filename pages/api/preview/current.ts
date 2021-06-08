// import { NextApiHandler } from "next";
// import { screenshot } from "../../../src/util/screenshot";

// const PreviewCurrent: NextApiHandler = async (req, res) => {
// 	res.setHeader("Content-Type", "image/png");
// 	const data = screenshot(process.env.HOSTNAME + "/show/current");
// 	data.once("close", () => console.log(data));
// }

// export default PreviewCurrent;