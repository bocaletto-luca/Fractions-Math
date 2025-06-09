"use strict";
    // Utility function to compute the Greatest Common Divisor (GCD)
    function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    }

    /* ----- TAB NAVIGATION ----- */
    function openTab(evt, tabName) {
      let tabcontents = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tabcontents[i].classList.remove("active");
      }
      let tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(tabName).classList.add("active");
      evt.currentTarget.classList.add("active");
    }
    document.getElementById("defaultTab").click();

    /* ----- CALCULATOR FUNCTIONS ----- */
    // Fraction Arithmetic Operations
    function calculateFractionOperation() {
      const num1 = parseInt(document.getElementById("num1").value);
      const den1 = parseInt(document.getElementById("den1").value);
      const num2 = parseInt(document.getElementById("num2").value);
      const den2 = parseInt(document.getElementById("den2").value);
      const op = document.getElementById("operation").value;
      const operResult = document.getElementById("operResult");

      if (isNaN(num1) || isNaN(den1) || den1 === 0 ||
          isNaN(num2) || isNaN(den2) || den2 === 0) {
        operResult.innerHTML = "<p>Please enter valid numbers and non-zero denominators.</p>";
        return;
      }

      let resultNum, resultDen;
      if (op === "+") {
        // (a/b) + (c/d) = (ad + bc) / (bd)
        resultNum = num1 * den2 + num2 * den1;
        resultDen = den1 * den2;
      } else if (op === "-") {
        resultNum = num1 * den2 - num2 * den1;
        resultDen = den1 * den2;
      } else if (op === "*") {
        resultNum = num1 * num2;
        resultDen = den1 * den2;
      } else if (op === "/") {
        if (num2 === 0) {
          operResult.innerHTML = "<p>Cannot divide by zero.</p>";
          return;
        }
        resultNum = num1 * den2;
        resultDen = den1 * num2;
      }
      // Simplify the fraction
      const divisor = gcd(Math.abs(resultNum), Math.abs(resultDen));
      resultNum = resultNum / divisor;
      resultDen = resultDen / divisor;
      const decimal = resultNum / resultDen;
      
      operResult.innerHTML = `<p>Result: ${resultNum}/${resultDen} | Decimal: ${decimal.toFixed(4)}</p>`;
    }

    // Fraction Simplification and Conversion
    function simplifyFraction() {
      const num = parseInt(document.getElementById("simpNum").value);
      const den = parseInt(document.getElementById("simpDen").value);
      const simpResult = document.getElementById("simpResult");
      if (isNaN(num) || isNaN(den) || den === 0) {
        simpResult.innerHTML = "<p>Please enter valid numbers and a non-zero denominator.</p>";
        return;
      }
      const divisor = gcd(Math.abs(num), Math.abs(den));
      let simpNum = num / divisor;
      let simpDen = den / divisor;
      const decimal = simpNum / simpDen;
      const percentage = (decimal * 100).toFixed(2);
      simpResult.innerHTML = `<p>Simplified Fraction: ${simpNum}/${simpDen}</p>
                              <p>Decimal: ${decimal.toFixed(4)} | Percentage: ${percentage}%</p>`;
    }

    /* ----- VISUALIZER FUNCTIONS ----- */
    function drawPieChart() {
      const num = parseInt(document.getElementById("visNum").value);
      const den = parseInt(document.getElementById("visDen").value);
      const pieResult = document.getElementById("pieResult");
      if (isNaN(num) || isNaN(den) || den === 0) {
        pieResult.innerHTML = "<p>Please enter valid numbers and a non-zero denominator.</p>";
        return;
      }
      const fraction = num / den;
      const canvas = document.getElementById("pieCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;
      
      // Draw full circle (background)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#ddd";
      ctx.fill();
      
      // Draw fraction slice (colored portion)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * fraction));
      ctx.closePath();
      ctx.fillStyle = "#007BFF";
      ctx.fill();
      
      const decimal = fraction.toFixed(4);
      const percentage = (fraction * 100).toFixed(2);
      pieResult.innerHTML = `<p>Fraction: ${num}/${den}</p>
                             <p>Decimal: ${decimal} | Percentage: ${percentage}%</p>`;
    }
