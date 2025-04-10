"use client";

import Head from "next/head";
import "./page.css";
import { useEffect, useState } from "react";
type TeamScore = {
    team: string;
    score: number;
    memo: string;
};

export default function Home() {
    const [blue, setBlue] = useState<TeamScore | null>(null);
    const [white, setWhite] = useState<TeamScore | null>(null);
    const [now, setNow] = useState<string>("");
    const [event, setEvent] = useState("-");

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
                const scores = data.scores;
                setBlue(scores.find((item) => item.team === "blue") ?? null);
                setWhite(scores.find((item) => item.team === "white") ?? null);

                const events = data.events;
                console.log(events);
                setEvent(events[0]?.event ?? "");
            } catch (e) {
                console.error("데이터 불러오기 오류", e);
            }
        };
        setInterval(fetchData, 1000);
    }, []);

    return (
        <div style={{backgroundColor: "white"}} className="page" onClick={async (e) => { await e.currentTarget.requestFullscreen() }}>
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
                        <p>청팀{blue?.memo ? ` - ${blue?.memo}` : ""}</p>
                    </div>
                    <div className="info-container">
                        <div className="info">
                            <p>{now}</p>
                        </div>
                        <div className="info">
                            <h1>
                                종목 - <span>{event || "-"}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="team">
                        <h1>{white?.score ?? "-"}</h1>
                        <p>백팀{white?.memo ? ` - ${white?.memo}` : ""}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
