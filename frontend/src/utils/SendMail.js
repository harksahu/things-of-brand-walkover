import axios from "axios";
// get send to user
const sendMail = async (email, name, companyName) => {
    const data = {
        "to": [
            {
                "name": "thingsofbrand",
                "email": email
            }
        ],
        "from": {
            "name": "Thingsofbrand",
            "email": "test@yhvyxu.mailer91.com"
        },

        "domain": "yhvyxu.mailer91.com",
        "mail_type_id": "1",

        "template_id": "thingsofbrand",
        "variables": {
            "name": name,
            "companyName": companyName
        }
    }
    console.log("sendMail");
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "authkey": "388885AW8zZqZsVF63ca6711P1"
    }
  console.log(email, name, companyName);
    axios.post("https://api.msg91.com/api/v5/email/send", data, {  headers })
  }

export default sendMail;