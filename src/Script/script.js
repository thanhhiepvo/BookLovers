// --- Login page ---
function checkLogin()
{
    var mail = document.getElementById("mail_Login").value;
    var pass = document.getElementById("pass_Login").value;
    
    if (mail == "1" && pass == "1")
    {
        window.location.href = "home.html";
    }
    else 
    {
        alert("Wrong email or password")
    }
}

// --- Forgot pass page ---
function checkForgot()
{
    var mail = document.getElementById("email_Forgot").value;
    var pass1 = document.getElementById("pass1_Forgot").value;
    var pass2 = document.getElementById("pass2_Forgot").value;

    // if (mail đã tồn tại)
    // {
    //     alert("Your email is already registered");
    // }
    if (pass1 != pass2)
    {
        alert("Confirm your password again");
    }
    else if (pass1 == pass2)
    {
        // alert("Change password successfully");
        window.location.href = "otp.html";
    }

}

// --- Sign up page ---
function checkSignIn()
{
    var uname = document.getElementById("uname_SignUp").value;
    var email = document.getElementById("email_SignUp").value;
    var pass1 = document.getElementById("pass1_SignUp").value;
    var pass2 = document.getElementById("pass2_SignUp").value;

    // if (uname tồn tại)
    // if (email tồn tại)

    if (pass1 != pass2)
    {
        alert("Confirm your password again");
    }
    else if (pass1 == pass2)
    {
        // alert("Create account successfully");
        window.location.href = "otp.html";
    }
}


// --- OTP page ---
function inputOTP()
{
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
}

function checkOTP()
{
    // event.preventDefault(); 
    const source = window.location.href.split('?')[1].split('=')[1];

    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var num3 = document.getElementById("num3").value;
    var num4 = document.getElementById("num4").value;

    var otp = num1 + num2 + num3 + num4;

    // Can not change page
    if (otp === "1234")
    {
        alert("Correct");
        window.location.href = "login.html";
    }
    else
    {
        alert("Incorrect");
        window.location.href = source;
    }
    // event.currentTarget.submit();
}