import PayOS from "@payos/node";
import "dotenv/config";

const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY);

export default payOS;