import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    const { data: scores, error: scoreError } = await supabase
        .from("scores")
        .select("*");

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

    return new NextResponse(JSON.stringify({ scores, events }), {
        status: 200,
        headers: {
            "Cache-Control": "no-store",
            "Content-Type": "application/json",
        },
    });
}
