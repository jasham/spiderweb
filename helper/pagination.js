exports.getpagiantionData = async function pagination(modalsArray, query) {
    try {
        let skipRecords = query.pageSize * (query.currentPage - 1)
        var finalRecord = await getExecute(modalsArray, query, skipRecords)
        return finalRecord

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

async function getExecute(modalsArray, query, skipRecords) {
    try {
        var newQuery = { deleted: false }
        var sortBy = { id: -1 }
        let finalArray = []
        var pageWiseData, totalRecords
        if (query.parameters.length > 0 && query.parameters !== null) {
            for (let i = 0; i < query.parameters.length; i++) {
                switch (query.parameters[i].key.toUpperCase()) {
                    case "CATEGORY":
                        let cat
                        let qry = { deleted: false, category: { $regex: '.*' + query.parameters[i].value + '.*', $options: 'i' } }
                        cat = await modalsArray[0].find(qry, { __v: 0 }, { skip: skipRecords, limit: query.pageSize }).sort(sortBy)
                        totalRecords = await modalsArray[0].countDocuments(qry)
                        if (cat.length > 0) {

                            for (let i = 0; i < cat.length; i++) {
                                let obj = { ...cat[i].toObject() }
                                obj.sub_category_count = await modalsArray[1].countDocuments({ category_id: cat[i]._id, deleted: false })
                                finalArray.push(obj)
                            }
                        }
                        pageWiseData = finalArray
                        break
                    case "SUBCATEGORY":
                        let subCat
                         qry = { deleted: false, sub_category: { $regex: '.*' + query.parameters[i].value + '.*', $options: 'i' } }
                        subCat = await modalsArray[0].find(qry, { __v: 0 }, { skip: skipRecords, limit: query.pageSize }).sort(sortBy)//modalsArray[0]=con.sub_category
                        totalRecords = await modalsArray[0].countDocuments(qry)
                        if (subCat.length > 0) {

                            for (let i = 0; i < subCat.length; i++) {
                                let obj = { ...subCat[i].toObject() }
                                obj.sub_category_count = await modalsArray[1].countDocuments({ sub_category_id: subCat[i]._id, deleted: false })//modalsArray[1]=con.service                               
                                finalArray.push(obj)
                            }
                        }
                        pageWiseData = finalArray
                        break
                    default:
                        break
                }

            }
        }
        //const pageWiseData = await modal.find(newQuery, { __v: 0 }, { skip: skipRecords, limit: query.pageSize }).sort(sortBy)
        //const totalRecords = await modal.countDocuments(newQuery)
        return { status: true, record: { data: pageWiseData, totalRecords, currentPage: query.currentPage } }
    } catch (error) {
        ///return error
        return { status: false, error: error.toString() }
    }

}