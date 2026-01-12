/** @type {import('next').NextConfig} */
const nextConfig = {
	// images: {
	// 	domains: [
	// 		'res.cloudinary.com'
	// 	],
	// },


		
	images: {
	remotePatterns: [
		{
			protocol: "https" ,
			hostname: "example.com" ,
		},
	],
	} ,
	experimental: {
		turbo: false ,
	},

};
export default nextConfig ;