/**
 * Image Converter
 * Copyright (C) 2017 - James Holden (ouchiko)
 * Node based image conversion service.
 * Specifically created for conversion of EPS/SVG to PNG
 * ouchiko@gmail.com
 */
/* Requirements */
var express = require('express')
var jade = require("jade")
var fs = require("fs")
var app = express()
var formidable = require('formidable');

/* Definitions */
const host = "0.0.0.0";
const port = 5000;
const views = __dirname + '/webapp/views';
const static = __dirname + '/webapp/static';
const processed = __dirname + '/webapp/static/assets/processed'

try {
    /* Define the view elements */
    app.set('views', views)
    app.set('view engine', 'jade')

    /**
     * /
     * Renders the upload homepage
     */
    app.get('/', (req, res) => {
        console.log("Request obtained");
        res.render('index')
    })

    /**
     * /images/12345/render
     * Renders an image to the user.
     */
    app.get('/error/:type', (req, res) => {
        res.render('error_page', {error_code: req.params.type});
    });

    /**
     * /images/12345/render
     * Renders an image to the user.
     */
    app.get('/images/:id/render', (req, res) => {
        res.render('render_image', {imageid: req.params.id});
    });

    /**
     * /images/12345/isloaded
     * Is the image ready to be loaded
     */
    app.get('/images/:id/isloaded', (req, res) => {
        let result = {'found':'no'};
        if (fs.existsSync(processed+"/"+req.params.id+"-black.png")) {
            result.found = 'yes';
        }
        res.send(result)
    });

    /**
     * /convert (post)
     * The conversion sericce.
     */
    app.post("/convert", (req,res) => {

        let imageurl = "#";
        let oldpath = "";

        console.log("= Conversion Request =");

        Convert = require("./convert/Convert.js");
        try {
            var form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.parse(req, function (err, fields, files) {
                console.log(" - Form parsing");
                if (files && files.convertfile) {
                    oldpath = files.convertfile.path;
                    console.log(" - File found in form object: " + oldpath);
                } else {
                    console.log(" - No file found in form object");
                    return false;
                }

                if (oldpath && fs.existsSync(oldpath)) {
                    console.log(" - Upload exists.");
                    console.log(" - RealName: " + files.convertfile.name);
                    let testConvert = new Convert(oldpath, files.convertfile.name);
                    imageurl = testConvert.convertFileToPNG(1000,false);
                    if (imageurl) {
                        console.log("- Conversion returned: " + imageurl);
                        res.redirect('/images/'+imageurl+"/render");
                    } else {
                        res.redirect('/error/invalid_converion');
                    }
                } else {
                    res.render('/error/unknown_file');
                }
            });
        } catch (exception) {
            console.log(" - Error: " + exception.message);
            res.render('/error/process_error');
        }

    });

    /**
     * Static Assets Setup
     */
    app.use(express.static(static))

    /**
     * Application init
     */
    console.log(`Starting application: Port:${port} Host:${host}`)
    app.listen(port, host, () => {
        console.log(`Listening on ${host}:${port}`);
    });

} catch (applicationException) {
    console.log("Exception: " + applicationException.message);
}
