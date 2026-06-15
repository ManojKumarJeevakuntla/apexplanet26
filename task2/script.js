document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("registerForm");

  if (regForm) {
    regForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      // ✅ Check for empty fields
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields!");
        return;
      }

      // ✅ Check password match
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        // ✅ Send form data to PHP backend
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        const response = await fetch("http://localhost/task2/register.php", {
          method: "POST",
          body: formData
        });

        const result = await response.text();

        // ✅ Show backend response
        if (result.toLowerCase().includes("success")) {
          alert("Registration Successful!");
          regForm.reset();
        } else {
          alert(result);
        }
      } catch (error) {
        alert("Error connecting to server.");
        console.error(error);
      }
    });
  }
});
