import { createReport, getAllReportInfo } from "../models/report.js";

const reportController = {};

reportController.getAllReportInfo = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reportlist = await getAllReportInfo() ?? [];
            resolve(reportlist);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

reportController.createReport = async (req, res) => {
    console.log(req.body);
    let { RUsername, ReportedUser, RBook, Reason } = req.body;
    await createReport(RUsername, ReportedUser, RBook, Reason);
    res.redirect("book/" + RBook);
}

export default reportController;