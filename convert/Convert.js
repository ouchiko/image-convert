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
        this.destination = "/app/webapp/static/assets/processed/" + this.idx + ".png";

        if (fs.existsSync(this.filepath)) {


            //fs.copy(this.filepath,'/app/webapp/static/assets/processed/test.eps' );
//convert -colorspace sRGB -density 600 "/images/$r" -background white -resize 650x -flatten -units pixelsperinch -density 224.993 "/output/png/$r-white.png"

            let options = [
                '-colorspace','sRGB','-density','600',
                this.filepath,
                '-resize','2050x','-background','transparent','-flatten','-units','pixelsperinch','-density','224.993',
              this.destination
            ];

          console.log(options);

            console.log(" - File is available.");
            console.log("  - From: " + this.filepath);
            console.log("  - To: " + this.destination)
            console.log("   - Converting..");
            im.convert(options,
                function(err, stdout){
                  if (err) {
                      console.log("Error: " + err.message);
                  } else {
                      console.log('Messages:', stdout);
                  }
                }
            );
            console.log("   - Finished");
        } else {
            console.log(" - File does not exist.");
        }



        return this.idx;
    }
}

module.exports = Convert;
