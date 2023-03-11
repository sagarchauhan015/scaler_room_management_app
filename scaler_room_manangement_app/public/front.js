function calcPrice() {
    let datetimeIn = document.getElementById("checkintime").value.split("T");
    let datetimeOut = document.getElementById("checkouttime").value.split("T");
    let date1 = datetimeIn[0].split("-").map(Number);
    let date2 = datetimeOut[0].split("-").map(Number);
    let time1 = datetimeIn[1].split(":").map(Number);
    let time2 = datetimeOut[1].split(":").map(Number);
    let days = 0;
    let day1 = date1[2];
    let day2 = date2[2];
    let month1 = date1[1];
    let timeDiff = Math.abs(time2[0] - time1[0]);
    let month_map = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };
  
    if (day2 > day1) {
      days = day2 - day1;
    } else {
      days = month_map[month1] - (day1 - day2);
    }
  
    let hours = days * 24;
    if (time1[0] < time2[0]) {
      hours += timeDiff;
    } else {
      hours -= timeDiff;
    }
  
    let time = hours;
    let price = 0;
    let roomType = document.getElementById("roomtype").value;
    if (roomType == "typeA") {
      price += 100 * time;
    } else if (roomType == "typeB") {
      price += 80 * time;
    } else {
      price += 50 * time;
    }
  
    document.getElementById("price_id").innerHTML = price + " Rupees";
  }
  
  let state = document.getElementById("book-button");
  state.addEventListener("click", () => {
    document.getElementById("booking").innerHTML = "Booked Successfully !";
  });
  