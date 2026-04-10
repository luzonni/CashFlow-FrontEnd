import { UserProdiver } from "@components/providers/UserProvider";
import UserCard from "@components/UserCard";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserProdiver>
            <div className="flex flex-col gap-2 bg-gray-200 p-2 h-screen">
                <div className="flex flex-row justify-between items-center px-4 bg-white rounded-2xl ">
                    <div className="flex flex-row items-center gap-3">
                        <img src="/LogoCashFlow.png" alt="Logo" width={100} height={100} />
                    </div>
                    <div>
                        ADMIN PAGE
                    </div>
                    <div>
                        <UserCard />
                    </div>
                </div>
                <div className="overflow-y-auto">
                    {children}
                </div>
            </div>
        </UserProdiver>
    );
}