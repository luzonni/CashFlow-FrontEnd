
async function authFetch(url: string, options?: RequestInit) {
    let res = await fetch(url, {
        ...options,
        credentials: 'include'
    })

    if (res.status === 401) {
        const refresh = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        })

        if (!refresh.ok) {
            const logoutRes = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            return logoutRes
        }

        res = await fetch(url, {
            ...options,
            credentials: 'include'
        })
    }

    return res
}

export default authFetch;