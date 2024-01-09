import PayOS from "@payous/node";
import "dotenv/config";

const PayOS = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY);

export default PayOS;