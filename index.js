/**
 * Builds all of the Simple.css CSS files and minifies them using CleanCSS.
 * 
 * @author ChowderMan, Kev Quirk
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const sass = require('sass');
const CleanCSS = require('clean-css');

// Getting the Simple.css SASS source code.
const scssFilePath = path.join(__dirname, 'simple.scss');
const scssCode = fs.readFileSync(scssFilePath, 'utf8');

// Setting all of the possible themes to build different versions of the file
// depending on the theme chosen.
const scssThemes = [
  'light',
  'dark',
  'combined',
];

// Looping through each of the themes, generating the CSS source code for each
// theme, and writing the code to a file.
for (const scssTheme of scssThemes) {
  // Compiling the SCSS code to CSS using the given theme.
  const cssCode = sass.renderSync({
    data: `$theme: '${scssTheme}';\n${scssCode}`,
  }).css.toString();

  // Creating the path of the unminified theme CSS file.
  const unminifiedCssFileName = scssTheme === 'combined'
    ? `./simple.css`
    : `./simple.${scssTheme}.css`;

  const unminifiedCssFilePath = path.join(
    __dirname,
    unminifiedCssFileName,
  );

  // Writing the unminified CSS theme file.
  fs.writeFileSync(unminifiedCssFilePath, cssCode);

  // Minifying the CSS code using CleanCSS.
  const cleanCssOptions = {};
  const minifiedCssCode = new CleanCSS(cleanCssOptions)
    .minify(cssCode)
    .styles;

  // Creating the path of the minified theme CSS file.
  const minifiedCssFileName = scssTheme === 'combined'
    ? `./simple.min.css`
    : `./simple.${scssTheme}.min.css`;

  const minifiedCssFilePath = path.join(
    __dirname,
    minifiedCssFileName,
  );

  // Writing the minified CSS theme file.
  fs.writeFileSync(minifiedCssFilePath, minifiedCssCode);
}
