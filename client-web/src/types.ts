import React from "react";

export interface InputStateManager {
    value: any;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}