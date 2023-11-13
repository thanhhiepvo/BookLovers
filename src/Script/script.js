// --- Login page ---

// function checkLogin()
// {
//     const loginData = document.querySelectorAll(".loginPage .wrapper .inputBox input"),
//         userName = loginData[0],
//         pass = loginData[1]
    
//     if (userName === "1" && pass == "1")
//     {
//         window.location.href = "test.html";
//     }
// }

// document.querySelector("button").addEventListener("click", checkLogin);

// --- OTP page ---
const inputs = document.querySelectorAll(".otp .wrapper .inputOTP input"),
    button = document.querySelector(".otp .wrapper button");

inputs.forEach((input, index1) => 
{
    input.addEventListener("keyup", (e) => 
    {
        const currentInput = input,
        nextInput = input.nextElementSibling,
        prevInput = input.previousElementSibling;

        if (currentInput.value.length > 1)
        {
            currentInput.value = "";
            return;
        }

        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "")
        {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }


        if (e.key === "Backspace") 
        {
            inputs.forEach((input, index2) => 
            {
                if (index1 <= index2 && prevInput) 
                {
                    input.setAttribute("disabled", true);
                    input.value = "";
                    prevInput.focus();
                }
            });
          }

        if (!inputs[3].disabled && inputs[3].value !== "") 
        {
            button.classList.add("active");
            return;
        }
        button.classList.remove("active");

    });
});

window.addEventListener("load", () => inputs[0].focus());

