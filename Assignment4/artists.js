const fs = require(`fs`);
const cheerio = require("cheerio");
const axios = require("axios");
const lo = require("lodash");
const nodemailer = require("nodemailer");

// I was confused about the difference between from and sender_email... in nodemailer.createTransport i used from, and options i used sender_email

// Process the args and get the artists
if (process.argv.length == 2) {
  console.error("No artists given, specify them with spaces");
  return;
}
// Lowercase it for checking later
var givenArtists = process.argv.slice(2);

// Make sure you have the json and it contains everything necessary
var credentials;

try {
  credentials = JSON.parse(fs.readFileSync("credentials.json"));
  const keys = lo.keys(credentials);
  const keysEqual = lo.isEqual(
    keys.sort(),
    ["from", "to", "sender_email", "sender_password"].sort()
  );

  if (!keysEqual) {
    throw new Error("Keys not equal");
  }

  // if(keys.)
} catch (err) {
  console.error("File error, file not found or wrong keys or vals");
  return;
}

// Asked chat : "how do i wait fro an axios.get to be done before doing the rest of my code in one line"
/*Yes! You can use an immediately invoked async function (IIFE) to reduce the code further. Here's a more concise way to handle axios.get with async/await:

javascript
Copy code
const axios = require('axios');

(async () => {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log('Data received:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
This immediately invokes an asynchronous function without needing a separate fetchData function, keeping the code concise while still waiting for axios.get to complete. */

// Request the data
var titlesArtists = [];
axios
  .get(`http://www.popvortex.com/music/charts/top-rap-songs.php`)
  .then((data) => {
    html = data.data;
    var $ = cheerio.load(html);

    $(".title-artist").each((i, element) => {
      // Stop at 25
      if (i === 25) {
        return false;
      }
      var title = $(element).find(".title").text();
      var artist = $(element).find(".artist").text();
      titlesArtists.push({ title: title, artist: artist });
    });

    // Filter all artists... if someone types in Kendrick as a Paramm then we include any that have Kendrick Lamar,
    // Also if we want Kendrick, but the title is Kendrick and Eminem, then this will return it too

    titlesArtists = titlesArtists.filter((titleArtist) => {
      for (const artist of givenArtists) {
        if (titleArtist.artist.includes(artist)) {
          return true;
        }
      }
      return false;
    });

    if (titlesArtists.length === 0) {
      console.error("Aritst not found");
      return;
    }

    //Setup for the email
    const email = nodemailer.createTransport({
      host: "smtp",
      service: "gmail",
      port: 465,
      secure: true,
      auth: { user: credentials.from, pass: credentials.sender_password },
    });
    var artistsOutput;
    if (givenArtists.length === 1) {
      artistsOutput = givenArtists.at(-1);
    } else if (givenArtists.length === 2) {
      artistsOutput = givenArtists.slice(0).join(" and ");
    } else {
      artistsOutput =
        givenArtists.slice(0, -1).join(", ") + ", and " + givenArtists.at(-1);
    }

    var outputText = "";
    var outputHTML = "";
    titlesArtists.forEach((element) => {
      outputText += `${element.artist}: ${element.title}`;
      outputHTML += `<b>${element.artist}</b>: <i>${element.title}</i><br>`;
    });

    const options = {
      from: credentials.sender_email,
      to: credentials.to,
      subject: `Your artist(s) are:  ${artistsOutput}`,
      text: outputText,
      html: outputHTML,
    };
    email.sendMail(options);
  })
  .catch((error) => {
    console.error("URL error");
    console.log(error);
  });
