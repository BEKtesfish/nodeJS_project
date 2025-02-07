let notes =[
    {   id: 1,
        title:"First Note",
        timestamp:Date.now(),
        content:"The recipe above is listed in order by weight with the heaviest item listed first. Your ingredient list on your label will be in this same order. In addition to the ingredients being listed by weight, sub-ingredients must be listed in parenthesis beside the ingredient. Sub-ingredients are the ingredients of each ingredient. Sub-ingredients are listed so consumers can see if any of these items may cause them harm. For example, garlic is not a top allergen and will not be identified in an allergen statement, but some people are allergic or sensitive to garlic, which is a common ingredient and sub-ingredient."
    },
    {   id: 2,
        title:"Second Note",
        timestamp:Date.now(),
        content:"To find the sub-ingredients, look at the package of each ingredient used and read the ingredient list. All-purpose flour may have these sub-ingredients: enriched, unbleached wheat flour, malted barley flour, niacin, iron, thiamin mononitrate, riboflavin, and folic acid. Similarly, chocolate morsels may have these ingredients: sugar, chocolate, milk fat, cocoa butter, and soy lecithin. Some ingredients do not have any sub-ingredients. Salt typically does not have any sub-ingredients."
    }
]

export function getNotes(){
    return notes
}

export function getNote(id){
    return notes.find(note=>note.id===id)
}

export function addNote(note){
    const id= notes.at(-1).id + 1
    notes.push({
        ...note,
        id:id ,
        timestamp:Date.now()
    })
}
 export function removeNote(id){
    const index= notes.findIndex(u => u.id === id)
    if(index!==-1){
        notes.splice(index,1)
    } 
}