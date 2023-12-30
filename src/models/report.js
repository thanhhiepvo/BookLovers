import pool from '../database.js'

export async function getReportInfo(ID_Report) {
    const text = "SELECT * FROM REPORT WHERE ID_Report = $1"
    const value = [ID_Report];
    const { rows } = await pool.query(text, value);
    if (rows.length == 0)
        return null;
    return rows[0];
}

export async function createReport(RUsername, ReportedUser, RBook, Reason) {
    const check = "SELECT * FROM REPORT WHERE RUsername = $1 AND ReportedUser = $2 AND RBook = $3";
    const valuecheck = [RUsername, ReportedUser, RBook];
    const { rows } = await pool.query(check, valuecheck);
    if (rows.length == 0){
        const text = "INSERT INTO REPORT (RUsername, ReportedUser, RBook, Reason) values ($1, $2, $3, $4)";
        const value = [RUsername, ReportedUser, RBook, Reason];
        await pool.query(text, value);
        console.log('Reported successfully');
    }
    else console.log("Report already added on this user and book");
}

export async function delReport(RUsername, ReportedUser, RBook) {
    const text = "DELETE FROM REPORT WHERE RUsername = $1 AND ReportedUser = $2 AND RBook = $3";
    const value = [RUsername, ReportedUser, RBook];
    await pool.query(text, value);
    console.log('Report deleted successfully');
}

export async function getAllReportInfo() {
    const text = "SELECT * FROM REPORT"
    const { rows } = await pool.query(text);
    if (rows.length == 0)
        return null;
    return rows;
}