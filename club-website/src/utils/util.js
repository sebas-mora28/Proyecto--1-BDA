export const addStatusAttr = (list) => {
    return list.map(e => {
        return {...e, status: 'available'}
    })
}