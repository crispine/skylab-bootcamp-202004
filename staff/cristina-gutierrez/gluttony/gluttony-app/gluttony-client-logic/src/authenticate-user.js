const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")
const context = require("./context")

/**
 * @param  {string} email
 * @param  {string} password
 * @returns Promise
 */
module.exports = async function(email, password) {
    Email.validate(email)
    String.validate.notVoid(password)

    return await this.httpClient.get(`${API_URL}/users/auth`, {
            params: {
                email,
                password
            }
        })
        .then(async ({ status, data }) => {
            if (status === 200) {
                try {
                    await this.storage.setItem(
                        "token",
                        data.token
                    );

                    return data.token
                } catch (error) {
                    throw new Error("Error saving data")
                }
            } else {
                throw new Error(data.error)
            }
        })
        .catch(error => error)
}.bind(context)