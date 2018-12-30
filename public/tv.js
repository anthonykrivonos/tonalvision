const sgMail = require('@sendgrid/mail');

function initialize () {
      numShoots = document.getElementById("numshoots");
      numDays = document.getElementById("numdays");
      numPhotos = document.getElementById("numphotos");
      numRetouches = document.getElementById("numretouches");
      numPrints = document.getElementById("numprints");
      appointment = document.getElementById("appointment");
      model = document.getElementById("model");
      inquiry = document.getElementById("inquiry");
}

function calculateEstimate () {
      var PHOTOSHOOTBASEPRICE = 98.50;
      var DAYSNOTICEPRICE = 100;
      var PHOTOPRICE = 1.50;
      var RETOUCHPRICE = 3.50;
      var PRINTAVGPRICE = 19.49;

      if (numShoots.value == "" || numShoots.value <= 0)
            numShoots.value = 1;
      if (numDays.value == "" || numDays.value <= 0)
            numDays.value = 1;
      if (numPhotos.value == "" || numPhotos.value <= 0)
            numPhotos.value = 1;
      if (numRetouches.value == "" || numRetouches.value <= 0)
            numRetouches.value = 0;
      if (numPrints.value == "" || numPrints.value <= 0)
            numPrints.value = 0;

      if (parseInt(numPhotos.value) < parseInt(numRetouches.value))
            numRetouches.value = numPhotos.value;

      if (parseInt(numPhotos.value) < parseInt(numPrints.value))
            numPrints.value = numPhotos.value;

      console.log(PHOTOSHOOTBASEPRICE)
      console.log(DAYSNOTICEPRICE)
      console.log(PHOTOPRICE)
      console.log(RETOUCHPRICE)
      console.log(PRINTAVGPRICE)

      var price = parseInt(numShoots.value) * PHOTOSHOOTBASEPRICE +
      DAYSNOTICEPRICE/parseInt(numDays.value) +
      parseInt(numPhotos.value) * PHOTOPRICE +
      parseInt(numRetouches.value) * RETOUCHPRICE +
      parseInt(numPrints.value) * PRINTAVGPRICE;

      var rounded = Math.round(100*price)/100;

      console.log('price: ' + price);
      console.log('rounded: ' + rounded);

      document.getElementById("calcval").innerHTML = "$" + rounded;
}

function randomImages () {
      var LENGTH = 19;
      var indeces = new Array();
      while (indeces.length < LENGTH) {
            var img = document.createElement("img");
            var randIdx = Math.floor((Math.random() * (LENGTH)));
            if (!hasInt(indeces, randIdx)) {
                  indeces.push(randIdx);
                  img.src = "Portf/Portf-" + randIdx + ".jpg";
                  document.getElementById("photos").appendChild(img);
            }
      }
}

function hasInt (arr, int) {
      for (var i = 0; i < arr.length; i++)
            if (arr[i] == int)
                  return true;
      return false;
}

function displayGallery () {
      fadeOut(document.getElementById("collage"),0.7);
      document.getElementsByTagName("body")[0].style.overflowY = "auto";

      setTimeout(function () {
            document.getElementById("collage").style.display = "none";
      }, 500);
}

function fadeOut(element, startOp) {
      if (startOp != undefined)
      var op = startOp;
      else
      var op = 1;
      var timer = setInterval(function ()
      {
            if (op <= 0.1){
                  clearInterval(timer);
            }
            element.style.opacity = op;
            op -= 0.1;
      }, 50);
}

function fadeIn(element)
{
      var op = 0.1;  // initial opacity
      var timer = setInterval(function ()
      {
            if (op >= 1){
                  clearInterval(timer);
            }
            element.style.opacity = op;
            op += 0.1;
      }, 100);
}

function send () {
      var fromIndexer = document.getElementById('from');
      if (fromIndexer.value.indexOf("@") == -1 && fromIndexer.value.indexOf(".") == -1) {
            mailFailure("Please insert a valid email address.", EMAIL);
            return;
      } else if (document.getElementById("service").value == "") {
            mailFailure("Please select a service.", EMAIL);
            return;
      } else {
            let name = document.getElementById("name").value;
            let from = document.getElementById("from").value;
            let subject = document.getElementById("subject").value;
            let service = document.getElementById("service").options[service.selectedIndex].value;
            let body = document.getElementById("content").value;

            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            let msg = {
                  to: 'tonalvision.ig@gmail.com',
                  from: `${name} <${from}>`,
                  subject: `Client Name: ${name}\n
                  Service: ${service}\n\n
                  ${subject}\n\n
                  Sent From: ${from}`,
                  text: `${body}`,
            };
            sgMail.send(msg);
            mailFailure("close", EMAIL);
      }
}

function mailFailure (message) {
      if (message == "close") {
            document.getElementsByClassName("error")[0].style.display = "none";
            document.getElementsByClassName("error")[0].innerHTML = "";
            return;
      }
      document.getElementsByClassName("error")[0].style.display = "block";
      document.getElementsByClassName("error")[0].innerHTML = message;
}
