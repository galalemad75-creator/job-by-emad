// *** ضع رابط Vercel هنا بعد النشر ***
const BACKEND_URL = 'https://job-by-emad-backend.vercel.app';

export const searchEmbassies = async (country, jobTitle) => {
  const res = await fetch(
    `${BACKEND_URL}/api/search?country=${encodeURIComponent(country)}&job=${encodeURIComponent(jobTitle)}`
  );
  if (!res.ok) throw new Error('Server error');
  return res.json();
};
