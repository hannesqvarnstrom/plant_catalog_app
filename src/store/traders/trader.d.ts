declare module 'TraderTypes' {
    interface DeepTrader {
        id: string,
        name: string,
        location?: string,
        description?: string,
        // WIP: offers: { cuttings: boolean, seeds: boolean, rhizomes: boolean }
    }

    interface TraderCreationArgs {
        name: string,
        location?: string,
        description?: string
    }

}
