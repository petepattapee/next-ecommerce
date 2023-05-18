'use client'

import { ReactNode, useEffect, useState } from "react"

export default function Hydrate({ children }: { children: ReactNode }) {
      const [isHydrated, SetIsHydrated] = useState(false)
            //wait till nextjs rehydration completes
            useEffect(() => {
                  SetIsHydrated(true)
            }, [])
            return<>{isHydrated ? <>{children}</> : <div>Loading...</div>}</>
}