declare module 'Plants' {
    interface ShallowPlant {
        name: {
            genusName: string;
            speciesName?: string;
            varietyName?: string;
            name1a?: {
                species: boolean;
                name: string;
            };
            name1b?: {
                species: boolean;
                name: string;
            };

            name2a?: {
                species: boolean;
                name: string;
            };

            name2b?: {
                species: boolean;
                name: string;
            };
        },
        from?: string,
        image?: string,
        fontSize: string
        fromTrader?: string,
        location?: string,
        type?: PlantTypeCol,

        // ETC
    }

    interface DeepPlant extends ShallowPlant {
        id: string,
        createdAt: Date | string
    }

    type PlantTypeCol = 'cutting' | 'seed' | 'rhizome' | 'none'
}