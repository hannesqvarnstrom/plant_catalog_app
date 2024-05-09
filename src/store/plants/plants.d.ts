declare module 'Plants' {
    interface ShallowPlant {
        name: {
            sciName: string,
            sortName?: string,
            parentNames?: string,
            otherNameInfo?: string,
        },
        from?: string,
        image?: string,
        // ETC
    }

    interface DeepPlant extends ShallowPlant {
        id: string,
    }


}