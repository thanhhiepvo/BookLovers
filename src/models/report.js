import pool from '../database.js'

export async function getReportInfo(ID_Report) {
    const text = "SELECT * FROM REPORT WHERE ID_Report = $1"
    const value = [ID_Report];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows[0];
}

export async function createReport(RUsername, ReportedUser, RBook) {
    const text = "INSERT INTO REPORT (RUsername, ReportedUser, RBook) values ($1, $2, $3)";
    const value = [RUsername, ReportedUser, RBook];
    await pool.query(text, value);
    console.log('Reported successfully');
}