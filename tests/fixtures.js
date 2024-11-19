const base = require("@playwright/test")
const { SingInPage } = require("./singInPage")

exports.test = base.test.extend({
    SingInPage: async ({page}, use) => {
        const singInPage = new SingInPage(page)
        // await singInPage.goto
        // await singInPage.addUsername
        // await singInPage.addPassword
        // await singInPage.clickLogin

        await use(singInPage)
    }
})
exports.expect = base.expect