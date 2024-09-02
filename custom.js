document.addEventListener("DOMContentLoaded", () => {
  // Maximum number of buttons that can be selected
  const maxSelected = 3;
  const coupon = 0;
  const totalSeats = 40;
  const price = 550;

  const selectedSeatsTable = document.getElementById("selectedSeatsBody");
  // Per ticket price
  const priceTicket = document.getElementById("Price");
  priceTicket.innerText = price;

  // total seats select price
  const availableSeats = document.getElementById("totalSeats");
  availableSeats.innerText = totalSeats;

  // Price put select ticket
  // const perTicket = document.getElementById("perTicket");
  // perTicket.innerText = price;

  // Function to handle the click event
  function selectSeat(event) {
    const seatText = event.target.textContent;
    const seatId = `seat-${seatText}`;
    const selectedButtons = document.querySelectorAll(".seat.bg-cGreen");
    // If the clicked button is already selected, deselect it
    if (event.target.classList.contains("bg-cGreen")) {
      event.target.classList.remove(
        "bg-cGreen",
        "text-white",
        "hover:bg-cGreen"
      );
      // Remove the corresponding <p> tag
      const seatInfo = document.getElementById(seatId);
      if (seatInfo) {
        selectedSeatsTable.removeChild(seatInfo);
      }
      const discountPrice = document.getElementById("discountPrice");

      // Attach click event listeners to all elements with the class .seat
      if (discountPrice) {
        couponArea.classList.remove("hidden");
        discountPrice.remove();
      }
    } else if (selectedButtons.length <= maxSelected) {
      // If less than 4 buttons are selected, allow selecting more
      event.target.classList.add("bg-cGreen", "text-white", "hover:bg-cGreen");

      // Create a new <tr> element with a unique ID
      const newSeatRow = document.createElement("tr");
      newSeatRow.id = seatId;
      newSeatRow.className = "h-12 font-Inter text-lg py-3";

      // Create and append <td> elements to the <tr>
      const seatCell = document.createElement("td");
      seatCell.className = "opacity-60";
      seatCell.textContent = seatText;
      newSeatRow.appendChild(seatCell);

      const classCell = document.createElement("td");
      classCell.className = "opacity-60";
      classCell.textContent = "Economy"; // Example class, can be dynamic
      newSeatRow.appendChild(classCell);

      const priceCell = document.createElement("td");
      priceCell.className = "opacity-60 text-end";
      priceCell.id = "perTicket";
      priceCell.textContent = `${price}`;
      newSeatRow.appendChild(priceCell);

      // Append the new <tr> to the table
      selectedSeatsTable.appendChild(newSeatRow);
      const discountPrice = document.getElementById("discountPrice");

      // Attach click event listeners to all elements with the class .seat
      if (discountPrice) {
        discountPrice.remove();
        couponArea.classList.remove("hidden");
      }
    } else {
      alert("Maximum 4 tickets book as per time.");
      return;
    }

    const selectedButtonsAfter = document.querySelectorAll(".seat.bg-cGreen");
    const lengthButtons = selectedButtonsAfter.length;
    seatCounts.textContent = lengthButtons;
    const AmountPrice = lengthButtons * price;
    totalPrice.innerText = AmountPrice;
    grandPrice.innerText = AmountPrice - (price / 100) * coupon;
    const selectSeats = totalSeats;
    const valueSeats = selectSeats - lengthButtons;
    const availableSelect = availableSeats;
    availableSelect.innerText = valueSeats;

    // button disable service
    if (1 > lengthButtons) {
      submitButton.classList.add(
        "cursor-not-allowed",
        "bg-gray-300",
        "hover:bg-gray-300",
        "hover:text-black",
        "text-black",
        "opacity-50"
      );
      submitButton.disabled = true;
      submitButton.classList.remove(
        "bg-[#1DD100]",
        "hover:bg-white",
        "hover:text-cGreen",
        "text-white",
        "border"
      );
      submitButton.disabled = false;
    } else {
      submitButton.classList.remove(
        "cursor-not-allowed",
        "bg-gray-300",
        "hover:bg-gray-300",
        "hover:text-black",
        "text-black",
        "opacity-50"
      );
      submitButton.classList.add(
        "bg-[#1DD100]",
        "hover:bg-white",
        "hover:text-cGreen",
        "text-white",
        "border"
      );
      submitButton.disabled = false;
    }
  }
  // Attach click event listeners to all buttons
  document.querySelectorAll(".seat").forEach((btn) => {
    btn.addEventListener("click", selectSeat);
  });

  const applyCouponButton = document.getElementById("applyCoupon");
  const originalPriceElement = document.getElementById("totalPrice");

  // coupon code system
  applyCouponButton.addEventListener("click", () => {
    const couponCode = document.getElementById("couponCode").value;
    const originalPrice = parseFloat(originalPriceElement.textContent);

    // Define the valid coupon code
    const validCouponCode15 = "NEW15";
    const validCouponCode20 = "Couple 20";

    // Check if the entered coupon code is valid
    if (couponCode === validCouponCode15) {
      // Calculate the discounted price (20% off)
      const discount = (originalPrice / 100) * 15;
      const discountedPrice = originalPrice - discount;

      // Update the discounted price display
      grandPrice.textContent = discountedPrice;
      couponArea.classList.add("hidden");

      // Create a new <div> below totalPrice
      const newDiv = document.createElement("div");
      newDiv.id = "discountPrice";
      newDiv.className =
        "flex justify-between  font-Inter font-medium text-lg py-3 w-full border-b-2";
      // Create and append <span> elements to the newDiv
      const newSpan = document.createElement("span");
      newSpan.className = "inline-flex";
      newSpan.textContent = "Discount Price";
      newDiv.appendChild(newSpan);

      // Create and append <span1> elements to the newDiv
      const newSpan1 = document.createElement("span");
      newSpan1.className = "inline-flex gap-1";
      newSpan1.textContent = `BDT ${discount}`;
      newDiv.appendChild(newSpan1);

      // Append the new <tr> to the table
      priceArea.appendChild(newDiv);
    } else if (couponCode === validCouponCode20) {
      // Calculate the discounted price (20% off)
      const discount = originalPrice * 0.2;
      const discountedPrice = originalPrice - discount;

      // Update the discounted price display
      grandPrice.textContent = discountedPrice;
    } else {
      // If the coupon code is invalid, show the original price
      grandPrice.textContent = originalPrice;
      alert("Invalid coupon code. Please try again.");
    }
  });
});
