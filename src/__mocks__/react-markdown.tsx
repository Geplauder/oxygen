import React from "react";

// Required due to jest not fully supporting ESM
export default function ReactMarkdown({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
