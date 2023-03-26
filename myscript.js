const reservedSeats = {
  record1: {
    seat: "b7",
    owner: {
      fname: "John",
      lname: "wick",
    },
  },
  record2: {
    seat: "b8",
    owner: {
      fname: "John",
      lname: "wick",
    },
  },
  record3: {
    seat: "b9",
    owner: {
      fname: "John",
      lname: "wick",
    },
  },
  record4: {
    seat: "b10",
    owner: {
      fname: "John",
      lname: "wick",
    },
  },
};

const rows = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", ];
let seatingArrangement = document.getElementById("seating");

const leftSection = document.createElement("section");
leftSection.setAttribute("id", "left");

const middleSection = document.createElement("section");
middleSection.setAttribute("id", "middle");
const rightSection = document.createElement("section");
rightSection.setAttribute("id", "right");

rows.forEach((row) => {
  //Left section
  let labelLeft = document.createElement("div");
  labelLeft.className = "label";
  labelLeft.textContent = row.toUpperCase();
  leftSection.appendChild(labelLeft);
  for (let i = 1; i <= 3; i++) {
    let div = document.createElement("div");
    div.setAttribute("id", `${row}${i}`);
    div.textContent = i;
    div.className = "a";
    leftSection.appendChild(div);
  }
  seatingArrangement.appendChild(leftSection);

  //Middle Section
  for (let i = 4; i <= 12; i++) {
    let div = document.createElement("div");
    div.setAttribute("id", `${row}${i}`);
    div.textContent = i;
    div.className = "a";
    middleSection.appendChild(div);
  }
  seatingArrangement.appendChild(middleSection);

  //Right Section
  for (let i = 13; i <= 15; i++) {
    let div = document.createElement("div");
    div.setAttribute("id", `${row}${i}`);
    div.textContent = i;
    div.className = "a";
    rightSection.appendChild(div);
  }
  let labelRight = document.createElement("div");
  labelRight.textContent = row.toUpperCase();
  labelRight.className = "label";
  rightSection.appendChild(labelRight);
  seatingArrangement.appendChild(rightSection);
});

//Reserved Seats
Object.values(reservedSeats).forEach((val) => {
  const reservedSeat = document.getElementById(val["seat"]);
  if (reservedSeat) {
    reservedSeat.className = "r";
    reservedSeat.textContent = "R";
  }
});

//Selected Seats:
(function () {
  let selectedSeatsList = [];
  let seats = document.querySelectorAll(".a");

  seats.forEach((seat) => {
    seat.addEventListener("click", function () {
      // console.log(this.id)
      seatSelectionProcess(this.id);
    });
  });

  function seatSelectionProcess(thisSeat) {
    let index = selectedSeatsList.indexOf(thisSeat);
    const seat = document.getElementById(thisSeat);
    if (!seat.classList.contains("r")) {
      if (index === -1) {
        selectedSeatsList.push(thisSeat);
        seat.className = "s";
      } else {
        selectedSeatsList = selectedSeatsList
          .slice(0, index)
          .concat(selectedSeatsList.slice(index + 1));
        seat.className = "a";
      }
    }
  }

  let seatCountContainer = document.getElementById("selectedseats");
  let reserveBtn = document.getElementById("reserve");
  let reserveForm = document.getElementById("resform");
  let cancelBtn = document.getElementById("cancel");
  let confirmRes = document.getElementById("confirmres");
  reserveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (reserveForm.style.display === "block") {
      reserveForm.style.display = "none";
    } else {
      confirmResSeats();
      reserveForm.style.display = "block";
    }
  });
  cancelBtn.addEventListener("click", function (event) {
    event.preventDefault();
    reserveForm.style.display = "none";
  });

  function confirmResSeats() {
    if (selectedSeatsList.length === 0) {
      confirmRes.style.display = "none";
      seatCountContainer.innerHTML = `<p>You have selected ${selectedSeatsList.length} Seats.
      <a href="#" id="error">Close</a> this dialogue box and select seats</p>`;
      let errorTag = document.getElementById("error");
      errorTag.addEventListener("click", function (event) {
        event.preventDefault();
        reserveForm.style.display = "none";
      });
    } else {
      confirmRes.style.display = "block";
      let selectedSeatsString = selectedSeatsList.join(", ");
      selectedSeatsString = selectedSeatsString.replace(/,(?=[^,]*$)/, " and ");
      seatCountContainer.textContent = `You have selected ${selectedSeatsString} Seat${
        selectedSeatsList.length > 1 ? "s" : ""
      }`;
    }
  }
  confirmRes.addEventListener("submit", function (event) {
    event.preventDefault();
    const fname = event.target.elements["fname"].value;
    const lname = event.target.elements["lname"].value;
    const hardCodedObjs = Object.keys(reservedSeats).length;
    let count = hardCodedObjs + 1;
    selectedSeatsList.forEach((seat) => {
      const selectedSeat = document.getElementById(seat);
      selectedSeat.className = "r";
      selectedSeat.textContent = "R";
      let recordName = "record" + count;
      reservedSeats[recordName] = {
        seat: seat,
        owner: {
          fname: fname,
          lname: lname,
        },
      };
      count++;
    });

    reserveForm.style.display = "none";
    selectedSeatsList = [];
    confirmResSeats();
  });
})();
