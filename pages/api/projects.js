import { getProjects } from "../../lib/database/queries";

export default async (req, res) => {
    let projects = getProjects(req.body.quantity);
    res.status(200).json(await projects);
};
