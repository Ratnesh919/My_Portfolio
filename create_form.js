const fs = require('fs');

const questions = [
  // General & Demographics (1-10)
  { q: "What is your full name or what do you prefer to be called?", options: ["My formal name", "A nickname", "My online handle", "Doesn't matter"] },
  { q: "How old are you, or what stage of life are you in?", options: ["Student / Early Adulthood", "Young Professional", "Mid-career", "Established / Older"] },
  { q: "Where are you currently living, and how do you feel about it?", options: ["Love it here", "It's okay for now", "Looking to move soon", "Hate it"] },
  { q: "What is your current occupation or field of study?", options: ["Tech / Engineering", "Arts / Humanities", "Business / Finance", "Science / Medical", "Other"] },
  { q: "What does a typical day look like for you?", options: ["Highly structured routine", "Mostly work/study, some chill time", "Chaotic and unpredictable", "Very relaxed and open"] },
  { q: "Are you an early bird or a night owl?", options: ["Early bird", "Night owl", "Somewhere in between", "Depends on the day"] },
  { q: "How do you usually spend your weekends?", options: ["Relaxing at home", "Going out with friends", "Catching up on work", "Outdoor adventures"] },
  { q: "What is your favorite way to relax after a long day?", options: ["Watching TV/Movies", "Playing Video Games", "Reading/Listening to music", "Sleeping/Resting"] },
  { q: "Describe your ideal living environment.", options: ["Bustling city center", "Quiet suburbs", "Remote countryside", "Near the ocean or mountains"] },
  { q: "What is a cause or issue you care deeply about?", options: ["Environment/Climate", "Technology/AI Ethics", "Social Justice/Equality", "Education/Health", "None in particular"] },

  // Hobbies & Interests (11-20)
  { q: "What are your top three hobbies?", options: ["Gaming / Tech", "Sports / Fitness", "Art / Music / Creative", "Reading / Learning", "Socializing / Traveling"] },
  { q: "What is a skill or hobby you’ve always wanted to learn but haven’t yet?", options: ["A new language", "A musical instrument", "Coding / Tech skill", "A physical sport/martial art"] },
  { q: "Do you prefer indoor or outdoor activities?", options: ["Strictly indoor", "Mostly indoor", "Mostly outdoor", "Strictly outdoor"] },
  { q: "What kind of music do you listen to the most?", options: ["Pop / Hip-Hop", "Rock / Metal", "Electronic / Lo-Fi", "Classical / Jazz", "Everything"] },
  { q: "What is your favorite book or genre of literature?", options: ["Sci-Fi / Fantasy", "Non-fiction / Self-help", "Mystery / Thriller", "Romance / Drama", "I don't read much"] },
  { q: "What movies or TV shows do you never get tired of watching?", options: ["Anime / Animation", "Action / Adventure", "Comedy / Sitcoms", "Documentaries"] },
  { q: "Do you play video games? If so, what types?", options: ["FPS / Competitive", "RPG / Story-driven", "Casual / Mobile", "I don't play games"] },
  { q: "Do you enjoy traveling? Where is your favorite place you've been?", options: ["Love traveling internationally", "Prefer local road trips", "Only travel when necessary", "I hate traveling"] },
  { q: "What is your favorite type of cuisine or food?", options: ["Asian (Chinese, Japanese, Indian)", "Western (Italian, American)", "Middle Eastern / Mediterranean", "I'll eat anything"] },
  { q: "Do you follow any sports or physical activities?", options: ["Football / Soccer", "Basketball / Cricket", "Gym / Bodybuilding", "E-sports", "None"] },

  // Personality & Social (21-30)
  { q: "Would you describe yourself as an introvert, extrovert, or ambivert?", options: ["Extreme Introvert", "Introvert but social with friends", "Ambivert", "Extrovert"] },
  { q: "How do you usually act in large social gatherings?", options: ["Life of the party", "Talk to a few close friends", "Stay quiet in the corner", "Leave as soon as possible"] },
  { q: "Do you prefer deep one-on-one conversations or group hangouts?", options: ["Deep one-on-one only", "Small groups", "Large parties", "Depends on my mood"] },
  { q: "How do you typically handle conflict or disagreements?", options: ["Face it head-on / Argue", "Try to compromise calmly", "Avoid it completely", "Hold a grudge"] },
  { q: "What quality do you value most in your friends?", options: ["Loyalty / Trust", "Humor / Fun", "Intelligence / Deep conversations", "Shared interests"] },
  { q: "Are you quick to trust people, or does it take time?", options: ["Trust immediately", "Give benefit of the doubt", "Takes a long time", "I trust no one"] },
  { q: "How do you express affection or appreciation?", options: ["Words of affirmation", "Quality time", "Acts of service", "Gifts / Physical touch"] },
  { q: "Are you more of a talker or a listener?", options: ["Always talking", "Mostly talking", "Mostly listening", "Always listening"] },
  { q: "How important is alone time to you?", options: ["Crucial, I need it daily", "Important, but I can go without", "Not very important", "I hate being alone"] },
  { q: "What is a common misconception people have about you?", options: ["They think I'm mean/angry", "They think I'm too quiet", "They think I'm overly energetic", "They think I don't care"] },

  // Work & Ambition (31-40)
  { q: "What is your biggest career goal or ambition?", options: ["To be wealthy", "To be famous/recognized", "To help people/make an impact", "To have a quiet, stable life"] },
  { q: "Do you prefer working independently or in a team?", options: ["Strictly solo", "Mostly solo, some teamwork", "Mostly team", "Strictly team"] },
  { q: "How do you handle high-pressure or stressful situations?", options: ["Thrive under pressure", "Get stressed but push through", "Panic and freeze", "Avoid them entirely"] },
  { q: "What is your greatest professional or academic strength?", options: ["Problem solving / Logic", "Creativity / Design", "Communication / Leadership", "Hard work / Dedication"] },
  { q: "What is an area of your work/study you struggle with?", options: ["Procrastination", "Perfectionism", "Lack of focus", "Imposter syndrome"] },
  { q: "Are you driven more by passion, money, or stability?", options: ["Pure passion", "Mostly money", "Mostly stability", "A balance of all three"] },
  { q: "How do you organize your tasks and responsibilities?", options: ["Strict to-do lists/apps", "Mental notes", "Do whatever is most urgent", "I don't organize at all"] },
  { q: "What does 'success' mean to you?", options: ["Financial freedom", "Happiness and peace", "Achieving a specific goal", "Having a loving family"] },
  { q: "Do you consider yourself a leader or a follower?", options: ["Natural leader", "Reluctant leader", "Good follower", "Lone wolf"] },
  { q: "What is the best piece of career advice you've received?", options: ["Work smarter, not harder", "Follow your passion", "Always keep learning", "Network and build connections"] },

  // Thinking & Decision Making (41-50)
  { q: "Do you make decisions based more on logic or emotion?", options: ["Pure logic", "Mostly logic", "Mostly emotion", "Pure emotion"] },
  { q: "Are you a planner, or do you prefer to be spontaneous?", options: ["Meticulous planner", "Plan the basics, wing the rest", "Mostly spontaneous", "Completely chaotic"] },
  { q: "How do you approach solving a complex problem?", options: ["Break it down into small parts", "Look for a creative workaround", "Ask for help immediately", "Trial and error"] },
  { q: "Are you more detail-oriented or a big-picture thinker?", options: ["Obsessed with details", "Balanced", "Big-picture visionary", "I just go with the flow"] },
  { q: "How open are you to changing your mind when presented with new info?", options: ["Very open", "Somewhat open", "Stubborn", "Never change my mind"] },
  { q: "Do you tend to overthink things?", options: ["Always", "Sometimes", "Rarely", "Never"] },
  { q: "How do you deal with ambiguity or uncertainty?", options: ["Embrace it", "Tolerate it", "Dislike it", "Hate it, gives me anxiety"] },
  { q: "Do you learn better by reading, listening, or doing?", options: ["Reading / Visual", "Listening / Auditory", "Doing / Hands-on", "A mix"] },
  { q: "What is a topic you could talk about for hours?", options: ["Tech / Science", "Movies / Games", "Philosophy / Life", "Gossip / People"] },
  { q: "Are you more optimistic, pessimistic, or realistic?", options: ["Optimistic", "Realistic", "Pessimistic", "Depends on the day"] },

  // Values & Morals (51-60)
  { q: "What is your most deeply held core value?", options: ["Truth / Honesty", "Kindness / Compassion", "Freedom / Independence", "Justice / Fairness"] },
  { q: "Where do you draw the line between right and wrong?", options: ["Strict moral code", "Depends on the situation", "Whatever causes the least harm", "I don't believe in strict right/wrong"] },
  { q: "How important is honesty to you, even if it hurts?", options: ["Absolute truth always", "Mostly honest, white lies are ok", "Better to spare feelings", "Honesty is overrated"] },
  { q: "Do you believe that people can fundamentally change?", options: ["Yes, completely", "Yes, but it's rare", "Only slightly", "No, people never change"] },
  { q: "What is your perspective on failure?", options: ["It's a stepping stone to success", "It's embarrassing but necessary", "I fear it greatly", "I avoid it at all costs"] },
  { q: "How do you define personal integrity?", options: ["Doing the right thing when no one is looking", "Staying true to my word", "Never compromising my beliefs", "Being authentic"] },
  { q: "What is a rule you live your life by?", options: ["Treat others as you want to be treated", "Carpe diem (Seize the day)", "Always be improving", "Mind your own business"] },
  { q: "Do you believe everything happens for a reason?", options: ["Absolutely", "Sometimes", "No, it's just random chance", "We create our own reasons"] },
  { q: "How much do you value tradition vs. innovation?", options: ["Strictly tradition", "Value tradition but open to new", "Value innovation over tradition", "Tear down the old, build the new"] },
  { q: "What legacy do you want to leave behind?", options: ["A great creation/company", "A loving family", "A better world", "I don't care about legacy"] },

  // Emotional Landscape (61-70)
  { q: "What makes you feel most stressed or anxious?", options: ["Deadlines / Work", "Social situations", "Financial issues", "Lack of control"] },
  { q: "What brings you the most joy in life?", options: ["Achieving goals", "Spending time with loved ones", "Enjoying hobbies/entertainment", "Quiet moments alone"] },
  { q: "How do you process sadness or grief?", options: ["Cry it out", "Talk to someone", "Distract myself", "Bottle it up"] },
  { q: "What is something that easily makes you angry?", options: ["Injustice / Unfairness", "Incompetence / Stupidity", "Being ignored / Disrespected", "Lies / Deceit"] },
  { q: "Are you comfortable expressing your emotions to others?", options: ["Very comfortable", "Only with close friends/family", "Struggle with it", "Never show emotion"] },
  { q: "What are you most afraid of?", options: ["Failure", "Rejection / Loneliness", "Death / Illness", "Losing control"] },
  { q: "How do you comfort yourself when you feel down?", options: ["Eat comfort food", "Watch a favorite show/movie", "Sleep", "Exercise / Go for a walk"] },
  { q: "What is your biggest regret, if any?", options: ["Not taking a chance/risk", "Hurting someone", "Wasting time", "I have no regrets"] },
  { q: "What is a memory that always makes you smile?", options: ["A childhood memory", "A trip/vacation", "A success/achievement", "A moment with a loved one"] },
  { q: "How well do you accept criticism?", options: ["Welcome it openly", "Take it well if constructive", "Get defensive initially", "Hate it completely"] },

  // Creativity & Imagination (71-80)
  { q: "Do you consider yourself a creative person?", options: ["Highly creative", "Moderately creative", "Not very creative", "Strictly logical/analytical"] },
  { q: "In what medium do you best express your creativity?", options: ["Writing / Storytelling", "Visual Art / Design", "Music / Audio", "Coding / Problem Solving"] },
  { q: "Do you daydream often? What about?", options: ["Future success/scenarios", "Fantasy worlds/stories", "Conversations with people", "I rarely daydream"] },
  { q: "If you could have any superpower, what would it be?", options: ["Flying / Teleportation", "Mind reading / Invisibility", "Time travel / Manipulation", "Super strength / Immortality"] },
  { q: "What inspires you to create or try new things?", options: ["Seeing other people's work", "Boredom", "A desire to solve a problem", "Random bursts of inspiration"] },
  { q: "Do you enjoy art, museums, or live performances?", options: ["Love them, go often", "Enjoy them occasionally", "Not really my thing", "Hate them"] },
  { q: "How important is aesthetics and design to you?", options: ["Crucial, everything must look good", "Important, but function matters more", "Nice to have, not essential", "Don't care at all"] },
  { q: "If you were to write a book, what would it be about?", options: ["My life story (Autobiography)", "A fictional fantasy/sci-fi world", "A self-help/educational guide", "A mystery/thriller"] },
  { q: "Do you prefer strict instructions or creative freedom?", options: ["Strict instructions", "Guidelines but some freedom", "Total creative freedom", "Depends on the task"] },
  { q: "What is the most creative thing you've ever done?", options: ["Built an app/website", "Created art/music", "Wrote a story/article", "Solved a really hard problem"] },

  // Habits & Lifestyle (81-90)
  { q: "What is a daily habit you couldn't live without?", options: ["Coffee / Tea in the morning", "Checking my phone/social media", "Exercise / Stretching", "Reading / Journaling"] },
  { q: "What is a bad habit you are trying to break?", options: ["Procrastination", "Biting nails / Fidgeting", "Junk food / Overeating", "Doomscrolling"] },
  { q: "How much sleep do you usually get?", options: ["8+ hours (Well rested)", "6-7 hours (Average)", "4-5 hours (Sleep deprived)", "Varies wildly"] },
  { q: "Are you mindful of your health and fitness?", options: ["Very strict about diet/exercise", "Try to be healthy most days", "Eat what I want, exercise sometimes", "Don't care about health"] },
  { q: "Do you prefer a structured routine or a flexible schedule?", options: ["Strict daily routine", "Loose routine", "Total flexibility", "Complete chaos"] },
  { q: "Are you tidy and organized, or a bit messy?", options: ["Minimalist and spotless", "Organized chaos", "A bit messy", "Total disaster area"] },
  { q: "How much time do you spend on your phone or social media?", options: ["Way too much (5+ hours)", "A moderate amount (2-4 hours)", "Very little (< 1 hour)", "Barely use my phone"] },
  { q: "Do you cook your own meals often?", options: ["Cook every day", "Cook a few times a week", "Mostly order takeout", "Only eat pre-packaged food"] },
  { q: "What is your approach to managing money?", options: ["Strict budget / Saver", "Save some, spend some", "Impulse buyer / Spender", "Struggle to manage money"] },
  { q: "Do you collect anything?", options: ["Digital items (Games, etc.)", "Physical items (Cards, figures)", "Memories / Photos", "I don't collect anything"] },

  // Deep & Reflective (91-100)
  { q: "What is the most difficult challenge you have overcome?", options: ["A health issue", "A career/academic setback", "A relationship breakup", "A personal mental struggle"] },
  { q: "What are you most grateful for in your life right now?", options: ["My health", "My friends/family", "My career/education", "My freedom/opportunities"] },
  { q: "If you could give advice to your younger self, what would it be?", options: ["Don't worry so much", "Take more risks", "Invest/Save money earlier", "Appreciate the little things"] },
  { q: "What is a question you wish people asked you more often?", options: ["How are you really doing?", "What are you passionate about?", "Do you need help?", "None, leave me alone"] },
  { q: "How do you want to be remembered by your loved ones?", options: ["As kind and loving", "As successful and driven", "As funny and entertaining", "As someone who changed things"] },
  { q: "What gives your life meaning or purpose?", options: ["My relationships", "My work/creativity", "My faith/beliefs", "I'm still figuring it out"] },
  { q: "What is a belief you held strongly but recently changed?", options: ["A political/social view", "A view on relationships", "A view on career/money", "I haven't changed any major beliefs"] },
  { q: "What are you currently most looking forward to?", options: ["A trip/event", "Achieving a goal", "Starting a new chapter", "Just relaxing this weekend"] },
  { q: "If you had unlimited resources, what would you spend your time doing?", options: ["Traveling the world", "Creating art/content", "Building a business/charity", "Doing absolutely nothing"] },
  { q: "What is one thing you want me (Raya) to always remember about you?", options: ["My sense of humor", "My goals/ambitions", "My core values", "Everything, I want you to know me perfectly"] }
];

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personality & Trait Questionnaire</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background: #0f172a; color: #f8fafc; font-family: 'Inter', sans-serif; }
        .glass-panel { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
    </style>
</head>
<body class="min-h-screen py-10 px-4">
    <div class="max-w-4xl mx-auto glass-panel p-8 rounded-2xl shadow-2xl">
        <h1 class="text-4xl font-bold mb-2 text-center text-blue-400">Raya's Personality Profiler</h1>
        <p class="text-slate-400 text-center mb-8">Fill out these 100 questions so I can learn all about you! You can select an option and/or type your own detailed answer below each.</p>
        
        <form id="personality-form" class="space-y-12">
            ${questions.map((item, i) => `
                <div class="p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-sm hover:border-blue-500 transition-colors">
                    <h3 class="text-xl font-semibold mb-4 text-slate-100"><span class="text-blue-500 mr-2">Q${i+1}.</span> ${item.q}</h3>
                    
                    <div class="space-y-3 mb-4">
                        ${item.options.map(opt => `
                        <label class="flex items-center space-x-3 cursor-pointer">
                            <input type="radio" name="q${i}" value="${opt.replace(/"/g, '&quot;')}" class="form-radio h-5 w-5 text-blue-500 bg-slate-700 border-slate-600 focus:ring-blue-500">
                            <span class="text-slate-300">${opt}</span>
                        </label>
                        `).join('')}
                    </div>

                    <div class="mt-4">
                        <label class="block text-sm font-medium text-slate-400 mb-2">Or type your own specific answer / elaborate:</label>
                        <textarea name="q${i}_text" rows="2" class="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500" placeholder="Type your answer here..."></textarea>
                    </div>
                </div>
            `).join('')}
            
            <div class="pt-6 border-t border-slate-700 text-center">
                <button type="submit" class="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                    Submit Answers to Raya
                </button>
            </div>
        </form>
    </div>

    <div id="success-modal" class="fixed inset-0 bg-black/80 hidden items-center justify-center z-50">
        <div class="bg-slate-800 p-8 rounded-2xl max-w-sm w-full text-center border border-slate-600">
            <div class="text-5xl mb-4">✨</div>
            <h2 class="text-2xl font-bold text-white mb-2">Saved Successfully!</h2>
            <p class="text-slate-400 mb-6">Raya has successfully memorized your profile.</p>
            <button onclick="document.getElementById('success-modal').classList.add('hidden')" class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold w-full">Awesome!</button>
        </div>
    </div>

    <script>
        const questionsList = ${JSON.stringify(questions)};
        
        document.getElementById('personality-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const answers = [];
            
            for (let i = 0; i < 100; i++) {
                const radioVal = formData.get('q' + i);
                const textVal = formData.get('q' + i + '_text');
                
                let finalAnswer = "";
                if (textVal && textVal.trim() !== "") {
                    finalAnswer = textVal.trim() + (radioVal ? " (Also selected: " + radioVal + ")" : "");
                } else if (radioVal) {
                    finalAnswer = radioVal;
                }
                
                if (finalAnswer) {
                    answers.push({
                        question: questionsList[i].q,
                        answer: finalAnswer
                    });
                }
            }
            
            if (answers.length === 0) {
                alert("Please answer at least one question!");
                return;
            }
            
            try {
                const response = await fetch('/api/personality', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers })
                });
                
                if (response.ok) {
                    document.getElementById('success-modal').classList.remove('hidden');
                    document.getElementById('success-modal').style.display = 'flex';
                } else {
                    alert('Error saving data to Raya.');
                }
            } catch (err) {
                console.error(err);
                alert('Network error while saving data.');
            }
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('personality-form.html', htmlContent);
console.log("Created personality-form.html successfully.");
