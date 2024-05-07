export async function getResourceWithIDAfterMS<D extends object>(data: D, ms?: number): Promise<D & { id: string }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...data, id: new Date().toISOString()
            })
        }, ms ?? 500)
    })
}