const API_URL = "https://store-app-back-end.vercel.app/api/v1";

// تسجيل دخول
export async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  } catch (error) {
    console.error("API Error (Login):", error);
    return null;
  }
}

// إنشاء حساب
export async function signup(data) {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  } catch (error) {
    console.error("API Error (Signup):", error);
    return null;
  }
}

// تغيير الباسورد
export async function changePassword(userId, passwords) {
  try {
    const res = await fetch(`${API_URL}/users/${userId}/change-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwords),
    });
    if (!res.ok) throw new Error("Password change failed");
    return res.json();
  } catch (error) {
    console.error("API Error (Change Password):", error);
    return null;
  }
}





// =========================================
export async function loginn(email, password) {
  const res = await fetch("https://your-backend.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // مهم لو بتستخدم Cookies
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}