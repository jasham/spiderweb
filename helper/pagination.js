exports.getpagiantionData = async function pagination(modal, query) {
    try {
        let skipRecords = query.pageSize * (query.currentPage - 1)
        var finalRecord = await getExecute(modal, query, skipRecords)
        return finalRecord

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

async function getExecute(modal, query, skipRecords) {
    try {
        var newQuery = { deleted: false }
        var sortBy = { id: -1 }
        if (query.parameters.length>0 && query.parameters !== null) {
            for (let i = 0; i < query.parameters.length; i++) {
                switch (query.parameters[i].name.toUpperCase()) {
                    case "TO":
                        newQuery = { deleted: false, to: { $regex: '.*' + query.parameters[i].value + '.*', $options: 'i' } }
                        sortBy = { rct: -1 }
                        break
                    case "NAME":
                        newQuery = { name: { $regex: '.*' + query.parameters[i].value + '.*', $options: 'i' } }
                        sortBy = { id: -1 }
                        break
                    default:
                        break
                }

            }
        }
        const pageWiseData = await modal.find(newQuery, { __v: 0 }, { skip: skipRecords, limit: query.pageSize }).sort(sortBy)
        const totalRecords = await modal.countDocuments(newQuery)
        return { status: true, record: { data: pageWiseData, totalRecords,  currentPage: query.currentPage } }
    } catch (error) {
        ///return error
        return { status: false, error: error.toString() }
    }

}