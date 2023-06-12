import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { newAdventure } from "./utils";

export const lastAdventureA = atomWithStorage(
    "lastAdventure",
    null as string | null
);

export const adventuresA = atomWithStorage("adventures", [] as Adventure[]);

const __nowAdventureA__ = atom(null as Adventure | null);

export const nowAdventureA = atom(
    (get) => get(__nowAdventureA__),
    async (get, set, val?: Adventure) => {
        if (val === undefined) {
            const last = get(adventuresA).find(
                (v) => v.name === get(lastAdventureA)
            );

            if (last) set(__nowAdventureA__, last);
            else set(__nowAdventureA__, await newAdventure());
        } else {
            set(__nowAdventureA__, () => val);
        }

        if (get(adventuresA).findIndex((v) => v.name === val?.name) !== -1) {
            let tmp = get(adventuresA);

            const nowRollingIndex = tmp.findIndex((v) => v.name === val?.name);

            if (val) tmp[nowRollingIndex] = val;

            console.log(get(nowAdventureA)?.history.header);

            set(adventuresA, () => tmp);
        }
    }
);
