/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: ["en", "ch"],
    sourceLocale: "ch",
    catalogs: [{
        path: "src/locales/{locale}/messages",
        include: ["src"]
    }],
    format: "po"
}