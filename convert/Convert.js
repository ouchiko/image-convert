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
        this.idx = md5(this.upload_filename);
        this.destination = "../webapp/static/assets/processed/" + this.idx;
        this.options = {
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
        };
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
        return (fs.existsSync(this.filepath) &&
                extensions[extension.toUpperCase()]) ? true : false;
    }

    /**
     * Make conversion from acceptable format file to PNG
     */
    convertFileToPNG()
    {
        if (!this.isValidFile()) {
            return false;
        }

        for (var i in this.options) {
            if (this.options.hasOwnProperty(this.options[i])) {
                im.convert(
                    this.options[i],
                    function(err, stdout){
                        if (err) {
                            return false;
                        }
                    }
                );
            }
        }
        return this.idx;
    }
}

module.exports = Convert;
