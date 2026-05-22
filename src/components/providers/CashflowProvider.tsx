"use client";

import { Icon, ValidLucideIcons } from "@components/Icon";
import CashflowContext from "@context/CashflowContext";
import ConfirmActionContext from "@context/ConfirmActionContext";
import { AlertDialog, Button, Skeleton } from "@heroui/react";
import Category from "@models/Category";
import GroupCategory from "@models/GroupCategory";
import PaymentMethod from "@models/PaymentMethod";
import apiAction from "@services/ApiAction";
import CategoryService from "@services/CategoryService";
import PaymentMethodService from "@services/PaymentMethodService";
import {
    ReactNode,
    useEffect,
    useState
} from "react";

export function CashflowProvider({
    children
}: {
    children: ReactNode;
}) {
    const [loading, setLoading] = useState<boolean>(true);
    const [groupsCategory, setGroupsCategory] = useState<GroupCategory[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const categories = groupsCategory.flatMap(group => group.categories);
    useEffect(() => {
        async function load() {
            apiAction(async () => {
                const groupsCategoryList: GroupCategory[] = await CategoryService.list.group();
                const pmList: PaymentMethod[] = await PaymentMethodService.list();

                setGroupsCategory(groupsCategoryList);
                setPaymentMethods(pmList);
                setLoading(false);
            }, "Something was wrong while fetch data");
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div ><Skeleton className="w-full h-50" /></div>
                <div className="col-start-1 row-start-2"><Skeleton className="w-full h-50" /></div>
                <div className="col-span-2 row-span-2 col-start-2 row-start-1"><Skeleton className="w-full h-102" /></div>
            </div>
        )
    }

    return (
        <CashflowContext.Provider value={{ categories, groupsCategory, setGroupsCategory, paymentMethods, setPaymentMethods }}>
            {children}
        </CashflowContext.Provider>
    );
}