
    const sendButton = document.getElementById("sendButton");
    const valueInput = document.getElementById("valueInput");
    const statusMessage = document.getElementById("statusMessage");

    valueInput.addEventListener("keyup",(e)=>{
        const regex = /[^a-z0-9]/i; // regex /i =case sensitive
    if (e.target.value == "\\"){
        alert(`ไม่ต้องใส่ '\\' backslash`)
        e.target.value= ""
    // เช็คว่ามีภาษาอื่นนอกจาก engกับตัวเลขไหมโดยใช้ .test return =boolean
    }if(regex.test(e.target.value)){
        alert("กรุณกรอกแต่ภาษาอังกฤษและตัวเลขลอง ใหม่อีกครั้ง!!")
        e.target.value= ""
    }
    })

    sendButton.addEventListener("click", async () => {
        const value = valueInput.value;
		// Check if the input value is not null or empty
        if (value.trim() === "") {
            alert("Please enter a Computername."); // You can customize this message
            return;
        }
		sendButton.disabled = true;
        try {
            statusMessage.innerText = "Waiting for Process to finish...";
            statusMessage.style.color = "red"; // Set initial color to red

            const response = await fetch("/send-value", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ value })
            });

            if (response.ok) {
                const data = await response.text();
                statusMessage.innerText = data;
                if (data === "Complete") {
                    statusMessage.style.color = "green"; // Change color to green if response is "Complete"
                }
            } else {
                throw new Error("Error executing batch file.");
            }
        } catch (error) {
            console.error("Error:", error);
            statusMessage.innerText = "An error occurred.";
        }finally {
            sendButton.disabled = false; // Re-enable the button after the process is complete or an error occurs
        }
    });
