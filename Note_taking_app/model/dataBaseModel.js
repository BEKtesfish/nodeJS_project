import {pool} from './dataBase.js';

/*let notes =[
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
*/

export async function getNotes(searchTerm){
    let notes;
    if(!searchTerm){
        [notes] = await pool.query("select * from note")
        return notes
    } else{
        [notes] = await pool.query(
            `SELECT * FROM note WHERE title LIKE ? OR contents LIKE ?`,
            [`%${searchTerm}%`, `%${searchTerm}%`]
        )
        return notes
  
    } 
    
}

export async function getNote(id){
    const  [[note]]= await pool.query("SELECT * FROM note WHERE id = ?",
        [`${id}`]
    )
    console.log(note)
    return note
}

export async function addNote(note){
    await pool.query("Insert INTO note (title,contents) VALUES (?,?)",
        [`${note.title}`,`${note.content}`])

}
export async function  removeNote(id){
   await pool.query("DELETE FROM note WHERE id =?",
    [`${id}`]
   )
   
}