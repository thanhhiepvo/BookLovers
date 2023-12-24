import { banUser } from "../models/admin.js";
import { delReport } from "../models/report.js";

const adminController = {};

adminController.banUser = async (req, res) => {
    console.log(req.query);
    let data = req.query;
    if (data.Choice == "ban") {
        await banUser(data.ReportedUser);
    }
    else if (data.Choice == "dismiss") {
        await delReport(data.RUsername, data.ReportedUser, data.RBook);
    }
    res.redirect('/admin');

}

export default adminController;