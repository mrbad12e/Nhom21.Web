const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.JSON_FILE,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

async function createOrGetFolder(folderName, parentId) {
    f;
    const query = parentId
        ? `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents`
        : `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`;

    const response = await drive.files.list({
        q: query,
        fields: 'files(id, name)',
    });

    if (response.data.files.length > 0) {
        return response.data.files[0].id;
    }

    const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        ...(parentId && { parents: [parentId] }),
    };

    const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id',
    });

    return folder.data.id;
}

async function createNestedFolders(path, baseId) {
    const folders = path.split('/').filter(Boolean);
    let currentParentId = baseId;

    for (const folder of folders) {
        currentParentId = await createOrGetFolder(folder, currentParentId);
    }

    return currentParentId;
}


