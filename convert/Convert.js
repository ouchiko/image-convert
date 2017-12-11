var im = require('imagemagick');
var fs = require('fs');
var md5 = require('md5');
var path = require('path')

class Convert
{
    constructor(filepath, upload_filename)
    {
        this.filepath = filepath;
        this.upload_filename = upload_filename;
    }

    /**
     * Is this file valid and part of our correct system
     */
    isValidFile()
    {
        let extensions = {
            "EPS": true,
            "SVG": true,
            "JPG": true,
            "PDF": true
        };
        let extension = path.extname(this.filepath).replace(".", "");
        console.log("  - File Extension: " + extension);
        if (fs.existsSync(this.filepath) && extensions[extension.toUpperCase()]) {
            return true;
        } else {
            console.log("  - Invalid file extension");
            return false;
        }
    }

    getEPStoPNG(width=false, height=false)
    {
        if (this.isValidFile()) {
            console.log("  - Filepath: " + this.filepath);
            this.idx = md5(this.upload_filename);
            this.destination = "/app/webapp/static/assets/processed/" + this.idx;

            if (fs.existsSync(this.filepath)) {
                let options = {
                    'trans': ['-colorspace','sRGB','-density','600', this.filepath, '-resize',
                    '2000x','-background','transparent','-flatten','-units',
                    'pixelsperinch','-density','224.993',this.destination + "-trans.png"
                    ],
                    'white': [
                    '-colorspace','sRGB','-density','600', this.filepath, '-resize',
                    '2000x','-background','white','-flatten','-units',
                    'pixelsperinch','-density','224.993',this.destination + "-white.png"
                    ],
                    'black': [
                    '-colorspace','sRGB','-density','600', this.filepath, '-resize',
                    '2000x','-background','black','-flatten','-units',
                    'pixelsperinch','-density','224.993',this.destination + "-black.png"
                    ]
                }
                console.log("  - Generating images");
                for (var i in options) {
                    im.convert(options[i],
                        function(err, stdout){
                          if (err) {
                              console.log("  - Error: " + err.message);
                              return false;
                          } else {
                              console.log('  - Messages:', stdout);
                          }
                        }
                    );
                }
                console.log("  - Finished");
                return this.idx;
            } else {
                console.log("  - File does not exist.");
                return false;
            }
        } else {
            console.log("  - Invalid file test");
            return false;
        }
    }
}

module.exports = Convert;
