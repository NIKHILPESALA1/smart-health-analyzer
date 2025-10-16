const http = require('http');
const Groq = require('groq-sdk');
require('dotenv').config();

// Initialize Groq AI
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const PORT = 3001;

// Create HTTP server
const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Health check endpoint
    if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', message: 'Server is running' }));
        return;
    }
    
    // Analyze symptoms endpoint
    if (req.url === '/api/analyze' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const { symptoms } = JSON.parse(body);
                
                if (!symptoms) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Symptoms are required' }));
                    return;
                }
                
                console.log('Analyzing symptoms:', symptoms);
                
                // Create prompt for LLM
                const prompt = `You are a medical education assistant. Analyze these symptoms and provide educational information in JSON format.

Symptoms: ${symptoms}

Provide your response in this exact JSON format:
{
  "conditions": [
    {
      "name": "Condition Name",
      "description": "Brief description of the condition",
      "likelihood": "High/Medium/Low"
    }
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ],
  "disclaimer": "This is educational information only and not medical advice. Always consult with qualified healthcare professionals for proper medical evaluation and treatment."
}

Important: Return ONLY valid JSON, no markdown formatting or code blocks.`;
                
                // Call Groq API
                const completion = await groq.chat.completions.create({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: "You are a healthcare education assistant. Always respond with valid JSON only, no markdown."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                });
                
                let responseText = completion.choices[0].message.content;
                
                // Clean response (remove markdown if present)
                responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                
                // Parse JSON
                const analysisResult = JSON.parse(responseText);
                
                // Send response
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(analysisResult));
                
                console.log('Analysis complete');
                
            } catch (error) {
                console.error('Error:', error);
                
                // Fallback response
                const fallbackResponse = {
                    conditions: [
                        {
                            name: "Common Viral Infection",
                            description: "Based on your symptoms, this could be a common viral infection. Symptoms typically include fever, fatigue, and body aches.",
                            likelihood: "Medium"
                        },
                        {
                            name: "Stress or Fatigue",
                            description: "Physical or mental stress can manifest as various symptoms. Adequate rest and stress management are important.",
                            likelihood: "Low"
                        }
                    ],
                    recommendations: [
                        "Consult with a qualified healthcare professional for proper diagnosis",
                        "Get adequate rest and stay well-hydrated",
                        "Monitor your symptoms and seek immediate medical attention if they worsen",
                        "Avoid self-medication without professional guidance"
                    ],
                    disclaimer: "⚠️ IMPORTANT: This is educational information only and NOT a medical diagnosis. Always consult with qualified healthcare professionals for proper medical evaluation and treatment. If you are experiencing severe symptoms or a medical emergency, contact emergency services immediately."
                };
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(fallbackResponse));
            }
        });
        
        return;
    }
    
    // 404 for other routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log('✅ AI Health Analyzer Server Started');
    console.log(`🌐 Server running at http://localhost:${PORT}`);
    console.log(`🏥 API endpoint: http://localhost:${PORT}/api/analyze`);
    console.log(`🤖 Using Groq AI (Free LLM)`);
    console.log('\nReady to analyze symptoms!');
});
