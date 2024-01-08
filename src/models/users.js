
import pool from '../database.js'

export async function getUsername(username) {
    const { rows } = await pool.query("SELECT Username, Email, Pass, States, Balance, FullName, PhoneNumber, Birth + interval '7 hours' as Birth FROM useraccount WHERE username = $1", [username]);
    // console.log(rows);
    if (rows[0] == null)
        return null;
    return rows[0];
}

//get user email
export async function getUserEmail(email) {
    const { rows } = await pool.query('SELECT Email FROM useraccount WHERE Email = $1', [email]);
    // console.log(rows);
    if (rows.length == 0)
        return null;
    return rows[0].email;
}

//get user ownedbookID
export async function getUserOwnedBook(username) {
    const { rows } = await pool.query('SELECT OBook FROM ownedbook WHERE OUsername = $1', [username]);
    // console.log(rows);
    if (rows.length == 0)
        return null;
    return rows.map(row => row.obook);
}

//get user sellingbookID
export async function getUserSellingBook(username) {
    const { rows } = await pool.query('SELECT SBook FROM sellingbook WHERE SUsername = $1', [username]);
    // console.log(rows);
    if (rows.length == 0)
        return null;
    return rows.map(row => row.sbook);
}

export async function getUserBirth(username) {
    const { rows } = await pool.query("SELECT Birth + interval '7 hours' as Birth FROM useraccount WHERE Username = $1", [username]);
    // console.log(rows);
    if (rows.length == 0)
        return null;
    return rows[0].birth;
}

export const insertUserAccount = async (username, email, password) => {
    try {
        // Insert data into the useraccount table
        const text = 'INSERT INTO useraccount(username, email, pass, balance, states) VALUES ($1, $2, $3, $4, $5)';
        const values = [username, email, password, 0, 'true'];
        await pool.query(text, values);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send("Error creating user");
    }
}

export const updateProfile = async (username, email, fullname, phone, birth) => {
    try {
        const { rows } = await pool.query('SELECT * FROM useraccount WHERE username = $1', [username]);
        if (email == '')
            email = rows[0].email;
        if (fullname == '')
            fullname = rows[0].fullname;
        if (phone == '')
            phone = rows[0].phonenumber;
        if (birth == '')
            birth = rows[0].birth;
        const text = 'UPDATE useraccount SET email = $2, fullname = $3, phonenumber = $4, birth = $5 WHERE username = $1';
        const values = [username, email, fullname, phone, birth];
        await pool.query(text, values);
        console.log('Data updated successfully');
    } catch (error) {
        console.error('Error executing query', error);
    }
}

export const updateNewPassword = async (useremail, new_password) => {
    try {
        const text = 'UPDATE USERACCOUNT SET Pass = $1 WHERE Email = $2';
        const values = [new_password, useremail]
        await pool.query(text, values);
        console.log('New password was changed in database');
    } catch (error) {
        console.error('Error executing query', error);
    }
}

export async function addToCart(ShopUser, ShopSeller, ShopBook) {
    const check_owned = "SELECT * FROM OWNEDBOOK WHERE OUsername = $1 AND OBook = $2";
    const value_owned = [ShopUser, ShopBook];
    const { rows:owned } = await pool.query(check_owned, value_owned);
    if (owned.length == 0){
        const check_cart = "SELECT * FROM SHOPPING_CART WHERE ShopUser = $1 AND ShopSeller = $2 AND ShopBook = $3";
        const value = [ShopUser, ShopSeller, ShopBook];
        const { rows } = await pool.query(check_cart, value);
        if (rows.length == 0) {
            const text = "INSERT INTO SHOPPING_CART (ShopUser, ShopSeller, ShopBook) values ($1, $2, $3)";
            await pool.query(text, value);
            console.log('Added book to cart successfully');
            return "Added book to cart successfully";
        }
        else {
            console.log('Already added to cart');
            return "Already added to cart";
        }
    }
    else {
        console.log('User already owned this book. Not adding to cart');
        return "User already owned this book. Not adding to cart";
    }
}

export async function removeFromCart(ShopUser, ShopSeller, ShopBook) {
    const text = "DELETE FROM SHOPPING_CART WHERE ShopUser = $1 AND ShopSeller = $2 AND ShopBook = $3";
    const value = [ShopUser, ShopSeller, ShopBook];
    await pool.query(text, value);
    console.log('Book removed from cart successfully');
    return "Book removed from cart successfully";
}

export async function getTotalPrice(Username) {
    const { rows } = await pool.query({
        text: "CALL total_shopping_price ($1, $2)",
        values: [Username, null],
        type: "procedure"
    });
    return rows[0];
}