import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

const SETTINGS_ID = "settings"

export const [ settings, setSettings ] = createStore({
    showDescriptions: true,
})

export function Settings() {
    setSettings(JSON.parse(window.localStorage.getItem(SETTINGS_ID) || "{}"))

    createEffect(() => {
        window.localStorage.setItem(SETTINGS_ID, JSON.stringify(settings))
    })

    return (
        <>
            <div class="drawer drawer-end">
                <input id="drawer-settings" type="checkbox" class="drawer-toggle" />
                <div class="drawer-side">
                    <label for="drawer-settings" aria-label="close sidebar" class="drawer-overlay"></label>
                    <div class="grid grid-rows-[1fr_auto] h-full bg-base-200 p-4">
                        <ul class="menu min-h-full w-full md:w-80">
                            <li>
                                <label class="label">
                                    Show descriptions
                                    <input
                                        type="checkbox"
                                        checked={settings.showDescriptions}
                                        class="toggle"
                                        on:change={() => setSettings({
                                            showDescriptions: !settings.showDescriptions,
                                        })}
                                    />
                                </label>
                            </li>
                        </ul>
                        <label
                            for="drawer-settings"
                            class="btn btn-error btn-outline"
                        >
                            Close
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export function SettingsButton() {
    return (
        <label
            for="drawer-settings"
            class="btn btn-ghost btn-circle"
        >
            ⚙️
        </label>
    )
}