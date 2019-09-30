import React from 'react'

export const Hello = () => {
    let arr =['Hola, me llamo ', 'Hallo my naam is ', 
                'Je m\'appelle ', 'Hello, my name is ',
                'Namaste mera naam hai','Kon\'nichiwa, watashinonamaeha',
                'Nǐ hǎo wǒ de míngzì shì', 'Bonjour, mon nom est',
                'Pryvit! Mene zvaty','Sata srī akāla mērā nāma hai',
                'Hallo Ich heisse', 'Talofa, o loʻu igoa']

    return (
        <span>
            {arr[Math.floor(Math.random()*arr.length)]}
        </span>
    )
}