import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getResourceWithIDAfterMS } from '../helpers'
import { DeepTrader, TraderCreationArgs } from 'TraderTypes'

async function removeTraderFromDatabase(id: string): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('removing trader with id: ' + id)
            resolve(true)
        }, 1000)
    })
}

interface PlantTradersState {
    traders: DeepTrader[],
    add: (args: TraderCreationArgs) => Promise<void>
    remove: (id: string) => Promise<void>
}

export const useTraderStore = create<PlantTradersState>()(
    devtools(
        persist(
            (set) => {
                return {
                    traders: [],
                    add: async (args) => {
                        const resultingTrader = await getResourceWithIDAfterMS(args)
                        set((state) => ({ traders: [...state.traders, resultingTrader] }))
                    },
                    remove: async (id) => {
                        const result = await removeTraderFromDatabase(id)
                        console.log(result)
                        set((state) => ({ traders: state.traders.filter(trader => trader.id !== id) }))
                    }
                }
            },
            { name: 'plantTradersStore' }
        )
    )
)
