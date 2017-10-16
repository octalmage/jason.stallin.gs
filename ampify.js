const recursive = require('recursive-readdir');
const fs = require('fs');
const ampify = require('ampifyjs');
const mkdirp = require('mkdirp');

const GA_TRACKING_ID = 'UA-57460911-1';

//  The director that we will be creating an amp verion of.
//  Creating an amp version ultimately means creating an 'amp'
//  directory in that with amp versions of each file from the source.
const inputDir = 'public/';

// This is where we will populate the last of files to convert
const filesToConvert = [];

// Get a list of all the files in the public directory. But ignore the amp dir
recursive(inputDir, [], (err, files) => {
  // Files is an array of file paths. Lets just get the html files
  files.forEach((file) => {
    // Only select files that end in '.html'.
    if (file.endsWith('.html') && !file.includes('/amp')) {
      filesToConvert.push(file);
    }
  });

  // For each file, modify it to add the amp page reference and then create the amp
  // version
  filesToConvert.forEach((fileToConvert) => {
    const urlPath = fileToConvert.replace(inputDir, ''); // No inputDir in the URL
    const contents = fs.readFileSync(fileToConvert, 'utf8');
    const outputDirectory = `${fileToConvert.replace('index.html', '')}amp/`;
    const outputFile = `${outputDirectory}index.html`;

    // Make sure file exists.
    mkdirp.sync(outputDirectory);
    // Add the amp url link to the top of the page then Save the file
    fs.writeFileSync(outputFile, ampify(contents, urlPath, ($) => {
      // Replace certain elements on the page for AMP specifically
      $('amp-iframe').attr('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
      $('amp-iframe').attr('layout', 'responsive');
      $('amp-video').attr('layout', 'responsive');
      $('amp-video').attr('height', '270');
      $('amp-video').attr('width', '480');
      $('amp-img').attr('width', '480');
      $('amp-img').attr('height', '240');

      // Google Analytics
      $('head').append('<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>');
      $('amp-analytics').remove();
      $('body').prepend(`<amp-analytics type="googleanalytics" id="analytics1">\
      <script type="application/json">{"vars": {"account": "${GA_TRACKING_ID}"},"triggers": {"trackPageview": {"on": "visible","request": "pageview"}}}</script>\
    </amp-analytics>`);

      // Remove all important tags since they are not permitted in amp styles
      const css = fs.readFileSync('src/css/amp.css', 'utf8');

      // Add our new style to the head as required my amp
      $('head').prepend(`<style amp-custom>${css}</style>`);
      $('header').html(`
        <header id="#top" class="amp-wp-header">
          <div>
            <a href="https://jason.stallin.gs">
            Jason Stallings
          </a>
          </div>
        </header>`);

      // Remove social icons.
      $('.FooterType-bottom').remove();
    }), 'utf8');
  });

  console.log('The site is now AMP ready');
});
