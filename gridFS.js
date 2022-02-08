var assert = require('assert');
var fs = require('fs');
var mongodb = require('mongodb');
var mongoose = require("mongoose");
var uri = 'mongodb://localhost:27017';
async function streamToString(stream) {
    // lets have a ReadableStream as a stream variable
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf-8");
}
mongodb.MongoClient.connect(uri, function(error, client) {
    var db = client.db('Test_IT_DB');
    assert.ifError(error);

    var bucket = new mongodb.GridFSBucket(db, {
        chunkSizeBytes: 1024,
        // bucketName: 'files'
    });
    const result = streamToString(bucket.openDownloadStream('N059F4.00_01_WS1_2')).then(function(data){
        console.log(data);
    });
    // let result = '';
    // let downloadStream = bucket.openDownloadStream('N059F4.00_01_WS1_2');
    // downloadStream.on('data', (chunk) => {
    //     result += chunk;
    // });
    // downloadStream.on('end', function () {
    //     // do something with "result"
    //     console.log(result);
    // });
    
    // .pipe(fs.createWriteStream('./output.txt'))
    // .on('error', function(error) {
    //     assert.ifError(error);
    // })
    // .on('finish', function() {
    //   console.log('done!');
    //   process.exit(0);
    // });
//   fs.createReadStream('./meistersinger.mp3').
//     pipe(bucket.openUploadStream('meistersinger.mp3')).
//     on('error', function(error) {
//       assert.ifError(error);
//     }).
//     on('finish', function() {
//       console.log('done!');
//       process.exit(0);
//     });
});
