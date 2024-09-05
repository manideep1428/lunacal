export function QuestionSvg({ className }: { className: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#4A4E54', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#A3ADBA', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" 
                stroke="url(#gradient1)" 
            />
        </svg>
    );
}
