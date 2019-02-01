import React from "react";

export type ScheduleMode = "EDIT" | "ASSIGN" | "DISPLAY";

export interface InputStateManager {
    value: any;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}