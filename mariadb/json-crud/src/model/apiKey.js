import crypto from 'node:crypto';
export const apiKey ={}

const theApiKeys = [
    {
        description: 'Master key with unlimited usage',
        key: crypto.createHash('md5').update('moped').digest('hex'),
        rate:null,
        usage:0
    },
    {
        description: 'Key with daily usage limit of 5 requests',
        key: crypto.createHash('md5').update('mummin').digest('hex'),
        rate:5,
        usage:0
    }

]

apiKey.get =()=>{
    return theApiKeys
}

apiKey.verifyKey = (apiKey)=>{
    for (const obj of theApiKeys){
        if(obj.key === apiKey){
            return true
        }
    }
    return false
    
}

apiKey.verifyRate = (akey)=>{
    for (const obj of theApiKeys){
        if(obj.key === apiKey){
            obj.usage++
            if(obj.rate && obj.usage > obj.rate){
                return false;
            }
            return true;
        }
    }
    return false;
}