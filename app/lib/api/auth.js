const API_URL = "http://localhost:5000/api/v1/login";

// تسجيل دخول
export async function login(userAccount, password,rememberMe) {
	try {
		const res = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({userAccount, password,rememberMe}),
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
