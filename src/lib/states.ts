import { atom } from "jotai";
import { qrStyleList } from "@/lib/qr_style_list";

export const selectedStyleAtom = atom<string>(qrStyleList[0].id);
