import { NextApiHandler } from "next";

const PreviewCurrent: NextApiHandler = async (req, res) => {
	res.redirect(`https://api.apiflash.com/v1/urltoimage?access_key=${process.env.SCREENSHOT_API_KEY}&url=https://${req.headers.host}/show/current`)
}

export default PreviewCurrent;