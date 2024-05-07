declare module 'Plants' {
    interface ShallowPlant {
        name: string,
        from?: string,
        image?: string,
        // ETC
    }

    interface DeepPlant extends ShallowPlant {
        id: string,
    }


}