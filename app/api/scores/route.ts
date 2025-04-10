import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

let cachedData: { scores: { id: number, team: string, score: number, updated_at: string }[]; events: { id: number, event: string, created_at: string }[]; } | null = null;
let lastFetchTime = 0;

export const dynamic = "force-dynamic";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    const currentTime = Date.now();
    // Check if cached data exists and if the last fetch was within 2 seconds
    if (cachedData && (currentTime - lastFetchTime < 500)) {
        return new NextResponse(JSON.stringify(cachedData), {
            status: 200,
            headers: {
                "Cache-Control": "no-store",
                "Content-Type": "application/json",
            },
        });
    }

    // Fetch fresh data from the database
    const { data: scores, error: scoreError } = await supabase
        .from("scores")
        .select("*")
        .eq("current", 1)
        .limit(2);

    const { data: events, error: eventError } = await supabase
        .from("event")
        .select("*");

    if (scoreError || eventError) {
        return new NextResponse(
            JSON.stringify({
                error: scoreError?.message || eventError?.message,
            }),
            {
                status: 500,
                headers: {
                    "Cache-Control": "no-store",
                    "Content-Type": "application/json",
                },
            }
        );
    }

    // Update cache
    cachedData = { scores, events };
    lastFetchTime = currentTime;

    return new NextResponse(JSON.stringify(cachedData), {
        status: 200,
        headers: {
            "Cache-Control": "no-store",
            "Content-Type": "application/json",
        },
    });
}
