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
     * @param <string> id
     */
    app.get('/images/:id/render', (req, res) => {
        res.render('render_image', {imageid: req.params.id});
    });

    /**
     * /images/12345/isloaded
     * Is the image ready to be loaded
     * @param <string> id
     */
    app.get('/images/:id/isloaded', (req, res) => {
        let result = {'found':'no'};
        if (fs.existsSync("./webapp/static/assets/processed/"+req.params.id+"-black.png")) {
            result.found = 'yes';
        }
        res.send(result)
    });

    /**
     * /convert (post)
     * The conversion sericce.
     * @param <file> convertfile
     */
    app.post("/convert", (req,res) => {

        let imageurl = "#";
        let oldpath = "";

        Convert = require("./convert/Convert.js");
        try {
            var form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.parse(req, function (err, fields, files) {
                //console.dir(files);
                if (files && files.convertfile) {
                    oldpath = files.convertfile.path;
                    console.dir(files.convertfile);
                } else {
                    console.log("Files is empty...");
                }

                if (oldpath && fs.existsSync(oldpath)) {
                    console.log("Processing request for image conversion");
                    console.log("RealName: " + files.convertfile.name);
                    let testConvert = new Convert(oldpath, files.convertfile.name);
                    imageurl = testConvert.getEPStoPNG(1000,false);
                    console.log("Got responise with: " + imageurl);

                    //res.render('convert', {url: imageurl});
                    res.redirect('/images/'+imageurl+"/render");
                } else {
                    res.render('/error');
                }
            });
        } catch (exception) {
            console.log(" - Error: " + exception.message);
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
