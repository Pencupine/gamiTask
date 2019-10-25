import {ipcRenderer, ipcMain} from 'electron';

async function newTag(title) {
    // return new Promise(async(res, err) => {
    ipcRenderer.send('newTag', {
        title: title
    });
    // })
}

async function deleteTag(tagID){
    ipcRenderer.send('deleteTag',{
        tagID: tagID
    })
}

async function addTag(objID, tagID) {
    ipcRenderer.send('addTag', {
        objID: objID,
        tagID: tagID
    });
}

async function removeTag(objID, tagID) {
    ipcRenderer.send('removeTag', {
        objID: objID,
        tagID: tagID
    });
}

async function makeTagChild(parentTagID, childTagID){
    ipcRenderer.send('makeTagChild', {
        parentTagID: parentTagID,
        childTagID: childTagID
    })
}

async function changeParentTag(tagID, oldTagID, newTagID){
    ipcRenderer.send('changeParentTag', {
        tagID: tagID,
        oldTagID: oldTagID,
        newTagID: newTagID
    })
}

// Exports---------------------------------------------------------------------

exports.newTag = newTag;
exports.deleteTag = deleteTag;
exports.addTag = addTag;
exports.removeTag = removeTag;
exports.makeTagChild = makeTagChild;
exports.changeParentTag = changeParentTag;