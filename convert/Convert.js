var im = require('imagemagick');
var fs = require('fs');
var md5 = require('md5');

class Convert
{
    constructor(filepath, upload_filename)
    {
        this.filepath = filepath;
        this.upload_filename = upload_filename;
    }

    getPNGtoJPG()
    {

    }

    getEPStoPNG(width=false, height=false)
    {
        console.log("Filepath: " + this.filepath);
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
            for (var i in options) {
                im.convert(options[i],
                    function(err, stdout){
                      if (err) {
                          console.log("Error: " + err.message);
                      } else {
                          console.log('Messages:', stdout);
                      }
                    }
                );
            }
            console.log("   - Finished");
        } else {
            console.log(" - File does not exist.");
        }
        return this.idx;
    }
}

module.exports = Convert;
