import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/verify-karmayogi
 * Mock backend simulation for Govt. of India Adi Karmayogi Portal identity & role verification.
 * 
 * Logic:
 * - Starts with 'MT-' (Master Trainer) or 'NO-' (Nodal Officer):
 *   -> { verified: true, platformRole: "SUPER_CUSTODIAN", aiCorrectionRights: true }
 * - Starts with 'ST-' (Student):
 *   -> { verified: true, platformRole: "CUSTODIAN", aiCorrectionRights: false }
 * - Any other prefix or invalid format:
 *   -> 404 Not Found
 */
export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty or non-JSON body
    }

    const rawId = body?.adiKarmayogiId || body?.id;

    if (!rawId || typeof rawId !== 'string') {
      return NextResponse.json(
        { 
          verified: false, 
          error: "Missing required parameter 'adiKarmayogiId'." 
        },
        { status: 404 }
      );
    }

    const trimmedId = rawId.trim();
    const upperId = trimmedId.toUpperCase();

    // 1. Master Trainer (MT-) or Nodal Officer (NO-)
    if (upperId.startsWith('MT-') || upperId.startsWith('NO-')) {
      return NextResponse.json({
        verified: true,
        platformRole: "SUPER_CUSTODIAN",
        aiCorrectionRights: true,
      }, { status: 200 });
    }

    // 2. Student (ST-)
    if (upperId.startsWith('ST-')) {
      return NextResponse.json({
        verified: true,
        platformRole: "CUSTODIAN",
        aiCorrectionRights: false,
      }, { status: 200 });
    }

    // 3. Invalid or unrecognized Adi Karmayogi ID
    return NextResponse.json(
      {
        verified: false,
        error: `Invalid Adi Karmayogi ID: '${trimmedId}'. Expected prefix 'MT-', 'NO-', or 'ST-'.`,
      },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        verified: false,
        error: "Internal verification error.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    endpoint: "/api/verify-karmayogi",
    method: "POST",
    description: "Mock verification endpoint for Adi Karmayogi Govt. ID",
    samplePayload: { adiKarmayogiId: "MT-JH-2026-8812" },
    sampleResponses: {
      masterTrainer: { verified: true, platformRole: "SUPER_CUSTODIAN", aiCorrectionRights: true },
      nodalOfficer: { verified: true, platformRole: "SUPER_CUSTODIAN", aiCorrectionRights: true },
      student: { verified: true, platformRole: "CUSTODIAN", aiCorrectionRights: false },
      invalid: { status: 404, verified: false, error: "Invalid Adi Karmayogi ID" },
    },
  });
}
