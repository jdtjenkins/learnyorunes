import { createMemo, createSignal, Show } from "solid-js"
import { runes } from './consts';

export function Learn() {
    const [rune, setRune] = createSignal<string | null>(null)
    const currentRune = createMemo(() => ({
        rune: rune(),
        ...runes[rune() as keyof typeof runes],
    }))
    const [ correct, setCorrect ] = createSignal<boolean | null>(null)

    const setRandomRune = () => {
        const runeNames = Object.keys(runes)
        const randomRune = runeNames[Math.floor(Math.random() * runeNames.length)]

        setRune(randomRune)
        setCorrect(null)
    }

    const onSubmit = (value: string) => {
        if (value.toLowerCase() === rune()?.toLowerCase()) {
            setCorrect(true)
        } else {
            setCorrect(false)
        }
    }

    setRandomRune()

    return (
        <>
            <div class="fixed top-0 left-0 w-full h-full p-4 grid grid-rows-[auto_1fr] gap-8">
                <h1 class="font-title text-2xl text-center font-bold">Who's that runémon?</h1>
                <div class="w-full h-full flex items-center justify-center flex-col gap-4">
                    <img src={currentRune().imgUrl} alt={currentRune().rune!} />
                    <p>{ currentRune().description }</p>
                    <label class="input">
                        <span>Rune name:</span>
                        <input
                            type="text"
                            class="grow"
                            on:change={event => {
                                event.preventDefault()
                                event.stopPropagation()

                                onSubmit(event.currentTarget.value)
                            }}
                        />
                    </label>
                    <Show when={correct() === false}>
                        <p class="alert alert-error">Incorrect!</p>
                    </Show>
                    <Show when={correct() === true}>
                        <p class="alert alert-success alert-soft">Well done!</p>
                        <button
                            class="btn btn-success btn-lg"
                            on:click={() => setRandomRune()}
                        >Another!</button>
                    </Show>
                </div>
            </div>
            <a
                href="https://www.profounddecisions.co.uk/empire-wiki/Runes"
                target="_blank"
                class="fixed bottom-4 left-4 font-light text-sm text-base-content/80"
            >For the cheaters</a>
        </>
    )
}