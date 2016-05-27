var fs = require('fs');
var fstream = require('fstream')
var tar = require('tar');
var zlib = require('zlib');
var gzip = zlib.createGzip();
//var deflate = zlib.createDeflate();

var dirSrcName = process.argv[2] || __dirname;
var dirDestName = process.argv[3] || './dir.tar.gz'
var dirDestStream = fs.createWriteStream(dirDestName);

var onError = (err) => console.error('An error occurred:', err);
var packer = tar.Pack({noProprietary: true})
		.on('error', onError)
		.on('end', () => console.timeEnd('Packed')
)

console.time('Packed')
fstream.Reader({path: dirSrcName, type: "Directory"})
	.on('error', onError)
	.pipe(packer)
	.pipe(gzip)  // Remove this line if you want to get rid of gzip processing
	.pipe(dirDestStream)