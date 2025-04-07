import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

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
        return NextResponse.json(
            {
                error: scoreError?.message || eventError?.message,
            },
            { status: 500 }
        );
    }

    return NextResponse.json({
        scores,
        events,
    });
}
