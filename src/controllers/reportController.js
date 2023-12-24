import { getAllReportInfo } from "../models/report.js";

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

export default reportController;