Module.register("MMM-Moon", {
  defaults: {
    category: "Astronomy",
    lat: 41.657,
    lon: 91.534,
    timezone: "America/Chicago",
    updateInterval: 21600000, // Every six  hours
  },
  content: "",

  start: function () {
    const m = this
    Log.log(" Schedule update timer.")
                setInterval(function() {
                        m.sendSocketNotification("getcontent", m.config)
                        Log.log("requested scheduled update")
                }, this.config.updateInterval);

  },
  getDom: function () {
    const outerDiv = document.createElement("div");
    if (this.content) {
      const img = document.createElement("img");
      img.src = this.content;
      outerDiv.appendChild(img);
    } else {
      outerDiv.innerText = "No image!";
    }
    return outerDiv;
  },
  notificationReceived: function (notification, _payload) {
    Log.log(`notification recieved: ${notification}`);
    if (notification === "ALL_MODULES_STARTED") {
      this.sendSocketNotification("getcontent", this.config);
    }
  },
  socketNotificationReceived: function (notification, payload) {
    console.log(`recieved socket notification: ${notification}`);
    if (notification === "node_data") {
      Log.log("data received back from helper");
      this.content = payload;
      Log.log(payload);
      this.updateDom(1);
    }
  }
});
