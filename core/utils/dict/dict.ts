export const dictList2OptionList = (list: any[]) => {
    return list.map(value => {
        return {
            label: value.dictInfoValue,
            value: value.id,
        }
    })

}
