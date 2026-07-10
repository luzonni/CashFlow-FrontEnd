"use client";

import ConfigsSection from "./(configsSection)/ConfigsSection";
import UserSection from "./(user)/UserSection";


export default function Page() {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-2">
            <div className="bg-surface rounded-2xl p-6">
                <UserSection />
            </div>
            <div className="col-start-2 row-start-1 bg-surface rounded-2xl p-6">
                <ConfigsSection />
            </div>
            <div className="col-span-2 col-start-1 row-start-2 bg-surface rounded-2xl p-3">
                Something
            </div>
        </div>
    )
}