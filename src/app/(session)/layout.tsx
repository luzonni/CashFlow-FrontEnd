import { UserProdiver } from "@components/providers/UserProvider";
import LocalizedLayout from "./LocalizedLayout";

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserProdiver>
            <LocalizedLayout>
                {children}
            </LocalizedLayout>
        </UserProdiver>
    );
}