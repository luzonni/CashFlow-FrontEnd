"use client";

import ConfigsSection from "./(configsSection)/ConfigsSection";
import UserSection from "./(user)/UserSection";


export default function Page() {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="bg-surface rounded-2xl p-6">
                <UserSection />
            </div>
            <div className="col-span-2 col-start-1 row-start-2 bg-surface rounded-2xl p-3">

            </div>
            <div className="col-start-2 row-start-1 bg-surface rounded-2xl p-6">
                <ConfigsSection />
            </div>
        </div>
    )
}