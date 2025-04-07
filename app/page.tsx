"use client";

import Head from "next/head";
import "./page.css";
import { useEffect, useState } from "react";

export default function Home() {
    const [blue, setBlue] = useState<any>(null);
    const [white, setWhite] = useState<any>(null);
    const [now, setNow] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const time = new Date().toLocaleTimeString("ko-KR", {
                timeZone: "Asia/Seoul",
                hour12: true,
            });
            setNow(time);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/scores");
                const data = await res.json();
                setBlue(data.find((item: any) => item.team === "blue") ?? null);
                setWhite(
                    data.find((item: any) => item.team === "white") ?? null
                );
            } catch (e) {
                console.error("데이터 불러오기 오류", e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="page">
            <Head>
                <link
                    rel="stylesheet"
                    as="style"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
            </Head>

            <div className="score">
                <div className="score_section">
                    <div className="team team_blue">
                        <h1>{blue?.score ?? "-"}</h1>
                        <p>청팀</p>
                    </div>
                    <div className="info-container">
                        <div className="info">
                            <p>{now}</p>
                        </div>
                        <div className="info">
                            <h1>
                                종목 - <span>농구</span>
                            </h1>
                        </div>
                    </div>
                    <div className="team">
                        <h1>{white?.score ?? "-"}</h1>
                        <p>백팀</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
