class graphql
{
    doc_count = 0
    script_body = ''

    add_doc(owner, name) {
        this.script_body += `
        _${this.doc_count++}: repository(owner: "${owner}", name: "${name}") {
            name
            defaultBranchRef {
                name
                target {
                    ... on Commit { oid commitUrl committedDate }
                }
            }
            file: object(expression: "HEAD:skin.json") {
                ... on Blob { text }
            }
            zipballUrl: defaultBranchRef {
                target { ... on Commit { zipballUrl } }
            }
        }`
    }

    get() {
        return `query { ${this.script_body} }`
    }
}

module.exports = { graphql }