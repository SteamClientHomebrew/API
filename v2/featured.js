const { graphql } = require("./components/graphql_handler");
const { firebase } = require("../database/firebase.js")

function get_date(unix_time)
{
    const date = new Date(unix_time)

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}T${hours}:${minutes}:${seconds}Z`;
}

async function get_repositories(script)
{
    return new Promise(async (resolve, reject) => {
        fetch("https://api.github.com/graphql", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.BEARER
            },
            body: JSON.stringify({ query: script }),
        })
        .then((response) => response.json()).then(json => {
            resolve(json)
        })
    })
}

async function parse_docs(snap)
{
    return new Promise(async (resolve, reject) => {
        let handler = new graphql();
        const docs = [];

        snap.docs.forEach((doc) => {
            const data = doc.data();
            if (data.disabled ?? false == true) {
                return
            }

            handler.add_doc(data.github.owner, data.github.repo)

            docs.push({ 
                ...data, 
                id: doc.id, 
                create_time: get_date(doc._createTime._seconds * 1000) 
            });
        });

        const json = await get_repositories(handler.get())
        
        const tuples = Object.values(json.data).map(repository => repository)
        /* Filter out themes that don't have a skin.json */
        .filter(repository => repository.file && repository.file.text)
        .map(repo => ({skin_info: JSON.parse(repo?.file?.text ?? null), repo: repo})).map((data, i) =>
        ({
            header_image: data.skin_info?.header_image ?? "[NO-IMAGE]",
            splash_image: data.skin_info?.splash_image ?? "[NO-IMAGE]",
            tags: data.skin_info?.tags ?? [],

            download: `https://github.com/${docs[0].github.owner}/${docs[0].github.repo}/archive/refs/heads/${data?.repo?.defaultBranchRef?.name}.zip` ?? null,
            name: data.skin_info?.name ?? docs[i].github.repo,
            description: data.skin_info?.description ?? "No description. Check back later",
            version: data.skin_info?.version ?? "none",
            commit_data: data.repo.defaultBranchRef.target,
            data: docs[i] ?? null
        }))
        resolve(tuples)
    })
}

async function get_featured() 
{
    return new Promise(async (resolve, reject) => {
        try {
            let snap = await firebase.get()
            let result = await parse_docs(snap)
            resolve(result)
        }
        catch (error) {
            reject(error)
        }
    })
}

module.exports = { get_featured }