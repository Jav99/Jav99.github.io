import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (use Upstash for production)
const ipCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipCounts.get(ip);

  if (!record || now > record.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;

  record.count++;
  return true;
}

// Demo/mock response when ANTHROPIC_API_KEY is not configured
const DEMO_RESULT = {
  score: 72,
  tier: "Rising",
  critiques: [
    "Your bullet points describe tasks, not results. Hiring managers want to see revenue generated, costs saved, or teams scaled\u2014not processes followed.",
    "The career narrative lacks a clear upward trajectory. Your most impressive role is buried below less relevant positions.",
    "Corporate jargon like \u2018synergized cross-functional teams\u2019 dilutes your authority. Replace with concrete, metric-driven language.",
  ],
  hannah_take:
    "You have strong fundamentals and real experience, but your resume reads like a job description, not a career highlight reel. With the right positioning, you\u2019re a top-quartile candidate.",
};

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again in an hour." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Hannah can\u2019t read this file format\u2014let\u2019s try a PDF." },
        { status: 400 }
      );
    }

    // Check if Anthropic API key is configured
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Demo mode — return mock data with realistic delay
      await new Promise((r) => setTimeout(r, 8000));
      return NextResponse.json(DEMO_RESULT);
    }

    // Extract text from PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text: string;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse");
      const data = await pdfParse(buffer);
      text = data.text;
    } catch {
      return NextResponse.json(
        { error: "Could not read the PDF. Please try a different file." },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        {
          error:
            "The PDF appears to be image-based or too short. Try a text-based PDF.",
        },
        { status: 400 }
      );
    }

    // Call Anthropic Claude API
    const prompt = `You are Hannah White, an elite Executive Career Strategist and former Head of Recruiting for Tier-1 Tech.
Audit the provided resume text with brutal honesty and executive-level insight.

The Rubric (100pts Total):
1. Impact vs. Tasks (30pts): Does it show results or just list duties?
2. Visual Narrative (25pts): Is the career progression clear and high-status?
3. Keyword Sophistication (20pts): Is the language crisp or filled with corporate fluff?
4. Formatting/Layout (25pts): Based on text structure, does it feel modern?

Output Constraints:
Return ONLY a JSON object with these keys:
- score: (Number 0-100)
- tier: ("Elite", "Rising", or "Needs Architecting")
- critiques: (Array of exactly 3 strings)
- hannah_take: (1-sentence summary of their market value)

IMPORTANT: Your output must be valid JSON only. No conversational filler.

Resume text to analyze:
${text.slice(0, 8000)}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      console.error("Anthropic API error:", response.status);
      return NextResponse.json(DEMO_RESULT);
    }

    const data = await response.json();
    const responseText =
      data.content?.[0]?.text ?? "";

    try {
      const parsed = JSON.parse(responseText);
      return NextResponse.json({
        score: Number(parsed.score) || 0,
        tier: parsed.tier || "Needs Architecting",
        critiques: Array.isArray(parsed.critiques)
          ? parsed.critiques.slice(0, 3)
          : [],
        hannah_take: parsed.hannah_take || "",
      });
    } catch {
      // If parsing fails, return demo data
      return NextResponse.json(DEMO_RESULT);
    }
  } catch (error) {
    console.error("Rate resume error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
