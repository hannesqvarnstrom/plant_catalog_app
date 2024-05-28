declare module 'UserTypes' {
    interface DeepUser {
        id: string,
        name: string,
        location?: string,
        description?: string,
        // WIP: offers: { cuttings: boolean, seeds: boolean, rhizomes: boolean }
    }

    interface UserCreationArgs {
        name: string,
        location?: string,
        description?: string
    }

}
