async function check_updates(req)
{
    const query = {
        i: 0,
        val: '',
        add: (owner, name) => {
            query.val += `
            _${query.i++}: repository(owner: "${owner}", name: "${name}") {
                name
                default_branch: defaultBranchRef { name }
                defaultBranchRef {
                    name target { ... on Commit { oid commitUrl committedDate history(first: 1) { edges { node { message } } } } }
                }
            }`
        },
        get: () => {
            return `query { ${query.val} }`
        }
    } 

    req.body.forEach(item => query.add(item.owner, item.repo))

    return new Promise(async (resolve, reject) => {
        const json = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: gh_bearer
            },
            body: JSON.stringify({ query: query.get()  })
        })

        const tuples = Object.values(json.data)
            .map(repository => repository)
            .map((repository, i) => ({
                download: `https://codeload.github.com/${req?.body[i]?.owner}/${req?.body[i]?.repo}/zip/refs/heads/${repository?.default_branch?.name}`,
                name: repository?.name ?? null, 
                commit: repository?.defaultBranchRef?.target?.oid ?? null,
                url: repository?.defaultBranchRef?.target?.commitUrl ?? null,
                date: repository?.defaultBranchRef?.target?.committedDate ?? null,
                message: repository?.defaultBranchRef?.target?.history?.edges[0]?.node.message ?? null
            }));
        
        resolve(tuples)
    });
}

module.exports = { check_updates }