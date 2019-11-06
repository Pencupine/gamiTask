var allTags = [];
var allUnstructuredTags = [];

var findTag = (tagID) => {
    // return new Promise(async (resolve, reject) => {
        var tagIndex = -1;
        var tagObject = allTags.find((tag) => {
            tagIndex ++;
            if(tag.tagID == tagID) return tag;
        })
        // resolve ({
        return ({
            tagObject: tagObject,
            tagIndex: tagIndex
        });
    // });
}

var createTagStructure = (tagID) => {
    // return new Promise(async (resolve, reject) => {

        var foundObj =  findTag(tagID);
    
        var tagObject = foundObj.tagObject;
    
        var i;
        var childBranches  = [];
        console.log(tagObject);
        for(i = 0 ; i < tagObject.subTags.length; i++){
            childBranches.push( createTagStructure(tagObject.subTags[i]));
            removeFromUnstructuredTags(foundObj.tagIndex);
        }
    
        tagObject.subTags = childBranches;
    
        // resolve (tagObject);
        return (tagObject);
    // });
}

var removeFromUnstructuredTags =  (tagIndex) => {
    allUnstructuredTags.splice(tagIndex, 1);
}

var setAllTags =  (tagsArray) => {
    allTags = tagsArray.slice();
    allUnstructuredTags = tagsArray.slice();
    return;
}

// var setPremiumTags =  (tagStructure, premiumTags) => {
//     var i;
//     var foundPremiumTag;
//     for(i = 0; i < premiumTags.length; i++){
//         foundPremiumTag =  findTag(premiumTags[i]);
//         tagStructure.columns.push(foundPremiumTag.tagObject);
//          removeFromUnstructuredTags(tagIndex);
//     }
// }

var getTagsStructure =  (allTags, premiumTags) => {
    // return new Promise( async (resolve, reject) => {

        setAllTags(allTags);
    
        var columns = [];
    
        var i;
        for(i = 0; i<premiumTags.length; i++) {
            columns.push( createTagStructure(premiumTags[i]));
        }
    
        console.log('get Tags');
    
        console.log(columns);
        // resolve (columns);
        return(columns);
    // });
}

module.exports = getTagsStructure;