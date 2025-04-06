import Head from "next/head";
import styles from "./page.module.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
    const { data } = await supabase.from("scores").select("*");

    const blue = data?.find((item) => item.team === "blue");
    const white = data?.find((item) => item.team === "white");

    return (
        <div className={styles.page}>
            <Head>
                <link
                    rel="stylesheet"
                    as="style"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
            </Head>
            <div className={`${styles.half} ${styles.blue}`}>
                <div className={styles.score}>{blue?.score ?? 0}</div>
            </div>
            <div className={`${styles.half} ${styles.white}`}>
                <div className={styles.score}>{white?.score ?? 0}</div>
            </div>
        </div>
    );
}
