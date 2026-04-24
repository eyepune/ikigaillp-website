// Mocking the logic from AdminCourses.jsx handleSave
function processData(form) {
  return {
    ...form,
    who_is_it_for: typeof form.who_is_it_for === 'string' ? form.who_is_it_for.split('\n').filter(Boolean) : form.who_is_it_for,
    who_is_it_for_hi: typeof form.who_is_it_for_hi === 'string' ? form.who_is_it_for_hi.split('\n').filter(Boolean) : form.who_is_it_for_hi,
    achievements: typeof form.achievements === 'string' ? form.achievements.split('\n').filter(Boolean) : form.achievements,
    achievements_hi: typeof form.achievements_hi === 'string' ? form.achievements_hi.split('\n').filter(Boolean) : form.achievements_hi,
  };
}

const testForm = {
  title: "Test Course",
  who_is_it_for: "Students\nProfessionals\n\nDevelopers",
  who_is_it_for_hi: "छात्र\nपेशेवर",
  achievements: "Cert 1\nCert 2",
  achievements_hi: "प्रमाणपत्र 1"
};

const result = processData(testForm);

console.log("Input:", testForm);
console.log("Processed:", JSON.stringify(result, null, 2));

if (Array.isArray(result.who_is_it_for) && result.who_is_it_for.length === 3) {
  console.log("✅ who_is_it_for parsed correctly");
} else {
  console.error("❌ who_is_it_for parsing failed");
}

if (Array.isArray(result.who_is_it_for_hi) && result.who_is_it_for_hi.length === 2) {
  console.log("✅ who_is_it_for_hi parsed correctly");
} else {
  console.error("❌ who_is_it_for_hi parsing failed");
}
