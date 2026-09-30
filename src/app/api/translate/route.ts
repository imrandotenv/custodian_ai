import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/translate
 * Simulated AI translation endpoint mimicking Hugging Face NLLB-200 (No Language Left Behind)
 * for indigenous Santhali (Ol Chiki script) and English.
 * 
 * Payload: { text: string, targetLang: 'en' | 'sat' }
 * Response: { success: true, translatedText: string }
 */
export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid JSON in request body. Expected { text: string, targetLang: 'en' | 'sat' }." 
        },
        { status: 400 }
      );
    }

    const { text, targetLang } = body;

    // Validate input fields
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing or invalid 'text' field. A string is required." 
        },
        { status: 400 }
      );
    }

    if (!targetLang || (targetLang !== 'en' && targetLang !== 'sat')) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid 'targetLang'. Supported language codes are 'en' (English) or 'sat' (Santhali / Ol Chiki)." 
        },
        { status: 400 }
      );
    }

    // 1. Simulated network delay of 1500ms to mimic AI processing time (e.g. Hugging Face NLLB-200 inference)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. Translation Logic
    let translatedText = '';

    if (targetLang === 'en') {
      // Beautifully written English translation of tribal folklore
      translatedText = "In the ancient forests of Chota Nagpur, the spirits of the soil awaken to bless the sacred clay, guiding the hands of the elders in their harvest songs.";
    } else if (targetLang === 'sat') {
      // Santhali in Ol Chiki script (ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ)
      translatedText = "ᱪᱷᱚᱴᱟ ᱱᱟᱜᱽᱯᱩᱨ ᱨᱮᱭᱟᱜ ᱵᱤᱨ ᱨᱮ, ᱦᱟᱥᱟ ᱨᱮᱭᱟᱜ ᱟᱛᱢᱟ ᱠᱚ ᱡᱟᱜᱮᱛᱚᱜᱼᱟ, ᱟᱨ ᱥᱮᱫᱟᱭ ᱯᱟᱦᱤᱞ ᱦᱟᱯᱲᱟᱢ ᱠᱚᱣᱟᱜ ᱥᱮᱨᱮᱧ ᱛᱮ ᱦᱟᱥᱟ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮ ᱯᱮᱨᱮᱡᱚᱜᱼᱟ᱾";
    }

    return NextResponse.json({
      success: true,
      translatedText,
      meta: {
        sourceTextLength: text.length,
        targetLang,
        model: "facebook/nllb-200-distilled-600M",
        simulatedLatencyMs: 1500,
        script: targetLang === 'sat' ? "Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)" : "Latin (English)",
      }
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: "Translation service error: " + (error?.message || "Unknown error") 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    endpoint: "/api/translate",
    description: "Mock AI translation endpoint simulating Hugging Face NLLB-200 for indigenous languages",
    supportedLanguages: [
      { code: "en", name: "English", script: "Latin" },
      { code: "sat", name: "Santhali", script: "Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)" },
    ],
    samplePayload: {
      text: "ᱦᱟᱥᱟ ᱨᱮᱭᱟᱜ ᱟᱛᱢᱟ ᱠᱚ ᱡᱟᱜᱮᱛᱚᱜᱼᱟ...",
      targetLang: "en"
    },
    sampleResponse: {
      success: true,
      translatedText: "In the ancient forests of Chota Nagpur, the spirits of the soil awaken..."
    }
  });
}
